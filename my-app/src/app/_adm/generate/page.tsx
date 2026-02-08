import { GenerateWrapper } from './GenerateWrapper'
import { getUserCredits } from '@/data/getUserCredits';
import { createClient } from '@/utils/supabase/server';

export default async function page() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const User_Credits = user ? await getUserCredits() : null;
  
  return (
    <main>
        <GenerateWrapper User_Credits={User_Credits} />
    </main>
  )
}
