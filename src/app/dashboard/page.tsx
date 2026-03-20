import { createClient } from '@/lib/supabase/server';
import ProfileWizard from '@/components/dashboard/ProfileWizard';
import { LegalAlerts } from '@/components/dashboard/LegalAlerts';
import { PROCEDURES_MOCK } from '@/lib/mocks';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import PadronTrackerWidget from '@/components/dashboard/PadronTrackerWidget';
import { FileText, CreditCard, Landmark, ChevronRight } from 'lucide-react';
import LegalToolbox from '@/components/dashboard/LegalToolbox';
import AdminMonitoring from '@/components/dashboard/AdminMonitoring';
import AdminChangeProposal from '@/components/dashboard/AdminChangeProposal';
import OfficialResources from '@/components/dashboard/OfficialResources';
import SolvenciaStatusWidget from '@/components/dashboard/SolvenciaStatusWidget';
import DeadlineRadarWidget from '@/components/dashboard/DeadlineRadarWidget';
import CorrectionManual from '@/components/dashboard/CorrectionManual';
import SubmissionTrackerWidget from '@/components/dashboard/SubmissionTrackerWidget';

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
    <div className="space-y-8 py-6 max-w-[1400px] mx-auto px-4">
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

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gray-100">
        <div>
          <h1 className="text-3xl font-extrabold text-blue-900 font-outfit">Panel de Control</h1>
          <p className="text-gray-500 mt-1 uppercase text-[10px] tracking-[0.2em] font-bold">
            Expediente de {profile?.full_name || user.email}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/nuevo" className="px-6 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-blue-800 transition-all">
            + Nuevo Trámite
          </Link>
          <Link href="/dashboard/chat" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2">
            AI Assistant
          </Link>
        </div>
      </header>

      <AdminMonitoring />
      <AdminChangeProposal />

      <DashboardTabs isProfileComplete={isProfileComplete}>
        {/* Main Dashboard Layout: 2/3 + 1/3 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN: Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Compactos */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 bg-white rounded-2xl border border-blue-100 shadow-sm border-l-4 border-l-blue-600">
                <p className="text-[9px] font-bold text-slate-400 theme-gray-uppercase tracking-widest mb-1">Activos</p>
                <p className="text-2xl font-bold text-gray-900">02</p>
              </div>
              <div className="p-4 bg-white rounded-2xl border border-amber-100 shadow-sm border-l-4 border-l-amber-500">
                <p className="text-[9px] font-bold text-slate-400 theme-gray-uppercase tracking-widest mb-1">Acción</p>
                <p className="text-2xl font-bold text-gray-900">01</p>
              </div>
              <div className="hidden sm:block">
                 <SolvenciaStatusWidget totalRequired={2300} currentSaved={1200} />
              </div>
              <div className="hidden sm:block">
                 <DeadlineRadarWidget 
                   notificationDate={profile?.denial_date || new Date(Date.now() - 25 * 86400000).toISOString()} 
                   daysLimit={30}
                 />
              </div>
            </div>

            {/* Mis Trámites - Priority List */}
            <section>
              <div className="flex items-center justify-between mb-4 px-1">
                <h2 className="text-xl font-extrabold text-blue-900 font-outfit">Mis Trámites</h2>
                <Link href="/dashboard/expedientes" className="text-[10px] text-blue-600 font-black uppercase tracking-widest hover:underline">Ver Historial</Link>
              </div>
              
              <div className="bg-white rounded-3xl border border-slate-100 overflow-hidden divide-y divide-slate-50 shadow-sm">
                {PROCEDURES_MOCK.slice(0, 3).map((procedure: any) => (
                   <div key={procedure.id} className="p-5 hover:bg-slate-50/50 transition-colors flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${procedure.status === 'En Proceso' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-600'}`}>
                           <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-900 text-sm">{procedure.title}</h3>
                          <div className="flex items-center gap-3 mt-1">
                             <span className="text-[9px] font-bold uppercase text-slate-400">{procedure.category}</span>
                             <span className={`text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-tighter ${
                               procedure.status === 'En Proceso' ? 'bg-blue-100/50 text-blue-700' : 'bg-amber-100/50 text-amber-700'
                             }`}>
                               {procedure.status}
                             </span>
                          </div>
                        </div>
                      </div>
                      <Link href={`/dashboard/proced/${procedure.id}`} className="p-2 rounded-full hover:bg-blue-900 hover:text-white transition-all text-slate-300">
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                   </div>
                ))}
              </div>
            </section>

            {/* Legal Toolbox - Interactive Actions */}
            <section className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm">
               <div className="mb-6">
                 <h2 className="text-xl font-extrabold text-blue-900 font-outfit">Herramientas Estratégicas</h2>
                 <p className="text-xs text-slate-500 font-medium tracking-tight">Resolución proactiva basada en BOE 2026.</p>
               </div>
               <LegalToolbox profile={profile} />
            </section>

            {/* Manual de Correcciones */}
            <CorrectionManual />

          </div>

          {/* RIGHT COLUMN: Sidebar Widgets */}
          <div className="lg:col-span-1 space-y-6">
            
            {/* Status Tracking Trackers */}
            <SubmissionTrackerWidget initialStatus="subsanado" />
            <PadronTrackerWidget />
            
            {/* Empadronamiento Banner (Sidebar Style) */}
            <div className="bg-gradient-to-br from-indigo-900 to-blue-950 rounded-3xl p-6 shadow-xl relative overflow-hidden text-white">
               <div className="relative z-10 flex flex-col gap-4">
                  <div>
                    <span className="inline-block px-2 py-1 bg-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest mb-2 border border-white/10">Fase 2: PDF</span>
                    <h3 className="text-lg font-bold font-outfit leading-tight mb-2">Módulo de Padrón Inteligente</h3>
                    <p className="text-[11px] text-blue-100/70 leading-relaxed italic">
                      Genera la reclamación por Silencio Administrativo si han pasado 90 días.
                    </p>
                  </div>
                  <Link href="/dashboard/padron" className="w-full text-center bg-white text-blue-900 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                    Abrir Asistente
                  </Link>
               </div>
            </div>

            {/* Legal Alerts */}
            <LegalAlerts />

            {/* Quick Links / Official Sources */}
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-200">
               <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
                  <Landmark className="w-3 h-3" /> Enlaces Oficiales
               </h3>
               <div className="grid grid-cols-1 gap-2">
                  <Link href="/dashboard/tasas" className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 hover:border-blue-300 transition-all group">
                     <span className="text-xs font-bold text-slate-700">Pago de Tasas 790</span>
                     <CreditCard className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </Link>
                  <Link href="/dashboard/formularios" className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 hover:border-blue-300 transition-all group">
                     <span className="text-xs font-bold text-slate-700">Descargar EX-10 / EX-01</span>
                     <FileText className="w-4 h-4 text-slate-300 group-hover:text-blue-600" />
                  </Link>
               </div>
            </div>
          </div>
        </div>

        <div className="pt-12">
           <OfficialResources />
        </div>
      </DashboardTabs>

      {/* Legal Disclaimer */}
      <footer className="mt-15 p-6 rounded-2xl bg-slate-50 border border-slate-100">
        <p className="text-[10px] text-slate-400 text-center leading-loose max-w-4xl mx-auto font-medium uppercase tracking-tighter">
           AVISO LEGAL: ESTA PLATAFORMA PROPORCIONA HERRAMIENTAS DE AUTOGESTIÓN Y ORIENTACIÓN LEGAL BASADA EN DATOS PÚBLICOS. NO CONSTITUYE UN SERVICIO DE ASESORÍA JURÍDICA PERSONALIZADA. ARRIVO OPERA SEGÚN LOS PROTOCOLOS DE LA DIRECCIÓN GENERAL DE MIGRACIONES Y EL REGLAMENTO DE EXTRANJERÍA. LA SEGURIDAD DE SUS DATOS ESTÁ GARANTIZADA MEDIANTE CIFRADO AES-256 Y CUMPLIMIENTO ESTRICTO DE LA RGPD.
        </p>
      </footer>
    </div>
  );
}
