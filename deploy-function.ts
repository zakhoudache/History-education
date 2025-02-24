// deploy-function.ts (Deno deployment script)
import "https://deno.land/x/dotenv/load.ts"; // Load environment variables from .env file
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";

const projectId = "piqumtwptvufuedosvfi"; // Get these from Supabase dashboard - The SHORT alphanumeric ID, NOT the URL
const serviceRoleKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcXVtdHdwdHZ1ZnVlZG9zdmZpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczOTE3Njg5MywiZXhwIjoyMDU0NzUyODkzfQ.cHuJp-UKr_962KV8nlu30JgvSuymbCr-uA4JevnoUx4"; // REPLACE WITH THE SERVICE_ROLE KEY, NOT THE ANON KEY!

const functionName = "analyze-text"; // Name of your function (must match in supabase.json)

// Use absolute file paths to avoid any relative path issues:
const functionDir = "supabase/functions/analyze-text"; // Ensure this is the CORRECT absolute path!

async function deployFunction(
  projectId: string,
  serviceRoleKey: string,
  functionName: string,
  functionDir: string,
): Promise<void> {
  const apiUrl = `https://api.supabase.com/v1/projects/${projectId}/functions/${functionName}/upload`;

  try {
    // Use absolute paths here too:
    const supabaseJsonPath = path.join(functionDir, "supabase.json");
    const indexTsPath = path.join(functionDir, "index.ts");

    // Read files with explicit UTF-8 encoding to avoid encoding issues
    const supabaseJson = await Deno.readTextFile(supabaseJsonPath, {
      encoding: "utf-8",
    });
    const indexTs = await Deno.readTextFile(indexTsPath, { encoding: "utf-8" });

    const formData = new FormData();

    // Append files with correct filenames for Supabase
    formData.append(
      "index.ts",
      new Blob([indexTs], { type: "text/typescript" }),
      "index.ts",
    );
    formData.append(
      "supabase.json",
      new Blob([supabaseJson], { type: "application/json" }),
      "supabase.json",
    );

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${serviceRoleKey}`,
        "X-Supabase-Project-Id": projectId,
      },
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error deploying function:", response.status, data);
      throw new Error(
        `Failed to deploy function: ${response.status} - ${JSON.stringify(data)}`,
      );
    }

    console.log("Function deployed successfully:", data);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
}

async function main(): Promise<void> {
  try {
    if (!projectId || !serviceRoleKey) {
      throw new Error(
        "SUPABASE_PROJECT_ID and SUPABASE_SERVICE_ROLE_KEY must be defined in the environment.",
      );
    }
    await deployFunction(projectId, serviceRoleKey, functionName, functionDir);
  } catch (error) {
    console.error("Deployment failed:", error);
  }
}

await main();
