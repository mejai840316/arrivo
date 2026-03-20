'use client';

import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Plus
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  category: 'Identidad' | 'Vivienda' | 'Económico' | 'Salud';
  status: 'verified' | 'pending' | 'rejected';
  date: string;
}

export default function DocumentVault() {
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', name: 'Pasaporte Completo.pdf', category: 'Identidad', status: 'verified', date: '20 Mar 2026' },
    { id: '2', name: 'Empadronamiento Histórico.pdf', category: 'Vivienda', status: 'pending', date: 'Hoy' },
    { id: '3', name: 'Seguro Médico Sin Copago.pdf', category: 'Salud', status: 'rejected', date: '19 Mar 2026' },
  ]);

  const [isScanning, setIsScanning] = useState(false);

  const categories = [
    { name: 'Identidad', icon: <FileText className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
    { name: 'Vivienda', icon: <UploadCloud className="w-5 h-5" />, color: 'bg-emerald-50 text-emerald-600' },
    { name: 'Económico', icon: <ShieldCheck className="w-5 h-5" />, color: 'bg-amber-50 text-amber-600' },
    { name: 'Salud', icon: <AlertCircle className="w-5 h-5" />, color: 'bg-rose-50 text-rose-600' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsScanning(true);
    
    // Simular escaneo inteligente Arrivo AI
    setTimeout(() => {
      let detectedCategory: Document['category'] = 'Identidad';
      const fileNameUpper = file.name.toUpperCase();
      
      if (fileNameUpper.includes('PASAPORTE') || fileNameUpper.includes('NIE') || fileNameUpper.includes('DNI')) {
        detectedCategory = 'Identidad';
      } else if (fileNameUpper.includes('PADRON') || fileNameUpper.includes('ALQUILER') || fileNameUpper.includes('VIVIENDA')) {
        detectedCategory = 'Vivienda';
      } else if (fileNameUpper.includes('NOMINA') || fileNameUpper.includes('BANCO') || fileNameUpper.includes('TRABAJO') || fileNameUpper.includes('CONTRATO')) {
        detectedCategory = 'Económico';
      } else if (fileNameUpper.includes('SALUD') || fileNameUpper.includes('MEDICO') || fileNameUpper.includes('ENFERMEDAD')) {
        detectedCategory = 'Salud';
      }

      const newDoc: Document = {
        id: Math.random().toString(36).substring(7),
        name: file.name,
        category: detectedCategory,
        status: 'pending',
        date: 'Hoy (Digitalizado)'
      };

      setDocuments([newDoc, ...documents]);
      setIsScanning(false);
    }, 1800);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-slate-400">Vault de Seguridad 256-bit</span>
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 font-outfit tracking-tight">Expediente Digital</h2>
          <p className="text-slate-500 font-medium tracking-tight">Gestiona y garantiza la validez de tus documentos para trámites oficiales.</p>
        </div>
        
        <div className="relative">
          <input 
            type="file" 
            id="vault-upload-main" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={isScanning}
          />
          <label 
            htmlFor="vault-upload-main"
            className={`px-8 py-4 ${isScanning ? 'bg-slate-100 text-slate-400 cursor-wait' : 'bg-slate-900 text-white hover:bg-emerald-600'} font-bold uppercase text-[11px] tracking-widest rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl cursor-pointer`}
          >
            {isScanning ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-white rounded-full animate-spin" />
                Analizando archivo...
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Subir Documento
              </>
            )}
          </label>
        </div>
      </header>

      {/* Category Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <div key={cat.name} className="p-6 bg-white border border-slate-100 rounded-[32px] hover:border-slate-300 transition-all group flex flex-col items-center text-center cursor-pointer">
            <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
               {cat.icon}
            </div>
            <p className="font-bold text-slate-900 text-sm mb-1">{cat.name}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
               {documents.filter(d => d.category === cat.name).length} Archivos
            </p>
          </div>
        ))}
      </div>

      {/* Document List */}
      <div className="bg-white border border-slate-200 rounded-[40px] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
        <div className="p-8 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Archivos Recientes</h3>
            <span className="text-[10px] font-bold text-blue-600 cursor-pointer hover:underline">Ver todo</span>
        </div>
        <div className="divide-y divide-slate-100">
          {documents.map((doc) => (
            <div key={doc.id} className="p-8 flex items-center justify-between hover:bg-slate-50 transition-colors group">
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <FileText className="w-6 h-6" />
                 </div>
                 <div>
                    <p className="font-bold text-slate-900 mb-0.5">{doc.name}</p>
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.category}</span>
                       <span className="w-1 h-1 rounded-full bg-slate-200" />
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{doc.date}</span>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-8">
                 <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                       {doc.status === 'verified' && (
                         <>
                           <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                           <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600">Verificado</span>
                         </>
                       )}
                       {doc.status === 'pending' && (
                         <>
                           <Clock className="w-4 h-4 text-amber-500" />
                           <span className="text-[10px] font-black uppercase tracking-tighter text-amber-600">En Revisión</span>
                         </>
                       )}
                       {doc.status === 'rejected' && (
                         <>
                           <AlertCircle className="w-4 h-4 text-rose-500" />
                           <span className="text-[10px] font-black uppercase tracking-tighter text-rose-600">Rechazado</span>
                         </>
                       )}
                    </div>
                 </div>
                 <button className="p-3 text-slate-300 hover:text-slate-900 transition-colors">
                    <MoreVertical className="w-5 h-5" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Security Footer */}
      <footer className="p-10 bg-slate-900 rounded-[32px] text-white overflow-hidden relative">
         <ShieldCheck className="absolute -right-10 -bottom-10 w-48 h-48 opacity-10" />
         <div className="relative z-10 space-y-4">
            <h4 className="text-xl font-bold font-outfit">Protección Arrivo Premium</h4>
            <p className="text-sm text-slate-400 max-w-xl leading-relaxed">
               Tus documentos están cifrados bajo el estándar 256-bit y almacenados en servidores europeos bajo estricto cumplimiento del RGPD. Solo tú y el abogado asignado tienen acceso.
            </p>
         </div>
      </footer>
    </div>
  );
}
