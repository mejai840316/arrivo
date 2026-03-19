'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Compass, Globe2 } from 'lucide-react';
import RecomendadorWizard from './RecomendadorWizard';
import InternationalMode from './InternationalMode';

export default function DashboardTabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState('resumen');

  return (
    <div className="space-y-8">
      {/* Pestañas de Navegación */}
      <div className="flex p-1 bg-white border border-slate-200 rounded-2xl w-fit shadow-sm">
        <button
          onClick={() => setActiveTab('resumen')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
            activeTab === 'resumen'
              ? 'bg-blue-900 text-white shadow-md'
              : 'text-slate-500 hover:text-blue-900 hover:bg-slate-50'
          }`}
        >
          <LayoutDashboard className="w-4 h-4" />
          Mi Expediente
        </button>
        <button
          onClick={() => setActiveTab('recomendador')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
            activeTab === 'recomendador'
              ? 'bg-blue-900 text-white shadow-md'
              : 'text-slate-500 hover:text-blue-900 hover:bg-slate-50'
          }`}
        >
          <Compass className="w-4 h-4" />
          Encontrar Trámite
        </button>
        <button
          onClick={() => setActiveTab('internacional')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
            activeTab === 'internacional'
              ? 'bg-blue-900 text-white shadow-md'
              : 'text-slate-500 hover:text-blue-900 hover:bg-slate-50'
          }`}
        >
          <Globe2 className="w-4 h-4" />
          Modo Internacional
        </button>
      </div>

      {/* Contenido Dinámico */}
      <div className="min-h-[500px]">
        {activeTab === 'resumen' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {children}
          </div>
        )}
        
        {activeTab === 'recomendador' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
            <RecomendadorWizard />
          </div>
        )}

        {activeTab === 'internacional' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <InternationalMode />
          </div>
        )}
      </div>
    </div>
  );
}
