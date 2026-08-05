'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface Article { title: string; summary: string; content: string; tiny_dog_specific: string; key_tips: string[]; common_mistakes: string[]; related_breeds: string[]; sources: string[]; last_reviewed: string; }

export default function TrainingArticleClient({ slug }: { slug: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('training_articles').select('*').eq('slug', slug).eq('status', 'published').single()
      .then(({ data }) => { if (data) setArticle(data); setLoading(false); });
  }, [slug]);

  if (loading) return <div className="container-wide py-20 text-center text-ink-muted">Loading...</div>;
  if (!article) return (
    <div className="container-wide py-20 text-center">
      <p className="text-xl font-heading font-bold">Article not found</p>
      <Link href="/training" className="mt-4 inline-block text-plum hover:underline">← Back to Training Guides</Link>
    </div>
  );

  return (
    <>
      <Breadcrumbs />
      <article className="container-narrow py-12">
        <div className="mb-8"><Link href="/training" className="text-sm text-plum hover:underline">← Training Guides</Link></div>
        <h1 className="text-3xl lg:text-4xl font-heading font-bold mb-4">{article.title}</h1>
        <p className="text-lg text-ink-muted mb-8">{article.summary}</p>

        {article.tiny_dog_specific && (
          <div className="mb-8 p-5 rounded-2xl bg-plum/5 border border-plum/10">
            <p className="font-heading font-bold text-plum mb-1">🐾 Tiny dog note</p>
            <p className="text-sm text-ink-light">{article.tiny_dog_specific}</p>
          </div>
        )}

        <div className="prose prose-sm max-w-none mb-8 text-ink-light leading-relaxed whitespace-pre-line">{article.content}</div>

        {article.key_tips.length > 0 && (
          <section className="mb-8 p-5 rounded-2xl bg-green-soft border border-green/10">
            <h2 className="text-xl font-heading font-bold mb-4 text-green">✓ Key tips</h2>
            <ul className="space-y-2">{article.key_tips.map((t) => (<li key={t} className="flex items-start gap-2 text-sm text-ink-light"><span className="text-green mt-0.5">✓</span>{t}</li>))}</ul>
          </section>
        )}

        {article.common_mistakes.length > 0 && (
          <section className="mb-8 p-5 rounded-2xl bg-coral/5 border border-coral/10">
            <h2 className="text-xl font-heading font-bold mb-4 text-coral">✗ Common mistakes</h2>
            <ul className="space-y-2">{article.common_mistakes.map((m) => (<li key={m} className="flex items-start gap-2 text-sm text-ink-light"><span className="text-coral mt-0.5">✗</span>{m}</li>))}</ul>
          </section>
        )}

        {article.related_breeds.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-heading font-bold mb-3">Related breeds</h2>
            <div className="flex flex-wrap gap-2">{article.related_breeds.map((b) => (<Link key={b} href={`/breeds/${b}`} className="px-3 py-1.5 rounded-full text-sm bg-grey-100 text-ink-light hover:text-plum">{b.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</Link>))}</div>
          </section>
        )}

        <div className="mt-12 pt-6 border-t border-grey-200 text-sm text-grey-500">
          <p>Last reviewed: {article.last_reviewed}</p>
          {article.sources.length > 0 && <p className="mt-2">Sources: {article.sources.join(', ')}</p>}
        </div>
        <div className="mt-8 p-4 rounded-xl bg-grey-100 border border-grey-200 text-sm text-ink-muted">
          Training advice here is general guidance. For serious behaviour problems, consult a qualified animal behaviourist (APDT or ABTC member).
        </div>
      </article>
    </>
  );
}
