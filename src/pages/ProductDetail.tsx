
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Star, 
  ChevronDown, 
  ChevronUp, 
  Mail,
  ArrowLeft,
  Filter
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from "@/components/ui/carousel";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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

const questionFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  question: z.string().min(5, "Question must be at least 5 characters"),
});

const reviewFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  rating: z.number().min(1).max(5),
  review: z.string().min(5, "Review must be at least 5 characters"),
});

interface Review {
  id: number;
  name: string;
  email: string;
  rating: number;
  review: string;
  date: Date;
}

const ProductDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state as { product: Product };
  const [quantity, setQuantity] = useState(1);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isQuestionOpen, setIsQuestionOpen] = useState(false);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewFilter, setReviewFilter] = useState<"recent" | "relevant">("recent");
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { toast } = useToast();
  
  const inCart = cartItems.some(item => item.id === product.id);
  const itemInCart = cartItems.find(item => item.id === product.id);

  // Generate similar products
  const similarProducts = Array.from({ length: 6 }, (_, i) => ({
    id: 1000 + i,
    name: `Similar ${product.subcategory} ${i + 1}`,
    price: Math.floor(Math.random() * 50) + 10,
    imageUrl: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 200000000)}?w=300&h=300&fit=crop&q=80`,
    category: product.category,
    subcategory: product.subcategory,
    inStock: Math.random() > 0.2,
    rating: Math.floor(Math.random() * 5) + 1,
    isBestseller: Math.random() > 0.7,
    images: [
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 200000000)}?w=600&h=600&fit=crop&q=80`,
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 200000000)}?w=600&h=600&fit=crop&q=80`,
      `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 200000000)}?w=600&h=600&fit=crop&q=80`
    ],
    description: `This is a premium quality ${product.subcategory.toLowerCase()} similar to what you're viewing.`
  }));

  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      name: "",
      email: "",
      question: "",
    },
  });

  const reviewForm = useForm<z.infer<typeof reviewFormSchema>>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 5,
      review: "",
    },
  });

  const handleAddToCart = () => {
    if (inCart) {
      updateQuantity(product.id, itemInCart!.quantity + quantity);
    } else {
      addToCart({...product, quantity});
    }
    setQuantity(1);
  };

  const handleSubmitQuestion = (values: z.infer<typeof questionFormSchema>) => {
    toast({
      title: "Question Submitted",
      description: "We'll get back to you as soon as possible!",
    });
    questionForm.reset();
    setIsQuestionOpen(false);
  };

  const handleSubmitReview = (values: z.infer<typeof reviewFormSchema>) => {
    const newReview: Review = {
      id: Date.now(),
      name: values.name,
      email: values.email,
      rating: values.rating,
      review: values.review,
      date: new Date()
    };
    setReviews(prev => [newReview, ...prev]);
    toast({
      title: "Review Submitted",
      description: "Thank you for your feedback!",
    });
    reviewForm.reset();
    setSelectedRating(5);
  };

  const shareProduct = (platform: string) => {
    toast({
      title: `Shared on ${platform}`,
      description: `You shared ${product.name} on ${platform}`,
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <Button 
          variant="ghost" 
          className="mb-6 flex items-center" 
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Shop
        </Button>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {/* Product Images Carousel */}
          <div>
            <Carousel className="w-full max-w-lg mx-auto">
              <CarouselContent>
                {product.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <div className="aspect-square overflow-hidden rounded-md">
                        <img
                          src={image}
                          alt={`${product.name} - Image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>

            <div className="flex justify-center mt-4 space-x-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className="w-16 h-16 rounded-md overflow-hidden border border-gray-200 cursor-pointer"
                >
                  <img 
                    src={image} 
                    alt={`${product.name} - Thumbnail ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Product Details */}
          <div>
            <div className="mb-2">
              <span className="text-sm text-gray-500">{product.category} / {product.subcategory}</span>
            </div>
            
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
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
            
            <p className="text-2xl font-bold mb-4">{formatCurrency(product.price)}</p>
            
            <div className="mb-6">
              <p className={`text-sm ${product.inStock ? 'text-green-600' : 'text-red-500'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </p>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="mr-4">
                <label className="block text-sm font-medium mb-1">Quantity</label>
                <div className="flex border rounded-md">
                  <button
                    className="px-3 py-2 text-meow-purple hover:bg-gray-100"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    className="px-3 py-2 text-meow-purple hover:bg-gray-100"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <Button
                className="bg-meow-purple hover:bg-meow-purple/90 flex-grow"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                {inCart ? 'Add More to Cart' : 'Add to Cart'}
              </Button>
            </div>
            
            {/* Product Description Collapsible */}
            <Collapsible
              open={isDescriptionOpen}
              onOpenChange={setIsDescriptionOpen}
              className="border rounded-md mb-4"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium">
                Product Description
                {isDescriptionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0 text-sm text-gray-600">
                <p>{product.description}</p>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Ask a Question Collapsible */}
            <Collapsible
              open={isQuestionOpen}
              onOpenChange={setIsQuestionOpen}
              className="border rounded-md mb-6"
            >
              <CollapsibleTrigger className="flex items-center justify-between w-full p-4 font-medium">
                Ask a Question
                {isQuestionOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </CollapsibleTrigger>
              <CollapsibleContent className="p-4 pt-0">
                <Form {...questionForm}>
                  <form onSubmit={questionForm.handleSubmit(handleSubmitQuestion)} className="space-y-4">
                    <FormField
                      control={questionForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={questionForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={questionForm.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Your Question</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Type your question here..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit">Submit Question</Button>
                  </form>
                </Form>
              </CollapsibleContent>
            </Collapsible>
            
            {/* Social Share */}
            <div className="mt-6">
              <p className="text-sm font-medium mb-2">Share this product:</p>
              <div className="flex space-x-2">
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => shareProduct('Facebook')}
                >
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => shareProduct('Twitter')}
                >
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => shareProduct('Instagram')}
                >
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Share on Instagram</span>
                </Button>
                <Button 
                  size="icon" 
                  variant="outline" 
                  onClick={() => shareProduct('Email')}
                >
                  <Mail className="h-4 w-4" />
                  <span className="sr-only">Share via Email</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* You May Also Like Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
          <Carousel className="w-full">
            <CarouselContent>
              {similarProducts.map((similarProduct) => (
                <CarouselItem key={similarProduct.id} className="md:basis-1/3 lg:basis-1/4">
                  <div className="p-1">
                    <div 
                      className="product-card bg-white shadow-sm rounded-lg overflow-hidden cursor-pointer"
                      onClick={() => navigate(`/product/${similarProduct.id}`, { state: { product: similarProduct } })}
                    >
                      <div className="h-48">
                        <img
                          src={similarProduct.imageUrl}
                          alt={similarProduct.name}
                          className="product-image h-full w-full object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-sm font-medium truncate">{similarProduct.name}</h3>
                        <p className="font-bold">{formatCurrency(similarProduct.price)}</p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
        
        {/* Reviews Display Section */}
        {reviews.length > 0 && (
          <div className="mb-16">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Customer Reviews ({reviews.length})</h2>
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  className="border rounded-md px-3 py-1 text-sm"
                  value={reviewFilter}
                  onChange={(e) => setReviewFilter(e.target.value as "recent" | "relevant")}
                >
                  <option value="recent">Most Recent</option>
                  <option value="relevant">Most Relevant</option>
                </select>
              </div>
            </div>
            <div className="space-y-4">
              {[...reviews]
                .sort((a, b) => {
                  if (reviewFilter === "recent") {
                    return b.date.getTime() - a.date.getTime();
                  } else {
                    return b.rating - a.rating;
                  }
                })
                .map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg border">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <div className="flex items-center mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">
                        {review.date.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{review.review}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {/* Write a Review Section */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
          <Form {...reviewForm}>
            <form onSubmit={reviewForm.handleSubmit(handleSubmitReview)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={reviewForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={reviewForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={reviewForm.control}
                name="rating"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rating</FormLabel>
                    <FormControl>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${
                              star <= selectedRating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                            }`}
                            onClick={() => {
                              setSelectedRating(star);
                              field.onChange(star);
                            }}
                          />
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={reviewForm.control}
                name="review"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Review</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Share your experience with this product..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button type="submit" className="bg-meow-purple hover:bg-meow-purple/90">
                Submit Review
              </Button>
            </form>
          </Form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
