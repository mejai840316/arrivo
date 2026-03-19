'use client';

import React, { useState } from 'react';
import { LayoutDashboard, Compass, Globe2, UserCircle } from 'lucide-react';
import RecomendadorWizard from './RecomendadorWizard';
import InternationalMode from './InternationalMode';
import ProfileWizard from './ProfileWizard';

export default function DashboardTabs({ children, isProfileComplete }: { children: React.ReactNode, isProfileComplete?: boolean }) {
  const [activeTab, setActiveTab] = useState(isProfileComplete ? 'resumen' : 'perfil');

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
        <button
          onClick={() => setActiveTab('perfil')}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 ${
            activeTab === 'perfil'
              ? 'bg-emerald-600 text-white shadow-md' // Distinct color for profile
              : 'text-slate-500 hover:text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          <UserCircle className="w-4 h-4" />
          Mi Perfil {!isProfileComplete && <span className="w-2 h-2 rounded-full bg-red-500 ml-1 shadow-sm"></span>}
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

        {activeTab === 'perfil' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto py-8">
            <ProfileWizard />
          </div>
        )}
      </div>
    </div>
  );
}
