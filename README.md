A powerful Next.js AI email generator that leverages the Vercel AI Gateway and React Email to create beautiful, professional emails with natural language. This app serves as a comprehensive foundation for building AI-powered email generation applications that work seamlessly across any AI provider.

**🎨 AI-Powered Email Generation**: Create stunning, responsive emails using natural language descriptions - from welcome emails to promotional campaigns, all powered by React Email!

## AI Gateway Integration

This application demonstrates cutting-edge use of the [Vercel AI Gateway](https://vercel.com/docs/functions/ai-gateway) - a unified proxy layer that enables:

- **Provider Agnosticism**: Switch between OpenAI, Anthropic, Google, Cohere, or any AI provider without code changes
- **Advanced Routing**: Intelligent load balancing, fallback logic, and region-aware routing
- **Real-time Monitoring**: Built-in analytics, cost tracking, and performance metrics
- **Enterprise Security**: Secure credential management without exposing API keys in client code
- **Caching & Optimization**: Automatic response caching and request optimization

## Powerful AI Email Generator

This starter template provides everything needed for production-ready AI email generation:

- **Universal Provider Support**: One codebase, unlimited AI providers
- **React Email Integration**: Generate emails using industry-standard React Email components
- **Tool Calling Framework**: Built-in function calling for web search and design inspiration
- **Streaming Responses**: Real-time AI responses with type safety
- **Session Management**: Persistent chat history and user context
- **Production Ready**: Built-in security, monitoring, and scalability
- **Zero-config Deployment**: Deploy to Vercel with a single click

## Getting Started

### Super Easy to Start

Get your AI email generator running in **under 2 minutes** with zero configuration:

1. **One-Click Deploy** - Click the button below to instantly deploy to Vercel
2. **Zero Setup** - No API keys or configuration needed - AI Gateway handles everything
3. **Start Creating** - Your email generator is live with provider-agnostic AI support

### One-time setup

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fai-sdk-gateway-demo)

1. Clone this repository with the Deploy button above
1. Install the [Vercel CLI](https://vercel.com/docs/cli) if you don't already have it
1. Clone the repository you created above: `git clone <repo-url>`
1. Link it to a Vercel project: `vc link` or `vc deploy`

### Usage
1. Install packages with `pnpm i` (or `npm i` or `yarn i`)
2. **Authentication Setup** - Choose one option:
   - **Option A (Recommended)**: Run `vercel env pull` to download OIDC tokens, then use `vercel dev` to start the development server
   - **Option B**: Set `AI_GATEWAY_API_KEY` in your environment variables (get your key from [Vercel AI Gateway](https://vercel.com/dashboard/ai-gateway)), then use `pnpm dev`
   - **Note**: On Vercel deployments, OIDC authentication is automatic - no API key needed
3. (Optional) For web search functionality, add your EXA API key to your environment variables:
   - Get your API key from [Exa](https://exa.ai/)
   - Add `EXA_API_KEY=your_api_key_here` to your environment variables or `.env.local` file
4. Open http://localhost:3000 to start generating emails!

### FAQ

1. If you prefer running your local development server directly rather than using `vc dev`, you'll need to run `vc env pull` to fetch the project's OIDC authentication token locally
   1. the token expires every 12h, so you'll need to re-run this command periodically.
   1. if you use `vc dev` it will auto-refresh the token for you, so you don't need to fetch it manually
1. If you're linking to an existing, older project, you may need to enable the OIDC token feature in your project settings.
   1. visit the project settings page (rightmost tab in your project's dashboard)
   1. search for 'OIDC' in settings
   1. toggle the button under "Secure Backend Access with OIDC Federation" to Enabled and click the "Save" button

## AI SDK v6 Beta & Agent Architecture

This application showcases the new [AI SDK v6 beta](https://v6.ai-sdk.dev/docs/announcing-ai-sdk-6-beta) with the `ToolLoopAgent` class for building powerful AI agents with full control over execution flow, tool loops, and state management.

## React Email Email Generation

This application features a powerful email generation system that creates fully functional, responsive emails using natural language descriptions. The AI can generate complete emails with modern design patterns and best practices.

### Email Generation Features

- **Natural Language Input**: Simply describe the email you want (e.g., "Create a welcome email for new users")
- **Complete Email Generation**: Generates full emails with proper structure (Html, Head, Body, Container, Sections)
- **Cross-Client Compatibility**: Emails work perfectly in Gmail, Outlook, Apple Mail, Yahoo Mail, and more
- **Professional Templates**: Built-in knowledge of welcome emails, promotional campaigns, transactional emails, newsletters, and more
- **Visual Reference Support**: Can analyze screenshots of existing emails and recreate similar designs

### Email Editing Capabilities

- **Real-time Modifications**: Edit generated emails with simple instructions like "change the button color to blue" or "add a footer section"
- **Content Updates**: Modify text, images, and layout elements
- **Style Adjustments**: Change colors, fonts, spacing, and visual elements
- **Section Management**: Add, remove, or rearrange email sections

### Interactive Email Viewport

- **Split-Screen Interface**: Chat with the AI on one side while previewing your email on the other
- **Responsive Preview**: Toggle between desktop and mobile views to see how your email looks on different devices
- **Code Inspection**: View the generated React Email JSX code to understand the implementation
- **Live Updates**: See changes instantly as you make modifications through chat
- **HTML Rendering**: Emails are rendered to HTML in real-time for accurate preview

### Example Use Cases

- Generate welcome emails for new users
- Create promotional emails for sales and campaigns
- Build transactional emails (receipts, confirmations, notifications)
- Design newsletters and update emails
- Create password reset and verification emails
- Generate event invitations and announcements
- Recreate existing email designs with custom content

### React Email Components Used

The generator uses React Email's component library for maximum compatibility:
- `<Html>`, `<Head>`, `<Body>` - Email structure
- `<Container>`, `<Section>`, `<Row>`, `<Column>` - Layout
- `<Text>`, `<Heading>` - Typography
- `<Button>`, `<Link>` - Interactive elements
- `<Img>` - Images with proper email client support
- `<Hr>` - Dividers
- `<Preview>` - Email preview text

## Chat SDK and Tool Calling

This application demonstrates the integration of the Vercel AI SDK to enable advanced chat functionalities, including tool calling within a chat UI. Tool calling allows the chatbot to interact with external APIs or custom functions based on user input, enhancing the conversational experience by providing dynamic and context-aware responses.

### Available Tools

- **Email Generation**: Create complete, responsive emails with React Email components
- **Email Editing**: Modify existing generated emails with natural language instructions
- **Website Screenshot**: Capture screenshots of existing websites/emails for design inspiration
- **Web Search**: Search the web for up-to-date information using Exa (requires `EXA_API_KEY`)
- **Real-time Preview**: View generated emails with responsive design preview (desktop/mobile)

The chat UI showcases how these capabilities can be seamlessly integrated into a user-friendly interface, allowing users to interact with AI-powered tools in real-time.

## Authors

This repository is maintained by the [Vercel](https://vercel.com) team and community contributors. 

Contributions are welcome! Feel free to open issues or submit pull requests to enhance functionality or fix bugs.
