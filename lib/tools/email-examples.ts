// Helper function to format email examples for LLM prompts
// These are real-world production email patterns from top companies

export function formatEmailExamplesForPrompt(): string {
  return `
╔══════════════════════════════════════════════════════════════════════════════╗
║                   REAL-WORLD EMAIL EXAMPLES FROM TOP COMPANIES               ║
║              Study these patterns to create modern, professional emails       ║
╚══════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 1: STRIPE WELCOME EMAIL
Purpose: Onboarding confirmation for payment platform
Style: Clean, professional, minimal
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ backgroundColor: '#f6f9fc', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif' }}>
    <Preview>You're now ready to make live transactions with Stripe!</Preview>
    <Container style={{ backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px', marginBottom: '64px' }}>
      <Section style={{ padding: '0 48px' }}>
        <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/stripe-logo.png" width="49" height="21" alt="Stripe" />
        <Hr style={{ borderColor: '#e6ebf1', margin: '20px 0' }} />
        <Text style={{ color: '#525f7f', fontSize: '16px', lineHeight: '24px', textAlign: 'left' }}>
          Thanks for submitting your account information. You're now ready to make live transactions with Stripe!
        </Text>
        <Text style={{ color: '#525f7f', fontSize: '16px', lineHeight: '24px', textAlign: 'left' }}>
          You can view your payments and a variety of other information about your account right from your dashboard.
        </Text>
        <Button style={{ backgroundColor: '#656ee8', borderRadius: '5px', color: '#fff', fontSize: '16px', fontWeight: 'bold', textDecoration: 'none', textAlign: 'center', display: 'block', padding: '10px' }} href="https://dashboard.stripe.com/login">
          View your Stripe Dashboard
        </Button>
        <Hr style={{ borderColor: '#e6ebf1', margin: '20px 0' }} />
        <Text style={{ color: '#525f7f', fontSize: '16px', lineHeight: '24px', textAlign: 'left' }}>
          If you haven't finished your integration, you might find our <Link style={{ color: '#556cd6' }} href="https://docs.stripe.com/dashboard/basics">docs</Link> handy.
        </Text>
        <Text style={{ color: '#525f7f', fontSize: '16px', lineHeight: '24px', textAlign: 'left' }}>
          Once you're ready to start accepting payments, you'll just need to use your live <Link style={{ color: '#556cd6' }} href="https://dashboard.stripe.com/login?redirect=%2Fapikeys">API keys</Link> instead of your test API keys.
        </Text>
        <Text style={{ color: '#525f7f', fontSize: '16px', lineHeight: '24px', textAlign: 'left' }}>— The Stripe team</Text>
        <Hr style={{ borderColor: '#e6ebf1', margin: '20px 0' }} />
        <Text style={{ color: '#8898aa', fontSize: '12px', lineHeight: '16px' }}>
          Stripe, 354 Oyster Point Blvd, South San Francisco, CA 94080
        </Text>
      </Section>
    </Container>
  </Body>
</Html>

KEY PATTERNS: 
• Light blue background (#f6f9fc) with white container
• Text color: #525f7f (medium gray-blue)
• Button: #656ee8 (purple-blue)
• Multiple Hr dividers for clear sections
• Link color: #556cd6
• Footer in subtle gray (#8898aa)
• Clean, professional typography

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 2: LINEAR LOGIN CODE
Purpose: Authentication/verification email
Style: Minimal, focused, urgent
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ backgroundColor: '#ffffff', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' }}>
    <Preview>Your login code for Linear</Preview>
    <Container style={{ margin: '0 auto', padding: '20px 0 48px', maxWidth: '560px' }}>
      <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/linear-logo.png" width="42" height="42" alt="Linear" style={{ borderRadius: '21px' }} />
      <Heading style={{ fontSize: '24px', letterSpacing: '-0.5px', lineHeight: '1.3', fontWeight: '400', color: '#484848', padding: '17px 0 0' }}>
        Your login code for Linear
      </Heading>
      <Section style={{ padding: '27px 0 27px' }}>
        <Button style={{ backgroundColor: '#5e6ad2', borderRadius: '3px', fontWeight: '600', color: '#fff', fontSize: '15px', textDecoration: 'none', textAlign: 'center', display: 'block', padding: '11px 23px' }} href="https://linear.app">
          Login to Linear
        </Button>
      </Section>
      <Text style={{ margin: '0 0 15px', fontSize: '15px', lineHeight: '1.4', color: '#3c4149' }}>
        This link and code will only be valid for the next 5 minutes. If the link does not work, you can use the login verification code directly:
      </Text>
      <code style={{ fontFamily: 'monospace', fontWeight: '700', padding: '1px 4px', backgroundColor: '#dfe1e4', letterSpacing: '-0.3px', fontSize: '21px', borderRadius: '4px', color: '#3c4149' }}>
        tt226-5398x
      </code>
      <Hr style={{ borderColor: '#dfe1e4', margin: '42px 0 26px' }} />
      <Link href="https://linear.app" style={{ fontSize: '14px', color: '#b4becc' }}>
        Linear
      </Link>
    </Container>
  </Body>
</Html>

KEY PATTERNS:
• Pure white background
• Rounded logo (borderRadius: 21px)
• Prominent purple button (#5e6ad2)
• Large code display with monospace font
• Letter-spacing: -0.5px for modern heading
• Subtle footer link
• Time-sensitive urgency messaging

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 3: NOTION MAGIC LINK
Purpose: Passwordless authentication
Style: Ultra-minimal, simple
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ backgroundColor: '#ffffff' }}>
    <Preview>Log in with this magic link</Preview>
    <Container style={{ paddingLeft: '12px', paddingRight: '12px', margin: '0 auto' }}>
      <Heading style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '24px', fontWeight: 'bold', margin: '40px 0', padding: '0' }}>
        Login
      </Heading>
      <Link href="https://notion.so" target="_blank" style={{ color: '#2754C5', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', textDecoration: 'underline', display: 'block', marginBottom: '16px' }}>
        Click here to log in with this magic link
      </Link>
      <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', margin: '24px 0' }}>
        Or, copy and paste this temporary login code:
      </Text>
      <code style={{ display: 'inline-block', padding: '16px 4.5%', width: '90.5%', backgroundColor: '#f4f4f4', borderRadius: '5px', border: '1px solid #eee', color: '#333' }}>
        sparo-ndigo-amurt-secan
      </code>
      <Text style={{ color: '#ababab', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', marginTop: '14px', marginBottom: '16px' }}>
        If you didn't try to login, you can safely ignore this email.
      </Text>
      <Text style={{ color: '#ababab', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', marginTop: '12px', marginBottom: '38px' }}>
        Hint: You can set a permanent password in Settings & members → My account.
      </Text>
      <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/notion-logo.png" width="32" height="32" alt="Notion's Logo" />
      <Text style={{ color: '#898989', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '12px', lineHeight: '22px', marginTop: '12px', marginBottom: '24px' }}>
        <Link href="https://notion.so" target="_blank" style={{ color: '#898989', textDecoration: 'underline' }}>
          Notion.so
        </Link>
        , the all-in-one-workspace for your notes, tasks, wikis, and databases.
      </Text>
    </Container>
  </Body>
</Html>

KEY PATTERNS:
• Pure white background (no container background color)
• Simple one-column layout
• Large code block with light gray background (#f4f4f4)
• Subtle hint text in light gray (#ababab)
• Minimal branding at bottom
• Clear security messaging

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 4: VERCEL TEAM INVITE (WITH TAILWIND)
Purpose: Team collaboration invitation
Style: Modern, visual, Tailwind-based
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Tailwind config={{ presets: [pixelBasedPreset] }}>
    <Body className="mx-auto my-auto bg-white px-2 font-sans">
      <Preview>Join Acme Corp on Vercel</Preview>
      <Container className="mx-auto my-[40px] max-w-[465px] rounded border border-[#eaeaea] border-solid p-[20px]">
        <Section className="mt-[32px]">
          <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/vercel-logo.png" width="40" height="37" alt="Vercel" className="mx-auto my-0" />
        </Section>
        <Heading className="mx-0 my-[30px] p-0 text-center font-normal text-[24px] text-black">
          Join <strong>Acme Corp</strong> on <strong>Vercel</strong>
        </Heading>
        <Text className="text-[14px] text-black leading-[24px]">
          Hello alanturing,
        </Text>
        <Text className="text-[14px] text-black leading-[24px]">
          <strong>Alan Turing</strong> (
          <Link href="mailto:alan.turing@example.com" className="text-blue-600 no-underline">
            alan.turing@example.com
          </Link>
          ) has invited you to the <strong>Acme Corp</strong> team on <strong>Vercel</strong>.
        </Text>
        <Section>
          <Row>
            <Column align="right">
              <Img className="rounded-full" src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/vercel-user.png" width="64" height="64" alt="User avatar" />
            </Column>
            <Column align="center">
              <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/vercel-arrow.png" width="12" height="9" alt="invited you to" />
            </Column>
            <Column align="left">
              <Img className="rounded-full" src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/vercel-team.png" width="64" height="64" alt="Team logo" />
            </Column>
          </Row>
        </Section>
        <Section className="mt-[32px] mb-[32px] text-center">
          <Button className="rounded bg-[#000000] px-5 py-3 text-center font-semibold text-[12px] text-white no-underline" href="https://vercel.com/teams/invite/foo">
            Join the team
          </Button>
        </Section>
        <Text className="text-[14px] text-black leading-[24px]">
          or copy and paste this URL into your browser:{' '}
          <Link href="https://vercel.com/teams/invite/foo" className="text-blue-600 no-underline">
            https://vercel.com/teams/invite/foo
          </Link>
        </Text>
        <Hr className="mx-0 my-[26px] w-full border border-[#eaeaea] border-solid" />
        <Text className="text-[#666666] text-[12px] leading-[24px]">
          This invitation was intended for <span className="text-black">alanturing</span>. This invite was sent from <span className="text-black">204.13.186.218</span> located in <span className="text-black">São Paulo, Brazil</span>. If you were not expecting this invitation, you can ignore this email.
        </Text>
      </Container>
    </Body>
  </Tailwind>
</Html>

KEY PATTERNS:
• Uses <Tailwind> component with pixelBasedPreset
• Visual flow: user avatar → arrow → team logo (3-column Row)
• Rounded images (rounded-full class)
• Black button for high contrast
• Subtle border (#eaeaea)
• Security info with location details
• Alternative URL provided

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 5: AWS VERIFICATION EMAIL
Purpose: Email verification for account creation
Style: Structured, secure, corporate
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ backgroundColor: '#fff', color: '#212121' }}>
    <Preview>AWS Email Verification</Preview>
    <Container style={{ padding: '20px', margin: '0 auto', backgroundColor: '#eee' }}>
      <Section style={{ backgroundColor: '#fff' }}>
        <Section style={{ backgroundColor: '#252f3d', display: 'flex', padding: '20px 0', alignItems: 'center', justifyContent: 'center' }}>
          <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/aws-logo.png" width="75" height="45" alt="AWS" />
        </Section>
        <Section style={{ padding: '25px 35px' }}>
          <Heading style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '20px', fontWeight: 'bold', marginBottom: '15px' }}>
            Verify your email address
          </Heading>
          <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', margin: '24px 0' }}>
            Thanks for starting the new AWS account creation process. We want to make sure it's really you. Please enter the following verification code when prompted. If you don't want to create an account, you can ignore this message.
          </Text>
          <Section style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', margin: '0', fontWeight: 'bold', textAlign: 'center' }}>
              Verification code
            </Text>
            <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '36px', fontWeight: 'bold', margin: '10px 0', textAlign: 'center' }}>
              596853
            </Text>
            <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', margin: '0px', textAlign: 'center' }}>
              (This code is valid for 10 minutes)
            </Text>
          </Section>
        </Section>
        <Hr />
        <Section style={{ padding: '25px 35px' }}>
          <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', margin: '0px' }}>
            Amazon Web Services will never email you and ask you to disclose or verify your password, credit card, or banking account number.
          </Text>
        </Section>
      </Section>
      <Text style={{ color: '#333', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '12px', margin: '24px 0', padding: '0 20px' }}>
        This message was produced and distributed by Amazon Web Services, Inc., 410 Terry Ave. North, Seattle, WA 98109. © 2022, Amazon Web Services, Inc.. All rights reserved. View our <Link href="https://amazon.com" target="_blank" style={{ color: '#2754C5', fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif", fontSize: '14px', textDecoration: 'underline' }}>privacy policy</Link>.
      </Text>
    </Container>
  </Body>
</Html>

KEY PATTERNS:
• Dark header section (#252f3d) with logo
• Gray outer container (#eee) with white inner section
• Huge verification code (36px font size)
• Centered verification section with flex display
• Security warning in separate section
• Full legal footer with links
• Time limit clearly stated

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 6: NETLIFY WELCOME (TAILWIND + LISTS)
Purpose: Welcome email with onboarding steps
Style: Colorful, modern, step-by-step
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Tailwind config={{ presets: [pixelBasedPreset], theme: { extend: { colors: { brand: '#2250f4', offwhite: '#fafbfb' }, spacing: { 0: '0px', 20: '20px', 45: '45px' } } } }}>
    <Preview>Netlify Welcome</Preview>
    <Body className="bg-offwhite font-sans text-base">
      <Img src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/netlify-logo.png" width="184" height="75" alt="Netlify" className="mx-auto my-20" />
      <Container className="bg-white p-45">
        <Heading className="my-0 text-center leading-8">
          Welcome to Netlify
        </Heading>
        <Section>
          <Row>
            <Text className="text-base">
              Congratulations! You're joining over 3 million developers around the world who use Netlify to build and ship sites, stores, and apps.
            </Text>
            <Text className="text-base">Here's how to get started:</Text>
          </Row>
        </Section>
        <ul>
          <li className="mb-20">
            <strong>Deploy your first project.</strong> <Link>Connect to Git, choose a template</Link>, or manually deploy a project you've been working on locally.
          </li>
          <li className="mb-20">
            <strong>Check your deploy logs.</strong> Find out what's included in your build and watch for errors or failed deploys. <Link>Learn how to read your deploy logs</Link>.
          </li>
          <li className="mb-20">
            <strong>Choose an integration.</strong> Quickly discover, connect, and configure the right tools for your project with 150+ integrations to choose from. <Link>Explore the Integrations Hub</Link>.
          </li>
          <li className="mb-20">
            <strong>Set up a custom domain.</strong> You can register a new domain and buy it through Netlify or assign a domain you already own to your site. <Link>Add a custom domain</Link>.
          </li>
        </ul>
        <Section className="text-center">
          <Button className="rounded-lg bg-brand px-[18px] py-3 text-white">
            Go to your dashboard
          </Button>
        </Section>
        <Section className="mt-45">
          <Row>
            <Column>
              <Link className="font-bold text-black underline" href="https://www.netlify.com">
                Visit the forums
              </Link>{' '}
              <span className="text-green-500">→</span>
            </Column>
            <Column>
              <Link className="font-bold text-black underline" href="https://www.netlify.com">
                Read the docs
              </Link>{' '}
              <span className="text-green-500">→</span>
            </Column>
            <Column>
              <Link className="font-bold text-black underline" href="https://www.netlify.com">
                Contact an expert
              </Link>{' '}
              <span className="text-green-500">→</span>
            </Column>
          </Row>
        </Section>
      </Container>
      <Container className="mt-20">
        <Section>
          <Row>
            <Column className="px-20 text-right">
              <Link>Unsubscribe</Link>
            </Column>
            <Column className="text-left">
              <Link>Manage Preferences</Link>
            </Column>
          </Row>
        </Section>
        <Text className="mb-45 text-center text-gray-400">
          Netlify, 44 Montgomery Street, Suite 300 San Francisco, CA
        </Text>
      </Container>
    </Body>
  </Tailwind>
</Html>

KEY PATTERNS:
• <Tailwind> component with custom theme config
• Custom brand colors defined in config
• Uses HTML <ul> and <li> for steps
• Green arrow emoji (→) as visual indicator
• Multi-column links at bottom
• Unsubscribe/preferences in footer
• Rounded logo with margin spacing

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 7: STACK OVERFLOW NEWSLETTER
Purpose: Educational newsletter with tips
Style: Branded header, content-rich
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif', backgroundColor: '#f3f3f5' }}>
    <Preview>Stack overflow tips for searching</Preview>
    <Container style={{ width: '680px', maxWidth: '100%', margin: '0 auto', backgroundColor: '#ffffff' }}>
      <Section style={{ display: 'flex', background: '#f3f3f5', padding: '20px 30px' }}>
        <Img width={146} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/stack-overflow-logo.png" alt="Stack Overflow" />
      </Section>
      <Section style={{ borderRadius: '5px 5px 0 0', display: 'flex', backgroundColor: '#2b2d6e' }}>
        <Row>
          <Column style={{ padding: '20px 30px 15px' }}>
            <Heading style={{ color: '#fff', fontSize: '27px', fontWeight: 'bold', lineHeight: '27px' }}>
              Find what you want, faster
            </Heading>
            <Text style={{ color: '#fff', fontSize: '17px' }}>
              Tips and tricks for searching on Stack Overflow
            </Text>
          </Column>
          <Column style={{ padding: '30px 10px' }}>
            <Img style={{ maxWidth: '100%' }} width={340} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/stack-overflow-header.png" alt="Header" />
          </Column>
        </Row>
      </Section>
      <Section style={{ padding: '30px 30px 40px 30px' }}>
        <Heading as="h2" style={{ margin: '0 0 15px', fontWeight: 'bold', fontSize: '21px', lineHeight: '21px', color: '#0c0d0e' }}>
          Searching for solutions
        </Heading>
        <Text style={{ fontSize: '15px', lineHeight: '21px', color: '#3c3f44' }}>
          With more than 18 million questions, it's possible that someone has already provided a solution to the problem you're facing.
        </Text>
        <Hr style={{ margin: '30px 0' }} />
        <Heading as="h2" style={{ margin: '0 0 15px', fontWeight: 'bold', fontSize: '21px', lineHeight: '21px', color: '#0c0d0e' }}>
          Use the search bar at the top of the page to find what you need
        </Heading>
        <Text style={{ fontSize: '15px', lineHeight: '21px', color: '#3c3f44' }}>
          Here are a few simple search tips to get you started:
        </Text>
        <ul>
          <li>
            <Text style={{ fontSize: '15px', lineHeight: '21px', color: '#3c3f44' }}>
              To find a specific phrase, enter it in quotes: "local storage"
            </Text>
          </li>
          <li>
            <Text style={{ fontSize: '15px', lineHeight: '21px', color: '#3c3f44' }}>
              To search within specific tag(s), enter them in square brackets: [javascript]
            </Text>
          </li>
          <li>
            <Text style={{ fontSize: '15px', lineHeight: '21px', color: '#3c3f44' }}>
              Combine them to get even more precise results
            </Text>
          </li>
        </ul>
        <Hr style={{ margin: '30px 0' }} />
        <Heading as="h2" style={{ margin: '0 0 15px', fontWeight: 'bold', fontSize: '21px', lineHeight: '21px', color: '#0c0d0e' }}>
          Take a break and read about the worst coder in the world
        </Heading>
        <Section style={{ marginTop: '24px', display: 'block' }}>
          <Link style={{ backgroundColor: '#0095ff', border: '1px solid #0077cc', fontSize: '17px', lineHeight: '17px', padding: '13px 17px', borderRadius: '4px', maxWidth: '120px', color: '#fff' }} href="https://stackoverflow.blog/2019/10/22/">
            I need a break
          </Link>
        </Section>
      </Section>
    </Container>
    <Section style={{ width: '680px', maxWidth: '100%', margin: '32px auto 0 auto', padding: '0 30px' }}>
      <Text style={{ fontSize: '12px', lineHeight: '15px', color: '#9199a1', margin: '0' }}>
        You're receiving this email because your Stack Overflow activity triggered this tip or reminder.
      </Text>
      <Link href="/" style={{ display: 'inline-block', color: '#9199a1', textDecoration: 'underline', fontSize: '12px', marginRight: '10px', marginTop: '8px' }}>
        Unsubscribe from emails like this
      </Link>
      <Link href="/" style={{ display: 'inline-block', color: '#9199a1', textDecoration: 'underline', fontSize: '12px', marginRight: '10px', marginTop: '8px' }}>
        Edit email settings
      </Link>
      <Link href="/" style={{ display: 'inline-block', color: '#9199a1', textDecoration: 'underline', fontSize: '12px', marginRight: '10px', marginTop: '8px' }}>
        Contact us
      </Link>
      <Link href="/" style={{ display: 'inline-block', color: '#9199a1', textDecoration: 'underline', fontSize: '12px', marginRight: '10px', marginTop: '8px' }}>
        Privacy
      </Link>
      <Hr style={{ margin: '30px 0', borderColor: '#d6d8db' }} />
      <Img width={111} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/stack-overflow-logo-sm.png" alt="Stack Overflow" />
      <Text style={{ margin: '4px 0', fontSize: '12px', lineHeight: '15px', color: '#9199a1' }}>
        <strong>Stack Overflow</strong>, 110 William Street, 28th Floor, New York, NY 10038
      </Text>
      <Text style={{ borderRadius: '1px', border: '1px solid #d6d9dc', padding: '4px 6px 3px 6px', fontSize: '11px', lineHeight: '11px', fontFamily: 'Consolas,monospace', color: '#e06c77', maxWidth: 'min-content', margin: '0 0 32px 0' }}>
        {'<3'}
      </Text>
    </Section>
  </Body>
</Html>

KEY PATTERNS:
• Wide container (680px)
• Dark branded header (#2b2d6e) with two-column layout
• List format with bullet points
• Multiple Hr dividers for content sections
• Blue CTA button (#0095ff)
• Comprehensive footer with multiple links
• Playful heart element at end
• Gray background (#f3f3f5)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 8: GOOGLE PLAY POLICY UPDATE
Purpose: Policy announcement/developer update
Style: Corporate, official, informative
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ backgroundColor: '#dbddde', fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif' }}>
    <Preview>Google Play developers</Preview>
    <Container style={{ margin: '30px auto', backgroundColor: '#fff', borderRadius: 5, overflow: 'hidden' }}>
      <Section>
        <Row>
          <Column>
            <Img style={{ marginTop: '-1px' }} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/google-play-header.png" width="305" height="28" alt="Google Play header" />
            <Img style={{ padding: '0 40px' }} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/google-play-logo.png" width="155" height="31" alt="Google Play" />
          </Column>
        </Row>
      </Section>
      <Section style={{ padding: '0 40px' }}>
        <Hr style={{ borderColor: '#e8eaed', margin: '20px 0' }} />
        <Text style={{ fontSize: '14px', lineHeight: '26px', fontWeight: '700', color: '#004dcf' }}>
          DEVELOPER UPDATE
        </Text>
        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>
          Hello Google Play Developer,
        </Text>
        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>
          We strive to make Google Play a safe and trusted experience for users.
        </Text>
        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>
          We've added clarifications to our <Link href="https://play.google.com/console" style={{ fontSize: '14px', lineHeight: '22px', color: '#004dcf' }}>Target API Level policy</Link>. Because this is a clarification, our enforcement standards and practices for this policy remain the same.
        </Text>
      </Section>
      <Section style={{ paddingLeft: 40 }}>
        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>
          We're noting exceptions to the <Link href="https://play.google.com/console" style={{ fontSize: '14px', lineHeight: '22px', color: '#004dcf' }}>Target API Level policy</Link>, which can be found in our updated <Link href="https://play.google.com/console" style={{ fontSize: '14px', lineHeight: '22px', color: '#004dcf' }}>Help Center article</Link>. These exceptions include permanently private apps and apps that target automotive or wearables form factors.
        </Text>
      </Section>
      <Section style={{ padding: '0 40px' }}>
        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>
          We're also extending the deadline to give you more time to adjust to these changes. Now, apps that target API level 29 or below will start experiencing reduced distribution starting <b>Jan 31, 2023</b> instead of Nov 1, 2022.
        </Text>
        <Hr style={{ borderColor: '#e8eaed', margin: '20px 0' }} />
      </Section>
      <Section style={{ padding: '0 40px' }}>
        <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>Thank you,</Text>
        <Text style={{ fontSize: '20px', lineHeight: '22px', color: '#3c4043' }}>
          The Google Play team
        </Text>
      </Section>
      <Section style={{ backgroundColor: '#f0fcff', width: '90%', borderRadius: '5px', overflow: 'hidden', paddingLeft: '20px' }}>
        <Row>
          <Text style={{ fontSize: '14px', lineHeight: '22px', color: '#3c4043' }}>Connect with us</Text>
        </Row>
        <Row align="left" style={{ width: '84px', float: 'left' }}>
          <Column style={{ paddingRight: '4px' }}>
            <Link href="https://play.google.com">
              <Img width="28" height="28" src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/google-play-chat.png" alt="Chat" />
            </Link>
          </Column>
          <Column style={{ paddingRight: '4px' }}>
            <Link href="https://play.google.com">
              <Img width="28" height="28" src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/google-play-icon.png" alt="Icon" />
            </Link>
          </Column>
          <Column style={{ paddingRight: '4px' }}>
            <Link href="https://play.google.com">
              <Img width="28" height="28" src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/google-play-academy.png" alt="Academy" />
            </Link>
          </Column>
        </Row>
        <Row>
          <Img style={{ maxWidth: '100%' }} width="540" height="48" src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/google-play-footer.png" alt="Footer" />
        </Row>
      </Section>
      <Section style={{ padding: '0 40px', paddingBottom: 30 }}>
        <Text style={{ fontSize: '12px', textAlign: 'center', margin: 0, color: '#3c4043' }}>
          © 2022 Google LLC 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA
        </Text>
        <Text style={{ fontSize: '12px', textAlign: 'center', margin: 0, color: '#3c4043' }}>
          You have received this mandatory email service announcement to update you about important changes to your Google Play Developer account.
        </Text>
      </Section>
    </Container>
  </Body>
</Html>

KEY PATTERNS:
• Branded colored header section (#2b2d6e)
• Two-column header layout (text + image)
• Social icons in light blue section
• Full-width footer image
• Gray background with white container
• Bold headings for sections
• Blue link color (#004dcf)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 EXAMPLE 9: CODEPEN NEWSLETTER/CHALLENGE
Purpose: Creative newsletter with ideas and resources
Style: Colorful, playful, engaging
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

<Html>
  <Head />
  <Body style={{ fontFamily: '"Google Sans",Roboto,RobotoDraft,Helvetica,Arial,sans-serif', backgroundColor: '#505050', margin: '0' }}>
    <Preview>#CodePenChallenge: Cubes</Preview>
    <Section style={{ width: '100%', backgroundColor: '#191919', margin: '0 auto', paddingBottom: '30px' }}>
      <Img style={{ margin: 'auto', maxWidth: '100%' }} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/codepen-challengers.png" width={600} alt="CodePen Challengers" />
    </Section>
    <Container style={{ margin: '0 auto', width: '648px', maxWidth: '100%', position: 'relative' }}>
      <Text style={{ backgroundColor: '#505050', textAlign: 'center', padding: '10px 0', fontSize: '13px', position: 'absolute', width: '648px', maxWidth: '100%', top: '-28px', margin: '0 0 16px 0' }}>
        <Link style={{ color: '#fff', cursor: 'pointer' }}>View this Challenge on CodePen</Link>
      </Text>
      <Heading style={{ background: '#f0d361', padding: '30px', color: '#191919', fontWeight: '400', marginBottom: '0' }}>
        <strong>This week:</strong> #CodePenChallenge: <Text style={{ fontSize: '32px', margin: '4px 0 0 0' }}>Cubes</Text>
      </Heading>
      <Section style={{ margin: '0', background: '#fff', padding: '0 24px' }}>
        <Text style={{ fontSize: '16px' }}>The Shape challenge continues!</Text>
        <Text style={{ fontSize: '16px' }}>
          Last week, we kicked things off with round shapes. This week, we move on to cubes 🧊
        </Text>
        <Text style={{ fontSize: '16px' }}>
          Creating cubes in the browser is all about mastery of illusion. Take control of perspective and shadows and you can make the magic of 3D on a flat screen 🧙
        </Text>
        <Text style={{ fontSize: '16px', border: '6px solid #ebd473', padding: '20px', margin: '0 0 40px 0' }}>
          💪 <strong>Your Challenge:</strong> <Link style={{ color: '#15c', cursor: 'pointer' }}>create a Pen that includes cube shapes.</Link>
        </Text>
        <Img style={{ maxWidth: '100%' }} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/codepen-cube.png" width={600} alt="Cube" />
        <Section style={{ marginTop: '40px', marginBottom: '24px', textAlign: 'center', background: '#0b112a', color: '#fff', padding: '35px 20px 30px 20px', border: '6px solid #2138c6' }}>
          <Img style={{ margin: '0 auto 30px auto' }} src="https://react-email-demo-48zvx3r0v-resend.vercel.app/static/codepen-pro.png" width={250} alt="CodePen PRO" />
          <Text>CodePen PRO combines a bunch of features that can help any front-end designer or developer at any experience level.</Text>
          <Button style={{ background: '#2138c6', color: '#fff', border: '0', fontSize: '15px', lineHeight: '18px', cursor: 'pointer', borderRadius: '4px', padding: '12px' }}>
            <strong>Learn More</strong>
          </Button>
        </Section>
      </Section>
      <Text style={{ background: '#f5d247', padding: '30px', fontSize: '18px', lineHeight: '1.5' }}>
        <strong>To participate:</strong> <Link style={{ color: '#15c', cursor: 'pointer' }}>Create a Pen →</Link> and tag it <strong>codepenchallenge</strong> and <strong>cpc-cubes</strong>.
      </Text>
      <Section style={{ margin: '0', background: '#fff', padding: '0 24px' }}>
        <Row>
          <Column style={{ width: '50%', paddingRight: '10px' }}>
            <Text style={{ fontWeight: '900', lineHeight: '1.1', fontSize: '18px' }}>IDEAS!</Text>
            <Section style={{ padding: '20px', margin: '0 0 20px 0', borderRadius: '10px', fontSize: '36px', textAlign: 'center', background: '#fff4c8', border: '1px solid #f4d247' }}>
              🌟
              <Text style={{ fontSize: '13px', textAlign: 'left' }}>
                This week we move from 2 dimensions to three! Maybe you could exercise your perspective in CSS to create a 3D cube.
              </Text>
            </Section>
          </Column>
          <Column style={{ width: '50%', paddingLeft: '10px' }}>
            <Text style={{ fontWeight: '900', lineHeight: '1.1', marginTop: '-40px', fontSize: '18px' }}>RESOURCES!</Text>
            <Section style={{ padding: '20px', margin: '0 0 20px 0', borderRadius: '10px', fontSize: '36px', textAlign: 'center', background: '#d9f6ff', border: '1px solid #92bfd0' }}>
              📖
              <Text style={{ fontSize: '13px', textAlign: 'left' }}>
                Learn all about <Link style={{ color: '#15c', cursor: 'pointer' }}>How CSS Perspective Works</Link> and how to build a 3D CSS cube from scratch.
              </Text>
            </Section>
          </Column>
        </Row>
      </Section>
      <Section style={{ margin: '40px 0 120px 0', textAlign: 'center' }}>
        <Button style={{ fontSize: '26px', color: '#15c', background: '#222', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', padding: '15px 30px' }}>
          Go to Challenge Page
        </Button>
      </Section>
      <Section style={{ background: '#fff', color: '#505050', padding: '0 24px', marginBottom: '48px' }}>
        <Text style={{ fontSize: '13px' }}>
          You can adjust your <Link style={{ textDecoration: 'underline', color: '#505050', cursor: 'pointer' }}>email preferences</Link> any time.
        </Text>
      </Section>
    </Container>
  </Body>
</Html>

KEY PATTERNS:
• Dark background (#505050) with white container
• Yellow accent header (#f0d361)
• Two-column layout for ideas/resources
• Colored cards (yellow #fff4c8, blue #d9f6ff)
• Emoji usage for visual interest (🌟📖)
• Dark promotional section (#0b112a)
• Large footer CTA button
• Playful, engaging tone

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💡 MODERN EMAIL DESIGN PRINCIPLES (Learned from Above Examples)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

1. COLOR PALETTES:
   • Corporate/Professional: #f6f9fc bg, #525f7f text, #656ee8 buttons
   • Minimal/Clean: #ffffff bg, #333/#484848 text, #5e6ad2 buttons
   • Playful/Creative: #505050 bg, #f0d361 accents, #15c links
   • Security/Trust: #eee outer, #fff inner, #252f3d headers
   
2. TYPOGRAPHY HIERARCHY:
   • Headings: 20-27px, bold or normal (400) weight
   • Body text: 14-16px, line-height: 21-24px
   • Code/Verification: 21-36px, monospace or bold
   • Footer: 12-13px, subtle colors
   • Letter-spacing: -0.5px for modern headings

3. LAYOUT STRUCTURES:
   A. Single Column (most common):
      - Container maxWidth: 465px-680px
      - Padding: 20px-48px
      - Centered with margin: 0 auto
      
   B. Two Column (for invites, newsletters):
      - Use <Row> and <Column>
      - Equal or custom width percentages
      - Padding between columns
      
   C. Header + Content + Footer:
      - Branded header section
      - White content container
      - Subtle footer outside container

4. COMPONENT USAGE PATTERNS:
   • <Preview> - Always include for inbox preview
   • <Container> - Wrap main content, set maxWidth
   • <Section> - Group related content
   • <Hr> - Separate major sections
   • <Button> - Primary CTAs (display: block or inline-block)
   • <Link> - Secondary actions and navigation
   • <code> - Verification codes, technical content

5. BUTTON STYLES (Copy These):
   • Stripe: { backgroundColor: '#656ee8', borderRadius: '5px', padding: '10px', display: 'block' }
   • Linear: { backgroundColor: '#5e6ad2', borderRadius: '3px', padding: '11px 23px', fontWeight: '600' }
   • Vercel: { backgroundColor: '#000000', borderRadius: '4px', padding: '12px 20px' }
   • Stack Overflow: { backgroundColor: '#0095ff', border: '1px solid #0077cc', borderRadius: '4px' }

6. CODE/VERIFICATION DISPLAY:
   • Large font size: 21px-36px
   • Background: #f4f4f4, #dfe1e4
   • Monospace font family
   • Border radius: 4-5px
   • Centered with textAlign: center
   • Optional border: 1px solid #eee

7. FOOTER PATTERNS:
   • Company address in small text (12px)
   • Multiple links (Unsubscribe, Preferences, Privacy)
   • Color: #898989, #8898aa, #9199a1
   • Outside main container or in separate section
   • Optional small logo

8. SPACING RHYTHM:
   • Between paragraphs: 15px-24px margin
   • Between sections: 30px-40px
   • Hr margins: 20px-42px
   • Container padding: 20px-48px
   • Section padding: 25px-35px

9. IMAGE BEST PRACTICES:
   • Always specify width and height
   • Include descriptive alt text
   • Use full URLs (https://...)
   • Rounded logos: borderRadius: 21px or rounded-full
   • Responsive: maxWidth: 100%

10. TAILWIND USAGE (Optional):
    • Wrap in <Tailwind config={{ presets: [pixelBasedPreset] }}>
    • Use className instead of style prop
    • Can define custom colors in theme config
    • Cleaner syntax for complex layouts

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎯 APPLY THESE LEARNINGS TO CREATE MODERN, PRODUCTION-QUALITY EMAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

When creating emails, follow these patterns:
✓ Use appropriate color schemes from examples above
✓ Maintain proper spacing rhythm and hierarchy
✓ Include Preview text for better inbox appearance
✓ Use semantic structure (Container > Section > content)
✓ Style buttons to be prominent and clickable
✓ Add Hr dividers between major sections
✓ Include security/context info in footers
✓ Keep text readable with proper contrast
✓ Use web-safe fonts and inline styles
✓ Test-friendly: max-width 465-680px, no flexbox/grid
`;
}
