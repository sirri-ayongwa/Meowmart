import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

const Login = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) navigate("/account", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ email, password });
    if (!result.success) {
      toast({ title: "Invalid input", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email: result.data.email, password: result.data.password });
    setLoading(false);
    if (error) {
      toast({ title: "Login failed", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Welcome back!", description: "You're now signed in." });
    navigate("/account");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-meow-lightgray">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="font-cursive text-4xl text-center text-meow-purple mb-2">Welcome Back</h1>
          <p className="text-center text-meow-gray mb-6">Sign in to your Meowmart account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required maxLength={100} />
            </div>
            <div className="text-right">
              <Link to="/reset-password" className="text-sm text-meow-purple hover:underline">Forgot password?</Link>
            </div>
            <Button type="submit" className="w-full bg-meow-purple hover:bg-meow-purple/90" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <p className="text-center text-sm text-meow-gray mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-meow-purple font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
