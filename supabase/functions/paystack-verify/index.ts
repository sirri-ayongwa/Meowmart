import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace('Bearer ', '');
    const { data: claimsData, error: claimsErr } = await supabase.auth.getClaims(token);
    if (claimsErr || !claimsData?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    const userId = claimsData.claims.sub;

    const body = await req.json();
    const reference: string = body.reference;
    const items = body.items ?? [];
    if (!reference || typeof reference !== 'string') {
      return new Response(JSON.stringify({ error: 'reference is required' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const secret = Deno.env.get('PAYSTACK_SECRET_KEY');
    if (!secret) {
      return new Response(JSON.stringify({ error: 'PAYSTACK_SECRET_KEY not configured' }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    const verifyJson = await verifyRes.json();

    if (!verifyJson.status || verifyJson.data?.status !== 'success') {
      return new Response(JSON.stringify({ error: 'Payment not successful', details: verifyJson }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    const amount = (verifyJson.data.amount ?? 0) / 100;
    const currency = verifyJson.data.currency ?? 'USD';

    const { data: order, error: insertErr } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        reference,
        amount: body.amountInUSD || (verifyJson.data.amount ?? 0) / 100,
        currency: 'USD',
        status: 'paid',
        items,
      })
      .select()
      .single();

    if (insertErr) {
      return new Response(JSON.stringify({ error: insertErr.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ success: true, order }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  } catch (e) {
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
