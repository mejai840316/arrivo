'use client';

import React, { useState } from 'react';
import { FileText, Download, CheckCircle2, UserCircle, Globe2, Briefcase, ShieldCheck, PenTool } from 'lucide-react';
import jsPDF from 'jspdf';
import AutoFirmaAssistant from './AutoFirmaAssistant';

type FormType = 'EX-01' | 'EX-10';

interface ProfileData {
  passport_number?: string;
  nie?: string;
  full_name?: string;
  ciudad_origen?: string;
  pais_origen?: string;
  telefono?: string;
}

export default function ExFormsGenerator({ initialProfile }: { initialProfile?: ProfileData }) {
  const [selectedForm, setSelectedForm] = useState<FormType>('EX-10');
  const [pdfGenerated, setPdfGenerated] = useState(false);
  const [formData, setFormData] = useState({
    pasaporte: initialProfile?.passport_number || '',
    nie: initialProfile?.nie || '',
    nombre: initialProfile?.full_name || '',
    primerApellido: '',
    segundoApellido: '',
    sexo: 'H',
    fechaNacimiento: '',
    lugarNacimiento: initialProfile?.ciudad_origen || '',
    paisNacimiento: initialProfile?.pais_origen || '',
    nacionalidad: initialProfile?.pais_origen || '',
    estadoCivil: 'S',
    nombrePadre: '',
    nombreMadre: '',
    domicilio: '',
    localidad: '',
    cp: '',
    provincia: '',
    telefono: initialProfile?.telefono || '',
    email: '',
  });

  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header Institucional
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 20, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`MINISTERIO DE INCLUSIÓN, SEGURIDAD SOCIAL Y MIGRACIONES - MODELO ${selectedForm}`, 105, 12, { align: "center" });

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("SOLICITUD DE AUTORIZACIÓN DE RESIDENCIA", 20, 35);
    doc.setFontSize(10);
    doc.text(`TIPO DE TRÁMITE: ${selectedForm === 'EX-10' ? 'ARRAIGO (SOCIAL/LABORAL)' : 'ESTUDIOS / PRÓRROGA'}`, 20, 42);

    // Grid de datos
    doc.setFont("helvetica", "normal");
    doc.rect(20, 50, 170, 100);
    doc.line(20, 65, 190, 65);
    doc.line(20, 80, 190, 80);
    doc.line(20, 95, 190, 95);

    doc.setFontSize(8);
    doc.text("1) DATOS DEL EXTRANJERO/A", 22, 55);
    doc.text(`PASAPORTE: ${formData.pasaporte}`, 25, 61);
    doc.text(`NIE: ${formData.nie}`, 100, 61);
    
    doc.text(`NOMBRE: ${formData.nombre}`, 25, 76);
    doc.text(`FECHA NACIMIENTO: ${formData.fechaNacimiento}`, 25, 91);
    doc.text(`NACIONALIDAD: ${formData.nacionalidad}`, 100, 91);

    // Secciones oficiales Mercurio
    doc.setFillColor(245, 247, 250);
    doc.rect(20, 160, 170, 80, 'F');
    doc.setFont("helvetica", "bold");
    doc.text("CLÁUSULAS DE CONSENTIMIENTO Y PROTECCIÓN DE DATOS (RGPD 2026)", 25, 170);

    // Footnote
    doc.setFontSize(7);
    doc.text("Generado por Arrivo AI - Registro Administrativo Digital 2026", 105, 285, { align: "center" });

    doc.save(`${selectedForm}_Form_Arrivo_${formData.nombre.replace(/\s/g, '_')}.pdf`);
    setPdfGenerated(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-[0_25px_60px_rgba(0,0,0,0.03)]">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-slate-100 mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tighter">Generador de Formularios EX</h2>
            <p className="text-slate-500 font-medium italic">Cumplimentación automática validada por el Reglamento 2026.</p>
          </div>
          <div className="flex bg-slate-100 p-1.5 rounded-2xl">
            {(['EX-10', 'EX-01'] as FormType[]).map((form) => (
              <button
                key={form}
                onClick={() => { setSelectedForm(form); setPdfGenerated(false); }}
                className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${
                  selectedForm === form ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {form}
              </button>
            ))}
          </div>
        </header>

        {/* Alerta Mercurio */}
        <div className="mb-10 p-6 bg-amber-50 border border-amber-200 rounded-[24px] flex items-center gap-4">
           <div className="w-12 h-12 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
           </div>
           <div>
              <p className="text-xs font-black uppercase text-amber-700 tracking-widest mb-1">Protocolo Sede Electrónica 2026</p>
              <p className="text-xs text-amber-900/70 font-medium leading-relaxed">
                Este formulario es para la <strong>Plataforma Mercurio</strong>. Tras generarlo, DEBE firmarlo digitalmente con su Certificado FNMT o Cl@ve. Solo se admiten archivos PDF de máximo 5MB.
              </p>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form Side */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">1. Datos de Identidad</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre</label>
                   <input 
                    type="text" 
                    value={formData.nombre}
                    onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900" 
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase">NIE</label>
                   <input 
                    type="text"
                    value={formData.nie}
                    onChange={(e) => setFormData({...formData, nie: e.target.value})}
                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900" 
                   />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">2. Domicilio en España</h3>
              <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Dirección Completa</label>
                    <input 
                      type="text"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-900" 
                    />
                  </div>
              </div>
            </div>
          </div>

          {/* Guidelines Side */}
          <div className="bg-slate-50 rounded-[40px] p-8 space-y-8">
            <h3 className="font-bold text-slate-900">Ayuda al Trámite</h3>
            <div className="space-y-4">
              {[
                { t: "Arraigo Social", d: "Requiere EX-10 y 2-3 años permanencia.", i: <UserCircle className="w-4 h-4" /> },
                { t: "Nacionalidad", d: "Modelo 790-026 y CCSE/DELE.", i: <Globe2 className="w-4 h-4" /> },
                { t: "Estudios", d: "Formulario EX-01 y Matricula.", i: <Briefcase className="w-4 h-4" /> }
              ].map((item, idx) => (
                <div key={idx} className="p-5 bg-white rounded-2xl flex items-start gap-4 shadow-sm">
                   <div className="p-2 bg-slate-50 text-slate-400 rounded-lg">{item.i}</div>
                   <div>
                      <p className="text-xs font-bold text-slate-800">{item.t}</p>
                      <p className="text-[10px] text-slate-500">{item.d}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col sm:flex-row items-center justify-between gap-8 border-t border-slate-100 mt-12">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
               </div>
               <div>
                  <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest mb-0.5">Diagnóstico: Viable</p>
                  <p className="text-xs font-medium text-slate-400 italic">Datos alineados con BOE 2026</p>
               </div>
            </div>
            <button 
              onClick={generatePDF}
              className="w-full sm:w-auto px-12 py-6 bg-slate-900 text-white font-black uppercase text-[11px] tracking-[0.25em] rounded-[24px] hover:bg-emerald-600 transition-all shadow-2xl shadow-slate-900/20 flex items-center justify-center gap-4 group/btn"
            >
              <Download className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
              Generar y Descargar PDF
            </button>
          </div>
      </div>

      {/* Manual de Presentación Section */}
      <div className="bg-slate-50 border border-slate-200 rounded-[40px] p-12 space-y-10 animate-in fade-in duration-1000">
         <div className="space-y-2">
            <h3 className="text-2xl font-extrabold text-slate-900 font-outfit tracking-tight">Hoja de Ruta de Presentación</h3>
            <p className="text-sm text-slate-500 font-medium">Sigue estos 5 pasos tras generar tu formulario para garantizar la admisión.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              { n: "01", t: "Escanear", d: "Todo en PDF (Máx 5MB).", i: <FileText className="w-5 h-5" /> },
              { n: "02", t: "Firma", d: "Usa AutoFirma (Portal MINHAFP).", i: <ShieldCheck className="w-5 h-5" /> },
              { n: "03", t: "Pago", d: "Tasa 790 en banco o online.", i: <CheckCircle2 className="w-5 h-5" /> },
              { n: "04", t: "Envío", d: "Sube a Plataforma Mercurio.", i: <Globe2 className="w-5 h-5" /> },
              { n: "05", t: "Registro", d: "Baja el justificante oficial.", i: <Briefcase className="w-5 h-5" /> },
            ].map((step, idx) => (
              <div key={idx} className="relative group p-6 bg-white border border-slate-100 rounded-[28px] hover:border-blue-200 transition-all hover:shadow-xl hover:shadow-blue-900/5">
                 <div className="absolute -top-3 -right-3 w-8 h-8 bg-slate-900 text-white text-[10px] font-black flex items-center justify-center rounded-full border-4 border-slate-50">
                    {step.n}
                 </div>
                 <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-4">
                    {step.i}
                 </div>
                 <h4 className="font-bold text-slate-900 mb-1">{step.t}</h4>
                 <p className="text-[10px] text-slate-500 font-medium leading-relaxed">{step.d}</p>
              </div>
            ))}
         </div>
      </div>

      {/* Guía de Firma Post-Generación */}
      {pdfGenerated && (
        <div className="mt-12 pt-12 border-t border-slate-100 animate-in slide-in-from-bottom-12 duration-1000">
           <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                 <PenTool className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter italic">Paso Obligatorio: Firma de Expediente</h2>
           </div>
           <AutoFirmaAssistant />
        </div>
      )}
    </div>
  );
}
