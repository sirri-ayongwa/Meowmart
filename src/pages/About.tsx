import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Cat, Heart } from "lucide-react";
import LadyLuck from "@/assets/images/lady-luck.png";
import Feline from "@/assets/images/felinefix.png";
import AlleyCat from "@/assets/images/alley-cat-allies.jpg";
import GoodLuck from "@/assets/images/goodluckcatcafe.jpg";
import Humane from "@/assets/images/humane-logo.svg";
import MrSleepy from "@/assets/images/sleepy-cat.png"
import CoolCat from "@/assets/images/profile-pic.png"

const rescueOrganizations = [
  {
    id: 1,
    name: "Lady Luck Animal Rescue",
    logo: LadyLuck,
    website: "https://ladyluckanimalrescue.com",
  },
  {
    id: 2,
    name: "Feline Fix",
    logo: Feline,
    website: "https://felinefix.org",
  },
  {
    id: 3,
    name: "Alley Cat Allies",
    logo: AlleyCat,
    website: "https://alleycat.org",
  },
  {
    id: 4,
    name: "Good Luck Cat Cafe",
    logo: GoodLuck,
    website: "https://ladyluckanimalrescue.com/",
  },
  {
    id: 5,
    name: "Humane Broward",
    logo: Humane,
    website: "https://humanebroward.com",
  },
];

const teamMembers = [
  {
    id: 1,
    name: "Milton",
    position: "Office Manager",
    bio: "Milton keeps everyone on schedule and never misses a meeting. His organizational skills are only matched by his napping abilities.",
    imageUrl:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Pizza Roll",
    position: "Customer Support",
    bio: "Pizza Roll has never met a stranger. Her friendly disposition makes her perfect for handling even the most challenging customer queries.",
    imageUrl:
      "https://images.unsplash.com/photo-1533738363-b7f9aef128ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Fluffy",
    position: "Content Writer",
    bio: "Fluffy crafts all of our product descriptions with feline flair. She has a particular talent for coming up with purrfect puns.",
    imageUrl:
      "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 4,
    name: "Garfield",
    position: "Sales & Marketing Specialist",
    bio: "Garfield has a knack for knowing exactly what cat parents want. His sales presentations are legendary, especially around lunchtime.",
    imageUrl:
      "https://images.unsplash.com/photo-1543852786-1cf6624b9987?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 5,
    name: "Tom",
    position: "HR Manager",
    bio: "Tom ensures our workplace culture is inclusive and playful. He's always available for a chat or a strategic game of chase-the-laser-pointer.",
    imageUrl:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 6,
    name: "Whiskers",
    position: "Social Media Expert",
    bio: "Whiskers knows all the trending hashtags and keeps our online presence fresh and engaging. She's a natural in front of the camera.",
    imageUrl:
      "https://images.unsplash.com/photo-1548247416-ec66f4900b2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
  },
];

const About = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
         <section className="bg-meow-lightgray py-16">
           <div className="container mx-auto px-4">
             <h1 className="mb-4 text-center font-cursive text-4xl font-bold text-meow-black md:text-5xl">
               Our Story
             </h1>
             <div className="mx-auto max-w-3xl text-center">
               <p className="mb-6 text-lg text-meow-gray">
                 Meowmart was born from a love story between humans and their
                 feline companions. It all started with Ginger, a scraggly orange
                 tabby we found sheltering under a porch during a rainstorm.
                 Despite being malnourished and scared, he purred the moment we
                 picked him up.
               </p>
               <p className="mb-6 text-lg text-meow-gray">
                 Ginger became our inspiration and the heart of our family. His
                 playful spirit and unconditional love showed us the special bond
                 cats create with their humans. When we struggled to find
                 high-quality, fun products that celebrated this connection, we
                 decided to create them ourselves.
               </p>
               <p className="text-lg text-meow-gray">
                 Though Ginger crossed the rainbow bridge in 2022, his legacy
                 lives on through Meowmart. Every product we offer is designed
                 with the same care and love we gave to him, and a portion of all
                 our proceeds goes to helping rescue cats like Ginger find their
                 forever homes.
               </p>
             </div>
           </div>
         </section>

         {/* Donation Banner */}
         <section className="bg-meow-purple py-12 text-white">
           <div className="container mx-auto px-4 text-center">
             <h2 className="mb-6 font-cursive text-3xl font-bold">
               In Loving Memory of Ginger
             </h2>
             <p className="mx-auto mb-8 max-w-2xl text-lg">
               We honor our beloved orange tabby by supporting cat rescues and
               shelters. A portion of every purchase goes to the Ginger Charity
               Foundation.
             </p>
             <Link
              to="/donate"
              className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-meow-purple transition-colors hover:bg-meow-pink hover:text-white"
            >
              <Heart size={18} />
              Donate to Ginger Foundation
            </Link>
          </div>
        </section>

        {/* Cat Images */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto flex max-w-3xl justify-center gap-4">
              <div className="overflow-hidden rounded-lg w-1/3">
                <img
                  src= {MrSleepy}
                  alt="Orange sleepy cat"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 animate-pulse"
                  style={{ animationDuration: "3s" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1519052537078-e6302a4968d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Cat looking out window"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 animate-pulse"
                  style={{ animationDuration: "4s", animationDelay: "0.5s" }}
                />
              </div>
              <div className="overflow-hidden rounded-lg w-1/3">
                <img
                  src= {CoolCat}
                  alt="Kitten looking cool in snow"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110 animate-pulse"
                  style={{ animationDuration: "5s", animationDelay: "1s" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Rescue Organizations */}
        <section className="bg-meow-lightgray py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center font-cursive text-3xl font-bold text-meow-black">
              Organizations We Support
            </h2>
            <div className="mx-auto flex max-w-xs items-center justify-center">
              <div className="h-px flex-1 bg-meow-pink"></div>
              <Cat size={24} className="mx-2 text-meow-purple" />
              <div className="h-px flex-1 bg-meow-pink"></div>
            </div>
            <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-meow-gray">
              We're proud to partner with these amazing organizations...
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              {rescueOrganizations.map((org) => (
                <div key={org.id} className="flex flex-col items-center">
                  <a
                    href={org.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={org.logo}
                      alt={org.name}
                      className="h-16 w-auto"
                    />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Members */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-center font-cursive text-3xl font-bold text-meow-black">
              Meet Our Team
            </h2>
            <div className="mx-auto flex max-w-xs items-center justify-center">
              <div className="h-px flex-1 bg-meow-pink"></div>
              <Cat size={24} className="mx-2 text-meow-purple" />
              <div className="h-px flex-1 bg-meow-pink"></div>
            </div>
            <p className="mx-auto mb-10 mt-4 max-w-2xl text-center text-meow-gray">
              Our dedicated team of feline professionals ensures Meowmart delivers...
            </p>
            <div className="mx-auto max-w-5xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
                {teamMembers.map((member, index) => (
                  <div
                    key={member.id}
                    className={`flex flex-col items-center text-center px-4 py-6 ${
                      index !== teamMembers.length - 1 ? "border-b border-meow-lightgray" : ""
                    }`}
                  >
                    <div className="aspect-square w-40 mb-4">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="h-40 w-40 object-cover rounded-full"
                      />
                    </div>
                    <h3 className="mb-1 text-xl font-semibold text-meow-black">
                      {member.name}
                    </h3>
                    <p className="mb-2 text-sm font-medium text-meow-purple">
                      {member.position}
                    </p>
                    <p className="text-meow-gray text-sm">{member.bio}</p>
                  </div>  
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
