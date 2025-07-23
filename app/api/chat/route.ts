import { convertToModelMessages, smoothStream, stepCountIs, streamText, type UIMessage } from "ai";
import { DEFAULT_MODEL, SUPPORTED_MODELS } from "@/lib/constants";
import { gateway } from "@/lib/gateway";
import { webSearch } from "@/lib/tools/web-search";
import { createWebsite } from "@/lib/tools/create-website";
import { editWebsite } from "@/lib/tools/edit-website";
import { websiteScreenshot } from "@/lib/tools/website-screenshot";
//import fs from "fs";
//import z from "zod";

export const maxDuration = 60;

export async function POST(req: Request) {
  const {
    messages,
    modelId = DEFAULT_MODEL,
  }: { messages: UIMessage[]; modelId: string } = await req.json();

  if (!SUPPORTED_MODELS.includes(modelId)) {
    return new Response(
      JSON.stringify({ error: `Model ${modelId} is not supported` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const result = streamText({
    model: gateway(modelId),
    stopWhen: stepCountIs(25),
    experimental_transform: smoothStream({
      delayInMs: 20,
      chunking: 'word',
    }),
    system: `You are a coding agent. Users can generate websites (jsx) and you can help them with that. Your responses must be concise.

When a user asks to create a website "like [website name]" or similar to an existing site:
1. First use webSearch to find the URL of that website
2. Then use websiteScreenshot to take a screenshot of the site
3. Pass the screenshot to the createWebsite tool

This workflow allows you to recreate existing website designs accurately based on a url.
    `,
    messages: convertToModelMessages(messages),
    onError: (e) => {
      console.error("Error while streaming.", e);
    },
    tools: {
      webSearch,
      createWebsite,
      editWebsite,
      websiteScreenshot,
      /*
      list_files: tool({
        description:
          "List files and directories at a given path. If no path is provided, lists files in the current directory.",
        inputSchema: z.object({
          path: z
            .string()
            .nullable()
            .describe(
              "Optional relative path to list files from. Defaults to current directory if not provided.",
            ),
        }),
        execute: async ({ path: generatedPath }) => {
          if (generatedPath === ".git" || generatedPath === "node_modules") {
            return { error: "You cannot read the path: ", generatedPath };
          }
          const path = generatedPath?.trim() ? generatedPath : ".";
          try {
            console.log(`Listing files at '${path}'`);
            const output = fs.readdirSync(path, {
              recursive: false,
            });
            return { path, output };
          } catch (e) {
            console.error(`Error listing files:`, e);
            return { error: e };
          }
        },
      }),
      read_file: tool({
        description:
          "Read the contents of a given relative file path. Use this when you want to see what's inside a file. Do not use this with directory names.",
        inputSchema: z.object({
          path: z
            .string()
            .describe("The relative path of a file in the working directory."),
        }),
        execute: async ({ path }) => {
          try {
            console.log(`Reading file at '${path}'`);
            const output = fs.readFileSync(path, "utf-8");
            return { path, output };
          } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            console.error(`Error reading file at ${path}:`, errorMessage);
            return { path, error: errorMessage };
          }
        },
      }),
      edit_file: tool({ 
        description:
          "Make edits to a text file or create a new file. Replaces 'old_str' with 'new_str' in the given file. 'old_str' and 'new_str' MUST be different from each other. If the file specified with path doesn't exist, it will be created.", 
          inputSchema: z.object({ 
            path: z.string().describe("The path to the file"), 
            old_str: z 
              .string() 
              .nullable() 
              .describe( 
                "Text to search for - must match exactly and must only have one match exactly", 
              ), 
            new_str: z.string().describe("Text to replace old_str with"), 
          }), 
          execute: async ({ path, old_str, new_str }) => { 
            try { 
              const fileExists = fs.existsSync(path); 
              if (fileExists && old_str !== null) { 
                console.log(`Editing file '${path}'`); 
                const fileContents = fs.readFileSync(path, "utf-8"); 
                const newContents = fileContents.replace(old_str, new_str); 
                fs.writeFileSync(path, newContents); 
                return { path, success: true, action: "edit" }; 
              } else { 
                console.log(`Creating file '${path}'`); 
                fs.writeFileSync(path, new_str); 
                return { path, success: true, action: "create" }; 
              } 
            } catch (e) { 
              console.error(`Error editing file ${path}:`, e); 
              return { error: e, success: false }; 
            } 
          }, 
      }), 
      */
    },
  });

  return result.toUIMessageStreamResponse();
}
