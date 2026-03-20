'use client';

import React, { useState } from 'react';
import { Home, FileCheck, AlertTriangle, ShieldCheck, Download, Gavel, CheckCircle2, FileText, Clock, PenTool } from 'lucide-react';
import jsPDF from 'jspdf';
import RoomContractGenerator from './RoomContractGenerator';

export default function EmpadronamientoAssistant({ profile }: { profile?: any }) {
  const [hasContract, setHasContract] = useState<boolean | null>(null);
  const [mode, setMode] = useState<'alta' | 'contrato'>('alta');
  
  const [formData, setFormData] = useState({
    nombre: profile?.full_name || '',
    pasaporte: profile?.passport_number || profile?.nie || '',
    ciudad: 'San Martín del Rey Aurelio',
    direccion: '',
    fechaLlegada: '',
  });

  const [pdfGenerated, setPdfGenerated] = useState(false);

  const generateAltaPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("SOLICITUD DE ALTA EN EL PADRÓN MUNICIPAL", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`SOLICITANTE: ${formData.nombre}`, 20, 40);
    doc.text(`ID (NIE/PAS): ${formData.pasaporte}`, 20, 48);
    doc.text(`DIRECCIÓN: ${formData.direccion}`, 20, 56);
    
    doc.text("EXPONE: Que por medio de la presente solicito el alta en el padrón de habitantes.", 20, 70, { maxWidth: 170 });
    doc.text("Firma del solicitante:", 20, 100);
    doc.line(20, 120, 80, 120);

    doc.save(`Alta_Padron_${formData.nombre.replace(/\s/g, '_')}.pdf`);
    setPdfGenerated(true);
  };

  if (hasContract === false || mode === 'contrato') {
     return (
       <div className="space-y-8 animate-in slide-in-from-right-8 duration-700">
          <button 
            onClick={() => { setHasContract(null); setMode('alta'); }}
            className="text-xs font-bold text-slate-400 hover:text-slate-900 flex items-center gap-2 mb-4"
          >
            ← Volver al Asistente de Alta
          </button>
          <RoomContractGenerator profile={profile} />
       </div>
     );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-[0_25px_60px_rgba(0,0,0,0.03)] space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest">
                <Home className="w-3 h-3" />
                Módulo 1: Residencia Legal
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tighter">Asistente de Padrón Inteligente</h3>
            <p className="text-slate-500 font-medium italic">El empadronamiento es la "partida de nacimiento" de tu residencia legal en España.</p>
        </div>
      </header>

      {hasContract === null && (
        <div className="py-20 text-center space-y-10">
           <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto shadow-inner text-slate-400">
              <FileCheck className="w-10 h-10" />
           </div>
           <div className="space-y-3">
              <h4 className="text-2xl font-black text-slate-900 font-outfit">¿Tienes un contrato de alquiler vigente?</h4>
              <p className="text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                Necesitamos saber si dispones de un documento legal de vivienda para generar el alta o si necesitas que redactemos uno por ti.
              </p>
           </div>
           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setHasContract(true)}
                className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-emerald-600 transition-all shadow-xl shadow-slate-900/10"
              >
                Sí, tengo contrato
              </button>
              <button 
                onClick={() => setHasContract(false)}
                className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:border-slate-300 transition-all"
              >
                No, vivo de habitación/cedido
              </button>
           </div>
        </div>
      )}

      {hasContract === true && (
        <div className="space-y-10 animate-in zoom-in-95 duration-700">
           <div className="p-8 bg-blue-50/50 border border-blue-100 rounded-[32px] flex items-center gap-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center shrink-0">
                 <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                 <p className="text-xs font-black uppercase text-blue-900 tracking-widest mb-1 italic">Situación: Lista para Tramitar</p>
                 <p className="text-xs text-blue-800/80 font-medium">Genial. Ahora generaremos tu solicitud de alta para presentarla en el Ayuntamiento de tu zona.</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Dirección del Contrato</label>
                 <input 
                   name="direccion"
                   value={formData.direccion}
                   onChange={(e) => setFormData({...formData, direccion: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                   placeholder="Ej: Calle Gran Vía 12, 4A"
                 />
              </div>
              <div className="space-y-4">
                 <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Fecha de Entrada</label>
                 <input 
                   type="date"
                   name="fechaLlegada"
                   value={formData.fechaLlegada}
                   onChange={(e) => setFormData({...formData, fechaLlegada: e.target.value})}
                   className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                 />
              </div>
           </div>

           <div className="flex justify-end pt-10 border-t border-slate-100">
              <button 
                onClick={generateAltaPDF}
                className="px-10 py-5 bg-slate-900 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20 flex items-center gap-3"
              >
                <Download className="w-5 h-5" />
                Descargar Alta de Padrón
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
