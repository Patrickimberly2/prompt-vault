import { Link } from "react-router-dom";
import { ArrowRight, Copy, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { samplePrompts } from "@/data/mockData";
import { toast } from "sonner";

const formatBadgeColors: Record<string, string> = {
  "fill-in-blank": "bg-primary/20 text-primary border-primary/30",
  "question-based": "bg-accent/20 text-accent border-accent/30",
  "example-based": "bg-collection-chatgpt/20 text-collection-chatgpt border-collection-chatgpt/30",
};

export function RecentPrompts() {
  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard!");
  };

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Popular Prompts</h2>
            <p className="text-muted-foreground">
              Most used prompts from our community
            </p>
          </div>
          <Link
            to="/browse"
            className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline sm:flex"
          >
            Browse all prompts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Prompt Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {samplePrompts.slice(0, 6).map((prompt, index) => (
            <Link
              key={prompt.id}
              to={`/prompts/${prompt.id}`}
              className="group relative rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Header */}
              <div className="mb-3 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={`text-xs ${formatBadgeColors[prompt.formatType]}`}
                    >
                      {prompt.formatType.replace("-", " ")}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {prompt.aiModel}
                    </Badge>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {prompt.title}
                  </h3>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < prompt.rating
                          ? "fill-primary text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Prompt Preview */}
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {prompt.promptText.substring(0, 150)}...
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">
                  {prompt.category}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => handleCopy(prompt.promptText, e)}
                >
                  <Copy className="h-4 w-4 mr-1" />
                  Copy
                </Button>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/browse"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            Browse all prompts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
