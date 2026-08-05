'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface DogName {
  name: string;
  gender: 'male' | 'female' | 'unisex';
  origin: string;
  meaning: string;
  tags: string[];
}

const NAMES: DogName[] = [
  { name: 'Bella', gender: 'female', origin: 'Italian', meaning: 'Beautiful', tags: ['classic', 'popular'] },
  { name: 'Coco', gender: 'female', origin: 'French', meaning: 'Chocolate', tags: ['cute', 'food'] },
  { name: 'Luna', gender: 'female', origin: 'Latin', meaning: 'Moon', tags: ['celestial', 'popular'] },
  { name: 'Daisy', gender: 'female', origin: 'English', meaning: 'Day\'s eye flower', tags: ['nature', 'classic'] },
  { name: 'Pixie', gender: 'female', origin: 'English', meaning: 'Fairy', tags: ['cute', 'tiny'] },
  { name: 'Lola', gender: 'female', origin: 'Spanish', meaning: 'Strong woman', tags: ['feisty', 'popular'] },
  { name: 'Rosie', gender: 'female', origin: 'English', meaning: 'Rose', tags: ['nature', 'classic'] },
  { name: 'Poppy', gender: 'female', origin: 'English', meaning: 'Red flower', tags: ['nature', 'popular'] },
  { name: 'Willow', gender: 'female', origin: 'English', meaning: 'Willow tree', tags: ['nature', 'gentle'] },
  { name: 'Maisie', gender: 'female', origin: 'Scottish', meaning: 'Pearl', tags: ['cute', 'classic'] },
  { name: 'Nala', gender: 'female', origin: 'African', meaning: 'Gift', tags: ['exotic', 'popular'] },
  { name: 'Trixie', gender: 'female', origin: 'Latin', meaning: 'She who brings joy', tags: ['fun', 'cute'] },
  { name: 'Dotty', gender: 'female', origin: 'English', meaning: 'Gift of God', tags: ['cute', 'tiny'] },
  { name: 'Bonnie', gender: 'female', origin: 'Scottish', meaning: 'Pretty', tags: ['classic', 'gentle'] },
  { name: 'Minnie', gender: 'female', origin: 'English', meaning: 'Of the mind', tags: ['tiny', 'cute'] },
  { name: 'Gigi', gender: 'female', origin: 'French', meaning: 'Earth worker', tags: ['chic', 'tiny'] },
  { name: 'Honey', gender: 'female', origin: 'English', meaning: 'Sweet nectar', tags: ['sweet', 'food'] },
  { name: 'Fifi', gender: 'female', origin: 'French', meaning: 'God will increase', tags: ['chic', 'tiny'] },
  { name: 'Milo', gender: 'male', origin: 'German', meaning: 'Beloved', tags: ['classic', 'popular'] },
  { name: 'Teddy', gender: 'male', origin: 'English', meaning: 'Divine gift', tags: ['cute', 'popular'] },
  { name: 'Gizmo', gender: 'male', origin: 'English', meaning: 'Gadget', tags: ['quirky', 'fun'] },
  { name: 'Alfie', gender: 'male', origin: 'English', meaning: 'Wise counsellor', tags: ['classic', 'popular'] },
  { name: 'Buddy', gender: 'male', origin: 'English', meaning: 'Friend', tags: ['friendly', 'classic'] },
  { name: 'Charlie', gender: 'male', origin: 'English', meaning: 'Free man', tags: ['classic', 'popular'] },
  { name: 'Archie', gender: 'male', origin: 'Scottish', meaning: 'Bold', tags: ['classic', 'popular'] },
  { name: 'Pip', gender: 'male', origin: 'English', meaning: 'Lover of horses', tags: ['tiny', 'cute'] },
  { name: 'Beans', gender: 'male', origin: 'English', meaning: 'Small and lively', tags: ['food', 'tiny'] },
  { name: 'Rocket', gender: 'male', origin: 'English', meaning: 'Fast', tags: ['energetic', 'fun'] },
  { name: 'Bruno', gender: 'male', origin: 'German', meaning: 'Brown', tags: ['strong', 'classic'] },
  { name: 'Louie', gender: 'male', origin: 'French', meaning: 'Famous warrior', tags: ['chic', 'classic'] },
  { name: 'Nacho', gender: 'male', origin: 'Spanish', meaning: 'Born at Christmas', tags: ['food', 'fun'] },
  { name: 'Rolo', gender: 'male', origin: 'English', meaning: 'Famous wolf', tags: ['food', 'cute'] },
  { name: 'Ziggy', gender: 'male', origin: 'German', meaning: 'Victory', tags: ['quirky', 'fun'] },
  { name: 'Pickle', gender: 'unisex', origin: 'English', meaning: 'Mischief maker', tags: ['food', 'fun'] },
  { name: 'Biscuit', gender: 'unisex', origin: 'English', meaning: 'Twice cooked', tags: ['food', 'cute'] },
  { name: 'Pepper', gender: 'unisex', origin: 'English', meaning: 'Spice', tags: ['food', 'feisty'] },
  { name: 'Toffee', gender: 'unisex', origin: 'English', meaning: 'Sweet confection', tags: ['food', 'sweet'] },
  { name: 'Peanut', gender: 'unisex', origin: 'English', meaning: 'Small nut', tags: ['food', 'tiny'] },
  { name: 'Cookie', gender: 'unisex', origin: 'English', meaning: 'Sweet biscuit', tags: ['food', 'cute'] },
  { name: 'Sprout', gender: 'unisex', origin: 'English', meaning: 'New growth', tags: ['nature', 'tiny'] },
  { name: 'Pebble', gender: 'unisex', origin: 'English', meaning: 'Small stone', tags: ['nature', 'tiny'] },
  { name: 'Acorn', gender: 'unisex', origin: 'English', meaning: 'Oak seed', tags: ['nature', 'tiny'] },
  { name: 'Wren', gender: 'unisex', origin: 'English', meaning: 'Small bird', tags: ['nature', 'tiny'] },
];

