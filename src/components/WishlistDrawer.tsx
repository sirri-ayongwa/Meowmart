
import React from "react";
import { Heart, ShoppingBag, Trash2, X } from "lucide-react";
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
import { formatCurrency } from "@/lib/utils";

interface WishlistDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ open, onOpenChange }) => {
  const { wishlistItems, removeFromWishlist, moveToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent className="w-full max-w-md sm:max-w-lg">
          <SheetHeader className="border-b pb-4">
            <SheetTitle className="flex items-center">
              <Heart className="mr-2" /> Your Wishlist
            </SheetTitle>
          </SheetHeader>
          <div className="flex h-[70vh] flex-col items-center justify-center">
            <Heart size={64} className="mb-4 text-gray-300" />
            <h3 className="mb-2 text-xl font-semibold">Your wishlist is empty</h3>
            <p className="mb-6 text-center text-gray-500">
              Save items you love for later by adding them to your wishlist.
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
            <Heart className="mr-2" /> Your Wishlist ({wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'})
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex max-h-[calc(100vh-200px)] flex-col gap-4 overflow-y-auto py-4">
          {wishlistItems.map((item) => (
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
                
                <div className="mt-2 flex items-center justify-end">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => moveToCart(item.id)}
                      className="text-gray-500 hover:text-meow-purple"
                    >
                      <ShoppingBag size={18} />
                    </button>
                    <button 
                      onClick={() => removeFromWishlist(item.id)}
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
        
        <SheetFooter className="mt-auto border-t pt-4">
          <Button 
            onClick={() => {
              wishlistItems.forEach(item => moveToCart(item.id));
            }}
            className="w-full bg-meow-purple hover:bg-meow-purple/90"
          >
            Add All to Cart
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default WishlistDrawer;
