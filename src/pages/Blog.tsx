
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const POSTS_PER_PAGE = 3;

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
  {
    id: 3,
    title: "The Benefits of Adopting a Senior Cat",
    slug: "benefits-adopting-senior-cat",
    excerpt: "Why older cats make wonderful companions and deserve a second chance at finding their forever homes.",
    date: "March 30, 2025",
    author: "Tabby Thompson",
    imageUrl: "https://images.unsplash.com/photo-1585699324551-f6c309eedeca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>When many people think about adopting a cat, they often envision bringing home a playful kitten. However, senior cats (typically considered to be 7 years or older) have so much love to give and come with many advantages as companions.</p>
      
      <h3>What You See Is What You Get</h3>
      <p>One of the biggest benefits of adopting a senior cat is that their personality is already developed. Unlike kittens, who may change as they mature, older cats give you a clear sense of their temperament, energy levels, and sociability from the start.</p>
      
      <h3>Lower Maintenance</h3>
      <p>Senior cats typically require less supervision and training than kittens. They're usually already litter box trained and have outgrown destructive behaviors like climbing curtains or chewing on household items.</p>
      
      <h3>Calmer Energy</h3>
      <p>While they still enjoy play sessions, senior cats generally have a more relaxed demeanor. They're often content to curl up beside you while you work, read, or watch TV, making them perfect companions for those with quieter lifestyles.</p>
      
      <h3>Gratitude and Devotion</h3>
      <p>Many adopters report that senior cats seem to understand they've been given a second chance. These cats often form strong, appreciative bonds with their new families and show tremendous loyalty and affection.</p>
      
      <h3>Saving a Life</h3>
      <p>Perhaps the most meaningful reason to adopt a senior cat is that you're truly saving a life. Older cats have much lower adoption rates than kittens and face higher risks of euthanasia in shelters. By opening your home to a senior cat, you're providing them with comfort, love, and security in their golden years.</p>
      
      <p>If you're considering adding a feline friend to your family, don't overlook the sweet senior cats waiting for homes. They have so much love left to give and deserve the chance to spend their golden years in a loving forever home.</p>
    `
  },
  {
    id: 4,
    title: "How to Create a Cat-Friendly Garden",
    slug: "cat-friendly-garden",
    excerpt: "Tips for designing an outdoor space that's safe and enjoyable for your feline friends.",
    date: "March 22, 2025",
    author: "Garden Whiskers",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Creating a garden that's both beautiful for humans and safe for cats allows your feline friends to enjoy the outdoors while minimizing risks. Here's how to design a cat-friendly garden that you'll both enjoy.</p>
      
      <h3>Safe Plants</h3>
      <p>Many common garden plants can be toxic to cats. Avoid lilies, tulips, daffodils, azaleas, and other poisonous varieties. Instead, plant cat-safe options like catnip, cat grass, valerian, and silver vine. These not only are safe but will also actively attract and delight your feline friends.</p>
      
      <h3>Dedicated Digging Areas</h3>
      <p>Cats naturally want to dig and may target your flower beds. Create a dedicated digging area with loose soil or sand to redirect this behavior away from your prized plantings.</p>
      
      <h3>Shady Retreats</h3>
      <p>Cats love to lounge in the sunshine but also need shady spots to escape the heat. Plant tall grasses or create little shelters where they can rest comfortably even on hot days.</p>
      
      <h3>Water Features</h3>
      <p>Many cats are fascinated by moving water. A small, shallow fountain can provide entertainment and encourage hydration. Just ensure it's stable and not too deep for safety.</p>
      
      <h3>Perches and Pathways</h3>
      <p>Cats love to climb and observe their territory from elevated positions. Create pathways through your garden with stepping stones, and consider adding secure shelves, stumps, or cat-specific outdoor furniture for perching.</p>
      
      <h3>Secure Boundaries</h3>
      <p>If you want to keep your cats contained in your garden, consider cat-proof fencing options. These typically involve inward-facing top sections that prevent cats from climbing out.</p>
      
      <p>With thoughtful planning, your garden can become a safe haven where your cats can experience the stimulation of the outdoors while remaining protected from common hazards.</p>
    `
  },
  {
    id: 5,
    title: "The Magic of Cat Purrs: Health Benefits for Humans",
    slug: "cat-purrs-health-benefits",
    excerpt: "Discover how your cat's soothing purr might actually be improving your physical and mental health.",
    date: "March 15, 2025",
    author: "Dr. Purr Science",
    imageUrl: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>The gentle rumble of a cat's purr is one of the most soothing sounds in the world. But did you know that this comforting vibration might actually have healing properties for humans? Research suggests that sharing your home with a purring cat could benefit your health in several surprising ways.</p>
      
      <h3>Stress Reduction</h3>
      <p>Studies have shown that interacting with cats, especially when they're purring, can lower stress hormones like cortisol while increasing feel-good hormones like oxytocin. This biochemical shift can help reduce anxiety and promote a sense of calm.</p>
      
      <h3>Lower Blood Pressure</h3>
      <p>The calming effect of a purring cat can actually help lower your blood pressure. Research has found that cat owners generally have lower blood pressure than non-pet owners, and the rhythmic sound of purring may contribute to this benefit.</p>
      
      <h3>Healing Vibrations</h3>
      <p>Perhaps most fascinating is the potential physical healing properties of cat purrs. Cats purr at a frequency of 25 to 150 Hertz, a range that has been shown to promote healing in various tissues and bones. Some scientists believe that cats may have evolved their purr partly as a self-healing mechanism, which is why they often purr when injured or in labor.</p>
      
      <h3>Improved Sleep</h3>
      <p>The rhythmic sound of purring can function as a natural white noise machine, helping some people fall asleep more easily and sleep more deeply. The comforting presence of a purring cat can also promote relaxation that leads to better sleep quality.</p>
      
      <h3>Heart Health</h3>
      <p>Multiple studies have linked cat ownership to reduced risk of heart attack and stroke. While this connection likely involves multiple factors, the stress-reducing effects of that soothing purr may play a significant role.</p>
      
      <p>So the next time your feline friend climbs onto your lap and starts their motor running, take a moment to appreciate not just the companionship they're offering, but also the potential health benefits you're receiving from their special brand of sound therapy.</p>
    `
  },
  {
    id: 6,
    title: "Introducing a New Cat to Your Home",
    slug: "introducing-new-cat",
    excerpt: "A step-by-step guide to smoothly transitioning a new feline friend into your household.",
    date: "March 8, 2025",
    author: "Cat Integration Specialist",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Bringing a new cat home is exciting, but proper introduction techniques are crucial for creating a positive experience for both the new cat and existing pets. Follow these steps to help your new feline family member settle in smoothly.</p>
      
      <h3>Prepare a Safe Room</h3>
      <p>Before bringing your new cat home, prepare a quiet room with all their essentials: litter box, food, water, bed, toys, and scratching post. This gives them a safe space to adjust to new sounds and smells without feeling overwhelmed.</p>
      
      <h3>Take It Slow</h3>
      <p>Keep your new cat in their safe room for at least a few days, allowing them to build confidence in their smaller territory before facing the whole house. Visit frequently to build trust and bond with them.</p>
      
      <h3>Scent Swapping</h3>
      <p>If you have other pets, start the introduction by exchanging scents. Swap bedding between your new cat and existing pets, or use a clean sock to gently rub against each animal and then place it in the other's area. This helps them get familiar with each other's scent before meeting face to face.</p>
      
      <h3>First Visual Contact</h3>
      <p>After a few days, allow visual contact in a controlled way. Try feeding existing pets and your new cat on opposite sides of a door, gradually moving bowls closer as they become comfortable. You can also use a baby gate or crack the door so they can see each other without full contact.</p>
      
      <h3>Supervised Interactions</h3>
      <p>When both sides seem comfortable with visual contact, allow short, supervised face-to-face meetings. Be prepared to separate them if there's any aggression. Gradually increase the length of these interactions.</p>
      
      <h3>Watch Body Language</h3>
      <p>Learn to read feline body language so you can intervene before conflicts escalate. Signs of stress include flattened ears, tail twitching, growling, or hissing. Positive signs include relaxed posture, normal eating, and gentle curiosity.</p>
      
      <p>Remember that successful introductions often take weeks or even months, especially with adult cats. Be patient and never force interactions. With time and proper management, many cats who start as strangers can become friends—or at least peaceful housemates.</p>
    `
  },
  {
    id: 7,
    title: "Grooming Tips for Long-Haired Cats",
    slug: "grooming-long-haired-cats",
    excerpt: "Essential grooming practices to keep your long-haired feline looking fabulous and feeling comfortable.",
    date: "February 28, 2025",
    author: "Fluffy McGroomer",
    imageUrl: "https://images.unsplash.com/photo-1592086721909-3e2d4a28e203?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Long-haired cats are gorgeous, but their magnificent coats require regular maintenance to prevent mats, reduce hairballs, and keep them comfortable. Here's a comprehensive guide to grooming your long-haired feline friend.</p>
      
      <h3>Daily Brushing</h3>
      <p>The most important aspect of long-haired cat care is daily brushing. Use a stainless steel comb or slicker brush to gently work through their coat, starting at the head and working toward the tail. Pay special attention to areas prone to matting: behind the ears, under the legs, and around the collar.</p>
      
      <h3>Dealing with Mats</h3>
      <p>If you find a mat, never try to cut it out with scissors, as you could accidentally cut your cat's skin. Instead, try to gently tease it apart with your fingers, or use a mat splitter or dematting tool designed for cats. For severe mats, consult a professional groomer.</p>
      
      <h3>Bathing Basics</h3>
      <p>While cats are excellent self-groomers, long-haired varieties occasionally benefit from baths, especially if they've gotten into something sticky or smelly. Use cat-specific shampoo and ensure the water is lukewarm. Have everything ready before bringing your cat to the bathing area, and consider placing a non-slip mat in the tub or sink.</p>
      
      <h3>Seasonal Considerations</h3>
      <p>Long-haired cats typically shed more heavily during seasonal changes. During these periods, increase brushing to twice daily if possible. Some owners find that a professional grooming appointment at the beginning of summer helps their cat stay cooler and more comfortable.</p>
      
      <h3>Creating Positive Associations</h3>
      <p>Make grooming a positive experience by offering treats, praise, and gentle pets during and after sessions. Start with short grooming periods when your cat is calm, gradually extending the time as they become more comfortable with the process.</p>
      
      <p>Remember that regular grooming isn't just about keeping your cat looking beautiful—it's essential for their health and comfort. By establishing a consistent grooming routine, you'll help prevent painful mats, reduce hairballs, and strengthen your bond with your magnificent long-haired companion.</p>
    `
  },
  {
    id: 8,
    title: "Decoding Your Cat's Meows: What Are They Saying?",
    slug: "decoding-cat-meows",
    excerpt: "Learn to understand the different vocal communications your cat uses and what they're trying to tell you.",
    date: "February 20, 2025",
    author: "Meow Translator",
    imageUrl: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Cats have a complex vocabulary of sounds they use to communicate with humans and other animals. By learning to distinguish between different types of meows, you can better understand what your feline friend is trying to tell you.</p>
      
      <h3>The Short Greeting Meow</h3>
      <p>A brief, mid-pitched "meow" is often a simple hello. You'll likely hear this when you come home or enter a room where your cat is lounging. It's their way of acknowledging your presence and saying, "Oh, it's you!"</p>
      
      <h3>The Repeated Meow</h3>
      <p>A series of meows usually indicates excitement or urgency. Your cat might use this pattern when they're eagerly awaiting dinner or when they really want you to play with them. The more urgent the need (in their opinion), the more insistent and frequent the meows.</p>
      
      <h3>The Long, Drawn-Out "Mrrroooow"</h3>
      <p>This distinctive sound often indicates a request or demand. Your cat might use this when they want you to open a door, provide more food, or pay attention to something they find important.</p>
      
      <h3>The High-Pitched Trill or Chirp</h3>
      <p>This birdlike sound, something between a meow and a purr, is generally a positive greeting sound. Mother cats use it with kittens, and adult cats often use it as a friendly hello to their favorite humans. Consider it a compliment!</p>
      
      <h3>The Low-Pitched Growl or Howl</h3>
      <p>These sounds indicate distress, anger, or pain. If your cat suddenly starts making these vocalizations, they might be frightened, feeling territorial, or experiencing discomfort. It's a good idea to check what's bothering them or consult a vet if the behavior persists.</p>
      
      <h3>The Silent Meow</h3>
      <p>This is when your cat goes through the motion of meowing without making a sound. It's often used as a subtle request and is particularly common in cats who have learned that humans respond well to their meows but don't want to be too demanding.</p>
      
      <p>Remember that each cat has their own unique vocal patterns, and the better you know your individual cat, the more accurately you'll be able to interpret their particular "dialect" of meows.</p>
    `
  },
  {
    id: 9,
    title: "Cat-Proofing Your Home: A Comprehensive Guide",
    slug: "cat-proofing-your-home",
    excerpt: "Essential steps to make your living space safe and comfortable for your feline companion.",
    date: "February 12, 2025",
    author: "Safety First Feline",
    imageUrl: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Creating a cat-safe environment is essential for keeping your curious feline friend healthy and preventing damage to your belongings. Here's a room-by-room guide to cat-proofing your home.</p>
      
      <h3>Throughout the House</h3>
      <p>Secure or remove toxic plants like lilies, tulips, and philodendrons. Hide or cover electrical cords that might be tempting to chew. Keep small, swallowable items like rubber bands, paper clips, and hair ties stored away. Install childproof latches on cabinets containing chemicals or medications.</p>
      
      <h3>Living Room</h3>
      <p>Provide appropriate scratching surfaces to protect furniture. Consider using double-sided tape or aluminum foil temporarily on furniture edges to discourage scratching. Secure heavy items that could be knocked over, and check that your blinds don't have cords that could entangle your cat.</p>
      
      <h3>Kitchen</h3>
      <p>Keep food securely stored and counters clear when not in use. Use childproof latches on cabinets containing cleaning supplies. Be careful with hot surfaces and never leave cooking unattended. Keep trash cans covered or in cabinets to prevent scavenging.</p>
      
      <h3>Bathroom</h3>
      <p>Keep toilet lids closed to prevent drinking or falling in. Store medications securely. Check for small spaces behind appliances where a cat could get stuck. Keep personal care products like dental floss, which can cause intestinal damage if swallowed, out of reach.</p>
      
      <h3>Bedroom</h3>
      <p>Be careful with loose threads on bedding that could be ingested. Keep small items like jewelry or buttons secured. If you have items stored under the bed, make sure your cat can't access anything harmful.</p>
      
      <h3>Laundry Room</h3>
      <p>Always check the washing machine and dryer before use – cats love to sneak in for naps. Keep detergents and fabric softeners stored securely. Clean lint traps regularly to prevent fire hazards.</p>
      
      <p>Remember that cat-proofing is an ongoing process, especially with kittens or newly adopted cats. Observe your cat's behavior and make adjustments as needed to ensure your home remains a safe haven for your feline family member.</p>
    `
  },
  {
    id: 10,
    title: "Choosing the Right Cat Food: A Guide to Feline Nutrition",
    slug: "choosing-cat-food-nutrition-guide",
    excerpt: "Navigate the complex world of cat food options to provide optimal nutrition for your feline friend.",
    date: "February 5, 2025",
    author: "Nutritionist Whiskerton",
    imageUrl: "https://images.unsplash.com/photo-1603314585431-ee2960a9f975?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    content: `
      <p>Providing proper nutrition is one of the most important aspects of caring for your cat. With countless options available, choosing the right food can feel overwhelming. This guide will help you navigate the choices and select the best diet for your feline companion.</p>
      
      <h3>Understanding Your Cat's Nutritional Needs</h3>
      <p>Cats are obligate carnivores, meaning they require animal protein to thrive. Their natural diet is high in protein, moderate in fat, and low in carbohydrates. They need specific nutrients like taurine and arachidonic acid that are only found in animal tissues.</p>
      
      <h3>Wet Food vs. Dry Food</h3>
      <p>Wet food generally provides more moisture, which is beneficial for kidney health and helps prevent urinary issues. It typically contains more protein and fewer carbohydrates than dry food. Dry food is convenient, helps with dental health, and can be left out longer. Many veterinarians recommend a combination of both for balanced benefits.</p>
      
      <h3>Reading Labels</h3>
      <p>Look for foods where a specific animal protein (like chicken, turkey, or salmon) is listed as the first ingredient. Avoid products with generic terms like "meat by-products" or those containing excessive fillers like corn and wheat. A statement that the food meets AAFCO (Association of American Feed Control Officials) standards ensures it provides complete nutrition.</p>
      
      <h3>Life Stage Considerations</h3>
      <p>Kittens need more calories and nutrients to support growth. Senior cats may benefit from foods formulated for aging cats, with easier-to-digest proteins and added supplements for joint health. Pregnant or nursing cats have increased nutritional needs similar to kittens.</p>
      
      <h3>Special Health Considerations</h3>
      <p>Some cats require prescription diets for conditions like kidney disease, diabetes, or food allergies. Always consult your veterinarian before starting a therapeutic diet. Weight management formulas can help overweight cats safely reach a healthier size.</p>
      
      <p>Remember that the best food for your cat is one that meets their nutritional needs and that they'll actually eat. Monitor your cat's weight, energy levels, coat condition, and litterbox habits to assess how well their current diet is working for them. When changing foods, transition gradually over 7-10 days to prevent digestive upset.</p>
    `
  }
];

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  
  // Calculate total number of pages
  const totalPages = Math.ceil(blogPosts.length / POSTS_PER_PAGE);
  
  // Get current posts
  const indexOfLastPost = currentPage * POSTS_PER_PAGE;
  const indexOfFirstPost = indexOfLastPost - POSTS_PER_PAGE;
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center font-cursive text-4xl font-bold text-meow-black md:text-5xl">Meow Blog</h1>
        <p className="mx-auto mb-12 max-w-2xl text-center text-meow-gray">
          Discover tips, stories, and insights about our feline friends. From care guides to heartwarming tales, our blog is for cat lovers everywhere.
        </p>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {totalPages > 1 && (
          <Pagination className="mt-12">
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
              
              {Array.from({ length: totalPages }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                    className="cursor-pointer"
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
                    className="cursor-pointer"
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
