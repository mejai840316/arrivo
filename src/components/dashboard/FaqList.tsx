'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronDown, BookOpen, AlertCircle } from 'lucide-react';

export interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria: string;
  palabras_clave: string[];
}

interface FaqListProps {
  initialFaqs: FaqItem[];
}

export default function FaqList({ initialFaqs }: FaqListProps) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [openId, setOpenId] = useState<string | null>(null);

  // Obtener categorías únicas
  const categories = useMemo(() => {
    const cats = new Set(initialFaqs.map(f => f.categoria || 'Otro'));
    return ['Todas', ...Array.from(cats)];
  }, [initialFaqs]);

  // Filtrado de FAQs
  const filteredFaqs = useMemo(() => {
    return initialFaqs.filter(faq => {
      const matchCategory = selectedCategory === 'Todas' || (faq.categoria || 'Otro') === selectedCategory;
      const term = search.toLowerCase();
      const matchSearch = 
        faq.pregunta.toLowerCase().includes(term) || 
        faq.respuesta.toLowerCase().includes(term) ||
        (faq.palabras_clave || []).some(kw => kw.toLowerCase().includes(term));
      
      return matchCategory && matchSearch;
    });
  }, [initialFaqs, search, selectedCategory]);

  return (
    <div className="space-y-6">
      {/* Controles de búsqueda y filtros */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <label htmlFor="faq-search" className="sr-only">Buscar preguntas</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Search className="h-5 w-5" />
          </div>
          <input
            id="faq-search"
            type="text"
            className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-xl leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-colors"
            placeholder="Ej. arraigo social, asilo, reagrupación..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="w-full md:w-auto flex overflow-x-auto pb-1 md:pb-0 gap-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-900 text-white shadow-md' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Listado de FAQs */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden divide-y divide-gray-50">
        {filteredFaqs.length === 0 ? (
          <div className="p-10 text-center text-slate-500 flex flex-col items-center">
            <AlertCircle className="h-10 w-10 text-slate-300 mb-3" />
            <p className="font-medium text-sm">No se encontraron resultados para tu búsqueda.</p>
            <p className="text-xs text-slate-400 mt-1">Prueba con palabras clave más generales como "nie" o "pasaporte".</p>
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="group">
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className={`w-full text-left px-6 py-5 flex items-start justify-between gap-4 transition-colors ${
                    isOpen ? 'bg-blue-50/50' : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex gap-4 items-start">
                    <div className={`p-2 rounded-lg shrink-0 mt-0.5 ${isOpen ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors'}`}>
                       <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className={`font-bold transition-colors text-base ${isOpen ? 'text-blue-900' : 'text-gray-900'}`}>
                        {faq.pregunta}
                      </h3>
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <span className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded font-bold uppercase tracking-widest border border-indigo-100">
                          {faq.categoria || 'Otro'}
                        </span>
                        {(faq.palabras_clave || []).slice(0,3).map((kw, i) => (
                          <span key={i} className="text-[10px] text-slate-400 font-medium">#{kw}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <ChevronDown className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 mt-2 ${isOpen ? 'rotate-180 text-blue-600' : ''}`} />
                </button>
                
                {/* Contenido / Respuesta */}
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 bg-blue-50/50">
                    <div className="pl-16 pr-4">
                      <div className="prose prose-sm max-w-none text-slate-700 whitespace-pre-line leading-relaxed border-l-2 border-blue-200 pl-4 py-1">
                        {faq.respuesta}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
