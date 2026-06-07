
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-meow-pink bg-opacity-20">
      <div className="container mx-auto flex flex-col-reverse items-center py-16 md:flex-row md:py-24">
        <div className="z-10 w-full space-y-6 px-4 text-center md:w-1/2 md:text-left">
          <h1 className="font-cursive text-4xl font-bold text-meow-black md:text-5xl lg:text-6xl">
            Purrfect Gifts for Cat Lovers
          </h1>
          <p className="text-lg text-meow-gray md:text-xl">
            Shop our adorable collection of cat-themed clothing, accessories, and home decor
          </p>
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0 md:justify-start">
            <Button className="btn-meow">Shop Bestsellers</Button>
            <Button className="btn-meow-secondary">Shop New Arrivals</Button>
          </div>
        </div>
        <div className="relative mb-10 w-full md:mb-0 md:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1615497001839-b0a0eac3274c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            alt="Cute cat"
            className="mx-auto h-auto w-full max-w-lg rounded-full object-cover p-6"
          />
          <div className="absolute -bottom-4 -left-4 h-40 w-40 rounded-full bg-meow-purple opacity-20"></div>
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-meow-pink opacity-30"></div>
        </div>
      </div>
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-meow-purple bg-opacity-10"></div>
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-meow-pink bg-opacity-20"></div>
    </section>
  );
};

export default HeroSection;
