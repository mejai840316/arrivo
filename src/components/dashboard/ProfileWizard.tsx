'use client';

import React from 'react';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import Step1 from './wizard/Step1';
import Step2 from './wizard/Step2';
import Step3 from './wizard/Step3';
import { User, Shield, CheckCircle } from 'lucide-react';

const ProfileWizard = () => {
  const { step } = useProfileWizardStore();

  const renderCurrentStep = () => {
    switch (step) {
      case 1:
        return <Step1 />;
      case 2:
        return <Step2 />;
      case 3:
        return <Step3 />;
      default:
        return <Step1 />;
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
      <div className="bg-slate-50 border-b border-slate-100 p-8">
        {/* Stepper Visual */}
        <div className="flex items-center justify-between max-w-sm mx-auto mb-4">
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= 1 ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-300 text-slate-400'
            }`}>
              {step > 1 ? <CheckCircle className="w-5 h-5" /> : <User className="w-5 h-5" />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Datos</span>
          </div>
          
          <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-blue-900' : 'bg-slate-200'}`} />
          
          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= 2 ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-300 text-slate-400'
            }`}>
              {step > 2 ? <CheckCircle className="w-5 h-5" /> : <Shield className="w-5 h-5" />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Legal</span>
          </div>

          <div className={`flex-1 h-0.5 mx-4 ${step >= 3 ? 'bg-blue-900' : 'bg-slate-200'}`} />

          <div className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
              step >= 3 ? 'bg-blue-900 border-blue-900 text-white' : 'border-slate-300 text-slate-400'
            }`}>
              <Shield className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Finalizar</span>
          </div>
        </div>
      </div>
      
      <div className="p-8 lg:p-12">
        {renderCurrentStep()}
      </div>
    </div>
  );
};

export default ProfileWizard;
