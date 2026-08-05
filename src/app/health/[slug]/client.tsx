'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface Article {
  title: string; summary: string; content: string; severity: string;
  when_to_see_vet: string; tiny_dog_specific: string;
  symptoms: string[]; prevention_tips: string[]; related_breeds: string[];
  sources: string[]; last_reviewed: string;
}

export default function HealthArticleClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('health_articles').select('*').eq('slug', slug).eq('status', 'published').single()
      .then(({ data }) => { if (data) setArticle(data); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="container-wide py-20 text-center text-ink-muted">Loading...</div>;
  if (!article) return (
    <div className="container-wide py-20 text-center">
      <p className="text-xl font-heading font-bold">Article not found</p>
      <Link href="/health" className="mt-4 inline-block text-plum hover:underline">← Back to Health Guides</Link>
    </div>
  );

  return (
    <>
      <Breadcrumbs />
      <article className="container-narrow py-12">
        <div className="mb-8"><Link href="/health" className="text-sm text-plum hover:underline">← Health Guides</Link></div>
        <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">{article.title}</h1>
        <p className="text-lg text-ink-muted mb-8">{article.summary}</p>
        {article.when_to_see_vet && (
          <div className="mb-8 p-5 rounded-2xl bg-coral/5 border border-coral/20">
            <p className="font-heading font-bold text-coral mb-1">🚨 When to see your vet</p>
            <p className="text-sm text-ink-light">{article.when_to_see_vet}</p>
          </div>
        )}
        {article.tiny_dog_specific && (
          <div className="mb-8 p-5 rounded-2xl bg-plum/5 border border-plum/10">
            <p className="font-heading font-bold text-plum mb-1">🐾 Why this matters for tiny dogs</p>
            <p className="text-sm text-ink-light">{article.tiny_dog_specific}</p>
          </div>
        )}
        {article.symptoms.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-heading font-bold mb-4">Signs to watch for</h2>
            <ul className="space-y-2">{article.symptoms.map((s) => (<li key={s} className="flex items-start gap-2 text-sm text-ink-light"><span className="text-coral mt-0.5">•</span>{s}</li>))}</ul>
          </section>
        )}
        <div className="prose prose-sm max-w-none mb-8 text-ink-light leading-relaxed whitespace-pre-line">{article.content}</div>
        {article.prevention_tips.length > 0 && (
          <section className="mb-8 p-5 rounded-2xl bg-green-soft border border-green/10">
            <h2 className="text-xl font-heading font-bold mb-4 text-green">✓ Prevention tips</h2>
            <ul className="space-y-2">{article.prevention_tips.map((t) => (<li key={t} className="flex items-start gap-2 text-sm text-ink-light"><span className="text-green mt-0.5">✓</span>{t}</li>))}</ul>
          </section>
        )}
        {article.related_breeds.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-heading font-bold mb-3">Breeds commonly affected</h2>
            <div className="flex flex-wrap gap-2">{article.related_breeds.map((b) => (<Link key={b} href={`/breeds/${b}`} className="px-3 py-1.5 rounded-full text-sm bg-grey-100 text-ink-light hover:text-plum">{b.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</Link>))}</div>
          </section>
        )}
        <div className="mt-12 pt-6 border-t border-grey-200 text-sm text-grey-500">
          <p>Last reviewed: {article.last_reviewed}</p>
          {article.sources.length > 0 && <p className="mt-2">Sources: {article.sources.join(', ')}</p>}
        </div>
        <div className="mt-8 p-4 rounded-xl bg-grey-100 border border-grey-200 text-sm text-ink-muted">This guide is for information only and not a substitute for veterinary advice.</div>
        <div className="mt-8 text-center"><Link href="/vets" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-plum text-white text-sm font-medium hover:bg-plum/90">🏥 Find a vet near you</Link></div>
      </article>
    </>
  );
}
