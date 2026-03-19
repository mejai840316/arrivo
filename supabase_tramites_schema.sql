-- ================================================
-- ARRIVO - SCHEMA MOTOR DE RECOMENDACIONES
-- Ejecutar en Supabase SQL Editor
-- ================================================

-- 1. Tabla de Trámites (Catálogo de extranjería)
CREATE TABLE IF NOT EXISTS tramites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  nombre TEXT NOT NULL,
  categoria TEXT, -- 'Arraigo', 'Estancia', 'Residencia', 'Nacionalidad'
  ubicacion_origen TEXT DEFAULT 'España', -- 'España', 'Extranjero', 'Ambos'
  min_años_en_espana NUMERIC DEFAULT 0,
  requisito_iprem_porcentaje INT DEFAULT 100,
  requiere_oferta_trabajo BOOLEAN DEFAULT false,
  requiere_estudio BOOLEAN DEFAULT false,
  permite_antecedentes BOOLEAN DEFAULT false,
  tiempo_resolucion TEXT,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabla de Documentos requeridos por trámite
CREATE TABLE IF NOT EXISTS documentos_requeridos (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  tramite_id UUID REFERENCES tramites(id) ON DELETE CASCADE,
  nombre_documento TEXT NOT NULL,
  descripcion TEXT,
  es_obligatorio BOOLEAN DEFAULT TRUE,
  necesita_apostilla BOOLEAN DEFAULT FALSE,
  etiqueta_accion TEXT, -- e.g., "Generar solicitud de Informe de Integración"
  tipo_accion TEXT      -- 'generate', 'upload', 'download', 'link'
);

