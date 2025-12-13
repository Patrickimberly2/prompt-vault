import { Link } from "react-router-dom";
import { Briefcase, Target, TrendingUp, PenTool, ArrowRight, Users, Sprout } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const collections = [
  {
    id: "business-vault",
    name: "Business Vault",
    description: "Master business strategy, operations, planning, and entrepreneurship with AI-powered prompts. From startup ideation to enterprise scaling, find prompts for every stage of your business journey.",
    promptCount: 2500,
    categories: ["Strategy", "Operations", "Planning", "Finance", "HR"],
    icon: Briefcase,
    gradient: "from-primary to-accent",
    bgGlow: "bg-primary/30",
  },
  {
    id: "marketing-vault",
    name: "Marketing Vault",
    description: "Dominate marketing and advertising with conversion-focused AI prompts. Master SEO, content strategy, paid ads, email marketing, and brand building.",
    promptCount: 1800,
    categories: ["SEO", "Ads", "Email", "Branding", "Analytics"],
    icon: Target,
    gradient: "from-collection-growth to-primary",
    bgGlow: "bg-collection-growth/30",
  },
  {
    id: "sales-vault",
    name: "Sales Vault",
    description: "Close more deals with AI prompts for sales, lead generation, outreach, and customer relationships. From prospecting to negotiation, supercharge your sales process.",
    promptCount: 2200,
    categories: ["Lead Gen", "Outreach", "Negotiation", "CRM", "Closing"],
    icon: TrendingUp,
    gradient: "from-accent to-collection-business",
    bgGlow: "bg-accent/30",
  },
  {
    id: "content-vault",
    name: "Content Creation Vault",
    description: "Create compelling content for social media, blogs, videos, and beyond. Master copywriting, storytelling, and content strategy across every platform.",
    promptCount: 1500,
    categories: ["Social Media", "Blogging", "Copywriting", "Video", "Storytelling"],
    icon: PenTool,
    gradient: "from-collection-coach to-primary",
    bgGlow: "bg-collection-coach/30",
  },
  {
    id: "coaching-vault",
    name: "Coaching Vault",
    description: "Transform clients and grow your coaching business with proven frameworks. Master one-on-one sessions, high-ticket sales, program creation, and client management.",
    promptCount: 1800,
    categories: ["One-on-One", "High-Ticket Sales", "Program Creation", "Client Management"],
    icon: Users,
    gradient: "from-primary to-collection-growth",
    bgGlow: "bg-primary/30",
  },
  {
    id: "personal-growth-vault",
    name: "Personal Growth Vault",
    description: "Level up your life with prompts for goals, habits, mindset, and wellness. Build better routines, develop powerful habits, and achieve your personal best.",
    promptCount: 1600,
    categories: ["Goal Setting", "Habit Building", "Mindset", "Productivity", "Wellness"],
    icon: Sprout,
    gradient: "from-collection-growth to-accent",
    bgGlow: "bg-collection-growth/30",
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
              Curated <span className="gradient-text">Prompt Vaults</span>
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
              Explore our expertly curated Vaults, each containing thousands of prompts 
              designed to help you achieve specific goals and master different domains.
            </p>
            <div className="flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span><strong>11,400+</strong> Total Prompts</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-accent" />
                <span><strong>6</strong> Vaults</span>
              </div>
            </div>
          </div>
        </section>

        {/* Collections Grid */}
        <section className="py-16">
          <div className="container px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                        Explore Vault
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