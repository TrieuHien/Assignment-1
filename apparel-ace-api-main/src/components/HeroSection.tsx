import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-clothing.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-secondary to-muted py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* LEFT SIDE */}
          <div className="space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-foreground">
                Discover your 
                <span className="block text-primary">perfect style</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Explore our curated collection of premium clothing. From casual wear to formal attire, find pieces that express your unique personality.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-stats-accent">50+</div>
                  <div className="text-muted-foreground">Premium Brands</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-stats-accent">1000+</div>
                  <div className="text-muted-foreground">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* RIGHT SIDE - IMAGE */}
          <div className="relative flex justify-center">
            <img
              src={heroImage}
              alt="Stylish clothing collection featuring modern fashion pieces"
              className="max-h-[360px] w-auto object-contain rounded-xl shadow-md opacity-95"
            />
            
            {/* Decorative subtle glows */}
            <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl"></div>
            <div className="absolute -top-6 -left-6 h-32 w-32 rounded-full bg-accent/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
