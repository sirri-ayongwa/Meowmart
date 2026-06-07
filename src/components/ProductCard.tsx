
import React from "react";
import { Star, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  inStock: boolean;
  rating: number;
  isBestseller: boolean;
}

interface ProductCardProps {
  product: Product;
  onProductClick: () => void;
  inCart: boolean;
  onAddToCart: () => void;
  onUpdateQuantity: (quantity: number) => void;
  currentQuantity: number;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onProductClick,
  inCart,
  onAddToCart,
  onUpdateQuantity,
  currentQuantity
}) => {
  return (
    <div className="product-card bg-white shadow-sm rounded-lg overflow-hidden">
      <div 
        className="relative h-64 cursor-pointer" 
        onClick={onProductClick}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="product-image h-full w-full object-cover"
        />
        {product.isBestseller && (
          <div className="absolute top-2 left-2 bg-meow-pink text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
            <Star className="w-3 h-3 mr-1" />
            Bestseller
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div onClick={onProductClick} className="cursor-pointer">
          <h3 className="text-lg font-medium mb-1 hover:text-meow-purple transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className="flex mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.rating}.0)</span>
          </div>
          
          <div className="flex justify-between items-center mb-3">
            <p className="font-bold text-lg">{formatCurrency(product.price)}</p>
            <div className="flex items-center text-sm">
              <Package className="w-4 h-4 mr-1" />
              <span className={product.inStock ? "text-green-600" : "text-red-500"}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
        
        {!inCart ? (
          <Button
            onClick={onAddToCart}
            className="w-full bg-meow-purple hover:bg-meow-purple/90"
            disabled={!product.inStock}
          >
            Add to Cart
          </Button>
        ) : (
          <div className="flex items-center justify-between border rounded-md">
            <button
              className="px-3 py-2 text-meow-purple hover:bg-gray-100"
              onClick={() => onUpdateQuantity(currentQuantity - 1)}
            >
              -
            </button>
            <span className="px-3 py-2">{currentQuantity}</span>
            <button
              className="px-3 py-2 text-meow-purple hover:bg-gray-100"
              onClick={() => onUpdateQuantity(currentQuantity + 1)}
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
