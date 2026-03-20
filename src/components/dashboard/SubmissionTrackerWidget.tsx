'use client';

import React, { useState } from 'react';
import { ShieldCheck, Upload, FileCheck, Timer, AlertCircle, CheckCircle2, Landmark, ArrowRight, LucideIcon } from 'lucide-react';

export default function SubmissionTrackerWidget({ initialStatus = 'presented' }) {
  const [status, setStatus] = useState(initialStatus);
  const [receiptNumber, setReceiptNumber] = useState('REGAGE26e000456789');

  const getStatusConfig = () => {
    const configs: Record<string, { label: string, color: string, icon: LucideIcon, detail: string }> = {
      'presented': { label: 'Presentado en Registro', color: 'blue', icon: FileCheck, detail: 'Documentación en manos de la Administración.' },
      'waiting': { label: 'En Trámite', color: 'amber', icon: Timer, detail: 'Esperando resolución o requerimiento.' },
      'subsanado': { label: 'Subsanado / Aportado', color: 'emerald', icon: ShieldCheck, detail: 'Respuesta al requerimiento enviada correctamente.' }
    };
    return configs[status];
  };

  const config = getStatusConfig();

  return (
    <div className="bg-white border border-slate-200 rounded-[32px] p-6 shadow-sm hover:shadow-xl transition-all group overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
         <FileCheck className="w-32 h-32" />
      </div>

      <div className="space-y-6 relative z-10">
         <header className="flex items-center justify-between">
            <div className={`w-10 h-10 bg-${config.color}-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-${config.color}-600/20`}>
               <config.icon className="w-5 h-5" />
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1 bg-${config.color}-100 text-${config.color}-600 rounded-full text-[9px] font-black uppercase tracking-widest`}>
               {config.label}
            </div>
         </header>

         <div className="space-y-1">
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Justificante de Entrada</p>
            <p className="text-xl font-bold text-slate-900 font-outfit tracking-tighter truncate">{receiptNumber}</p>
         </div>

         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
            <div className="flex items-center gap-2">
               <CheckCircle2 className={`w-3.5 h-3.5 text-${config.color}-500`} />
               <p className="text-[10px] text-slate-600 font-bold leading-tight">{config.detail}</p>
            </div>
            <p className="text-[9px] text-slate-400 font-medium italic">Vigilancia de Silencio Administrativo: **3 meses** desde 20/03/2026</p>
         </div>

         <footer className="pt-4 border-t border-slate-50 flex items-center justify-between">
            <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">
                <Upload className="w-4 h-4" />
               Subir Nuevo Justificante
            </button>
            <button className={`text-[10px] font-black text-${config.color}-600 uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-1`}>
               Seguimiento
               <ArrowRight className="w-3.5 h-3.5" />
            </button>
         </footer>
      </div>
    </div>
  );
}
