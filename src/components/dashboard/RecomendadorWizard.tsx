'use client';

import React, { useState } from 'react';
import { MapPin, Briefcase, GraduationCap, Clock, ShieldCheck, Wallet, ChevronRight, ChevronLeft, Sparkles, AlertCircle, CheckCircle2, Globe2, Home } from 'lucide-react';

// ─── TIPOS ────────────────────────────────────────────────────────────────────

interface Respuestas {
  estaEnEspana: boolean | null;
  mesesEnEspana: number | null;   // 0, 12, 24, 36, 60
  tieneAntecedentes: boolean | null;
  tieneOferTrabajo: boolean | null;
  estaEstudiando: boolean | null;
  tieneAhorrosIPREM: boolean | null; // ≥600€/mes
}

interface Tramite {
  id: string;
  nombre: string;
  categoria: string;
  descripcion: string;
  viabilidad: 'ALTA' | 'MEDIA' | 'BAJA';
  documentos: string[];
  accionPrincipal?: string;
}

// ─── MOTOR DE RECOMENDACIÓN ───────────────────────────────────────────────────

function calcularRecomendaciones(r: Respuestas): Tramite[] {
  const recomendaciones: Tramite[] = [];

  if (r.estaEnEspana === false) {
    // Modo Internacional — usuario fuera de España
    if (r.estaEstudiando) {
      recomendaciones.push({
        id: 'visado-estudios',
        nombre: 'Visado de Estancia por Estudios',
        categoria: 'Estancia',
        descripcion: 'Tu mejor opción para iniciar formación en España desde tu país. Tramitable en el Consulado español de tu ciudad.',
        viabilidad: r.tieneAhorrosIPREM ? 'ALTA' : 'MEDIA',
        documentos: ['Pasaporte (mín. 1 año vigencia)', 'Carta de admisión del centro', 'Seguro médico internacional', 'Justificante económico (600€/mes)', 'Antecedentes penales apostillados', 'Formulario EX-01'],
        accionPrincipal: 'Calcular IPREM y Consulados',
      });
    }
    if (r.tieneOferTrabajo) {
      recomendaciones.push({
        id: 'visado-trabajo',
        nombre: 'Visado de Trabajo y Residencia',
        categoria: 'Residencia',
        descripcion: 'Si tienes una oferta de trabajo en España, el empleador puede iniciar el proceso de autorización desde España.',
        viabilidad: 'ALTA',
        documentos: ['Pasaporte en vigor', 'Contrato de trabajo u oferta firmada', 'Titulación académica apostillada', 'Antecedentes penales apostillados'],
        accionPrincipal: 'Ver requisitos de contratación',
      });
    }
    if (!r.estaEstudiando && !r.tieneOferTrabajo) {
      recomendaciones.push({
        id: 'visado-estudios',
        nombre: 'Visado de Estancia por Estudios',
        categoria: 'Estancia',
        descripcion: 'La vía de entrada más accesible si aún no tienes trabajo. Matricúlate en un curso de idiomas o FP y solicita el visado.',
        viabilidad: r.tieneAhorrosIPREM ? 'ALTA' : 'BAJA',
        documentos: ['Pasaporte', 'Carta de admisión', 'Seguro médico', 'Justificante económico', 'Antecedentes penales apostillados'],
        accionPrincipal: 'Calcular IPREM y Consulados',
      });
    }
    return recomendaciones;
  }

  // ── Usuario en España ──────────────────────────────────────────────────────
  const meses = r.mesesEnEspana ?? 0;

  // Arraigo para la Formación (2 años, sin IPREM mientras estudias)
  if (meses >= 24 && r.estaEstudiando && !r.tieneAntecedentes) {
    recomendaciones.push({
      id: 'arraigo-formacion',
      nombre: 'Arraigo para la Formación',
      categoria: 'Arraigo',
      descripcion: '¡Tu mejor opción! 2 años en España + matrícula en formación reglada. No necesitas IPREM mientras estudias.',
      viabilidad: 'ALTA',
      documentos: ['Pasaporte', 'Padrón municipal (2 años)', 'Matrícula o carta de admisión', 'Antecedentes penales apostillados'],
      accionPrincipal: 'Generar Checklist Arraigo Formación',
    });
  }

  // Arraigo Laboral (2 años, nóminas / contratos)
  if (meses >= 24 && r.tieneOferTrabajo && !r.tieneAntecedentes) {
    recomendaciones.push({
      id: 'arraigo-laboral',
      nombre: 'Arraigo Laboral',
      categoria: 'Arraigo',
      descripcion: '2 años en España con relaciones laborales documentadas. Nóminas, contratos o resoluciones de inspección.',
      viabilidad: 'ALTA',
      documentos: ['Pasaporte', 'Padrón (2 años)', 'Nóminas o contratos (2 años)', 'Informe de vida laboral', 'Antecedentes penales apostillados'],
      accionPrincipal: 'Generar Checklist Arraigo Laboral',
    });
  }

  // Arraigo Social (3 años)
  if (meses >= 36 && !r.tieneAntecedentes) {
    recomendaciones.push({
      id: 'arraigo-social',
      nombre: 'Arraigo Social',
      categoria: 'Arraigo',
      descripcion: '3 años en España (2 con reforma 2026). Necesitas informe de integración municipal y 100% IPREM (~600€/mes).',
      viabilidad: r.tieneAhorrosIPREM ? 'ALTA' : 'MEDIA',
      documentos: ['Pasaporte', 'Padrón municipal (3 años)', 'Informe de integración municipal', 'Antecedentes penales apostillados', 'Justificante económico (600€/mes)'],
      accionPrincipal: 'Generar solicitud Informe de Integración',
    });
  }

  // Residencia Larga Duración (5 años)
  if (meses >= 60 && !r.tieneAntecedentes) {
    recomendaciones.push({
      id: 'larga-duracion',
      nombre: 'Residencia de Larga Duración',
      categoria: 'Residencia',
      descripcion: '5 años continuados de residencia legal te dan derecho a la residencia permanente. Los mismos derechos que un ciudadano europeo.',
      viabilidad: 'ALTA',
      documentos: ['Pasaporte', 'TIE en vigor', 'Certificado de residencia legal (5 años)', 'Antecedentes penales', 'Declaración IRPF últimos años'],
      accionPrincipal: 'Iniciar expediente Larga Duración',
    });
  }

  // Si lleva menos de 2 años
  if (meses < 24 && recomendaciones.length === 0) {
    recomendaciones.push({
      id: 'arraigo-formacion-futuro',
      nombre: 'Arraigo para la Formación (próximo)',
      categoria: 'Arraigo',
      descripcion: `Te faltan ${24 - meses} meses para poder solicitar el Arraigo para la Formación. El mejor camino es matricularte ya en formación reglada.`,
      viabilidad: 'MEDIA',
      documentos: ['Matrícula en curso formativo reglado (FP, idiomas, etc.)', 'Padrón municipal actualizado', 'Pasaporte en vigor'],
      accionPrincipal: 'Ver cursos de formación reglada',
    });
  }

  return recomendaciones;
}

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

