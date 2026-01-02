import { NextRequest, NextResponse } from 'next/server';
import { SessionsClient } from '@google-cloud/dialogflow';
import Groq from 'groq-sdk';

// Initialize Dialogflow client
const sessionClient = new SessionsClient({
  credentials: JSON.parse(
    process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON || '{}'
  ),
});

// Initialize Groq (free LLM)
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// Portfolio context for RAG
const PORTFOLIO_CONTEXT = `
You are Francisco's AI assistant. Here's information about Francisco:

ABOUT:
- Full-stack developer and software engineer
- Specializes in building modern web and mobile applications
- Expert in React, Next.js, Node.js, TypeScript, and AI integration

SERVICES OFFERED:
1. Web Applications - Full-stack web apps with modern frameworks
2. Websites - Responsive, conversion-focused websites
3. Mobile Apps - iOS and Android native and cross-platform apps
4. AI Applications - ML/AI integration, chatbots, predictive analytics
5. Data Analysis - Business intelligence, data visualization, reporting
6. Automation - Workflow automation and custom solutions
7. API Development - RESTful APIs, GraphQL, microservices

TECH STACK:
- Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
- Backend: Node.js, Express, Python, FastAPI
- Mobile: React Native, Flutter
- AI/ML: TensorFlow, PyTorch, OpenAI, Langchain
- Database: PostgreSQL, MongoDB, Firebase, Supabase
- Cloud: AWS, Google Cloud, Vercel, Netlify

CONTACT:
- Email: emplen@gmail.com
- Location: Nigeria
- Available for: Freelance projects, consulting, full-time opportunities

PERSONALITY:
- Professional yet friendly
- Solution-oriented
- Passionate about clean code and user experience
- Always eager to learn new technologies

When answering questions:
- Be concise and helpful
- Focus on Francisco's skills and services
- Encourage potential clients to reach out
- If asked about pricing, suggest contacting directly for a quote
- If asked about availability, say Francisco is available for new projects
`;

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    if (!message || !sessionId) {
      return NextResponse.json(
        { error: 'Message and sessionId are required' },
        { status: 400 }
      );
    }

    // Step 1: Query Dialogflow
    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.DIALOGFLOW_PROJECT_ID!,
      sessionId
    );

    const dialogflowRequest = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: process.env.DIALOGFLOW_LANGUAGE_CODE || 'en',
        },
      },
    };

    const [dialogflowResponse] = await sessionClient.detectIntent(dialogflowRequest);
    const result = dialogflowResponse.queryResult;

    // Check if Dialogflow has a confident answer
    const intentName = result?.intent?.displayName || '';
    const confidence = result?.intentDetectionConfidence || 0;
    const isUnknown = intentName.toLowerCase().includes('fallback') || 
                      intentName.toLowerCase().includes('unknown') ||
                      confidence < 0.5;

    // Step 2: If Dialogflow doesn't know, use LLM with RAG
    if (isUnknown && result?.queryText) {
      console.log('Dialogflow uncertain, forwarding to LLM with portfolio context');

      try {
        const completion = await groq.chat.completions.create({
          messages: [
            {
              role: 'system',
              content: PORTFOLIO_CONTEXT,
            },
            {
              role: 'user',
              content: result.queryText,
            },
          ],
          model: 'llama-3.1-8b-instant', // the model to use 
          temperature: 0.7,
          max_tokens: 500,
        });

        const llmResponse = completion.choices[0]?.message?.content || 
                           "I'm having trouble answering that. Please contact Francisco directly at franciscoabhulimen@gmail.com";

        return NextResponse.json({
          response: llmResponse,
          source: 'llm',
          confidence: 1,
        });
      } catch (llmError) {
        console.error('LLM error:', llmError);
        // Fallback to Dialogflow response if LLM fails
      }
    }

    // Step 3: Return Dialogflow response
    return NextResponse.json({
      response: result?.fulfillmentText || "I'm not sure how to help with that. Could you rephrase?",
      source: 'dialogflow',
      confidence: confidence,
      intent: intentName,
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to process message',
        response: "Sorry, I'm having technical difficulties. Please try again or contact Francisco directly at franciscoabhulimen@gmail.com"
      },
      { status: 500 }
    );
  }
}