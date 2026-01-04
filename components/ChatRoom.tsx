
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Welcome message
    setMessages([
      {
        id: '1',
        sender: 'Gemini Mentor',
        text: 'Olá! Sou seu mentor criativo. Em que posso ajudar você com seus projetos de design hoje?',
        timestamp: new Date(),
        isAi: true
      }
    ]);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'Você',
      text: input,
      timestamp: new Date(),
      isAi: false
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const responseText = await geminiService.getChatResponse(input, []);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'Gemini Mentor',
        text: responseText,
        timestamp: new Date(),
        isAi: true
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-160px)] flex flex-col bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center gap-4 bg-slate-50/50">
        <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white text-xl">
          <i className="fa-solid fa-headset"></i>
        </div>
        <div>
          <h2 className="font-bold text-slate-800">Mentor de Design</h2>
          <p className="text-xs text-emerald-500 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            Sempre Online
          </p>
        </div>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar"
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isAi ? 'justify-start' : 'justify-end'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
              msg.isAi 
                ? 'bg-slate-100 text-slate-800 rounded-tl-none' 
                : 'bg-indigo-600 text-white rounded-tr-none'
            }`}>
              <p className="text-sm">{msg.text}</p>
              <p className={`text-[10px] mt-2 opacity-60 text-right`}>
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-400">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                <span className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-50 border-t border-slate-100">
        <div className="flex gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-indigo-600 transition-colors">
            <i className="fa-solid fa-paperclip"></i>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte algo ao mentor..."
            className="flex-1 bg-transparent px-2 outline-none text-slate-700"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
