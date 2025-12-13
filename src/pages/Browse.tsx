import { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Search, 
  Filter, 
  Copy, 
  Star, 
  ChevronDown, 
  X,
  SlidersHorizontal 
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { 
  samplePrompts, 
  categories, 
  formatTypes, 
  aiModels,
  outputTypes,
} from "@/data/mockData";
import { toast } from "sonner";

const formatBadgeColors: Record<string, string> = {
  "fill-in-blank": "bg-primary/20 text-primary border-primary/30",
  "question-based": "bg-accent/20 text-accent border-accent/30",
  "example-based": "bg-collection-growth/20 text-collection-growth border-collection-growth/30",
};

const ratingOptions = [
  { id: "5", name: "5 Stars", value: 5 },
  { id: "4", name: "4+ Stars", value: 4 },
  { id: "3", name: "3+ Stars", value: 3 },
];

const Browse = () => {
  const [searchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category");
  
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedFilters, setSelectedFilters] = useState<{
    categories: string[];
    formats: string[];
    models: string[];
    outputTypes: string[];
    ratings: string[];
  }>({
    categories: initialCategory ? [initialCategory] : [],
    formats: [],
    models: [],
    outputTypes: [],
    ratings: [],
  });

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard!");
  };

  const toggleFilter = (type: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter((v) => v !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      categories: [],
      formats: [],
      models: [],
      outputTypes: [],
      ratings: [],
    });
    setSearchQuery("");
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  // Filter prompts based on selected filters
  const filteredPrompts = useMemo(() => {
    return samplePrompts.filter((prompt) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          prompt.title.toLowerCase().includes(query) ||
          prompt.promptText.toLowerCase().includes(query) ||
          prompt.category.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (selectedFilters.categories.length > 0) {
        const categoryId = categories.find(c => c.name === prompt.category)?.id;
        if (!categoryId || !selectedFilters.categories.includes(categoryId)) return false;
      }

      // Format filter
      if (selectedFilters.formats.length > 0) {
        if (!selectedFilters.formats.includes(prompt.formatType)) return false;
      }

      // AI Model filter
      if (selectedFilters.models.length > 0) {
        if (!selectedFilters.models.includes(prompt.aiModel)) return false;
      }

      // Output Type filter
      if (selectedFilters.outputTypes.length > 0) {
        if (!selectedFilters.outputTypes.includes(prompt.outputType)) return false;
      }

      // Rating filter
      if (selectedFilters.ratings.length > 0) {
        const minRating = Math.min(...selectedFilters.ratings.map(Number));
        if (prompt.rating < minRating) return false;
      }

      return true;
    });
  }, [searchQuery, selectedFilters]);

  const FilterSection = ({ title, items, type, showIcon = false }: {
    title: string;
    items: { id: string; name: string; icon?: string }[];
    type: keyof typeof selectedFilters;
    showIcon?: boolean;
  }) => (
    <Collapsible defaultOpen className="border-b border-border/50 pb-4">
      <CollapsibleTrigger className="flex w-full items-center justify-between py-2 text-sm font-medium hover:text-primary transition-colors">
        {title}
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="space-y-2 pt-2 max-h-48 overflow-y-auto">
        {items.map((item) => (
          <label
            key={item.id}
            className="flex items-center gap-3 cursor-pointer text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Checkbox
              checked={selectedFilters[type].includes(item.id)}
              onCheckedChange={() => toggleFilter(type, item.id)}
            />
            {showIcon && item.icon && <span>{item.icon}</span>}
            <span className="flex-1 truncate">{item.name}</span>
          </label>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );

  const FilterSidebar = () => (
    <div className="space-y-4">
      {(activeFilterCount > 0 || searchQuery) && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {activeFilterCount} filter{activeFilterCount !== 1 ? "s" : ""} applied
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs"
          >
            Clear all
          </Button>
        </div>
      )}

      <FilterSection
        title="Category"
        items={categories.map((c) => ({ id: c.id, name: c.name, icon: c.icon }))}
        type="categories"
        showIcon
      />

      <FilterSection
        title="Output Type"
        items={outputTypes.map((o) => ({ id: o.id, name: o.name, icon: o.icon }))}
        type="outputTypes"
        showIcon
      />

      <FilterSection
        title="AI Tool"
        items={aiModels.map((m) => ({ id: m.id, name: m.name, icon: m.icon }))}
        type="models"
        showIcon
      />

      <FilterSection
        title="Format"
        items={formatTypes.map((f) => ({ id: f.id, name: f.name }))}
        type="formats"
      />

      <FilterSection
        title="Rating"
        items={ratingOptions.map((r) => ({ id: r.id, name: r.name }))}
        type="ratings"
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold">Browse <span className="gradient-text">Prompts</span></h1>
            <p className="text-muted-foreground">
              Discover and filter through 20,000+ AI prompts across {categories.length} functional categories
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search prompts by title, content, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="sm:hidden">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterSidebar />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Active Filters */}
          {(activeFilterCount > 0 || searchQuery) && (
            <div className="mb-6 flex flex-wrap gap-2">
              {searchQuery && (
                <Badge variant="secondary" className="gap-1 pr-1">
                  Search: "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="ml-1 rounded-full p-0.5 hover:bg-muted"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {Object.entries(selectedFilters).flatMap(([type, values]) =>
                values.map((value) => {
                  let displayValue = value;
                  
                  // Get display name based on filter type
                  if (type === "categories") {
                    displayValue = categories.find(c => c.id === value)?.name || value;
                  } else if (type === "models") {
                    displayValue = aiModels.find(m => m.id === value)?.name || value;
                  } else if (type === "outputTypes") {
                    displayValue = outputTypes.find(o => o.id === value)?.name || value;
                  } else if (type === "formats") {
                    displayValue = formatTypes.find(f => f.id === value)?.name || value;
                  } else if (type === "ratings") {
                    displayValue = ratingOptions.find(r => r.id === value)?.name || value;
                  }
                  
                  return (
                    <Badge
                      key={`${type}-${value}`}
                      variant="secondary"
                      className="gap-1 pr-1"
                    >
                      {displayValue}
                      <button
                        onClick={() => toggleFilter(type as keyof typeof selectedFilters, value)}
                        className="ml-1 rounded-full p-0.5 hover:bg-muted"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  );
                })
              )}
            </div>
          )}

          {/* Main Content */}
          <div className="flex gap-8">
            {/* Sidebar - Desktop */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="sticky top-24 rounded-xl border border-border/50 bg-card p-6">
                <h2 className="mb-4 font-semibold flex items-center gap-2">
                  <Filter className="h-4 w-4" />
                  Filters
                </h2>
                <FilterSidebar />
              </div>
            </aside>

            {/* Prompt Grid */}
            <div className="flex-1">
              <div className="mb-4 text-sm text-muted-foreground">
                Showing {filteredPrompts.length} of {samplePrompts.length} prompts
              </div>

              {filteredPrompts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground mb-4">No prompts found matching your filters</p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredPrompts.map((prompt) => (
                    <Link
                      key={prompt.id}
                      to={`/prompts/${prompt.id}`}
                      className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover hover:-translate-y-1"
                    >
                      {/* Header */}
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="mb-2 flex flex-wrap items-center gap-2">
                            <Badge
                              variant="outline"
                              className={`text-xs ${formatBadgeColors[prompt.formatType]}`}
                            >
                              {prompt.formatType.replace("-", " ")}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {prompt.aiModel}
                            </Badge>
                            <Badge variant="secondary" className="text-xs capitalize">
                              {prompt.outputType}
                            </Badge>
                          </div>
                          <h3 className="font-semibold group-hover:text-primary transition-colors line-clamp-1">
                            {prompt.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${
                                i < prompt.rating
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Preview */}
                      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                        {prompt.promptText.substring(0, 120)}...
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {prompt.category}
                        </span>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-7 text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => handleCopy(prompt.promptText, e)}
                        >
                          <Copy className="h-3 w-3 mr-1" />
                          Copy
                        </Button>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Browse;
