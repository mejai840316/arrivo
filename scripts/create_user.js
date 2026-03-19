// Script para crear/verificar usuario en Supabase
// Ejecutar con: node scripts/create_user.js
require('dotenv').config({ path: '.env.local' });

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

async function createOrVerifyUser() {
  const email = 'jajl840316@gmail.com';
  const password = '@Mejai840316*';
  const fullName = 'Jaime Jaramillo';

  console.log(`\n🔍 Verificando usuario: ${email}`);
  console.log(`📡 Supabase: ${SUPABASE_URL}\n`);

  // 1. Buscar usuario existente
  const listRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users?page=1&per_page=100`, {
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey': SERVICE_KEY,
    },
  });
  const listData = await listRes.json();
  const users = listData.users || [];
  const existing = users.find(u => u.email === email);

  if (existing) {
    console.log(`✅ Usuario encontrado: ${existing.id}`);
    console.log(`   Email confirmado: ${existing.email_confirmed_at ? '✅ SÍ' : '❌ NO'}`);

    // Si no está confirmado, confirmar
    if (!existing.email_confirmed_at) {
      console.log('\n🔧 Confirmando email...');
      const confirmRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existing.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${SERVICE_KEY}`,
          'apikey': SERVICE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email_confirm: true }),
      });
      const confirmData = await confirmRes.json();
      console.log(confirmRes.ok ? '✅ Email confirmado!' : `❌ Error: ${JSON.stringify(confirmData)}`);
    }

    // Actualizar contraseña por si acaso
    console.log('\n🔑 Actualizando contraseña...');
    const pwRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users/${existing.id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    const pwData = await pwRes.json();
    console.log(pwRes.ok ? '✅ Contraseña actualizada!' : `❌ Error: ${JSON.stringify(pwData)}`);

  } else {
    console.log('⚠️  Usuario no encontrado. Creando...');
    const createRes = await fetch(`${SUPABASE_URL}/auth/v1/admin/users`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        email_confirm: true,
        user_metadata: { full_name: fullName },
      }),
    });
    const createData = await createRes.json();
    if (createRes.ok) {
      console.log(`✅ Usuario creado: ${createData.id}`);
      console.log(`   Email: ${createData.email}`);
      console.log(`   Confirmado: ${createData.email_confirmed_at ? 'SÍ' : 'NO'}`);
    } else {
      console.log(`❌ Error al crear: ${JSON.stringify(createData)}`);
    }
  }

  console.log('\n📋 Resumen final:');
  console.log(`   Email:    ${email}`);
  console.log(`   Password: ${password}`);
  console.log(`   URL app:  https://arrivo-ten.vercel.app/login\n`);
}

createOrVerifyUser().catch(console.error);
