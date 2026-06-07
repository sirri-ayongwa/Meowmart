import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

const schema = z.object({
  fullName: z.string().trim().min(1, "Name required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Password must be at least 6 characters").max(100),
});

const TOAST_DURATION = 15000; // 15 seconds

const Signup = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cartItems, addToCart } = useCart();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);

  useEffect(() => {
    // When user is authenticated after signup, merge cart items
    if (user) {
      // Check for pre-signup cart items (from unauthenticated browsing)
      const pendingCartItems = localStorage.getItem('pendingCartItems');
      
      if (pendingCartItems) {
        try {
          const items = JSON.parse(pendingCartItems);
          // Add pending items to current cart
          items.forEach((item: any) => {
            addToCart(item);
          });
          localStorage.removeItem('pendingCartItems');
        } catch (err) {
          console.error("Error restoring cart items:", err);
          localStorage.removeItem('pendingCartItems');
        }
      }
      
      navigate("/account", { replace: true });
    }
    setIsInitializing(false);
  }, [user, navigate, addToCart]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = schema.safeParse({ fullName, email, password });
    if (!result.success) {
      toast({ 
        title: "Invalid input", 
        description: result.error.issues[0].message, 
        variant: "destructive",
        duration: TOAST_DURATION
      });
      return;
    }
    setLoading(true);
    
    // Store current cart items to persist after signup
    if (cartItems.length > 0) {
      localStorage.setItem('pendingCartItems', JSON.stringify(cartItems));
    }
    
    const { error } = await supabase.auth.signUp({
      email: result.data.email,
      password: result.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/account`,
        data: { full_name: result.data.fullName },
      },
    });
    setLoading(false);
    if (error) {
      localStorage.removeItem('pendingCartItems');
      toast({ 
        title: "Signup failed", 
        description: error.message, 
        variant: "destructive",
        duration: TOAST_DURATION
      });
      return;
    }
    toast({ 
      title: "Account created!", 
      description: "Welcome to Meowmart 🐾",
      duration: TOAST_DURATION
    });
    navigate("/account");
  };

  if (isInitializing) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-12 bg-meow-lightgray">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-8">
          <h1 className="font-cursive text-4xl text-center text-meow-purple mb-2">Join the Club</h1>
          <p className="text-center text-meow-gray mb-6">Create your Meowmart account</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                value={fullName} 
                onChange={(e) => setFullName(e.target.value)} 
                required 
                maxLength={100}
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                maxLength={255}
                disabled={loading}
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"}
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                  minLength={6} 
                  maxLength={100}
                  disabled={loading}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-meow-purple hover:bg-meow-purple/90" 
              disabled={loading}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>
          </form>
          <p className="text-center text-sm text-meow-gray mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-meow-purple font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Signup;
