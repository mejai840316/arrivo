'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  Gavel, 
  Globe2, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight
} from 'lucide-react';

export default function AsistentesGrid() {
  const assistants = [
    {
      id: 'padron',
      title: 'Empadronamiento',
      description: 'Generación de instancias oficiales y tracker de silencio positivo.',
      icon: <Home className="w-5 h-5" />,
      href: '/dashboard/padron',
      badge: 'Esencial'
    },
    {
      id: 'arraigo',
      title: 'Arraigo 2026',
      description: 'Diagnóstico de viabilidad para obtención de residencia legal.',
      icon: <MapPin className="w-5 h-5" />,
      href: '/dashboard/nuevo',
      badge: 'IA Activa'
    },
    {
      id: 'nacionalidad',
      title: 'Nacionalidad',
      description: 'Cálculo de plazos y validación de requisitos para ciudadanía.',
      icon: <Globe2 className="w-5 h-5" />,
      href: '/dashboard', 
      badge: 'Verificado'
    },
    {
      id: 'estudios',
      title: 'Estudios (EX-01)',
      description: 'Gestión de prórrogas de estancia y NIE de estudiante.',
      icon: <GraduationCap className="w-5 h-5" />,
      href: '/dashboard/formularios',
      badge: 'Ready'
    },
    {
      id: 'recursos',
      title: 'Centro Recursos',
      description: 'Borradores automáticos para recursos de reposición.',
      icon: <Gavel className="w-5 h-5" />,
      href: '/dashboard',
      badge: 'Pro'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {assistants.map((asistente) => (
        <Link 
          key={asistente.id}
          href={asistente.href}
          className="group bg-white border border-slate-200 p-6 rounded-3xl hover:border-blue-900 hover:shadow-xl hover:shadow-blue-900/5 transition-all flex flex-col items-start"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-900 flex items-center justify-center mb-4 group-hover:bg-blue-900 group-hover:text-white transition-colors">
            {asistente.icon}
          </div>
          
          <span className="text-[8px] font-extrabold px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded uppercase tracking-widest mb-3">
             {asistente.badge}
          </span>

          <h3 className="font-extrabold text-slate-900 font-outfit mb-2">{asistente.title}</h3>
          <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6">{asistente.description}</p>

          <div className="flex items-center gap-2 text-blue-900 font-bold text-[10px] uppercase tracking-widest mt-auto border-t border-slate-100 pt-4 w-full">
            Gestionar módulo
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      ))}
      <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-3xl flex flex-col items-center justify-center text-center opacity-60">
           <ShieldCheck className="w-8 h-8 text-slate-400 mb-2" />
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Nuevos Asistentes en Entrenamiento</p>
      </div>
    </div>
  );
}
