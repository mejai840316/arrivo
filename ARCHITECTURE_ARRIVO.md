# Arquitectura del Sistema - Arrivo (v1.0)

Arrivo es un SaaS LegalTech diseñado específicamente para trámites de extranjería en España. Utiliza una arquitectura orientada a servicios (SOA) sobre el stack institucional de Arrivo.

## 🏗️ Capas de la Aplicación

### 1. Capa de Presentación (Frontend)
- **Framework**: Next.js 15 (App Router).
- **Diseño**: Tailwind CSS con tipografía **Outfit** y **Inter** para un look gubernamental/premium.
- **Componentes**: React Server Components (RSC) para mayor SEO y Client Components para interactividad (Wizard, Alertas).
- **Gestión de Estado**: Zustand para control de autenticación y flujo de pasos del formulario legal.

### 2. Capa de Servicios y Logística (IA)
- **Motor de Ingesta (Scraper)**: Node.js (scripts/scraper_boe.js). Lee el RSS oficial del BOE.
- **Motor Semántico**: Google Gemini (**text-embedding-004**). Convierte leyes complejas en vectores de 768 dimensiones.
- **Lógica de Autenticación**: Supabase Auth (Magic Link y Passwordless).

### 3. Capa de Persistencia (Base de Datos)
- **PostgreSQL (Supabase)**: Almacenamiento relacional de perfiles y expedientes.
- **pgvector**: Almacenamiento de embeddings legales para permitir búsquedas semánticas (RAG).
- **Supabase Storage**: Almacenamiento seguro de copias de NIE/Pasaporte mediante políticas RLS.

## 🛡️ Flujo de Seguridad y Privacidad
1. **Identidad**: El acceso al Dashboard requiere sesión activa y perfil institucional verificado.
2. **Encriptación**: Todos los datos sensibles (NIE, Pasaporte) se cifran en tránsito y reposo (TLS 1.3 / AES-256).
3. **Privacidad de Documentos**: Los archivos subidos se vinculan al `auth.uid()` mediante políticas RLS, impidiendo acceso externo no autorizado.

## 🚀 Hoja de Ruta Técnica (2026)
- **Fase 1**: MVP (Dashboard, Wizard y Vigilancia Gemini). [ACTUAL]
- **Fase 2**: Generación dinámica de PDFs oficiales (EX-10, EX-01).
- **Fase 3**: Integración de pagos por trámite (Stripe).
- **Fase 4**: IA de chat conversacional para resolución de dudas legales.
