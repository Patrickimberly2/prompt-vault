import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Star, 
  Clock, 
  Plus, 
  FolderOpen, 
  Heart, 
  Search,
  Copy,
  MoreVertical,
  Edit,
  Trash2
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { samplePrompts } from "@/data/mockData";
import { toast } from "sonner";

const formatBadgeColors: Record<string, string> = {
  "fill-in-blank": "bg-primary/20 text-primary border-primary/30",
  "question-based": "bg-accent/20 text-accent border-accent/30",
  "example-based": "bg-collection-chatgpt/20 text-collection-chatgpt border-collection-chatgpt/30",
};

const Workspace = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const savedPrompts = samplePrompts.filter((p) => p.status === "favorite");
  const recentPrompts = samplePrompts.slice(0, 4);

  const handleCopy = (text: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard!");
  };

  const PromptCard = ({ prompt }: { prompt: typeof samplePrompts[0] }) => (
    <div className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:bg-card-hover">
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
          </div>
          <Link 
            to={`/prompts/${prompt.id}`}
            className="font-semibold hover:text-primary transition-colors line-clamp-1"
          >
            {prompt.title}
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold">My Workspace</h1>
              <p className="text-muted-foreground">
                Manage your saved, custom, and recently used prompts
              </p>
            </div>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Create Prompt
            </Button>
          </div>

          {/* Search */}
          <div className="mb-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search your workspace..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-card border-border/50"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="saved" className="space-y-6">
            <TabsList className="bg-secondary/50">
              <TabsTrigger value="saved" className="gap-2">
                <Heart className="h-4 w-4" />
                Saved Prompts
              </TabsTrigger>
              <TabsTrigger value="custom" className="gap-2">
                <FolderOpen className="h-4 w-4" />
                Custom Prompts
              </TabsTrigger>
              <TabsTrigger value="recent" className="gap-2">
                <Clock className="h-4 w-4" />
                Recently Used
              </TabsTrigger>
              <TabsTrigger value="collections" className="gap-2">
                <Star className="h-4 w-4" />
                My Bibles
              </TabsTrigger>
            </TabsList>

            <TabsContent value="saved" className="space-y-6">
              {savedPrompts.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {savedPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-dashed border-border/50 bg-card/30 p-12 text-center">
                  <Heart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                  <h3 className="mb-2 text-lg font-semibold">No saved prompts yet</h3>
                  <p className="mb-4 text-muted-foreground">
                    Browse prompts and save your favorites here
                  </p>
                  <Button asChild variant="outline">
                    <Link to="/browse">Browse Prompts</Link>
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="custom" className="space-y-6">
              <div className="rounded-xl border border-dashed border-border/50 bg-card/30 p-12 text-center">
                <Plus className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Create your first custom prompt</h3>
                <p className="mb-4 text-muted-foreground">
                  Build and organize your own AI prompts
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Create Prompt
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="recent" className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {recentPrompts.map((prompt) => (
                  <PromptCard key={prompt.id} prompt={prompt} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="collections" className="space-y-6">
              <div className="rounded-xl border border-dashed border-border/50 bg-card/30 p-12 text-center">
                <FolderOpen className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <h3 className="mb-2 text-lg font-semibold">Create a Bible</h3>
                <p className="mb-4 text-muted-foreground">
                  Organize your prompts into custom Bibles
                </p>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  New Bible
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Workspace;
