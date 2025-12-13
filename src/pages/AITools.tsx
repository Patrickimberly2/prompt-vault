import { useState } from "react";
import { Search, ExternalLink, Filter, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";

const toolCategories = [
  { id: "text", name: "Text & Writing", icon: "✍️" },
  { id: "image", name: "Image Generation", icon: "🎨" },
  { id: "video", name: "Video Creation", icon: "🎬" },
  { id: "audio", name: "Audio & Voice", icon: "🎵" },
  { id: "code", name: "Coding & Dev", icon: "💻" },
  { id: "business", name: "Business Tools", icon: "💼" },
  { id: "research", name: "Research & Analysis", icon: "🔬" },
  { id: "productivity", name: "Productivity", icon: "⚡" },
];

const aiTools = [
  { id: "chatgpt", name: "ChatGPT", category: "text", description: "Advanced conversational AI by OpenAI for writing, coding, and analysis", url: "https://chat.openai.com", icon: "🤖" },
  { id: "claude", name: "Claude", category: "text", description: "Anthropic's AI assistant known for nuanced, thoughtful responses", url: "https://claude.ai", icon: "🧠" },
  { id: "gemini", name: "Gemini", category: "text", description: "Google's multimodal AI for text, images, and complex reasoning", url: "https://gemini.google.com", icon: "✨" },
  { id: "perplexity", name: "Perplexity", category: "research", description: "AI-powered search engine with real-time information", url: "https://perplexity.ai", icon: "🔍" },
  { id: "midjourney", name: "Midjourney", category: "image", description: "Create stunning AI art and images with text prompts", url: "https://midjourney.com", icon: "🎨" },
  { id: "dalle", name: "DALL-E 3", category: "image", description: "OpenAI's latest image generation model", url: "https://openai.com/dall-e-3", icon: "🖼️" },
  { id: "stable-diffusion", name: "Stable Diffusion", category: "image", description: "Open-source image generation with endless possibilities", url: "https://stability.ai", icon: "🌀" },
  { id: "runway", name: "Runway", category: "video", description: "AI-powered video editing and generation", url: "https://runway.ml", icon: "🎬" },
  { id: "pika", name: "Pika", category: "video", description: "Turn ideas into stunning videos with AI", url: "https://pika.art", icon: "📹" },
  { id: "synthesia", name: "Synthesia", category: "video", description: "Create AI videos with realistic avatars", url: "https://synthesia.io", icon: "👤" },
  { id: "elevenlabs", name: "ElevenLabs", category: "audio", description: "Realistic AI voice generation and cloning", url: "https://elevenlabs.io", icon: "🎙️" },
  { id: "murf", name: "Murf AI", category: "audio", description: "Studio-quality AI voiceovers", url: "https://murf.ai", icon: "🔊" },
  { id: "github-copilot", name: "GitHub Copilot", category: "code", description: "AI pair programmer for faster coding", url: "https://github.com/features/copilot", icon: "👨‍💻" },
  { id: "cursor", name: "Cursor", category: "code", description: "AI-first code editor for productivity", url: "https://cursor.sh", icon: "⌨️" },
  { id: "replit", name: "Replit AI", category: "code", description: "AI-powered collaborative coding platform", url: "https://replit.com", icon: "🔄" },
  { id: "jasper", name: "Jasper", category: "text", description: "AI marketing content generator", url: "https://jasper.ai", icon: "📝" },
  { id: "copyai", name: "Copy.ai", category: "text", description: "AI copywriting for marketing teams", url: "https://copy.ai", icon: "📋" },
  { id: "writesonic", name: "Writesonic", category: "text", description: "AI writer for blogs, ads, and emails", url: "https://writesonic.com", icon: "✏️" },
  { id: "notion-ai", name: "Notion AI", category: "productivity", description: "AI-powered workspace and notes", url: "https://notion.so", icon: "📓" },
  { id: "otter", name: "Otter.ai", category: "productivity", description: "AI meeting transcription and notes", url: "https://otter.ai", icon: "📝" },
  { id: "grammarly", name: "Grammarly", category: "text", description: "AI writing assistant for grammar and style", url: "https://grammarly.com", icon: "✅" },
  { id: "canva-ai", name: "Canva AI", category: "image", description: "AI-powered design tools in Canva", url: "https://canva.com", icon: "🎨" },
  { id: "remove-bg", name: "Remove.bg", category: "image", description: "AI background removal in seconds", url: "https://remove.bg", icon: "✂️" },
  { id: "descript", name: "Descript", category: "video", description: "AI video and podcast editing", url: "https://descript.com", icon: "🎥" },
  { id: "heygen", name: "HeyGen", category: "video", description: "AI video generation platform", url: "https://heygen.com", icon: "👁️" },
  { id: "adobe-firefly", name: "Adobe Firefly", category: "image", description: "Adobe's generative AI for creative work", url: "https://firefly.adobe.com", icon: "🔥" },
  { id: "tome", name: "Tome", category: "productivity", description: "AI-powered presentations", url: "https://tome.app", icon: "📊" },
  { id: "beautiful-ai", name: "Beautiful.ai", category: "productivity", description: "AI presentation maker", url: "https://beautiful.ai", icon: "✨" },
  { id: "chatpdf", name: "ChatPDF", category: "research", description: "Chat with any PDF document", url: "https://chatpdf.com", icon: "📄" },
  { id: "scispace", name: "SciSpace", category: "research", description: "AI research paper assistant", url: "https://scispace.com", icon: "🔬" },
  { id: "consensus", name: "Consensus", category: "research", description: "AI-powered research search engine", url: "https://consensus.app", icon: "📚" },
  { id: "zapier-ai", name: "Zapier AI", category: "business", description: "AI automation for workflows", url: "https://zapier.com", icon: "⚡" },
  { id: "hubspot-ai", name: "HubSpot AI", category: "business", description: "AI for CRM and marketing", url: "https://hubspot.com", icon: "🎯" },
  { id: "salesforce-einstein", name: "Salesforce Einstein", category: "business", description: "AI for sales and service", url: "https://salesforce.com", icon: "☁️" },
  { id: "lumen5", name: "Lumen5", category: "video", description: "AI video creation from text", url: "https://lumen5.com", icon: "💡" },
  { id: "pictory", name: "Pictory", category: "video", description: "AI video creation and editing", url: "https://pictory.ai", icon: "🖼️" },
  { id: "krisp", name: "Krisp", category: "audio", description: "AI noise cancellation for calls", url: "https://krisp.ai", icon: "🔇" },
  { id: "resemble", name: "Resemble AI", category: "audio", description: "AI voice cloning platform", url: "https://resemble.ai", icon: "🎤" },
  { id: "codeium", name: "Codeium", category: "code", description: "Free AI code completion", url: "https://codeium.com", icon: "🆓" },
  { id: "tabnine", name: "Tabnine", category: "code", description: "AI code completion assistant", url: "https://tabnine.com", icon: "⭐" },
  { id: "phind", name: "Phind", category: "code", description: "AI search for developers", url: "https://phind.com", icon: "🔎" },
  { id: "leonardo", name: "Leonardo.ai", category: "image", description: "AI image generation for games", url: "https://leonardo.ai", icon: "🎮" },
  { id: "ideogram", name: "Ideogram", category: "image", description: "AI images with perfect text", url: "https://ideogram.ai", icon: "🔤" },
  { id: "suno", name: "Suno", category: "audio", description: "AI music generation", url: "https://suno.ai", icon: "🎶" },
  { id: "udio", name: "Udio", category: "audio", description: "Create music with AI", url: "https://udio.com", icon: "🎵" },
  { id: "motion", name: "Motion", category: "productivity", description: "AI calendar and task manager", url: "https://usemotion.com", icon: "📅" },
  { id: "mem", name: "Mem", category: "productivity", description: "AI-powered note-taking", url: "https://mem.ai", icon: "🧠" },
  { id: "hyperwrite", name: "HyperWrite", category: "text", description: "Personal AI writing assistant", url: "https://hyperwriteai.com", icon: "⚡" },
  { id: "wordtune", name: "Wordtune", category: "text", description: "AI writing companion", url: "https://wordtune.com", icon: "🔄" },
];

const AITools = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredTools = aiTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(tool.category);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="py-8">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              <span className="gradient-text">600+ AI Tools</span> Directory
            </h1>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Discover the best AI tools for every task. From text generation to video creation, 
              find the perfect AI tool to supercharge your workflow.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mb-8 mx-auto max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search AI tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 pl-12 bg-card border-border/50 text-lg"
              />
            </div>
          </div>

          {/* Category Filters */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {toolCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategories.includes(category.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleCategory(category.id)}
                className="gap-2"
              >
                <span>{category.icon}</span>
                {category.name}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center text-sm text-muted-foreground">
            Showing {filteredTools.length} of {aiTools.length} tools
          </div>

          {/* Tools Grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredTools.map((tool) => {
              const category = toolCategories.find((c) => c.id === tool.category);
              return (
                <a
                  key={tool.id}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group rounded-xl border border-border/50 bg-card p-5 transition-all duration-300 hover:border-primary/50 hover:bg-card-hover hover:-translate-y-1"
                >
                  {/* Header */}
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{tool.icon}</span>
                      <div>
                        <h3 className="font-semibold group-hover:text-primary transition-colors">
                          {tool.name}
                        </h3>
                        <Badge variant="secondary" className="text-xs mt-1">
                          {category?.name}
                        </Badge>
                      </div>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {tool.description}
                  </p>
                </a>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AITools;