-- 3. Tabla de Perfiles de usuario (estado migratorio extendido)
-- Esta tabla reemplaza/extiende la tabla profiles existente
CREATE TABLE IF NOT EXISTS perfiles_usuario (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  nombre_completo TEXT,
  nie TEXT,
  telefono TEXT,
  -- Campo migratorio
  pais_origen TEXT,
  ciudad_origen TEXT,
  pais_actual TEXT DEFAULT 'España',
  esta_en_espana BOOLEAN DEFAULT TRUE,
  fecha_llegada DATE,
  fecha_llegada_prevista DATE,
  meses_en_espana INT DEFAULT 0,
  tiene_antecedentes BOOLEAN DEFAULT FALSE,
  tiene_oferta_trabajo BOOLEAN DEFAULT FALSE,
  esta_estudiando BOOLEAN DEFAULT FALSE,
  ahorros_eur NUMERIC DEFAULT 0,
  -- Trámite activo
  tramite_activo UUID REFERENCES tramites(id),
  puntos_viabilidad INT DEFAULT 0,
  -- Padrón Tracker
  fecha_solicitud_padron DATE,
  notificacion_90_dias_enviada BOOLEAN DEFAULT FALSE,
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ================================================
-- DATOS: Catálogo completo de trámites 2026
-- ================================================

-- ARRAIGAS
INSERT INTO tramites (nombre, categoria, ubicacion_origen, min_años_en_espana, requisito_iprem_porcentaje, requiere_oferta_trabajo, requiere_estudio, permite_antecedentes, tiempo_resolucion, descripcion) VALUES
('Arraigo Social', 'Arraigo', 'España', 3, 100, false, false, false, '3-6 meses', 'Para extranjeros con 3 años de residencia en España (2 años con reforma 2026) demostrable con padrón. Requiere informe de integración municipal y medios económicos del 100% IPREM.'),
('Arraigo Laboral', 'Arraigo', 'España', 2, 0, true, false, false, '3-6 meses', 'Para trabajadores con relaciones laborales documentadas durante al menos 2 años en España. Requiere nóminas, contratos o resoluciones de inspección de trabajo.'),
('Arraigo para la Formación', 'Arraigo', 'España', 2, 0, false, true, false, '3-6 meses', 'Para extranjeros con 2 años en España que se comprometan a iniciar formación profesional reglada. No requiere IPREM mientras estudian. Ideal para jóvenes sin contrato.'),
('Arraigo Familiar', 'Arraigo', 'España', 0, 0, false, false, false, '2-4 meses', 'Para familiares directos de ciudadanos españoles o extranjeros con residencia legal. El tiempo requerido y IPREM varían según el grado de parentesco.');

-- ESTANCIAS
INSERT INTO tramites (nombre, categoria, ubicacion_origen, min_años_en_espana, requisito_iprem_porcentaje, requiere_oferta_trabajo, requiere_estudio, permite_antecedentes, tiempo_resolucion, descripcion) VALUES
('Visado de Estancia por Estudios', 'Estancia', 'Extranjero', 0, 100, false, true, false, '1-3 meses', 'Para iniciar formación universitaria o FP en España desde tu país de origen. Requiere carta de admisión, seguro médico y demostrar capacidad económica de ~600€/mes (100% IPREM).'),
('Estancia por Búsqueda de Empleo', 'Estancia', 'España', 0, 100, false, false, false, '1-2 meses', 'Disponible para extranjeros que hayan finalizado estudios en España. Permite permanecer hasta 12 meses adicionales buscando trabajo. Requiere 100% IPREM de ahorros.'),
('Estancia por Prácticas', 'Estancia', 'Ambos', 0, 100, true, true, false, '1-3 meses', 'Para estudiantes o recién titulados que han encontrado empresa dispuesta a recibirlos en prácticas. Requiere convenio de prácticas firmado.');

-- RESIDENCIAS
INSERT INTO tramites (nombre, categoria, ubicacion_origen, min_años_en_espana, requisito_iprem_porcentaje, requiere_oferta_trabajo, requiere_estudio, permite_antecedentes, tiempo_resolucion, descripcion) VALUES
('Reagrupación Familiar', 'Residencia', 'Extranjero', 1, 150, false, false, false, '3-6 meses', 'Para traer a cónyuge, hijos menores o ascendientes dependientes. Requiere 1 año de residencia legal previa y 150% IPREM para 2 personas.'),
('Residencia de Larga Duración', 'Residencia', 'España', 5, 0, false, false, false, '3-6 meses', 'Para extranjeros con 5 años continuados de residencia legal en España. Otorga los mismos derechos que el NIE permanente. No requiere IPREM específico pero sí medios económicos suficientes.');

-- ================================================
-- DOCUMENTOS por trámite (ejemplos principales)
-- ================================================

-- Arraigo Social
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Pasaporte en vigor', true, false, 'Subir copia del pasaporte', 'upload' FROM tramites WHERE nombre = 'Arraigo Social';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Certificado de Padrón Municipal (3 años)', true, false, 'Solicitar certificado online', 'link' FROM tramites WHERE nombre = 'Arraigo Social';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Informe de Integración Municipal', true, false, 'Generar solicitud de Informe de Integración', 'generate' FROM tramites WHERE nombre = 'Arraigo Social';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Certificado de Antecedentes Penales del país de origen', true, true, 'Solicitar apostilla online', 'link' FROM tramites WHERE nombre = 'Arraigo Social';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Justificante de medios económicos (100% IPREM = 600€/mes)', true, false, 'Ver guía de medios económicos', 'link' FROM tramites WHERE nombre = 'Arraigo Social';

-- Arraigo para la Formación
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Pasaporte en vigor', true, false, 'Subir copia del pasaporte', 'upload' FROM tramites WHERE nombre = 'Arraigo para la Formación';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Certificado de Padrón Municipal (2 años)', true, false, 'Solicitar certificado online', 'link' FROM tramites WHERE nombre = 'Arraigo para la Formación';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Compromiso de matrícula en formación reglada', true, false, 'Adjuntar carta de admisión o matrícula', 'upload' FROM tramites WHERE nombre = 'Arraigo para la Formación';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Certificado de Antecedentes Penales', true, true, 'Solicitar apostilla online', 'link' FROM tramites WHERE nombre = 'Arraigo para la Formación';

-- Visado de Estancia por Estudios
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Pasaporte en vigor (mín. 1 año)', true, false, 'Subir copia del pasaporte', 'upload' FROM tramites WHERE nombre = 'Visado de Estancia por Estudios';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Carta de admisión del centro educativo', true, false, 'Adjuntar carta de admisión', 'upload' FROM tramites WHERE nombre = 'Visado de Estancia por Estudios';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Seguro médico privado (cobertura total en España)', true, false, 'Generar Seguro Médico recomendado', 'generate' FROM tramites WHERE nombre = 'Visado de Estancia por Estudios';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Justificante de medios económicos (~600€/mes)', true, false, 'Calcular IPREM necesario', 'link' FROM tramites WHERE nombre = 'Visado de Estancia por Estudios';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Certificado de Antecedentes Penales apostillado', true, true, 'Solicitar apostilla', 'link' FROM tramites WHERE nombre = 'Visado de Estancia por Estudios';
INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla, etiqueta_accion, tipo_accion)
SELECT id, 'Formulario EX-01 solicitud de visado estudios', true, false, 'Descargar formulario EX-01', 'download' FROM tramites WHERE nombre = 'Visado de Estancia por Estudios';

-- ================================================
-- RLS (Row Level Security)
-- ================================================
ALTER TABLE tramites ENABLE ROW LEVEL SECURITY;
ALTER TABLE documentos_requeridos ENABLE ROW LEVEL SECURITY;
ALTER TABLE perfiles_usuario ENABLE ROW LEVEL SECURITY;

-- Tramites: lectura pública, escritura solo para admins
DROP POLICY IF EXISTS "Todos pueden ver tramites" ON tramites;
CREATE POLICY "Todos pueden ver tramites" ON tramites FOR SELECT USING (true);

DROP POLICY IF EXISTS "Todos pueden ver documentos" ON documentos_requeridos;
CREATE POLICY "Todos pueden ver documentos" ON documentos_requeridos FOR SELECT USING (true);

-- Perfiles: solo el propio usuario puede ver/editar sus datos
DROP POLICY IF EXISTS "Usuario ve su propio perfil" ON perfiles_usuario;
CREATE POLICY "Usuario ve su propio perfil" ON perfiles_usuario FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Usuario actualiza su propio perfil" ON perfiles_usuario;
CREATE POLICY "Usuario actualiza su propio perfil" ON perfiles_usuario FOR ALL USING (auth.uid() = id);
