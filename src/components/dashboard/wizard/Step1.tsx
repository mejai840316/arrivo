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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <User className="w-8 h-8 text-blue-900" />
        <div>
          <h2 className="text-xl font-bold text-slate-900 font-outfit">Datos Personales</h2>
          <p className="text-sm text-slate-500 font-medium">Información institucional del solicitante.</p>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nombre Completo (Como aparece en pasaporte)</label>
        <input
          {...register('fullName')}
          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 focus:border-transparent outline-none transition-all shadow-sm"
          placeholder="Nombre y Apellidos"
        />
        {errors.fullName && <p className="text-red-500 text-xs font-medium">{errors.fullName.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Fecha de Nacimiento</label>
          <input
            type="date"
            {...register('birthDate')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all"
          />
          {errors.birthDate && <p className="text-red-500 text-xs font-medium">{errors.birthDate.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Nacionalidad Actual</label>
          <input
            {...register('country')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all"
            placeholder="Ej: Colombia"
          />
          {errors.country && <p className="text-red-500 text-xs font-medium">{errors.country.message}</p>}
        </div>
      </div>

      <div className="pt-4 border-t border-slate-100">
        <button
          type="submit"
          className="w-full py-4 bg-blue-900 text-white font-black uppercase text-xs tracking-widest rounded-xl hover:bg-blue-800 shadow-xl shadow-blue-900/10 transition-all font-outfit"
        >
          Siguiente paso
        </button>
      </div>
    </form>
  );
};

export default Step1;
