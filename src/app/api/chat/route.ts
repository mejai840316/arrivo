import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 });

    const supabase = await createClient();
    const googleApiKey = process.env.GOOGLE_AI_API_KEY;
    const groqApiKey = process.env.GROQ_API_KEY;

    if (!googleApiKey) {
      return NextResponse.json({ 
        role: 'assistant', 
        content: '⚠️ Configuración incompleta (falta GOOGLE_AI_API_KEY para RAG).' 
      });
    }

    const genAI = new GoogleGenerativeAI(googleApiKey);
    
    // 1. Generar embedding con Gemini (Mantener para compatibilidad con vectores DB)
    const embedModel = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const embedResult = await embedModel.embedContent(message);
    const embedding = embedResult.embedding.values;

    // 2. Búsqueda RAG en paralelo (Sinergia de Datos)
    const [faqData, legalData] = await Promise.all([
      supabase.rpc('match_conocimiento_tramites', {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: 2,
      }),
      supabase.rpc('match_legal_knowledge', {
        query_embedding: embedding,
        match_threshold: 0.5,
        match_count: 2,
      })
    ]);

    if (faqData.error) console.error('Error FAQ RAG:', faqData.error);
    if (legalData.error) console.error('Error Legal RAG:', legalData.error);

    // 3. Construir el contexto híbrido (Experiencia + Ley)
    let context = "";
    
    if (legalData.data && legalData.data.length > 0) {
      context += "### NORMATIVA OFICIAL (BOE):\n" + legalData.data.map((m: any) => 
        `- ${m.title}: ${m.content.substring(0, 500)}...`
      ).join('\n') + "\n\n";
    }

    if (faqData.data && faqData.data.length > 0) {
      context += "### CASOS Y EXPERIENCIA:\n" + faqData.data.map((m: any) => 
        `P: ${m.pregunta}\nR: ${m.respuesta}`
      ).join('\n---\n') + "\n";
    }

    // 4. Generar Respuesta con Ollama (Local/Gratuito) o Fallback
    const ollamaUrl = process.env.OLLAMA_URL || "http://localhost:11434/v1";
    
    const client = new OpenAI({
      apiKey: groqApiKey || process.env.OPENAI_API_KEY || "ollama", // Groq > OpenAI > Ollama Default
      baseURL: groqApiKey ? "https://api.groq.com/openai/v1" : (groqApiKey ? undefined : ollamaUrl)
    });

    const modelName = groqApiKey ? "llama-3.1-70b-versatile" : "llama3.1"; // Usamos 'llama3.1' en Ollama

    const systemPrompt = `
      Actúas como un REVISOR DE BORRADORES y CONSULTOR DE ÉLITE de Arrivo. 
      Toda tu información se basa ÚNICAMENTE en fuentes oficiales del Estado Español.

      FUENTES DE VERDAD (PARA CITAR Y ENLAZAR):
      1. REGLAMENTO 2026 (RD 1155/2024): https://www.boe.es/buscar/act.php?id=BOE-A-2024-24142
      2. LEY EXTRANJERÍA (LO 4/2000): https://www.boe.es/buscar/act.php?id=BOE-A-2000-544
      3. LEY EMPRENDEDORES (14/2013): https://www.boe.es/buscar/act.php?id=BOE-A-2013-10074
      4. HOJAS INFORMATIVAS (REQUISITOS): https://extranjeros.inclusion.gob.es/es/informacionpresentacion/informaciongeneral/index.html
      5. PAGO DE TASAS (790-052/012): https://sede.administracionespublicas.gob.es/pagina/index/directorio/tasas_sara
      6. CITAS PREVIAS: https://icp.administracionelectronica.gob.es/icpplus/index.html

      INSTRUCCIONES DE BIENVENIDA Y CAPTACIÓN:
      - Sé profesional, técnico y directo.
      - Al iniciar, pide siempre: NIE/Pasaporte, Fecha de entrada y Situación actual.
      - Si el usuario duda, ofrece el enlace a la Hoja Informativa oficial del Ministerio.

      VALIDACIÓN TÉCNICA REGLAMENTO 2026:
      - Archivos: PDF < 5MB (Mercurio).
      - Penales: < 3 meses + Apostilla.
      - Vía Preferente: Telemática (Mercurio).

      CONTEXTO RAG:
      ${context || "Usar normativa oficial BOE 2026."}
    `;

    const chatResponse = await client.chat.completions.create({
      model: modelName,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.1,
    });

    const text = chatResponse.choices[0].message.content;

    return NextResponse.json({ role: 'assistant', content: text });

  } catch (error: any) {
    console.error('Error en Chat AI (Ollama):', error);
    return NextResponse.json({ 
      error: 'Error de conexión con el motor IA local (Ollama). Asegúrate de que Ollama esté corriendo con "ollama run llama3.1".' 
    }, { status: 500 });
  }
}
