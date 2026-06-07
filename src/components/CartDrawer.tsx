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
      // Convert USD to NGN for Paystack
      const amountInNGN = await convertUSDToNGN(cartTotal);
      
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: amountInNGN * 100, // Paystack expects amount in kobo (hundredths)
        currency: "NGN",
        ref: `MM-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        callback: (response: any) => {
          (async () => {
            const { error } = await supabase.functions.invoke("paystack-verify", {
              body: {
                reference: response.reference,
                items: cartItems.map((i) => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity, imageUrl: i.imageUrl })),
                amountInUSD: cartTotal,
                amountInNGN: amountInNGN,
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
      setProcessing(false);
      toast({ 
        title: "Checkout error", 
        description: "Failed to process checkout. Please try again.", 
        variant: "destructive" 
      });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag size={20} />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4">
          {itemCount === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-center text-meow-gray">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 border-b pb-3">
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-20 w-20 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-meow-gray">{formatCurrency(item.price)}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="rounded p-1 hover:bg-meow-lightgray"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="rounded p-1 hover:bg-meow-lightgray"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
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
              ))}
            </div>
          )}
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
              disabled={processing || itemCount === 0}
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
