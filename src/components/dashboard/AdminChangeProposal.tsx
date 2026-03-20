'use client';

import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, X, BellRing, Info } from 'lucide-react';
import { LEGAL_CONFIG } from '@/lib/legal-config';

interface Proposal {
  id: string;
  field: string;
  oldValue: string | number;
  newValue: string | number;
  source: string;
  reason: string;
}

export default function AdminChangeProposal() {
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: '1',
      field: 'Tasa Arraigo (790-052)',
      oldValue: LEGAL_CONFIG.FEES.ARRAIGO.amount,
      newValue: 39.50,
      source: 'BOE-A-2026-1234',
      reason: 'Actualización por IPC y nueva Orden Ministerial de Hacienda 2026.'
    }
  ]);

  const [accepted, setAccepted] = useState<string[]>([]);

  const handleAccept = (id: string) => {
    setAccepted([...accepted, id]);
    // En una app real, aquí llamaríamos a una API para actualizar la DB o el Legal Config
  };

  if (proposals.length === 0 || proposals.every(p => accepted.includes(p.id))) return null;

  return (
    <div className="mt-8 animate-in slide-in-from-right-8 duration-700">
      <div className="bg-blue-50 border-2 border-blue-200 rounded-[32px] p-8 relative overflow-hidden group">
        <Sparkles className="absolute -right-6 -top-6 w-32 h-32 text-blue-200 opacity-20 group-hover:rotate-12 transition-transform duration-1000" />
        
        <div className="flex items-center gap-4 mb-6">
           <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <BellRing className="w-5 h-5 animate-bounce" />
           </div>
           <div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-900/50">Sugerencia de la IA Arrivo</h4>
              <p className="text-lg font-black text-blue-900 font-outfit">Cambio Normativo Detectado</p>
           </div>
        </div>

        <div className="space-y-4 relative z-10">
          {proposals.filter(p => !accepted.includes(p.id)).map((prop) => (
            <div key={prop.id} className="bg-white border border-blue-100 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-all hover:border-blue-300">
               <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-800">{prop.field}</p>
                  <div className="flex items-center gap-4">
                     <span className="text-sm font-medium text-slate-400 line-through">{prop.oldValue} €</span>
                     <ArrowRight className="w-4 h-4 text-blue-400" />
                     <span className="text-xl font-black text-blue-700 font-outfit">{prop.newValue} €</span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Info className="w-3.5 h-3.5 text-blue-500" />
                     <p className="text-[10px] text-slate-500 font-medium italic">Referencia: {prop.source}</p>
                  </div>
                  <p className="text-[10px] text-blue-800/80 font-bold bg-blue-50 px-3 py-1 rounded-lg">
                    {prop.reason}
                  </p>
               </div>

               <div className="flex gap-2 w-full md:w-auto">
                  <button 
                    onClick={() => handleAccept(prop.id)}
                    className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
                  >
                    <Check className="w-4 h-4" />
                    Actualizar Ahora
                  </button>
                  <button className="p-3 bg-slate-100 text-slate-400 rounded-xl hover:bg-rose-50 hover:text-rose-600 transition-all">
                    <X className="w-4 h-4" />
                  </button>
               </div>
            </div>
          ))}
        </div>

        <footer className="mt-6 pt-6 border-t border-blue-200/50 flex items-center justify-between text-[10px] font-bold text-blue-900/40 uppercase tracking-widest">
           <span>Análisis en Tiempo Real via Gemini RAG</span>
           <span>Powered by Llama 3.1 70B</span>
        </footer>
      </div>
    </div>
  );
}
