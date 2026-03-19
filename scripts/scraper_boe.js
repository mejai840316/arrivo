// scripts/scraper_boe.js
require('dotenv').config({ path: '.env.local' });
const Parser = require('rss-parser');
const { createClient } = require('@supabase/supabase-js');

// Configuración requerida
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
// const GEMINI_API_KEY = process.env.GEMINI_API_KEY; // Para la Fase Semántica

// Instanciamos Supabase de forma segura
const supabase = (SUPABASE_URL && SUPABASE_SERVICE_KEY) 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)
  : null;

const parser = new Parser({
  customFields: { item: ['description', 'summary'] },
  requestOptions: {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
    }
  }
});

// RSS Oficial del BOE - "Extranjería" (Canal Temático de Legislación)
const BOE_RSS_URL = 'https://www.boe.es/rss/canal_leg.php?c=135';

// Filtros Inteligentes (Aterriza en España, Arraigo Pro y alertas críticas)
const FILTROS_CRITICOS = [
  'extranjería', 'arraigo', 'inmigración', 'visado', 
  'nacionalidad', 'iprem', 'estancia estudios', 'memoria democrática',
  'protección internacional', 'nómada', 'emprendedores'
];

// Filtro anticontaminación para el BOE (evitar falsos positivos como personal del Estado)
const EXCLUIR = [
  'nombramientos', 'jubilaciones', 'ascensos', 'personal militar', 'adjudicación', 'ceses'
];

async function runScraper() {
  console.log(`[BOOT] Iniciando Scraper de Ingesta Inteligente del BOE...`);
  console.log(`[URL] Conectando con RSS Oficial: ${BOE_RSS_URL}`);

  try {
    const feed = await parser.parseURL(BOE_RSS_URL);
    console.log(`\n[OK] Analizando ${feed.items.length} últimas publicaciones del BOE: "${feed.title}"\n`);

    let foundRelevant = 0;

    for (const item of feed.items) {
      const titleLower = item.title.toLowerCase();
      const contentLower = item.content ? item.content.toLowerCase() : '';
      const comboText = `${titleLower} ${contentLower}`;

      // ¿Contiene algo importante y no es ruido burocrático?
      const esImportante = FILTROS_CRITICOS.some(palabra => comboText.includes(palabra));
      const esRuido = EXCLUIR.some(palabra => comboText.includes(palabra));

      if (esImportante && !esRuido) {
        foundRelevant++;
        console.log(`🚨 [NOTICIA RELEVANTE ENCONTRADA EN BOE]`);
        console.log(`- Título: ${item.title}`);
        console.log(`- Enlace: ${item.link}`);
        console.log(`- Resumen: ${item.contentSnippet?.slice(0, 150) || 'Sin resumen'}...`);
        console.log(`- Fecha: ${item.pubDate}`);
        console.log('---');

        // ===========================================
        // FASE 4 / FASE 2: EL MOTOR DE IA ENTRARÍA AQUÍ
        // ===========================================
        /*
          Resumidor de Leyes IA (Antigravity Prompt):
          1. Descargar texto final desde el enlace al BOE.
          2. Gemini Genera resumen rápido de 3 puntos.
             - "What changed."
             - "Who is affected."
             - "What documents they need now."
          3. PUSHEAR "ALERTA ROJA" a todas tus apps de clientes afectados por el cambio de Visado/Arraigo.
          4. Vectorizar la norma completa en 'leyes_vectores'.
        */
      }
    }

    if (foundRelevant === 0) {
      console.log(`[FIN] No se registraron normativas sobre extranjería en el último canal.`);
    } else {
      console.log(`[FIN] Se interceptaron ${foundRelevant} disposiciones que afectan a extranjería.`);
      console.log(`[MOTOR IA] Pendiente de pasar datos por Google Gemini (text-embedding-004) y guardarlo en Supabase pgvector.`);
    }

  } catch (error) {
    console.error(`[ERROR FATAL] Fallo al conectarse o parsear el boletín oficial:`, error);
  }
}

// Ejecutar el script (Usualmente mediante un CRON Job o Vercel Serverless Function)
runScraper();
