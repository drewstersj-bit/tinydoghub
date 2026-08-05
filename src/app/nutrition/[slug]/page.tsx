import NutritionArticleClient from './client';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlcgmgnqwsjcaanrlfv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_KfjveSJzYJJ3hBvqLnEcfQ_OHyRV2Wq';

export async function generateStaticParams() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase.from('nutrition_articles').select('slug').eq('status', 'published');
  if (data && data.length > 0) return data.map((a) => ({ slug: a.slug }));
  return [{ slug: 'feeding-tiny-dog-puppies' }, { slug: 'portion-control-small-dogs' }, { slug: 'foods-toxic-to-dogs' }, { slug: 'treats-for-tiny-dogs' }];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <NutritionArticleClient slug={slug} />;
}
