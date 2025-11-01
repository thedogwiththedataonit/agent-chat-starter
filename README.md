# AI Email Agent with Image Generation

A powerful Next.js AI agent template that demonstrates advanced tool calling with the Vercel AI SDK v6. This agent creates beautiful, professional emails with **AI-generated images** using React Email and natural language. Built as an open-source template for developers to learn from and extend.

## ✨ Key Features

**🤖 Advanced AI Agent Architecture**: Built with AI SDK v6's `ToolLoopAgent` for multi-step reasoning and tool orchestration  
**🎨 AI-Powered Email Generation**: Create stunning, responsive emails with React Email components  
**🖼️ AI Image Generation**: Automatic custom image creation using nanobanana/fal.ai for email visuals  
**📧 Email Sending**: Send generated emails directly via Resend with one click  
**🔧 Multi-Tool System**: Web search, screenshot capture, email editing, and image transformation  
**🌐 Provider Agnostic**: Works with any AI provider through Vercel AI Gateway  
**📱 Live Preview**: Real-time email rendering with desktop/mobile views

## AI Gateway Integration

This application demonstrates cutting-edge use of the [Vercel AI Gateway](https://vercel.com/docs/functions/ai-gateway) - a unified proxy layer that enables:

- **Provider Agnosticism**: Switch between OpenAI, Anthropic, Google, Cohere, or any AI provider without code changes
- **Advanced Routing**: Intelligent load balancing, fallback logic, and region-aware routing
- **Real-time Monitoring**: Built-in analytics, cost tracking, and performance metrics
- **Enterprise Security**: Secure credential management without exposing API keys in client code
- **Caching & Optimization**: Automatic response caching and request optimization

## 🏗️ What This Template Teaches

This is an **educational template** showcasing production-ready patterns for building AI agents:

- **Agent Architecture**: How to structure multi-tool agents with AI SDK v6
- **Tool Calling**: Creating and orchestrating multiple AI tools
- **Image Generation**: Integrating AI image models into agent workflows
- **React Email**: Generating pixel-perfect emails programmatically
- **Provider Abstraction**: Using AI Gateway for provider-agnostic development
- **Type Safety**: Full TypeScript implementation with proper types
- **Streaming**: Real-time AI responses with user feedback
- **Production Patterns**: Error handling, logging, and best practices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- A Vercel account (free tier works)
- API keys (see Environment Variables below)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd agent-template-ai-gateway
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   
   ```env
   # Required - AI Gateway Authentication
   # Option A: Use OIDC (recommended for Vercel)
   # Run: vercel env pull
   
   # Option B: Use API Key (for local development)
   AI_GATEWAY_API_KEY=your_gateway_api_key
   
   # Required - Image Generation
   FAL_KEY=your_fal_api_key
   
   # Required - Email Sending
   RESEND_API_KEY=your_resend_api_key
   
   # Optional - Default "From" email domain
   NEXT_PUBLIC_RESEND_SEND_DOMAIN=onboarding@resend.dev
   
   # Optional - Web Search Tool
   EXA_API_KEY=your_exa_api_key
   ```

4. **Start the development server**
   
   **Option A** (Recommended - auto-refreshes OIDC tokens):
   ```bash
   vercel dev
   ```
   
   **Option B** (Standard - requires manual token refresh):
   ```bash
   pnpm dev
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🔑 Environment Variables

### Required Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `AI_GATEWAY_API_KEY` | Vercel AI Gateway API key | [Vercel Dashboard → AI Gateway](https://vercel.com/dashboard/ai-gateway) |
| `FAL_KEY` | fal.ai API key for image generation | [fal.ai Dashboard](https://fal.ai/dashboard/keys) |
| `RESEND_API_KEY` | Resend API key for email sending | [Resend Dashboard](https://resend.com/api-keys) |

### Optional Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `EXA_API_KEY` | Exa web search API key | [Exa Dashboard](https://exa.ai/) |
| `NEXT_PUBLIC_RESEND_SEND_DOMAIN` | Default "From" email address | Use `onboarding@resend.dev` or your verified domain |

### Environment Setup Notes

- **Development with OIDC**: Run `vercel env pull` to download tokens (expires every 12 hours)
- **Development with API Key**: Add `AI_GATEWAY_API_KEY` to `.env.local`
- **Production**: OIDC authentication is automatic on Vercel deployments
- **Older Projects**: Enable OIDC in Project Settings → Secure Backend Access with OIDC Federation

## 📦 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   
   In Vercel Dashboard → Project Settings → Environment Variables, add:
   - `FAL_KEY` - Your fal.ai API key
   - `RESEND_API_KEY` - Your Resend API key
   - `EXA_API_KEY` - Your Exa API key (optional)
   - `NEXT_PUBLIC_RESEND_SEND_DOMAIN` - Your verified domain (optional, defaults to onboarding@resend.dev)
   - `AI_GATEWAY_API_KEY` - Not needed on Vercel (uses OIDC automatically)

4. **Deploy**
   - Click "Deploy"
   - Your agent will be live in ~2 minutes

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:
- Vercel (recommended - OIDC auth built-in)
- Netlify
- AWS Amplify
- Self-hosted with Node.js

**Note**: Non-Vercel deployments require `AI_GATEWAY_API_KEY` in environment variables.

## 🏛️ Architecture Overview

This template demonstrates a production-ready AI agent architecture using AI SDK v6's `ToolLoopAgent`.

### Agent Flow

```
User Input → Email Agent → Multi-Step Process:
                           ├─ Analyze image needs
                           ├─ Generate images (createImage tool)
                           ├─ Create email (createEmail tool)
                           ├─ Edit/refine (editEmail tool)
                           └─ Return final email
```

### Directory Structure

```
agent-template-ai-gateway/
├── app/
│   ├── api/
│   │   ├── chat/route.ts           # Main chat endpoint
│   │   ├── models/route.ts         # Available AI models
│   │   └── render-email/route.ts   # Email HTML rendering
│   ├── layout.tsx                  # App layout
│   └── page.tsx                    # Main chat UI
├── components/
│   ├── ai-elements/                # AI UI components
│   ├── ui/                         # Base UI components
│   ├── chat.tsx                    # Chat interface
│   ├── email-viewport.tsx          # Email preview
│   └── model-selector.tsx          # Model switching
├── lib/
│   ├── agents/
│   │   └── email-agent.ts          # 🤖 Main agent definition
│   ├── tools/
│   │   ├── create-email.ts         # Email generation tool
│   │   ├── edit-email.ts           # Email editing tool
│   │   ├── create-image.ts         # 🖼️ Image generation tool
│   │   ├── edit-image.ts           # 🖼️ Image editing tool
│   │   ├── web-search.ts           # Web search tool
│   │   └── website-screenshot.ts   # Screenshot tool
│   ├── gateway.ts                  # AI Gateway configuration
│   ├── nanobanana-server.ts        # 🖼️ Server-side image generation
│   └── constants.ts                # App configuration
└── package.json
```

## 🤖 Agent Architecture

### The Email Agent (`lib/agents/email-agent.ts`)

The core agent is built with `ToolLoopAgent` from AI SDK v6:

```typescript
import { ToolLoopAgent } from "ai";

export function createEmailAgent(modelId: string) {
  return new ToolLoopAgent({
    model: gateway(modelId),
    instructions: `[Detailed agent instructions]`,
    tools: {
      webSearch,           // Search the web
      createEmail,         // Generate React Email JSX
      editEmail,           // Modify existing emails
      websiteScreenshot,   // Capture design references
      createImage,         // Generate AI images
      editImage,           // Transform images
    },
    stopWhen: stepCountIs(25),
  });
}
```

### Agent Workflow

The agent follows a **structured multi-step process**:

1. **Analysis**: Understands user request and identifies required images
2. **Image Generation**: Creates custom images using `createImage` tool
3. **Email Creation**: Generates React Email JSX with `createEmail` tool
4. **Image Integration**: Inserts generated image URLs into email
5. **Refinement**: Uses `editEmail` to polish the final result

### Why This Architecture?

- ✅ **Separation of Concerns**: Each tool has a single responsibility
- ✅ **Composability**: Tools can be used independently or combined
- ✅ **Testability**: Each tool can be tested in isolation
- ✅ **Extensibility**: Easy to add new tools (e.g., send-email, analytics)
- ✅ **Type Safety**: Full TypeScript support with Zod schemas
- ✅ **Error Handling**: Graceful degradation when tools fail

## 🎨 Email Generation System

### How It Works

The agent generates **production-ready React Email code** that renders perfectly across all email clients.

#### Example Interaction

**User**: "Create a welcome email for a SaaS product"

**Agent**:
1. Analyzes need: "This needs a hero image showing a modern dashboard"
2. Calls `createImage({ prompt: "modern SaaS dashboard...", aspectRatio: "16:9" })`
3. Gets Vercel Blob URL: `https://blob.vercel-storage.com/...`
4. Calls `createEmail({ description: "welcome email with hero image at [URL]..." })`
5. Returns complete React Email JSX with embedded image

#### Generated Output

```jsx
<Html>
  <Head>
    <Preview>Welcome to our platform!</Preview>
  </Head>
  <Body style={{ backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' }}>
    <Container maxWidth="600px" style={{ width: '100%', margin: '0 auto' }}>
      <Section style={{ padding: '20px', boxSizing: 'border-box' }}>
        <Img 
          src="https://blob.vercel-storage.com/..." 
          width={600} 
          style={{ maxWidth: '100%', height: 'auto', display: 'block' }} 
          alt="Dashboard preview"
        />
        <Heading style={{ fontSize: '24px', fontWeight: 'bold' }}>
          Welcome to Our Platform
        </Heading>
        {/* ... more content ... */}
      </Section>
    </Container>
  </Body>
</Html>
```

### React Email Components

All emails use these production-tested components:

- **Structure**: `<Html>`, `<Head>`, `<Body>`, `<Preview>`
- **Layout**: `<Container>`, `<Section>`, `<Row>`, `<Column>`
- **Typography**: `<Text>`, `<Heading>`
- **Interactive**: `<Button>`, `<Link>`
- **Media**: `<Img>`, `<Hr>`

### Email Client Compatibility

✅ **Tested and works across**:
- Gmail (Desktop & Mobile)
- Outlook (Windows, Mac, Web)
- Apple Mail (iOS & macOS)
- Yahoo Mail
- ProtonMail
- Thunderbird

### Overflow Prevention

The agent is specifically prompted to prevent layout issues:

- ✅ Max width: 600px (industry standard)
- ✅ Responsive images: `maxWidth: '100%'`
- ✅ Box model aware: `boxSizing: 'border-box'`
- ✅ Word wrapping: `wordBreak: 'break-word'`
- ✅ No fixed widths on buttons
- ✅ Proper padding calculations

### Email Sending

Once an email is generated, you can send it directly using the **Send Email** button in the email preview:

1. **Click "Send Email"** in the viewport header
2. **Fill in the form**:
   - From: Your verified email (use `onboarding@resend.dev` for testing)
   - To: Recipient email(s) (comma-separated for multiple)
   - Reply-To: Optional reply address
   - Subject: Email subject line
3. **Click Send** - Email is sent via Resend API

**Features**:
- ✅ Renders React Email to production-ready HTML
- ✅ Works across all email clients (Gmail, Outlook, etc.)
- ✅ Real-time success/error feedback
- ✅ Supports multiple recipients
- ✅ Validates email addresses
- ✅ Helpful error messages for common issues

## 🖼️ AI Image Generation

### How Image Generation Works

Images are generated server-side using **nanobanana** (fal.ai's fast image model):

```typescript
// lib/nanobanana-server.ts
import { fal } from "@fal-ai/client"

export const generateImageServer = async (params) => {
  const result = await fal.subscribe("fal-ai/nano-banana", {
    input: {
      prompt: params.prompt,
      aspect_ratio: params.aspectRatio,
      num_images: 1,
      output_format: "png"
    }
  })
  
  return {
    url: result.data.images[0].url,
    prompt: params.prompt
  }
}
```

### Image Storage with Vercel Blob

Generated images are uploaded to Vercel Blob storage for reliable, permanent hosting:

```typescript
// Image generation flow:
1. Generate image via nanobanana (fal.ai)
2. Upload to Vercel Blob storage
3. Return permanent blob URL

// Example blob URL (used in emails)
https://blob.vercel-storage.com/image-abc123.png
```

**Why Vercel Blob?**
- ✅ Permanent: Images persist indefinitely
- ✅ Fast: Global CDN distribution
- ✅ Reliable: Works consistently across email clients
- ✅ Secure: Private storage with public read access

### Image Tools

#### 1. `createImage` - Text-to-Image

```typescript
createImage({
  prompt: "modern tech startup office, professional lighting",
  aspectRatio: "16:9"  // Options: "16:9", "3:2", "1:1", "4:3"
})
```

**Returns**:
```typescript
{
  success: true,
  imageUrl: "https://blob.vercel-storage.com/...",
  aspectRatio: "16:9",
  message: "Image generated successfully and uploaded to Vercel Blob storage"
}
```

#### 2. `editImage` - Image-to-Image Transformation

```typescript
editImage({
  prompt: "make it more vibrant, add warm lighting",
  currentEmailJsx: "<Html>...</Html>",
  imageSelector: "first"  // "first", "last", or "all"
})
```

**Features**:
- ✅ Automatically finds images in email JSX
- ✅ Decodes proxy URLs to original fal.media URLs
- ✅ Applies transformations
- ✅ Returns updated JSX with new image URLs

## 🔧 Tool Calling System

All tools use **Zod schemas** for type-safe parameters:

```typescript
import { tool } from "ai"
import { z } from "zod"

export const createImage = tool({
  description: 'Generate a new image from a text description...',
  inputSchema: z.object({
    prompt: z.string().min(1).describe('Detailed description...'),
    aspectRatio: z.enum(["16:9", "3:2", "1:1", "4:3"]).optional()
  }),
  execute: async ({ prompt, aspectRatio }) => {
    // Tool implementation
  }
})
```

### Available Tools

| Tool | Purpose | Required Params |
|------|---------|----------------|
| `createEmail` | Generate React Email JSX | `description`, `referenceImageUrl?` |
| `editEmail` | Modify existing email | `modification`, `currentJsx` |
| `createImage` | Generate AI image | `prompt`, `aspectRatio?` |
| `editImage` | Transform email images | `prompt`, `currentEmailJsx`, `imageSelector` |
| `webSearch` | Search the web | `query` |
| `websiteScreenshot` | Capture screenshots | `url` |

### Tool Execution Flow

```
User Message
    ↓
Agent analyzes intent
    ↓
Agent selects tool(s)
    ↓
Tool executes
    ↓
Result returned to agent
    ↓
Agent uses result in next step
    ↓
Final response to user
```

## 🛠️ Customization Guide

### Adding a New Tool

1. **Create tool file** in `lib/tools/`:

```typescript
// lib/tools/my-custom-tool.ts
import { tool } from "ai"
import { z } from "zod"

export const myCustomTool = tool({
  description: 'What this tool does and when to use it',
  inputSchema: z.object({
    param: z.string().describe('Description for the AI')
  }),
  execute: async ({ param }) => {
    // Your logic here
    return { success: true, data: result }
  }
})
```

2. **Register tool** in `lib/agents/email-agent.ts`:

```typescript
import { myCustomTool } from "@/lib/tools/my-custom-tool"

export function createEmailAgent(modelId: string) {
  return new ToolLoopAgent({
    // ...
    tools: {
      webSearch,
      createEmail,
      editEmail,
      myCustomTool,  // ← Add here
    },
  })
}
```

3. **Update instructions** in the agent to tell it when to use your tool.

### Changing AI Models

Models are configured in `lib/constants.ts`:

```typescript
export const DEFAULT_MODEL = "openai:gpt-4o"

// Switch to Claude:
export const DEFAULT_MODEL = "anthropic:claude-3-5-sonnet-20241022"

// Switch to Gemini:
export const DEFAULT_MODEL = "google:gemini-1.5-pro"
```

### Customizing the UI

- **Chat Interface**: `components/chat.tsx`
- **Email Preview**: `components/email-viewport.tsx`
- **AI Elements**: `components/ai-elements/`
- **Styling**: `app/globals.css` (Tailwind CSS)

## 📚 Learn More

### AI SDK v6 Documentation
- [AI SDK v6 Beta Announcement](https://v6.ai-sdk.dev/docs/announcing-ai-sdk-6-beta)
- [ToolLoopAgent Guide](https://v6.ai-sdk.dev/docs/ai-sdk-core/tool-loop-agent)
- [Tool Calling](https://v6.ai-sdk.dev/docs/ai-sdk-core/tools)

### Vercel AI Gateway
- [AI Gateway Documentation](https://vercel.com/docs/functions/ai-gateway)
- [Gateway Dashboard](https://vercel.com/dashboard/ai-gateway)

### React Email
- [React Email Documentation](https://react.email/docs)
- [Component Library](https://react.email/docs/components)
- [Email Examples](https://react.email/examples)

### Image Generation
- [fal.ai Documentation](https://fal.ai/docs)
- [nanobanana Model](https://fal.ai/models/fal-ai/nano-banana)

### Email Sending
- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference)
- [Domain Verification](https://resend.com/docs/dashboard/domains/introduction)

## 🤝 Contributing

Contributions are welcome! This is an educational template - help make it better:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this template for your own projects!

## 💬 Support

- **Issues**: Open an issue for bugs or feature requests
- **Discussions**: Share your implementations and ask questions
- **Twitter**: Share what you built with this template!

## 🙏 Acknowledgments

This template builds on:
- [Vercel AI SDK](https://sdk.vercel.ai) - The foundation for AI integration
- [React Email](https://react.email) - Email component library
- [fal.ai](https://fal.ai) - Fast AI image generation
- [Resend](https://resend.com) - Email sending API
- [Vercel](https://vercel.com) - Hosting and AI Gateway

---

**Built with ❤️ as an open-source learning resource for the AI developer community.**
