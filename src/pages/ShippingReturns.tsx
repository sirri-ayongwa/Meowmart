
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Truck, RotateCcw, Package, CreditCard } from "lucide-react";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="container mx-auto px-4 py-12">
        <h1 className="mb-8 text-center font-cursive text-4xl font-bold text-meow-black md:text-5xl">
          Shipping & Returns
        </h1>
        
        <div className="mx-auto max-w-3xl">
          {/* Shipping Info */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <Truck size={28} className="text-meow-purple" />
              <h2 className="text-2xl font-bold text-meow-black">Shipping Information</h2>
            </div>
            
            <div className="rounded-lg bg-meow-lightgray p-6">
              <h3 className="mb-3 text-lg font-semibold text-meow-black">Processing Time</h3>
              <p className="mb-6 text-meow-gray">
                Orders are typically processed within 1-2 business days. During peak seasons or promotional periods, 
                processing may take up to 3 business days. You'll receive a confirmation email with tracking information 
                once your order ships.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-meow-black">Shipping Methods & Timeframes</h3>
              <div className="mb-6 space-y-3 text-meow-gray">
                <p><strong>Standard Shipping:</strong> 3-7 business days (Free on orders $50+)</p>
                <p><strong>Expedited Shipping:</strong> 2-3 business days ($9.95)</p>
                <p><strong>Express Shipping:</strong> 1-2 business days ($14.95)</p>
              </div>
              
              <h3 className="mb-3 text-lg font-semibold text-meow-black">International Shipping</h3>
              <p className="mb-6 text-meow-gray">
                We ship to select countries worldwide. International shipping rates and delivery times vary by location. 
                Please note that customers are responsible for any customs fees, import taxes, or duties that may apply.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-meow-black">Shipping Restrictions</h3>
              <p className="text-meow-gray">
                Some items may be restricted from international shipping due to regulations. If an item in your cart 
                cannot be shipped to your location, you will be notified during checkout.
              </p>
            </div>
          </section>
          
          {/* Returns Info */}
          <section className="mb-12">
            <div className="mb-6 flex items-center gap-3">
              <RotateCcw size={28} className="text-meow-purple" />
              <h2 className="text-2xl font-bold text-meow-black">Returns & Exchanges</h2>
            </div>
            
            <div className="rounded-lg bg-meow-lightgray p-6">
              <h3 className="mb-3 text-lg font-semibold text-meow-black">Return Policy</h3>
              <p className="mb-6 text-meow-gray">
                If you're not completely satisfied with your purchase, you may return it within 30 days of receipt for a 
                full refund or exchange. Items must be unused, in their original packaging, and include all accessories.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-meow-black">How to Return an Item</h3>
              <ol className="mb-6 list-inside list-decimal space-y-2 text-meow-gray">
                <li>Contact our customer service team to initiate your return and receive a Return Authorization (RA) number.</li>
                <li>Pack the item(s) securely in the original packaging if possible.</li>
                <li>Include your order number and RA number with your return.</li>
                <li>Ship your return to the address provided by our customer service team.</li>
              </ol>
              
              <h3 className="mb-3 text-lg font-semibold text-meow-black">Refund Process</h3>
              <p className="mb-6 text-meow-gray">
                Once we receive and inspect your return, we'll process your refund within 5-7 business days. Refunds will 
                be issued to the original payment method used for the purchase. Shipping costs are non-refundable unless 
                the return is due to our error.
              </p>
              
              <h3 className="mb-3 text-lg font-semibold text-meow-black">Exchanges</h3>
              <p className="text-meow-gray">
                To exchange an item, please follow the same process as returns. Once we receive your return, we'll ship 
                the replacement item to you. If the exchange is for a different item with a different price, we'll either 
                charge or refund the difference as appropriate.
              </p>
            </div>
          </section>
          
          {/* Additional Info */}
          <section>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-lg bg-meow-lightgray p-6">
                <div className="mb-4 flex items-center gap-3">
                  <Package size={24} className="text-meow-purple" />
                  <h3 className="text-lg font-semibold text-meow-black">Damaged or Defective Items</h3>
                </div>
                <p className="text-meow-gray">
                  If your item arrives damaged or defective, please contact us within 48 hours of receipt. We'll arrange 
                  for a replacement or refund at no additional cost to you. Please take photos of the damaged items and 
                  packaging to help us process your claim more efficiently.
                </p>
              </div>
              
              <div className="rounded-lg bg-meow-lightgray p-6">
                <div className="mb-4 flex items-center gap-3">
                  <CreditCard size={24} className="text-meow-purple" />
                  <h3 className="text-lg font-semibold text-meow-black">Payment Methods</h3>
                </div>
                <p className="text-meow-gray">
                  We accept Visa, Mastercard, American Express, Discover, PayPal, and Apple Pay. All transactions are 
                  securely processed and your payment information is never stored on our servers. For your security, 
                  billing addresses must match the address associated with your payment method.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingReturns;
