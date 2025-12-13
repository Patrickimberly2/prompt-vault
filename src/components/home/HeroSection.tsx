import { Search, TrendingUp, Users, Sparkles, Wrench, Library } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/browse?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/15 blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-primary/5 to-accent/5 blur-3xl" />
      </div>

      <div className="container px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm animate-float">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">20,000+ Premium AI Prompts</span>
          </div>

          {/* Heading */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="gradient-text">PromptVault</span>
            <br />
            <span className="text-foreground/90">Your AI Prompt Library</span>
          </h1>

          {/* Subheading */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            The world's largest library of AI prompts for ChatGPT, Midjourney, DALL-E, Claude & more. 
            Find the perfect prompt for any task.
          </p>

          {/* Search Bar */}
          <div className="mx-auto mb-12 max-w-2xl">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/50 to-accent/50 opacity-50 blur transition-opacity group-hover:opacity-100" />
              <div className="relative flex gap-2 rounded-xl bg-card p-2">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search prompts, categories, or AI tools..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    className="h-12 border-0 bg-transparent pl-12 text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                  />
                </div>
                <Button size="lg" onClick={handleSearch} className="h-12 px-8 font-semibold">
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 text-sm">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20">
                <TrendingUp className="h-5 w-5 text-primary" />
              </div>
              <div className="text-left">
                <div className="font-semibold">20,000+</div>
                <div className="text-muted-foreground">Prompts</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20">
                <Wrench className="h-5 w-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-semibold">600+</div>
                <div className="text-muted-foreground">AI Tools</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-collection-growth/20">
                <Users className="h-5 w-5 text-collection-growth" />
              </div>
              <div className="text-left">
                <div className="font-semibold">20</div>
                <div className="text-muted-foreground">Categories</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-collection-coach/20">
                <Library className="h-5 w-5 text-collection-coach" />
              </div>
              <div className="text-left">
                <div className="font-semibold">4</div>
                <div className="text-muted-foreground">Vaults</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
