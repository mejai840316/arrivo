import React from 'react';
import Link from 'next/link';
import { 
  Home, 
  Gavel, 
  Globe2, 
  MapPin, 
  GraduationCap, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles,
  Bot
} from 'lucide-react';

export const metadata = {
  title: 'Asistentes Arrivo | Arrivo IA',
  description: 'Módulos expertos para guiarte paso a paso por la burocracia española.',
};

export default function AsistentesPage() {
  const assistants = [
    {
      id: 'padron',
      title: 'Modulo de Empadronamiento',
      description: 'Generación de instancias para alta por omisión y tracker de silencio positivo (90 días).',
      icon: <Home className="w-6 h-6" />,
      href: '/dashboard/padron',
      status: 'active',
      badge: 'Esencial'
    },
    {
      id: 'arraigo',
      title: 'Asistente de Arraigo 2026',
      description: 'Diagnóstico de viabilidad para Arraigo Social, Laboral y Formación basado en el nuevo reglamento.',
      icon: <MapPin className="w-6 h-6" />,
      href: '/dashboard/nuevo', // Ya tiene lógica de recomendación
      status: 'active',
      badge: 'IA Activa'
    },
    {
      id: 'nacionalidad',
      title: 'Calculadora de Nacionalidad',
      description: 'Validación de plazos para solicitud de nacionalidad por residencia (Artr. 22 Código Civil).',
      icon: <Globe2 className="w-6 h-6" />,
      href: '/dashboard', // Integrado en Toolbox
      status: 'integrated',
      badge: 'Verificado'
    },
    {
      id: 'estudios',
      title: 'Visado de Estudios (EX-01)',
      description: 'Gestión de prórrogas de estancia, NIE de estudiante y autorización de trabajo.',
      icon: <GraduationCap className="w-6 h-6" />,
      href: '/dashboard/formularios',
      status: 'ready',
      badge: 'Fase 2'
    },
    {
      id: 'recursos',
      title: 'Gestor de Recursos Jurídicos',
      description: 'Generador automático de borradores para recursos de reposición ante denegaciones injustas.',
      icon: <Gavel className="w-6 h-6" />,
      href: '/dashboard', // Integrado en Toolbox
      status: 'integrated',
      badge: 'Pro'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 p-10 rounded-[40px] shadow-2xl relative overflow-hidden text-white">
        <Bot className="absolute -right-12 -bottom-12 w-64 h-64 opacity-5" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-6">
            <Sparkles className="w-3 h-3" />
            Ecosistema de IA Legal
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold font-outfit mb-4 leading-tight">Módulos Asistentes</h1>
          <p className="text-lg text-blue-100/70 font-medium leading-relaxed">
            Hemos fragmentado la burocracia de Extranjería en módulos inteligentes. Cada asistente está entrenado con el BOE 2026 para garantizar el éxito de tu expediente.
          </p>
        </div>
        <div className="relative z-10 p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
           <div className="flex items-baseline gap-2 mb-1">
              <span className="text-4xl font-bold">5</span>
              <span className="text-blue-300 font-bold uppercase text-xs tracking-widest">Asistentes</span>
           </div>
           <p className="text-[10px] text-blue-200/50 font-bold uppercase tracking-tighter">Sincronizados con el Ministerio 🇪🇸</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {assistants.map((asistente) => (
          <Link 
            key={asistente.id}
            href={asistente.href}
            className="group relative bg-white border border-slate-200 p-8 rounded-[32px] hover:border-blue-900 hover:shadow-2xl hover:shadow-blue-900/10 transition-all flex flex-col items-start"
          >
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors shadow-sm ${
              asistente.status === 'active' ? 'bg-blue-900 text-white shadow-blue-900/20' : 'bg-slate-100 text-slate-400'
            }`}>
              {asistente.icon}
            </div>
            
            <span className="absolute top-8 right-8 text-[9px] font-extrabold px-2 py-1 bg-slate-100 text-slate-500 rounded-lg uppercase tracking-widest group-hover:bg-blue-900 group-hover:text-white transition-colors">
              {asistente.badge}
            </span>

            <h3 className="text-xl font-extrabold text-slate-900 font-outfit mb-3 group-hover:text-blue-900 transition-colors">
              {asistente.title}
            </h3>
            <p className="text-sm text-slate-500 font-medium leading-relaxed flex-1 mb-8">
              {asistente.description}
            </p>

            <div className="flex items-center gap-2 text-blue-900 font-bold text-xs uppercase tracking-widest border-t border-slate-100 pt-6 w-full group-hover:border-blue-100 transition-colors">
              Abrir Módulo
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}

        {/* Placeholder for New Assistants */}
        <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-8 rounded-[32px] flex flex-col items-center justify-center text-center opacity-70">
           <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 mb-4 border border-slate-200">
              <ShieldCheck className="w-5 h-5" />
           </div>
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Entrenando nuevos modelos</p>
           <p className="text-[10px] text-slate-300 font-medium">Asilo Político, Reagrupación Familiar…</p>
        </div>
      </div>
    </div>
  );
}
