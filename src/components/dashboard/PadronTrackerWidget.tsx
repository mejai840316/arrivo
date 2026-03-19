'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, AlertTriangle, Download, CheckCircle2 } from 'lucide-react';
import jsPDF from 'jspdf';

export default function PadronTrackerWidget() {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [daysElapsed, setDaysElapsed] = useState<number>(0);

  useEffect(() => {
    // Si ya hay una fecha en el estado inicial (simulando que la traes de Supabase)
    const storedDate = localStorage.getItem('fecha_solicitud_padron');
    if (storedDate) {
      setSelectedDate(storedDate);
    }
  }, []);

  useEffect(() => {
    if (selectedDate) {
      const start = new Date(selectedDate);
      const today = new Date();
      const diffTime = Math.abs(today.getTime() - start.getTime());
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setDaysElapsed(diffDays);
    }
  }, [selectedDate]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(e.target.value);
    localStorage.setItem('fecha_solicitud_padron', e.target.value);
    // TODO: Await supabase.from('profiles').update({ fecha_solicitud_padron: e.target.value }).eq('id', user.id)
  };

  const progreso = Math.min((daysElapsed / 90) * 100, 100);
  
  // Lógica de colores del Prompt
  const getColorScheme = () => {
    if (daysElapsed < 30) return { bg: 'bg-emerald-50', text: 'text-emerald-600', stroke: 'stroke-emerald-500', bar: 'bg-emerald-500' };
    if (daysElapsed < 90) return { bg: 'bg-amber-50', text: 'text-amber-600', stroke: 'stroke-amber-500', bar: 'bg-amber-500' };
    return { bg: 'bg-red-50', text: 'text-red-600', stroke: 'stroke-red-500', bar: 'bg-red-600' }; // ALERT
  };

  const scheme = getColorScheme();
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progreso / 100) * circumference;

  const generateSilencioPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.text("AL AYUNTAMIENTO - NEGOCIADO DE PADRÓN", 20, 30);
    doc.setFont("helvetica", "normal");
    doc.text("Asunto: Reclamación de Certificado por Silencio Administrativo Positivo\n\nCon fecha " + new Date(selectedDate).toLocaleDateString() + " presenté solicitud de alta.\nAl haber transcurrido los 3 meses legales sin resolución expresa, solicito que\nse proceda a mi Alta amparándome en la Resolución de 17 de febrero de 2020.", 20, 50);
    doc.save("Silencio_Administrativo_Padron.pdf");
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-full">
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
        <h3 className="font-extrabold text-white flex items-center gap-2">
          <CalendarIcon className="w-5 h-5 text-blue-400" />
          Cronómetro de Derechos
        </h3>
        <span className="text-[10px] bg-blue-500/20 text-blue-300 px-2 py-1 rounded font-bold uppercase tracking-widest border border-blue-500/30">Padrón Tracker</span>
      </div>

      <div className="p-6 flex-1 flex flex-col items-center justify-center relative">
        {!selectedDate ? (
          <div className="text-center space-y-4 w-full">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle className="w-8 h-8 text-blue-500" />
            </div>
            <h4 className="font-bold text-slate-800 text-lg leading-tight">¿Cuándo entregaste tus papeles en el Ayuntamiento?</h4>
            <p className="text-sm font-medium text-slate-500">Activa tu cronómetro para garantizar tu Silencio Positivo.</p>
            <input 
              type="date" 
              onChange={handleDateChange}
              max={new Date().toISOString().split("T")[0]}
              className="w-full mt-4 border border-slate-300 rounded-xl px-4 py-3 text-sm text-center font-bold focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100" 
            />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
            {daysElapsed >= 90 && (
              <div className="absolute inset-0 bg-red-50/50 z-0 animate-pulse rounded-b-3xl pointer-events-none"></div>
            )}
            
            <div className="relative z-10 w-48 h-48 mb-6 mt-4">
              {/* Circular Progress SVG */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r={radius} className="stroke-slate-100" strokeWidth="8" fill="transparent" />
                <circle 
                  cx="50" cy="50" r={radius} 
                  className={`${scheme.stroke} transition-all duration-1000 ease-out`} 
                  strokeWidth="8" fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={strokeDashoffset} 
                  strokeLinecap="round" 
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-extrabold ${scheme.text}`}>{daysElapsed}</span>
                <span className={`text-xs font-bold uppercase tracking-widest ${scheme.text} opacity-70`}>/ 90 Días</span>
              </div>
            </div>

            <div className="relative z-10 w-full">
              {daysElapsed < 30 && (
                <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl flex items-center gap-3 text-left">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-900 text-sm">Trámite en tiempo legal</h4>
                    <p className="text-xs text-emerald-700/80 font-medium">El ayuntamiento está procesando tu expediente dentro del plazo. Faltan {90 - daysElapsed} días.</p>
                  </div>
                </div>
              )}

              {daysElapsed >= 30 && daysElapsed < 90 && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl flex items-center gap-3 text-left">
                  <AlertTriangle className="w-8 h-8 text-amber-500 shrink-0" />
                  <div>
                    <h4 className="font-bold text-amber-900 text-sm">Vigilancia Activa</h4>
                    <p className="text-xs text-amber-800/80 font-medium">El tiempo pasa. Si la policía no ha tocado a tu puerta, en {90 - daysElapsed} días reclamaremos.</p>
                  </div>
                </div>
              )}

              {daysElapsed >= 90 && (
                <div className="space-y-4">
                  <div className="bg-red-100 border-2 border-red-500 p-4 rounded-xl flex items-center gap-3 text-left shadow-lg">
                    <AlertTriangle className="w-10 h-10 text-red-600 shrink-0 animate-bounce" />
                    <div>
                      <h4 className="font-black text-red-900 text-sm uppercase tracking-wider">¡Plazo Vencido!</h4>
                      <p className="text-xs text-red-800 font-bold">Han superado los 90 días legales. Ya estás empadronado por ley.</p>
                    </div>
                  </div>
                  <button onClick={generateSilencioPDF} className="w-full flex justify-center py-3.5 bg-red-600 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-xl shadow-red-600/20 flex items-center gap-2 ring-4 ring-red-100">
                    <Download className="w-4 h-4" /> ⚠️ CLAIM YOUR RIGHTS
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
