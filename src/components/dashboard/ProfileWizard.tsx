'use client';

import React from 'react';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import Step1 from './wizard/Step1';
import Step2 from './wizard/Step2';
import Step3 from './wizard/Step3';
import { Shield, CheckCircle, Bot } from 'lucide-react';

const ProfileWizard = () => {
  const { step } = useProfileWizardStore();

  const renderCurrentStep = () => {
    switch (step) {
      case 1: return <Step1 />;
      case 2: return <Step2 />;
      case 3: return <Step3 />;
      default: return <Step1 />;
    }
  };

  return (
    <div className="bg-white rounded-[32px] border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden transition-all duration-500">
      {/* Swiss Progress Bar */}
      <div className="h-1.5 w-full bg-slate-100">
          <div 
            className="bg-blue-900 h-full transition-all duration-700 ease-in-out" 
            style={{ width: `${(step / 3) * 100}%` }}
          />
      </div>

      <div className="p-10 lg:p-14">
        <header className="mb-12 flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-900/40">
              Paso {step} de 3
            </p>
            <h2 className="text-3xl font-extrabold font-outfit text-slate-900 tracking-tight">
              {step === 1 && "Información Personal"}
              {step === 2 && "Situación Legal"}
              {step === 3 && "Verificación Final"}
            </h2>
          </div>
          <div className="hidden sm:flex transition-opacity duration-300">
             <Bot className="w-8 h-8 text-blue-900/10" />
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderCurrentStep()}
        </div>
      </div>

      <footer className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2 group cursor-help">
           <Shield className="w-3 h-3 text-emerald-500" />
           <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Protección de Datos Activa</span>
        </div>
        <p className="text-[9px] font-bold uppercase tracking-widest text-slate-300">© 2026 Arrivo Government Stack</p>
      </footer>
    </div>
  );
};

export default ProfileWizard;
