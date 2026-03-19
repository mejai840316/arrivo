'use client';

import React, { useState } from 'react';
import { Globe2, DollarSign, ArrowRight, Calculator, ExternalLink, CheckCircle2, Circle, AlertTriangle, Plane } from 'lucide-react';

// ─── DATOS ────────────────────────────────────────────────────────────────────

// IPREM 2026 mensual (indicativo, actualizar con BOE)
const IPREM_MENSUAL_EUR = 600;
const IPREM_ANUAL_EUR = 7200;

// Tasas aproximadas vs EUR (se pueden actualizar con API real)
const TASAS_CAMBIO: Record<string, { nombre: string; simbolo: string; porEur: number; pais: string }> = {
  COP: { nombre: 'Peso Colombiano', simbolo: 'COP', porEur: 4350, pais: 'Colombia' },
  MXN: { nombre: 'Peso Mexicano', simbolo: 'MXN', porEur: 19.5, pais: 'México' },
  ARS: { nombre: 'Peso Argentino', simbolo: 'ARS', porEur: 990, pais: 'Argentina' },
  BOB: { nombre: 'Boliviano', simbolo: 'BOB', porEur: 7.9, pais: 'Bolivia' },
  PEN: { nombre: 'Sol Peruano', simbolo: 'PEN', porEur: 4.3, pais: 'Perú' },
  VES: { nombre: 'Bolívar Venezolano', simbolo: 'VES', porEur: 43, pais: 'Venezuela' },
  GTQ: { nombre: 'Quetzal Guatemalteco', simbolo: 'GTQ', porEur: 8.8, pais: 'Guatemala' },
  HNL: { nombre: 'Lempira Hondureño', simbolo: 'HNL', porEur: 28, pais: 'Honduras' },
  DOP: { nombre: 'Peso Dominicano', simbolo: 'DOP', porEur: 64, pais: 'Rep. Dominicana' },
  UAH: { nombre: 'Grivna Ucraniana', simbolo: 'UAH', porEur: 44, pais: 'Ucrania' },
  MAD: { nombre: 'Dírham Marroquí', simbolo: 'MAD', porEur: 10.9, pais: 'Marruecos' },
  BRL: { nombre: 'Real Brasileño', simbolo: 'BRL', porEur: 5.6, pais: 'Brasil' },
  CLP: { nombre: 'Peso Chileno', simbolo: 'CLP', porEur: 1000, pais: 'Chile' },
  USD: { nombre: 'Dólar Americano', simbolo: 'USD', porEur: 1.08, pais: 'EEUU / General' },
};