type GenderFilter = 'all' | 'female' | 'male' | 'unisex';
type TagFilter = string;

const TAGS = ['popular', 'tiny', 'cute', 'food', 'nature', 'classic', 'fun', 'chic', 'feisty', 'quirky'];

export default function DogNamesPage() {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState<GenderFilter>('all');
  const [activeTag, setActiveTag] = useState<TagFilter>('');

  const filtered = useMemo(() => {
    return NAMES.filter((n) => {
      if (search && !n.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (gender !== 'all' && n.gender !== gender) return false;
      if (activeTag && !n.tags.includes(activeTag)) return false;
      return true;
    });
  }, [search, gender, activeTag]);

  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        <div className="mb-10">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold">Dog Name Finder</h1>
          <p className="mt-3 text-lg text-ink-muted max-w-2xl">
            Find the perfect name for your tiny dog. Browse by gender, style and personality — from classic to quirky, cute to feisty.
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm mb-6">
          <input
            type="search"
            placeholder="Search names..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-full border border-grey-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-plum/30"
            aria-label="Search dog names"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-grey-500" aria-hidden="true">🔍</span>
        </div>

        {/* Gender filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {(['all', 'female', 'male', 'unisex'] as GenderFilter[]).map((g) => (
            <button key={g} onClick={() => setGender(g)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all capitalize ${gender === g ? 'bg-plum text-white' : 'bg-white text-ink-light border border-grey-200 hover:border-plum/30'}`}>
              {g === 'all' ? '🐾 All' : g === 'female' ? '♀ Girls' : g === 'male' ? '♂ Boys' : '⚡ Unisex'}
            </button>
          ))}
        </div>

        {/* Tag filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {TAGS.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${activeTag === tag ? 'bg-coral text-white' : 'bg-grey-100 text-grey-700 hover:bg-grey-200'}`}>
              {tag}
            </button>
          ))}
          {activeTag && <button onClick={() => setActiveTag('')} className="text-xs text-coral hover:underline ml-2">Clear</button>}
        </div>

        {/* Results */}
        <p className="text-sm text-ink-muted mb-4">{filtered.length} name{filtered.length !== 1 ? 's' : ''} found</p>

        <motion.div layout className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((n) => (
              <motion.div key={n.name} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                className="p-4 rounded-xl bg-white border border-grey-200 hover:shadow-card-hover hover:-translate-y-0.5 transition-all text-center">
                <p className="font-heading font-bold text-lg text-plum">{n.name}</p>
                <p className="text-xs text-grey-500 mt-1 capitalize">
                  {n.gender === 'female' ? '♀' : n.gender === 'male' ? '♂' : '⚡'} {n.gender}
                </p>
                <p className="text-xs text-ink-muted mt-1">{n.meaning}</p>
                <p className="text-xs text-grey-500 mt-1">{n.origin}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl block mb-3" aria-hidden="true">🐾</span>
            <p className="text-ink-muted">No names match your search. Try a different filter.</p>
          </div>
        )}

        {/* Fun suggestion */}
        <div className="mt-16 p-6 rounded-2xl bg-plum/5 border border-plum/10 text-center">
          <p className="font-heading font-bold text-plum mb-2">💡 Naming tip</p>
          <p className="text-sm text-ink-muted max-w-md mx-auto">
            Short names (1–2 syllables) are easiest for tiny dogs to learn. Choose something that sounds distinct from common commands like "sit" or "stay."
          </p>
        </div>
      </div>
    </>
  );
}
