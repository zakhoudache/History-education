// Supabase Function: supabase/functions/analyze-text/index.ts
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

    // Replace with your actual Gemini API endpoint and request format
    const geminiApiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

    const geminiRequestBody = {
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

    const geminiResponse = await fetch(geminiApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(geminiRequestBody),
    });

    if (!geminiResponse.ok) {
      console.error(
        "Gemini API Error:",
        geminiResponse.status,
        await geminiResponse.text(),
      );
      throw new Error(`Gemini API request failed: ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();

    // **Crucially important:**  Parse the Gemini API response
    // to extract the entities and their types.  This part
    // depends entirely on the structure of Gemini's response.
    // The example below is a placeholder.  You'll need to adapt it.
    // For example,  geminiData.candidates[0].content.parts[0].text contains response as string.
    // Use regular expressions or NLP library to parse the string and extract entities with labels.
    // Example:

    const geminiResponseText =
      geminiData?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    // Very basic regex example - REPLACE THIS WITH PROPER PARSING
    const entityMatches = Array.from(
      geminiResponseText.matchAll(
        /(?<text>[A-Za-z ]+) \((?<type>person|place|event|organization)\)/g,
      ),
    );

    const entities = entityMatches.map((match) => ({
      text: match.groups.text.trim(),
      type: match.groups.type as Entity["type"],
      id: crypto.randomUUID(), // Or generate a suitable ID
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
