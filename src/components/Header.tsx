
import { useState } from 'react';
import { ShoppingBag, Search, Menu, X, Heart, User, LogOut, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import CartDrawer from './CartDrawer';
import WishlistDrawer from './WishlistDrawer';
import SearchDialog from './SearchDialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartItems } = useCart();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Announcement bar */}
      <div className="bg-meow-pink py-2 text-center text-sm font-medium text-white overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          Free shipping on orders over $50! 🐾
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile menu button */}
          <button 
            className="rounded-md p-2 text-meow-gray hover:bg-meow-lightgray md:hidden" 
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          
          {/* Logo */}
          <div className="flex flex-1 items-center justify-center md:justify-start">
            <Link to="/" className="text-2xl font-bold text-meow-purple">
              <span className="font-cursive">Meowmart</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex space-x-6">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/shop" className="nav-link">Shop</Link></li>
              <li><Link to="/blog" className="nav-link">Meow Blog</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
              <li><Link to="/contact" className="nav-link">Contact</Link></li>
            </ul>
          </nav>
          
          {/* Header actions */}
          <div className="flex items-center space-x-4">
            <button 
              className="hidden rounded-md p-2 text-meow-gray hover:text-meow-purple md:block"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <DropdownMenu>
  <DropdownMenuTrigger className="hidden md:flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-meow-gray hover:text-white hover:bg-meow-purple transition-all duration-300">
    <User size={18} />
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end" className="w-48">
    {user ? (
      <>
        <DropdownMenuLabel className="truncate">{user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate('/account')} className="gap-2 cursor-pointer">
          <Package size={16} /> My Account
        </DropdownMenuItem>
        <DropdownMenuItem onClick={async () => { await signOut(); navigate('/'); }} className="gap-2 cursor-pointer">
          <LogOut size={16} /> Sign out
        </DropdownMenuItem>
      </>
    ) : (
      <>
        <DropdownMenuItem onClick={() => navigate('/login')} className="cursor-pointer">
          Sign in
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate('/signup')} className="cursor-pointer">
          Create account
        </DropdownMenuItem>
      </>
    )}
  </DropdownMenuContent>
</DropdownMenu>
            <button 
              className="hidden rounded-md p-2 text-meow-gray hover:text-meow-purple md:block relative"
              onClick={() => setIsWishlistOpen(true)}
            >
              <Heart size={20} />
            </button>
            <button 
              className="relative rounded-md p-2 text-meow-gray hover:text-meow-purple"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <Badge className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-meow-purple p-0 text-[10px] text-white">
                  {cartItemCount}
                </Badge>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-[100px] z-50 flex h-[calc(100vh-100px)] w-full flex-col bg-white p-4 md:hidden">
          <div className="flex justify-between py-2">
            <span className="text-lg font-semibold">Menu</span>
          </div>
          <nav className="mt-4">
            <ul className="flex flex-col space-y-4">
              <li><Link to="/" className="block py-2 text-lg" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/shop" className="block py-2 text-lg" onClick={toggleMenu}>Shop</Link></li>
              <li><Link to="/blog" className="block py-2 text-lg" onClick={toggleMenu}>Meow Blog</Link></li>
              <li><Link to="/about" className="block py-2 text-lg" onClick={toggleMenu}>About</Link></li>
              <li><Link to="/contact" className="block py-2 text-lg" onClick={toggleMenu}>Contact</Link></li>
            </ul>
          </nav>
          <div className="mt-auto flex space-x-4 border-t border-gray-200 pt-4">
            <button 
              className="flex items-center space-x-2 text-meow-gray"
              onClick={() => {
                setIsMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <Search size={20} />
              <span>Search</span>
            </button>
            <button 
  className="flex items-center space-x-2 text-meow-gray"
  onClick={() => {
    setIsMenuOpen(false);
    if (!user) {
      navigate('/login');
    } else {
      navigate('/account');
    }
  }}
>
  <User size={20} />
  <span>{user ? 'Account' : 'Sign In'}</span>
</button>
            
          </div>
        </div>
      )}

      {/* Drawers */}
      <CartDrawer open={isCartOpen} onOpenChange={setIsCartOpen} />
      <WishlistDrawer open={isWishlistOpen} onOpenChange={setIsWishlistOpen} />
      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
};

export default Header;
