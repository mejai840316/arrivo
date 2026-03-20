'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useProfileWizardStore } from '@/store/useProfileWizardStore';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { MapPin, CheckCircle, Loader2, AlertCircle } from 'lucide-react';

const step3Schema = z.object({
  phone: z.string().min(6, 'Número de teléfono inválido'),
  address: z.string().min(5, 'Dirección de empadronamiento incompleta'),
});

type Step3Data = z.infer<typeof step3Schema>;

const Step3 = () => {
  const { formData, setStep } = useProfileWizardStore();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const { register, handleSubmit, formState: { errors } } = useForm<Step3Data>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      phone: formData.phone || '',
      address: formData.address || '',
    }
  });

  const onSubmit = async (data: Step3Data) => {
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) throw new Error('Sesión no válida. Por favor vuelve a iniciar sesión.');

      const profilePayload = {
        id: user.id,
        full_name: formData.fullName || null,
        birth_date: formData.birthDate || null,
        country_origin: formData.country || null,
        nie: formData.nie || null,
        passport_number: formData.passport || null,
        phone: data.phone,
        address: data.address,
        updated_at: new Date().toISOString(),
      };

      // Verificar explícitamente si el perfil ya existe para el usuario
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', user.id)
        .maybeSingle();

      if (existingProfile) {
        // Si existe, actualizamos
        const { error: updateError } = await supabase
          .from('profiles')
          .update(profilePayload)
          .eq('id', user.id);

        if (updateError) {
          console.error('Update error:', updateError);
          throw new Error(updateError.message);
        }
      } else {
        // Si NO existe, insertamos (esto es lo que estaba fallando al ser invisible el error de update)
        const { error: insertError } = await supabase
          .from('profiles')
          .insert(profilePayload);

        if (insertError) {
          console.error('Insert error:', insertError);
          throw new Error(insertError.message);
        }
      }

      // Redirigir al dashboard con recarga completa para que el server component se re-evalúe
      window.location.href = '/dashboard';

    } catch (e: any) {
      console.error('Profile save error:', e);
      setErrorMsg(e.message || 'Error desconocido al guardar el perfil.');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {errorMsg && (
        <div className="flex items-start gap-4 p-5 bg-red-50 border border-red-100 rounded-2xl">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-red-900 uppercase tracking-widest mb-1">Error de Sistema</p>
            <p className="text-xs text-red-700 leading-relaxed">{errorMsg}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-10">
        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Teléfono (+34)</label>
          <div className="relative group">
            <span className="absolute left-5 top-[18px] text-slate-400 text-sm font-bold border-r border-slate-200 pr-3 transition-colors group-focus-within:text-blue-900 group-focus-within:border-blue-900">+34</span>
            <input
              {...register('phone')}
              className="w-full pl-20 pr-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow font-medium text-slate-800"
              placeholder="600 000 000"
            />
          </div>
          {errors.phone && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.phone.message}</p>}
        </div>

        <div className="space-y-3">
          <label className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-slate-400">Dirección Institucional (Empadronamiento)</label>
          <input
            {...register('address')}
            className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus-visible:ring-2 focus-visible:ring-blue-900 outline-none transition-shadow placeholder:text-slate-300 font-medium text-slate-800"
            placeholder="Calle, número, piso y CP"
          />
          {errors.address && <p className="text-red-600 text-[10px] font-bold uppercase tracking-wider">{errors.address.message}</p>}
        </div>
      </div>

      <div className="p-5 border border-blue-50 bg-blue-50/30 rounded-2xl flex gap-4 items-start">
        <div className="w-8 h-8 rounded-full bg-blue-900 text-white flex items-center justify-center shrink-0">
           <CheckCircle className="w-4 h-4" />
        </div>
        <p className="text-xs text-slate-600 leading-relaxed font-medium">
          Confirmo que los datos proporcionados son verídicos. Esta información será utilizada para la generación de borradores oficiales y diagnósticos de viabilidad legal.
        </p>
      </div>

      <div className="flex items-center justify-between pt-10 border-t border-slate-100">
        <button
          type="button"
          onClick={() => setStep(2)}
          className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em] hover:text-blue-900 transition-colors disabled:opacity-30"
          disabled={loading}
        >
          Anterior
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-10 py-5 bg-slate-900 text-white font-bold uppercase text-[11px] tracking-[0.2em] rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-slate-900/10 flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Finalizando…
            </>
          ) : (
            'Activar Perfil Arrivo'
          )}
        </button>
      </div>
    </form>
  );
};

export default Step3;
