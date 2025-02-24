import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/cors.ts";

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

    const geminiApiKey = "AIzaSyA1V7Klm9lyEPtw6PViEeeTPoCTwwJQt5E";
    if (!geminiApiKey) {
      throw new Error("GEMINI_API_KEY not set in environment.");
    }

    // Use the Gemini 1.5 Flash endpoint as per your curl snippet:
    const modelEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `Extract named entities (persons, places, events, organizations) and classify their types from the following text: ${text}`,
            },
          ],
        },
      ],
    };

    const response = await fetch(modelEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      console.error("Model API Error:", response.status, await response.text());
      throw new Error(`Model API request failed: ${response.status}`);
    }

    const data = await response.json();

    // Adjust parsing logic as needed based on the actual response structure.
    const responseText = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Basic regex parsing: replace with more robust logic if necessary.
    const entityMatches = Array.from(
      responseText.matchAll(
        /(?<text>[A-Za-z ]+) \((?<type>person|place|event|organization)\)/g,
      ),
    );

    const entities = entityMatches.map((match) => ({
      text: match.groups.text.trim(),
      type: match.groups.type,
      id: crypto.randomUUID(),
    }));

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
