'use client';

import React from 'react';
import { ExternalLink, Gavel, BookOpen, CreditCard, Calendar, Landmark } from 'lucide-react';

const resources = [
  {
    title: "RD 1155/2024 (Reglamento)",
    desc: "Manual maestro actualizado. La base de todos los Arraigos 2026.",
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24142",
    icon: <Gavel className="w-5 h-5 text-blue-600" />,
    tag: "Ley"
  },
  {
    title: "Hojas Informativas",
    desc: "Requisitos detallados paso a paso del Ministerio de Inclusión.",
    url: "https://extranjeros.inclusion.gob.es/es/informacionpresentacion/informaciongeneral/index.html",
    icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
    tag: "Guía"
  },
  {
    title: "Modelos 790 (Tasas)",
    desc: "Sede electrónica para el pago telemático de tasas 052 y 012.",
    url: "https://sede.administracionespublicas.gob.es/pagina/index/directorio/tasas_sara",
    icon: <CreditCard className="w-5 h-5 text-amber-600" />,
    tag: "Trámite"
  },
  {
    title: "Citas Electrónicas",
    desc: "Sistema oficial de cita previa para huellas y TIE.",
    url: "https://icp.administracionelectronica.gob.es/icpplus/index.html",
    icon: <Calendar className="w-5 h-5 text-rose-600" />,
    tag: "Presencial"
  },
  {
    title: "Nacionalidad por Residencia",
    desc: "Protocolos y manuales del Ministerio de Justicia.",
    url: "https://www.mjusticia.gob.es/es/ciudadania/nacionalidad/residencia",
    icon: <Landmark className="w-5 h-5 text-indigo-600" />,
    tag: "Justicia"
  }
];

export default function OfficialResources() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-slate-900 font-outfit tracking-tight">Fuentes de Verdad 2026</h3>
          <p className="text-sm text-slate-500 font-medium tracking-tight">Accede directamente a los portales oficiales del Estado.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((res, i) => (
          <a 
            key={i} 
            href={res.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group p-6 sm:p-8 bg-white border border-slate-100 rounded-[32px] hover:border-slate-300 transition-all hover:bg-slate-50/50 flex flex-col h-full"
          >
            <div className="flex items-center justify-between mb-6">
               <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                  {res.icon}
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-50 px-3 py-1 rounded-full">{res.tag}</span>
            </div>
            <h4 className="font-bold text-slate-900 mb-2 font-outfit text-lg group-hover:text-blue-700 transition-colors">
              {res.title}
            </h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-6 flex-1">
              {res.desc}
            </p>
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 opacity-60 group-hover:opacity-100 transition-opacity">
               Visitar Portal Oficial
               <ExternalLink className="w-3 h-3" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
