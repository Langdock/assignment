'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';

export default function Chat() {
  const [messages, setMessages] = useState<Array<{type: 'user' | 'ai', content: string}>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userMessage }),
      });

      if (!res.ok) throw new Error('Failed to fetch response');

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiResponse = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');
          
          lines.forEach(line => {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              aiResponse += data;
            }
          });

          setMessages(prev => {
            const newMessages = [...prev];
            const lastMessage = newMessages[newMessages.length - 1];
            if (lastMessage?.type === 'ai') {
              lastMessage.content = aiResponse;
            } else {
              newMessages.push({ type: 'ai', content: aiResponse });
            }
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        type: 'ai', 
        content: 'An error occurred while fetching the response.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen bg-gray-900 h-screen">
    <div className="flex flex-col max-w-3xl mx-auto  text-white h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-4 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 text-gray-100'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-4"
      >
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg p-2 transition-colors duration-200"
          >

            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </form>
    </div>
    </div>
  );
}