const PASOS_ESPANA = [
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'tiempo', label: 'Tiempo' },
  { id: 'situacion', label: 'Situación' },
  { id: 'resultado', label: 'Resultado' },
];
const PASOS_EXTERIOR = [
  { id: 'ubicacion', label: 'Ubicación' },
  { id: 'planes', label: 'Planes' },
  { id: 'resultado', label: 'Resultado' },
];

export default function RecomendadorWizard() {
  const [paso, setPaso] = useState(0);
  const [respuestas, setRespuestas] = useState<Respuestas>({
    estaEnEspana: null,
    mesesEnEspana: null,
    tieneAntecedentes: null,
    tieneOferTrabajo: null,
    estaEstudiando: null,
    tieneAhorrosIPREM: null,
  });

  const enEspana = respuestas.estaEnEspana;
  const pasos = enEspana === false ? PASOS_EXTERIOR : PASOS_ESPANA;
  const totalPasos = pasos.length;

  const siguiente = () => setPaso((p) => Math.min(p + 1, totalPasos - 1));
  const anterior = () => setPaso((p) => Math.max(p - 1, 0));

  const set = (key: keyof Respuestas, value: boolean | number | null) => {
    setRespuestas((prev) => ({ ...prev, [key]: value }));
  };

  const recomendaciones = calcularRecomendaciones(respuestas);
  const viabilidadColor = { ALTA: 'bg-emerald-500', MEDIA: 'bg-amber-400', BAJA: 'bg-red-400' };
  const viabilidadBg = { ALTA: 'border-emerald-100 bg-emerald-50', MEDIA: 'border-amber-100 bg-amber-50', BAJA: 'border-red-100 bg-red-50' };

  // ── Boton Opción ────────────────────────────────────────────────────────────
  const Opcion = ({ label, sub, icon: Icon, selected, onClick }: {
    label: string; sub?: string; icon: React.ElementType;
    selected: boolean; onClick: () => void;
  }) => (
    <button onClick={onClick} className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all duration-200 ${
      selected ? 'border-blue-900 bg-blue-50 shadow-md shadow-blue-900/10' : 'border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50'
    }`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
        selected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-500'
      }`}>
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <p className={`font-bold text-sm ${selected ? 'text-blue-900' : 'text-gray-900'}`}>{label}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
      {selected && <CheckCircle2 className="ml-auto text-blue-900 w-5 h-5 flex-shrink-0" />}
    </button>
  );

  // ─── RENDER PASOS ──────────────────────────────────────────────────────────

  const renderPaso0 = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <MapPin className="w-7 h-7 text-blue-900" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">¿Dónde estás ahora mismo?</h2>
        <p className="text-slate-500 text-sm mt-2">Tu ubicación actual determina qué trámites son posibles para ti.</p>
      </div>
      <Opcion label="Estoy en España" sub="Tengo padrón municipal o residencia" icon={Home} selected={respuestas.estaEnEspana === true} onClick={() => { set('estaEnEspana', true); set('mesesEnEspana', null); }} />
      <Opcion label="Estoy en mi país de origen" sub="Quiero venir a España" icon={Globe2} selected={respuestas.estaEnEspana === false} onClick={() => { set('estaEnEspana', false); set('mesesEnEspana', 0); }} />
    </div>
  );

  const renderPasoTiempoEspana = () => (
    <div className="space-y-3">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Clock className="w-7 h-7 text-blue-900" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">¿Cuánto tiempo llevas en España?</h2>
        <p className="text-slate-500 text-sm mt-2">El tiempo de residencia es clave para los arraigas.</p>
      </div>
      {[
        { label: 'Menos de 1 año', sub: '0–12 meses', value: 0 },
        { label: 'Entre 1 y 2 años', sub: '12–24 meses', value: 18 },
        { label: 'Entre 2 y 3 años', sub: '24–36 meses', value: 27 },
        { label: 'Más de 3 años', sub: '36+ meses', value: 36 },
        { label: 'Más de 5 años', sub: '60+ meses — Residencia Permanente', value: 60 },
      ].map((op) => (
        <Opcion key={op.value} label={op.label} sub={op.sub} icon={Clock} selected={respuestas.mesesEnEspana === op.value} onClick={() => set('mesesEnEspana', op.value)} />
      ))}
    </div>
  );

  const renderPasoSituacion = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Briefcase className="w-7 h-7 text-blue-900" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">Tu situación actual</h2>
        <p className="text-slate-500 text-sm mt-2">Responde a cada pregunta para encontrar tu mejor ruta.</p>
      </div>
      <div className="space-y-4">
        {[
          { key: 'tieneAntecedentes' as keyof Respuestas, label: '¿Tienes antecedentes penales?', icon: ShieldCheck, yesLabel: 'Sí, tengo antecedentes', noLabel: 'No, estoy limpio/a' },
          { key: 'tieneOferTrabajo' as keyof Respuestas, label: '¿Tienes trabajo o contrato?', icon: Briefcase, yesLabel: 'Sí, tengo empleo/contrato', noLabel: 'No tengo trabajo aún' },
          { key: 'estaEstudiando' as keyof Respuestas, label: '¿Estás estudiando o quieres estudiar?', icon: GraduationCap, yesLabel: 'Sí, estudio o me matricularé', noLabel: 'No, no estudio' },
          { key: 'tieneAhorrosIPREM' as keyof Respuestas, label: '¿Tienes ahorros de al menos 600€/mes?', icon: Wallet, yesLabel: 'Sí, tengo esos medios', noLabel: 'No llego a ese importe' },
        ].map(({ key, label, icon: Icon, yesLabel, noLabel }) => (
          <div key={key} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Icon className="w-4 h-4 text-blue-900" />
              <p className="text-sm font-bold text-gray-800">{label}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => set(key, true)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${respuestas[key] === true ? 'bg-blue-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{yesLabel}</button>
              <button onClick={() => set(key, false)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${respuestas[key] === false ? 'bg-blue-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{noLabel}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPasoExteriorPlanes = () => (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-7 h-7 text-blue-900" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">¿Cuáles son tus planes?</h2>
        <p className="text-slate-500 text-sm mt-2">Esto determina el tipo de visado que debes solicitar en el Consulado.</p>
      </div>
      <div className="space-y-4">
        {[
          { key: 'estaEstudiando' as keyof Respuestas, label: '¿Planeas estudiar en España?', icon: GraduationCap, yesLabel: 'Sí, tengo admisión o planeo matricularme', noLabel: 'No estudio' },
          { key: 'tieneOferTrabajo' as keyof Respuestas, label: '¿Tienes oferta de trabajo en España?', icon: Briefcase, yesLabel: 'Sí, empresa española me contratará', noLabel: 'No tengo oferta laboral' },
          { key: 'tieneAhorrosIPREM' as keyof Respuestas, label: '¿Tienes ahorros equivalentes a ~600€/mes?', icon: Wallet, yesLabel: 'Sí, puedo demostrarlo', noLabel: 'No cuento con ese monto' },
        ].map(({ key, label, icon: Icon, yesLabel, noLabel }) => (
          <div key={key} className="p-5 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <Icon className="w-4 h-4 text-blue-900" />
              <p className="text-sm font-bold text-gray-800">{label}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => set(key, true)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${respuestas[key] === true ? 'bg-blue-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{yesLabel}</button>
              <button onClick={() => set(key, false)} className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${respuestas[key] === false ? 'bg-blue-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{noLabel}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResultados = () => (
    <div className="space-y-5">
      <div className="text-center mb-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-900 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-blue-900/20">
          <Sparkles className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-xl font-extrabold text-gray-900">Tu Hoja de Ruta Personalizada</h2>
        <p className="text-slate-500 text-sm mt-1">Basada en la legislación española vigente 2026</p>
      </div>

      {recomendaciones.length === 0 && (
        <div className="p-6 border border-amber-100 bg-amber-50 rounded-2xl flex gap-4">
          <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold text-amber-800 text-sm">Situación compleja</p>
            <p className="text-amber-700 text-xs mt-1">Con tu perfil actual no hay una vía directa clara. Te recomendamos una consulta con nuestro asistente IA para analizar tu caso en detalle.</p>
          </div>
        </div>
      )}

      {recomendaciones.map((tramite) => (
        <div key={tramite.id} className={`rounded-2xl border-2 overflow-hidden ${viabilidadBg[tramite.viabilidad]}`}>
          <div className="p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <span className={`inline-block text-[9px] px-2.5 py-1 rounded-full font-extrabold uppercase tracking-widest text-white mb-2 ${viabilidadColor[tramite.viabilidad]}`}>
                  Viabilidad {tramite.viabilidad}
                </span>
                <h3 className="font-extrabold text-gray-900 leading-tight">{tramite.nombre}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{tramite.categoria}</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">{tramite.descripcion}</p>

            <div className="mb-4">
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mb-2">Documentos necesarios</p>
              <ul className="space-y-1.5">
                {tramite.documentos.map((doc, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-900 flex-shrink-0" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            {tramite.accionPrincipal && (
              <button className="w-full py-3 bg-blue-900 text-white rounded-xl text-xs font-extrabold uppercase tracking-widest hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                <ChevronRight className="w-4 h-4" />
                {tramite.accionPrincipal}
              </button>
            )}
          </div>
        </div>
      ))}

      <button onClick={() => { setPaso(0); setRespuestas({ estaEnEspana: null, mesesEnEspana: null, tieneAntecedentes: null, tieneOferTrabajo: null, estaEstudiando: null, tieneAhorrosIPREM: null }); }} className="w-full py-3 border border-slate-200 text-slate-500 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors mt-2">
        Empezar de nuevo
      </button>
    </div>
  );

  // ─── NAVEGACIÓN POR PASO ──────────────────────────────────────────────────
  const renderContenidoPaso = () => {
    if (paso === 0) return renderPaso0();
    if (enEspana === false) {
      if (paso === 1) return renderPasoExteriorPlanes();
      if (paso === 2) return renderResultados();
    } else {
      if (paso === 1) return renderPasoTiempoEspana();
      if (paso === 2) return renderPasoSituacion();
      if (paso === 3) return renderResultados();
    }
    return renderPaso0();
  };

  const puedeAvanzar = () => {
    if (paso === 0) return respuestas.estaEnEspana !== null;
    if (enEspana === false && paso === 1) return respuestas.estaEstudiando !== null && respuestas.tieneOferTrabajo !== null && respuestas.tieneAhorrosIPREM !== null;
    if (enEspana === true && paso === 1) return respuestas.mesesEnEspana !== null;
    if (enEspana === true && paso === 2) return respuestas.tieneAntecedentes !== null && respuestas.tieneOferTrabajo !== null && respuestas.estaEstudiando !== null && respuestas.tieneAhorrosIPREM !== null;
    return false;
  };

  const esResultado = (enEspana === false && paso === 2) || (enEspana === true && paso === 3);

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-blue-900/5 overflow-hidden">
      {/* Stepper */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 p-6">
        <div className="flex items-center gap-2 justify-center">
          {pasos.map((p, i) => (
            <React.Fragment key={p.id}>
              <div className={`flex flex-col items-center gap-1 ${i <= paso ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold border-2 transition-all ${
                  i < paso ? 'bg-white text-blue-900 border-white' :
                  i === paso ? 'bg-transparent text-white border-white' :
                  'bg-transparent text-blue-300 border-blue-400'
                }`}>
                  {i < paso ? <CheckCircle2 className="w-4 h-4" /> : i + 1}
                </div>
                <span className="text-[9px] font-bold text-blue-200 uppercase tracking-widest">{p.label}</span>
              </div>
              {i < pasos.length - 1 && (
                <div className={`flex-1 h-px max-w-8 ${i < paso ? 'bg-white' : 'bg-blue-700'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Contenido */}
      <div className="p-6 md:p-8">
        {renderContenidoPaso()}
      </div>

      {/* Navegación */}
      {!esResultado && (
        <div className="px-8 pb-8 flex gap-3">
          {paso > 0 && (
            <button onClick={anterior} className="flex items-center gap-2 px-5 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-4 h-4" /> Atrás
            </button>
          )}
          <button
            onClick={siguiente}
            disabled={!puedeAvanzar()}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-blue-900 text-white rounded-xl text-sm font-extrabold uppercase tracking-widest hover:bg-blue-800 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            {paso === totalPasos - 2 ? 'Ver mi hoja de ruta' : 'Continuar'} <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}
