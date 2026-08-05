'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { supabase } from '@/lib/supabase';

interface Article {
  slug: string;
  title: string;
  category: string;
  summary: string;
  severity: string;
  symptoms: string[];
  related_breeds: string[];
  last_reviewed: string;
}

const CATEGORIES = [
  { key: 'all', label: 'All Guides', emoji: '📚' },
  { key: 'emergency', label: 'Emergency', emoji: '🚨' },
  { key: 'respiratory', label: 'Respiratory', emoji: '💨' },
  { key: 'orthopaedic', label: 'Bones & Joints', emoji: '🦴' },
  { key: 'dental', label: 'Dental', emoji: '🦷' },
  { key: 'seasonal', label: 'Seasonal', emoji: '🌡️' },
];

function severityBadge(severity: string) {
  switch (severity) {
    case 'emergency': return 'bg-coral text-white';
    case 'chronic': return 'bg-lemon text-ink';
    case 'informational': return 'bg-grey-100 text-ink-muted';
    default: return 'bg-grey-100 text-ink-muted';
  }
}

export default function HealthPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase
        .from('health_articles')
        .select('slug, title, category, summary, severity, symptoms, related_breeds, last_reviewed')
        .eq('status', 'published')
        .order('title');

      if (!error && data) {
        setArticles(data);
      }
      setLoading(false);
    }
    load();
  }, []);

  const filtered = category === 'all' ? articles : articles.filter((a) => a.category === category);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        {/* Hero */}
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold">
            Health Guides for Tiny Dogs
          </h1>
          <p className="mt-3 text-lg text-ink-muted dark:text-dark-muted max-w-2xl">
            Evidence-based health information written specifically for Chihuahuas, toy breeds and puppies. Know the signs, understand the risks, and learn when to see your vet.
          </p>
        </div>

        {/* Emergency callout */}
        <div className="mb-8 p-5 rounded-2xl bg-coral/5 border border-coral/20">
          <p className="font-heading font-bold text-coral mb-1">🚨 In an emergency</p>
          <p className="text-sm text-ink-light dark:text-dark-text">
            If your dog is unconscious, having a seizure, struggling to breathe, or bleeding heavily — contact your nearest emergency vet immediately.
            <Link href="/vets" className="ml-2 text-plum dark:text-coral-soft font-medium hover:underline">Find emergency vets →</Link>
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              onClick={() => setCategory(c.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c.key
                  ? 'bg-plum text-white shadow-md'
                  : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30'
              }`}
            >
              <span aria-hidden="true">{c.emoji}</span>
              {c.label}
            </button>
          ))}
        </div>

        {/* Articles */}
        {loading ? (
          <div className="text-center py-12 text-ink-muted">Loading health guides...</div>
        ) : (
          <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((article) => (
                <motion.div
                  key={article.slug}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  <Link
                    href={`/health/${article.slug}`}
                    className="group block bg-white dark:bg-dark-surface rounded-2xl border border-grey-200 dark:border-dark-border overflow-hidden shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${severityBadge(article.severity)}`}>
                          {article.severity === 'emergency' ? '🚨 Emergency' : article.category}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg group-hover:text-plum transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted line-clamp-3">
                        {article.summary}
                      </p>
                      {article.symptoms.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {article.symptoms.slice(0, 3).map((s) => (
                            <span key={s} className="px-2 py-0.5 rounded-full text-xs bg-grey-100 text-grey-700 dark:bg-dark-border dark:text-dark-muted">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-12">
            <p className="text-ink-muted">No guides in this category yet.</p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="mt-16 p-5 rounded-xl bg-grey-100 dark:bg-dark-border/20 border border-grey-200 dark:border-dark-border">
          <p className="text-sm text-ink-muted dark:text-dark-muted">
            <strong>Important:</strong> These guides provide general health information for educational purposes. They are not a substitute for professional veterinary advice. Always consult your vet if you are concerned about your dog&apos;s health.
          </p>
        </div>
      </div>
    </>
  );
}
