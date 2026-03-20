'use client';

import React from 'react';
import { ShieldCheck, AlertTriangle, Eye, RefreshCcw, ExternalLink, CheckCircle2 } from 'lucide-react';
import { LEGAL_CONFIG } from '@/lib/legal-config';

export default function AdminMonitoring() {
  const lastUpdate = new Date(LEGAL_CONFIG.LAST_UPDATE);
  const now = new Date();
  const daysSinceUpdate = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
  
  const isOutdated = daysSinceUpdate > 30;

  return (
    <div className="bg-slate-900 rounded-[40px] p-10 text-white relative overflow-hidden shadow-2xl">
      <Eye className="absolute -right-10 -bottom-10 w-64 h-64 opacity-5" />
      
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className={`p-2 rounded-lg ${isOutdated ? 'bg-amber-500/20 text-amber-500' : 'bg-emerald-500/20 text-emerald-500'}`}>
                <ShieldCheck className="w-5 h-5" />
             </div>
             <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Admin Watchdog v1.0</span>
          </div>
          <h3 className="text-3xl font-extrabold font-outfit tracking-tight">Vigilancia del Administrador</h3>
          <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
            Este panel es exclusivo para ti. Compara los valores actuales de tu App con el BOE del día de hoy.
          </p>
        </div>

        <div className="flex flex-col items-end gap-2">
           <div className="px-5 py-2 bg-white/5 rounded-full border border-white/10 flex items-center gap-3">
              <div className={`w-2 h-2 rounded-full ${isOutdated ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} />
              <span className="text-xs font-bold font-outfit">Sincronización Legal: {isOutdated ? 'PENDIENTE' : 'ACTIVA'}</span>
           </div>
           <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mr-2">Última revisión: {LEGAL_CONFIG.LAST_UPDATE}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
         <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">IPREM Referencia</p>
            <div className="flex items-center justify-between">
               <span className="text-xl font-bold">{LEGAL_CONFIG.IPREM_2026} €</span>
               <a href={LEGAL_CONFIG.MONITORING.BOE_SOURCE} target="_blank" className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                  <ExternalLink className="w-4 h-4 text-blue-400" />
               </a>
            </div>
         </div>
         <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Tasa Arraigo</p>
            <div className="flex items-center justify-between">
               <span className="text-xl font-bold">{LEGAL_CONFIG.FEES.ARRAIGO.amount} €</span>
               <RefreshCcw className="w-4 h-4 text-slate-600" />
            </div>
         </div>
         <div className="p-6 bg-white/5 rounded-3xl border border-white/5 flex items-center justify-center">
            {isOutdated ? (
              <div className="flex items-center gap-3 text-amber-500">
                 <AlertTriangle className="w-6 h-6" />
                 <p className="text-xs font-bold leading-tight uppercase tracking-tighter">Revisión Recomendada<br/>Cambio de Ciclo Fiscal</p>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-emerald-400">
                 <CheckCircle2 className="w-6 h-6" />
                 <p className="text-xs font-bold leading-tight uppercase tracking-tighter">Normativa Actualizada<br/>Seguro para Usuarios</p>
              </div>
            )}
         </div>
      </div>
      
      <div className="mt-8 pt-8 border-t border-white/5 flex justify-end">
         <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20">
            Forzar Re-Sincronización IA
         </button>
      </div>
    </div>
  );
}
