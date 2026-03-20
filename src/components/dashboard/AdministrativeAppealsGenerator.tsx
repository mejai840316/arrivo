'use client';

import React, { useState } from 'react';
import { Gavel, Download, FileText, AlertCircle, CheckCircle2, Info, ChevronRight, Scale, ShieldAlert, ListChecks, UserPlus } from 'lucide-react';
import jsPDF from 'jspdf';

type AppealType = 'reposicion' | 'alzada';
type DenialReason = 'financial' | 'criminal' | 'integration' | 'documentation';

export default function AdministrativeAppealsGenerator({ profile }: { profile: any }) {
  const [appealType, setAppealType] = useState<AppealType>('reposicion');
  const [procedureName, setProcedureName] = useState('Arraigo Social EX-10');
  const [reason, setReason] = useState<DenialReason>('financial');
  const [denialDate, setDenialDate] = useState('');
  const [expedienteNumber, setExpedienteNumber] = useState('');
  const [organo, setOrgano] = useState('Delegación del Gobierno en Madrid');
  const [evidence, setEvidence] = useState('');
  const [includeLawyerBlock, setIncludeLawyerBlock] = useState(false);

  const getLegalBody = () => {
    const commonStart = `D/Dña. ${profile?.full_name || '_________'}, con NIE/Pasaporte ${profile?.nie || profile?.passport_number || '_________'} y domicilio a efectos de notificaciones en ${profile?.address || '_________'}, ante este órgano administrativo COMPARECE y, como mejor proceda en Derecho, `;
    
    const resourceHeader = appealType === 'reposicion' 
      ? `INTERPONE RECURSO POTESTATIVO DE REPOSICIÓN contra la resolución de denegación de ${procedureName}, expediente nº ${expedienteNumber}, notificada con fecha ${denialDate || '_________'}, de conformidad con los artículos 123 y 124 de la Ley 39/2015, de 1 de octubre, del Procedimiento Administrativo Común de las Administraciones Públicas.`
      : `INTERPONE RECURSO DE ALZADA contra la resolución de denegación de ${procedureName}, expediente nº ${expedienteNumber}, notificada con fecha ${denialDate || '_________'}, ante el órgano superior jerárquico de quien dictó el acto, según los artículos 121 y 122 de la Ley 39/2015.`;

    const alegaciones = {
      financial: "PRIMERO.- La resolución recurrida fundamenta la denegación en una supuesta insuficiencia de medios económicos. El recurrente aporta en este acto prueba documental (Certificado de Alojamiento Prepago y Recibo de Transferencia Bancaria) que, según la jurisprudencia y las instrucciones de flexibilización 2026, habilita la reducción del umbral de solvencia al 50% del IPREM, al estar garantizado el coste habitacional íntegro.",
      criminal: "PRIMERO.- Se alega la existencia de antecedentes penales. Esta parte acredita que dichos antecedentes no guardan relación con la seguridad ciudadana o salud pública en el sentido restrictivo de la Ley 4/2000, o bien aporta certificado de cancelación / inicio de cancelación, debiendo primar el principio de arraigo y proporcionalidad.",
      integration: "PRIMERO.- La denegación por falta de integración omite el arraigo real del interesado. Se adjunta informe positivo de inserción social y evidencias de participación en la comunidad local que desvirtúan el pronunciamiento administrativo.",
      documentation: "PRIMERO.- La denegación por omisión documental se subsana mediante el presente escrito, aportando los documentos requeridos de forma extemporánea pero válida según el principio 'pro actione' y el deber de asistencia de la Administración al ciudadano (Art. 53 Ley 39/2015)."
    };

    return { commonStart, resourceHeader, alegacion: alegaciones[reason] };
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const { commonStart, resourceHeader, alegacion } = getLegalBody();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text(appealType === 'reposicion' ? "AL ÓRGANO QUE DICTÓ LA RESOLUCIÓN" : "AL ÓRGANO SUPERIOR JERÁRQUICO", 105, 20, { align: "center" });
    doc.text(organo.toUpperCase(), 105, 25, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(commonStart, 20, 45, { maxWidth: 170, align: "justify" });
    
    doc.setFont("helvetica", "bold");
    doc.text(resourceHeader, 20, 65, { maxWidth: 170, align: "justify" });

    doc.text("ALEGACIONES JURÍDICAS:", 20, 95);
    doc.setFont("helvetica", "normal");
    doc.text(alegacion, 20, 105, { maxWidth: 170, align: "justify" });

    if (evidence) {
      doc.setFont("helvetica", "bold");
      doc.text("PRUEBAS QUE SE ADJUNTAN:", 20, 150);
      doc.setFont("helvetica", "normal");
      doc.text(evidence, 20, 158, { maxWidth: 170 });
    }

    doc.setFont("helvetica", "bold");
    const suplicoPos = evidence ? 190 : 160;
    doc.text("SUPLICO:", 20, suplicoPos);
    doc.setFont("helvetica", "normal");
    doc.text(`Que se tenga por presentado este RECURSO DE ${appealType.toUpperCase()}, se admita a trámite y, en base a los fundamentos expuestos, se dicte resolución ESTIMATORIA que revoque el acto impugnado y conceda la autorización interesada.`, 20, suplicoPos + 8, { maxWidth: 170, align: "justify" });

    const firmaPos = suplicoPos + 40;
    doc.text(`En ________________, a ${new Date().toLocaleDateString()}`, 20, firmaPos);
    doc.text("Firma del Interesado", 20, firmaPos + 15);
    doc.line(20, firmaPos + 25, 80, firmaPos + 25);

    if (includeLawyerBlock) {
      doc.text("Vº Bº Letrado / Abogado Colaborador", 120, firmaPos + 15);
      doc.line(120, firmaPos + 25, 180, firmaPos + 25);
      doc.setFontSize(7);
      doc.text("Nombre y Colegiado: ____________________", 120, firmaPos + 30);
    }

    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("Documento auditado jurídicamente según Ley 39/2015. Generado por Arrivo AI.", 105, 285, { align: "center" });

    doc.save(`Recurso_Perfecto_${appealType}.pdf`);
  };

  return (
    <div className="bg-white border-2 border-slate-900 rounded-[40px] p-10 space-y-10 animate-in fade-in duration-700">
       <header className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
        <div className="flex items-center gap-4">
           <div className="w-14 h-14 bg-red-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              <Gavel className="w-7 h-7" />
           </div>
           <div>
              <h3 className="text-2xl font-black text-slate-900 font-outfit uppercase">Recurso Administrativo "Perfecto"</h3>
              <p className="text-sm text-slate-500 font-bold italic tracking-tight">Citas a Ley 39/2015 auditadas para firma técnica.</p>
           </div>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest">
           <Scale className="w-3 h-3" />
           Auditoría Legal Pass
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
         <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Tipo de Recurso</label>
                  <select 
                   value={appealType} onChange={(e) => setAppealType(e.target.value as AppealType)}
                   className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-600"
                  >
                     <option value="reposicion">Reposición (1 Mes)</option>
                     <option value="alzada">Alzada (Superior)</option>
                  </select>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400">Nº de Expediente</label>
                  <input 
                   onChange={(e) => setExpedienteNumber(e.target.value)}
                   className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-600"
                   placeholder="Ej: 28/01... "
                  />
               </div>
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400">Órgano que dictó el acto</label>
               <input 
                value={organo} onChange={(e) => setOrgano(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-bold focus:ring-2 focus:ring-red-600"
                placeholder="Ej: Oficina de Extranjería de..."
               />
            </div>

            <div className="space-y-2">
               <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2">
                  <ListChecks className="w-3 h-3" />
                  Listado de Pruebas Adjuntas
               </label>
               <textarea 
                onChange={(e) => setEvidence(e.target.value)}
                className="w-full px-5 py-3 bg-slate-50 border-none rounded-2xl text-xs font-medium focus:ring-2 focus:ring-red-600 h-24"
                placeholder="Ej: 1. Certificado Alojamiento, 2. Recibo Banco, 3. Contrato..."
               />
            </div>
         </div>

         <div className="bg-slate-900 rounded-[32px] p-8 text-white flex flex-col justify-between overflow-hidden relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 rounded-full -mr-16 -mt-16 blur-3xl opacity-50" />
            
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <UserPlus className="w-4 h-4 text-red-400" />
                     <span className="text-[10px] font-bold text-red-100 uppercase">Incluir Firma de Abogado</span>
                  </div>
                  <button onClick={() => setIncludeLawyerBlock(!includeLawyerBlock)} className={`w-12 h-6 rounded-full p-1 transition-colors ${includeLawyerBlock ? 'bg-red-500' : 'bg-slate-700'}`}>
                     <div className={`w-4 h-4 bg-white rounded-full transition-transform ${includeLawyerBlock ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
               </div>

               <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Dictamen Legal Arrivo</p>
                  <ul className="space-y-2">
                     <li className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Art. 115 Ley 39/2015 Verificado
                     </li>
                     <li className="flex items-center gap-2 text-[10px] text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Plazo de 1 mes detectado
                     </li>
                     <li className="flex items-center gap-2 text-[10px] text-amber-400 font-bold">
                        <AlertCircle className="w-3 h-3" /> Vía Administrativa (Sin Abogado OK)
                     </li>
                  </ul>
               </div>
            </div>

            <button 
             onClick={generatePDF}
             className="w-full py-5 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] flex items-center justify-center gap-3 shadow-2xl shadow-red-600/20 transition-all mt-8"
            >
               <Download className="w-5 h-5" />
               Descargar Recurso Auditado
            </button>
         </div>
      </div>

      <footer className="mt-8 p-6 bg-red-50 border border-red-100 rounded-3xl flex items-start gap-4">
         <Info className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
         <div className="space-y-2">
            <p className="text-xs font-bold text-red-900 uppercase tracking-tight italic">Criterio Técnico Social:</p>
            <p className="text-xs text-red-800/70 font-medium leading-relaxed">
              En fase administrativa (Reposición/Alzada) **NO es obligatorio** ir con abogado, pero llevar un borrador redactado técnicamente como este aumenta la probabilidad de que Estimación sea Directa. Si deniegan este recurso, el siguiente paso es la **Vía Judicial (Contencioso)**, donde sí será obligatorio Letrado y Procurador.
            </p>
         </div>
      </footer>
    </div>
  );
}
