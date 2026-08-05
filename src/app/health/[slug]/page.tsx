import HealthArticleClient from './client';

export function generateStaticParams() {
  return [
    { slug: 'hypoglycaemia-in-small-dogs' },
    { slug: 'patellar-luxation-toy-breeds' },
    { slug: 'tracheal-collapse-small-dogs' },
    { slug: 'dental-disease-small-breeds' },
    { slug: 'keeping-tiny-dogs-warm' },
  ];
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <HealthArticleClient slug={slug} />;
}
