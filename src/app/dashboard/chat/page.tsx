'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Sparkles, Bot, User, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: '¡Hola! Soy tu asistente Arrivo IA, experto en extranjería en España (Marzo 2026). ¿En qué puedo ayudarte hoy con tu expediente o dudas sobre arraigo?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      if (data.error) throw new Error(data.error);

      setMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: '⚠️ Lo siento, no he podido procesar tu solicitud en este momento. Inténtalo de nuevo más tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 h-screen flex flex-col">
      <div className="shrink-0 mb-6">
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Panel
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-2.5 rounded-xl shadow-lg border border-slate-700/50">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 font-outfit flex items-center gap-2">Asistente Arrivo IA <Sparkles className="w-4 h-4 text-amber-500" /></h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-sm animate-pulse"></span>
              Consultoría Legal RAG 2026 Activa
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col relative">
        {/* Chat History */}
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
               <MessageSquare className="w-12 h-12 mb-4 opacity-20" />
               <p className="font-bold text-sm">Inicia una conversación legal</p>
            </div>
          )}

          {messages.map((m, i) => (
            <div 
              key={i} 
              className={`flex items-start gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-sm ${
                m.role === 'assistant' ? 'bg-blue-900 text-white' : 'bg-emerald-500 text-white'
              }`}>
                {m.role === 'assistant' ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div className={`max-w-[80%] px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed whitespace-pre-wrap shadow-sm border ${
                m.role === 'assistant' 
                  ? 'bg-white text-slate-800 border-slate-200 rounded-tl-none' 
                  : 'bg-blue-900 text-white border-blue-900 rounded-tr-none'
              }`}>
                {m.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-4 animate-in fade-in duration-300">
              <div className="shrink-0 w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center shadow-sm">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-white px-5 py-3.5 rounded-2xl rounded-tl-none border border-slate-200 flex gap-1.5 items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/30 animate-bounce [animation-delay:-0.3s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/30 animate-bounce [animation-delay:-0.15s]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900/30 animate-bounce"></div>
              </div>
            </div>
          )}
        </div>

        {/* Input area */}
        <form 
          onSubmit={handleSend}
          className="shrink-0 p-5 bg-white border-t border-slate-100 flex gap-3 items-center z-10"
        >
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Haz una pregunta legal (Eje: ¿Qué es el Arraigo Social?)…" 
            className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-sm font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus:bg-white transition-colors disabled:opacity-50" 
          />
          <button 
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-14 h-14 bg-blue-900 text-white rounded-2xl shadow-lg flex items-center justify-center hover:bg-blue-800 hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:translate-y-0 disabled:cursor-not-allowed group"
          >
            <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </form>
      </div>

      <p className="mt-4 text-[10px] text-slate-400 text-center uppercase tracking-widest font-extrabold opacity-60">
        Respuesta basada en datos del BOE Marzo 2026 — No es asesoría legal individual
      </p>
    </div>
  );
}
