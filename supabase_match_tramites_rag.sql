-- ================================================
-- CORRECCIONES Y FUNCIÓN IA (RAG) PARA TRAMITES
-- Ejecutar en el SQL Editor de Supabase
-- ================================================

-- 1. Modificar la dimensión del vector para que coincida con Gemini (768 dimensiones). 
-- Originalmente estaba pensado para OpenAI (1536), pero estamos usando Gemini text-embedding-004.
ALTER TABLE conocimiento_tramites
ALTER COLUMN embedding TYPE vector(768);

-- 2. Otorgar permisos para que el script Node.js y la app Next.js puedan operar la tabla
GRANT ALL ON TABLE conocimiento_tramites TO anon, authenticated, service_role;

-- 3. Crear función de similitud (búsqueda vectorial RAG)
CREATE OR REPLACE FUNCTION match_conocimiento_tramites(
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id uuid,
  pregunta text,
  respuesta text,
  categoria text,
  palabras_clave text[],
  similarity float
)
LANGUAGE sql STABLE
AS $$
  SELECT
    id,
    pregunta,
    respuesta,
    categoria,
    palabras_clave,
    1 - (conocimiento_tramites.embedding <=> query_embedding) AS similarity
  FROM conocimiento_tramites
  WHERE 1 - (conocimiento_tramites.embedding <=> query_embedding) > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;
