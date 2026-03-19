const Parser = require('rss-parser');
const { createClient } = require('@supabase/supabase-js');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const cheerio = require('cheerio');
require('dotenv').config();

const parser = new Parser();
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Motor Gemini para Embeddings Legales (text-embedding-004)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

async function scrapeBOE() {
  console.log('--- ARRIVO LEGAL SEARCHER (BOE) ---');
  
  const feed = await parser.parseURL('https://www.boe.es/rss/boe.php?s=1');
  
  for (const item of feed.items) {
    if (item.title.toLowerCase().includes('extranjeria') || 
        item.title.toLowerCase().includes('nie') || 
        item.title.toLowerCase().includes('visado')) {
      
      console.log(`Encontrada novedad legal: ${item.title}`);

      // 1. Extraer contenido real del BOE (HTML Scraper)
      const res = await fetch(item.link);
      const html = await res.text();
      const $ = cheerio.load(html);
      const content = $('.cuerpo_boe').text().substring(0, 5000); // Límite de tokens

      // 2. Generar Embedding con Gemini (text-embedding-004)
      const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
      const result = await model.embedContent(content);
      const embedding = result.embedding.values;

      // 3. Guardar en BD Vectorial
      const { error } = await supabase.from('legal_knowledge').upsert({
        title: item.title,
        content: content,
        category: 'Extranjería',
        url: item.link,
        embedding: embedding,
        published_at: new Date().toISOString()
      });

      if (error) console.error('Error inyectando en Supabase:', error);
      else console.log('Ley procesada y vectorizada con éxito.');
    }
  }
}

scrapeBOE();
