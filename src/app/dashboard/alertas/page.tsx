import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Bell, Calendar, ExternalLink, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Alertas Legales | Arrivo',
  description: 'Historial completo de alertas legales y actualizaciones normativas del BOE.',
};

export default function AlertasPage() {
  const MOCK_ALERTS = [
    {
      id: '1',
      title: 'Reforma: Arraigo para la Formación (BOE 2026)',
      summary: 'Se flexibilizan los requisitos de horas lectivas para cursos del SEPE en el sector transporte de alta demanda.',
      category: 'Reforma',
      date: 'Hace 2h',
      severity: 'critical',
      url: 'https://boe.es'
    },
    {
      id: '2',
      title: 'Actualización IPREM 2026',
      summary: 'El nuevo indicador entra en vigor. Las calculadoras de solvencia requieren demostrar ~600€/mes.',
      category: 'IPREM',
      date: 'Hoy',
      severity: 'warning',
      url: 'https://boe.es'
    },
    {
      id: '3',
      title: 'Estatuto Nómada Digital',
      summary: 'Clarificación sobre coberturas de seguros privados sin copago para residentes extranjeros.',
      category: 'Visados',
      date: 'Ayer',
      severity: 'info',
      url: 'https://boe.es'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto py-16 px-6 space-y-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-400">Vigilancia en Tiempo Real</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">Alertas Legales BOE</h1>
          <p className="text-slate-500 font-medium max-w-xl">Central de inteligencia migratoria con actualizaciones automáticas del Boletín Oficial del Estado.</p>
        </div>
        <Link href="/dashboard" className="px-6 py-3 bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest rounded-xl hover:bg-blue-900 transition-colors">
          Volver al Panel
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_ALERTS.map((alert) => (
          <div key={alert.id} className="group bg-white border border-slate-200 p-8 rounded-[32px] hover:border-slate-900 hover:shadow-2xl hover:shadow-slate-900/5 transition-all flex flex-col md:flex-row md:items-center gap-8">
            <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-2xl min-w-[100px] border border-slate-100 group-hover:bg-slate-900 group-hover:text-white transition-colors">
               <span className="text-[10px] font-black uppercase tracking-tighter opacity-50">{alert.date}</span>
               <Calendar className="w-5 h-5 my-1" />
            </div>
            
            <div className="flex-1 space-y-2">
               <div className="flex items-center gap-3">
                  <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded border ${
                    alert.severity === 'critical' ? 'bg-red-50 text-red-700 border-red-100' :
                    alert.severity === 'warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                    'bg-blue-50 text-blue-700 border-blue-100'
                  }`}>
                    {alert.category}
                  </span>
               </div>
               <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
                 {alert.title}
               </h3>
               <p className="text-sm text-slate-500 font-medium leading-relaxed italic max-w-2xl">
                 "{alert.summary}…"
               </p>
            </div>

            <a 
              href={alert.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all transform hover:rotate-12"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        ))}
      </div>

      <footer className="pt-10 flex items-center justify-center border-t border-slate-100">
         <div className="flex items-center gap-3 px-6 py-3 bg-slate-50 rounded-full border border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Fuente Oficial Verificada: boe.es</span>
         </div>
      </footer>
    </div>
  );
}
