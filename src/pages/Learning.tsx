import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Play, 
  Clock, 
  ArrowRight,
  GraduationCap,
  Lightbulb,
  Zap,
  Video
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { learningResources } from "@/data/mockData";

const typeIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  guide: BookOpen,
  tutorial: Lightbulb,
  course: Video,
};

const typeColors: Record<string, string> = {
  guide: "bg-collection-chatgpt/20 text-collection-chatgpt border-collection-chatgpt/30",
  tutorial: "bg-primary/20 text-primary border-primary/30",
  course: "bg-accent/20 text-accent border-accent/30",
};

const Learning = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Learning Resources</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Master AI Prompting
            </h1>
            <p className="text-lg text-muted-foreground">
              From beginner guides to advanced techniques. Learn how to craft 
              effective prompts and unlock the full potential of AI.
            </p>
          </div>

          {/* 28-Day Challenge Banner */}
          <Link to="/challenge" className="block mb-8 group">
            <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-background p-6 md:p-8 transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/20 group-hover:bg-primary/30 transition-colors">
                    <Zap className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <Badge className="mb-2 bg-primary text-primary-foreground">
                      New Challenge
                    </Badge>
                    <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">
                      28-Day ChatGPT Mastery Challenge
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      Master AI in 4 weeks • 100+ topics • Business, Marketing & Content
                    </p>
                  </div>
                </div>
                <Button size="lg" className="gap-2 group-hover:bg-primary/90">
                  <Play className="h-4 w-4" />
                  Start Challenge
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </Link>

          {/* Featured Course */}
          <div className="mb-16">
            <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/20 to-accent/5 p-8 md:p-12">
              <div className="relative z-10 max-w-2xl">
                <Badge className="mb-4 bg-accent text-accent-foreground">
                  Featured Course
                </Badge>
                <h2 className="mb-4 text-3xl font-bold">
                  Free AI Copywriting Masterclass
                </h2>
                <p className="mb-6 text-muted-foreground">
                  13 video lessons covering everything from headline writing to 
                  long-form content creation. Learn professional copywriting 
                  techniques powered by AI.
                </p>
                <div className="mb-6 flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>13 Videos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>2 Hours Total</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4" />
                    <span>Free Access</span>
                  </div>
                </div>
                <Button size="lg" className="gap-2">
                  <Play className="h-4 w-4" />
                  Start Learning
                </Button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-accent/10 to-transparent" />
            </div>
          </div>

          {/* Resources Grid */}
          <div className="mb-8">
            <h2 className="mb-6 text-2xl font-bold">All Resources</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {learningResources.map((resource, index) => {
                const Icon = typeIcons[resource.type] || BookOpen;
                return (
                  <div
                    key={resource.id}
                    className="group rounded-xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover cursor-pointer"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Icon */}
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>

                    {/* Type Badge */}
                    <Badge
                      variant="outline"
                      className={`mb-3 capitalize ${typeColors[resource.type]}`}
                    >
                      {resource.type}
                    </Badge>

                    {/* Content */}
                    <h3 className="mb-2 font-semibold group-hover:text-primary transition-colors">
                      {resource.title}
                    </h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      {resource.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Getting Started Section */}
          <div className="rounded-2xl border border-border/50 bg-card/50 p-8 md:p-12">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div>
                <h2 className="mb-4 text-2xl font-bold">New to AI Prompting?</h2>
                <p className="mb-6 text-muted-foreground">
                  Start with our beginner-friendly guide. Learn the fundamentals 
                  of effective prompting and discover how to get better results 
                  from AI assistants.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Start Guide
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Play className="h-4 w-4" />
                    Watch Introduction
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">13</div>
                  <div className="text-sm text-muted-foreground">Prompt Types</div>
                </div>
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">7</div>
                  <div className="text-sm text-muted-foreground">Tutorials</div>
                </div>
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">2+</div>
                  <div className="text-sm text-muted-foreground">Hours Content</div>
                </div>
                <div className="rounded-xl bg-secondary p-4 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">Free</div>
                  <div className="text-sm text-muted-foreground">Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Learning;
