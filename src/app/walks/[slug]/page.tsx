import { WalkDetail } from './WalkDetail';
import { getPublishedWalks } from '@/lib/walks-data';

export function generateStaticParams() {
  return getPublishedWalks().map((w) => ({ slug: w.slug }));
}

export default function WalkPage({ params }: { params: { slug: string } }) {
  return <WalkDetail slug={params.slug} />;
}
