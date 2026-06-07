
import { Facebook, Instagram, Twitter, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

const Footer = () => {
  return (
    <footer className="bg-meow-lightgray">
      <Newsletter />
      <div className="container mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 gap-10 pb-10 sm:grid-cols-2 md:grid-cols-4 lg:gap-16">
          {/* Logo and about */}
          <div>
            <h3 className="font-cursive mb-5 text-2xl font-bold text-meow-purple">
              Meowmart
            </h3>
            <p className="mb-6 text-meow-gray">
              Dedicated to making products that celebrate the special bond between cats and their humans.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-meow-purple p-2 text-white hover:bg-opacity-90">
                <Facebook size={18} />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-meow-purple p-2 text-white hover:bg-opacity-90">
                <Instagram size={18} />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-meow-purple p-2 text-white hover:bg-opacity-90">
                <Twitter size={18} />
              </a>
              <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-meow-purple p-2 text-white hover:bg-opacity-90">
                <Youtube size={18} />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-meow-black">Shop</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="text-meow-gray hover:text-meow-purple">New Arrivals</Link></li>
              <li><Link to="/shop" className="text-meow-gray hover:text-meow-purple">Bestsellers</Link></li>
              <li><Link to="/shop" className="text-meow-gray hover:text-meow-purple">Shop for Cats</Link></li>
              <li><Link to="/shop" className="text-meow-gray hover:text-meow-purple">Shop for Humans</Link></li>
            </ul>
          </div>
          
          {/* Info */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-meow-black">Information</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-meow-gray hover:text-meow-purple">About Us</Link></li>
              <li><Link to="/contact" className="text-meow-gray hover:text-meow-purple">Contact Us</Link></li>
              <li><Link to="/shipping-returns" className="text-meow-gray hover:text-meow-purple">Shipping & Returns</Link></li>
              <li><Link to="/contact#faq" className="text-meow-gray hover:text-meow-purple">FAQ</Link></li>
              <li><Link to="/terms-of-service" className="text-meow-gray hover:text-meow-purple">Terms of Service</Link></li>
              <li><Link to="/privacy-policy" className="text-meow-gray hover:text-meow-purple">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="mb-5 text-lg font-semibold text-meow-black">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <a href="https://www.google.ca/maps/" target="_blank" rel="noopener noreferrer" className="flex items-start hover:text-meow-purple">
                  <MapPin size={20} className="mr-3 mt-1 text-meow-purple" />
                  <span className="text-meow-gray">
                    123 Whisker Lane, Purrington<br />
                    Catville, CA 90210
                  </span>
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-meow-purple" />
                <a href="tel:+18001234567" className="text-meow-gray hover:text-meow-purple">
                  1-800-123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-meow-purple" />
                <a href="mailto:info@meowmart.com" className="text-meow-gray hover:text-meow-purple">
                  info@meowmart.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Bottom footer */}
      <div className="border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-sm text-meow-gray">
              © 2025 Meowmart. All rights reserved.
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" className="h-8 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="Mastercard" className="h-8 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196565.png" alt="PayPal" className="h-8 w-auto" />
                <img src="https://cdn-icons-png.flaticon.com/512/196/196539.png" alt="American Express" className="h-8 w-auto" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
