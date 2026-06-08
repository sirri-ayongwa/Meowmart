
import { Cat } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Cat Toys",
    imageUrl: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Apparel",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Home Decor",
    imageUrl: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Accessories",
    imageUrl: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=500&q=80",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="mb-2 font-cursive text-3xl font-bold text-meow-black md:text-4xl">Shop by Category</h2>
          <div className="mx-auto flex max-w-xs items-center justify-center">
            <div className="h-px flex-1 bg-meow-pink"></div>
            <Cat size={24} className="mx-2 text-meow-purple" />
            <div className="h-px flex-1 bg-meow-pink"></div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <a 
              key={category.id} 
              href="#" 
              className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-square">
                <img 
                  src={category.imageUrl} 
                  alt={category.name} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                <div>
                  <h3 className="text-xl font-semibold">{category.name}</h3>
                  <p className="mt-1 text-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    Shop Collection
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
