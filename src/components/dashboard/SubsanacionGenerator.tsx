'use client';

import React, { useState } from 'react';
import { FilePlus, Download, CheckCircle2, Info, ArrowRight, ShieldCheck, ClipboardList, PenTool } from 'lucide-react';
import jsPDF from 'jspdf';

export default function SubsanacionGenerator({ profile }: { profile: any }) {
  const [expediente, setExpediente] = useState('');
  const [documentsNeeded, setDocumentsNeeded] = useState('');
  const [procedure, setProcedure] = useState('Arraigo para la Formación');

  const generateSubsanacionPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("AL ÓRGANO QUE DICTÓ EL REQUERIMIENTO DE SUBSANACIÓN", 105, 30, { align: "center" });
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const intro = `D/Dña. ${profile?.full_name || '_________'}, con NIE/Pasaporte ${profile?.nie || profile?.passport_number || '_________'} y domicilio en ${profile?.address || '_________'}, en el marco del expediente administrativo Nº ${expediente || '_________'}, ante este órgano administrative COMPARECE y, como mejor proceda en Derecho, `;
    doc.text(intro, 20, 50, { maxWidth: 170, align: "justify" });

    doc.setFont("helvetica", "bold");
    doc.text(`DICE: Que habiendo recibido notificación de REQUERIMIENTO DE SUBSANACIÓN para el trámite de ${procedure}, por medio del presente escrito procede a cumplimentar el mismo, de conformidad con el artículo 68 de la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas.`, 20, 75, { maxWidth: 170, align: "justify" });

    doc.text("DOCUMENTACIÓN QUE SE APORTA:", 20, 105);
    doc.setFont("helvetica", "normal");
    doc.text(`En cumplimiento de lo requerido, se adjunta al presente escrito la siguiente documentación:\n\n${documentsNeeded || '1. [Documento 1]\n2. [Documento 2]'}`, 20, 115, { maxWidth: 170 });

    doc.setFont("helvetica", "bold");
    doc.text("SUPLICO:", 20, 155);
    doc.setFont("helvetica", "normal");
    doc.text("Que se tenga por presentado este escrito de subsanación, se admita la documentación adjunta y se proceda a la continuación del trámite del expediente hasta su resolución estimatoria definitiva.", 20, 163, { maxWidth: 170 });

    doc.text(`En ________________, a ${new Date().toLocaleDateString()}`, 20, 195);
    doc.text("Firma del Interesado", 20, 215);
    doc.line(20, 235, 80, 235);

    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Escrito de Subsanación Art. 68 Ley 39/2015. Generado por Arrivo AI Engine 2026.", 105, 285, { align: "center" });

    doc.save(`Subsanacion_${procedure.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="bg-white border-2 border-slate-900 rounded-[40px] p-10 space-y-10 shadow-2xl animate-in fade-in duration-700">
       <header className="flex items-center gap-4 pb-6 border-b-2 border-slate-50">
          <div className="w-16 h-16 bg-blue-600 text-white rounded-[24px] flex items-center justify-center shadow-lg">
             <PenTool className="w-8 h-8" />
          </div>
          <div>
             <h3 className="text-2xl font-black text-slate-900 font-outfit uppercase">Subsanación de Errores (EX-REQ)</h3>
             <p className="text-sm text-slate-500 font-bold italic">Respuesta rápida a requerimientos oficiales de Extranjería.</p>
          </div>
       </header>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nº de Expediente Requerido</label>
                <input 
                 onChange={(e) => setExpediente(e.target.value)}
                 className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-blue-600 outline-none"
                 placeholder="Ej: 28/001234.5/2026"
                />
             </div>
             <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Trámite Principal</label>
                <input 
                 value={procedure} onChange={(e) => setProcedure(e.target.value)}
                 className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-bold border-none focus:ring-2 focus:ring-blue-600 outline-none"
                 placeholder="Ej: Arraigo Social, Nacionalidad..."
                />
             </div>
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2">
                <ClipboardList className="w-4 h-4" />
                Papeles de Subsanación (Enuméralos)
             </label>
             <textarea 
              onChange={(e) => setDocumentsNeeded(e.target.value)}
              className="w-full h-40 px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none focus:ring-2 focus:ring-blue-600 outline-none resize-none"
              placeholder="Ej: 1. Pasaporte Escaneado completo\n2. Nuevo contrato de trabajo\n3. Tasa pagada..."
             />
          </div>
       </div>

       <div className="flex flex-col gap-6 md:flex-row items-center justify-between pt-6 border-t border-slate-50">
          <div className="flex items-center gap-4 p-5 bg-blue-50 rounded-3xl border border-blue-100 max-w-md">
             <Info className="w-6 h-6 text-blue-600 shrink-0" />
             <p className="text-[10px] text-blue-800 font-medium leading-relaxed">
               **Plazo Legal:** Tienes 10 días hábiles para responder. Si no respondes, Extranjería dará por desistida tu solicitud y archivará el expediente definitivamente.
             </p>
          </div>

          <button 
           onClick={generateSubsanacionPDF}
           className="w-full md:w-auto px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 transition-all flex items-center justify-center gap-4 shadow-xl shadow-blue-600/20 group"
          >
             <Download className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
             Generar Escrito de Subsanación
          </button>
       </div>

       <footer className="pt-6 flex items-center justify-center gap-3">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <p className="text-[9px] font-black uppercase text-slate-400 tracking-widest">Formato Auditado bajo Ley 39/2015</p>
       </footer>
    </div>
  );
}
