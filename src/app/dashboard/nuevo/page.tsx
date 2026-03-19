import React from 'react';
import RecomendadorWizard from '@/components/dashboard/RecomendadorWizard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const metadata = {
  title: 'Nuevo Trámite | Arrivo',
  description: 'Iniciar un nuevo trámite migratorio con Arrivo.',
};

export default function NuevoTramitePage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6">
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <h1 className="text-4xl font-extrabold text-blue-900 font-outfit mb-3">Iniciar Nuevo Trámite</h1>
        <p className="text-slate-600 font-medium">Responde a estas breves preguntas y te diremos exactamente a qué visados o procedimientos aplicas.</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
        <RecomendadorWizard />
      </div>
    </div>
  );
}
