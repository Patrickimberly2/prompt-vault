import { Link } from "react-router-dom";
import { Copy, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { samplePrompts } from "@/data/mockData";
import { toast } from "sonner";

const formatBadgeColors: Record<string, string> = {
  "fill-in-blank": "bg-primary/20 text-primary border-primary/30",
  "question-based": "bg-accent/20 text-accent border-accent/30",
  "example-based": "bg-collection-growth/20 text-collection-growth border-collection-growth/30",
};

export function PopularPrompts() {
  const popularPrompts = samplePrompts.slice(0, 8);

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <section className="py-20 bg-card/30">
      <div className="container px-4">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Popular <span className="gradient-text">Prompts</span>
            </h2>
            <p className="max-w-2xl text-muted-foreground">
              Most loved prompts by our community, ready to use in your next project
            </p>
          </div>
          <Button asChild variant="ghost" className="hidden md:flex">
            <Link to="/browse">
              Browse All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularPrompts.map((prompt) => (
            <Link
              key={prompt.id}
              to={`/prompts/${prompt.id}`}
              className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover hover:-translate-y-1"
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-2">
                <Badge
                  variant="outline"
                  className={`text-xs ${formatBadgeColors[prompt.formatType]}`}
                >
                  {prompt.formatType.replace("-", " ")}
                </Badge>
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < prompt.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Title */}
              <h3 className="mb-2 font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                {prompt.title}
              </h3>

              {/* Preview */}
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {prompt.promptText.substring(0, 80)}...
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-xs">
                  {prompt.aiModel}
                </Badge>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-7 px-2 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleCopy(prompt.promptText, e)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Button asChild variant="outline">
            <Link to="/browse">
              Browse All Prompts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
