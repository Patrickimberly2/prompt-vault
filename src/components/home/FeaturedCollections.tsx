import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";
import { collections } from "@/data/mockData";

const colorMap: Record<string, string> = {
  "collection-chatgpt": "from-collection-chatgpt/20 to-collection-chatgpt/5 border-collection-chatgpt/30 hover:border-collection-chatgpt/50",
  "collection-marketer": "from-collection-marketer/20 to-collection-marketer/5 border-collection-marketer/30 hover:border-collection-marketer/50",
  "collection-business": "from-collection-business/20 to-collection-business/5 border-collection-business/30 hover:border-collection-business/50",
  "collection-coach": "from-collection-coach/20 to-collection-coach/5 border-collection-coach/30 hover:border-collection-coach/50",
  "collection-growth": "from-collection-growth/20 to-collection-growth/5 border-collection-growth/30 hover:border-collection-growth/50",
};

const iconColorMap: Record<string, string> = {
  "collection-chatgpt": "bg-collection-chatgpt/20 text-collection-chatgpt",
  "collection-marketer": "bg-collection-marketer/20 text-collection-marketer",
  "collection-business": "bg-collection-business/20 text-collection-business",
  "collection-coach": "bg-collection-coach/20 text-collection-coach",
  "collection-growth": "bg-collection-growth/20 text-collection-growth",
};

export function FeaturedCollections() {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold md:text-4xl">Featured Collections</h2>
            <p className="text-muted-foreground">
              Curated prompt libraries for every need
            </p>
          </div>
          <Link
            to="/collections"
            className="hidden items-center gap-2 text-sm font-medium text-primary hover:underline sm:flex"
          >
            View all collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Collection Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((collection, index) => (
            <Link
              key={collection.id}
              to={`/collections/${collection.id}`}
              className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 hover-lift ${colorMap[collection.color]}`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${iconColorMap[collection.color]}`}>
                {collection.icon}
              </div>

              {/* Content */}
              <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                {collection.name}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {collection.description}
              </p>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{collection.promptCount}</span>
                  <span className="text-muted-foreground">prompts</span>
                </div>
                <div className="text-muted-foreground">
                  {collection.categoryCount} categories
                </div>
              </div>

              {/* Hover Arrow */}
              <div className="absolute right-6 top-6 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View all collections
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
