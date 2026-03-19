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
      title: 'Nueva resolución sobre Arraigo para la Formación (BOE 20/05/2025)',
      summary: 'Se flexibilizan los requisitos de horas lectivas para cursos del SEPE en el sector transporte. A partir de ahora, bastará con una duración mínima de 150 horas si el sector cuenta con alta demanda.',
      category: 'Arraigo',
      date: 'Hace 2 horas',
      url: 'https://boe.es/...'
    },
    {
      id: '2',
      title: 'Actualización: Visado de Nómada Digital',
      summary: 'Clarificación sobre el seguro de salud privado sin copago para teletrabajadores internacionales mediante la Dirección General de Migraciones.',
      category: 'Visados',
      date: 'Ayer',
      url: 'https://boe.es/...'
    },
    {
      id: '3',
      title: 'Publicado el nuevo valor del IPREM Anual',
      summary: 'El nuevo indicador entra en vigor el 1 de Enero. Las calculadoras de solvencia para estancias por estudios requieren ahora demostrar un 5% más que el año anterior.',
      category: 'IPREM',
      date: 'Hace 1 mes',
      url: 'https://boe.es/...'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div className="flex items-center justify-between">
           <div>
             <h1 className="text-4xl font-extrabold text-blue-900 font-outfit mb-3">Vigilancia Legal Arrivo</h1>
             <p className="text-slate-600 font-medium">Histórico completo de alertas rojas obtenidas automáticamente del BOE.</p>
           </div>
           <div className="hidden sm:flex w-16 h-16 bg-blue-100 items-center justify-center rounded-3xl shadow-sm text-blue-600">
             <Bell className="w-8 h-8" />
           </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
        <div className="p-4 bg-slate-50 text-xs font-bold text-slate-500 flex items-center justify-center gap-1.5 uppercase tracking-widest border-b border-slate-200">
           <ShieldCheck className="w-4 h-4 text-emerald-500" /> Sincronizado con el Boletín Oficial del Estado
        </div>
        {MOCK_ALERTS.map((alert) => (
          <div key={alert.id} className="p-6 hover:bg-slate-50 transition-colors group">
            <div className="flex justify-between items-start mb-3">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-black uppercase rounded-full tracking-widest">
                {alert.category}
              </span>
              <span className="text-sm font-medium text-slate-400 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> {alert.date}
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-blue-900 transition-colors mb-2">
              {alert.title}
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4 font-medium">
              {alert.summary}
            </p>
            <a 
              href={alert.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex text-xs font-bold text-blue-600 hover:text-white hover:bg-blue-600 px-4 py-2 rounded-lg border border-blue-200 hover:border-transparent items-center gap-1.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2"
            >
              Visitar fuente oficial <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
