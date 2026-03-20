'use client';

import React, { useState } from 'react';
import { 
  ClipboardCheck, 
  CalendarClock, 
  FileWarning, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Download,
  Gavel,
  Calculator,
  MessageSquare,
  Coins,
  Landmark,
  PenTool
} from 'lucide-react';
import ArraigoInterviewSimulator from './ArraigoInterviewSimulator';
import EconomicThresholdOptimizer from './EconomicThresholdOptimizer';
import BasicBankAccountGuide from './BasicBankAccountGuide';
import AdministrativeAppealsGenerator from './AdministrativeAppealsGenerator';
import SubsanacionGenerator from './SubsanacionGenerator';
import NationalityAccelerator from './NationalityAccelerator';

interface LegalToolboxProps {
  profile: any;
}

export default function LegalToolbox({ profile }: LegalToolboxProps) {
  const [activeModule, setActiveModule] = useState<'checklist' | 'calculator' | 'appeals' | 'interview' | 'economic' | 'bank' | 'subsanacion' | null>(null);

  // Lógica de Cálculo de Nacionalidad (Simplificada España 2026)
  const calculateNationalityPlazo = () => {
    if (!profile?.fecha_llegada) return "S/D";
    const llegada = new Date(profile.fecha_llegada);
    const ahora = new Date();
    const añosResidencia = (ahora.getTime() - llegada.getTime()) / (1000 * 60 * 60 * 24 * 365);
    
    const añosNecesarios = profile?.pais_origen === 'Iberoamérica' || profile?.pais_origen === 'Filipinas' ? 2 : 10;
    const progreso = Math.min(100, Math.round((añosResidencia / añosNecesarios) * 100));
    const faltan = Math.max(0, (añosNecesarios - añosResidencia).toFixed(1));

    return { faltan, progreso, añosNecesarios };
  };

  const nationalityResult = calculateNationalityPlazo();

  return (
    <div className="space-y-8">
      {/* Grid de Herramientas Premium - 6 Columnas */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <button 
          onClick={() => setActiveModule('checklist')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'checklist' ? 'bg-blue-900 border-blue-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'checklist' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'checklist' ? 'text-white' : 'text-slate-900'}`}>Checklist</h4>
        </button>

        <button 
          onClick={() => setActiveModule('calculator')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'calculator' ? 'bg-blue-900 border-blue-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'calculator' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
            <CalendarClock className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'calculator' ? 'text-white' : 'text-slate-900'}`}>Nacionalidad</h4>
        </button>

        <button 
          onClick={() => setActiveModule('appeals')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'appeals' ? 'bg-blue-900 border-blue-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'appeals' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
            <Gavel className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'appeals' ? 'text-white' : 'text-slate-900'}`}>Recursos</h4>
        </button>

        <button 
          onClick={() => setActiveModule('interview')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'interview' ? 'bg-indigo-900 border-indigo-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'interview' ? 'bg-indigo-800 text-white' : 'bg-indigo-50 text-indigo-600'}`}>
            <MessageSquare className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'interview' ? 'text-white' : 'text-slate-900'}`}>Entrevista</h4>
        </button>

        <button 
          onClick={() => setActiveModule('economic')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'economic' ? 'bg-emerald-900 border-emerald-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'economic' ? 'bg-emerald-800 text-white' : 'bg-emerald-50 text-emerald-600'}`}>
            <Coins className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'economic' ? 'text-white' : 'text-slate-900'}`}>IPREM 50%</h4>
        </button>

        <button 
          onClick={() => setActiveModule('bank')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'bank' ? 'bg-amber-900 border-amber-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'bank' ? 'bg-amber-800 text-white' : 'bg-amber-50 text-amber-600'}`}>
            <Landmark className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'bank' ? 'text-white' : 'text-slate-900'}`}>Banca Básica</h4>
        </button>

        <button 
          onClick={() => setActiveModule('subsanacion')}
          className={`p-4 rounded-2xl border transition-all text-left ${activeModule === 'subsanacion' ? 'bg-blue-900 border-blue-900' : 'bg-white border-slate-200'}`}
        >
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${activeModule === 'subsanacion' ? 'bg-blue-800 text-white' : 'bg-blue-50 text-blue-600'}`}>
            <PenTool className="w-5 h-5" />
          </div>
          <h4 className={`font-bold text-[11px] uppercase tracking-tighter ${activeModule === 'subsanacion' ? 'text-white' : 'text-slate-900'}`}>Subsanar</h4>
        </button>
      </div>

      <div className="mt-8">
        {activeModule === 'checklist' && (
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="font-extrabold text-slate-900 font-outfit text-lg mb-6 flex items-center gap-2 underline decoration-blue-500/30">
              Checklist Legal 2026
            </h3>
            <div className="space-y-4">
               {[
                { label: "Pasaporte Completo", status: profile?.passport_number ? "done" : "pending" },
                { label: "Antecedentes Penales", status: "pending" },
                { label: "Informe de Integración", status: "pending" },
                { label: "Contrato de Trabajo", status: "done" }
               ].map((item, i) => (
                 <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <p className="text-sm font-bold text-slate-700 underline decoration-slate-200 underline-offset-4">{item.label}</p>
                    {item.status === 'done' ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <div className="w-4 h-4 rounded-full border-2 border-slate-200" />}
                 </div>
               ))}
            </div>
          </div>
        )}

        {activeModule === 'interview' && <ArraigoInterviewSimulator />}
        {activeModule === 'economic' && <EconomicThresholdOptimizer profile={profile} />}
        {activeModule === 'bank' && <BasicBankAccountGuide profile={profile} />}
        {activeModule === 'appeals' && <AdministrativeAppealsGenerator profile={profile} />}
        {activeModule === 'subsanacion' && <SubsanacionGenerator profile={profile} />}
        {activeModule === 'calculator' && <NationalityAccelerator profile={profile} />}

        {!activeModule && (
          <div className="p-16 border-4 border-dashed border-slate-50 rounded-[50px] flex flex-col items-center text-center">
             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-200 mb-6">
                <Scale className="w-10 h-10" />
             </div>
             <p className="font-outfit font-black text-slate-300 uppercase tracking-widest text-sm">Selecciona una herramienta estratégica</p>
          </div>
        )}
      </div>
    </div>
  );
}
