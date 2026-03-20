'use client';

import React, { useState } from 'react';
import { Landmark, GraduationCap, FileCheck, Timer, AlertCircle, CheckCircle2, Globe, ArrowRight, BookOpen, Download } from 'lucide-react';

export default function NationalityAccelerator({ profile }: { profile: any }) {
  const [origin, setOrigin] = useState(profile?.pais_origen || 'Iberoamérica');
  const [residencyStart, setResidencyStart] = useState(profile?.fecha_llegada || '');
  const [marriedToSpaniard, setMarriedToSpaniard] = useState(false);

  const calculateNationalityDate = () => {
    if (!residencyStart) return { date: null, progress: 0, requiredYears: 10 };
    
    let requiredYears = 10;
    if (origin === 'Iberoamérica' || origin === 'Filipinas' || origin === 'Guinea Ecuatorial') requiredYears = 2;
    if (marriedToSpaniard) requiredYears = 1;
    // Refugees could be handled here too (5 years)

    const start = new Date(residencyStart);
    const target = new Date(start);
    target.setFullYear(start.getFullYear() + requiredYears);
    
    const now = new Date();
    const totalTime = target.getTime() - start.getTime();
    const elapsed = now.getTime() - start.getTime();
    const progress = Math.min(100, Math.max(0, (elapsed / totalTime) * 100));

    return { date: target.toLocaleDateString(), progress, requiredYears };
  };

  const { date, progress, requiredYears } = calculateNationalityDate();

  return (
    <div className="bg-white border border-slate-100 rounded-[40px] p-10 shadow-[0_25px_70px_rgba(0,0,0,0.02)] space-y-10 animate-in fade-in duration-1000">
       <header className="flex items-center gap-4 pb-8 border-b border-slate-50">
          <div className="w-16 h-16 bg-red-600 text-white rounded-[24px] flex items-center justify-center shadow-lg shadow-red-600/20">
             <Globe className="w-8 h-8" />
          </div>
          <div>
             <h3 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter italic">Pasaporte Español Acelerado</h3>
             <p className="text-sm text-slate-500 font-medium italic">Ruta estratégica para los 2 años de residencia.</p>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <div className="space-y-4">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Tu Perfil de Origen</label>
                <select 
                 value={origin} onChange={(e) => setOrigin(e.target.value)}
                 className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-none text-sm font-bold focus:ring-2 focus:ring-red-600"
                >
                   <option value="Iberoamérica">País Iberoamericano (Ruta 2 años)</option>
                   <option value="Sefardí">Sefardí (Ruta 2 años)</option>
                   <option value="Refugiado">Estatus de Refugiado (Ruta 5 años)</option>
                   <option value="General">General (Ruta 10 años)</option>
                </select>
             </div>

             <div className="flex items-center justify-between p-6 bg-red-50 rounded-3xl border border-red-100">
                <div className="flex items-center gap-3">
                   <CheckCircle2 className="w-5 h-5 text-red-600" />
                   <span className="text-xs font-bold text-red-900 uppercase">Casado/a con Español/a</span>
                </div>
                <button 
                  onClick={() => setMarriedToSpaniard(!marriedToSpaniard)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${marriedToSpaniard ? 'bg-red-600' : 'bg-slate-300'}`}
                >
                   <div className={`w-6 h-6 bg-white rounded-full transition-transform ${marriedToSpaniard ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
             </div>

             <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-black uppercase text-slate-400 tracking-widest">
                   <span>Residencia Acumulada</span>
                   <span className="text-red-600">{Math.round(progress)}% Completo</span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-red-600 transition-all duration-1000 shadow-[0_0_15px_rgba(220,38,38,0.3)]" style={{ width: `${progress}%` }} />
                </div>
             </div>
          </div>

          <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between overflow-hidden relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16 blur-2xl opacity-50" />
             
             <div className="space-y-6">
                <div className="space-y-1">
                   <p className="text-[10px] font-black uppercase text-red-400 tracking-tighter">Fecha Objetivo para Aplicar</p>
                   {date ? (
                     <h4 className="text-4xl font-black font-outfit text-white">{date}</h4>
                   ) : (
                     <p className="text-xs text-slate-400 italic">Introduce tu fecha de residencia...</p>
                   )}
                </div>

                <div className="pt-6 border-t border-white/10 space-y-4">
                   <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                      <GraduationCap className="w-4 h-4" /> Los 2 Exámenes del Cervantes
                   </h5>
                   <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center space-y-1">
                         <p className="text-xs font-black text-white">DELE A2</p>
                         <p className="text-[9px] text-slate-500 uppercase">Idioma (Exento SI Iberoamérica)</p>
                      </div>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10 text-center space-y-1">
                         <p className="text-xs font-black text-white">CCSE</p>
                         <p className="text-[9px] text-slate-500 uppercase">Constitución y Cultura</p>
                      </div>
                   </div>
                </div>
             </div>

             <button className="w-full py-5 bg-white text-slate-900 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-slate-100 transition-all flex items-center justify-center gap-3 mt-8 shadow-xl shadow-white/5">
                <BookOpen className="w-4 h-4" />
                Planificar Cita Exámenes
             </button>
          </div>
       </div>

       <footer className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-10 border-t border-slate-50">
          <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-3">
             <AlertCircle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
             <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                **IMPORTANTE:** La residencia debe ser continua. Si sales más de 3 meses fuera de España en estos 2 años, el contador se REINICIA automáticamente.
             </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-2xl flex items-start gap-3">
             <Download className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
             <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                **DÍA D:** Puedes presentar la solicitud el mismo día que cumples los 2 años. Ten los penales de tu país listos (máximo 6 meses de vigencia).
             </p>
          </div>
          <div className="p-5 bg-red-50 rounded-2xl flex items-start gap-3 border border-red-100">
             <Landmark className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
             <p className="text-[10px] text-red-900 font-bold leading-relaxed">
                **VIA DIGITAL:** Aplicamos por la plataforma electrónica del Ministerio de Justicia. El tiempo medio de concesión en 2026 es de solo 4-6 meses.
             </p>
          </div>
       </footer>
    </div>
  );
}
