import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { samplePrompts } from "@/data/mockData";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Loader2, Database, CheckCircle } from "lucide-react";

const SeedDatabase = () => {
  const [isSeeding, setIsSeeding] = useState(false);
  const [result, setResult] = useState<{ insertedCount: number; totalSent: number } | null>(null);

  const handleSeed = async () => {
    setIsSeeding(true);
    setResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("seed-prompts", {
        body: { prompts: samplePrompts },
      });

      if (error) {
        toast.error("Failed to seed database: " + error.message);
        return;
      }

      setResult(data);
      toast.success(`Successfully inserted ${data.insertedCount} prompts!`);
    } catch (err: any) {
      toast.error("Error: " + err.message);
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            Seed Database
          </CardTitle>
          <CardDescription>
            Insert all {samplePrompts.length} prompts from mockData into the Supabase database.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-sm text-muted-foreground">
            <p>This will:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Insert all prompts into the database</li>
              <li>Skip duplicates (based on title)</li>
              <li>Process in batches of 100</li>
            </ul>
          </div>

          <Button 
            onClick={handleSeed} 
            disabled={isSeeding}
            className="w-full"
          >
            {isSeeding ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Seeding...
              </>
            ) : (
              <>
                <Database className="mr-2 h-4 w-4" />
                Seed {samplePrompts.length} Prompts
              </>
            )}
          </Button>

          {result && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Complete!</span>
              </div>
              <p className="text-sm mt-2 text-muted-foreground">
                Inserted {result.insertedCount} of {result.totalSent} prompts
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SeedDatabase;
