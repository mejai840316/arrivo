'use client';

import React, { useState } from 'react';
import { UserCheck, MessageSquare, Star, ArrowRight, ShieldAlert, History } from 'lucide-react';

const INTERVIEW_QUESTIONS = [
  "¿Cuánto tiempo lleva viviendo en este municipio y qué actividades realiza aquí?",
  "¿Ha realizado algún curso de formación o idioma (Castellano/Catalán/Euskera) en el último año?",
  "¿Tiene familiares con residencia legal en España o hijos escolarizados?",
  "¿Cómo es su relación con los vecinos y qué asociaciones del barrio conoce?",
  "Explíqueme sobre su oferta de trabajo: ¿Sabe qué funciones realizará y cuál será su salario?"
];

export default function ArraigoInterviewSimulator() {
  const [currentStep, setCurrentStep] = useState(-1); // -1 = Not started
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const startSimulation = () => setCurrentStep(0);

  const handleNext = () => {
    setAnswers([...answers, currentAnswer]);
    setCurrentAnswer("");
    if (currentStep < INTERVIEW_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setIsFinished(true);
      }, 2000);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-[40px] p-12 shadow-[0_30px_90px_rgba(0,0,0,0.05)] space-y-10 animate-in fade-in duration-1000">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-slate-100">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full text-[10px] font-black uppercase text-blue-600 tracking-widest">
            <UserCheck className="w-3 h-3" />
            Entrenamiento Informe Inserción
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 font-outfit tracking-tighter">Simulador de Entrevista</h3>
          <p className="text-slate-500 font-medium italic">Entrena con nuestra IA para obtener el Informe Municipal favorable.</p>
        </div>
        <div className="flex -space-x-3">
           {[1,2,3,4].map(i => (
             <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">
               {i}
             </div>
           ))}
        </div>
      </header>

      {currentStep === -1 && (
        <div className="py-10 text-center space-y-8">
           <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto shadow-inner text-slate-300">
              <MessageSquare className="w-10 h-10" />
           </div>
           <div className="space-y-2 max-w-lg mx-auto">
              <h4 className="text-xl font-bold text-slate-900">¿Estás listo para el funcionario?</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">
                Esta simulación utiliza las preguntas reales que realizan los ayuntamientos para evaluar tu arraigo social. Al final, nuestra IA calificará tu nivel de integración.
              </p>
           </div>
           <button 
            onClick={startSimulation}
            className="px-12 py-5 bg-slate-900 text-white rounded-[24px] font-black uppercase text-[11px] tracking-[0.2em] hover:bg-blue-600 transition-all shadow-2xl shadow-slate-900/20"
           >
             Empezar Simulación
           </button>
        </div>
      )}

      {currentStep >= 0 && !isFinished && !isAnalyzing && (
        <div className="space-y-10 animate-in slide-in-from-bottom-8 duration-700">
           <div className="p-8 bg-slate-50 rounded-[32px] border border-slate-100 relative">
              <div className="absolute -top-4 left-8 px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest">
                 Pregunta {currentStep + 1} de {INTERVIEW_QUESTIONS.length}
              </div>
              <p className="text-xl font-bold text-slate-900 font-outfit leading-relaxed mt-4">
                 "{INTERVIEW_QUESTIONS[currentStep]}"
              </p>
           </div>

           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Tu Respuesta (Sé natural y honesto)</label>
              <textarea 
                value={currentAnswer}
                onChange={(e) => setCurrentAnswer(e.target.value)}
                placeholder="Escribe tu respuesta aquí..."
                className="w-full min-h-[160px] p-8 bg-white border-2 border-slate-100 rounded-[32px] text-slate-800 font-medium focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none text-lg leading-relaxed"
              />
           </div>

           <div className="flex justify-end">
              <button 
                onClick={handleNext}
                disabled={!currentAnswer.trim()}
                className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-blue-700 disabled:opacity-30 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/20"
              >
                Continuar
                <ArrowRight className="w-5 h-5" />
              </button>
           </div>
        </div>
      )}

      {isAnalyzing && (
        <div className="py-20 flex flex-col items-center justify-center space-y-6 animate-pulse">
           <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
           <p className="text-sm font-black uppercase tracking-widest text-slate-400">Analizando respuestas con Arrivo IA...</p>
        </div>
      )}

      {isFinished && (
        <div className="space-y-12 animate-in zoom-in-95 duration-1000">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 bg-emerald-50 border border-emerald-100 rounded-[32px] space-y-4">
                 <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm">
                    <Star className="w-6 h-6 text-emerald-500" />
                 </div>
                 <h4 className="text-sm font-black uppercase text-emerald-900 tracking-tighter">Nivel de Integración</h4>
                 <p className="text-4xl font-black text-emerald-600 font-outfit">85%</p>
                 <p className="text-[10px] text-emerald-700/70 font-bold uppercase tracking-widest">Resultado: VIABLE</p>
              </div>

              <div className="md:col-span-2 p-8 bg-white border border-slate-100 rounded-[32px] space-y-6">
                 <h4 className="text-sm font-black uppercase text-slate-900 tracking-tight flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-amber-500" />
                    Consejos de la IA para tu Informe
                 </h4>
                 <ul className="space-y-4">
                    <li className="flex gap-4 items-start">
                       <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                       <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          Menciona que conoces la **Biblioteca Municipal** o el **Polideportivo**. Los funcionarios valoran el conocimiento del entorno público.
                       </p>
                    </li>
                    <li className="flex gap-4 items-start">
                       <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                       <p className="text-xs text-slate-600 font-medium leading-relaxed">
                          Sé más específico con el salario SMI 2026. Menciona que sabes que cobrarás al menos **1.260€ brutos** prorrateados.
                       </p>
                    </li>
                 </ul>
              </div>
           </div>

           <div className="flex justify-center gap-4">
              <button 
                onClick={() => { setCurrentStep(-1); setIsFinished(false); setAnswers([]); }}
                className="px-10 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black uppercase text-[11px] tracking-widest hover:bg-slate-200 transition-all flex items-center gap-3"
              >
                <History className="w-4 h-4" />
                Repetir Simulacro
              </button>
           </div>
        </div>
      )}
    </div>
  );
}
