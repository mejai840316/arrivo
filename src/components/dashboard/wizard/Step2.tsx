'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import { Shield, Upload, FileCheck } from 'lucide-react';

const step2Schema = z.object({
  nie: z.string().min(9, 'NIE Inválido (Ej: Y1234567Z)'),
  passport: z.string().min(6, 'Número de pasaporte inválido'),
  expiryDate: z.string().min(1, 'Fecha de caducidad requerida'),
});

type Step2Data = z.infer<typeof step2Schema>;

const Step2 = () => {
  const { setStep, updateFormData, formData } = useProfileWizardStore();
  const { register, handleSubmit, formState: { errors } } = useForm<Step2Data>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      nie: formData.nie,
      passport: formData.passport,
      expiryDate: formData.expiryDate,
    }
  });

  const onSubmit = (data: Step2Data) => {
    updateFormData(data);
    setStep(3);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <Shield className="w-8 h-8 text-blue-900" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">Identificación Legal</h2>
          <p className="text-sm text-slate-500 italic">Tus datos se cifran con estándar bancario AES-256.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">NIE / TIE</label>
          <input
            {...register('nie')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
            placeholder="Ej: Y1234567Z"
          />
          {errors.nie && <p className="text-red-500 text-xs font-medium">{errors.nie.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Número de Pasaporte</label>
          <input
            {...register('passport')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
            placeholder="Ej: PA123456"
          />
          {errors.passport && <p className="text-red-500 text-xs font-medium">{errors.passport.message}</p>}
        </div>

         <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fecha de Caducidad Pasaporte</label>
          <input
            type="date"
            {...register('expiryDate')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all"
          />
          {errors.expiryDate && <p className="text-red-500 text-xs font-medium">{errors.expiryDate.message}</p>}
        </div>
      </div>

      {/* Upload Section (Conceptual for now) */}
      <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50 group hover:border-blue-900 transition-all cursor-pointer">
          <div className="flex flex-col items-center gap-2">
             <div className="p-3 bg-white rounded-full shadow-sm group-hover:bg-blue-900 group-hover:text-white transition-all">
                <Upload className="w-5 h-5" />
             </div>
             <p className="text-xs font-bold text-slate-600">Subir NIE Escaneado o Pasaporte</p>
             <p className="text-[10px] text-slate-400">Soporta PDF, JPEG, PNG (MÁX 5MB)</p>
          </div>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="flex-1 py-4 text-blue-900 font-bold uppercase text-xs tracking-widest hover:bg-slate-50 rounded-xl transition-all"
        >
          Atrás
        </button>
        <button
          type="submit"
          className="flex-[2] py-4 bg-blue-900 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-blue-800 shadow-lg shadow-blue-900/10 transition-all font-outfit"
        >
          Siguiente paso
        </button>
      </div>
    </form>
  );
};

export default Step2;
