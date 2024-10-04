'use client';
import { Thread } from "@assistant-ui/react";

import { Message, useAssistant } from 'ai/react';
import ShowsList from './components/shows-list';
import { useEffect } from 'react';

export default function Chat() {

  const { status, messages, input, submitMessage, handleInputChange, append } =
    useAssistant({ api: '/api/assistant' });

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

  const handleAppend = (message: string) => {
    append({ role: 'user', content: message });
  };

  return (
    <div>

      <nav className="w-full border-b border-gray-200" aria-label="Tabs">
        <div className="container mx-auto px-4 flex space-x-4 w-full" aria-label="Tabs">
          <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700" onClick={() => append({ role: 'user', content: "What should I watch tonight?" })}>Tonight</button>
          <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700" onClick={() => append({ role: 'user', content: "What&apos;s on next?" })}>Next</button>
          <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700" aria-current="page" onClick={() => append({ role: 'user', content: "What am I already watching?" })}>Watching</button>
          <button className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700" onClick={() => append({ role: 'user', content: "What have I watched?" })}>Watched</button>
        </div>

      </nav>
      <div className="container mx-auto px-4 py-4">

        {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && (

          <ShowsList
            message={messages[messages.length - 1].content}
            status={status}
            onThumbsUp={handleThumbsUp}
            onThumbsDown={handleThumbsDown}
            onWatched={handleWatched}
          />



        )}
      </div>

      {status === 'in_progress' && <div>Updating shows...</div>}

      <footer className="fixed bottom-0 left-0 right-0 bg-white py-2 shadow-md">



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
            className="bg-indigo-600 text-white border-2 border-indigo-600 rounded-r-md py-2 px-4 text-sm font-semibold hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
          >
            Send
          </button>
        </form>
      </footer>
    </div>
  );
}