import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trophy,
  CheckCircle2,
  Circle,
  ChevronDown,
  ChevronUp,
  Flame,
  Target,
  Calendar,
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface DayContent {
  day: number;
  title: string;
  topics: string[];
}

const challengeDays: DayContent[] = [
  { day: 1, title: "Master ChatGPT", topics: ["How to Use ChatGPT", "Make Money with ChatGPT", "Master ChatGPT"] },
  { day: 2, title: "How ChatGPT Works", topics: ["13 Types of Prompts", "Fill-in-the-blank vs Open-ended prompts", "Crack How ChatGPT Works"] },
  { day: 3, title: "General Business Toolkit", topics: ["Researching Competitors", "Creating Business Plan", "Writing Proposals", "Company Vision"] },
  { day: 4, title: "Generate Business Ideas", topics: ["Generating Ideas", "Pitch Investors", "Hiring and Leadership", "Meeting Summary"] },
  { day: 5, title: "Create Emails That Sell", topics: ["Email Subject Lines", "Sales Email", "Onboarding Email"] },
  { day: 6, title: "Money-Pulling Email Parts", topics: ["Cart Abandonment", "Newsletter", "Customer Welcome", "Cold Email"] },
  { day: 7, title: "Profitable Niche & Product", topics: ["Product Ideas", "Online Funnel Ideas", "Picking Niche", "Sales Page"] },
  { day: 8, title: "Converting Funnel", topics: ["Landing Page", "Order Bump", "Upsell Page", "Thank You Page"] },
  { day: 9, title: "Website Copy", topics: ["Product Descriptions", "Advertorial", "SEO Optimization"] },
  { day: 10, title: "Website Ideation", topics: ["Customer Testimonials", "Translating Copy", "Designing CTAs"] },
  { day: 11, title: "Affiliate Marketing", topics: ["Product Reviews", "Comparison Tables", "Recommendations", "Descriptions", "Emails"] },
  { day: 12, title: "Facebook Marketing", topics: ["Ad Copy", "Creative Ideas", "Headlines", "Video Scripts"] },
  { day: 13, title: "Facebook Conversion", topics: ["Attention-Grabbing Images", "A/B Testing", "Pain Points Research", "Creative Angles"] },
  { day: 14, title: "YouTube Page", topics: ["Video Script", "Video Title", "SEO Description", "Ad Script", "Thumbnail Ideas"] },
  { day: 15, title: "Customer Service Rep", topics: ["FAQs", "Managing Communication"] },
  { day: 16, title: "Customer Service Rep-2", topics: ["Responding to Comments", "Customer Retention", "Surveys"] },
  { day: 17, title: "Business SMS Marketing", topics: ["SMS campaigns", "Opt-in campaigns", "Reminders/Follow-ups"] },
  { day: 18, title: "Rank Your Website", topics: ["Keywords", "Blog Posts", "SEO Optimization", "Content Calendar"] },
  { day: 19, title: "Podcast Ideas & Marketing", topics: ["Podcast Questions", "Script", "Guest Outreach"] },
  { day: 20, title: "LinkedIn Optimization", topics: ["Profile Optimization", "Post Ideas", "LinkedIn Groups"] },
  { day: 21, title: "LinkedIn Boosting", topics: ["Content Strategy", "LinkedIn Ads", "Hashtags", "Automation"] },
  { day: 22, title: "Twitter/X", topics: ["Writing Tweets/Threads", "Trends", "Ads", "Go Viral", "Growth Optimization"] },
  { day: 23, title: "Webinar Ideas", topics: ["Webinar topics", "Headlines", "Hashtag Research"] },
  { day: 24, title: "Graphics & Imagery", topics: ["Custom Graphics", "Mood Boards"] },
  { day: 25, title: "Copywriting Assistant", topics: ["Improve Copy", "Brand Voice", "Advanced Prompts", "Proofreading"] },
  { day: 26, title: "TikTok Scaling", topics: ["Ad Scripts", "Audience Research", "Content Ideas"] },
  { day: 27, title: "Threads App", topics: ["Disclaimer", "Micro-messages", "Profile Optimization", "Brand Engagement", "Brand Stories"] },
  { day: 28, title: "Build & Scale Threads", topics: ["Audience Engagement", "Business Opportunities", "Brand Voice", "Trends", "Engagement Tips", "Community"] },
];

