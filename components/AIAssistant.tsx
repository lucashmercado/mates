import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Loader2, Sparkles } from 'lucide-react';
import { getGeminiRecommendation } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: '¡Hola! Soy Don Matero, tu asistente virtual. ¿Buscas un regalo especial o necesitas ayuda para elegir tu primer mate?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    const aiResponse = await getGeminiRecommendation(userMsg);
    
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    setIsLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 z-40 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-105 ${
          isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100 bg-mate-600 text-white'
        }`}
        aria-label="Abrir asistente AI"
      >
        <Sparkles className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-6 left-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 transform origin-bottom-left border border-mate-200 overflow-hidden flex flex-col ${
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-10 pointer-events-none'
        }`}
        style={{ maxHeight: '600px', height: '80vh' }}
      >
        {/* Header */}
        <div className="bg-mate-600 p-4 flex justify-between items-center text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-serif font-bold">Asistente Don Matero</h3>
          </div>
          <button onClick={() => setIsOpen(false)} className="hover:bg-mate-700 p-1 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-mate-50 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-mate-600 text-white rounded-tr-none'
                    : 'bg-white text-mate-800 border border-mate-200 shadow-sm rounded-tl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-mate-200 p-3 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-mate-500" />
                <span className="text-xs text-mate-500">Escribiendo...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-mate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregúntame sobre mates..."
            className="flex-1 bg-mate-50 border border-mate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-mate-400 text-mate-900 placeholder-mate-400"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-2 bg-mate-600 text-white rounded-full hover:bg-mate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
};

export default AIAssistant;