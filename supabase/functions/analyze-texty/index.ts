import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@^0.3.0";

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

    const prompt = `Analyze this text and extract named entities. For each entity, determine its type (person, place, event, concept, or organization) and provide relevant context.

Provide the output in this exact JSON format:
{
  "entities": [
    {
      "text": "entity name",
      "type": "one of: person/place/event/concept/organization",
      "context": "brief context about this entity"
    }
  ]
}

Text to analyze: ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const analysisText = response.text();

    let entities = [];
    try {
      // Try to extract JSON from the response, handling potential markdown formatting
      const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const parsed = JSON.parse(jsonMatch[0]);
        entities = parsed.entities.map((entity: any) => ({
          id: crypto.randomUUID(),
          text: entity.text,
          type: entity.type.toLowerCase(),
          context: entity.context || "",
        }));
      }
    } catch (e) {
      console.error("Failed to parse entities:", e);
      console.log("Raw response:", analysisText);
    }

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
