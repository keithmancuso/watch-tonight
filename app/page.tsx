'use client';
import { Thread } from "@assistant-ui/react";

import { Message, useAssistant } from 'ai/react';
import MovieCarousel from './components/movie-carousel';

export default function Chat() {

  const { status, messages, input, submitMessage, handleInputChange } =
    useAssistant({ api: '/api/assistant' });


  return (
    <div>
      {status === "awaiting_message" && messages.length > 0 && messages[messages.length - 1].role === 'assistant' &&
        messages[messages.length - 1].content &&
        messages[messages.length - 1].content.startsWith('{') && (
          <MovieCarousel movies={JSON.parse(messages[messages.length - 1].content)} />
        )}

      {status === 'in_progress' && <div>Updating recommendations...</div>}

      <footer className="fixed bottom-0 w-full bg-white py-2 shadow">
        <form onSubmit={submitMessage} className="container mx-auto px-4 flex items-center">
          <input
            disabled={status !== 'awaiting_message'}
            value={input}
            placeholder="Enter your message..."
            className="flex-grow rounded-l-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            disabled={status !== 'awaiting_message'}
            className="bg-indigo-600 text-white rounded-r-md py-2 px-4 text-sm font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}