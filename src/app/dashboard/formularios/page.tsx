import React from 'react';
import ExFormsGenerator from '@/components/dashboard/ExFormsGenerator';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Generador de Formularios | Arrivo',
  description: 'Generación dinámica de PDFs oficiales para extranjería (EX-01, EX-10).',
};

export default async function FormulariosPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="max-w-6xl mx-auto py-8 px-4 space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <h1 className="text-4xl font-extrabold text-slate-900 font-outfit mb-2">Formularios Oficiales</h1>
      </div>
      
      <ExFormsGenerator initialProfile={profile} />
    </div>
  );
}
