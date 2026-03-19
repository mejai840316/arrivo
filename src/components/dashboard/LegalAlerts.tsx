'use client';

import React from 'react';
import Link from 'next/link';
import { Bell, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';

const MOCK_ALERTS = [
  {
    id: '1',
    title: 'Nueva resolución sobre Arraigo para la Formación (BOE 20/05/2025)',
    summary: 'Se flexibilizan los requisitos de horas lectivas para cursos del SEPE en el sector transporte.',
    category: 'Arraigo',
    date: 'Hace 2 horas',
    url: 'https://boe.es/...'
  },
  {
    id: '2',
    title: 'Actualización: Visado de Nómada Digital',
    summary: 'Clarificación sobre el seguro de salud privado sin copago para teletrabajadores internacionales.',
    category: 'Visados',
    date: 'Ayer',
    url: 'https://boe.es/...'
  }
];

export const LegalAlerts = () => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-slate-800 italic">Vigilancia Legal Arrivo</h2>
        </div>
        <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
          <ShieldCheck className="w-3 h-3" /> Actualizado al día
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {MOCK_ALERTS.map((alert) => (
          <div key={alert.id} className="p-5 hover:bg-slate-50 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
              <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded tracking-wider">
                {alert.category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1">
                <Calendar className="w-3 h-3" /> {alert.date}
              </span>
            </div>
            <h3 className="font-medium text-slate-900 group-hover:text-blue-700 transition-colors mb-2 text-sm leading-tight">
              {alert.title}
            </h3>
            <p className="text-[11px] text-slate-600 line-clamp-2 mb-3 leading-relaxed">
              {alert.summary}
            </p>
            <a 
              href={alert.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[10px] font-semibold text-slate-400 hover:text-blue-600 flex items-center gap-1 transition-colors"
            >
              Ver en el BOE <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
      
      <div className="p-3 bg-slate-50 text-center border-t border-slate-200">
        <Link href="/dashboard/alertas" className="text-[11px] font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 rounded-sm">
          Ver todas las actualizaciones
        </Link>
      </div>
    </div>
  );
};
