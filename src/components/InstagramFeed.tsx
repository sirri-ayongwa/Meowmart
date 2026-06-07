import { Instagram } from 'lucide-react';
const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    caption: "Sunday cuddles with my fur baby 😻 #catlife"
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    caption: "My new Cat Lover mug from @meowmart is purrfect! ☕"
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    caption: "Matching with my little buddy today 🐱 #catlover"
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1511044568932-338cba0ad803?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    caption: "Absolutely in love with these cat plushies! 💕"
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    caption: "Can't get enough of my kitty socks collection #catfashion"
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80",
    caption: "This little furball approves of his new toy! Thanks @meowmart"
  },
];

const InstagramFeed = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-cursive text-3xl font-bold text-meow-black md:text-4xl">
            #MeowmartMoments
          </h2>
          <p className="mx-auto max-w-2xl text-meow-gray">
            Tag us on Instagram for a chance to be featured in our gallery
          </p>
          <a 
            href="https://www.instagram.com/meowmart/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 text-meow-purple hover:text-meow-purple/80"
          >
            <Instagram size={20} />
            <span>@meowmart</span>
          </a>
        </div>
        
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
          {images.map((image) => (
            <a 
              key={image.id} 
              href="https://www.instagram.com/" 
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden"
            >
              <div className="aspect-square">
                <img 
                  src={image.url} 
                  alt="Instagram post" 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 p-4 text-sm text-white opacity-0 transition-all duration-300 group-hover:bg-opacity-60 group-hover:opacity-100">
                <p className="text-center line-clamp-3">{image.caption}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
