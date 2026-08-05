import { WalkDetail } from './WalkDetail';
import { getPublishedWalks } from '@/lib/walks-data';

// All walk slugs that need static pages generated
const ALL_WALK_SLUGS = [
  // Original walks
  'dunham-massey-deer-park',
  'lyme-park-cage-loop',
  'delamere-forest-blakemere-trail',
  'fletcher-moss-park-didsbury',
  'abersoch-beach-walk',
  'tatton-park-mere-circuit',
  // Major cities walks
  'sefton-park-loop',
  'plymouth-hoe-promenade',
  'hyde-park-serpentine-loop',
  'hampstead-heath-parliament-hill',
  'cannon-hill-park-birmingham',
  'inverleith-park-edinburgh',
  'bristol-harbourside-loop',
  'kelvingrove-park-glasgow',
  'bute-park-cardiff',
  'wollaton-park-nottingham',
  'jesmond-dene-newcastle',
  'bath-skyline-walk-short',
  'york-city-walls-loop',
  'endcliffe-park-sheffield',
];

export function generateStaticParams() {
  return ALL_WALK_SLUGS.map((slug) => ({ slug }));
}

export default async function WalkPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <WalkDetail slug={slug} />;
}
