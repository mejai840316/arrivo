'use client';

import React, { useState } from 'react';
import { Gavel, Download, ShieldAlert, FileText, CheckCircle2, Scale, Info } from 'lucide-react';
import jsPDF from 'jspdf';

export default function BankReclamationGenerator({ profile }: { profile: any }) {
  const [bankName, setBankName] = useState('');
  const [officeNumber, setOfficeNumber] = useState('');

  const generateLegalReclamation = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("AL SERVICIO DE RECLAMACIONES DEL BANCO DE ESPAÑA", 105, 20, { align: "center" });
    doc.text(`C/ Alcalá, 48 - 28014 Madrid`, 105, 25, { align: "center" });

    doc.setFontSize(12);
    doc.text("ESCRITO DE RECLAMACIÓN POR DENEGACIÓN DE CUENTA DE PAGO BÁSICA", 20, 40);
    
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    const intro = `D/Dña. ${profile?.full_name || '_________'}, con NIE/Pasaporte número ${profile?.nie || profile?.passport_number || '_________'} y domicilio a efectos de notificaciones en ${profile?.address || '_________'}, ante este Servicio de Reclamaciones de la autoridad supervisora, COMPARECE Y DICE:`;
    doc.text(intro, 20, 50, { maxWidth: 170 });

    doc.setFont("helvetica", "bold");
    doc.text("I. ANTECEDENTES DE HECHO:", 20, 65);
    doc.setFont("helvetica", "normal");
    const hechos = `Con fecha ${new Date().toLocaleDateString()}, el arriba firmante solicitó en la entidad ${bankName || '_________'} (sucursal ${officeNumber || '_________'}) la apertura de una CUENTA DE PAGO BÁSICA, aportando para ello su documento de identidad en vigor y declarando bajo su responsabilidad no poseer otra cuenta de pago en España.\n\nNo obstante, la entidad procedió a la DENEGACIÓN de dicha apertura [seleccionar: por silencio administrativo / por alegar falta de documentación o NIE / sin mediar causa motivada por escrito], vulnerando frontalmente los derechos garantizados por la normativa vigente.`;
    doc.text(hechos, 20, 72, { maxWidth: 170 });

    doc.setFont("helvetica", "bold");
    doc.text("II. FUNDAMENTOS DE DERECHO:", 20, 105);
    doc.setFont("helvetica", "normal");
    const grounds = `PRIMERO.- Directiva 2014/92/UE y Real Decreto-ley 19/2017: Establecen el derecho universal al acceso a servicios bancarios básicos para residentes en la Unión Europea, incluyendo solicitantes de asilo y personas sin permiso de residencia cuya expulsión sea imposible.\n\nSEGUNDO.- Infracción de la Orden ECE/228/2019: La entidad ha incumplido la obligación de dictar resolución motivada por escrito en el plazo de 10 días desde la solicitud de apertura.\n\nTERCERO.- Criterio del SEPBLAC y Ley 10/2010: La normativa de prevención de blanqueo NO habilita a la exclusión financiera sistemática si el cliente aporta identificación válida (pasaporte), siendo la denegación una práctica abusiva sancionable por el Banco de España.`;
    doc.text(grounds, 20, 112, { maxWidth: 170 });

    doc.setFont("helvetica", "bold");
    doc.text("III. SOLICITUD:", 20, 155);
    doc.setFont("helvetica", "normal");
    doc.text("QUE SE TENGA POR PRESENTADO ESTE ESCRITO, y en su virtud, se inste a la entidad reclamada a proceder a la apertura inmediata de la Cuenta de Pago Básica, con aplicación del régimen de gratuidad si procediere por vulnerabilidad, e incoando en su caso el correspondiente expediente sancionador.", 20, 162, { maxWidth: 170 });

    doc.text(`En ________________, a ${new Date().toLocaleDateString()}`, 20, 195);
    doc.text("Firma del Reclamante", 20, 215);
    doc.line(20, 235, 100, 235);

    // Footer Legal
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text("Este borrador ha sido redactado bajo criterios jurídicos de experto en extranjería (BOE 2026). Requiere firma y presentación vía registro o sede electrónica del BdE.", 105, 280, { align: "center" });

    doc.save(`Reclamacion_BdE_${profile?.full_name?.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="bg-white border-4 border-slate-900 rounded-[40px] p-10 space-y-10 shadow-2xl animate-in zoom-in-95 duration-700">
       <header className="flex items-center justify-between gap-6 pb-6 border-b-2 border-slate-50">
          <div className="flex items-center gap-4">
             <div className="w-16 h-16 bg-slate-900 text-white rounded-[24px] flex items-center justify-center">
                <Gavel className="w-8 h-8" />
             </div>
             <div>
                <h3 className="text-2xl font-black text-slate-900 font-outfit uppercase tracking-tighter italic">Acción Legal Arrivo</h3>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Servicio de Reclamaciones del Banco de España</p>
             </div>
          </div>
          <ShieldAlert className="w-12 h-12 text-blue-900 opacity-20" />
       </header>

       <div className="p-6 bg-blue-50/50 rounded-3xl space-y-3 border border-blue-100 italic">
          <p className="text-xs text-blue-900 font-bold leading-relaxed">
            "Como abogado, te informo: El banco comete una infracción grave al negarte la cuenta por ser extranjero. Este documento les obliga a retractarse bajo amenaza de sanción administrativa."
          </p>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Nombre de la Entidad Bancaria</label>
             <input 
              onChange={(e) => setBankName(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none focus:ring-2 focus:ring-blue-900"
              placeholder="Ej: BBVA, Santander, CaixaBank"
             />
          </div>
          <div className="space-y-4">
             <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sucursal / Oficina (Opcional)</label>
             <input 
              onChange={(e) => setOfficeNumber(e.target.value)}
              className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none focus:ring-2 focus:ring-blue-900"
              placeholder="Ej: Oficina 0122 Calle Mayor"
             />
          </div>
       </div>

       <button 
        onClick={generateLegalReclamation}
        className="w-full py-6 bg-slate-900 text-white rounded-3xl font-black uppercase text-xs tracking-[0.3em] hover:bg-blue-900 transition-all flex items-center justify-center gap-5 shadow-2xl shadow-slate-900/40 group"
       >
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-white/20">
             <Scale className="w-5 h-5" />
          </div>
          Redactar Reclamación de Abogado
       </button>

       <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
          <Info className="w-5 h-5 text-slate-400" />
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
             Consejo Legal: Pide siempre que te sellen la copia de tu solicitud al entregarla en la mesa del banco.
          </p>
       </div>
    </div>
  );
}
