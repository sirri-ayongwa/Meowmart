
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone } from "lucide-react";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const faqs = [
  {
    id: "1",
    question: "What is your shipping policy?",
    answer: "We offer free shipping on all orders over $50 within the continental US. Orders typically ship within 1-2 business days and arrive within 3-7 business days depending on your location. International shipping is available for select countries."
  },
  {
    id: "2",
    question: "How do I return an item?",
    answer: "If you're not completely satisfied with your purchase, you can return it within 30 days of receipt for a full refund or exchange. Items must be unused, in their original packaging, and include all accessories. Simply contact our customer service team to initiate the return process."
  },
  {
    id: "3",
    question: "Are your products safe for cats?",
    answer: "Absolutely! All our cat products are made with pet-safe materials and undergo rigorous testing to ensure they meet safety standards. We prioritize your pet's health and well-being in all our product designs."
  },
  {
    id: "4",
    question: "Do you donate to animal shelters?",
    answer: "Yes, we donate a percentage of all sales to the Ginger Charity Foundation, which supports various animal rescue organizations. We also run special promotions throughout the year where proceeds go directly to our partner shelters."
  },
  {
    id: "5",
    question: "Can I track my order?",
    answer: "Yes, once your order ships, you'll receive a confirmation email with tracking information. You can also log into your account on our website to view order status and tracking details at any time."
  }
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const { toast } = useToast();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, this would send the form data to a backend
    console.log("Form submitted:", formData);
    
    // Show success message
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you soon!",
    });
    
    // Reset form
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Contact Hero */}
        <section className="bg-meow-lightgray py-12">
          <div className="container mx-auto px-4">
            <h1 className="mb-4 text-center font-cursive text-4xl font-bold text-meow-black md:text-5xl">
              Contact Us
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-center text-meow-gray">
              Have questions about our products or services? We're here to help! 
              Reach out to our friendly team using any of the methods below.
            </p>
            
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-8 md:flex-row">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <MapPin size={32} className="mb-3 text-meow-purple" />
                <h3 className="mb-2 text-lg font-semibold text-meow-black">Visit Us</h3>
                <p className="text-meow-gray">
                  123 Whisker Lane, Purrington<br />
                  Catville, CA 90210
                </p>
              </div>
              
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <Phone size={32} className="mb-3 text-meow-purple" />
                <h3 className="mb-2 text-lg font-semibold text-meow-black">Call Us</h3>
                <p className="text-meow-gray">
                  <a href="tel:+18001234567" className="hover:text-meow-purple">
                    1-800-123-4567
                  </a>
                </p>
                <p className="text-sm text-meow-gray">
                  Mon-Fri: 9AM - 5PM PST
                </p>
              </div>
              
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <Mail size={32} className="mb-3 text-meow-purple" />
                <h3 className="mb-2 text-lg font-semibold text-meow-black">Email Us</h3>
                <p className="text-meow-gray">
                  <a href="mailto:info@meowmart.com" className="hover:text-meow-purple">
                    info@meowmart.com
                  </a>
                </p>
                <p className="text-sm text-meow-gray">
                  We reply within 24 hours
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Form & Map */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 font-cursive text-3xl font-bold text-meow-black">
                  Send Us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-meow-black">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-meow-black">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                      placeholder="Your email"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-meow-black">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                      placeholder="Your message"
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="btn-meow w-full"
                  >
                    Send Message
                  </button>
                </form>
              </div>
              
              <div>
                <h2 className="mb-6 font-cursive text-3xl font-bold text-meow-black">
                  Store Location
                </h2>
                <div className="overflow-hidden rounded-lg shadow-md">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387193.3060117317!2d-74.25987368715491!3d40.69767006766623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sca!4v1598918503021!5m2!1sen!2sca"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Meowmart Location"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section id="faq" className="bg-meow-lightgray py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-center font-cursive text-3xl font-bold text-meow-black">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id}>
                    <AccordionTrigger className="text-left text-meow-black">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-meow-gray">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
