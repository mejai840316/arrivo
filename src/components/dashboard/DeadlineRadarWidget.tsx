'use client';

import React, { useState, useEffect } from 'react';
import { Timer, BellRing, AlertCircle, CheckCircle2, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';

export default function DeadlineRadarWidget({ notificationDate = '', daysLimit = 30 }) {
  const [daysLeft, setDaysLeft] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!notificationDate) return;
    const start = new Date(notificationDate);
    const deadline = new Date(start);
    deadline.setDate(start.getDate() + daysLimit);
    
    const now = new Date();
    const diffTime = deadline.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    setDaysLeft(diffDays);
    const elapsed = daysLimit - diffDays;
    setProgress(Math.min(100, Math.max(0, (elapsed / daysLimit) * 100)));
  }, [notificationDate, daysLimit]);

  if (!notificationDate) {
    return (
      <div className="bg-slate-50 border border-slate-200 border-dashed rounded-[32px] p-8 text-center flex flex-col items-center gap-4">
         <div className="w-12 h-12 bg-slate-100/50 rounded-full flex items-center justify-center text-slate-300">
            <Calendar className="w-6 h-6" />
         </div>
         <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Radar de Plazos Inactivo</p>
         <p className="text-[9px] text-slate-400 font-medium px-6 leading-relaxed">Configura una fecha de notificación en el módulo de recursos para vigilar tus plazos.</p>
      </div>
    );
  }

  const isCritical = daysLeft <= 5;
  const isExpired = daysLeft < 0;

  return (
    <div className={`bg-white border-2 rounded-[32px] p-6 shadow-sm relative overflow-hidden transition-all ${isCritical ? 'border-red-500 shadow-xl shadow-red-500/10 animate-pulse' : 'border-slate-100 hover:border-blue-900 group'}`}>
      <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
         <ShieldAlert className="w-24 h-24" />
      </div>

      <div className="space-y-6 relative z-10">
         <header className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isCritical ? 'bg-red-600' : 'bg-slate-900'} text-white shadow-lg`}>
               <Timer className="w-5 h-5" />
            </div>
            {isCritical && (
              <div className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-600 rounded-full text-[9px] font-black uppercase tracking-widest">
                 <BellRing className="w-3 h-3" />
                 Plazo Crítico
              </div>
            )}
         </header>

         <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Recurso de Reposición / Alzada</p>
            <h4 className="text-3xl font-black text-slate-900 font-outfit uppercase tracking-tighter">
               {isExpired ? 'PLAZO AGOTADO' : `${daysLeft} DÍAS RESTANTES`}
            </h4>
         </div>

         <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-bold text-slate-500">
               <span>Vigilancia Administrativa</span>
               <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
               <div 
                className={`h-full transition-all duration-1000 ${isCritical ? 'bg-red-600' : 'bg-blue-600'}`} 
                style={{ width: `${progress}%` }} 
               />
            </div>
         </div>

         <footer className="pt-4 border-t border-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2">
               <AlertCircle className={`w-3.5 h-3.5 ${isCritical ? 'text-red-500' : 'text-slate-300'}`} />
               <span className="text-[10px] font-bold text-slate-400">Vence: {new Date(new Date(notificationDate).getTime() + daysLimit * 86400000).toLocaleDateString()}</span>
            </div>
            <button className="text-[9px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800 flex items-center gap-1">
               Ver Trámite
               <ArrowRight className="w-3 h-3" />
            </button>
         </footer>
      </div>
    </div>
  );
}
