
import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

// Mock search data
const searchData = [
  { id: 1, title: 'Cat Lover Coffee Mug', category: 'product', url: '/shop' },
  { id: 2, title: 'Kitty Plush Toy', category: 'product', url: '/shop' },
  { id: 3, title: 'Cat Print T-Shirt', category: 'product', url: '/shop' },
  { id: 4, title: 'Shop for Cats', category: 'category', url: '/shop' },
  { id: 5, title: 'Shop for Humans', category: 'category', url: '/shop' },
  { id: 6, title: 'Cat Beds', category: 'category', url: '/shop' },
  { id: 7, title: 'The Secret Life of Indoor Cats', category: 'blog', url: '/blog' },
  { id: 8, title: 'About Meowmart', category: 'page', url: '/about' },
  { id: 9, title: 'Contact Us', category: 'page', url: '/contact' },
  { id: 10, title: 'Shipping & Returns', category: 'page', url: '/shipping-returns' },
];

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog: React.FC<SearchDialogProps> = ({ open, onOpenChange }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<typeof searchData>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchTerm.length > 1) {
      const filteredResults = searchData.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filteredResults);
    } else {
      setResults([]);
    }
  }, [searchTerm]);

  const handleResultClick = (url: string) => {
    navigate(url);
    onOpenChange(false);
    setSearchTerm('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Search for products, blog posts, and more..."
            className="pl-10 pr-4"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {results.length > 0 ? (
          <div className="mt-2 max-h-80 divide-y overflow-y-auto">
            {results.map((result) => (
              <div
                key={result.id}
                className="cursor-pointer px-2 py-3 hover:bg-gray-100"
                onClick={() => handleResultClick(result.url)}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{result.title}</span>
                  <span className="text-xs text-gray-500 uppercase">{result.category}</span>
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm.length > 1 ? (
          <div className="py-4 text-center text-gray-500">
            No results found for "{searchTerm}"
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
