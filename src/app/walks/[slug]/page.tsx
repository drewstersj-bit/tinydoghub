import { WalkDetail } from './WalkDetail';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlcgmgnqwsjcaanrlfv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_KfjveSJzYJJ3hBvqLnEcfQ_OHyRV2Wq';

export async function generateStaticParams() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase.from('walks').select('slug').eq('status', 'published');
  if (data && data.length > 0) {
    return data.map((w) => ({ slug: w.slug }));
  }
  // Fallback to known slugs if Supabase is unreachable at build time
  return [
    { slug: 'dunham-massey-deer-park' },
    { slug: 'delamere-forest-blakemere-trail' },
    { slug: 'fletcher-moss-park-didsbury' },
    { slug: 'abersoch-beach-walk' },
    { slug: 'tatton-park-mere-circuit' },
    { slug: 'lyme-park-cage-loop' },
  ];
}

export default async function WalkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WalkDetail slug={slug} />;
}
