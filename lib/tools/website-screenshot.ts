import { tool } from "ai";
import { z } from "zod";

export interface BrandScreenshotData {
  status: 'success' | 'error';
  data: {
    title: string;
    publisher: string;
    image: {
      url: string;
      height: number;
      width: number;
    };
    url: string;
    description: string;
    logo: {
      url: string;
      height: number;
      width: number;
    };
    screenshot: {
      url: string;
      width: number;
      height: number;
    };
  };
}

export async function takeWebsiteScreenshot(url: string): Promise<BrandScreenshotData> {
  try {
    const apiUrl = `https://api.microlink.io/?url=${encodeURIComponent(url)}&screenshot=true`;
    
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    return {
      status: 'success',
      data: data.data
    };
  } catch (error) {
    console.error('Error taking website screenshot:', error);
    return {
      status: 'error',
      data: {
        title: '',
        publisher: '',
        image: {
          url: '',
          height: 0,
          width: 0
        },
        url: url,
        description: '',
        logo: {
          url: '',
          height: 0,
          width: 0
        },
        screenshot: {
          url: '',
          width: 0,
          height: 0
        }
      }
    };
  }
}


export const websiteScreenshot = tool({
  description: 'Take a screenshot of a website given its URL. Returns screenshot data including the image URL and metadata.',
  inputSchema: z.object({
    url: z.string().url().describe('The URL of the website to screenshot'),
  }),
  execute: async ({ url }) => {
    try {
      const screenshotData = await takeWebsiteScreenshot(url);
      
      if (screenshotData.status === 'error') {
        return { error: 'Failed to take website screenshot. Please check the URL and try again.' };
      }
      
      return {
        success: true,
        screenshot: screenshotData.data.screenshot,
        metadata: {
          title: screenshotData.data.title,
          description: screenshotData.data.description,
          url: screenshotData.data.url,
          publisher: screenshotData.data.publisher
        }
      };
    } catch (error) {
      console.error('Error in websiteScreenshot tool:', error);
      return { error: 'Failed to take website screenshot. Please try again.' };
    }
  },
});


