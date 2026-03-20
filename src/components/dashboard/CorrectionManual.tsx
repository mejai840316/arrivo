'use client';

import React from 'react';
import { BookOpen, AlertCircle, CheckCircle2, FileText, Landmark, Users, GraduationCap, Coins } from 'lucide-react';

const COMMON_REQUIREMENTS = [
  {
    title: "Insuficiencia de Medios Económicos",
    icon: Coins,
    color: "emerald",
    challenge: "Te piden demostrar los 600€/mes (8k anuales) y no los tienes.",
    solution: "Aplica la estrategia del 50%. Presenta el Certificado de Alojamiento Pagado (generado en Arrivo) + Recibo de Transferencia. Esto fuerza la reducción legal a ~300€/mes.",
    legalTip: "Cita el Reglamento 1155/2024 de flexibilización administrativa."
  },
  {
    title: "Antecedentes Penales en Origen",
    icon: AlertCircle,
    color: "red",
    challenge: "Tu certificado de penales tiene una mancha o está caducado.",
    solution: "Si es caducidad, pide prórroga de 10 días y adjunta el justificante de nueva solicitud. Si hay mancha, adjunta certificado de cancelación o rehabilitación.",
    legalTip: "Los antecedentes leves no son causa automática de denegación si hay arraigo."
  },
  {
    title: "Falta de Informe de Integración",
    icon: Users,
    color: "blue",
    challenge: "El ayuntamiento no te ha dado cita para el informe de arraigo social.",
    solution: "Presenta el justificante de haber solicitado la cita + acta notarial de vínculos familiares (si los tienes) para cubrir el hueco legal.",
    legalTip: "El silencio de 30 días del ayuntamiento se puede suplir con otros medios de prueba."
  },
  {
    title: "Seguro Médico no Válido",
    icon: Landmark,
    color: "indigo",
    challenge: "Tu seguro tiene copagos o carencias y Extranjería lo rechaza.",
    solution: "Debes contratar un seguro médico privado sin copagos, sin carencias y con repatriación. Adjunta el certificado de la aseguradora que diga explícitamente 'EQUIVALENTE AL SNS'.",
    legalTip: "No sirven los seguros de viaje de 90 días."
  }
];

export default function CorrectionManual() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-6 sm:p-8 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
       <header className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 text-white rounded-xl flex items-center justify-center">
             <BookOpen className="w-5 h-5" />
          </div>
          <div>
             <h4 className="text-lg font-black text-slate-900 font-outfit uppercase">Manual de Respuestas Maestras</h4>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Soluciones probadas para requerimientos típicos.</p>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {COMMON_REQUIREMENTS.map((req, i) => (
            <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-lg transition-all group">
               <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 bg-${req.color}-50 text-${req.color}-600 rounded-lg flex items-center justify-center group-hover:bg-${req.color}-600 group-hover:text-white transition-colors`}>
                     <req.icon className="w-4 h-4" />
                  </div>
                  <h5 className="text-[11px] font-black uppercase text-slate-900 tracking-tighter">{req.title}</h5>
               </div>
               
               <div className="space-y-4">
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-slate-400">Problema</p>
                     <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{req.challenge}</p>
                  </div>
                  <div className="space-y-1">
                     <p className="text-[9px] font-black uppercase text-emerald-500">Solución Arrivo</p>
                     <p className="text-[10px] text-slate-700 font-bold leading-relaxed">{req.solution}</p>
                  </div>
                  <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-xl border border-slate-100">
                     <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                     <p className="text-[9px] text-blue-800 font-bold italic leading-tight">TIP LEGAL: {req.legalTip}</p>
                  </div>
               </div>
            </div>
          ))}
       </div>

       <div className="p-5 bg-indigo-900 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between text-white overflow-hidden relative gap-4">
          <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/5 rounded-full blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
             <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-indigo-200" />
             </div>
             <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300">¿Requerimiento Complejo?</p>
                <p className="text-xs font-bold leading-tight">Nuestra IA puede analizar tu carta de Extranjería.</p>
             </div>
          </div>
          <button className="relative z-10 px-6 py-3 bg-white text-indigo-900 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-indigo-100 transition-all">
             Analizar Carta
          </button>
       </div>
    </div>
  );
}
