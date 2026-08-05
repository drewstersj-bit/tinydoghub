import { VenueDetail } from './VenueDetail';
import { getPublishedVenues } from '@/lib/places-data';

export function generateStaticParams() {
  return getPublishedVenues().map((v) => ({ slug: v.slug }));
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <VenueDetail slug={slug} />;
}
