/**
 * Utilidades de Validación Legal Arrivo (Reforma 2026)
 */

export const CHECKLIST_EXTRANJERIA = {
  "ARRAIGO_SOCIAL": ["EX-10", "PASAPORTE_COMPLETO", "ANTECEDENTES_PENALES", "INFORME_INSERCION", "CONTRATO_TRABAJO"],
  "NACIONALIDAD": ["MODELO_790_026", "PASAPORTE", "CCSE", "DELE", "ANTECEDENTES_ORIGEN"],
  "ESTUDIANTES": ["EX-00", "MATRICULA_CENTRO", "SEGURO_MEDICO", "MEDIOS_ECONOMICOS"]
};

export type TramiteType = keyof typeof CHECKLIST_EXTRANJERIA;

export function validarExpediente(tipoTramite: TramiteType, archivosSubidos: { name: string }[]) {
  const requisitos = CHECKLIST_EXTRANJERIA[tipoTramite];
  if (!requisitos) return { status: "ERROR", mensaje: "Trámite no reconocido" };

  const faltantes = requisitos.filter(req => 
    !archivosSubidos.some(file => file.name.toUpperCase().includes(req))
  );

  if (faltantes.length === 0) {
    return { 
      status: "LISTO", 
      mensaje: "Expediente completo para plataforma Mercurio." 
    };
  } else {
    return { 
      status: "INCOMPLETO", 
      mensaje: "Faltan documentos críticos",
      faltantes 
    };
  }
}

export const MANUAL_PRESENTACION = [
  { fase: "1. Preparación", accion: "Escanear todo en PDF (Máx 5MB por archivo).", herramienta: "Scanner / App móvil" },
  { fase: "2. Firma", accion: "Signar el formulario EX con AutoFirma.", herramienta: "AutoFirma (Portal MINHAFP)" },
  { fase: "3. Pago", accion: "Pagar la tasa telemáticamente o en banco.", herramienta: "Pasarela AEAT" },
  { fase: "4. Envío", accion: "Acceder a Mercurio y subir los archivos.", herramienta: "Sede Electrónica" },
  { fase: "5. Justificante", accion: "Descargar el 'Recibo' (Clave de Registro).", herramienta: "Registro Electrónico" },
];
