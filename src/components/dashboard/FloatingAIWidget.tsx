import Link from 'next/link';
import { MessageSquareText, Sparkles } from 'lucide-react';

export default function FloatingAIWidget() {
  return (
    <Link 
      href="/dashboard/chat"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 text-white pl-4 pr-5 py-3 rounded-full shadow-2xl hover:bg-blue-900 hover:-translate-y-1 transition-all group border border-slate-700/50"
      aria-label="Abrir Asistente Arrivo IA"
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute inset-0 bg-blue-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity rounded-full"></span>
        <MessageSquareText className="w-5 h-5 text-blue-100 relative z-10" />
        <Sparkles className="w-3 h-3 text-emerald-400 absolute -top-1.5 -right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-20" />
      </div>
      <div className="flex flex-col items-start leading-none gap-1">
        <span className="text-[9px] font-extrabold text-blue-400 uppercase tracking-widest leading-none">Consulta Rápida</span>
        <span className="text-[13px] font-bold font-outfit leading-none shadow-sm">Asistente Legal IA</span>
      </div>
      {/* Efecto Pulse suave */}
      <span className="absolute -inset-1 border border-blue-500/50 rounded-full animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-30 group-hover:animate-none group-hover:opacity-0 pointer-events-none"></span>
    </Link>
  );
}
