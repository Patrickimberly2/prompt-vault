import { Search, Sparkles, TrendingUp, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">2,000+ Premium Prompts</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Your Ultimate{" "}
            <span className="gradient-text">AI Prompt</span>
            {" "}Library
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Unlock the power of AI with expertly crafted prompts. From marketing to business strategy, 
            find the perfect prompt for every situation.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-0 blur transition-opacity group-hover:opacity-100" />
              <div className="relative flex gap-2 rounded-xl bg-card p-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts, categories, or use cases..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-12 border-0 bg-transparent pl-12 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>
                <Button size="lg" className="h-12 px-8 font-semibold">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-collection-chatgpt/20">
                <TrendingUp className="h-5 w-5 text-collection-chatgpt" />
              </div>
              <div className="text-left">
                <div className="font-semibold">2,000+</div>
                <div className="text-muted-foreground">Prompts</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">5</div>
                <div className="text-muted-foreground">Collections</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                <Users className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-semibold">93+</div>
                <div className="text-muted-foreground">Categories</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
