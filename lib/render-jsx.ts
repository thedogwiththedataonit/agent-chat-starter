import { render } from '@react-email/render';
import * as ReactEmailComponents from '@react-email/components';
import { transform } from '@babel/standalone';
import React from 'react';

/**
 * Transforms React Email JSX string into a renderable component
 * and renders it to HTML
 */
export async function renderJsxToHtml(jsx: string, options?: { pretty?: boolean }): Promise<string> {
  console.log('[renderJsxToHtml] Received JSX length:', jsx?.length);
  
  if (!jsx) {
    throw new Error('No JSX provided');
  }

  // Clean up the JSX - remove any markdown code fences if present
  let cleanJsx = jsx.trim();
  if (cleanJsx.startsWith('```')) {
    cleanJsx = cleanJsx.replace(/^```[a-z]*\n?/i, '');
    cleanJsx = cleanJsx.replace(/\n?```$/, '');
    cleanJsx = cleanJsx.trim();
  }

  console.log('[renderJsxToHtml] Cleaned JSX (first 300 chars):', cleanJsx.substring(0, 300));

  // Wrap the JSX in a function component
  const wrappedJsx = `
    function EmailComponent() {
      return (
        ${cleanJsx}
      );
    }
  `;

  console.log('[renderJsxToHtml] Wrapped JSX (first 300 chars):', wrappedJsx.substring(0, 300));

  // Transform JSX to JavaScript using Babel
  const transformed = transform(wrappedJsx, {
    presets: [['react', { runtime: 'classic' }]],
    filename: 'email.jsx',
  });

  if (!transformed.code) {
    throw new Error('Failed to transform JSX');
  }

  console.log('[renderJsxToHtml] Transformed code (first 500 chars):', transformed.code.substring(0, 500));

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

  console.log('[renderJsxToHtml] Execute code (first 500 chars):', executeCode.substring(0, 500));

  try {
    // Execute the code to get the component function
    const getComponent = eval(executeCode);
    const EmailComponentFunc = getComponent(React, componentMap);
    
    if (!EmailComponentFunc || typeof EmailComponentFunc !== 'function') {
      throw new Error('Failed to create email component function');
    }
    
    console.log('[renderJsxToHtml] Email component function created successfully');
    
    // Create an instance of the email component
    const emailElement = React.createElement(EmailComponentFunc);
    
    console.log('[renderJsxToHtml] Email element created:', !!emailElement);
    
    // Render to HTML using React Email's render function
    const html = await render(emailElement, {
      pretty: options?.pretty ?? false, // Use false for production emails (smaller size), true for preview
    });

    console.log('[renderJsxToHtml] Successfully rendered HTML, length:', html.length);

    return html;
  } catch (evalError) {
    console.error('[renderJsxToHtml] Error executing transformed code:', evalError);
    console.error('[renderJsxToHtml] Eval error details:', evalError instanceof Error ? evalError.message : String(evalError));
    console.error('[renderJsxToHtml] Eval error stack:', evalError instanceof Error ? evalError.stack : 'No stack');
    throw new Error(`Failed to execute transformed JSX: ${evalError instanceof Error ? evalError.message : String(evalError)}`);
  }
}

