'use client';
import { Thread } from "@assistant-ui/react";

import { Message, useAssistant } from 'ai/react';
import MovieCarousel from './components/movie-carousel';
import { useEffect } from 'react';

export default function Chat() {

  const { status, messages, input, submitMessage, handleInputChange, append } =
    useAssistant({ api: '/api/assistant' });


  // useEffect(() => {
  //   // Check if there are no messages (i.e., it's a fresh start)
  //   if (messages.length === 0) {
  //     append({ role: 'user', content: "What should I watch tonight?" });
  //   }
  // }, [append, messages.length]); // Include missing dependencies


  const handleThumbsUp = (showName: string) => {
    const message = `I'm interested in watching ${showName}. Can you recommend similar shows?`;
    append({ role: 'user', content: message });
  };

  const handleThumbsDown = (showName: string) => {
    const message = `I'm not interested in watching ${showName}. Can you recommend different shows?`;
    append({ role: 'user', content: message });
  };

  const handleWatched = (showName: string) => {
    const message = `I've watched ${showName}. Can you recommend more shows based on this?`;
    append({ role: 'user', content: message });
  };

  return (
    <div>
      {status === "awaiting_message" && messages.length > 0 && messages[messages.length - 1].role === 'assistant' &&
        messages[messages.length - 1].content &&
        messages[messages.length - 1].content.startsWith('{') && (
          <MovieCarousel
            movies={JSON.parse(messages[messages.length - 1].content)}
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
            onWatched={handleWatched}
          />
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