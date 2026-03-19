import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import EmpadronamientoAssistant from '@/components/dashboard/EmpadronamientoAssistant';

export const metadata = {
  title: 'Asistente de Empadronamiento | Arrivo',
  description: 'Guía y generación de documentos para empadronarse en España.',
};

export default function PadronPage() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm font-bold text-slate-500 hover:text-blue-900 inline-flex items-center gap-2 mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Volver al Panel
        </Link>
        <div>
           <h1 className="text-4xl font-extrabold text-blue-900 font-outfit mb-3">Módulo de Empadronamiento</h1>
           <p className="text-slate-600 font-medium">El paso número uno y más importante para cualquier trámite de extranjería en España.</p>
        </div>
      </div>

      <EmpadronamientoAssistant />
    </div>
  );
}
