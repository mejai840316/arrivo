-- ==========================================
-- SCRIPT DE DATOS SEMILLA PARA ARRIVO (2026)
-- IMPORTANTE: Ejecutar esto DESPUÉS de supabase_tramites_schema.sql
-- ==========================================

-- Limpiar tablas por si acaso (para no duplicar si se ejecuta varias veces)
TRUNCATE TABLE documentos_requeridos CASCADE;
TRUNCATE TABLE tramites CASCADE;

-- Insertar Trámites (El catálogo de extranjería en España)
INSERT INTO tramites (id, nombre, categoria, ubicacion_origen, requisito_iprem_porcentaje, descripcion)
VALUES 
  -- Arraigos (Para personas ya en España)
  ('11111111-1111-1111-1111-111111111111', 'Arraigo Social', 'Arraigo', 'España', 100, 'Para extranjeros que llevan mínimo 3 años en España (2 años con la nueva reforma). Permite trabajar.'),
  ('22222222-2222-2222-2222-222222222222', 'Arraigo Laboral', 'Arraigo', 'España', 0, 'Para extranjeros que llevan mínimo 2 años en España y pueden demostrar 6 meses continuados de relación laboral.'),
  ('33333333-3333-3333-3333-333333333333', 'Arraigo para la Formación', 'Arraigo', 'España', 0, 'Para extranjeros que llevan mínimo 2 años en España y se comprometen a realizar una formación para el empleo.'),
  ('44444444-4444-4444-4444-444444444444', 'Arraigo Familiar', 'Arraigo', 'España', 0, 'Para cónyuges o parejas de ciudadanos españoles, así como padres o madres de menores españoles.'),
  
  -- Estancias y Residencias (Para personas fuera o dentro)
  ('55555555-5555-5555-5555-555555555555', 'Estancia por Estudios (Inicial)', 'Estancia', 'Ambos', 100, 'Permite estudiar en un centro autorizado en España al menos 20h semanales. Requiere solvencia del 100% del IPREM.'),
  ('66666666-6666-6666-6666-666666666666', 'Búsqueda de Empleo tras Estudios', 'Estancia', 'España', 100, 'Permiso de 12 a 24 meses para buscar empleo o emprender una vez finalizados los estudios superiores.'),
  ('77777777-7777-7777-7777-777777777777', 'Nómada Digital', 'Residencia', 'Ambos', 200, 'Visado para teletrabajadores internacionales. Requiere demostrar solvencia económica del 200% del SMI o IPREM.')
ON CONFLICT DO NOTHING;

-- Insertar Documentos Requeridos (Vinculados a los trámites anteriores)
-- FORMATO: (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla)

INSERT INTO documentos_requeridos (tramite_id, nombre_documento, es_obligatorio, necesita_apostilla)
VALUES
  -- Para Arraigo Social (ID termnado en 1111)
  ('11111111-1111-1111-1111-111111111111', 'Pasaporte completo en vigor (Todas las páginas)', TRUE, FALSE),
  ('11111111-1111-1111-1111-111111111111', 'Certificado de Antecedentes Penales del país de origen', TRUE, TRUE),
  ('11111111-1111-1111-1111-111111111111', 'Certificado de Padrón Histórico (Últimos 3 años)', TRUE, FALSE),
  ('11111111-1111-1111-1111-111111111111', 'Informe de Inserción Social (Emitido por Comunidad Autónoma)', TRUE, FALSE),
  ('11111111-1111-1111-1111-111111111111', 'Precontrato de trabajo firmado por empleador', FALSE, FALSE),
  ('11111111-1111-1111-1111-111111111111', 'Tasa 790 código 052 pagada', TRUE, FALSE),

  -- Para Arraigo Laboral (ID terminado en 2222)
  ('22222222-2222-2222-2222-222222222222', 'Pasaporte completo en vigor', TRUE, FALSE),
  ('22222222-2222-2222-2222-222222222222', 'Certificado de Antecedentes Penales', TRUE, TRUE),
  ('22222222-2222-2222-2222-222222222222', 'Certificado de Padrón Histórico (Últimos 2 años)', TRUE, FALSE),
  ('22222222-2222-2222-2222-222222222222', 'Resolución judicial o administrativa de la relación laboral', TRUE, FALSE),

  -- Para Arraigo Formación (ID terminado en 3333)
  ('33333333-3333-3333-3333-333333333333', 'Pasaporte completo en vigor', TRUE, FALSE),
  ('33333333-3333-3333-3333-333333333333', 'Certificado de Antecedentes Penales', TRUE, TRUE),
  ('33333333-3333-3333-3333-333333333333', 'Certificado de Padrón Histórico (Últimos 2 años)', TRUE, FALSE),
  ('33333333-3333-3333-3333-333333333333', 'Compromiso de matrícula en Formación Profesional (CPV)', TRUE, FALSE),

  -- Para Estancia por Estudios (ID terminado en 5555)
  ('55555555-5555-5555-5555-555555555555', 'Pasaporte completo en vigor', TRUE, FALSE),
  ('55555555-5555-5555-5555-555555555555', 'Carta de admisión del centro de estudios en España', TRUE, FALSE),
  ('55555555-5555-5555-5555-555555555555', 'Extractos bancarios recientes o beca adjudicada', TRUE, FALSE),
  ('55555555-5555-5555-5555-555555555555', 'Seguro médico sin copagos', TRUE, FALSE),
  ('55555555-5555-5555-5555-555555555555', 'Certificado médico oficial (Enfermedades infecciosas)', TRUE, TRUE),
  ('55555555-5555-5555-5555-555555555555', 'Certificado de Antecedentes Penales del país de origen', TRUE, TRUE);

-- Fin del script
