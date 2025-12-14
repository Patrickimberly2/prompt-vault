import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { prompts } = await req.json();

    if (!prompts || !Array.isArray(prompts)) {
      return new Response(
        JSON.stringify({ error: "Prompts array is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Transform prompts to match database schema
    const dbPrompts = prompts.map((p: any) => ({
      title: p.title,
      prompt_text: p.promptText,
      category: p.category,
      sub_category: p.subCategory || null,
      ai_model: p.aiModel || "Universal",
      use_case: p.useCase || null,
      status: p.status || "active",
      priority: p.priority || "medium",
      rating: p.rating || 0,
      format_type: p.formatType === "fill-in-blank" ? "fill-in-the-blank" : p.formatType,
      notes: p.notes || null,
      source: p.source || null,
    }));

    // Insert in batches of 100
    const batchSize = 100;
    let insertedCount = 0;
    const errors: string[] = [];

    for (let i = 0; i < dbPrompts.length; i += batchSize) {
      const batch = dbPrompts.slice(i, i + batchSize);
      const { data, error } = await supabase
        .from("prompts")
        .upsert(batch, { onConflict: "title" })
        .select("id");

      if (error) {
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        insertedCount += data?.length || 0;
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        insertedCount, 
        totalSent: prompts.length,
        errors: errors.length > 0 ? errors : undefined
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
