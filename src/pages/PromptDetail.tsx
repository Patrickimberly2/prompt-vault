import { useParams, Link } from "react-router-dom";
import { 
  Copy, 
  Star, 
  ChevronRight,
  Tag,
  Layers,
  Bot,
  Target,
  Flag,
  Clock,
  FileText,
  CheckCircle,
  Lightbulb,
  ArrowRight
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { samplePrompts, categories } from "@/data/mockData";
import { toast } from "sonner";
import { useState } from "react";

const formatBadgeColors: Record<string, string> = {
  "fill-in-blank": "bg-primary/20 text-primary border-primary/30",
  "question-based": "bg-accent/20 text-accent border-accent/30",
  "example-based": "bg-collection-growth/20 text-collection-growth border-collection-growth/30",
};

const priorityColors: Record<string, string> = {
  high: "text-destructive",
  medium: "text-primary",
  low: "text-muted-foreground",
};

const outputTypeIcons: Record<string, string> = {
  text: "📝",
  image: "🖼️",
  video: "🎬",
  code: "💻",
  audio: "🎵",
};

const PromptDetail = () => {
  const { id } = useParams();
  const [notes, setNotes] = useState("");
  const [copied, setCopied] = useState(false);
  
  const prompt = samplePrompts.find((p) => p.id === id);
  
  if (!prompt) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="py-12">
          <div className="container px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Prompt not found</h1>
            <p className="text-muted-foreground mb-6">The prompt you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/browse">Browse All Prompts</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.promptText);
    setCopied(true);
    toast.success("Prompt copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Highlight variables in prompt text
  const highlightVariables = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.startsWith("[") && part.endsWith("]")) {
        return (
          <span key={index} className="badge-variable">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  const relatedPrompts = samplePrompts
    .filter((p) => p.id !== prompt.id && p.category === prompt.category)
    .slice(0, 4);

  const category = categories.find(c => c.name === prompt.category);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-8">
        <div className="container px-4">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/browse" className="hover:text-primary transition-colors">
              Browse
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link 
              to={`/browse?category=${category?.id || ''}`} 
              className="hover:text-primary transition-colors"
            >
              {prompt.category}
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{prompt.title}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div>
                <div className="mb-4 flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`${formatBadgeColors[prompt.formatType]}`}
                  >
                    {prompt.formatType.replace("-", " ")}
                  </Badge>
                  <Badge variant="outline">{prompt.aiModel}</Badge>
                  <Badge variant="secondary" className="capitalize">
                    {outputTypeIcons[prompt.outputType]} {prompt.outputType}
                  </Badge>
                </div>
                
                <h1 className="mb-4 text-3xl font-bold md:text-4xl">
                  {prompt.title}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < prompt.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-muted-foreground">
                    ({prompt.rating}/5)
                  </span>
                </div>
              </div>

              {/* Prompt Text */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="font-semibold text-lg">Prompt</h2>
                  <Button onClick={handleCopy} className="gap-2" size="lg">
                    {copied ? (
                      <>
                        <CheckCircle className="h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" />
                        Copy to Clipboard
                      </>
                    )}
                  </Button>
                </div>
                <div className="rounded-lg bg-secondary/50 p-5 font-mono text-sm leading-relaxed border border-border/30">
                  {highlightVariables(prompt.promptText)}
                </div>
              </div>

              {/* How to Use */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="mb-4 font-semibold text-lg flex items-center gap-2">
                  <Lightbulb className="h-5 w-5 text-primary" />
                  How to Use This Prompt
                </h2>
                <ol className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">1</span>
                    <span>Copy the prompt using the button above</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">2</span>
                    <span>Replace the [BRACKETED] placeholders with your specific information</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">3</span>
                    <span>Paste into {prompt.aiModel} or your preferred AI tool</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-sm font-medium">4</span>
                    <span>Refine the output as needed for your specific use case</span>
                  </li>
                </ol>
              </div>

              {/* Example Output */}
              {prompt.exampleOutput && (
                <div className="rounded-xl border border-primary/30 bg-primary/5 p-6">
                  <h2 className="mb-3 font-semibold text-lg flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    Example Output
                  </h2>
                  <div className="rounded-lg bg-card/80 p-4 text-sm text-muted-foreground whitespace-pre-wrap border border-border/30">
                    {prompt.exampleOutput}
                  </div>
                </div>
              )}

              {/* Notes */}
              {prompt.notes && (
                <div className="rounded-xl border border-border/50 bg-card p-6">
                  <h2 className="mb-3 font-semibold flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Usage Notes
                  </h2>
                  <p className="text-muted-foreground">{prompt.notes}</p>
                </div>
              )}

              {/* User Notes */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="mb-3 font-semibold">Your Notes</h2>
                <Textarea
                  placeholder="Add your personal notes about this prompt..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-24 bg-secondary/50"
                />
              </div>

              {/* Related Prompts */}
              {relatedPrompts.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">Related Prompts</h2>
                    <Button asChild variant="ghost" size="sm">
                      <Link to={`/browse?category=${category?.id}`}>
                        View all
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {relatedPrompts.map((related) => (
                      <Link
                        key={related.id}
                        to={`/prompts/${related.id}`}
                        className="group rounded-xl border border-border/50 bg-card p-4 transition-all hover:border-primary/30 hover:bg-card-hover hover:-translate-y-1"
                      >
                        <div className="mb-2 flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {related.aiModel}
                          </Badge>
                          <div className="flex items-center gap-0.5 ml-auto">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < related.rating
                                    ? "fill-primary text-primary"
                                    : "text-muted-foreground/30"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h3 className="font-medium mb-2 group-hover:text-primary transition-colors line-clamp-1">
                          {related.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {related.promptText.substring(0, 80)}...
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Metadata */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="mb-4 font-semibold">Details</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Tag className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm font-medium">{prompt.category}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Layers className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sub-category</p>
                      <p className="text-sm font-medium">{prompt.subCategory}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">AI Model</p>
                      <p className="text-sm font-medium">{prompt.aiModel}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Target className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Use Case</p>
                      <p className="text-sm font-medium">{prompt.useCase}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <span className="text-sm">{outputTypeIcons[prompt.outputType]}</span>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Output Type</p>
                      <p className="text-sm font-medium capitalize">{prompt.outputType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Flag className={`h-4 w-4 ${priorityColors[prompt.priority]}`} />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Priority</p>
                      <p className={`text-sm font-medium capitalize ${priorityColors[prompt.priority]}`}>
                        {prompt.priority}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Last Updated</p>
                      <p className="text-sm font-medium">{prompt.updatedAt}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="mb-3 font-semibold">Status</h2>
                <Badge 
                  variant={prompt.status === "active" ? "default" : "secondary"}
                  className="capitalize"
                >
                  {prompt.status}
                </Badge>
              </div>

              {/* Quick Actions */}
              <div className="rounded-xl border border-border/50 bg-card p-6">
                <h2 className="mb-4 font-semibold">Quick Actions</h2>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Star className="h-4 w-4 mr-2" />
                    Add to Favorites
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Prompt
                  </Button>
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

export default PromptDetail;
