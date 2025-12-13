import { Link } from "react-router-dom";
import { BookOpen, Sparkles, Briefcase, Target, ArrowRight, TrendingUp } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: "ultimate-bible",
    name: "The Ultimate ChatGPT",
    description: "The most comprehensive collection of ChatGPT prompts covering every use case imaginable. From business to creative writing, marketing to coding - this collection has it all.",
    promptCount: 2500,
    categories: ["Marketing", "Business", "Creative", "Technical", "Personal"],
    icon: BookOpen,
    gradient: "from-primary to-accent",
    bgGlow: "bg-primary/30",
  },
  {
    id: "personal-growth",
    name: "Personal Growth",
    description: "Transform every aspect of your life with AI-powered prompts for self-improvement, goal setting, habit building, and personal development journeys.",
    promptCount: 1800,
    categories: ["Mindset", "Goals", "Habits", "Wellness", "Productivity"],
    icon: Sparkles,
    gradient: "from-collection-growth to-primary",
    bgGlow: "bg-collection-growth/30",
  },
  {
    id: "business-bible",
    name: "Business Owner's",
    description: "Scale your business with proven AI strategies. From startup ideation to enterprise growth, find prompts for every stage of your business journey.",
    promptCount: 2200,
    categories: ["Strategy", "Marketing", "Sales", "Operations", "Finance"],
    icon: Briefcase,
    gradient: "from-accent to-collection-business",
    bgGlow: "bg-accent/30",
  },
  {
    id: "coach-bible",
    name: "Coach's",
    description: "Master the art of coaching and mentorship with prompts designed for life coaches, business coaches, and mentors who want to make a lasting impact.",
    promptCount: 1500,
    categories: ["Life Coaching", "Business Coaching", "Mentorship", "Leadership", "Communication"],
    icon: Target,
    gradient: "from-collection-coach to-primary",
    bgGlow: "bg-collection-coach/30",
  },
];

const Collections = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
          </div>

          <div className="container px-4 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
              Curated <span className="gradient-text">Prompt Bibles</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Explore our expertly curated Bible guides, each containing thousands of prompts 
              designed to help you achieve specific goals and master different domains.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span><strong>8,000+</strong> Total Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-accent" />
                <span><strong>4</strong> Bible Guides</span>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid gap-8 md:grid-cols-2">
              {collections.map((collection) => (
                <Link
                  key={collection.id}
                  to={`/browse?collection=${collection.id}`}
                  className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card p-8 transition-all duration-300 hover:border-primary/50 hover:-translate-y-1"
                >
                  {/* Background Glow */}
                  <div className={`absolute -right-20 -top-20 h-64 w-64 rounded-full ${collection.bgGlow} blur-3xl opacity-0 transition-opacity group-hover:opacity-100`} />
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${collection.gradient}`}>
                      <collection.icon className="h-8 w-8 text-white" />
                    </div>

                    {/* Content */}
                    <h2 className="mb-3 text-2xl font-bold group-hover:text-primary transition-colors">
                      {collection.name}
                    </h2>
                    <p className="mb-6 text-muted-foreground">
                      {collection.description}
                    </p>

                    {/* Categories */}
                    <div className="mb-6 flex flex-wrap gap-2">
                      {collection.categories.map((category) => (
                        <span
                          key={category}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">
                        {collection.promptCount.toLocaleString()}+ prompts
                      </span>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Explore Bible
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Collections;
