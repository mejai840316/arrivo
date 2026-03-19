import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

// Inicialización de Supabase con Service Role para bypass RLS
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET() {
  const hoy = new Date();
  const hace90Dias = new Date();
  hace90Dias.setDate(hoy.getDate() - 90);

  const fechaFormat = hace90Dias.toISOString().split('T')[0];

  try {
    // Buscamos usuarios que solicitaron hace exactamente 90 días y no han sido avisados
    const { data: usuariosParaAvisar, error } = await supabase
      .from('profiles') // Asumiendo tabla profiles para usuarios
      .select('id, full_name')
      .eq('fecha_solicitud_padron', fechaFormat)
      .eq('notificacion_90_dias_enviada', false);

    if (error) throw error;
    if (!usuariosParaAvisar || usuariosParaAvisar.length === 0) {
      return NextResponse.json({ message: 'No hay usuarios pendientes de notificar hoy' });
    }

    const notificados = [];

    for (const usuario of usuariosParaAvisar) {
      // 1. Enviar Email/Push (Simulado)
      console.log(`[ALERTA EMAIL VENCIMIENTO] Hola ${usuario.full_name}, han pasado 90 días desde tu solicitud de padrón. Ya puedes reclamar el Silencio Positivo.`);
      
      // 2. Marcar como enviado
      await supabase
        .from('profiles')
        .update({ notificacion_90_dias_enviada: true })
        .eq('id', usuario.id);
        
      notificados.push(usuario.id);
    }

    return NextResponse.json({ 
      success: true, 
      message: `Se enviaron notificaciones de empadronamiento a ${notificados.length} usuarios.`,
      notificados 
    });

  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
