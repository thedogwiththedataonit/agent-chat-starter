A powerful Next.js chatbot starter that leverages the new Vercel AI Gateway for provider-agnostic AI agent applications. This app serves as a comprehensive foundation for building agent chat applications that can seamlessly switch between any AI provider without code changes.

## AI Gateway Integration

This application demonstrates cutting-edge use of the [Vercel AI Gateway](https://vercel.com/docs/functions/ai-gateway) - a unified proxy layer that enables:

- **Provider Agnosticism**: Switch between OpenAI, Anthropic, Google, Cohere, or any AI provider without code changes
- **Advanced Routing**: Intelligent load balancing, fallback logic, and region-aware routing
- **Real-time Monitoring**: Built-in analytics, cost tracking, and performance metrics
- **Enterprise Security**: Secure credential management without exposing API keys in client code
- **Caching & Optimization**: Automatic response caching and request optimization

## Powerful Agent Chat Starter

This starter template provides everything needed for production-ready agent chat applications:

- **Universal Provider Support**: One codebase, unlimited AI providers
- **Tool Calling Framework**: Built-in function calling for external API integration
- **Streaming Responses**: Real-time AI responses with type safety
- **Session Management**: Persistent chat history and user context
- **Production Ready**: Built-in security, monitoring, and scalability
- **Zero-config Deployment**: Deploy to Vercel with a single click

## Getting Started

### Super Easy to Start

Get your AI chatbot running in **under 2 minutes** with zero configuration:

1. **One-Click Deploy** - Click the button below to instantly deploy to Vercel
2. **Zero Setup** - No API keys or configuration needed - AI Gateway handles everything
3. **Start Chatting** - Your chatbot is live with provider-agnostic AI support

### One-time setup

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fai-sdk-gateway-demo)

1. Clone this repository with the Deploy button above
1. Install the [Vercel CLI](https://vercel.com/docs/cli) if you don't already have it
1. Clone the repository you created above: `git clone <repo-url>`
1. Link it to a Vercel project: `vc link` or `vc deploy`

### Usage
1. Install packages with `pnpm i` (or `npm i` or `yarn i`) and run the development server with `vc dev`
1. Open http://localhost:3000 to try the chatbot

### FAQ

1. If you prefer running your local development server directly rather than using `vc dev`, you'll need to run `vc env pull` to fetch the project's OIDC authentication token locally
   1. the token expires every 12h, so you'll need to re-run this command periodically.
   1. if you use `vc dev` it will auto-refresh the token for you, so you don't need to fetch it manually
1. If you're linking to an existing, older project, you may need to enable the OIDC token feature in your project settings.
   1. visit the project settings page (rightmost tab in your project's dashboard)
   1. search for 'OIDC' in settings
   1. toggle the button under "Secure Backend Access with OIDC Federation" to Enabled and click the "Save" button

## Chat SDK and Tool Calling

This application demonstrates the integration of the Vercel AI SDK to enable advanced chat functionalities, including tool calling within a chat UI. Tool calling allows the chatbot to interact with external APIs or custom functions based on user input, enhancing the conversational experience by providing dynamic and context-aware responses. The chat UI showcases how these capabilities can be seamlessly integrated into a user-friendly interface, allowing users to interact with AI-powered tools in real-time.

## Authors

This repository is maintained by the [Vercel](https://vercel.com) team and community contributors. 

Contributions are welcome! Feel free to open issues or submit pull requests to enhance functionality or fix bugs.
