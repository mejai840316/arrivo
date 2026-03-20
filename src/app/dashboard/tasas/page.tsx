import FeeAssistant from '@/components/dashboard/FeeAssistant';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function TasasPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();

  return (
    <div className="py-10 max-w-[1000px] mx-auto px-4">
      <FeeAssistant profile={profile} />
    </div>
  );
}
