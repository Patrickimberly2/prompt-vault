import { Link } from "react-router-dom";
import { 
  Briefcase, 
  Compass, 
  Heart, 
  GraduationCap, 
  PenTool, 
  Mail, 
  Search, 
  Share2, 
  TrendingUp, 
  Target 
} from "lucide-react";
import { categories } from "@/data/mockData";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "career": Briefcase,
  "exploring": Compass,
  "hobby": Heart,
  "learning": GraduationCap,
  "writing": PenTool,
  "email": Mail,
  "seo": Search,
  "social": Share2,
  "sales": TrendingUp,
  "strategy": Target,
};

export function CategoryGrid() {
  return (
    <section className="py-16 md:py-24 bg-card/30">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold md:text-4xl">Browse by Category</h2>
          <p className="text-muted-foreground">
            Find prompts organized by topic and use case
          </p>
        </div>

        {/* Category Grid */}
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = iconMap[category.id] || Briefcase;
            return (
              <Link
                key={category.id}
                to={`/browse?category=${category.id}`}
                className="group flex flex-col items-center gap-3 rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-sm">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {category.promptCount} prompts
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
