import React from 'react';
import Link from 'next/link';
import { ArrowLeft, MessageSquare, Bot, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Asistente IA | Arrivo',
  description: 'Consulta tus dudas sobre Extranjería apoyado por Inteligencia Artificial entrenada con el BOE.',
};

export default function ChatPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 h-screen flex flex-col">
      <div className="shrink-0 mb-6">
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-br from-blue-900 to-slate-900 p-2.5 rounded-xl shadow-md">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-blue-900 font-outfit flex items-center gap-2">Asistente Arrivo IA <Sparkles className="w-4 h-4 text-amber-400" /></h1>
            <p className="text-slate-500 font-medium">Resolución de dudas legales (Fase 4 - Próximamente)</p>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center z-10">
          <MessageSquare className="w-16 h-16 text-slate-200 mb-6" />
          <h2 className="text-2xl font-extrabold text-slate-800 mb-2">Motor Conversacional Semántico</h2>
          <p className="text-slate-500 max-w-lg mb-8 leading-relaxed font-medium">
            Estamos ultimando la integración con <strong>Google Gemini (text-embedding-004)</strong>. Pronto podrás realizar preguntas abiertas sobre arraigo, visados y nacionalidad, y Arrivo IA te responderá con citas exactas del BOE.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-lg border border-amber-200 text-amber-800 font-bold text-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            En fase de entrenamiento
          </div>
        </div>
        
        <div className="shrink-0 p-4 border-t border-slate-100 bg-slate-50 z-10 flex gap-2">
           <input type="text" disabled placeholder="Escribe tu duda legal aquí (Ej: ¿Es necesario el apostillado para arraigo social?)..." className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 placeholder:text-slate-400 cursor-not-allowed opacity-70 focus:outline-none" />
           <button disabled className="px-6 py-3 bg-blue-900/50 text-white rounded-xl font-bold uppercase tracking-wider text-xs cursor-not-allowed">Enviar</button>
        </div>
      </div>
    </div>
  );
}