// Consulados de España (principales ciudades latinoamérica)
const CONSULADOS = [
  { pais: 'Colombia', ciudad: 'Bogotá', url: 'https://www.exteriores.gob.es/Consulados/bogota/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/bogota/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'Colombia', ciudad: 'Medellín', url: 'https://www.exteriores.gob.es/Consulados/medellin/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/medellin/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'México', ciudad: 'Ciudad de México', url: 'https://www.exteriores.gob.es/Consulados/ciudad-de-mexico/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/ciudad-de-mexico/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'Argentina', ciudad: 'Buenos Aires', url: 'https://www.exteriores.gob.es/Consulados/buenosaires/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/buenosaires/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'Venezuela', ciudad: 'Caracas', url: 'https://www.exteriores.gob.es/Consulados/caracas/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/caracas/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'Perú', ciudad: 'Lima', url: 'https://www.exteriores.gob.es/Consulados/lima/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/lima/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'Rep. Dominicana', ciudad: 'Santo Domingo', url: 'https://www.exteriores.gob.es/Consulados/santodomingo/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/santodomingo/es/ServiciosConsulares/Paginas/citas.aspx' },
  { pais: 'Marruecos', ciudad: 'Casablanca', url: 'https://www.exteriores.gob.es/Consulados/casablanca/es/Paginas/index.aspx', cita: 'https://www.exteriores.gob.es/Consulados/casablanca/es/ServiciosConsulares/Paginas/citas.aspx' },
];

// Checklist de pre-salida
const CHECKLIST_PRE_SALIDA = [
  { id: 'visado', texto: 'Obtener el visado de estudios en el Consulado español', critico: true },
  { id: 'seguro', texto: 'Contratar seguro médico internacional (mínimo 1 año, cobertura total España)', critico: true },
  { id: 'admision', texto: 'Carta de admisión del centro educativo en España', critico: true },
  { id: 'ahorros', texto: 'Justificante bancario de ahorros (~600€/mes de estancia)', critico: true },
  { id: 'antecedentes', texto: 'Certificado de antecedentes penales del país con Apostilla de La Haya', critico: true },
  { id: 'pasaporte', texto: 'Pasaporte vigente (mínimo 1 año desde la fecha de llegada)', critico: true },
  { id: 'vuelo', texto: 'Billete de avión (ida o ida y vuelta si piden la salida)', critico: false },
  { id: 'alojamiento', texto: 'Justificante de alojamiento inicial (reserva hotel, Airbnb o carta de acogida)', critico: false },
  { id: 'nif-espana', texto: 'Localizar la Oficina de Extranjería y Comisaría en la ciudad de destino', critico: false },
  { id: 'padron', texto: 'Planificar el empadronamiento inmediatamente al llegar', critico: false },
  { id: 'nie', texto: 'Solicitar cita para el NIE en comisaría (primer mes en España)', critico: false },
];

// ─── COMPONENTE PRINCIPAL ─────────────────────────────────────────────────────

export default function InternationalMode() {
  const [moneda, setMoneda] = useState<string>('COP');
  const [ahorros, setAhorros] = useState<string>('');
  const [checklist, setChecklist] = useState<Set<string>>(new Set());
  const [paisFiltro, setPaisFiltro] = useState<string>('Colombia');

  const tasa = TASAS_CAMBIO[moneda];
  const ahorrosNum = parseFloat(ahorros.replace(/,/g, '')) || 0;
  const ahorrosEur = tasa ? ahorrosNum / tasa.porEur : 0;
  const mesesCubiertos = ahorrosEur / IPREM_MENSUAL_EUR;
  const cumpleIPREM = ahorrosEur >= IPREM_MENSUAL_EUR;
  const paises = [...new Set(CONSULADOS.map((c) => c.pais))];
  const consuladosFiltrados = CONSULADOS.filter((c) => c.pais === paisFiltro);

  const toggleCheck = (id: string) => {
    setChecklist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const completados = CHECKLIST_PRE_SALIDA.filter((i) => checklist.has(i.id)).length;
  const totalItems = CHECKLIST_PRE_SALIDA.length;
  const progreso = Math.round((completados / totalItems) * 100);

  return (
    <div className="space-y-6">
      {/* Cabecera International Mode */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 p-8 text-white shadow-2xl shadow-blue-900/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-600/10 rounded-full translate-y-24 -translate-x-12" />
        <div className="relative flex items-center gap-4">
          <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
            <Plane className="w-7 h-7 text-white" />
          </div>
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-200 mb-1">Modo Internacional Activo</p>
            <h2 className="text-2xl font-extrabold leading-tight">Desde tu país hasta España</h2>
            <p className="text-blue-200/80 text-sm mt-1">Tu guía completa para llegar legalmente a España</p>
          </div>
        </div>
      </div>

      {/* GRID 2 columnas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. CALCULADORA IPREM ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calculator className="w-4 h-4 text-blue-900" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Calculadora IPREM</h3>
                <p className="text-[10px] text-slate-400 font-medium">¿Te alcanza para el visado de estudios?</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-5">
            {/* Selector moneda */}
            <div>
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Tu moneda local</label>
              <select
                value={moneda}
                onChange={(e) => setMoneda(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
              >
                {Object.entries(TASAS_CAMBIO).map(([code, data]) => (
                  <option key={code} value={code}>{data.pais} — {data.nombre} ({code})</option>
                ))}
              </select>
            </div>

            {/* Input ahorros */}
            <div>
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">
                Mis ahorros en {tasa?.simbolo}
              </label>
              <div className="relative">
                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={ahorros}
                  onChange={(e) => setAhorros(e.target.value)}
                  placeholder="Ej: 12000000"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-900/20"
                />
              </div>
            </div>

            {/* Resultado */}
            {ahorrosNum > 0 && tasa && (
              <div className={`rounded-2xl border-2 p-5 transition-all ${cumpleIPREM ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
                <div className="flex items-center gap-2 mb-3">
                  {cumpleIPREM
                    ? <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    : <AlertTriangle className="w-5 h-5 text-amber-600" />
                  }
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${cumpleIPREM ? 'text-emerald-700' : 'text-amber-700'}`}>
                    {cumpleIPREM ? '✓ Cumples con el IPREM' : '⚠ Por debajo del IPREM'}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500">Tus ahorros equivalen a</span>
                    <span className="font-extrabold text-gray-900">{ahorrosEur.toFixed(0)} €</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500">IPREM requerido (100%)</span>
                    <span className="font-bold text-slate-600">{IPREM_MENSUAL_EUR} €/mes</span>
                  </div>
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs text-slate-500">Meses que puedes cubrir</span>
                    <span className={`font-extrabold ${mesesCubiertos >= 12 ? 'text-emerald-600' : mesesCubiertos >= 6 ? 'text-amber-600' : 'text-red-600'}`}>
                      {mesesCubiertos.toFixed(1)} meses
                    </span>
                  </div>
                  {!cumpleIPREM && (
                    <p className="text-xs text-amber-700 mt-3 font-medium bg-amber-100 rounded-xl px-3 py-2">
                      Te faltan {(IPREM_MENSUAL_EUR - ahorrosEur).toFixed(0)} € para alcanzar el mínimo mensual requerido para el visado de estudios.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 2. CITAS CONSULARES ──────────────────────────────────────────────── */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
                <Globe2 className="w-4 h-4 text-blue-900" />
              </div>
              <div>
                <h3 className="font-extrabold text-gray-900 text-sm">Consulados de España</h3>
                <p className="text-[10px] text-slate-400 font-medium">Pide tu cita de visado</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {/* Filtro país */}
            <div>
              <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Tu país</label>
              <div className="flex flex-wrap gap-2">
                {paises.map((p) => (
                  <button key={p} onClick={() => setPaisFiltro(p)} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${paisFiltro === p ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Consulados del país */}
            <div className="space-y-3">
              {consuladosFiltrados.length > 0 ? consuladosFiltrados.map((c, i) => (
                <div key={i} className="border border-slate-100 rounded-2xl p-4 hover:border-blue-100 hover:bg-slate-50 transition-all">
                  <p className="font-extrabold text-gray-900 text-sm mb-1">{c.ciudad}</p>
                  <p className="text-xs text-slate-500 mb-3">Consulado General de España en {c.ciudad}</p>
                  <div className="flex gap-2">
                    <a href={c.url} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-white hover:border-blue-200 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" /> Web
                    </a>
                    <a href={c.cita} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold hover:bg-blue-800 transition-colors">
                      <ArrowRight className="w-3.5 h-3.5" /> Pedir Cita
                    </a>
                  </div>
                </div>
              )) : (
                <div className="text-center py-8 text-slate-400">
                  <Globe2 className="w-8 h-8 mx-auto mb-2 opacity-30" />
                  <p className="text-sm font-medium">Consulado no disponible aún</p>
                  <a href="https://www.exteriores.gob.es/es/EmbajadasConsulados/Paginas/index.aspx" target="_blank" rel="noopener noreferrer" className="text-blue-700 text-xs font-bold hover:underline mt-1 block">
                    Ver todos los consulados →
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. CHECKLIST PRE-SALIDA ─────────────────────────────────────────────── */}
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center">
              <Plane className="w-4 h-4 text-blue-900" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-sm">Checklist Pre-Salida</h3>
              <p className="text-[10px] text-slate-400 font-medium">Todo lo que necesitas antes de volar a España</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-extrabold text-blue-900">{progreso}%</p>
            <p className="text-[10px] text-slate-400 font-bold">{completados}/{totalItems}</p>
          </div>
        </div>
        {/* Barra de progreso */}
        <div className="h-1.5 bg-slate-100">
          <div className="h-full bg-blue-900 transition-all duration-500 rounded-full" style={{ width: `${progreso}%` }} />
        </div>
        <div className="p-6 space-y-2">
          {CHECKLIST_PRE_SALIDA.map((item) => (
            <button key={item.id} onClick={() => toggleCheck(item.id)} className={`w-full flex items-center gap-4 p-4 rounded-xl text-left transition-all ${checklist.has(item.id) ? 'bg-emerald-50 border-2 border-emerald-100' : 'border-2 border-transparent hover:bg-slate-50'}`}>
              {checklist.has(item.id)
                ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                : <Circle className="w-5 h-5 text-slate-300 flex-shrink-0" />
              }
              <div className="flex-1">
                <span className={`text-sm font-medium transition-all ${checklist.has(item.id) ? 'line-through text-slate-400' : 'text-gray-800'}`}>
                  {item.texto}
                </span>
              </div>
              {item.critico && !checklist.has(item.id) && (
                <span className="text-[9px] px-2 py-1 bg-red-50 text-red-600 font-extrabold uppercase tracking-widest rounded-lg flex-shrink-0">CRÍTICO</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
