'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface Breed {
  name: string;
  slug: string;
  emoji: string;
  size: string;
  weight: string;
  personality: string[];
  exercise: 'Low' | 'Moderate' | 'High';
  grooming: 'Low' | 'Moderate' | 'High';
  apartment: boolean;
  goodWithKids: boolean;
  hypoallergenic: boolean;
  color: string;
  description: string;
}

const BREEDS: Breed[] = [
  {
    name: 'Chihuahua', slug: 'chihuahua', emoji: '🐕', size: 'Toy',
    weight: '1.5–3 kg', personality: ['Bold', 'Loyal', 'Alert'],
    exercise: 'Low', grooming: 'Low', apartment: true, goodWithKids: false,
    hypoallergenic: false, color: 'from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/20',
    description: 'The world\'s smallest breed with the biggest personality. Fiercely devoted to their owner.',
  },
  {
    name: 'Yorkshire Terrier', slug: 'yorkshire-terrier', emoji: '🐶', size: 'Toy',
    weight: '2–3.2 kg', personality: ['Feisty', 'Affectionate', 'Confident'],
    exercise: 'Moderate', grooming: 'High', apartment: true, goodWithKids: true,
    hypoallergenic: true, color: 'from-sky-50 to-blue-50 dark:from-sky-950/30 dark:to-blue-950/20',
    description: 'A glamorous terrier with a silky coat and a surprisingly bold spirit.',
  },
  {
    name: 'Pomeranian', slug: 'pomeranian', emoji: '🦊', size: 'Toy',
    weight: '1.8–3.5 kg', personality: ['Spirited', 'Curious', 'Playful'],
    exercise: 'Moderate', grooming: 'High', apartment: true, goodWithKids: true,
    hypoallergenic: false, color: 'from-orange-50 to-red-50 dark:from-orange-950/30 dark:to-red-950/20',
    description: 'A fluffy bundle of energy descended from Arctic sled dogs. Don\'t let the pom-pom fool you.',
  },
  {
    name: 'Maltese', slug: 'maltese', emoji: '🐩', size: 'Toy',
    weight: '1.8–3.6 kg', personality: ['Gentle', 'Playful', 'Charming'],
    exercise: 'Low', grooming: 'High', apartment: true, goodWithKids: true,
    hypoallergenic: true, color: 'from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/20',
    description: 'An ancient breed of pure white elegance. Loving, trusting and great with families.',
  },
  {
    name: 'Papillon', slug: 'papillon', emoji: '🦋', size: 'Toy',
    weight: '2.5–4.5 kg', personality: ['Smart', 'Elegant', 'Athletic'],
    exercise: 'Moderate', grooming: 'Moderate', apartment: true, goodWithKids: true,
    hypoallergenic: false, color: 'from-pink-50 to-rose-50 dark:from-pink-950/30 dark:to-rose-950/20',
    description: 'Named for their butterfly-wing ears. One of the smartest toy breeds.',
  },
  {
    name: 'Toy Poodle', slug: 'toy-poodle', emoji: '🐩', size: 'Toy',
    weight: '2–4 kg', personality: ['Clever', 'Active', 'Proud'],
    exercise: 'Moderate', grooming: 'High', apartment: true, goodWithKids: true,
    hypoallergenic: true, color: 'from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20',
    description: 'Highly intelligent and remarkably athletic for their size. Non-shedding coat.',
  },
  {
    name: 'Shih Tzu', slug: 'shih-tzu', emoji: '🐶', size: 'Small',
    weight: '4–7.2 kg', personality: ['Friendly', 'Outgoing', 'Trusting'],
    exercise: 'Low', grooming: 'High', apartment: true, goodWithKids: true,
    hypoallergenic: true, color: 'from-rose-50 to-amber-50 dark:from-rose-950/30 dark:to-amber-950/20',
    description: 'Bred as a palace companion in ancient China. Content, affectionate and loves a cuddle.',
  },
  {
    name: 'Miniature Dachshund', slug: 'miniature-dachshund', emoji: '🌭', size: 'Small',
    weight: '4–5 kg', personality: ['Brave', 'Stubborn', 'Curious'],
    exercise: 'Moderate', grooming: 'Low', apartment: true, goodWithKids: true,
    hypoallergenic: false, color: 'from-yellow-50 to-amber-50 dark:from-yellow-950/30 dark:to-amber-950/20',
    description: 'Bold and fearless with a famously long silhouette. A hunter in a tiny package.',
  },
  {
    name: 'Cavalier King Charles', slug: 'cavalier-king-charles', emoji: '👑', size: 'Small',
    weight: '5.4–8 kg', personality: ['Gentle', 'Graceful', 'Loving'],
    exercise: 'Moderate', grooming: 'Moderate', apartment: true, goodWithKids: true,
    hypoallergenic: false, color: 'from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/20',
    description: 'The ultimate lap dog with a regal history. Adaptable, sweet and wonderful with children.',
  },
  {
    name: 'Italian Greyhound', slug: 'italian-greyhound', emoji: '🏃', size: 'Small',
    weight: '3.6–5 kg', personality: ['Elegant', 'Sensitive', 'Athletic'],
    exercise: 'High', grooming: 'Low', apartment: true, goodWithKids: false,
    hypoallergenic: false, color: 'from-slate-50 to-gray-50 dark:from-slate-950/30 dark:to-gray-950/20',
    description: 'A miniature sighthound built for speed. Graceful, affectionate and surprisingly fast.',
  },
  {
    name: 'Pug', slug: 'pug', emoji: '🐾', size: 'Small',
    weight: '6–8 kg', personality: ['Charming', 'Mischievous', 'Loving'],
    exercise: 'Low', grooming: 'Low', apartment: true, goodWithKids: true,
    hypoallergenic: false, color: 'from-stone-50 to-amber-50 dark:from-stone-950/30 dark:to-amber-950/20',
    description: 'A comical character with a wrinkly face and a heart full of love. The clown of the toy world.',
  },
  {
    name: 'Russian Toy', slug: 'russian-toy', emoji: '🐕', size: 'Toy',
    weight: '1–3 kg', personality: ['Lively', 'Devoted', 'Cheerful'],
    exercise: 'Low', grooming: 'Low', apartment: true, goodWithKids: false,
    hypoallergenic: false, color: 'from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/20',
    description: 'One of the world\'s smallest breeds. Elegant, lively and deeply bonded to their person.',
  },
];

