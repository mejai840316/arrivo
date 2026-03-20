# Diseño de Base de Datos - Arrivo (mejai84)

La base de datos de Arrivo se asienta sobre **Supabase (PostgreSQL)**, optimizada para **SaaS LegalTech** con capacidades de búsqueda vectorial mediante **pgvector**.

## 📊 Entidades y Relaciones

### 2.2 Tabla: `perfiles_usuario` (Perfil Extendido y Tracker)
Almacena el perfil del inmigrante o interesado, ligado a un ID de Supabase Auth.
*   **Campos Relevantes:**
    *   `id` (UUID - PK y FK hacia `auth.users`)
    *   `nombre_completo`, `nie`, `telefono`, `pais_origen`, `fecha_llegada`
    *   `meses_en_espana` (INT), `tiene_antecedentes` (BOOLEAN)
    *   `ahorros_eur` (NUMERIC)
*   **Tracking Legal / Padrón (Módulo Fase 2):**
    *   `fecha_solicitud_padron` (DATE): Marca el inicio del periodo de silencio administrativo (90 días).
    *   `notificacion_90_dias_enviada` (BOOLEAN): Control para evitar SPAM del script Cron en `/api/cron/check-padron`.
*   Relacionado con `tramites_activos` / seguimiento.
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

### 2.3 Tabla: `conocimiento_tramites` (Knowledge Base / FAQ AI)
Almacena preguntas y respuestas extraídas del chat, y sus palabras clave para un futuro uso por el chatbot / recomendaciones.
- `id`: UUID.
- `pregunta`: TEXT.
- `respuesta`: TEXT.
- `categoria`: TEXT (ej. Arraigo, Asilo, Estancia).
- `palabras_clave`: TEXT[] (Array de tags).
- `embedding`: VECTOR(1536) (Representación vectorial para búsquedas RAG futuras).
- `created_at` / `updated_at`: TIMESTAMP WITH TIME ZONE.

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
