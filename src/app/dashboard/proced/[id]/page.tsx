import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Circle, FileText, AlertTriangle, MessageSquare, Download, Clock } from 'lucide-react';

export default async function ProcedimientoDetallePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id;
  
  // En producción, aquí harías un fetch a la DB.
  // Ej: const { data: exp } = await supabase.from('expedientes').select().eq('id', id);

  const fases = [
    { title: 'Evaluación Inicial', status: 'completed', date: '15/03/2026', description: 'Viabilidad evaluada por nuestro equipo.' },
    { title: 'Reuniendo documentación', status: 'current', date: '', description: 'Debes subir tu pasaporte completo y antecedentes.' },
    { title: 'Revisión Legal', status: 'pending', date: '', description: 'Nuestros abogados revisan que todo esté correcto.' },
    { title: 'Presentación', status: 'pending', date: '', description: 'Envío oficial de tu expediente a Extranjería.' },
    { title: 'Resolución', status: 'pending', date: '', description: 'Esperando respuesta de la oficina.' }
  ];

  return (
    <div className="max-w-5xl mx-auto py-12 px-4 space-y-8">
      <div>
        <Link href="/dashboard/expedientes" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" /> Volver a Expedientes
        </Link>
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold rounded-full mb-4">
              <Clock className="w-3.5 h-3.5" /> En Proceso — Exp. #ARR-{id}
            </div>
            <h1 className="text-4xl font-extrabold text-blue-900 font-outfit mb-2">Arraigo Social Múltiple</h1>
            <p className="text-slate-600 font-medium text-lg">Iniciado el 15/03/2026</p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-6 py-2.5 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2">
              <MessageSquare className="w-4 h-4" /> Hablar con Asesor
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Timeline / Fase Actual */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-extrabold text-blue-900 mb-8 border-b border-slate-100 pb-4">Progreso del Expediente</h2>
            
            <div className="space-y-8">
              {fases.map((fase, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      fase.status === 'completed' ? 'bg-emerald-100 text-emerald-600' :
                      fase.status === 'current' ? 'bg-blue-600 text-white ring-4 ring-blue-100' :
                      'bg-slate-100 text-slate-300'
                    }`}>
                      {fase.status === 'completed' ? <CheckCircle2 className="w-5 h-5" /> : 
                       fase.status === 'current' ? <span className="w-2.5 h-2.5 bg-white rounded-full"></span> :
                       <Circle className="w-4 h-4" />}
                    </div>
                    {i !== fases.length - 1 && (
                      <div className={`w-0.5 h-16 mt-2 ${fase.status === 'completed' ? 'bg-emerald-200' : 'bg-slate-100'}`}></div>
                    )}
                  </div>
                  
                  <div className="flex-1 pb-4">
                    <h3 className={`text-lg font-bold ${
                      fase.status === 'completed' ? 'text-slate-900' :
                      fase.status === 'current' ? 'text-blue-900' :
                      'text-slate-400'
                    }`}>{fase.title}</h3>
                    <p className={`text-sm mt-1 ${fase.status === 'current' ? 'text-slate-600 font-medium' : 'text-slate-500'}`}>{fase.description}</p>
                    {fase.date && <p className="text-xs text-slate-400 mt-2 font-medium">{fase.date}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel Lateral: Documentos */}
        <div className="space-y-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
             <h3 className="flex items-center gap-2 text-lg font-extrabold text-blue-900 mb-4 tracking-tight"><FileText className="w-5 h-5" /> Tus Documentos</h3>
             <ul className="space-y-3">
               <li className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-700 truncate">Pasaporte.pdf</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Subido</p>
                  </div>
               </li>
               <li className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-xl relative overflow-hidden group cursor-pointer hover:border-blue-400 transition-colors">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-blue-900 truncate">Padrón Histórico</p>
                    <p className="text-[10px] text-amber-600 uppercase tracking-widest font-bold">Requiere Acción</p>
                  </div>
                  <div className="absolute inset-0 bg-blue-900/5 items-center justify-end px-4 hidden group-hover:flex">
                     <span className="text-xs font-bold text-blue-900">Subir +</span>
                  </div>
               </li>
             </ul>
             
             <button className="w-full mt-6 py-3 bg-blue-900 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:ring-offset-2">
               Subir Archivo Pendiente
             </button>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm text-center">
             <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
               <Download className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-800 mb-2">Formularios Oficiales</h3>
             <p className="text-xs text-slate-500 font-medium mb-4">Descarga el modelo EX-10 autocompletado con tus datos.</p>
             <button className="text-sm font-bold text-blue-600 hover:text-blue-800 underline transition-colors focus-visible:outline-none">
               Descargar EX-10.pdf
             </button>
          </div>
        </div>

      </div>
    </div>
  );
}
