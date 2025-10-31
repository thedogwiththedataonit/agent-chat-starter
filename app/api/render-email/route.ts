import { NextRequest } from 'next/server';
import { render } from '@react-email/render';
import * as ReactEmailComponents from '@react-email/components';
import { transform } from '@babel/standalone';
import React from 'react';

export async function POST(req: NextRequest) {
  try {
    const { jsx } = await req.json();
    
    console.log('Received JSX length:', jsx?.length);
    
    if (!jsx) {
      return new Response(
        JSON.stringify({ error: 'No JSX provided' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Clean up the JSX - remove any markdown code fences if present
    let cleanJsx = jsx.trim();
    if (cleanJsx.startsWith('```')) {
      cleanJsx = cleanJsx.replace(/^```[a-z]*\n?/i, '');
      cleanJsx = cleanJsx.replace(/\n?```$/, '');
      cleanJsx = cleanJsx.trim();
    }

    console.log('Cleaned JSX (first 300 chars):', cleanJsx.substring(0, 300));

    // Wrap the JSX in a function component
    const wrappedJsx = `
      function EmailComponent() {
        return (
          ${cleanJsx}
        );
      }
    `;

    console.log('Wrapped JSX (first 300 chars):', wrappedJsx.substring(0, 300));

    // Transform JSX to JavaScript using Babel
    const transformed = transform(wrappedJsx, {
      presets: [['react', { runtime: 'classic' }]],
      filename: 'email.jsx',
    });

    if (!transformed.code) {
      throw new Error('Failed to transform JSX');
    }

    console.log('Transformed code (first 500 chars):', transformed.code.substring(0, 500));

    // Build the scope with React and all React Email components
    const componentMap = ReactEmailComponents;

    // Create an execution context with all the components available
    const executeCode = `
      (function() {
        const React = arguments[0];
        const { ${Object.keys(ReactEmailComponents).join(', ')} } = arguments[1];
        
        ${transformed.code}
        
        return EmailComponent;
      })
    `;

    console.log('Execute code (first 500 chars):', executeCode.substring(0, 500));

    try {
      // Execute the code to get the component function
      const getComponent = eval(executeCode);
      const EmailComponentFunc = getComponent(React, componentMap);
      
      if (!EmailComponentFunc || typeof EmailComponentFunc !== 'function') {
        throw new Error('Failed to create email component function');
      }
      
      console.log('Email component function created successfully');
      
      // Create an instance of the email component
      const emailElement = React.createElement(EmailComponentFunc);
      
      console.log('Email element created:', !!emailElement);
      
      // Render to HTML using React Email's render function
      const html = await render(emailElement, {
        pretty: true,
      });

      console.log('Successfully rendered HTML, length:', html.length);
      console.log('HTML preview (first 500 chars):', html.substring(0, 500));

      return new Response(
        JSON.stringify({ html }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    } catch (evalError) {
      console.error('Error executing transformed code:', evalError);
      console.error('Eval error details:', evalError instanceof Error ? evalError.message : String(evalError));
      console.error('Eval error stack:', evalError instanceof Error ? evalError.stack : 'No stack');
      throw new Error(`Failed to execute transformed JSX: ${evalError instanceof Error ? evalError.message : String(evalError)}`);
    }
  } catch (error) {
    console.error('Error rendering email:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    return new Response(
      JSON.stringify({ 
        error: 'Failed to render email', 
        details: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : undefined
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
