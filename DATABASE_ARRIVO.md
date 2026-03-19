# Diseño de Base de Datos - Arrivo (mejai84)

La base de datos de Arrivo se asienta sobre **Supabase (PostgreSQL)**, optimizada para **SaaS LegalTech** con capacidades de búsqueda vectorial mediante **pgvector**.

## 📊 Entidades y Relaciones

### 1. Tabla: `profiles`
Almacena la información institucional y legal de cada usuario tras completar el Wizard.
- `id`: UUID (vinculado a `auth.users`).
- `full_name`: TEXT (Nombre completo pasaporte).
- `birth_date`: DATE.
- `country_origin`: TEXT.
- `nie`: TEXT (Identificación española).
- `passport_number`: TEXT.
- `phone`: TEXT.
- `address`: TEXT.
- `nie_file_url`: TEXT (Referencia segura en Storage).
- `passport_file_url`: TEXT (Referencia segura en Storage).
- `updated_at`: TIMESTAMP WITH TIME ZONE.

### 2. Tabla: `legal_knowledge` (Módulo de IA)
Almacena el conocimiento legal extraído del BOE y vectorizado con Gemini.
- `id`: UUID.
- `title`: TEXT (Título de la ley/resolución).
- `content`: TEXT (Cuerpo del texto legal).
- `category`: TEXT (Arraigo, Visados, Nacionalidad, etc.).
- `url`: TEXT (Enlace oficial al BOE).
- `embedding`: VECTOR(768) (Representación numérica de **Gemini text-embedding-004**).
- `published_at`: TIMESTAMP WITH TIME ZONE.

### 3. Tabla: `procedures` (Trámites)
Registro de expedientes de usuario.
- `id`: UUID.
- `user_id`: UUID (Relación con `profiles`).
- `title`: TEXT.
- `status`: TEXT (En proceso, Pendiente, Resuelto).
- `start_date`: TIMESTAMP WITH TIME ZONE.
- `last_update`: TIMESTAMP WITH TIME ZONE.

## 🔍 Funciones Especiales (Búsqueda Semántica)
Se utiliza la función `match_legal_knowledge(query_embedding, match_threshold, match_count)` para encontrar las leyes más relevantes mediante similitud de coseno, permitiendo al sistema responder dudas legales precisas.

## 🔒 Políticas de Seguridad (RLS)
- **Profiles**: Solo el propietario puede leer/escribir su perfil (`id = auth.uid()`).
- **Legal Knowledge**: Lectura pública para todos los autenticados.
- **Storage**: Cubo `user_documents` con políticas RLS para que solo el propietario acceda a sus fotos de NIE/Pasaporte.
