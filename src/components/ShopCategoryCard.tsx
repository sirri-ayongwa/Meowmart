
import { Link } from "react-router-dom";

interface ShopCategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
}

const ShopCategoryCard = ({ name, slug, imageUrl }: ShopCategoryCardProps) => {
  return (
    <Link 
      to={`/shop/${slug}`} 
      className="group relative overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl"
    >
      <div className="aspect-square">
        <img 
          src={imageUrl} 
          alt={name} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
        <h3 className="text-xl font-semibold">{name}</h3>
      </div>
    </Link>
  );
};

export default ShopCategoryCard;