type FilterKey = 'all' | 'apartment' | 'hypoallergenic' | 'kids' | 'lowExercise';

export default function BreedDatabasePage() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [hoveredBreed, setHoveredBreed] = useState<string | null>(null);

  const filters: { key: FilterKey; label: string; emoji: string }[] = [
    { key: 'all', label: 'All Breeds', emoji: '🐾' },
    { key: 'apartment', label: 'Apartment Friendly', emoji: '🏢' },
    { key: 'hypoallergenic', label: 'Hypoallergenic', emoji: '✨' },
    { key: 'kids', label: 'Good with Kids', emoji: '👶' },
    { key: 'lowExercise', label: 'Low Exercise', emoji: '🛋️' },
  ];

  const filteredBreeds = BREEDS.filter((breed) => {
    if (searchTerm && !breed.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    switch (filter) {
      case 'apartment': return breed.apartment;
      case 'hypoallergenic': return breed.hypoallergenic;
      case 'kids': return breed.goodWithKids;
      case 'lowExercise': return breed.exercise === 'Low';
      default: return true;
    }
  });

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <h1 className="text-h1 font-heading font-bold text-charcoal dark:text-dark-text">
            Tiny Dog Breed Database
          </h1>
          <p className="mt-4 text-body-lg text-charcoal/70 dark:text-dark-muted">
            Interactive guide to every toy and miniature breed. Tap any breed for temperament, health, sizing and daily care.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-sm">
            <input
              type="search"
              placeholder="Search breeds..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border border-soft-grey/60 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
              aria-label="Search breeds"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-charcoal/30" aria-hidden="true">🔍</span>
          </div>
        </div>

        {/* Filter pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-forest-green text-white shadow-md'
                  : 'bg-soft-grey/30 text-charcoal/70 hover:bg-soft-grey/50 dark:bg-dark-border/30 dark:text-dark-muted dark:hover:bg-dark-border/50'
              }`}
            >
              <span aria-hidden="true">{f.emoji}</span>
              {f.label}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className="text-sm text-charcoal/50 dark:text-dark-muted mb-6">
          Showing {filteredBreeds.length} breed{filteredBreeds.length !== 1 ? 's' : ''}
        </p>

        {/* Breed Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filteredBreeds.map((breed) => (
              <motion.div
                key={breed.slug}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  href={`/breeds/${breed.slug}`}
                  className={`group block relative overflow-hidden rounded-2xl bg-gradient-to-br ${breed.color} border border-soft-grey/20 dark:border-dark-border/30 p-6 transition-all hover:shadow-xl hover:-translate-y-1`}
                  onMouseEnter={() => setHoveredBreed(breed.slug)}
                  onMouseLeave={() => setHoveredBreed(null)}
                >
                  {/* Emoji avatar */}
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-5xl" aria-hidden="true">{breed.emoji}</span>
                    <span className="px-2.5 py-1 rounded-full bg-white/60 dark:bg-dark-surface/60 text-xs font-medium text-charcoal/70 dark:text-dark-muted">
                      {breed.size}
                    </span>
                  </div>

                  {/* Name and description */}
                  <h3 className="font-heading font-bold text-lg text-charcoal dark:text-dark-text group-hover:text-forest-green dark:group-hover:text-muted-sage transition-colors">
                    {breed.name}
                  </h3>
                  <p className="mt-1 text-sm text-charcoal/60 dark:text-dark-muted leading-relaxed">
                    {breed.description}
                  </p>

                  {/* Quick stats */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {breed.personality.map((trait) => (
                      <span key={trait} className="px-2.5 py-1 rounded-full bg-white/50 dark:bg-dark-surface/50 text-xs text-charcoal/70 dark:text-dark-muted">
                        {trait}
                      </span>
                    ))}
                  </div>

                  {/* Expanded info on hover */}
                  <AnimatePresence>
                    {hoveredBreed === breed.slug && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-charcoal/10 dark:border-dark-border/30 grid grid-cols-3 gap-3 text-center">
                          <div>
                            <p className="text-xs text-charcoal/40 dark:text-dark-muted">Weight</p>
                            <p className="text-sm font-medium text-charcoal dark:text-dark-text">{breed.weight}</p>
                          </div>
                          <div>
                            <p className="text-xs text-charcoal/40 dark:text-dark-muted">Exercise</p>
                            <p className="text-sm font-medium text-charcoal dark:text-dark-text">{breed.exercise}</p>
                          </div>
                          <div>
                            <p className="text-xs text-charcoal/40 dark:text-dark-muted">Grooming</p>
                            <p className="text-sm font-medium text-charcoal dark:text-dark-text">{breed.grooming}</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredBreeds.length === 0 && (
          <div className="text-center py-16">
            <span className="text-4xl block mb-3" aria-hidden="true">🔍</span>
            <p className="text-charcoal/60 dark:text-dark-muted">No breeds match your filters. Try a different combination.</p>
          </div>
        )}
      </div>
    </>
  );
}
