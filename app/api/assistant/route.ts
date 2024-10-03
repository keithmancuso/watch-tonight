import { AssistantResponse, tool } from 'ai';
import OpenAI from 'openai';
import { fetchTVDBShows } from '@/app/lib/tvdb';
import { auth } from "@/auth"
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {


  // Parse the request body
  const input: {
    threadId: string | null;
    message: string;
  } = await req.json();


  const session = await auth();
  // Use existing threadId or create a new one

  const threadId = session?.user.thread;




  if (!threadId) {
    throw new Error('Thread ID is not set');
  }

  // Add a message to the thread
  const createdMessage = await openai.beta.threads.messages.create(threadId, {
    role: 'user',
    content: input.message,
  });

  return AssistantResponse(
    { threadId, messageId: createdMessage.id },
    async ({ forwardStream, sendDataMessage }) => {
      // Run the assistant on the thread
      const runStream = openai.beta.threads.runs.stream(threadId, {
        assistant_id:
          process.env.ASSISTANT_ID ??
          (() => {
            throw new Error('ASSISTANT_ID is not set');
          })(),
      });

      // forward run status would stream message deltas
      let runResult = await forwardStream(runStream);

      // status can be: queued, in_progress, requires_action, cancelling, cancelled, failed, completed, or expired
      while (
        runResult?.status === 'requires_action' &&
        runResult.required_action?.type === 'submit_tool_outputs'
      ) {
        const tool_outputs =
          runResult.required_action.submit_tool_outputs.tool_calls.map(
            (toolCall: any) => {
              const parameters = JSON.parse(toolCall.function.arguments);

              switch (toolCall.function.name) {
                // configure your tool calls here

                // case 'weather': 
                //   tool({
                //     description: 'Get the weather in a location',
                //     parameters: z.object({
                //       location: z.string().describe('The location to get the weather for'),
                //     }),
                //     execute: async ({ location }) => ({
                //       location,
                //       temperature: 72 + Math.floor(Math.random() * 21) - 10,
                //     }),
                //   });

                default:
                  throw new Error(
                    `Unknown tool call function: ${toolCall.function.name}`,
                  );
              }
            },
          );

        runResult = await forwardStream(
          openai.beta.threads.runs.submitToolOutputsStream(
            threadId,
            runResult.id,
            { tool_outputs },
          ),
        );
      }
    },
  );
}