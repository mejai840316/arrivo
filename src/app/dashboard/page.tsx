import { createClient } from '@/lib/supabase/server';
import ProfileWizard from '@/components/dashboard/ProfileWizard';
import { LegalAlerts } from '@/components/dashboard/LegalAlerts';
import { PROCEDURES_MOCK } from '@/lib/mocks';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import PadronTrackerWidget from '@/components/dashboard/PadronTrackerWidget';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  const isProfileComplete = Boolean((profile?.nie || profile?.passport_number) && profile?.phone);

  return (
    <div className="space-y-10 py-6 max-w-[1400px] mx-auto px-4">
      {/* Banner de perfil incompleto */}
      {!isProfileComplete && (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-full text-blue-900 mt-1">
             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </div>
          <div>
            <h3 className="font-bold text-blue-900 text-sm">Completa tu Perfil Institucional</h3>
            <p className="text-xs text-blue-800/80 mt-1 mb-3">La información de tu perfil (NIE/Pasaporte y dirección) es obligatoria para iniciar cualquier trámite oficial.</p>
          </div>
        </div>
      )}

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900 font-outfit">Panel de Control</h1>
          <p className="text-gray-500 mt-1 uppercase text-[10px] tracking-[0.2em] font-bold">
            Expediente de {profile?.full_name || user.email} — Situación Administrativa Actualizada
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/dashboard/nuevo"
            className="px-6 py-3 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-blue-800 transition-all flex items-center gap-2"
          >
            + Iniciar nuevo trámite
          </Link>
        </div>
      </header>

      <DashboardTabs isProfileComplete={isProfileComplete}>
        {/* Stats / Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-blue-600">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Expedientes Activos</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">02</p>
            <span className="text-xs text-blue-600 font-medium tracking-tight">En curso</span>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-amber-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Pendientes de Acción</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-gray-900">01</p>
            <span className="text-xs text-amber-600 font-medium tracking-tight italic">Acción requerida</span>
          </div>
        </div>
        <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm border-l-4 border-l-emerald-500">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Alertas Legales</p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-emerald-600">NEW</p>
            <span className="text-xs text-slate-500 font-medium tracking-tight">Vigilancia activa</span>
          </div>
        </div>
      </div>

      {/* Acceso Directo al Generador de Empadronamiento (Fase 2 PDFs) */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-3xl p-6 sm:p-8 shadow-lg relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
         <div className="absolute top-0 right-0 p-8 opacity-5">
            <svg className="w-48 h-48" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>
         </div>
         <div className="relative z-10">
           <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-800/50 border border-blue-400/30 text-blue-200 text-[10px] font-bold uppercase tracking-widest rounded-full mb-3">
             Paso Obligatorio
           </div>
           <h2 className="text-2xl font-extrabold text-white font-outfit mb-2">Módulo de Empadronamiento Inteligente</h2>
           <p className="text-blue-100/80 font-medium max-w-xl text-sm leading-relaxed">
             Sin padrón no hay arraigo. Usa nuestro asistente para generar la solicitud oficial basada en el BOE, incluso si vives en habitación sin contrato, y activa el tracker del Silencio Administrativo.
           </p>
         </div>
         <Link href="/dashboard/padron" className="relative z-10 shrink-0 bg-white text-blue-900 px-6 py-3.5 rounded-xl font-bold hover:bg-blue-50 transition-colors shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
           Abrir Asistente
         </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Procedures */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-lg font-bold text-gray-900">Mis Trámites</h2>
            <Link href="/dashboard/expedientes" className="text-xs text-blue-600 font-semibold hover:underline">Ver historial completo</Link>
          </div>
          
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50 shadow-sm">
            {PROCEDURES_MOCK.slice(0, 3).map((procedure: any) => (
               <div key={procedure.id} className="p-6 hover:bg-slate-50 transition-colors flex items-center justify-between group">
                  <div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-900 transition-colors">{procedure.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{procedure.category}</p>
                    <div className="mt-3 flex items-center gap-4">
                       <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                         procedure.status === 'En Proceso' ? 'bg-blue-50 text-blue-700' : 'bg-amber-50 text-amber-700'
                       }`}>
                         {procedure.status}
                       </span>
                       <span className="text-[10px] text-gray-400 font-medium">Ref: ARG-{Math.floor(Math.random() * 10000)}</span>
                    </div>
                  </div>
                  <Link href={`/dashboard/proced/${procedure.id}`} className="p-2 rounded-full hover:bg-white border border-transparent hover:border-slate-100 transition-all text-slate-400 hover:text-blue-900">
                    <span className="sr-only">Ver Detalles</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </Link>
               </div>
            ))}
          </div>
        </div>

        {/* Right Column: Alerts & AI Info */}
        <div className="space-y-8">
           <PadronTrackerWidget />
           <LegalAlerts />
           
           {/* Direct AI Help Box */}
           <div className="p-6 bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl text-white shadow-xl shadow-blue-900/10">
              <h3 className="font-bold mb-2 font-outfit">Asistente Arrivo IA</h3>
              <p className="text-xs text-blue-100/70 leading-relaxed mb-4 font-medium">
                Consulta cualquier duda sobre tu expediente basándote en la legislación actual del BOE del día de hoy.
              </p>
              <Link href="/dashboard/chat" className="w-full flex justify-center py-2.5 bg-white text-blue-900 rounded-lg text-xs font-extrabold uppercase tracking-widest hover:bg-blue-50 transition-colors font-outfit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
                Abrir Chat Legal
              </Link>
           </div>
        </div>
      </div>
      </DashboardTabs>

      {/* Legal Disclaimer */}
      <footer className="mt-15 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <p className="text-[10px] text-slate-400 text-center leading-loose max-w-4xl mx-auto font-medium">
           AVISO LEGAL: ESTA PLATAFORMA PROPORCIONA HERRAMIENTAS DE AUTOGESTIÓN Y ORIENTACIÓN LEGAL BASADA EN DATOS PÚBLICOS. NO CONSTITUYE UN SERVICIO DE ASESORÍA JURÍDICA PERSONALIZADA. ARRIVO OPERA SEGÚN LOS PROTOCOLOS DE LA DIRECCIÓN GENERAL DE MIGRACIONES Y EL REGLAMENTO DE EXTRANJERÍA (RD 557/2011). LA SEGURIDAD DE SUS DATOS ESTÁ GARANTIZADA MEDIANTE CIFRADO AES-256 Y CUMPLIMIENTO ESTRICTO DE LA RGPD.
        </p>
      </footer>
    </div>
  );
}
