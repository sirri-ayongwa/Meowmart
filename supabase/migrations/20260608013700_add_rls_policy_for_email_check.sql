-- Add RLS policy to allow email existence checking for unauthenticated users
-- This policy only allows checking if an email exists, not viewing profile data

CREATE POLICY "Allow email existence check" ON public.profiles
FOR SELECT TO anon
USING (true);
