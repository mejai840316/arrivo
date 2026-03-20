'use client';

import React from 'react';
import { Coins, TrendingDown, CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function SolvenciaStatusWidget({ totalRequired = 8000, currentSaved = 0 }) {
  const isOptimized = totalRequired < 3000;
  const progress = Math.min(100, Math.round((currentSaved / totalRequired) * 100));

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-50 rounded-full opacity-40 scale-0 group-hover:scale-100 transition-transform duration-700" />
      
      <div className="flex items-center justify-between mb-4">
         <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center shadow-lg">
            <Coins className="w-5 h-5" />
         </div>
         {isOptimized && (
           <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest animate-pulse">
              <TrendingDown className="w-3 h-3" />
              Estrategia -50% Activa
           </div>
         )}
      </div>

      <div className="space-y-4 relative z-10">
         <div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Tu Meta de Solvencia 2026</p>
            <p className="text-3xl font-black text-slate-900 font-outfit">{totalRequired.toFixed(2)}€</p>
         </div>

         <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
               <span>Progreso de Ahorro</span>
               <span>{progress}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
               <div 
                 className={`h-full transition-all duration-1000 ${isOptimized ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-blue-600'}`} 
                 style={{ width: `${progress}%` }} 
               />
            </div>
         </div>

         <footer className="pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <CheckCircle2 className={`w-3.5 h-3.5 ${progress === 100 ? 'text-emerald-500' : 'text-slate-300'}`} />
               <span className="text-[10px] font-bold text-slate-400">Validado paco Prixline</span>
            </div>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 flex items-center gap-1">
               Optimizar
               <ArrowUpRight className="w-3 h-3" />
            </button>
         </footer>
      </div>
    </div>
  );
}
