import React, { useState } from "react";
import { ShoppingBag, Heart, Plus, Minus, Trash2, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { convertUSDToNGN } from "@/lib/currencyConverter";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    PaystackPop?: any;
  }
}

const PAYSTACK_PUBLIC_KEY = "pk_test_979a9fbce710ea4ed4bbb17ed282eb26df334e29";

interface CartDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onOpenChange }) => {
  const { cartItems, removeFromCart, updateQuantity, moveToWishlist, clearCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const itemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user) {
      toast({ title: "Sign in required", description: "Please sign in to checkout.", variant: "destructive" });
      onOpenChange(false);
      navigate("/login");
      return;
    }
    if (!window.PaystackPop) {
      toast({ title: "Payment unavailable", description: "Paystack failed to load. Refresh and try again.", variant: "destructive" });
      return;
    }
    setProcessing(true);
    
    try {
      // Convert USD to NGN for Paystack payment
      const ngnAmount = await convertUSDToNGN(cartTotal);
      
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: ngnAmount * 100, // Paystack expects amount in kobo
        currency: "NGN",
        ref: `MM-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        callback: (response: any) => {
          (async () => {
            const { error } = await supabase.functions.invoke("paystack-verify", {
              body: {
                reference: response.reference,
                items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, imageUrl: i.imageUrl })),
              },
            });
            setProcessing(false);
            if (error) {
              toast({ title: "Verification failed", description: error.message, variant: "destructive" });
              return;
            }
            toast({ title: "Payment successful", description: "Your order has been placed." });
            clearCart();
            onOpenChange(false);
            navigate("/account");
          })();
        },
        onClose: () => setProcessing(false),
      });
      handler.openIframe();
    } catch (error) {
      console.error("Error during checkout:", error);
      toast({ title: "Checkout error", description: "An error occurred during checkout. Please try again.", variant: "destructive" });
      setProcessing(false);
    }
  };

  if (itemCount === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full max-w-md sm:max-w-lg">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center">
              <ShoppingBag className="mr-2" /> Your Cart
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[70vh] flex-col items-center justify-center">
            <ShoppingBag size={64} className="mb-4 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold">Your cart is empty</h3>
            <p className="mb-6 text-center text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <SheetClose asChild>
              <Button className="bg-meow-purple hover:bg-meow-purple/90">
                Continue Shopping
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full max-w-md sm:max-w-lg">
        <SheetHeader className="border-b pb-4">
          <SheetTitle className="flex items-center">
            <ShoppingBag className="mr-2" /> Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex max-h-[calc(100vh-200px)] flex-col gap-4 overflow-y-auto py-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 border-b border-gray-100 pb-4">
              <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              </div>
              
              <div className="flex flex-1 flex-col">
                <h3 className="text-sm font-medium">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <p className="mt-1 text-sm font-semibold">{formatCurrency(item.price)}</p>
                
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center border rounded">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 text-gray-500 hover:text-gray-700"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-2">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 text-gray-500 hover:text-gray-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <button 
                      onClick={() => moveToWishlist(item.id)}
                      className="text-gray-500 hover:text-meow-pink"
                    >
                      <Heart size={18} />
                    </button>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-auto border-t pt-4">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-base font-medium">Subtotal</span>
            <span className="text-xl font-bold">{formatCurrency(cartTotal)}</span>
          </div>
          
          <SheetFooter className="flex flex-col gap-2 sm:flex-row">
            <Button 
              variant="outline" 
              onClick={clearCart}
              className="w-full"
            >
              Clear Cart
            </Button>
            <Button
              className="w-full bg-meow-purple hover:bg-meow-purple/90 text-white"
              onClick={handleCheckout}
              disabled={processing}
            >
              {processing ? "Processing..." : "Checkout"}
            </Button>
          </SheetFooter>
          <p className="mt-4 text-center text-xs text-gray-500">
            Shipping, taxes, and discounts calculated at checkout
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
