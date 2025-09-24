import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import heroImage from "@/assets/hero-clothing.jpg";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-secondary to-muted py-16 lg:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center">
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
            
            <div className="w-full max-w-sm space-y-2">
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input 
                    className="pl-10" 
                    placeholder="What are you looking for?" 
                    type="search" 
                  />
                </div>
                <Button type="submit" className="px-6">
                  Search
                </Button>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-3xl bg-background shadow-card-shadow">
              <img
                src={heroImage}
                alt="Stylish clothing collection featuring modern fashion pieces"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 h-24 w-24 rounded-full bg-primary/10 blur-xl"></div>
            <div className="absolute -top-4 -left-4 h-32 w-32 rounded-full bg-accent/20 blur-xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};