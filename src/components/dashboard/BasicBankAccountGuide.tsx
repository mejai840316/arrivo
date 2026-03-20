'use client';

import React, { useState } from 'react';
import { Landmark, ShieldCheck, FileWarning, Download, Info, CheckCircle2, ChevronRight, Scale, Gavel } from 'lucide-react';
import jsPDF from 'jspdf';
import BankReclamationGenerator from './BankReclamationGenerator';

export default function BasicBankAccountGuide({ profile }: { profile?: any }) {
  const [vulnerable, setVulnerable] = useState(false);
  const [showLawyerMode, setShowLawyerMode] = useState(false);

  const generateReclamationPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("SOLICITUD DE APERTURA DE CUENTA DE PAGO BÁSICA", 20, 30);
    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const body = `Al amparo del Real Decreto-ley 19/2017 y el Real Decreto 164/2019, que transponen la Directiva 2014/92/UE, vengo a solicitar formalmente la apertura de una CUENTA DE PAGO BÁSICA en su entidad.\n\nEstando en situación de residencia legal en la Unión Europea (o siendo solicitante de asilo / no teniendo permiso de residencia pero con imposibilidad de ser expulsado), y NO disponiendo de ninguna otra cuenta de pago en España.\n\nAsimismo, declaro estar en situación de vulnerabilidad económica según los baremos del IPREM vigentes, por lo que solicito la GRATUIDAD de dicha cuenta conforme al Art. 3 del RD 164/2019.\n\nSe adjunta copia de Pasaporte vigente como documento de identificación válido según la normativa de prevención de blanqueo de capitales (SEPBLAC).`;

    doc.text(body, 20, 50, { maxWidth: 170, align: "justify" });
    doc.text(`En ________________, a ${new Date().toLocaleDateString()}`, 20, 120);
    doc.text("Firma del Solicitante", 20, 140);
    doc.line(20, 160, 80, 160);

    doc.save("Solicitud_Cuenta_Basica_Arrivo.pdf");
  };

  if (showLawyerMode) {
    return (
      <div className="space-y-6 animate-in slide-in-from-right-8 duration-700">
         <button 
          onClick={() => setShowLawyerMode(false)}
          className="text-[10px] font-black uppercase text-slate-400 hover:text-slate-900 flex items-center gap-2 mb-4 tracking-widest"
         >
           ← Volver a la Guía de Apertura
         </button>
         <BankReclamationGenerator profile={profile} />
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-[0_25px_70px_rgba(0,0,0,0.04)] space-y-8 animate-in fade-in duration-700">
      <header className="flex items-center gap-4 pb-6 border-b border-slate-50">
        <div className="w-14 h-14 bg-amber-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-amber-600/20">
           <Landmark className="w-7 h-7" />
        </div>
        <div>
           <h3 className="text-2xl font-extrabold text-slate-900 font-outfit tracking-tight">Cuenta de Pago Básica (Ley Española)</h3>
           <p className="text-sm text-slate-500 font-medium italic">Tu derecho a tener un IBAN, incluso sin papeles.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
           <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em]">Ruta Crítica: Apertura Sin Nómina</h4>
              <div className="space-y-3">
                 {[
                  { t: "Padrones: Debes estar empadronado en tu ciudad.", i: CheckCircle2 },
                  { t: "Informe Social: Si no tienes nómina, pides el 'Informe de Idoneidad' en Servicios Sociales.", i: FileWarning },
                  { t: "Presentación: Llevas ese informe al banco junto a tu pasaporte.", i: Landmark },
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <item.i className={`w-4 h-4 shrink-0 ${i === 1 ? 'text-blue-600' : 'text-amber-600'}`} />
                      <span className="text-[11px] font-bold text-slate-700">{item.t}</span>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-6 bg-amber-50 rounded-[32px] border border-amber-100 space-y-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Scale className="w-4 h-4 text-amber-700" />
                    <span className="text-xs font-bold text-amber-900 uppercase italic">¿Eres Vulnerable?</span>
                 </div>
                 <button 
                  onClick={() => setVulnerable(!vulnerable)}
                  className={`w-14 h-8 rounded-full p-1 transition-colors ${vulnerable ? 'bg-amber-600' : 'bg-slate-300'}`}
                 >
                    <div className={`w-6 h-6 bg-white rounded-full transition-transform ${vulnerable ? 'translate-x-6' : 'translate-x-0'}`} />
                 </button>
              </div>
              <p className="text-[10px] text-amber-800/70 font-medium leading-relaxed">
                Si tus ingresos anuales son menores a **3 veces el IPREM**, la cuenta debe ser **GRATUITA (€0)**.
              </p>
           </div>
        </div>

        <div className="bg-slate-900 rounded-[32px] p-8 text-white space-y-8 relative overflow-hidden flex flex-col justify-between">
           <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-400">Petición al Ayuntamiento</p>
              <h4 className="text-2xl font-black font-outfit leading-tight">Solicita tu Informe de Idoneidad</h4>
              <p className="text-xs text-white/60 font-medium leading-relaxed italic">
                "Deseo solicitar un informe de servicios sociales para acreditar mi vulnerabilidad económica ante la entidad bancaria, según el Real Decreto 164/2019."
              </p>
           </div>

           <div className="flex flex-col gap-3">
              <button 
                onClick={generateReclamationPDF}
                className="w-full py-4 bg-amber-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-amber-500 transition-all flex items-center justify-center gap-3 shadow-xl shadow-amber-600/20"
              >
                  <Download className="w-4 h-4" />
                  Descargar Petición al Banco
              </button>
              <button 
                onClick={() => setShowLawyerMode(true)}
                className="w-full py-4 bg-white/10 text-white border border-white/20 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-white/20 transition-all flex items-center justify-center gap-3 transition-transform group"
              >
                  <Gavel className="w-4 h-4 group-hover:rotate-12" />
                  ¿Te han denegado? Modo Abogado
              </button>
           </div>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-2xl flex items-start gap-4 border border-blue-100">
         <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
         <div className="space-y-2">
            <p className="text-xs font-bold text-blue-900 uppercase tracking-tight">Estrategia de Blindaje Legal</p>
            <p className="text-xs text-blue-800/70 font-medium leading-relaxed">
              Si el banco intenta cobrarte 20€ de comisión, enséñales el borrador de Arrivo. La mención al **Banco de España** suele ser suficiente para que el administrativo "encuentre" la opción de cuenta gratuita en su sistema.
            </p>
         </div>
      </div>
    </div>
  );
}
