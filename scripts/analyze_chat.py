import json
import argparse
import os
from collections import defaultdict

JSON_PATH = r'D:\Jaime\Antigravity\arrivo\Conversacion\result.json'
DEFAULT_KEYWORDS = ['trámite', 'tramite', 'arraigo', 'asilo', 'nie', 'tie', 'nacionalidad', 'empadronamiento', 'padrón', 'padron', 'cita', 'extranjería', 'extranjeria']

def extract_text(msg):
    text = msg.get('text', '')
    if isinstance(text, list):
        full_text = ''
        for item in text:
            if isinstance(item, dict):
                full_text += item.get('text', '')
            elif isinstance(item, str):
                full_text += item
        return full_text
    return str(text) if text else ''

def main():
    parser = argparse.ArgumentParser(description="Extract QA from Chat Export")
    parser.add_argument('--keywords', type=str, help="Comma separated list of keywords to filter questions", default=','.join(DEFAULT_KEYWORDS))
    parser.add_argument('--limit', type=int, help="Limit number of output QA pairs", default=50)
    args = parser.parse_args()
    
    keywords = [kw.strip().lower() for kw in args.keywords.split(',')]
    print(f"Buscando preguntas con las palabras clave: {keywords}")

    print("Cargando JSON...")
    with open(JSON_PATH, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    messages = data.get('messages', [])
    print(f"Total de mensajes cargados: {len(messages)}")
    
    msg_dict = {m['id']: m for m in messages if m.get('type') == 'message'}

    questions = []
    print("Identificando posibles preguntas...")
    for m in messages:
        if m.get('type') == 'message':
            text = extract_text(m).lower()
            if '?' in text or '¿' in text:
                if any(kw in text for kw in keywords):
                    questions.append(m)
                    
    print(f"Se encontraron {len(questions)} preguntas.")
    
    answers_to_questions = defaultdict(list)
    print("Mapeando respuestas a preguntas...")
    for m in messages:
        if m.get('type') == 'message':
            reply_id = m.get('reply_to_message_id')
            if reply_id and reply_id in msg_dict:
                answers_to_questions[reply_id].append(m)
                
    qa_pairs = []
    for q in questions:
        q_id = q['id']
        ans_list = answers_to_questions.get(q_id, [])
        valid_ans = [a for a in ans_list if len(extract_text(a)) > 15]
        if valid_ans:
            qa_pairs.append({
                'q': q,
                'a': valid_ans
            })
            
    print(f"Pares Q&A encontrados: {len(qa_pairs)}")
    
    # Ordenar por longitud de respuesta combinada para encontrar las mas detalladas
    qa_pairs.sort(key=lambda pair: sum(len(extract_text(a)) for a in pair['a']), reverse=True)
    
    sample = qa_pairs[:int(args.limit)]
    
    # Format for JSON output
    json_output = []
    for pair in sample:
        q_text = extract_text(pair['q']).strip()
        ans_texts = [extract_text(a).strip() for a in pair['a']]
        best_answer = "\n\n".join(ans_texts) # Combine answers into one string or take the longest
        # Asignación simple de categoría (básica)
        categoria = "Otro"
        q_lower = q_text.lower()
        if "arraigo" in q_lower: categoria = "Arraigo"
        elif "asilo" in q_lower: categoria = "Asilo"
        elif "estudia" in q_lower or "formación" in q_lower: categoria = "Estancia"
        elif "padron" in q_lower or "padrón" in q_lower: categoria = "Padrón"
        elif "nacional" in q_lower: categoria = "Nacionalidad"
        
        # Generar etiquetas / palabras clave extraídas de la pregunta
        tags = [kw for kw in keywords if kw in q_lower]
        
        json_output.append({
            "pregunta": q_text,
            "respuesta": best_answer,
            "categoria": categoria,
            "palabras_clave": tags
        })
        
    out_dir = r"D:\Jaime\Antigravity\arrivo\scripts"
    json_path = os.path.join(out_dir, "qa_results.json")
    print(f"Escribiendo {len(json_output)} resultados a {json_path}")
    
    with open(json_path, 'w', encoding='utf-8') as f:
        json.dump(json_output, f, ensure_ascii=False, indent=2)
        
    print("Completado.")

if __name__ == '__main__':
    main()