const Challenge = () => {
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const toggleDay = (day: number) => {
    setExpandedDay(expandedDay === day ? null : day);
  };

  const toggleComplete = (day: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newCompleted = new Set(completedDays);
    if (newCompleted.has(day)) {
      newCompleted.delete(day);
    } else {
      newCompleted.add(day);
    }
    setCompletedDays(newCompleted);
  };

  const progressPercentage = (completedDays.size / 28) * 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8 md:py-12">
        <div className="container px-4">
          {/* Back Link */}
          <Link
            to="/learning"
            className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Learning
          </Link>

          {/* Hero Section */}
          <div className="mb-12 relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 md:p-12">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            
            <div className="relative z-10 max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
                <Flame className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-primary font-medium">28-Day Challenge</span>
              </div>
              
              <h1 className="mb-4 text-3xl md:text-5xl font-bold leading-tight">
                The Ultimate 28-Day
                <span className="text-primary block">ChatGPT Mastery Challenge</span>
              </h1>
              
              <p className="mb-8 text-lg text-muted-foreground max-w-2xl">
                Transform your AI skills in just 4 weeks. From basics to advanced strategies 
                covering business, marketing, content creation, and monetization.
              </p>

              <div className="flex flex-wrap gap-6 mb-8">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  <span className="text-sm">28 Days</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  <span className="text-sm">100+ Topics</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  <span className="text-sm">Practical Skills</span>
                </div>
              </div>
            </div>
          </div>

          {/* Progress Tracker */}
          <div className="mb-8 rounded-xl border border-border/50 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <Trophy className="h-6 w-6 text-primary" />
                <div>
                  <h3 className="font-semibold">Your Progress</h3>
                  <p className="text-sm text-muted-foreground">
                    {completedDays.size} of 28 days completed
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="text-lg px-4 py-1">
                {Math.round(progressPercentage)}%
              </Badge>
            </div>
            <Progress value={progressPercentage} className="h-3" />
            
            {/* Mini Progress Grid */}
            <div className="mt-6 grid grid-cols-7 gap-2">
              {challengeDays.map((day) => (
                <div
                  key={day.day}
                  className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all cursor-pointer hover:scale-110 ${
                    completedDays.has(day.day)
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                  onClick={(e) => toggleComplete(day.day, e)}
                  title={`Day ${day.day}: ${day.title}`}
                >
                  {day.day}
                </div>
              ))}
            </div>
          </div>

          {/* Weeks Navigation */}
          <div className="mb-6 flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((week) => (
              <Button
                key={week}
                variant="outline"
                size="sm"
                onClick={() => {
                  const firstDayOfWeek = (week - 1) * 7 + 1;
                  document.getElementById(`day-${firstDayOfWeek}`)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="gap-2"
              >
                Week {week}
                <Badge variant="secondary" className="ml-1">
                  Days {(week - 1) * 7 + 1}-{week * 7}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Challenge Days */}
          <div className="space-y-4">
            {challengeDays.map((day, index) => {
              const isCompleted = completedDays.has(day.day);
              const isExpanded = expandedDay === day.day;
              const weekNumber = Math.ceil(day.day / 7);

              return (
                <div key={day.day} id={`day-${day.day}`}>
                  {/* Week Header */}
                  {day.day === 1 || day.day === 8 || day.day === 15 || day.day === 22 ? (
                    <div className="mb-4 mt-8 first:mt-0">
                      <h2 className="text-xl font-bold flex items-center gap-2">
                        <span className="text-primary">Week {weekNumber}</span>
                        <span className="text-muted-foreground font-normal text-base">
                          {weekNumber === 1 && "— Foundations & Business"}
                          {weekNumber === 2 && "— Sales & Marketing"}
                          {weekNumber === 3 && "— Content & Customer"}
                          {weekNumber === 4 && "— Social Media Mastery"}
                        </span>
                      </h2>
                    </div>
                  ) : null}

                  <div
                    className={`rounded-xl border transition-all duration-300 ${
                      isCompleted
                        ? "border-primary/50 bg-primary/5"
                        : "border-border/50 bg-card hover:border-primary/30"
                    }`}
                    style={{ animationDelay: `${index * 30}ms` }}
                  >
                    {/* Day Header */}
                    <div
                      className="flex items-center justify-between p-4 md:p-6 cursor-pointer"
                      onClick={() => toggleDay(day.day)}
                    >
                      <div className="flex items-center gap-4">
                        {/* Completion Toggle */}
                        <button
                          onClick={(e) => toggleComplete(day.day, e)}
                          className="flex-shrink-0 transition-transform hover:scale-110"
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-7 w-7 text-primary" />
                          ) : (
                            <Circle className="h-7 w-7 text-muted-foreground hover:text-primary transition-colors" />
                          )}
                        </button>

                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Badge
                              variant="outline"
                              className={`${
                                isCompleted
                                  ? "bg-primary/20 text-primary border-primary/30"
                                  : "bg-secondary"
                              }`}
                            >
                              Day {day.day}
                            </Badge>
                            {isCompleted && (
                              <Badge className="bg-primary/20 text-primary border-0">
                                Completed
                              </Badge>
                            )}
                          </div>
                          <h3 className={`font-semibold text-lg ${isCompleted ? "text-primary" : ""}`}>
                            {day.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {day.topics.length} topics to cover
                          </p>
                        </div>
                      </div>

                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="px-4 md:px-6 pb-6 border-t border-border/50 pt-4 animate-fade-in">
                        <h4 className="text-sm font-medium text-muted-foreground mb-3">
                          Topics for Day {day.day}
                        </h4>
                        <ul className="space-y-2">
                          {day.topics.map((topic, topicIndex) => (
                            <li
                              key={topicIndex}
                              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
                            >
                              <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                              <span className="text-sm">{topic}</span>
                            </li>
                          ))}
                        </ul>
                        
                        <div className="mt-4 flex gap-3">
                          <Button
                            variant={isCompleted ? "outline" : "default"}
                            onClick={(e) => toggleComplete(day.day, e)}
                            className="gap-2"
                          >
                            {isCompleted ? (
                              <>
                                <CheckCircle2 className="h-4 w-4" />
                                Mark Incomplete
                              </>
                            ) : (
                              <>
                                <Circle className="h-4 w-4" />
                                Mark Complete
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion CTA */}
          <div className="mt-12 rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-background p-8 text-center">
            <Trophy className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Ready to Master ChatGPT?</h2>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Complete all 28 days to transform your AI skills and unlock new possibilities 
              for your business, content, and productivity.
            </p>
            <Button size="lg" className="gap-2">
              <Flame className="h-5 w-5" />
              Start Day 1
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Challenge;
