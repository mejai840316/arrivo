'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import { Shield, Upload, FileCheck } from 'lucide-react';

const step2Schema = z.object({
  nie: z.string().refine(val => !val || val.length >= 9, 'NIE Inválido (Ej: Y1234567Z)'),
  passport: z.string().refine(val => !val || val.length >= 6, 'Número de pasaporte inválido'),
  expiryDate: z.string().min(1, 'Fecha de caducidad requerida'),
}).refine(data => data.nie || data.passport, {
  message: 'Debes introducir al menos tu NIE o tu Pasaporte',
  path: ['passport']
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Número NIE / TIE</label>
          <input
            {...register('nie')}
            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Ej: Y1234567Z (Si lo tienes)"
          />
          {errors.nie && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.nie.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Número de Pasaporte</label>
          <input
            {...register('passport')}
            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Ej: PA123456"
          />
          {errors.passport && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.passport.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Fecha de Caducidad</label>
          <input
            type="date"
            {...register('expiryDate')}
            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow font-medium text-slate-700"
          />
          {errors.expiryDate && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.expiryDate.message}</p>}
        </div>

        {/* Swiss Style Minimal Upload Interaction */}
        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Copia de Seguridad (Opcional)</label>
          <div className="h-[58px] border border-dashed border-slate-300 rounded-2xl flex items-center justify-center bg-slate-50/30 hover:bg-slate-50 hover:border-blue-900 transition-all cursor-pointer group">
             <span className="text-[10px] font-bold text-slate-400 group-hover:text-blue-900 tracking-wider uppercase">Seleccionar Archivo (PDF/IMG)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em] hover:text-blue-900 transition-colors"
        >
          Anterior
        </button>
        <button
          type="submit"
          className="px-10 py-4 bg-blue-900 text-white font-bold uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-slate-900 transition-colors shadow-lg shadow-blue-900/10 font-outfit"
        >
          Continuar al paso 3
        </button>
      </div>
    </form>
  );
};

export default Step2;
