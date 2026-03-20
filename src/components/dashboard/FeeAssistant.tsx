'use client';

import React, { useState } from 'react';
import { CreditCard, Download, Info, CheckCircle2, Calculator } from 'lucide-react';
import jsPDF from 'jspdf';
import { LEGAL_CONFIG } from '@/lib/legal-config';

const TASA_RATES = LEGAL_CONFIG.FEES;

export default function FeeAssistant({ profile }: { profile: any }) {
  const [selectedTasa, setSelectedTasa] = useState<keyof typeof TASA_RATES>('ARRAIGO');
  const [isGenerating, setIsGenerating] = useState(false);

  const generate790 = () => {
    setIsGenerating(true);
    const doc = new jsPDF();
    const rate = TASA_RATES[selectedTasa];

    // Institutional Header
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 15, 'F');
    doc.setFontSize(8);
    doc.setTextColor(255, 255, 255);
    doc.text("MINISTERIO DE INCLUSIÓN, SEGURIDAD SOCIAL Y MIGRACIONES - MODELO 790 CÓDIGO 052", 105, 10, { align: "center" });

    doc.setTextColor(0,0,0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("AUTOLIQUIDACIÓN DE TASAS DE EXTRANJERÍA", 20, 25);

    // Section 1: Identificación
    doc.setFillColor(245, 247, 250);
    doc.rect(20, 35, 170, 8, 'F');
    doc.setFontSize(9);
    doc.text("1. IDENTIFICACIÓN DEL SUJETO PASIVO", 25, 40);

    const drawField = (label: string, val: string, x: number, y: number, w: number) => {
       doc.setFontSize(7);
       doc.text(label.toUpperCase(), x, y - 1);
       doc.rect(x, y, w, 8);
       doc.setFontSize(9);
       doc.text(val || ' ', x + 2, y + 5.5);
    };

    drawField("NIE / Pasaporte", profile?.nie || profile?.passport_number || '', 20, 48, 50);
    drawField("Apellidos y Nombre", profile?.full_name || '', 75, 48, 115);
    drawField("Domicilio", profile?.domicilio || '', 20, 63, 115);
    drawField("Provincia", profile?.provincia || '', 140, 63, 50);

    // Section 2: Devengo
    doc.setFillColor(245, 247, 250);
    doc.rect(20, 80, 170, 8, 'F');
    doc.text("2. DEVENGO Y TASAS (REFORMA 2026)", 25, 85);

    doc.setFontSize(10);
    doc.text(`[X] EPÍGRAFE ${rate.code}: ${rate.label}`, 20, 95);
    
    // Total
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.rect(140, 110, 50, 12);
    doc.text("TOTAL A PAGAR:", 100, 118);
    doc.text(`${rate.amount} €`, 155, 118);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("Documento generado por Arrivo IA para fines informativos y de ayuda.", 20, 140);
    doc.text("Recuerde validar físicamente en su entidad bancaria o vía pasarela AEAT.", 20, 144);

    doc.save(`Tasa_790_052_${selectedTasa}_${profile?.full_name?.replace(/\s/g, '_')}.pdf`);
    
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-[0_25px_60px_rgba(0,0,0,0.03)] space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full text-[10px] font-black uppercase text-amber-600 tracking-widest">
                <CreditCard className="w-3 h-3" />
                Validación de Tasas AEAT 2026
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tighter">Asistente Modelo 790-052</h3>
            <p className="text-slate-500 font-medium italic">Sin el pago de la tasa, tu expediente será inadmitido de inmediato.</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Calculator className="w-5 h-5 text-slate-400" />
            <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Importe Estimado</p>
                <p className="text-xl font-black text-slate-900 font-outfit">{TASA_RATES[selectedTasa].amount}€</p>
            </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
            <label className="text-[11px] font-black uppercase tracking-[0.15em] text-slate-400">Selecciona tu Trámite Oficial</label>
            <div className="space-y-3">
                {Object.keys(TASA_RATES).map((key) => (
                    <button
                        key={key}
                        onClick={() => setSelectedTasa(key as any)}
                        className={`w-full p-6 rounded-3xl border-2 text-left transition-all flex items-center justify-between group ${
                            selectedTasa === key ? 'bg-slate-900 border-slate-900 text-white shadow-2xl scale-[1.02]' : 'bg-white border-slate-100 hover:border-slate-300'
                        }`}
                    >
                        <div>
                            <p className={`font-bold text-sm ${selectedTasa === key ? 'text-white' : 'text-slate-800'}`}>
                                {TASA_RATES[key as keyof typeof TASA_RATES].label}
                            </p>
                            <p className={`text-[10px] font-medium ${selectedTasa === key ? 'text-slate-400' : 'text-slate-400'}`}>
                                Epígrafe {TASA_RATES[key as keyof typeof TASA_RATES].code}
                            </p>
                        </div>
                        {selectedTasa === key && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                    </button>
                ))}
            </div>
        </div>

        <div className="bg-slate-50 rounded-[32px] p-8 flex flex-col justify-between">
            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                        <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                        <h4 className="font-bold text-sm text-slate-900 mb-1">Pre-llenado Automático</h4>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">
                            Hemos usado tus datos institucionales (**{profile?.full_name || 'Nombre no definido'}**) para rellenar los campos de identificación del modelo 790-052 de la AEAT. 
                        </p>
                    </div>
                </div>
                <div className="p-5 bg-blue-50/50 rounded-2xl border border-blue-100">
                    <p className="text-[10px] text-blue-900 font-black uppercase tracking-widest mb-1 italic">Nota Importante</p>
                    <p className="text-[10px] text-blue-800 font-medium leading-relaxed">
                        Este documento es un borrador inteligente. Deberás presentarlo en ventanilla bancaria o usar el código impreso para el pago telemático en la web de la AEAT.
                    </p>
                </div>
            </div>

            <button 
                onClick={generate790}
                disabled={isGenerating}
                className={`w-full py-6 rounded-3xl font-black uppercase text-[11px] tracking-[0.25em] transition-all flex items-center justify-center gap-4 ${
                    isGenerating ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-2xl shadow-blue-600/20'
                }`}
            >
                {isGenerating ? 'Generando PDF...' : (
                    <>
                        <Download className="w-4 h-4" />
                        Descargar Tasa Prelenada
                    </>
                )}
            </button>
        </div>
      </div>
    </div>
  );
}
