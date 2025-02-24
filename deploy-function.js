// // deploy-function.js (Deployment script)

// require('dotenv').config(); // Load environment variables from .env file (optional)
// const fs = require('fs');
// const fetch = require('node-fetch');
// const AdmZip = require('adm-zip'); // To create zip files

// const projectId = "https://piqumtwptvufuedosvfi.supabase.co";  // Get these from Supabase dashboard
// const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcXVtdHdwdHZ1ZnVlZG9zdmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzY4OTMsImV4cCI6MjA1NDc1Mjg5M30.9MqcfP8jLZ1bgIEKlJi4DCz-OKJ6hKBRc4UgRNPPzTU";
// const functionName = 'analyze-text'; // Name of your function (must match in supabase.json)
// const functionDir = './supabase/functions/analyze-text'; // Directory containing function files

// async function createZipFromDirectory(directory) {
//     const zip = new AdmZip();

//     // Add supabase.json
//     zip.addLocalFile(`${directory}/supabase.json`);

//     // Add index.ts (or index.js)
//     zip.addLocalFile(`${directory}/index.ts`);  // Or index.js if not using TypeScript

//     const zipBuffer = zip.toBuffer();
//     return zipBuffer;
// }

// async function deployFunction(projectId, serviceRoleKey, functionName, zipData) {
//     const apiUrl = `https://api.supabase.com/v1/projects/${projectId}/functions`;

//     try {
//         const response = await fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/zip',
//                 'Authorization': `Bearer ${serviceRoleKey}`,
//                 'X-Supabase-Project-Id': projectId,
//             },
//             body: zipData,
//         });

//         const data = await response.json();

//         if (!response.ok) {
//             console.error('Error deploying function:', response.status, data);
//             throw new Error(`Failed to deploy function: ${response.status} - ${JSON.stringify(data)}`);
//         }

//         console.log('Function deployed successfully:', data);
//     } catch (error) {
//         console.error('Deployment failed:', error);
//     }
// }

// async function main() {
//     try {
//         const zipData = await createZipFromDirectory(functionDir);
//         await deployFunction(projectId, serviceRoleKey, functionName, zipData);
//     } catch (error) {
//         console.error('Deployment failed:', error);
//     }
// }

// main();









// deploy-function.ts (Deno deployment script)
import 'https://deno.land/x/dotenv/load.ts'; // Load environment variables from .env file
import * as path from "https://deno.land/std@0.188.0/path/mod.ts";

const projectId = "https://piqumtwptvufuedosvfi.supabase.co";  // Get these from Supabase dashboard
const serviceRoleKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpcXVtdHdwdHZ1ZnVlZG9zdmZpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxNzY4OTMsImV4cCI6MjA1NDc1Mjg5M30.9MqcfP8jLZ1bgIEKlJi4DCz-OKJ6hKBRc4UgRNPPzTU";
const functionName = 'analyze-text'; // Name of your function (must match in supabase.json)
const functionDir = './supabase/functions/analyze-text'; // Directory containing function files

async function deployFunction(projectId: string, serviceRoleKey: string, functionName: string, functionDir: string): Promise<void> {
    const apiUrl = `https://api.supabase.com/v1/projects/${projectId}/functions/${functionName}/upload`;

    try {

        const supabaseJsonPath = path.join(functionDir, 'supabase.json');
        const indexTsPath = path.join(functionDir, 'index.ts');

        const supabaseJson = await Deno.readTextFile(supabaseJsonPath);
        const indexTs = await Deno.readTextFile(indexTsPath);

        const formData = new FormData();

        // Append files with correct filenames for Supabase
        formData.append('index.ts', new Blob([indexTs], { type: 'text/typescript' }), 'index.ts'); // Or index.js
        formData.append('supabase.json', new Blob([supabaseJson], { type: 'application/json' }), 'supabase.json');

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${serviceRoleKey}`,
                'X-Supabase-Project-Id': projectId,
            },
            body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Error deploying function:', response.status, data);
            throw new Error(`Failed to deploy function: ${response.status} - ${JSON.stringify(data)}`);
        }

        console.log('Function deployed successfully:', data);
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

async function main(): Promise<void> {
    try {
        if (!projectId || !serviceRoleKey) {
            throw new Error('SUPABASE_PROJECT_ID and SUPABASE_SERVICE_ROLE_KEY must be defined in the environment.');
        }
        await deployFunction(projectId, serviceRoleKey, functionName, functionDir);
    } catch (error) {
        console.error('Deployment failed:', error);
    }
}

await main();