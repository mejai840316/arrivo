-- Extensión requerida para búsqueda vectorial
CREATE EXTENSION IF NOT EXISTS vector;

-- Tabla para el conocimiento legal (RAG - Retrieval Augmented Generation)
CREATE TABLE IF NOT EXISTS legal_knowledge (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT,
  url TEXT,
  embedding vector(768), -- Optimizado para Gemini (768 dimensiones)
  published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de perfiles de usuario (trámites institucionales)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  full_name TEXT,
  birth_date DATE,
  country_origin TEXT,
  nie TEXT UNIQUE,
  passport_number TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Función para búsqueda semántica por similitud de coseno
CREATE OR REPLACE FUNCTION match_legal_knowledge (
  query_embedding vector(768),
  match_threshold float,
  match_count int
)
RETURNS TABLE (
  id UUID,
  title TEXT,
  content TEXT,
  category TEXT,
  url TEXT,
  similarity float
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT
    legal_knowledge.id,
    legal_knowledge.title,
    legal_knowledge.content,
    legal_knowledge.category,
    legal_knowledge.url,
    1 - (legal_knowledge.embedding <=> query_embedding) AS similarity
  FROM legal_knowledge
  WHERE 1 - (legal_knowledge.embedding <=> query_embedding) > match_threshold
  ORDER BY legal_knowledge.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;

-- RLS (Row Level Security)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

ALTER TABLE legal_knowledge ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read legal knowledge" ON legal_knowledge FOR SELECT TO authenticated USING (true);
