
import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  author: string;
  imageUrl: string;
  content: string;
}

// Import the blog posts data from the Blog page
// This would normally come from an API or database
const blogPosts = [
  {
    id: 1,
    title: "10 Ways to Keep Your Cat Entertained Indoors",
    slug: "10-ways-to-keep-cat-entertained",
    excerpt: "Discover fun and engaging activities to keep your indoor cat happy and stimulated throughout the day.",
    date: "April 15, 2025",
    author: "Dr. Felix Whiskers",
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Indoor cats need mental and physical stimulation to stay happy and healthy. Here are ten proven ways to keep your feline friend entertained when they can't go outside:</p>
      
      <h3>1. Interactive Toys</h3>
      <p>Toys that move, make noise, or dispense treats can keep your cat engaged for hours. Look for toys that mimic the movement of prey to satisfy their hunting instincts.</p>
      
      <h3>2. Climbing Spaces</h3>
      <p>Cats love to climb and perch in high places. Cat trees, shelves, or window perches give them vertical space to explore and observe their surroundings.</p>
      
      <h3>3. Puzzle Feeders</h3>
      <p>Make mealtime more engaging with puzzle feeders that require your cat to work for their food, stimulating their natural hunting instincts.</p>
      
      <h3>4. Rotating Toy Collection</h3>
      <p>Cats can get bored with the same toys. Try rotating their toys every few days to keep things fresh and exciting.</p>
      
      <h3>5. Window Watching Stations</h3>
      <p>Set up comfortable spots near windows where your cat can watch birds, squirrels, and other outdoor activities.</p>
      
      <h3>6. Cat TV or Videos</h3>
      <p>There are videos and apps designed specifically for cats, featuring birds, fish, and mice that can captivate your cat's attention.</p>
      
      <h3>7. Training Sessions</h3>
      <p>Contrary to popular belief, cats can be trained! Short training sessions for tricks or behaviors can be mentally stimulating.</p>
      
      <h3>8. Catnip or Cat Grass</h3>
      <p>Many cats respond positively to catnip or cat grass, which can provide temporary entertainment and enrichment.</p>
      
      <h3>9. Cardboard Boxes</h3>
      <p>Never underestimate the appeal of a simple cardboard box! Cats love to hide, jump in and out, and play in boxes of all sizes.</p>
      
      <h3>10. Quality Time Together</h3>
      <p>Sometimes the best entertainment for your cat is simply spending time with you. Regular play sessions, grooming, and cuddles can help keep your cat content and stimulated.</p>
      
      <p>By incorporating these activities into your cat's routine, you can help ensure they stay happy, healthy, and entertained, even if they never set paw outside.</p>
    `
  },
  {
    id: 2,
    title: "Understanding Your Cat's Body Language",
    slug: "understanding-cat-body-language",
    excerpt: "Learn to interpret what your cat is trying to tell you through their subtle (and not-so-subtle) body language cues.",
    date: "April 7, 2025",
    author: "Whisker Whisperer",
    imageUrl: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Cats may not speak our language, but they're communicating with us all the time. Learning to read your cat's body language can help you understand their needs, moods, and feelings.</p>
      
      <h3>Tail Positions</h3>
      <p>Your cat's tail is like a mood indicator. A high, upright tail usually means they're feeling confident and content. A low or tucked tail can indicate fear or submission. A puffed-up tail means your cat is startled or frightened, while a gently swishing tail could mean they're focused on something interesting.</p>
      
      <h3>Ear Movements</h3>
      <p>Forward-facing ears generally indicate a relaxed, attentive cat. If their ears are flattened against their head, your cat is likely feeling scared or aggressive. Ears that swivel like radar dishes mean they're alert and processing multiple sounds.</p>
      
      <h3>Eye Contact</h3>
      <p>Slow blinks from your cat are the equivalent of a kitty kiss - it means they trust you and feel comfortable. Dilated pupils can indicate excitement or fear, while constricted pupils might mean your cat is stimulated or agitated.</p>
      
      <h3>Vocalizations</h3>
      <p>From purrs to meows to growls, each sound your cat makes has a different meaning. Purring usually indicates contentment, though cats may also purr when stressed as a self-soothing mechanism. Short meows are typically greetings, while prolonged yowls might indicate discomfort or stress.</p>
      
      <h3>Body Postures</h3>
      <p>An arched back with puffed fur is a classic defensive posture, making your cat look bigger to potential threats. A cat lying on their back with their belly exposed is showing ultimate trust, though be cautious - some cats will still react defensively if you try to pet their exposed belly.</p>
      
      <p>By paying attention to these cues and learning your individual cat's patterns, you'll develop a deeper understanding of your feline friend and strengthen your bond.</p>
    `
  },
  // ... include all other blog posts from the Blog.tsx file
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [recommendedPosts, setRecommendedPosts] = useState<BlogPost[]>([]);
  
  useEffect(() => {
    // Find the current post based on slug
    const currentPost = blogPosts.find((post) => post.slug === slug) || null;
    setPost(currentPost);
    
    // Get 3 random posts that are not the current post for recommendations
    if (currentPost) {
      const otherPosts = blogPosts.filter((p) => p.id !== currentPost.id);
      const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
      setRecommendedPosts(shuffled.slice(0, 3));
    }
  }, [slug]);
  
  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="mb-4 text-2xl font-bold">Blog post not found</h1>
            <Link to="/blog" className="text-meow-purple hover:underline">
              Return to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <article className="mx-auto max-w-3xl">
          <Link to="/blog" className="mb-6 inline-flex items-center text-meow-purple hover:underline">
            &larr; Back to Blog
          </Link>
          
          <h1 className="mb-4 text-3xl font-bold text-meow-black md:text-4xl">
            {post.title}
          </h1>
          
          <div className="mb-6 flex items-center gap-2 text-sm text-meow-gray">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          
          <div className="mb-8 overflow-hidden rounded-lg">
            <img 
              src={post.imageUrl} 
              alt={post.title} 
              className="h-auto w-full object-cover"
            />
          </div>
          
          <div 
            className="prose prose-lg max-w-none prose-headings:text-meow-black prose-p:text-meow-gray prose-a:text-meow-purple"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
        
        {recommendedPosts.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl">
            <h2 className="mb-8 text-center text-2xl font-bold text-meow-black">
              Recommended Reads
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {recommendedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
