'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Clock, CheckCircle2, AlertCircle, ChevronRight, Archive, Trash2, Pencil, Save, X } from 'lucide-react';

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
  const [editingExpediente, setEditingExpediente] = useState<any>(null);

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
    if (confirm('¿Estás seguro de que deseas eliminar este expediente?')) {
      setExpedientes(prev => prev.filter(exp => exp.id !== id));
    }
  };

  const handleEdit = (e: React.MouseEvent, exp: any) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingExpediente({ ...exp });
  };

  const saveEdit = () => {
    setExpedientes(prev => prev.map(exp => exp.id === editingExpediente.id ? editingExpediente : exp));
    setEditingExpediente(null);
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
          <div key={exp.id} className="group bg-white rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
            <div className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative">
              <Link href={`/dashboard/proced/${exp.id}`} className="flex-1 space-y-3 cursor-pointer">
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-extrabold text-blue-900 group-hover:text-blue-700 transition-colors">{exp.tramite}</h3>
                  {getStatusBadge(exp.estado)}
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm font-medium text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 opacity-70" /> Iniciado: {exp.fechaInicio}</span>
                  <span className="hidden sm:inline text-slate-300">•</span>
                  <span className="text-blue-700 bg-blue-50 px-3 py-1 rounded-lg">Fase: {exp.faseActual}</span>
                </div>

                <div className="w-full md:w-64 pt-2">
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-600">Progreso</span>
                    <span className="text-blue-900">{exp.progreso}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${exp.progreso}%` }}></div>
                  </div>
                </div>
              </Link>

              <div className="flex shrink-0 items-center gap-2">
                <button 
                  onClick={(e) => handleEdit(e, exp)}
                  className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
                  title="Editar"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={(e) => handleArchive(e, exp.id)}
                  className="p-2.5 rounded-xl bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-600 transition-all border border-transparent hover:border-red-100"
                  title="Eliminar"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <Link href={`/dashboard/proced/${exp.id}`} className="p-2.5 rounded-xl bg-blue-900 text-white hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/10">
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
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

      {/* Modal de Edición */}
      {editingExpediente && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] w-full max-w-lg shadow-2xl animate-in zoom-in duration-300 overflow-hidden text-left">
            <header className="p-8 bg-slate-50 border-b border-slate-100 flex items-center justify-between">
               <div>
                  <h2 className="text-2xl font-extrabold text-blue-900 font-outfit">Editar Expediente</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Ref: {editingExpediente.id}</p>
               </div>
               <button onClick={() => setEditingExpediente(null)} className="p-2 hover:bg-white rounded-xl transition-colors">
                  <X className="w-5 h-5 text-slate-400" />
               </button>
            </header>
            
            <div className="p-8 space-y-6">
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Nombre del Trámite</label>
                  <input 
                    type="text" 
                    value={editingExpediente.tramite}
                    onChange={(e) => setEditingExpediente({ ...editingExpediente, tramite: e.target.value })}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none font-bold text-slate-800"
                  />
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fecha de Inicio</label>
                    <input 
                      type="text" 
                      value={editingExpediente.fechaInicio}
                      onChange={(e) => setEditingExpediente({ ...editingExpediente, fechaInicio: e.target.value })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none font-bold text-slate-800"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Progreso (%)</label>
                    <input 
                      type="number" 
                      value={editingExpediente.progreso}
                      onChange={(e) => setEditingExpediente({ ...editingExpediente, progreso: parseInt(e.target.value) })}
                      className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none font-bold text-slate-800"
                    />
                  </div>
               </div>
               <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Fase Actual</label>
                  <input 
                    type="text" 
                    value={editingExpediente.faseActual}
                    onChange={(e) => setEditingExpediente({ ...editingExpediente, faseActual: e.target.value })}
                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-900 outline-none font-bold text-slate-800"
                  />
               </div>
            </div>

            <footer className="p-6 bg-slate-50 border-t border-slate-100 flex items-center gap-3">
               <button onClick={() => setEditingExpediente(null)} className="flex-1 px-6 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-slate-100 transition-colors">
                  Cancelar
               </button>
               <button onClick={saveEdit} className="flex-1 px-6 py-4 bg-blue-900 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-blue-800 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/20">
                  <Save className="w-4 h-4" />
                  Guardar
               </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
