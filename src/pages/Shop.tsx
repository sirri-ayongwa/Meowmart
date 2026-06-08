
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Cat, User, Star, Package } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { formatCurrency } from "@/lib/utils";
import ProductCard from "@/components/ProductCard";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

// Category types and interfaces
interface Category {
  id: number;
  name: string;
  slug: string;
  subcategories: Subcategory[];
}

interface Subcategory {
  id: number;
  name: string;
  slug: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  subcategory: string;
  inStock: boolean;
  rating: number;
  isBestseller: boolean;
  images: string[];
  description: string;
}

const Shop = () => {
  const [activeTab, setActiveTab] = useState("cats");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("recommended");
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 9;
  const navigate = useNavigate();
  const { addToCart, cartItems, updateQuantity } = useCart();

  // Cat categories with subcategories
  const catCategories: Category[] = [
    { 
      id: 1, 
      name: "Cat Beds & Furniture", 
      slug: "cat-beds-furniture", 
      subcategories: [
        { id: 1, name: "Cat Beds", slug: "cat-beds" },
        { id: 2, name: "Cat Trees", slug: "cat-trees" },
        { id: 3, name: "Scratching Posts", slug: "scratching-posts" }
      ]
    },
    { 
      id: 2, 
      name: "Cat Toys", 
      slug: "cat-toys", 
      subcategories: [
        { id: 4, name: "Interactive Toys", slug: "interactive-toys" },
        { id: 5, name: "Catnip Toys", slug: "catnip-toys" },
        { id: 6, name: "Feather Toys", slug: "feather-toys" }
      ]
    },
    { 
      id: 3, 
      name: "Cat Clothing & Accessories", 
      slug: "cat-clothing", 
      subcategories: [
        { id: 7, name: "Cat Collars", slug: "cat-collars" },
        { id: 8, name: "Cat Outfits", slug: "cat-outfits" },
        { id: 9, name: "Cat Bandanas", slug: "cat-bandanas" }
      ]
    }
  ];

  // Human categories with subcategories
  const humanCategories: Category[] = [
    { 
      id: 4, 
      name: "Apparel", 
      slug: "apparel", 
      subcategories: [
        { id: 10, name: "T-Shirts", slug: "t-shirts" },
        { id: 11, name: "Hoodies", slug: "hoodies" },
        { id: 12, name: "Socks", slug: "socks" }
      ]
    },
    { 
      id: 5, 
      name: "Home Decor", 
      slug: "home-decor", 
      subcategories: [
        { id: 13, name: "Wall Art", slug: "wall-art" },
        { id: 14, name: "Pillows", slug: "pillows" },
        { id: 15, name: "Mugs", slug: "mugs" }
      ]
    },
    { 
      id: 6, 
      name: "Accessories", 
      slug: "accessories", 
      subcategories: [
        { id: 16, name: "Bags", slug: "bags" },
        { id: 17, name: "Jewelry", slug: "jewelry" },
        { id: 18, name: "Phone Cases", slug: "phone-cases" }
      ]
    }
  ];

  // Curated, reliable Unsplash images for products
  const imagePool = [
    "photo-1514228742587-6b1558fcca3d",
    "photo-1606914469633-cc99e76acb3a",
    "photo-1521572163474-6864f9cf17ab",
    "photo-1510598969022-c4c6c5d05769",
    "photo-1540574163026-643ea20ade25",
    "photo-1592194996308-7b43878e84a6",
    "photo-1589187151053-5ec8818e661b",
    "photo-1611591437281-460bfbe1220a",
    "photo-1513360371669-4adf3dd7dff8",
    "photo-1495360010541-f48722b34f7d",
    "photo-1518791841217-8f162f1e1131",
    "photo-1574158622682-e40e69881006",
    "photo-1533743983669-94fa5c4338ec",
    "photo-1561948955-570b270e7c36",
    "photo-1573865526739-10659fec78a5",
    "photo-1592078615290-033ee584e267",
  ];
  const pickImage = (seed: number, size = 300) =>
    `https://images.unsplash.com/${imagePool[seed % imagePool.length]}?auto=format&fit=crop&w=${size}&h=${size}&q=80`;

  // Generate dummy products for each subcategory
  useEffect(() => {
    const generateProducts = () => {
      const allProducts: Product[] = [];
      const categories = activeTab === "cats" ? catCategories : humanCategories;
      let counter = 0;

      categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          // Generate 3 products for each subcategory
          for (let i = 1; i <= 3; i++) {
            const id = subcategory.id * 100 + i;
            allProducts.push({
              id,
              name: `${subcategory.name} - Item ${i}`,
              price: Math.floor(Math.random() * 50) + 10,
              imageUrl: pickImage(counter, 300),
              category: category.name,
              subcategory: subcategory.name,
              inStock: Math.random() > 0.2,
              rating: Math.floor(Math.random() * 5) + 1,
              isBestseller: Math.random() > 0.7,
              images: [
                pickImage(counter, 600),
                pickImage(counter + 1, 600),
                pickImage(counter + 2, 600),
              ],
              description: `This is a premium quality ${subcategory.name.toLowerCase()} designed with comfort and enjoyment in mind. Made from high-quality materials, this product will last for years to come.`
            });
            counter++;
          }
        });
      });
      setProducts(allProducts);
    };

    generateProducts();
  }, [activeTab]);

  // Filter and sort products when subcategories or sortBy changes
  useEffect(() => {
    let filtered = [...products];
    
    // Filter by selected subcategories
    if (selectedSubcategories.length > 0) {
      filtered = filtered.filter(product => 
        selectedSubcategories.includes(product.subcategory)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "bestsellers":
        filtered = filtered.filter(product => product.isBestseller);
        break;
      case "price-low-high":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high-low":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "under-15":
        filtered = filtered.filter(product => product.price < 15);
        break;
      case "in-stock":
        filtered = filtered.filter(product => product.inStock);
        break;
      case "out-of-stock":
        filtered = filtered.filter(product => !product.inStock);
        break;
      default:
        // "recommended" - no specific sorting
        break;
    }
    
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [products, selectedSubcategories, sortBy]);

  // Handle subcategory checkbox change
  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategories(prev => {
      if (prev.includes(subcategory)) {
        return prev.filter(item => item !== subcategory);
      } else {
        return [...prev, subcategory];
      }
    });
  };

  // Handle product click - navigate to product detail page
  const handleProductClick = (product: Product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle next and previous page buttons
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center font-cursive text-4xl font-bold text-meow-black md:text-5xl">Shop</h1>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mx-auto">
          <TabsList className="mb-10 grid w-full grid-cols-2 bg-meow-lightgray p-1">
            <TabsTrigger value="cats" className="flex items-center gap-2 data-[state=active]:bg-meow-purple data-[state=active]:text-white">
              <Cat size={18} />
              <span>Shop for Cats</span>
            </TabsTrigger>
            <TabsTrigger value="humans" className="flex items-center gap-2 data-[state=active]:bg-meow-purple data-[state=active]:text-white">
              <User size={18} />
              <span>Shop for Humans</span>
            </TabsTrigger>
          </TabsList>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar with categories */}
            <div className="w-full md:w-1/4 bg-white rounded-lg p-4 shadow-sm">
              <h2 className="text-xl font-medium mb-4">Categories</h2>
              
              <Accordion type="multiple" className="w-full">
                {(activeTab === "cats" ? catCategories : humanCategories).map((category) => (
                  <AccordionItem key={category.id} value={category.slug}>
                    <AccordionTrigger className="text-md font-medium">
                      {category.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 pl-2">
                        {category.subcategories.map((subcategory) => (
                          <div key={subcategory.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={subcategory.slug} 
                              checked={selectedSubcategories.includes(subcategory.name)}
                              onCheckedChange={() => handleSubcategoryChange(subcategory.name)}
                            />
                            <label
                              htmlFor={subcategory.slug}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {subcategory.name}
                            </label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              
              <div className="border-t border-gray-200 mt-6 pt-6">
                <h2 className="text-xl font-medium mb-4">Filter By</h2>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full mb-4">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">Recommended</SelectItem>
                    <SelectItem value="bestsellers">Best Sellers</SelectItem>
                    <SelectItem value="price-low-high">Price: Low to High</SelectItem>
                    <SelectItem value="price-high-low">Price: High to Low</SelectItem>
                    <SelectItem value="under-15">Under $15</SelectItem>
                    <SelectItem value="in-stock">Availability: In Stock</SelectItem>
                    <SelectItem value="out-of-stock">Availability: Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Products grid */}
            <div className="w-full md:w-3/4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onProductClick={() => handleProductClick(product)}
                      inCart={cartItems.some(item => item.id === product.id)}
                      onAddToCart={() => addToCart(product)}
                      onUpdateQuantity={(quantity) => {
                        const existingItem = cartItems.find(item => item.id === product.id);
                        if (existingItem) {
                          updateQuantity(product.id, quantity);
                        }
                      }}
                      currentQuantity={cartItems.find(item => item.id === product.id)?.quantity || 0}
                    />
                  ))
                ) : (
                  <div className="col-span-3 text-center py-10">
                    <p className="text-lg text-gray-500">No products found. Please try a different filter.</p>
                  </div>
                )}
              </div>
              
              {/* Pagination */}
              {filteredProducts.length > productsPerPage && (
                <div className="flex justify-between items-center mt-8">
                  <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          </div>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
