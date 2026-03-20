'use client';

import React, { useState } from 'react';
import { PenTool, Download, ExternalLink, ShieldCheck, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AutoFirmaAssistant() {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Diagnóstico de Firma",
      desc: "¿Tienes tu Certificado Digital (FNMT) o DNIe instalado en el navegador?",
      action: "https://www.sede.fnmt.gob.es/certificados",
      actionLabel: "Obtener Certificado FNMT"
    },
    {
      id: 2,
      title: "Instalar AutoFirma",
      desc: "Descarga e instala la aplicación oficial del Gobierno de España para firmar PDFs sin salir de casa.",
      action: "https://firmaelectronica.gob.es/Home/Descargas.html",
      actionLabel: "Descargar AutoFirma Oficial"
    },
    {
      id: 3,
      title: "Protocolo de Firma",
      desc: "Abre AutoFirma, carga el PDF generado por Arrivo y selecciona tu certificado para incrustar la firma legal.",
      action: null,
      actionLabel: null
    },
    {
      id: 4,
      title: "Validación 'Valide'",
      desc: "Sube el archivo firmado a la plataforma Valide para asegurar que el Ministerio no lo rechace.",
      action: "https://valide.redsara.es/valide/validarFirma/ejecutarValidarFirma.html",
      actionLabel: "Verificar Firma en Valide"
    }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.04)] animate-in fade-in duration-700">
      <header className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
        <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-xl">
           <PenTool className="w-7 h-7" />
        </div>
        <div>
           <h3 className="text-2xl font-extrabold text-slate-900 font-outfit tracking-tight">Asistente de Firma Digital</h3>
           <p className="text-sm text-slate-500 font-medium">Protocolo obligatorio para presentación en Plataforma Mercurio.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {steps.map((step) => (
          <button 
            key={step.id} 
            onClick={() => setActiveStep(step.id)}
            className={`p-6 rounded-3xl border text-left transition-all relative ${
              activeStep === step.id ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.03]' : 'bg-slate-50 border-slate-100 text-slate-400 hover:bg-white hover:border-slate-300'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center mb-4 font-black text-[10px] ${
               activeStep === step.id ? 'bg-white/10' : 'bg-slate-200 text-slate-500'
            }`}>
               0{step.id}
            </div>
            <h4 className="font-bold text-xs uppercase tracking-widest">{step.title}</h4>
            {activeStep === step.id && <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-900 rotate-45" />}
          </button>
        ))}
      </div>

      <div className="bg-slate-50 rounded-[32px] p-10 flex flex-col md:flex-row items-center justify-between gap-10 min-h-[220px]">
         <div className="space-y-4 flex-1">
            <h5 className="text-xl font-extrabold font-outfit text-slate-900">{steps[activeStep-1].title}</h5>
            <p className="text-sm text-slate-500 leading-relaxed font-medium max-w-xl">
               {steps[activeStep-1].desc}
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
               {steps[activeStep-1].action && (
                 <a 
                   href={steps[activeStep-1].action || '#'} 
                   target="_blank" 
                   className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2"
                 >
                   {steps[activeStep-1].actionLabel}
                   <ExternalLink className="w-3 h-3" />
                 </a>
               )}
               {activeStep < 4 && (
                 <button 
                   onClick={() => setActiveStep(activeStep + 1)}
                   className="px-6 py-3 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-all flex items-center gap-2"
                 >
                   Siguiente Paso
                   <ChevronRight className="w-4 h-4" />
                 </button>
               )}
            </div>
         </div>

         <div className="w-full md:w-64 aspect-square bg-white border border-slate-100 rounded-[32px] p-8 flex flex-col items-center justify-center text-center shadow-inner relative group">
            <ShieldCheck className={`w-16 h-16 ${activeStep === 4 ? 'text-emerald-500' : 'text-slate-100'} transition-colors duration-1000`} />
            <p className="mt-4 text-[10px] font-black uppercase text-slate-400 tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
               Sello de Tiempo<br/>Legal 2026
            </p>
         </div>
      </div>

      <footer className="mt-10 p-6 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center gap-4">
         <CheckCircle2 className="w-5 h-5 text-emerald-600" />
         <p className="text-xs font-medium text-emerald-800">
            <strong>Consejo Arrivo IA:</strong> Firmar correctamente el PDF es la única forma de evitar la 'Inadmisibilidad por defecto de firma' que afecta al 15% de los expedientes nuevos en Mercurio.
         </p>
      </footer>
    </div>
  );
}
