import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import FaqList from '@/components/dashboard/FaqList';

// Types para mapear la DB
export interface FaqItem {
  id: string;
  pregunta: string;
  respuesta: string;
  categoria: string;
  palabras_clave: string[];
}

export const metadata = {
  title: 'Preguntas Frecuentes - Arrivo',
  description: 'Base de conocimiento de trámites migratorios respondidas por la comunidad.',
};

export default async function FaqPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Obtener FAQs de la base de datos (se usa "limit" alto o paginación. Asumimos 500 para este demo)
  const { data: faqs, error } = await supabase
    .from('conocimiento_tramites')
    .select('id, pregunta, respuesta, categoria, palabras_clave')
    .order('created_at', { ascending: false })
    .limit(500);

  if (error) {
    console.error('Error fetching FAQs:', error);
  }

  // Formatear o agrupar si es necesario
  const knowledgeBase = (faqs || []) as FaqItem[];

  return (
    <div className="space-y-8 py-6 max-w-[1400px] mx-auto px-4">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900 font-outfit">Base de Conocimiento</h1>
          <p className="text-gray-500 mt-2 uppercase text-[10px] tracking-[0.2em] font-bold">
            Respuestas validadas sobre Trámites, Arraigo y Extranjería
          </p>
        </div>
      </header>

      {/* Componente interactivo de listado */}
      <FaqList initialFaqs={knowledgeBase} />
      
      {/* Legal Disclaimer idéntico al Dashboard */}
      <footer className="mt-15 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <p className="text-[10px] text-slate-400 text-center leading-loose max-w-4xl mx-auto font-medium">
           AVISO LEGAL: ESTA SECCIÓN CONTIENE INFORMACIÓN GENERAL RECOPILADA DE EXPERIENCIAS DE LA COMUNIDAD. NO CONSTITUYE UN SERVICIO DE ASESORÍA JURÍDICA PERSONALIZADA. COMPRUEBE SIEMPRE LA NORMATIVA ACTUAL EN EL BOE.
        </p>
      </footer>
    </div>
  );
}
