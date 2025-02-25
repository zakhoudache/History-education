import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@^0.3.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabaseUrl = "https://uimmjzuqdqxfqoikcexf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVpbW1qenVxZHF4ZnFvaWtjZXhmIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MDA0MDU1NywiZXhwIjoyMDU1NjE2NTU3fQ.da5x63mxpnLCfNHBTxobfwC2MC5w9dJZ4x35j9Yghvc";

function deriveEntityType(text: string, context: string): string {
  const lowerText = text.toLowerCase();
  const lowerCtx = context.toLowerCase();

  if (/(^[A-Z][a-z]+ [A-Z][a-z]+$)/.test(text)) return "person";
  if (/(revolution|war|agreement|conference)/.test(lowerText)) return "event";
  if (/(city|region|continent|country)/.test(lowerCtx)) return "place";
  if (/(economic|market|trade|organization)/.test(lowerCtx))
    return "organization";
  return "concept";
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { text } = await req.json();
    if (!text) {
      return new Response(JSON.stringify({ error: "Missing text" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const genAI = new GoogleGenerativeAI(
      "AIzaSyA1V7Klm9lyEPtw6PViEeeTPoCTwwJQt5E",
    );
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const prompt = `Analyze this text and provide:
      - Entities with types (person/place/organization/event/concept)
      - Relationships between entities
      Format as JSON: { 
        "entities": [{"text":"...","type":"...","context":"..."}], 
        "relationships": [{"source":"...","target":"...","type":"..."}] 
      }\n\nText: ${text}`;

    const result = await model.generateContent(prompt);
    const analysisText = (await result.response).text();
    const cleanJson = analysisText.replace(/```json\n?|```/g, "").trim();
    const parsed = JSON.parse(cleanJson);

    const entities = parsed.entities?.length ? parsed.entities : [];
    const seen = new Set();

    parsed.relationships?.forEach((rel: any) => {
      [rel.source, rel.target].forEach((text) => {
        if (!seen.has(text)) {
          seen.add(text);
          entities.push({
            id: crypto.randomUUID(),
            text,
            type: deriveEntityType(text, rel.type),
            context: rel.type,
          });
        }
      });
    });

    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("entities").insert(entities);
    if (error) console.error("Supabase insert error:", error);

    return new Response(JSON.stringify({ entities }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Function error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
