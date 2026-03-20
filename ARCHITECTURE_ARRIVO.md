# Arquitectura del Sistema - Arrivo (v1.0)

Arrivo es un SaaS LegalTech diseñado específicamente para trámites de extranjería en España. Utiliza una arquitectura orientada a servicios (SOA) sobre el stack institucional de Arrivo.

## 🏗️ Capas de la Aplicación

### 1. Capa de Presentación (Frontend)
- **Framework**: Next.js 15 (App Router).
- **Diseño**: Tailwind CSS con tipografía **Outfit** y **Inter** para un look gubernamental/premium.
- **Componentes**: React Server Components (RSC) para mayor SEO y Client| Capa | Tecnologías | Propósito |
|---------|------------|------------|
| **Frontend UI** | Next.js 15 (App Router), React, TailwindCSS, Lucide Icons | Interfaz de usuario rápida, accesible y responsiva. |
| **Generación de Documentos** | jsPDF | (Fase 2) Creación de PDFs legales dinámicos (Empadronamiento, Silencio Positivo) en el cliente. |
| **Backend & Autenticación** | Supabase (Auth, RLS, Database) | Gestión de usuarios, perfiles, catálogo de trámites y expedientes en PostgreSQL. |
| **Tareas Programadas** | Next.js Route Handlers (`/api/cron/*`) | Motor de revisión (ej. Padrón tracker, alertas de 90 días). |
| **Motor Semántico & NLP** | Scripts (Python/Node) & Supabase pgvector | Ingesta del BOE y análisis de chats de Telegram/WhatsApp (Q&A) para poblar la base de conocimiento (`conocimiento_tramites`) para RAG (Fase 4). |

## 2. Diagrama de Módulos (Core Features)

1.  **Onboarding & Perfil (Wizard):**
    *   Formulario por pasos (País, Llegada, Ahorros, Estudios).
    *   Guarda los datos en `perfiles_usuario` para alimentar el semáforo de viabilidad.
2.  **Dashboard "Arraigo Pro" / "Aterriza en España":**
    *   **Mis Expedientes:** Visualización de trámites activos y completados (con semáforos de progreso y fases).
    *   **Módulo Inteligente de Empadronamiento:** Asistente conversacional para determinar el Escenario de Padrón (Inquilino vs Infravivienda) y *Generación local de PDF de solicitud oficial*.
    *   **Cronómetro de Derechos (Tracker Padrón):** Gestión reactiva del Silencio Administrativo Positivo (90 días) para reclamar empadronamientos no contestados.
    *   **Vigilancia Legal (Alertas BOE):** Sincronización diaria con RSS "Extranjería" del BOE, filtrado por Machine Learning (Fase 1 scraper_boe).
    *   **Base de Conocimiento (FAQ Comunitaria):** Nueva página `/dashboard/faq` con buscador interactivo y filtrado en base a datos de la comunidad, consumidos desde la nueva tabla `conocimiento_tramites`.
    *   **Bóveda IA:** Preparación de Fase 4 (Chat Semántico para discusión con normativa vigente y vectorizaciones RAG).
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
