'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface Article { slug: string; title: string; category: string; summary: string; key_points: string[]; last_reviewed: string; }

const CATEGORIES = [
  { key: 'all', label: 'All Guides' },
  { key: 'puppies', label: 'Puppy Feeding' },
  { key: 'weight', label: 'Weight & Portions' },
  { key: 'safety', label: 'Food Safety' },
  { key: 'general', label: 'General Nutrition' },
];

export default function NutritionPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from('nutrition_articles').select('slug, title, category, summary, key_points, last_reviewed')
      .eq('status', 'published').order('title')
      .then(({ data }) => { if (data) setArticles(data); setLoading(false); });
  }, []);

  const filtered = category === 'all' ? articles : articles.filter((a) => a.category === category);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold">Nutrition Guides for Tiny Dogs</h1>
          <p className="mt-3 text-lg text-ink-muted max-w-2xl">
            Feeding guidance tailored to tiny dogs. Portion control, puppy schedules, food safety and choosing the right diet for a small body with a fast metabolism.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button key={c.key} onClick={() => setCategory(c.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${category === c.key ? 'bg-plum text-white' : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30'}`}>
              {c.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-48 rounded-2xl bg-grey-100 animate-pulse" />)}
          </div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((article) => (
                <motion.div key={article.slug} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <Link href={`/nutrition/${article.slug}`} className="group block bg-white rounded-2xl border border-grey-200 overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1">
                    <div className="h-2 bg-gradient-to-r from-green to-sage" />
                    <div className="p-5">
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-grey-100 text-grey-700 capitalize">{article.category}</span>
                      <h3 className="mt-3 font-heading font-bold text-lg group-hover:text-plum transition-colors">{article.title}</h3>
                      <p className="mt-2 text-sm text-ink-muted line-clamp-3">{article.summary}</p>
                      {article.key_points.length > 0 && (
                        <p className="mt-3 text-xs text-green font-medium">✓ {article.key_points.length} key points</p>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && <p className="text-center py-12 text-ink-muted">No guides in this category yet.</p>}

        <div className="mt-16 p-5 rounded-xl bg-grey-100 border border-grey-200">
          <p className="text-sm text-ink-muted">
            <strong>Note:</strong> Nutritional information here is general guidance. Individual dogs may have specific dietary needs, allergies or health conditions that require veterinary nutritional advice. Always consult your vet about your dog&apos;s specific dietary requirements.
          </p>
        </div>
      </div>
    </>
  );
}
