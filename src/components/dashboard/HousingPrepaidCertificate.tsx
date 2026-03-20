'use client';

import React, { useState } from 'react';
import { FileBadge, Download, ShieldCheck, Home, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

export default function HousingPrepaidCertificate({ profile }: { profile: any }) {
  const [data, setData] = useState({
    emisor: '', // Nombre del dueño o residencia
    emisorDni: '',
    vivienda: '',
    start: '',
    end: '',
    importeTotal: '',
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Design Elements
    doc.setFillColor(248, 250, 252);
    doc.rect(10, 10, 190, 277, 'F');
    doc.setDrawColor(226, 232, 240);
    doc.rect(10, 10, 190, 277);

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(15, 23, 42);
    doc.text("CERTIFICADO DE ALOJAMIENTO ABONADO", 105, 35, { align: "center" });

    // Body
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const body = `D/Dña. ${data.emisor}, con DNI/NIE ${data.emisorDni}, en calidad de propietario/propietaria de la vivienda sita en ${data.vivienda}.\n\nCERTIFICA:\n\nQue D/Dña. ${profile?.full_name || '_________'}, con NIE/Pasaporte ${profile?.nie || profile?.passport_number || '_________'}, tiene ABONADO EN SU TOTALIDAD el alojamiento en la dirección mencionada.\n\nEl periodo de estancia garantizado y prepagado corresponde desde el día ${data.start} hasta el día ${data.end}, cubriendo la totalidad de la estancia prevista para sus estudios o residencia.\n\nEl importe total satisfecho por este concepto asciende a la cantidad de ${data.importeTotal} euros, no existiendo ninguna deuda pendiente por alojamiento para las fechas indicadas.`;

    doc.text(body, 25, 60, { maxWidth: 160, align: "justify", lineHeightFactor: 1.5 });

    // Official Note for Consulates
    doc.setFillColor(241, 245, 249);
    doc.rect(25, 140, 160, 40, 'F');
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("NOTA PARA LA ADMINISTRACIÓN (CONSOLUDADO / EXTRANJERÍA):", 30, 150);
    doc.setFont("helvetica", "normal");
    doc.text("A efectos de acreditación de medios económicos, se solicita la aplicación de la reducción del 50% del IPREM exigido, al estar el gasto de alojamiento 100% satisfecho y garantizado según este certificado.", 30, 158, { maxWidth: 150 });

    // Signatures
    doc.setFontSize(11);
    doc.text(`En ________________, a ${new Date().toLocaleDateString()}`, 25, 210);
    doc.text("Firma del Emisor / Sello de la Residencia", 25, 230);
    doc.line(25, 260, 100, 260);

    // Footer
    doc.setFontSize(7);
    doc.setTextColor(148, 163, 184);
    doc.text("Documento sugerido por Estrategia Prixline 2026 - Generado vía Arrivo AI", 105, 280, { align: "center" });

    doc.save(`Certificado_Alojamiento_Arrivo_${profile?.full_name?.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-[40px] p-10 space-y-8 shadow-sm">
       <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-600/20">
             <FileBadge className="w-6 h-6" />
          </div>
          <div>
             <h4 className="text-xl font-extrabold text-slate-900 font-outfit">Generador de Prueba de Pago</h4>
             <p className="text-xs text-slate-500 font-medium italic">Documento clave para bajar el IPREM al 50%.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre del Propietario / Residencia</label>
             <input 
              onChange={(e) => setData({...data, emisor: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej: Residencia Universitaria S.L."
             />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">DNI/CIF Emisor</label>
             <input 
              onChange={(e) => setData({...data, emisorDni: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej: B12345678"
             />
          </div>
          <div className="md:col-span-2 space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Dirección de la Vivienda</label>
             <input 
              onChange={(e) => setData({...data, vivienda: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-emerald-500"
              placeholder="Ej: Calle Gran Via 22, Madrid"
             />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha Inicio</label>
             <input type="date" onChange={(e) => setData({...data, start: e.target.value})} className="w-full px-5 py-3 bg-slate-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha Fin</label>
             <input type="date" onChange={(e) => setData({...data, end: e.target.value})} className="w-full px-5 py-3 bg-slate-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-emerald-500" />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Importe Pagado (€)</label>
             <input type="number" onChange={(e) => setData({...data, importeTotal: e.target.value})} className="w-full px-5 py-3 bg-slate-50 rounded-xl text-sm font-medium border-none focus:ring-2 focus:ring-emerald-500" placeholder="Ej: 2400" />
          </div>
       </div>

       <button 
         onClick={generatePDF}
         className="w-full py-5 bg-emerald-600 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-emerald-700 transition-all flex items-center justify-center gap-4 shadow-xl shadow-emerald-600/20"
       >
          <Download className="w-5 h-5" />
          Bajar Certificado para Extranjería
       </button>

       <div className="p-4 bg-emerald-50 rounded-2xl flex items-center gap-4 border border-emerald-100">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <p className="text-[10px] text-emerald-800 font-bold uppercase italic">Validación: Documento Blindado para el Consolidado 2026.</p>
       </div>
    </div>
  );
}
