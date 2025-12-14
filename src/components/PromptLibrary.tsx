import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Copy, BookOpen, Terminal, Check } from "lucide-react";
import { toast } from "sonner";
import promptsData from '../data/prompts.json';

// Types definition to match the JSON structure
type PromptSection = { type: string; content: string; };
type BibleCategory = { category: string; fileName: string; prompts: PromptSection[]; };

const PromptLibrary = () => {
  // Cast data safely
  const data = (promptsData as unknown as BibleCategory[]) || [];
  const [activeCategory, setActiveCategory] = useState<string>(data[0]?.category || "");

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Prompt copied to clipboard!");
  };

  if (data.length === 0) {
    return (
      <div className="text-center p-12 border rounded-lg bg-muted/20">
        <h3 className="text-lg font-semibold">No Prompts Loaded</h3>
        <p className="text-muted-foreground mt-2">
            Please run the <code>extract_prompts.js</code> script to generate the data file.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col items-center text-center space-y-2 mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">The Prompt Vault</h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
          Curated strategies from the Ultimate ChatGPT Bibles.
        </p>
      </div>

      <Tabs defaultValue={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <div className="flex justify-center mb-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-2 md:grid-cols-4">
            {data.map((cat) => (
              <TabsTrigger key={cat.category} value={cat.category}>
                {cat.category}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        {data.map((cat) => (
          <TabsContent key={cat.category} value={cat.category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.prompts.map((prompt, idx) => (
                <Card key={idx} className="flex flex-col h-full hover:shadow-md transition-all">
                  <CardHeader className="pb-3 bg-muted/20">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium text-primary uppercase tracking-wider">
                      {prompt.type === "Fill-in-the-Blank" ? 
                        <Terminal className="w-4 h-4" /> : 
                        <BookOpen className="w-4 h-4" />
                      }
                      {prompt.type}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-4 flex-1 flex flex-col gap-4">
                    <ScrollArea className="h-[200px] w-full rounded-md border p-4 bg-background">
                      <p className="text-sm leading-relaxed whitespace-pre-wrap font-mono text-foreground/90">
                        {prompt.content}
                      </p>
                    </ScrollArea>
                    <Button 
                      variant="outline" 
                      className="w-full mt-auto gap-2 group hover:border-primary hover:text-primary"
                      onClick={() => handleCopy(prompt.content)}
                    >
                      <Copy className="w-4 h-4 group-hover:hidden" /> 
                      <Check className="w-4 h-4 hidden group-hover:block" />
                      Copy Prompt
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default PromptLibrary;
