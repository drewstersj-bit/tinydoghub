import { BreedProfile } from './BreedProfile';

const BREED_SLUGS = ['chihuahua', 'yorkshire-terrier', 'pomeranian', 'maltese', 'papillon', 'toy-poodle', 'shih-tzu', 'miniature-dachshund', 'cavalier-king-charles', 'italian-greyhound', 'pug', 'russian-toy'];

export function generateStaticParams() {
  return BREED_SLUGS.map((slug) => ({ slug }));
}

export default async function BreedPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BreedProfile slug={slug} />;
}
