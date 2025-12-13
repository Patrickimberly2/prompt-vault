import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Search } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { collections } from "@/data/mockData";
import { useState } from "react";

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

const Collections = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCollections = collections.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Prompt Collections
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore our curated libraries of AI prompts, organized by profession
              and use case. Each collection contains hundreds of battle-tested prompts.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search collections..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
          </div>

          {/* Collections Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredCollections.map((collection, index) => (
              <Link
                key={collection.id}
                to={`/collections/${collection.id}`}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8 transition-all duration-300 hover-lift ${colorMap[collection.color]}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div
                  className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl text-3xl ${iconColorMap[collection.color]}`}
                >
                  {collection.icon}
                </div>

                {/* Content */}
                <h2 className="mb-3 text-2xl font-semibold group-hover:text-primary transition-colors">
                  {collection.name}
                </h2>
                <p className="mb-6 text-muted-foreground">
                  {collection.description}
                </p>

                {/* Stats */}
                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">{collection.promptCount}</span>
                    <span className="text-muted-foreground">prompts</span>
                  </div>
                  <div className="text-muted-foreground">
                    {collection.categoryCount} categories
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute right-8 top-8 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                  <ArrowRight className="h-6 w-6 text-primary" />
                </div>
              </Link>
            ))}
          </div>

          {filteredCollections.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No collections found matching your search.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
