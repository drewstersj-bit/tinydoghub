import { WalkDetail } from './WalkDetail';
import { getPublishedWalks } from '@/lib/walks-data';

export function generateStaticParams() {
  return getPublishedWalks().map((w) => ({ slug: w.slug }));
}

export default async function WalkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WalkDetail slug={slug} />;
}
