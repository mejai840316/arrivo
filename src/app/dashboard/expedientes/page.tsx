'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, CheckCircle2, AlertCircle, ChevronRight, Archive, Trash2 } from 'lucide-react';

const INITIAL_EXPEDIENTES = [
  {
    id: '1',
    tramite: 'Arraigo Social',
    estado: 'en_proceso',
    faseActual: 'Reuniendo documentación',
    fechaInicio: '15/03/2026',
    progreso: 35,
  },
  {
    id: '2',
    tramite: 'Estancia por Estudios',
    estado: 'completado',
    faseActual: 'Tarjeta TIE obtenida',
    fechaInicio: '10/08/2025',
    progreso: 100,
  }
];

export default function ExpedientesPage() {
  const [expedientes, setExpedientes] = useState(INITIAL_EXPEDIENTES);

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'en_proceso':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full"><Clock className="w-3.5 h-3.5" /> En Proceso</span>;
      case 'completado':
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full"><CheckCircle2 className="w-3.5 h-3.5" /> Completado</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-full"><AlertCircle className="w-3.5 h-3.5" /> Pendiente</span>;
    }
  };

  const handleArchive = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    e.stopPropagation();
    // Animación / Lógica optimista
    setExpedientes(prev => prev.filter(exp => exp.id !== id));
    // Aquí iría el fetch a Supabase para marcar como archivado/eliminado
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
           <div>
             <h1 className="text-4xl font-extrabold text-blue-900 font-outfit mb-2">Mis Expedientes</h1>
             <p className="text-slate-600 font-medium">Gestiona y consulta el estado de todos tus procesos migratorios.</p>
           </div>
           <Link href="/dashboard/nuevo" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-900 text-white rounded-xl font-bold hover:bg-blue-800 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2">
              <FileText className="w-4 h-4" />
              Nuevo Trámite
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {expedientes.map((exp) => (
          <div key={exp.id} className="relative group block rounded-2xl">
            <Link href={`/dashboard/proced/${exp.id}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2 rounded-2xl">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 group-hover:border-blue-300 group-hover:shadow-md transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-extrabold text-blue-900">{exp.tramite}</h3>
                    {getStatusBadge(exp.estado)}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-medium text-slate-500">
                    <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-70" /> Iniciado: {exp.fechaInicio}</span>
                    <span className="hidden sm:inline text-slate-300">•</span>
                    <span className="text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">Fase: {exp.faseActual}</span>
                  </div>
                </div>

                <div className="w-full md:w-64 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-600">Progreso</span>
                    <span className="text-blue-900">{exp.progreso}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${exp.progreso}%` }}></div>
                  </div>
                </div>

                <div className="hidden md:flex shrink-0 items-center gap-3">
                  <button 
                    onClick={(e) => handleArchive(e, exp.id)}
                    className="p-2.5 rounded-full text-slate-300 hover:bg-red-50 hover:text-red-600 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
                    title="Archivar Trámite"
                  >
                    <Trash2 className="w-5 h-5 z-10 relative" />
                  </button>
                  <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center text-slate-400 group-hover:text-blue-900 transition-colors">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>

              </div>
            </Link>
            
            {/* Versión mobile de borrar */}
            <button 
              onClick={(e) => handleArchive(e, exp.id)}
              className="absolute top-4 right-4 md:hidden p-2 rounded-full text-slate-300 hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}
        
        {expedientes.length === 0 && (
          <div className="text-center py-20 bg-slate-50 border border-slate-200 rounded-2xl border-dashed">
            <AlertCircle className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-600 mb-2">No tienes expedientes activos</h3>
            <p className="text-slate-500 mb-6">Inicia tu primer trámite usando nuestro recomendador inteligente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
