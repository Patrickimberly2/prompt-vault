import { ExternalLink, Sparkles, Bot, Palette, Image, Wand2 } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const aiPartners = [
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "OpenAI's powerful conversational AI for text generation, analysis, and creative tasks.",
    icon: "🤖",
    color: "from-collection-chatgpt/20 to-collection-chatgpt/5 border-collection-chatgpt/30",
    iconBg: "bg-collection-chatgpt/20 text-collection-chatgpt",
    features: ["Text Generation", "Code Writing", "Analysis", "Creative Writing"],
    link: "https://chat.openai.com",
  },
  {
    id: "claude",
    name: "Claude",
    description: "Anthropic's AI assistant known for nuanced understanding and detailed responses.",
    icon: "🧠",
    color: "from-accent/20 to-accent/5 border-accent/30",
    iconBg: "bg-accent/20 text-accent",
    features: ["Long Context", "Research", "Writing", "Coding"],
    link: "https://claude.ai",
  },
  {
    id: "midjourney",
    name: "Midjourney",
    description: "Create stunning AI-generated artwork and imagery from text descriptions.",
    icon: "🎨",
    color: "from-collection-coach/20 to-collection-coach/5 border-collection-coach/30",
    iconBg: "bg-collection-coach/20 text-collection-coach",
    features: ["Art Generation", "Illustrations", "Concepts", "Designs"],
    link: "https://midjourney.com",
  },
  {
    id: "dalle",
    name: "DALL-E",
    description: "OpenAI's image generation model for creating and editing images from text.",
    icon: "🖼️",
    color: "from-primary/20 to-primary/5 border-primary/30",
    iconBg: "bg-primary/20 text-primary",
    features: ["Image Creation", "Editing", "Variations", "Outpainting"],
    link: "https://openai.com/dall-e-3",
  },
  {
    id: "gemini",
    name: "Google Gemini",
    description: "Google's multimodal AI for text, images, audio, and video understanding.",
    icon: "✨",
    color: "from-collection-growth/20 to-collection-growth/5 border-collection-growth/30",
    iconBg: "bg-collection-growth/20 text-collection-growth",
    features: ["Multimodal", "Research", "Coding", "Analysis"],
    link: "https://gemini.google.com",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    description: "AI-powered search engine that provides cited, up-to-date answers.",
    icon: "🔍",
    color: "from-collection-marketer/20 to-collection-marketer/5 border-collection-marketer/30",
    iconBg: "bg-collection-marketer/20 text-collection-marketer",
    features: ["Research", "Citations", "Real-time Data", "Academic"],
    link: "https://perplexity.ai",
  },
];

const AIPartners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="py-12">
        <div className="container px-4">
          {/* Header */}
          <div className="mb-12 max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">AI Partners</span>
            </div>
            <h1 className="mb-4 text-4xl font-bold md:text-5xl">
              Use Your Prompts With
            </h1>
            <p className="text-lg text-muted-foreground">
              Our prompts are compatible with all major AI platforms. Choose your 
              favorite and start creating.
            </p>
          </div>

          {/* Partners Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {aiPartners.map((partner, index) => (
              <div
                key={partner.id}
                className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-6 transition-all duration-300 hover-lift ${partner.color}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${partner.iconBg}`}>
                  {partner.icon}
                </div>

                {/* Content */}
                <h3 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
                  {partner.name}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {partner.description}
                </p>

                {/* Features */}
                <div className="mb-6 flex flex-wrap gap-2">
                  {partner.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="text-xs">
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Link */}
                <a
                  href={partner.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Visit {partner.name}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
            ))}
          </div>

          {/* Compatibility Note */}
          <div className="mt-16 rounded-2xl border border-border/50 bg-card/50 p-8 md:p-12 text-center">
            <Wand2 className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-2xl font-bold">Universal Compatibility</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              All prompts in PromptVault are designed to work across multiple AI 
              platforms. Look for the "Universal" tag on prompts that work 
              seamlessly with any AI assistant.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIPartners;
