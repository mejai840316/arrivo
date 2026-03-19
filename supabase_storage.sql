-- 1. Crear el bucket para documentos de usuario si no existe
-- (Se hace desde el dashboard de Supabase usualmente, pero aquí las políticas)

-- 2. Políticas de Almacenamiento (Supabase Storage)
-- Permitir a usuarios subir sus propios documentos
CREATE POLICY "Users can upload their own documents"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'user_documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir a usuarios ver solo sus propios documentos
CREATE POLICY "Users can view their own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'user_documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir a usuarios borrar sus propios documentos
CREATE POLICY "Users can delete their own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'user_documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- 3. Actualizar la tabla profiles para almacenar las URLs o referencias
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS nie_file_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS passport_file_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS empadronamiento_file_url TEXT;
