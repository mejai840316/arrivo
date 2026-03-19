'use client';

import React, { useState } from 'react';
import { Home, FileCheck, AlertTriangle, ShieldCheck, Download, Gavel, CheckCircle2, FileText, Clock } from 'lucide-react';
import jsPDF from 'jspdf';

export default function EmpadronamientoAssistant() {
  const [hasContract, setHasContract] = useState<boolean | null>(null);
  
  // Estados para Generador PDF Fase 2
  const [formData, setFormData] = useState({
    nombre: '',
    pasaporte: '',
    ciudad: 'San Martín del Rey Aurelio',
    direccion: '',
    fechaLlegada: '',
  });

  const [pdfGenerated, setPdfGenerated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateAltaPDF = () => {
    const doc = new jsPDF();
    const marginToLeft = 20;
    const lineHeight = 7;
    let y = 30;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`AL AYUNTAMIENTO DE: ${formData.ciudad.toUpperCase()}`, marginToLeft, y); y += lineHeight;
    doc.text("A LA ATENCIÓN DEL NEGOCIADO DE ESTADÍSTICA / PADRÓN", marginToLeft, y); y += lineHeight * 2;

    doc.setFont("helvetica", "normal");
    doc.text(`D./Dña.: ${formData.nombre}`, marginToLeft, y); y += lineHeight;
    doc.text(`PASAPORTE Nº: ${formData.pasaporte}`, marginToLeft, y); y += lineHeight;
    doc.text(`NACIONALIDAD: Externa a UE`, marginToLeft, y); y += lineHeight;
    doc.text(`DOMICILIO A EFECTOS DE NOTIFICACIÓN: ${formData.direccion}`, marginToLeft, y); y += lineHeight * 2;

    doc.setFont("helvetica", "bold");
    doc.text("EXPONE:", marginToLeft, y); y += lineHeight * 1.5;

    doc.setFont("helvetica", "normal");
    const p1 = `PRIMERO.- Que mi residencia habitual se encuentra establecida en el municipio de ${formData.ciudad}, concretamente en la dirección arriba indicada, desde la fecha ${formData.fechaLlegada || 'reciente'}.`;
    doc.text(doc.splitTextToSize(p1, 170), marginToLeft, y); y += lineHeight * 3;

    const p2 = `SEGUNDO.- Que, a pesar de no disponer de un título de propiedad o contrato de arrendamiento formal a mi nombre, mi pernocta y vivencia en dicho domicilio es real, efectiva y continuada.`;
    doc.text(doc.splitTextToSize(p2, 170), marginToLeft, y); y += lineHeight * 3;

    const p3 = `TERCERO.- Que la Resolución de 17 de febrero de 2020 (BOE nº 122), establece en su apartado 3.3 sobre "Empadronamiento en infraviviendas y de personas sin domicilio": "El Padrón debe reflejar el domicilio donde realmente vive cada vecino... el criterio que debe presidir la decisión final es la residencia real en el municipio."`;
    doc.text(doc.splitTextToSize(p3, 170), marginToLeft, y); y += lineHeight * 4;

    const p4 = `CUARTO.- Que el Ayuntamiento tiene la obligación de comprobar la veracidad de los datos mediante Servicios Sociales o la Policía Local para constatar que resido en dicho lugar.`;
    doc.text(doc.splitTextToSize(p4, 170), marginToLeft, y); y += lineHeight * 3;

    doc.setFont("helvetica", "bold");
    doc.text("SOLICITA:", marginToLeft, y); y += lineHeight * 1.5;

    doc.setFont("helvetica", "normal");
    const p5 = `Que se tenga por presentada esta instancia y se proceda a tramitar mi Alta en el Padrón Municipal. Solicito que se realicen las comprobaciones pertinentes en el domicilio indicado para verificar mi residencia efectiva.`;
    doc.text(doc.splitTextToSize(p5, 170), marginToLeft, y); y += lineHeight * 4;

    doc.text(`En ${formData.ciudad}, a ${new Date().toLocaleDateString('es-ES')}.`, marginToLeft, y); y += lineHeight * 3;
    doc.text("(Firma del Interesado)", marginToLeft, y);

    doc.save(`Solicitud_Alta_Padron_${formData.nombre.replace(/\s+/g, '_') || 'Arrivo'}.pdf`);
    setPdfGenerated(true);
  };

  const generateSilencioPDF = () => {
    const doc = new jsPDF();
    const marginToLeft = 20;
    const lineHeight = 7;
    let y = 30;

    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`AL AYUNTAMIENTO DE: ${formData.ciudad.toUpperCase()}`, marginToLeft, y); y += lineHeight;
    doc.text("AL NEGOCIADO DE ESTADÍSTICA Y POBLACIÓN", marginToLeft, y); y += lineHeight * 2;

    doc.setFont("helvetica", "normal");
    doc.text(`D./Dña.: ${formData.nombre}`, marginToLeft, y); y += lineHeight;
    doc.text(`PASAPORTE Nº: ${formData.pasaporte}`, marginToLeft, y); y += lineHeight;
    doc.text(`EXPEDIENTE DE ALTA Nº: [Pendiente Asignar]`, marginToLeft, y); y += lineHeight * 2;

    doc.setFont("helvetica", "bold");
    doc.text("EXPONE:", marginToLeft, y); y += lineHeight * 1.5;

    doc.setFont("helvetica", "normal");
    const p1 = `PRIMERO.- Que hace más de tres meses presenté ante este Ayuntamiento solicitud de Alta en el Padrón Municipal de Habitantes en el domicilio sito en ${formData.direccion}.`;
    doc.text(doc.splitTextToSize(p1, 170), marginToLeft, y); y += lineHeight * 3;

    const p2 = `SEGUNDO.- Que ha transcurrido el plazo legal de tres meses establecido en el artículo 21 de la Ley 39/2015, sin que se haya notificado resolución expresa.`;
    doc.text(doc.splitTextToSize(p2, 170), marginToLeft, y); y += lineHeight * 3;

    const p3 = `TERCERO.- Que, según el artículo 24 de la citada Ley 39/2015, el vencimiento del plazo sin resolución expresa legitima entenderla estimada por silencio administrativo. La Resolución de 17 de febrero de 2020 refuerza la obligación de resolver en tres meses.`;
    doc.text(doc.splitTextToSize(p3, 170), marginToLeft, y); y += lineHeight * 4;

    doc.setFont("helvetica", "bold");
    doc.text("SOLICITA:", marginToLeft, y); y += lineHeight * 1.5;

    doc.setFont("helvetica", "normal");
    const p4 = `Que, habiéndose producido el SILENCIO ADMINISTRATIVO POSITIVO, se me expida de forma inmediata el Certificado de Empadronamiento con efectos retroactivos desde la fecha de mi solicitud inicial.`;
    doc.text(doc.splitTextToSize(p4, 170), marginToLeft, y); y += lineHeight * 4;

    doc.text(`En ${formData.ciudad}, a ${new Date().toLocaleDateString('es-ES')}.`, marginToLeft, y); y += lineHeight * 3;
    doc.text("(Firma del Interesado)", marginToLeft, y);

    doc.save(`Reclamacion_Silencio_Padron_${formData.nombre.replace(/\s+/g, '_') || 'Arrivo'}.pdf`);
  };

  const renderYesPath = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl flex items-start gap-4">
        <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
        <div>
          <h3 className="font-extrabold text-emerald-900 text-lg mb-2">Escenario: Empadronamiento Estándar</h3>
          <p className="text-sm font-medium text-emerald-800">Tienes documentos oficiales que justifican tu residencia. El trámite será directo en el Ayuntamiento.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-slate-100 bg-slate-50">
          <h4 className="font-bold text-slate-800 flex items-center gap-2"><FileCheck className="w-5 h-5 text-blue-600" /> Checklist de Documentos Mínimos</h4>
        </div>
        <ul className="divide-y divide-slate-100">
          <li className="p-4 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
            <span className="text-sm font-medium text-slate-700"><strong>Documento de Identidad:</strong> Pasaporte original en vigor (No necesitas tener NIE asignado aún).</span>
          </li>
          <li className="p-4 flex items-center gap-3">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</span>
            <span className="text-sm font-medium text-slate-700"><strong>Prueba de Vivienda:</strong> Contrato de alquiler a tu nombre, última factura de servicios (luz/agua) o escritura de propiedad.</span>
          </li>
        </ul>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-dashed border-blue-300 relative overflow-hidden group">
         <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
           <Home className="w-24 h-24 text-blue-600" />
         </div>
         <h4 className="font-bold text-blue-900 mb-2 relative z-10">¿Alquilas una habitación o vives con un amigo?</h4>
         <p className="text-sm text-slate-600 mb-6 max-w-lg relative z-10 font-medium">
           Si el contrato no está a tu nombre, necesitarás que el titular firme una autorización y te proporcione una copia de su DNI/NIE.
         </p>
         <button className="relative z-10 flex items-center gap-2 bg-blue-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-800 transition-colors">
           <Download className="w-4 h-4" />
           Descargar Plantilla de Autorización
         </button>
      </div>
    </div>
  );

  const renderNoPath = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl flex items-start gap-4">
        <AlertTriangle className="w-8 h-8 text-amber-600 shrink-0" />
        <div>
          <h3 className="font-extrabold text-amber-900 text-lg mb-2">Escenario: Alta por Omisión (Servicios Sociales)</h3>
          <p className="text-sm font-medium text-amber-800 leading-relaxed">
            La ley <strong>obliga</strong> al Ayuntamiento a empadronarte en el lugar donde pernoctes, incluso si es una habitación subarrendada sin contrato, una vivienda ocupada o si no tienes domicilio fijo. Nadie puede denegarte el padrón.
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h4 className="font-extrabold text-slate-800 mb-4 flex items-center gap-2"><Gavel className="w-5 h-5 text-blue-600" /> Generador de Instancia Oficial</h4>
        <p className="text-sm text-slate-600 mb-6 font-medium">Rellena la dirección exacta donde duermes. Generaremos un escrito fundamentado en la <strong>Resolución de 17 de febrero de 2020 del BOE</strong> para exigir que la Policía Local o Servicios Sociales verifiquen tu residencia in situ.</p>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Tu Nombre Completo</label>
              <input type="text" name="nombre" value={formData.nombre} onChange={handleInputChange} placeholder="Ej: Juan Pérez" className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Pasaporte</label>
              <input type="text" name="pasaporte" value={formData.pasaporte} onChange={handleInputChange} placeholder="Nº Documento" className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Municipio / Ayuntamiento</label>
            <input type="text" name="ciudad" value={formData.ciudad} onChange={handleInputChange} placeholder="Ej: Oviedo, Gijón, San Martín..." className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Dirección donde pernoctas actualmente</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleInputChange} placeholder="Ej: Calle Gran Vía 12, Piso 4" className="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500" />
          </div>
          <button onClick={generateAltaPDF} disabled={!formData.nombre || !formData.direccion} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
            <Download className="w-4 h-4" />
            Generar PDF Oficial para el Ayuntamiento
          </button>
        </div>
      </div>

      <div className={`rounded-2xl border p-6 transition-all ${pdfGenerated ? 'bg-blue-50 border-blue-200 shadow-md ring-2 ring-blue-500 ring-offset-2' : 'bg-slate-50 border-slate-200 opacity-70 grayscale'}`}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className={`w-5 h-5 ${pdfGenerated ? 'text-blue-600' : 'text-slate-500'}`} />
            <h4 className={`font-bold ${pdfGenerated ? 'text-blue-900' : 'text-slate-800'}`}>Tracker: El reloj del Silencio Positivo</h4>
          </div>
          {pdfGenerated && <span className="text-[10px] font-bold bg-blue-600 text-white px-2 py-1 rounded-full uppercase tracking-widest animate-pulse">Activo</span>}
        </div>
        <p className="text-sm text-slate-600 font-medium mb-4">
          Una vez presentes el documento que acabas de descargar, el Ayuntamiento tiene <strong>exactamente 3 meses</strong> para contestar. Tu plataforma llevará el conteo y te alertará el Día 91 si no te responden.
        </p>

        {pdfGenerated ? (
          <div className="pt-4 border-t border-blue-200 mt-4">
            <p className="text-sm font-bold text-blue-900 mb-3">🚨 Golpe de Gracia: Reclamación de Silencio</p>
            <p className="text-xs text-blue-800 mb-3">Día 91: "El ayuntamiento no ha respondido. Por pura norma imperativa estás empadronado por ley. Pincha aquí y ve hoy mismo con el funcionario."</p>
            <button onClick={generateSilencioPDF} className="bg-white border-2 border-slate-200 text-slate-600 font-bold px-4 py-2 rounded-lg text-xs tracking-wider uppercase hover:border-slate-800 hover:text-slate-800 transition-colors flex items-center gap-2">
              <Download className="w-3 h-3" /> Generar Escrito de Silencio Positivo
            </button>
          </div>
        ) : (
          <button disabled className="bg-white border-2 border-slate-200 text-slate-400 font-bold px-4 py-2 rounded-lg text-xs tracking-wider cursor-not-allowed uppercase flex items-center gap-2">
            Activar Tracker (Descarga el PDF primero)
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Pregunta Principal */}
      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm text-center">
        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <Home className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-900 font-outfit mb-4">
          ¿Tienes un contrato de alquiler, facturas a tu nombre o título de propiedad?
        </h2>
        <p className="text-slate-500 font-medium mb-8 max-w-lg mx-auto">Queremos darte el camino exacto para conseguir tu empadronamiento sin trabas ilegales.</p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={() => setHasContract(true)}
            className={`px-8 py-3.5 rounded-xl font-bold transition-all ${
              hasContract === true 
                ? 'bg-blue-900 text-white shadow-lg ring-2 ring-blue-900 ring-offset-2' 
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50'
            }`}
          >
            Sí, los tengo
          </button>
          <button 
            onClick={() => setHasContract(false)}
            className={`px-8 py-3.5 rounded-xl font-bold transition-all ${
              hasContract === false 
                ? 'bg-blue-900 text-white shadow-lg ring-2 ring-blue-900 ring-offset-2' 
                : 'bg-white border-2 border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            No tengo contrato ni facturas
          </button>
        </div>
      </div>

      {hasContract === true && renderYesPath()}
      {hasContract === false && renderNoPath()}

      {/* Escudo Legal (Siempre visible tras responder) */}
      {hasContract !== null && (
        <div className="bg-indigo-950 text-indigo-50 p-6 rounded-2xl animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5 text-indigo-300" />
            <h4 className="font-extrabold text-white text-lg font-outfit">Tus Escudos Legales</h4>
          </div>
          <p className="text-sm text-indigo-200 font-medium mb-4 leading-relaxed">
            Muestra estos artículos si un funcionario del Ayuntamiento te dice que no puede empadronarte:
          </p>
          <div className="space-y-3">
            <div className="bg-indigo-900/50 p-4 rounded-xl border border-indigo-800/50">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1 block">Ley 7/1985 (Bases del Régimen Local) - Art. 15 y 16</span>
              <p className="text-sm italic">"Toda persona que viva en España está obligada a inscribirse en el Padrón del municipio en el que resida habitualmente."</p>
              <p className="text-xs mt-2 text-indigo-200/70 border-t border-indigo-800/50 pt-2">Esta ley obliga a la inscripción, sin distinguir si el estatus migratorio es legal o irregular.</p>
            </div>
            <div className="bg-indigo-900/50 p-4 rounded-xl border border-indigo-800/50">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest mb-1 block">Resolución de 17 de febrero de 2020 (INE)</span>
              <p className="text-sm italic">"El Padrón debe reflejar el domicilio donde vive realmente la persona, independientemente de cualquier controversia jurídico-privada."</p>
              <p className="text-xs mt-2 text-indigo-200/70 border-t border-indigo-800/50 pt-2">El Ayuntamiento no es juez. Su única función es constatar que vives ahí (enviando a la policía a comprobarlo si hace falta).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
