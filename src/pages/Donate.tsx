
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Heart, Cat, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const donationOptions = [
  { value: 10, label: "$10" },
  { value: 25, label: "$25" },
  { value: 50, label: "$50" },
  { value: 100, label: "$100" },
  { value: "custom", label: "Custom Amount" }
];

const Donate = () => {
  const [selectedAmount, setSelectedAmount] = useState<number | string>(25);
  const [customAmount, setCustomAmount] = useState("");
  const [donorInfo, setDonorInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    honorOf: ""
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = selectedAmount === "custom" ? customAmount : selectedAmount;
    
    // In a real application, this would process the donation
    console.log("Processing donation:", { amount, ...donorInfo });
    
    // Show success message
    toast({
      title: "Thank You for Your Donation!",
      description: `Your generous gift of $${amount} will help cats in need.`,
    });
    
    // Reset form
    setSelectedAmount(25);
    setCustomAmount("");
    setDonorInfo({
      firstName: "",
      lastName: "",
      email: "",
      honorOf: ""
    });
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-meow-lightgray to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="mb-4 font-cursive text-4xl font-bold text-meow-black md:text-5xl">
              The Ginger Charity Foundation
            </h1>
            <div className="mx-auto mb-8 flex max-w-xs items-center justify-center">
              <div className="h-px flex-1 bg-meow-pink"></div>
              <Heart size={24} className="mx-2 text-meow-purple" fill="currentColor" />
              <div className="h-px flex-1 bg-meow-pink"></div>
            </div>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-meow-gray">
              Your generous donation helps provide medical care, food, shelter, and loving homes for cats in need. 
              Together, we can make a difference in the lives of countless feline friends.
            </p>
            <div className="mx-auto w-full max-w-lg">
              <img 
                src="https://images.unsplash.com/photo-1582562124811-c09040d0a901?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Orange tabby cat" 
                className="mx-auto h-auto w-full max-w-md rounded-lg shadow-md"
              />
              <p className="mt-4 text-sm italic text-meow-gray">
                Ginger, the loving cat who inspired our mission
              </p>
            </div>
          </div>
        </section>
        
        {/* Donation Form */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl rounded-lg bg-meow-lightgray p-8 shadow-md">
              <h2 className="mb-6 text-center text-2xl font-bold text-meow-black">
                Make a Donation
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Donation Amount */}
                <div>
                  <label className="mb-2 block text-sm font-medium text-meow-black">
                    Select Donation Amount
                  </label>
                  <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                    {donationOptions.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`rounded-md border border-gray-300 px-4 py-2 text-center transition-colors ${
                          selectedAmount === option.value
                            ? "border-meow-purple bg-meow-purple text-white"
                            : "bg-white text-meow-gray hover:border-meow-purple hover:text-meow-purple"
                        }`}
                        onClick={() => setSelectedAmount(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  
                  {selectedAmount === "custom" && (
                    <div className="mt-3">
                      <label htmlFor="customAmount" className="sr-only">
                        Custom Amount
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                          <span className="text-gray-500">$</span>
                        </div>
                        <input
                          type="number"
                          id="customAmount"
                          value={customAmount}
                          onChange={(e) => setCustomAmount(e.target.value)}
                          placeholder="Enter amount"
                          min="1"
                          step="1"
                          required={selectedAmount === "custom"}
                          className="w-full rounded-md border border-gray-300 py-2 pl-7 pr-4 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Donor Information */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-meow-black">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={donorInfo.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-meow-black">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={donorInfo.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-meow-black">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={donorInfo.email}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                  />
                </div>
                
                <div>
                  <label htmlFor="honorOf" className="mb-2 block text-sm font-medium text-meow-black">
                    In Honor Of (Optional)
                  </label>
                  <input
                    type="text"
                    id="honorOf"
                    name="honorOf"
                    value={donorInfo.honorOf}
                    onChange={handleInputChange}
                    placeholder="Dedicate this donation to someone special"
                    className="w-full rounded-md border border-gray-300 px-4 py-2 focus:border-meow-purple focus:outline-none focus:ring-1 focus:ring-meow-purple"
                  />
                </div>
                
                <button
                  type="submit"
                  className="w-full rounded-full bg-meow-pink px-6 py-3 font-medium text-white transition-colors hover:bg-opacity-90"
                >
                  Donate Now
                </button>
              </form>
            </div>
          </div>
        </section>
        
        {/* Impact Section */}
        <section className="bg-meow-lightgray py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-10 text-center font-cursive text-3xl font-bold text-meow-black">
              Your Donation Makes a Difference
            </h2>
            
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-meow-purple text-white">
                  <Cat size={32} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-meow-black">Medical Care</h3>
                <p className="text-meow-gray">
                  Provides vaccinations, spay/neuter surgeries, and treatment for injured or sick cats.
                </p>
              </div>
              
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-meow-purple text-white">
                  <Check size={32} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-meow-black">Shelter & Food</h3>
                <p className="text-meow-gray">
                  Supplies safe housing, nutritious food, and essential care items for cats awaiting adoption.
                </p>
              </div>
              
              <div className="flex flex-col items-center rounded-lg bg-white p-6 text-center shadow-md">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-meow-purple text-white">
                  <Heart size={32} />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-meow-black">Rescue Operations</h3>
                <p className="text-meow-gray">
                  Funds rescue efforts to save cats from dangerous situations and high-kill shelters.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Donate;
