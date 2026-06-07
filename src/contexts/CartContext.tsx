
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useToast } from "@/hooks/use-toast";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  category: string;
}

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlistItems: WishlistItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: any) => void;
  removeFromWishlist: (id: number) => void;
  moveToWishlist: (id: number) => void;
  moveToCart: (id: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const { toast } = useToast();

  const addToCart = (product: any) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        toast({
          title: "Quantity updated",
          description: `${product.name} quantity increased in your cart.`,
        });
        
        return prevItems.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
        
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from cart",
          description: `${itemToRemove.name} has been removed from your cart.`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const addToWishlist = (product: any) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevItems;
      } else {
        toast({
          title: "Added to wishlist",
          description: `${product.name} has been added to your wishlist.`,
        });
        
        return [...prevItems, product];
      }
    });
  };

  const removeFromWishlist = (id: number) => {
    setWishlistItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === id);
      if (itemToRemove) {
        toast({
          title: "Removed from wishlist",
          description: `${itemToRemove.name} has been removed from your wishlist.`,
        });
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  const moveToWishlist = (id: number) => {
    const item = cartItems.find(item => item.id === id);
    if (item) {
      addToWishlist({
        id: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrl,
        category: item.category
      });
      removeFromCart(id);
      toast({
        title: "Moved to wishlist",
        description: `${item.name} has been moved to your wishlist.`,
      });
    }
  };

  const moveToCart = (id: number) => {
    const item = wishlistItems.find(item => item.id === id);
    if (item) {
      addToCart(item);
      removeFromWishlist(id);
      toast({
        title: "Moved to cart",
        description: `${item.name} has been added to your cart.`,
      });
    }
  };

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      wishlistItems,
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart, 
      addToWishlist, 
      removeFromWishlist,
      moveToWishlist,
      moveToCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
