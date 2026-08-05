import { VenueDetail } from './VenueDetail';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://tnlcgmgnqwsjcaanrlfv.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_KfjveSJzYJJ3hBvqLnEcfQ_OHyRV2Wq';

export async function generateStaticParams() {
  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data } = await supabase.from('venues').select('slug').eq('status', 'published');
  if (data && data.length > 0) {
    return data.map((v) => ({ slug: v.slug }));
  }
  // Fallback to known slugs if Supabase is unreachable at build time
  return [
    { slug: 'the-art-of-tea-didsbury' },
    { slug: 'the-stamford-arms-dunham' },
    { slug: 'delamere-forest-cafe' },
    { slug: 'the-venetian-knutsford' },
    { slug: 'coconut-kitchen-abersoch' },
  ];
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <VenueDetail slug={slug} />;
}
