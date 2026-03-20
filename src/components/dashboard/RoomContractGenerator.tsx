'use client';

import React, { useState } from 'react';
import { Home, FileText, User, CreditCard, CheckCircle2, Download, ShieldCheck } from 'lucide-react';
import jsPDF from 'jspdf';

export default function RoomContractGenerator({ profile }: { profile: any }) {
  const [contractData, setContractData] = useState({
    landlordName: '',
    landlordDni: '',
    tenantName: profile?.full_name || '',
    tenantNie: profile?.nie || profile?.passport_number || '',
    address: '',
    roomDescription: 'Habitación individual amueblada',
    monthlyRent: '',
    deposit: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const generateContract = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("CONTRATO DE ARRENDAMIENTO DE HABITACIÓN", 105, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`En la ciudad de ____________________, a ${contractData.startDate}`, 20, 35);

    // Reunidos
    doc.setFont("helvetica", "bold");
    doc.text("REUNIDOS", 20, 45);
    doc.setFont("helvetica", "normal");
    doc.text(`De una parte, D/Dña. ${contractData.landlordName}, con DNI/NIE ${contractData.landlordDni}, en adelante EL ARRENDADOR.`, 20, 52, { maxWidth: 170 });
    doc.text(`De otra parte, D/Dña. ${contractData.tenantName}, con NIE/Pasaporte ${contractData.tenantNie}, en adelante EL ARRENDATARIO.`, 20, 62, { maxWidth: 170 });

    // Expone
    doc.setFont("helvetica", "bold");
    doc.text("EXPONEN", 20, 75);
    doc.setFont("helvetica", "normal");
    doc.text(`Que el ARRENDADOR es propietario/poseedor legal de la vivienda sita en ${contractData.address} y desea ceder el uso de la habitación descrita como: ${contractData.roomDescription}.`, 20, 82, { maxWidth: 170 });

    // Cláusulas
    doc.setFont("helvetica", "bold");
    doc.text("CLÁUSULAS (Régimen Código Civil)", 20, 95);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    
    const clauses = [
      `PRIMERA. OBJETO: El Arrendador cede el uso de la habitación por una renta de ${contractData.monthlyRent} euros mensuales.`,
      `SEGUNDA. DURACIÓN: El contrato tendrá una duración de 12 meses renovables, salvo preaviso de 30 días.`,
      `TERCERA. SUMINISTROS: Los gastos de agua, luz e internet están [X] Incluidos / [ ] No Incluidos.`,
      `CUARTA. EMPADRONAMIENTO: El Arrendador autoriza EXPRESAMENTE al Arrendatario a empadronarse en la vivienda objeto del contrato, facilitando la firma de la hoja de autorización municipal necesaria.`,
      `QUINTA. FIANZA: Se entrega en este acto la cantidad de ${contractData.deposit} euros como garantía.`,
    ];

    let y = 102;
    clauses.forEach(c => {
      doc.text(c, 20, y, { maxWidth: 170 });
      y += 10;
    });

    // Signatures
    doc.text("Firmas:", 20, 200);
    doc.line(20, 230, 80, 230);
    doc.line(130, 230, 190, 230);
    doc.text("EL ARRENDADOR", 40, 235);
    doc.text("EL ARRENDATARIO", 150, 235);

    // Footer
    doc.setFontSize(7);
    doc.text("Documento legal optimizado para Informe de Arraigo Social - App Arrivo 2026", 105, 285, { align: "center" });

    doc.save(`Contrato_Habitacion_${contractData.tenantName.replace(/\s/g, '_')}.pdf`);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-[0_25px_60px_rgba(0,0,0,0.03)] space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full text-[10px] font-black uppercase text-emerald-600 tracking-widest">
                <Home className="w-3 h-3" />
                Blindaje de Empadronamiento
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tighter">Contrato de Habitación</h3>
            <p className="text-slate-500 font-medium italic">Cláusulas especiales de vivienda compartida para obtener tu Padrón.</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-l-2 border-slate-900 pl-4">1. Datos del Propietario (Arrendador)</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    placeholder="Nombre Completo"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                    onChange={(e) => setContractData({...contractData, landlordName: e.target.value})}
                  />
                  <input 
                    placeholder="DNI / NIE"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                    onChange={(e) => setContractData({...contractData, landlordDni: e.target.value})}
                  />
               </div>
               <input 
                  placeholder="Dirección Exacta de la Vivienda (Padronal)"
                  className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                  onChange={(e) => setContractData({...contractData, address: e.target.value})}
               />
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 border-l-2 border-slate-900 pl-4">2. Condiciones Económicas</h4>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    placeholder="Renta Mensual (€)"
                    type="number"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                    onChange={(e) => setContractData({...contractData, monthlyRent: e.target.value})}
                  />
                  <input 
                    placeholder="Fianza (€)"
                    type="number"
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl text-sm font-medium border-none outline-none focus:ring-2 focus:ring-slate-900"
                    onChange={(e) => setContractData({...contractData, deposit: e.target.value})}
                  />
               </div>
            </div>
        </div>

        <div className="bg-slate-50 rounded-[40px] p-10 flex flex-col justify-between">
           <div className="space-y-6">
              <div className="p-6 bg-white rounded-3xl border border-slate-100 space-y-4">
                 <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <p className="text-xs font-black uppercase text-slate-900">Validado paco Padrón 2026</p>
                 </div>
                 <p className="text-[10px] text-slate-500 font-medium leading-relaxed">
                   Este borrador incluye la **Cláusula Cuarta** de autorización explícita para el Empadronamiento, evitando que el Ayuntamiento rechace el trámite por falta de consentimiento del dueño.
                 </p>
              </div>
           </div>

           <button 
             onClick={generateContract}
             className="w-full py-6 bg-slate-900 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.25em] hover:bg-emerald-600 transition-all flex items-center justify-center gap-4 shadow-2xl shadow-slate-900/20 mt-10"
           >
             <Download className="w-5 h-5" />
             Generar Contrato 2026
           </button>
        </div>
      </div>
    </div>
  );
}
