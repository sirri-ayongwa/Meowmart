
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real application, this would send the email to a backend
    console.log("Subscribing email:", email);
    
    // Show success toast
    toast({
      title: "Successfully Subscribed!",
      description: "Thank you for subscribing to our newsletter.",
    });
    
    // Reset form
    setEmail("");
  };

  return (
    <div className="bg-meow-lightgray py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-3 font-cursive text-3xl font-bold text-meow-black">
            Join Our Newsletter
          </h2>
          <p className="mb-6 text-meow-gray">
            Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 rounded-full border-none px-6 py-3 focus:outline-none focus:ring-2 focus:ring-meow-purple"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-meow-pink px-6 py-3 font-medium text-white transition-colors hover:bg-opacity-90"
            >
              <Send size={18} />
              <span>Subscribe</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
