import { Link } from "react-router-dom";
import { Briefcase, Target, TrendingUp, PenTool, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: "business-vault",
    name: "Business Vault",
    description: "Master business strategy, operations, and planning with AI-powered prompts",
    promptCount: 2500,
    icon: Briefcase,
    gradient: "from-primary to-accent",
    bgGlow: "bg-primary/20",
  },
  {
    id: "marketing-vault",
    name: "Marketing Vault",
    description: "Dominate marketing & advertising with conversion-focused AI prompts",
    promptCount: 1800,
    icon: Target,
    gradient: "from-collection-growth to-primary",
    bgGlow: "bg-collection-growth/20",
  },
  {
    id: "sales-vault",
    name: "Sales Vault",
    description: "Close more deals with AI prompts for sales, lead gen, and outreach",
    promptCount: 2200,
    icon: TrendingUp,
    gradient: "from-accent to-collection-business",
    bgGlow: "bg-accent/20",
  },
  {
    id: "content-vault",
    name: "Content Creation Vault",
    description: "Create compelling content for social media, blogs, and beyond",
    promptCount: 1500,
    icon: PenTool,
    gradient: "from-collection-coach to-primary",
    bgGlow: "bg-collection-coach/20",
  },
];

export function FeaturedCollections() {
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Featured <span className="gradient-text">Prompt Vaults</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Explore our expertly curated Vaults, each packed with thousands of prompts for specific goals
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
            >
              {/* Background Glow */}
              <div className={`absolute -right-10 -top-10 h-32 w-32 rounded-full ${collection.bgGlow} blur-3xl opacity-0 transition-opacity group-hover:opacity-100`} />
              
              {/* Icon */}
              <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${collection.gradient}`}>
                <collection.icon className="h-7 w-7 text-white" />
              </div>

              {/* Content */}
              <h3 className="mb-2 font-semibold text-lg group-hover:text-primary transition-colors">
                {collection.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {collection.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-primary">
                  {collection.promptCount.toLocaleString()}+ prompts
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/collections">
              View All Vaults
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
