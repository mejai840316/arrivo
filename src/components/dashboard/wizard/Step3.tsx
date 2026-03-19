'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Phone, MapPin, CheckCircle, Loader2 } from 'lucide-react';

const step3Schema = z.object({
  phone: z.string().min(9, 'Número de teléfono inválido'),
  address: z.string().min(5, 'Dirección de empadronamiento incompleta'),
});

type Step3Data = z.infer<typeof step3Schema>;

const Step3 = () => {
  const { formData, updateFormData, setStep } = useProfileWizardStore();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      phone: formData.phone,
      address: formData.address,
    }
  });

  const onSubmit = async (data: Step3Data) => {
    setLoading(true);
    const finalData = { ...formData, ...data };
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Sesión de usuario no válida');

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: finalData.fullName,
          birth_date: finalData.birthDate,
          country_origin: finalData.country,
          nie: finalData.nie,
          passport_number: finalData.passport,
          phone: finalData.phone,
          address: finalData.address,
           updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      router.refresh(); // Gatilla el re-render para mostrar el Dashboard
    } catch (e: any) {
      alert(`Error institucional: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-8 h-8 text-blue-900" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ubicación y Contacto</h2>
          <p className="text-sm text-slate-500 italic">Obligatorio para recibir notificaciones gubernamentales.</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Teléfono móvil</label>
            <div className="relative">
                <span className="absolute left-4 top-3.5 text-slate-400 text-sm font-bold">+34</span>
                <input
                    {...register('phone')}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all"
                    placeholder="600 000 000"
                />
            </div>
            {errors.phone && <p className="text-red-500 text-xs font-medium">{errors.phone.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Dirección de Empadronamiento</label>
          <input
            {...register('address')}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900 outline-none transition-all"
            placeholder="Calle, número, piso y CP"
          />
          {errors.address && <p className="text-red-500 text-xs font-medium">{errors.address.message}</p>}
        </div>
      </div>

      <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex gap-3 items-start">
        <CheckCircle className="w-5 h-5 text-blue-900 mt-0.5" />
        <p className="text-xs text-blue-900 leading-relaxed font-medium">
          Al finalizar, confirmo que todos mis datos son veraces y coinciden con mis documentos oficiales de identidad.
        </p>
      </div>

      <div className="flex gap-4 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="flex-1 py-4 text-blue-900 font-bold uppercase text-xs tracking-widest hover:bg-slate-50 rounded-xl transition-all"
          disabled={loading}
        >
          Atrás
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-[2] py-4 bg-emerald-600 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-900/10 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            'Finalizar perfil institucional'
          )}
        </button>
      </div>
    </form>
  );
};

export default Step3;
