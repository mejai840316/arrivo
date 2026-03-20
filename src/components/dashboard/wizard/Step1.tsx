'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import { User, Flag, Calendar } from 'lucide-react';

const step1Schema = z.object({
  fullName: z.string().min(5, 'El nombre debe ser real y completo'),
  birthDate: z.string().min(1, 'Fecha de nacimiento requerida'),
  country: z.string().min(3, 'País requerido'),
});

type Step1Data = z.infer<typeof step1Schema>;

const Step1 = () => {
  const { setStep, updateFormData, formData } = useProfileWizardStore();
  const { register, handleSubmit, formState: { errors } } = useForm<Step1Data>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: formData.fullName,
      birthDate: formData.birthDate,
      country: formData.country,
    }
  });

  const onSubmit = (data: Step1Data) => {
    updateFormData(data);
    setStep(2);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 gap-8">
        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Nombre Completo</label>
          <input
            {...register('fullName')}
            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 focus-visible:border-transparent outline-none transition-shadow placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Juan Pérez García"
          />
          {errors.fullName && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.fullName.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-3">
            <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Fecha de Nacimiento</label>
            <input
              type="date"
              {...register('birthDate')}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow font-medium text-slate-700"
            />
            {errors.birthDate && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.birthDate.message}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">País de Origen</label>
            <input
              {...register('country')}
              className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow placeholder:text-slate-300 font-medium text-slate-800"
              placeholder="Colombia"
            />
            {errors.country && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.country.message}</p>}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-slate-100 flex justify-end">
        <button
          type="submit"
          className="px-10 py-4 bg-slate-900 text-white font-bold uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-blue-900 transition-colors shadow-lg shadow-slate-900/10 font-outfit"
        >
          Continuar al paso 2
        </button>
      </div>
    </form>
  );
};

export default Step1;
