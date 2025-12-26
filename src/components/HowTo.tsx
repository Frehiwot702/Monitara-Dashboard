// import React from 'react'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


const HowTo = () => {

  const codeSnippet = `export const logTest = async (type: string, data: any, code: any) => {
    try {
      await fetch('https://monitara-server.onrender.com/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 
                    'x-api-key': process.env.NEXT_PUBLIC_LOG_API_KEY!},
        body: JSON.stringify({
          type,
          data,
          code,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href,
        }),
      });
    } catch (error) {
      console.error('Failed to send log to server:', error);
    }
  };`

  const projectCode  = `const PROJECT_CODE = 'PAYMENT_APP_001';
`
  const successlog = `logTest('success', { message: 'Payment completed' }, PROJECT_CODE);`
  const errorlog = `logTest('error', { message: 'Payment failed' }, PROJECT_CODE);`
  const normallog = `logTest('info', { step: 'Checkout started' }, PROJECT_CODE);
`;


  return (
    <div className='absolute z-50 inset-0 w-2/3 h-fit m-auto bg-[#323232] text-white rounded-lg'>
      <div className='rounded-md p-10 shadow-lg space-y-2 text-sm text-white/70 max-h-screen overflow-y-scroll space-y-5'>
        <h3 className='text-2xl text-[#F2B5C4] md:text-4xl font-bold font-bartle'>How Monitara works (Developer Guide) </h3>
        {/* <p>Monitara is a simple log monitoring tool that allows you to track logs from your applications in real-time. Here's how it works:</p> */}
        {/* <ol>
            <li>1. Connect Monitara to your application's log output</li>
            <li>2. Monitara will automatically parse and display the logs in real-time</li>
            <li>3. Use the filtering and searching capabilities to find specific log entries</li>
        </ol> */}
        <div className=''>
          <h3 className='font-bold text-white'>Step 1: Create a logging utility</h3>
          <p>Add this helper function anywhere in your project (for example: utils/logToMonitara.ts).</p>
          <SyntaxHighlighter style={oneDark} language="ts" showLineNumbers={true}>
            {codeSnippet}
          </SyntaxHighlighter>
        </div>
        <div className=''>
          <h3 className='font-bold text-white'>Step 2: Choose a project code</h3>
          <p>Pick a unique project code for your application (for example: PAYMENT_APP_001).</p>
          <SyntaxHighlighter style={oneDark} language="ts" showLineNumbers={true}>
            {projectCode}
          </SyntaxHighlighter>
        </div>
        <div className=''>
          <h3 className='font-bold text-white'>Step 3: Send logs from your app</h3>
          <p>Use logTest() anywhere you want to track activity.</p>
          <div>
            <h3 className='text-green-300'>Success Log</h3>
            <SyntaxHighlighter style={oneDark} language="ts" showLineNumbers={true}>
              {successlog}
            </SyntaxHighlighter>
          </div>
          <div>
            <h3 className='text-red-300'>Error Log</h3>
            <SyntaxHighlighter style={oneDark} language="ts" showLineNumbers={true}>
              {errorlog}
            </SyntaxHighlighter>
          </div>
          <div>
            <h3>Normal/Information Log</h3>
            <SyntaxHighlighter style={oneDark} language="ts" showLineNumbers={true}>
              {normallog}
            </SyntaxHighlighter>
          </div>
        </div>
        <div className=''>
          <h3 className='font-bold text-white'>Step 4: Open the Monitara dashboard</h3>
          <ol>
            <li>Visit the Monitara Dashboard</li>
            <li>Enter your project code</li>
            <li>View your logs in real time</li>
          </ol>
        </div>
        <div className=''>
          <h3 className='font-bold text-white'>Step 5: Manage logs</h3>
          <p>From the dashboard, you can:</p>
          <ol>
            <li>1. Refresh logs</li>
            <li>2. Clear all logs from your project code</li>
            <li>3. Inspect detailed JSON data</li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default HowTo