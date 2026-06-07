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
import { Loader2 } from "lucide-react";

const emailSchema = z.string().trim().email("Invalid email").max(255);
const passwordSchema = z.string().min(6, "Password must be at least 6 characters").max(100);

const TOAST_DURATION = 10000; // 10 seconds

const ResetPassword = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingEmail, setCheckingEmail] = useState(false);
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [emailCheckMessage, setEmailCheckMessage] = useState("");

  useEffect(() => {
    if (window.location.hash.includes("type=recovery")) {
      setMode("update");
    }
  }, []);

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = emailSchema.safeParse(email);
    if (!result.success) {
      toast({ 
        title: "Invalid email", 
        description: result.error.issues[0].message, 
        variant: "destructive",
        duration: TOAST_DURATION
      });
      return;
    }
    
    // Start checking email
    setCheckingEmail(true);
    setEmailChecked(false);
    setEmailCheckMessage("");
    
    try {
      // Check if email exists in the profiles table
      console.log("Checking email existence for:", result.data);
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('email')
        .eq('email', result.data)
        .maybeSingle();
      
      console.log("Profile query result:", { profileData, profileError });
      
      setCheckingEmail(false);
      setEmailChecked(true);

      if (profileError) {
        console.error("Profile query error:", profileError);
        // If the email column doesn't exist yet (migrations not run), fall back to sending reset email
        // This handles the case where migrations haven't been applied yet
        console.log("Email column might not exist, falling back to direct reset email send");
        setEmailExists(true);
        setEmailCheckMessage("Sending reset link...");
        
        const { error: resetError } = await supabase.auth.resetPasswordForEmail(result.data, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        
        if (resetError) {
          setEmailChecked(false);
          toast({ 
            title: "Error", 
            description: resetError.message, 
            variant: "destructive",
            duration: TOAST_DURATION
          });
          return;
        }
        
        setEmailCheckMessage("Reset link sent successfully!");
        toast({ 
          title: "Check your email", 
          description: "We've sent you a reset link.", 
          duration: TOAST_DURATION
        });
        
        setTimeout(() => {
          setEmail("");
          setEmailChecked(false);
          setEmailCheckMessage("");
        }, 2000);
        return;
      }

      if (!profileData) {
        console.log("No profile found for email:", result.data);
        setEmailExists(false);
        setEmailCheckMessage("Email doesn't exist in our system");
        toast({ 
          title: "Email not found", 
          description: "This email doesn't exist in our system. Please create a new account.", 
          variant: "destructive",
          duration: TOAST_DURATION
        });
        return;
      }

      // Email exists, send reset link
      setEmailExists(true);
      setEmailCheckMessage("Email found! Sending reset link...");
      
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(result.data, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (resetError) {
        setEmailChecked(false);
        toast({ 
          title: "Error", 
          description: resetError.message, 
          variant: "destructive",
          duration: TOAST_DURATION
        });
        return;
      }
      
      setEmailCheckMessage("Reset link sent successfully!");
      toast({ 
        title: "Check your email", 
        description: "We've sent you a reset link.", 
        duration: TOAST_DURATION
      });
      
      // Reset form after successful submission
      setTimeout(() => {
        setEmail("");
        setEmailChecked(false);
        setEmailCheckMessage("");
      }, 2000);
      
    } catch (err) {
      console.error("Error checking email:", err);
      setCheckingEmail(false);
      setEmailChecked(false);
      toast({ 
        title: "Error", 
        description: "Failed to check email. Please try again.", 
        variant: "destructive",
        duration: TOAST_DURATION
      });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = passwordSchema.safeParse(newPassword);
    if (!result.success) {
      toast({ 
        title: "Invalid password", 
        description: result.error.issues[0].message, 
        variant: "destructive",
        duration: TOAST_DURATION
      });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: result.data });
    setLoading(false);
    if (error) {
      toast({ 
        title: "Error", 
        description: error.message, 
        variant: "destructive",
        duration: TOAST_DURATION
      });
      return;
    }
    toast({ 
      title: "Password updated", 
      description: "You can now sign in with your new password.",
      duration: TOAST_DURATION
    });
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
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                  maxLength={255}
                  disabled={checkingEmail}
                />
              </div>

              {/* Email Check Loading State */}
              {checkingEmail && (
                <div className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                  <span className="text-blue-700 font-medium">Checking if email exists...</span>
                </div>
              )}

              {/* Email Check Result Message */}
              {emailChecked && !checkingEmail && (
                <div className={`p-4 rounded-lg border ${
                  emailExists 
                    ? "bg-green-50 border-green-200" 
                    : "bg-red-50 border-red-200"
                }`}>
                  <p className={`font-medium ${
                    emailExists 
                      ? "text-green-700" 
                      : "text-red-700"
                  }`}>
                    {emailCheckMessage}
                  </p>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full bg-meow-purple hover:bg-meow-purple/90" 
                disabled={checkingEmail}
              >
                {checkingEmail ? "Checking..." : "Send Reset Link"}
              </Button>
              
              {/* Reset button to try another email */}
              {emailChecked && !emailExists && (
                <Button 
                  type="button" 
                  variant="outline"
                  className="w-full" 
                  onClick={() => {
                    setEmail("");
                    setEmailChecked(false);
                    setEmailCheckMessage("");
                  }}
                >
                  Try Another Email
                </Button>
              )}
            </form>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              <div>
                <Label htmlFor="newPassword">New Password</Label>
                <Input 
                  id="newPassword" 
                  type="password" 
                  value={newPassword} 
                  onChange={(e) => setNewPassword(e.target.value)} 
                  required 
                  minLength={6} 
                  maxLength={100}
                  disabled={loading}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-meow-purple hover:bg-meow-purple/90" 
                disabled={loading}
              >
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
