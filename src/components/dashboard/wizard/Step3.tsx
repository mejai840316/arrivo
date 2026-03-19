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

      // Intentar UPDATE primero, si no existe hacemos INSERT
      const { error: updateError } = await supabase
        .from('profiles')
        .update(profilePayload)
        .eq('id', user.id);

      if (updateError) {
        // Si el update falla (no existe la fila), intentar INSERT
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-4">
        <MapPin className="w-8 h-8 text-blue-900" />
        <div>
          <h2 className="text-xl font-bold text-slate-900">Ubicación y Contacto</h2>
          <p className="text-sm text-slate-500 italic">Obligatorio para recibir notificaciones gubernamentales.</p>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-700">Error al guardar</p>
            <p className="text-xs text-red-600 mt-0.5">{errorMsg}</p>
            <p className="text-xs text-red-500 mt-2">
              Si el error persiste, puede ser necesario ejecutar el SQL de configuración en Supabase.
            </p>
          </div>
        </div>
      )}

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
          className="flex-[2] py-4 bg-emerald-600 text-white font-bold uppercase text-xs tracking-widest rounded-xl hover:bg-emerald-700 shadow-xl shadow-emerald-900/10 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Guardando...
            </>
          ) : (
            'Finalizar perfil institucional'
          )}
        </button>
      </div>
    </form>
  );
};

export default Step3;
