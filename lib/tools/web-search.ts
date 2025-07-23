import { tool } from "ai";
import { z } from "zod";
import Exa from "exa-js";

export const exa = new Exa(process.env.EXA_API_KEY);

export const webSearch = tool({
  description: 'Search the web for up-to-date information',
  inputSchema: z.object({
    query: z.string().min(1).max(100).describe('The search query'),
  }),
  execute: async ({ query }) => {
    try {
      const { results } = await exa.searchAndContents(query, {
        livecrawl: 'always',
        numResults: 3,
      });
      return results.map(result => ({
        title: result.title,
        url: result.url,
        content: result.text?.slice(0, 1000) || '', // take just the first 1000 characters
        publishedDate: result.publishedDate,
      }));
    } catch (error) {
      console.error('Error performing web search:', error);
      return { error: 'Failed to perform web search. Please check your EXA_API_KEY.' };
    }
  },
}); 