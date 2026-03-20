/**
 * Configuración Maestra Arrivo Legal (2026+)
 * Centraliza importes, plazos y normativa para actualizaciones rápidas.
 */

export const LEGAL_CONFIG = {
  VERSION: "2026.1.1",
  LAST_UPDATE: "20 Mar 2026",
  
  // Importes Tasas 790-052
  FEES: {
    ARRAIGO: { code: '2.5', amount: 38.28, label: "Arraigo (Social/Laboral/Formación)" },
    REAGRUPACION: { code: '2.1', amount: 10.94, label: "Reagrupación Familiar" },
    RENOVACION: { code: '2.2', amount: 16.40, label: "Renovación Residencia" },
    CERTIFICADO_UE: { code: '2.6', amount: 12.00, label: "Ciudadano UE" },
  },

  // Parámetros de Diagnóstico
  IPREM_2026: 7200.00, // Anual (simulado)
  MIN_RESIDENCY_ARRAIGO: 3, // Años
  MIN_RESIDENCY_ARRAIGO_SOCIAL_SPECIAL: 2, // Años con informe municipal

  // Meta-datos de Vigilancia (Para el Administrador)
  MONITORING: {
    BOE_SOURCE: "https://www.boe.es/buscar/act.php?id=BOE-A-2024-24142",
    PORTAL_INMIGRACION: "https://extranjeros.inclusion.gob.es/",
    ALERT_ON_CHANGE: true,
  }
};
