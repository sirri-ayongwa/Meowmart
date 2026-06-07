import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { LogOut, Package, Settings as SettingsIcon, User as UserIcon } from "lucide-react";
import { convertNGNToUSD } from "@/lib/currencyConverter";

const Account = () => {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [orders, setOrders] = useState<any[]>([]);
  const [convertedOrders, setConvertedOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate("/login", { replace: true });
  }, [loading, user, navigate]);

  useEffect(() => {
    if (!user) return;
    setEmail(user.email ?? "");
    supabase.from("profiles").select("full_name").eq("id", user.id).maybeSingle()
      .then(({ data }) => { if (data?.full_name) setFullName(data.full_name); });
    supabase.from("orders").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(async ({ data }) => { 
        if (data) {
          setOrders(data);
          // Convert order amounts from NGN to USD
          const converted = await Promise.all(data.map(async (order) => {
            const amountInUSD = await convertNGNToUSD(order.amount);
            const itemsWithUSD = await Promise.all((order.items as any[]).map(async (item) => {
              const priceInUSD = await convertNGNToUSD(item.price);
              return { ...item, price: priceInUSD };
            }));
            return { ...order, amount: amountInUSD, items: itemsWithUSD, currency: 'USD' };
          }));
          setConvertedOrders(converted);
        }
      });
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const nameResult = z.string().trim().min(1).max(100).safeParse(fullName);
    if (!nameResult.success) {
      toast({ title: "Invalid name", variant: "destructive" });
      return;
    }
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: nameResult.data }).eq("id", user.id);
    setSaving(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Profile updated" });
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = z.string().min(6, "Min 6 characters").max(100).safeParse(newPassword);
    if (!result.success) {
      toast({ title: "Invalid password", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    const { error } = await supabase.auth.updateUser({ password: result.data });
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    setNewPassword("");
    toast({ title: "Password updated" });
  };

  const handleLogout = async () => {
    await signOut();
    toast({ title: "Signed out" });
    navigate("/");
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-meow-gray">Loading...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 bg-meow-lightgray py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
            <div>
              <h1 className="font-cursive text-4xl text-meow-purple">My Account</h1>
              <p className="text-meow-gray mt-1">Welcome back, {fullName || email}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="gap-2">
              <LogOut size={16} /> Sign Out
            </Button>
          </div>

          <Tabs defaultValue="orders" className="bg-white rounded-2xl shadow-md p-6">
            <TabsList className="mb-6">
              <TabsTrigger value="orders" className="gap-2"><Package size={16} />Orders</TabsTrigger>
              <TabsTrigger value="profile" className="gap-2"><UserIcon size={16} />Profile</TabsTrigger>
              <TabsTrigger value="settings" className="gap-2"><SettingsIcon size={16} />Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <h2 className="text-xl font-semibold mb-4">Order History</h2>
              {convertedOrders.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-gray-200 rounded-xl">
                  <Package className="mx-auto text-meow-gray mb-3" size={48} />
                  <p className="text-meow-gray">No orders yet</p>
                  <p className="text-sm text-meow-gray mt-1">Your past orders will appear here.</p>
                  <Button className="mt-4 bg-meow-purple hover:bg-meow-purple/90 text-white" onClick={() => navigate("/shop")}>
                    Start Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {convertedOrders.map((order) => (
                    <div key={order.id} className="border rounded-xl p-4">
                      <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                        <div>
                          <p className="font-semibold">Order #{order.reference}</p>
                          <p className="text-sm text-meow-gray">{new Date(order.created_at).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${Number(order.amount).toFixed(2)} {order.currency}</p>
                          <span className="inline-block text-xs px-2 py-1 rounded-full bg-green-100 text-green-700 capitalize">{order.status}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {(order.items as any[]).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-sm">
                            {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded object-cover" />}
                            <div className="flex-1">
                              <p>{item.name}</p>
                              <p className="text-meow-gray">Qty: {item.quantity} × ${Number(item.price).toFixed(2)}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="profile">
              <h2 className="text-xl font-semibold mb-4">Profile Information</h2>
              <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} maxLength={100} />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" value={email} disabled />
                </div>
                <Button type="submit" className="bg-meow-purple hover:bg-meow-purple/90" disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="settings">
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} minLength={6} maxLength={100} />
                </div>
                <Button type="submit" className="bg-meow-purple hover:bg-meow-purple/90">Update Password</Button>
              </form>
              <div className="mt-8 pt-6 border-t">
                <h2 className="text-xl font-semibold mb-4">Account Actions</h2>
                <Button variant="outline" onClick={handleLogout} className="gap-2">
                  <LogOut size={16} /> Sign Out
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Account;
