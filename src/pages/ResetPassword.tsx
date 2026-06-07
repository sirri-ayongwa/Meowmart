import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(100);

const ResetPassword = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) {
      setMode("update");
    }
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ title: "Invalid email", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(result.data, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Check your email", description: "We've sent you a reset link." });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      toast({ title: "Invalid password", description: result.error.issues[0].message, variant: "destructive" });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: result.data });
    setLoading(false);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Password updated", description: "You can now sign in with your new password." });
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-meow-lightgray">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="font-cursive text-4xl text-center text-meow-purple mb-2">
            {mode === "request" ? "Reset Password" : "Set New Password"}
          </h1>
          <p className="text-center text-meow-gray mb-6">
            {mode === "request"
              ? "Enter your email to receive a reset link"
              : "Choose a new password for your account"}
          </p>
          {mode === "request" ? (
            <form onSubmit={handleRequest} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} />
              </div>
              <Button type="submit" className="w-full bg-meow-purple hover:bg-meow-purple/90" disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required minLength={6} maxLength={100} />
              </div>
              <Button type="submit" className="w-full bg-meow-purple hover:bg-meow-purple/90" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
              </Button>
            </form>
          )}
          <p className="text-center text-sm text-meow-gray mt-6">
            <Link to="/login" className="text-meow-purple font-semibold hover:underline">Back to sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
