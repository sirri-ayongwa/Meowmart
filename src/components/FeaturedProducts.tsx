
import { Heart, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';

// Mock product data
const products = [
  {
    id: 1,
    name: "Cat Lover Coffee Mug",
    price: 19.99,
    imageUrl: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=500&q=80",
    category: "Home Decor",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 2,
    name: "Kitty Plush Toy",
    price: 14.95,
    imageUrl: "https://images.unsplash.com/photo-1606914469633-cc99e76acb3a?auto=format&fit=crop&w=500&q=80",
    category: "Cat Toys",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 3,
    name: "Cat Print T-Shirt",
    price: 29.99,
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
    category: "Apparel",
    isNew: true,
    isBestseller: true,
  },
  {
    id: 4,
    name: "Cat Ears Beanie",
    price: 24.95,
    imageUrl: "https://images.unsplash.com/photo-1510598969022-c4c6c5d05769?auto=format&fit=crop&w=500&q=80",
    category: "Accessories",
    isNew: false,
    isBestseller: false,
  },
  {
    id: 5,
    name: "Cat Print Pillow Cover",
    price: 22.99,
    imageUrl: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=500&q=80",
    category: "Home Decor",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 6,
    name: "Interactive Laser Toy",
    price: 16.99,
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=500&q=80",
    category: "Cat Toys",
    isNew: true,
    isBestseller: false,
  },
  {
    id: 7,
    name: "Cat Face Socks",
    price: 9.99,
    imageUrl: "https://images.unsplash.com/photo-1589187151053-5ec8818e661b?auto=format&fit=crop&w=500&q=80",
    category: "Apparel",
    isNew: false,
    isBestseller: true,
  },
  {
    id: 8,
    name: "Cat Paw Necklace",
    price: 34.99,
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80",
    category: "Accessories",
    isNew: true,
    isBestseller: false,
  },
];

const FeaturedProducts = () => {
  const { addToCart, addToWishlist } = useCart();

  return (
    <section className="py-16 bg-meow-lightgray">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-cursive text-3xl font-bold text-meow-black md:text-4xl">
            Trending Products
          </h2>
          <p className="mx-auto max-w-2xl text-meow-gray">
            Discover our popular cat-themed products that feline fans are loving right now
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <div key={product.id} className="product-card bg-white">
              <div className="relative">
                <a href="#">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="product-image aspect-square w-full object-cover"
                  />
                </a>
                {product.isNew && (
                  <div className="absolute left-3 top-3 rounded bg-meow-purple px-2 py-1 text-xs font-medium text-white">
                    New
                  </div>
                )}
                {product.isBestseller && (
                  <div className="absolute left-3 top-3 rounded bg-meow-pink px-2 py-1 text-xs font-medium text-white">
                    Bestseller
                  </div>
                )}
                <button 
                  className="absolute right-3 top-3 rounded-full bg-white p-2 text-meow-gray shadow-md hover:text-meow-pink"
                  onClick={() => addToWishlist(product)}
                >
                  <Heart size={18} />
                </button>
              </div>
              <div className="p-4">
                <div className="mb-1 text-sm text-meow-gray">{product.category}</div>
                <h3 className="mb-2 text-base font-medium">
                  <a href="#" className="hover:text-meow-purple">{product.name}</a>
                </h3>
                <div className="mb-3 text-lg font-semibold">{formatCurrency(product.price)}</div>
                <Button 
                  className="w-full gap-2 bg-meow-purple text-white hover:bg-meow-purple/90"
                  onClick={() => addToCart(product)}
                >
                  <ShoppingBag size={16} />
                  Add to Cart
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button className="btn-meow px-8 py-3" asChild>
            <a href="/shop">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
