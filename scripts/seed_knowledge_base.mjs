import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde .env.local
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const googleApiKey = process.env.GOOGLE_AI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Falta NEXT_PUBLIC_SUPABASE_URL o KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

let genAI = null;
if (googleApiKey && googleApiKey !== 'your-gemini-key-here') {
  genAI = new GoogleGenerativeAI(googleApiKey);
} else {
  console.warn("⚠️ Advertencia: No se encontró una GOOGLE_AI_API_KEY válida, los embeddings se omitirán en esta ejecución.");
}

async function getEmbedding(text) {
  if (!genAI) return null;
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error("Error generando embedding:", error.message);
    return null;
  }
}

async function main() {
  const jsonPath = path.join(__dirname, 'qa_results.json');
  console.log(`Leyendo datos desde: ${jsonPath}`);
  
  if (!fs.existsSync(jsonPath)) {
    console.error(`Error: Archivo no encontrado - ${jsonPath}`);
    process.exit(1);
  }

  const rawData = fs.readFileSync(jsonPath, 'utf8');
  const qaData = JSON.parse(rawData);

  console.log(`Se encontraron ${qaData.length} Q&A para insertar en la base de datos.`);

  let successCount = 0;
  let errorCount = 0;

  for (const item of qaData) {
    // Generar embedding uniendo pregunta y respuesta para mejor contexto semántico
    const contentToEmbed = `Pregunta: ${item.pregunta}\nRespuesta: ${item.respuesta}`;
    const embedding = await getEmbedding(contentToEmbed);

    const record = {
      pregunta: item.pregunta,
      respuesta: item.respuesta,
      categoria: item.categoria,
      palabras_clave: item.palabras_clave,
    };

    if (embedding) {
      record.embedding = embedding;
    }

    const { data, error } = await supabase
      .from('conocimiento_tramites')
      .insert([record]);

    if (error) {
      console.error(`❌ Error al insertar: ${item.pregunta.substring(0, 30)}...`, error.message);
      errorCount++;
    } else {
      console.log(`✅ Insertado con éxito (Embedding: ${embedding ? 'Sí' : 'No'}):`, item.pregunta.substring(0, 30) + '...');
      successCount++;
    }
  }

  console.log(`\nResumen de Ingesta:`);
  console.log(`✅ Ingresados exitosamente: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
}

main();
