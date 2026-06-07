
import { Link } from "react-router-dom";

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

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <article className="group overflow-hidden rounded-lg shadow-md transition-all duration-300 hover:shadow-xl">
      <Link to={`/blog/${post.slug}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        <div className="p-6">
          <div className="mb-2 flex items-center gap-2 text-sm text-meow-gray">
            <span>{post.date}</span>
            <span>•</span>
            <span>{post.author}</span>
          </div>
          <h3 className="mb-3 text-xl font-bold text-meow-black transition-colors group-hover:text-meow-purple">
            {post.title}
          </h3>
          <p className="text-meow-gray">
            {post.excerpt}
          </p>
          <div className="mt-4 text-sm font-medium text-meow-purple">
            Read More
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
