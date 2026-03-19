# Arrivo - LegalTech Inteligente para Extranjería en España

Arrivo es una plataforma moderna diseñada para simplificar y automatizar los trámites de extranjería en España (NIE, TIE, Arraigos, Nacionalidad). Utiliza inteligencia artificial (Gemini) para la vigilancia legal del BOE y un asistente personalizado para el usuario.

## 🚀 Tecnologías Principales
- **Framework**: Next.js 15 (App Router)
- **Base de Datos**: Supabase (PostgreSQL + pgvector)
- **IA**: Google Gemini (Embeddings text-embedding-004 + 1.5 Flash)
- **Estilos**: Tailwind CSS (Colección de estilos Institucionales / Premium)
- **Estado**: Zustand (Auth & Wizard)

## 📁 Estructura del Proyecto
- `/src/app`: Rutas principales (Landing, Login, Registro) y Dashboard.
- `/src/components`: UI modular (ProfileWizard, LegalAlerts, AuthForms).
- `/src/lib/supabase`: Configuración de clientes (Client/Server).
- `/scripts`: Automatizaciones (Scraper del BOE con vectorización).
- `/supabase_setup.sql`: Esquema de base de datos y búsqueda semántica.

## ⚖️ Marco Legal
Este proyecto se desarrolla bajo el cumplimiento de la **RGPD** y sigue las directrices del **Reglamento de Extranjería (RD 557/2011)**.

## 🔨 Configuración Local
1. `npm install`
2. Configurar `.env.local` con claves de Supabase y Google AI.
3. `npm run dev`

---
*Desarrollado para Jaime Jaramillo (mejai84) - 2026*
