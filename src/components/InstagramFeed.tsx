
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Instagram post mock data
const instagramPosts = [
  {
    id: 1,
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    imageUrl: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    imageUrl: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    imageUrl: "https://images.unsplash.com/photo-1533743983669-94fa5c4338ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    imageUrl: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    imageUrl: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
  }
];

const InstagramFeed = () => {
  return (
    <section className="pb-16 pt-8">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="mb-3 font-cursive text-3xl font-bold text-meow-black md:text-4xl">
            #meowmartmoments
          </h2>
          <p className="mx-auto max-w-2xl text-meow-gray">
            Tag us on Instagram for a chance to be featured
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
          {instagramPosts.map((post) => (
            <a 
              key={post.id} 
              href="https://www.instagram.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative block overflow-hidden"
            >
              <img 
                src={post.imageUrl} 
                alt="Instagram post" 
                className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-meow-purple/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-white p-2">
                  <ArrowRight size={16} className="text-meow-purple" />
                </div>
              </div>
            </a>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="https://www.instagram.com/meowmart/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-meow-purple hover:underline"
          >
            Follow us on Instagram
            <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
