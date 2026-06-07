
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { Check } from "lucide-react";

const PromoSection = () => {
  const [email, setEmail] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would call an API to subscribe the user
    console.log("Subscribing email:", email);
    
    // Show success modal
    setShowSuccess(true);
    
    // Show toast notification
    toast({
      title: "Subscribed!",
      description: "You've been added to our newsletter.",
    });
    
    setEmail("");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-meow-pink/30 to-meow-purple/30">
          <div className="flex flex-col-reverse items-center md:flex-row">
            <div className="w-full space-y-6 p-8 md:w-1/2 md:p-12">
              <h2 className="font-cursive text-3xl font-bold text-meow-black md:text-4xl">
                Join Our Meow Club!
              </h2>
              <p className="text-lg text-meow-gray">
                Sign up for our newsletter and get 15% off your first order, plus exclusive access to new arrivals and special promotions.
              </p>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full rounded-full border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none sm:flex-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" className="btn-meow whitespace-nowrap">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-meow-gray">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
              </p>
            </div>
            <div className="relative w-full md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
                alt="Cat with sunglasses"
                className="h-auto w-full"
              />
              <div className="absolute bottom-4 right-4 rounded-full bg-white p-3 shadow-lg">
                <div className="rounded-full bg-meow-pink p-1 text-lg font-bold text-white">15% OFF</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Successfully Subscribed!</DialogTitle>
            <DialogDescription className="text-center">
              Thank you for joining our Meow Club!
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-6">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-center">
              We've sent your 15% discount code to your email. Check your inbox to start saving!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PromoSection;
