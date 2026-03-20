import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cargar variables de entorno desde .env.local (ubicado un nivel arriba)
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Error: Falta NEXT_PUBLIC_SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY en .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

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
    const { data, error } = await supabase
      .from('conocimiento_tramites')
      .insert([
        {
          pregunta: item.pregunta,
          respuesta: item.respuesta,
          categoria: item.categoria,
          palabras_clave: item.palabras_clave
        }
      ]);

    if (error) {
      console.error(`Error al insertar: ${item.pregunta.substring(0, 30)}...`, error.message);
      errorCount++;
    } else {
      successCount++;
    }
  }

  console.log(`\nResumen de Ingesta:`);
  console.log(`✅ Ingresados exitosamente: ${successCount}`);
  console.log(`❌ Errores: ${errorCount}`);
}

main();
