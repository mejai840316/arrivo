'use client';

import React, { useState } from 'react';
import { Calculator, ShieldCheck, Info, TrendingDown, CheckCircle2, AlertTriangle, Coins, Clock, Users, GraduationCap, ArrowRight, FileBadge } from 'lucide-react';
import { LEGAL_CONFIG } from '@/lib/legal-config';
import HousingPrepaidCertificate from './HousingPrepaidCertificate';

export default function EconomicThresholdOptimizer({ profile }: { profile?: any }) {
  const [procedure, setProcedure] = useState<'estudios' | 'arraigo'>('estudios');
  const [housingPaid, setHousingPaid] = useState(false);
  const [coursePaid, setCoursePaid] = useState(false);
  const [months, setMonths] = useState(12);
  const [familyMembers, setFamilyMembers] = useState(0);
  const [showCertGenerator, setShowCertGenerator] = useState(false);

  const iprem2026 = 600; // Valor aproximado IPREM 100%
  
  // Lógica Prixline: Reducción drástica por prepago y duración
  const baseMonthly = procedure === 'estudios' ? iprem2026 : (iprem2026 * 1.5);
  let discount = 1.0;
  if (procedure === 'estudios' && housingPaid) discount -= 0.5;
  if (procedure === 'estudios' && coursePaid) discount -= 0.1; // Bonus por curso prepagado (según juzgado)

  const mainRequired = baseMonthly * Math.max(0.4, discount);
  
  // Familiares: 75% IPREM el primero, 50% el resto
  const additionalRequired = familyMembers > 0 
    ? (iprem2026 * 0.75) + (Math.max(0, familyMembers - 1) * iprem2026 * 0.5)
    : 0;

  const totalMonthly = mainRequired + additionalRequired;
  const totalRequired = totalMonthly * months;

  if (showCertGenerator) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-8 duration-700">
         <button 
          onClick={() => setShowCertGenerator(false)}
          className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 flex items-center gap-2 mb-4 tracking-widest"
         >
           ← Volver al Optimizador
         </button>
         <HousingPrepaidCertificate profile={profile} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-[0_25px_70px_rgba(0,0,0,0.04)] space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center gap-4 pb-6 border-b border-slate-50">
        <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/20">
           <Coins className="w-7 h-7" />
        </div>
        <div>
           <h3 className="text-2xl font-extrabold text-slate-900 font-outfit tracking-tight">Optimizador de Medios Económicos</h3>
           <p className="text-sm text-slate-500 font-medium italic">Estrategias legales para reducir el umbral de solvencia exigido.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
           <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tipo de Autorización (Contexto Prixline 2026)</label>
              <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl">
                 <button 
                  onClick={() => setProcedure('estudios')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${procedure === 'estudios' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}
                 >
                   Estancia Estudios
                 </button>
                 <button 
                  onClick={() => setProcedure('arraigo')}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-bold uppercase transition-all ${procedure === 'arraigo' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-400'}`}
                 >
                   Arraigo Social
                 </button>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-3">
                 <label className="text-[9px] font-black uppercase text-slate-400">Meses de Estancia: {months}</label>
                 <input 
                  type="range" min="3" max="12" 
                  value={months} onChange={(e) => setMonths(parseInt(e.target.value))}
                  className="w-full accent-blue-600"
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[9px] font-black uppercase text-slate-400">Familiares: {familyMembers}</label>
                 <div className="flex gap-2">
                    <button onClick={() => setFamilyMembers(Math.max(0, familyMembers - 1))} className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">-</button>
                    <button onClick={() => setFamilyMembers(familyMembers + 1)} className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center font-bold text-white">+</button>
                 </div>
              </div>
           </div>

           <div className="space-y-4 pt-4 border-t border-slate-50">
              <div className="p-5 bg-emerald-50 rounded-3xl border border-emerald-100 space-y-4">
                 <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                       <TrendingDown className="w-4 h-4 text-emerald-600" />
                       <span className="text-[10px] font-bold text-emerald-900 uppercase">Alojamiento Pagado</span>
                    </div>
                    <button onClick={() => setHousingPaid(!housingPaid)} className={`w-12 h-6 rounded-full p-1 transition-colors ${housingPaid ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                       <div className={`w-4 h-4 bg-white rounded-full transition-transform ${housingPaid ? 'translate-x-6' : 'translate-x-0'}`} />
                    </button>
                 </div>
                 {housingPaid && (
                   <button 
                    onClick={() => setShowCertGenerator(true)}
                    className="w-full py-3 bg-white border border-emerald-200 rounded-xl text-[9px] font-black text-emerald-700 uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-600 hover:text-white transition-all shadow-sm"
                   >
                     <FileBadge className="w-3 h-3" />
                     Generar Certificado para el Cónsul
                   </button>
                 )}
              </div>

              <div className="flex items-center justify-between px-5">
                 <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                    <span className="text-[10px] font-bold text-slate-700 uppercase">Curso Pagado</span>
                 </div>
                 <button onClick={() => setCoursePaid(!coursePaid)} className={`w-12 h-6 rounded-full p-1 transition-colors ${coursePaid ? 'bg-blue-500' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full transition-transform ${coursePaid ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
              </div>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-8 text-white space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
           
           <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Solvencia de Seguridad Objetivo</p>
              <p className="text-5xl font-black font-outfit">{totalRequired.toFixed(2)}€</p>
              {totalRequired < 3000 && (
                <span className="inline-block px-3 py-1 bg-emerald-500 text-white rounded-full text-[10px] font-black uppercase tracking-tighter shadow-lg shadow-emerald-500/20">
                   Meta Prixline Alcanzada (De 8k a 2k) ✓
                </span>
              )}
           </div>

           <div className="pt-6 border-t border-white/10 space-y-3">
              <div className="flex justify-between items-center text-[10px] font-black uppercase text-blue-200/50">
                 <span>Requisito Mensual</span>
                 <span>{mainRequired.toFixed(2)}€ / mes</span>
              </div>
              {familyMembers > 0 && (
                 <div className="flex justify-between items-center text-[10px] font-black uppercase text-amber-200/70">
                    <span>Sobrecoste Familiar</span>
                    <span>+{additionalRequired.toFixed(2)}€ / mes</span>
                 </div>
              )}
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-10 border-t border-slate-50">
         <div className="space-y-3">
            <div className="w-8 h-8 bg-slate-900 text-white rounded-lg flex items-center justify-center text-xs font-black">1</div>
            <p className="text-[11px] font-black uppercase text-slate-900 tracking-tighter">Realiza la Transferencia</p>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
               Envía el importe calculado (ej: 2.400€) al emisor del certificado. Esta **transferencia bancaria** es tu "Prueba de Oro" (el Recibo).
            </p>
         </div>
         <div className="space-y-3">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center text-xs font-black">2</div>
            <p className="text-[11px] font-black uppercase text-blue-600 tracking-tighter">Genera el Certificado</p>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
               Usa nuestro generador para que el emisor firme el papel. El importe debe coincidir **exactamente** con lo transferido.
            </p>
         </div>
         <div className="space-y-3">
            <div className="w-8 h-8 bg-emerald-600 text-white rounded-lg flex items-center justify-center text-xs font-black">3</div>
            <p className="text-[11px] font-black uppercase text-emerald-600 tracking-tighter">Cierra el Círculo</p>
            <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
               Una vez presentado el expediente, si es entre familiares, los fondos pueden ser devueltos. El Cónsul solo verifica que el pago **existió** en la ventanilla.
            </p>
         </div>
      </div>

      <footer className="mt-8 p-6 bg-blue-50 rounded-2xl flex items-start gap-4 border border-blue-100">
         <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
         <div className="space-y-2">
            <p className="text-xs font-bold text-blue-900 uppercase tracking-tight">Estrategia Prixline Validada: El Pago de Respaldo</p>
            <p className="text-xs text-blue-800/70 font-medium leading-relaxed">
              Estamos aplicando la **Lógica de Ingeniería Legal**: El Consolidado no puede denegar si hay un pago bancario real + un certificado de alojamiento. Esta es la vía rápida para solventar los 8.000€ sin tenerlos bloqueados. **Clave: La transferencia debe ser previa a la cita.**
            </p>
         </div>
      </footer>
    </div>
  );
}
