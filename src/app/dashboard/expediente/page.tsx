import DocumentVault from '@/components/dashboard/DocumentVault';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ExpedientePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="py-10 max-w-[1200px] mx-auto px-4">
      <DocumentVault />
    </div>
  );
}
