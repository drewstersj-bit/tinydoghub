'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

const BREEDS_PREVIEW = [
  { name: 'Chihuahua', emoji: '🐕', size: '1.5–3kg', personality: 'Bold & Loyal', href: '/breeds/chihuahua', color: 'bg-amber-50 dark:bg-amber-950/20' },
  { name: 'Yorkshire Terrier', emoji: '🐶', size: '2–3.2kg', personality: 'Feisty & Affectionate', href: '/breeds/yorkshire-terrier', color: 'bg-sky-50 dark:bg-sky-950/20' },
  { name: 'Pomeranian', emoji: '🦊', size: '1.8–3.5kg', personality: 'Spirited & Curious', href: '/breeds/pomeranian', color: 'bg-orange-50 dark:bg-orange-950/20' },
  { name: 'Maltese', emoji: '🐩', size: '1.8–3.6kg', personality: 'Gentle & Playful', href: '/breeds/maltese', color: 'bg-purple-50 dark:bg-purple-950/20' },
  { name: 'Papillon', emoji: '🦋', size: '2.5–4.5kg', personality: 'Smart & Elegant', href: '/breeds/papillon', color: 'bg-pink-50 dark:bg-pink-950/20' },
  { name: 'Toy Poodle', emoji: '🐩', size: '2–4kg', personality: 'Clever & Active', href: '/breeds/toy-poodle', color: 'bg-emerald-50 dark:bg-emerald-950/20' },
];

const QUICK_FINDER_QUESTIONS = [
  { id: 'activity', label: 'How active is your lifestyle?', options: ['Relaxed', 'Moderate', 'Active'] },
  { id: 'space', label: 'Where do you live?', options: ['Flat', 'House with garden', 'Rural'] },
  { id: 'experience', label: 'Dog experience?', options: ['First timer', 'Some experience', 'Experienced'] },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HomePage() {
  const [finderStep, setFinderStep] = useState(0);
  const [finderAnswers, setFinderAnswers] = useState<string[]>([]);

  const handleFinderAnswer = (answer: string) => {
    const updated = [...finderAnswers, answer];
    setFinderAnswers(updated);
    if (finderStep < QUICK_FINDER_QUESTIONS.length - 1) {
      setFinderStep(finderStep + 1);
    }
  };

  const resetFinder = () => {
    setFinderStep(0);
    setFinderAnswers([]);
  };

  return (
    <div className="flex flex-col">
      {/* Hero — warm, inviting, illustration-style */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cream via-white to-grey-100 dark:from-dark-bg dark:via-dark-surface dark:to-dark-bg" />
        {/* Hero decorative image */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
          <Image
            src="/images/tinydoghub_1410466767.webp"
            alt=""
            fill
            className="object-cover object-center opacity-30"
            priority
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent dark:from-dark-bg dark:via-dark-bg/80" />
        </div>

        <div className="relative container-wide py-20 lg:py-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-plum/10 text-plum dark:bg-sage/20 dark:text-muted-sage text-sm font-medium mb-6">
              <span aria-hidden="true">🇬🇧</span>
              The UK&apos;s trusted tiny dog resource
            </motion.div>

            <motion.h1 variants={fadeUp} className="text-5xl lg:text-7xl font-heading font-bold text-ink dark:text-dark-text leading-tight">
              Everything your
              <br />
              <span className="relative">
                <span className="text-plum dark:text-coral-soft">tiny dog</span>
                <span className="absolute -bottom-1 left-0 right-0 h-3 bg-sage/20 dark:bg-sage/10 rounded-full -z-10" aria-hidden="true" />
              </span>
              {' '}needs.
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-xl text-ink-muted dark:text-dark-muted max-w-xl leading-relaxed">
              Breed guides, interactive tools, size charts and expert care advice — built by tiny dog owners, for tiny dog owners.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/breed-database"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-plum text-white font-medium hover:bg-plum/90 transition-all shadow-lg shadow-forest-green/20 hover:shadow-xl hover:shadow-forest-green/30"
              >
                <span aria-hidden="true">🐾</span>
                Explore Breeds
              </Link>
              <Link
                href="/tools/harness-finder"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border-2 border-charcoal/10 text-ink font-medium hover:border-plum hover:text-plum transition-all dark:border-dark-border dark:text-dark-text dark:hover:border-muted-sage dark:hover:text-muted-sage"
              >
                <span aria-hidden="true">📏</span>
                Find a Harness
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Breed Explorer — interactive cards */}
      <section className="container-wide py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="text-center mb-12">
            <h2 className="text-h2 font-heading font-bold text-ink dark:text-dark-text">
              Meet the Tiny Breeds
            </h2>
            <p className="mt-3 text-ink-muted dark:text-dark-muted max-w-md mx-auto">
              Tap a breed to discover their personality, care needs and average sizes.
            </p>
          </motion.div>

          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {BREEDS_PREVIEW.map((breed) => (
              <motion.div key={breed.name} variants={fadeUp}>
                <Link
                  href={breed.href}
                  className={`group block p-5 rounded-2xl ${breed.color} border border-transparent hover:border-plum/20 dark:hover:border-muted-sage/20 transition-all hover:scale-105 hover:shadow-lg text-center`}
                >
                  <span className="text-4xl block mb-3" aria-hidden="true">{breed.emoji}</span>
                  <h3 className="font-heading font-semibold text-sm text-ink dark:text-dark-text">
                    {breed.name}
                  </h3>
                  <p className="text-xs text-grey-500 dark:text-dark-muted mt-1">{breed.size}</p>
                  <p className="text-xs text-plum dark:text-coral-soft mt-1 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {breed.personality}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-8">
            <Link
              href="/breed-database"
              className="inline-flex items-center gap-2 text-sm font-medium text-plum dark:text-coral-soft hover:underline"
            >
              View all 30+ breeds →
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Quick Breed Finder — interactive mini-quiz */}
      <section className="bg-gradient-to-br from-forest-green to-forest-green/90 dark:from-forest-green/80 dark:to-forest-green/60 rounded-3xl mx-4 lg:mx-auto lg:max-w-5xl overflow-hidden">
        <div className="p-8 lg:p-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-3xl" aria-hidden="true">🔍</span>
            <h2 className="text-h3 font-heading font-bold text-white">
              Quick Breed Finder
            </h2>
          </div>
          <p className="text-white/70 mb-8 max-w-md">
            Answer 3 quick questions and we&apos;ll suggest breeds that match your lifestyle.
          </p>

          {finderAnswers.length < QUICK_FINDER_QUESTIONS.length ? (
            <div>
              <div className="flex gap-1 mb-6">
                {QUICK_FINDER_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 flex-1 rounded-full transition-colors ${
                      i <= finderStep ? 'bg-white' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
              <p className="text-white font-medium text-lg mb-4">
                {QUICK_FINDER_QUESTIONS[finderStep].label}
              </p>
              <div className="flex flex-wrap gap-3">
                {QUICK_FINDER_QUESTIONS[finderStep].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleFinderAnswer(option)}
                    className="px-5 py-3 rounded-full bg-white/10 border border-white/20 text-white font-medium hover:bg-white/20 hover:border-white/40 transition-all"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <p className="text-white font-medium text-lg mb-3">
                ✨ Based on your answers, great matches include:
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">Chihuahua</span>
                <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">Maltese</span>
                <span className="px-4 py-2 rounded-full bg-white/20 text-white text-sm font-medium">Papillon</span>
              </div>
              <div className="flex gap-3">
                <Link
                  href="/breed-database"
                  className="px-5 py-2.5 rounded-full bg-white text-plum font-medium text-sm hover:bg-white/90 transition-colors"
                >
                  Explore these breeds
                </Link>
                <button
                  onClick={resetFinder}
                  className="px-5 py-2.5 rounded-full border border-white/30 text-white font-medium text-sm hover:bg-white/10 transition-colors"
                >
                  Start again
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Interactive Tools Grid */}
      <section className="container-wide py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="text-h2 font-heading font-bold text-ink dark:text-dark-text text-center mb-4">
            Tools that actually help
          </motion.h2>
          <motion.p variants={fadeUp} className="text-ink-muted dark:text-dark-muted text-center max-w-md mx-auto mb-12">
            Free interactive tools designed specifically for tiny dogs. No sign-up needed.
          </motion.p>

          <motion.div variants={stagger} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Harness Finder', desc: 'Get a personalised harness recommendation in under a minute.', icon: '🎯', href: '/tools/harness-finder', accent: 'border-l-deep-coral' },
              { title: 'Puppy Growth Tracker', desc: 'Track your puppy\'s weight and compare to breed growth curves.', icon: '📈', href: '/tools/puppy-growth-tracker', accent: 'border-l-forest-green' },
              { title: 'Size Database', desc: 'Average chest, neck and weight for every tiny breed.', icon: '📏', href: '/size-database', accent: 'border-l-muted-sage' },
              { title: 'Dog Walks Map', desc: 'Find small-dog-friendly routes near you with interactive maps.', icon: '🗺️', href: '/walks', accent: 'border-l-warm-beige' },
              { title: 'Dog Name Finder', desc: 'Browse 1000+ names filtered by personality and style.', icon: '✨', href: '/dog-names', accent: 'border-l-purple-400' },
              { title: 'Dog Friendly Places', desc: 'Cafes, hotels and holidays that truly welcome tiny dogs.', icon: '☕', href: '/dog-friendly/cafes', accent: 'border-l-amber-400' },
            ].map((tool) => (
              <motion.div key={tool.title} variants={fadeUp}>
                <Link
                  href={tool.href}
                  className={`group block p-6 rounded-2xl bg-white dark:bg-dark-surface border border-grey-200/30 dark:border-dark-border border-l-4 ${tool.accent} shadow-card hover:shadow-card-hover transition-all hover:-translate-y-1`}
                >
                  <span className="text-2xl block mb-3" aria-hidden="true">{tool.icon}</span>
                  <h3 className="font-heading font-semibold text-ink dark:text-dark-text group-hover:text-plum dark:group-hover:text-muted-sage transition-colors">
                    {tool.title}
                  </h3>
                  <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted leading-relaxed">
                    {tool.desc}
                  </p>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Trust / Social proof */}
      <section className="bg-white dark:bg-dark-surface border-y border-grey-200/30 dark:border-dark-border">
        <div className="container-wide py-16">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl font-heading font-bold text-plum dark:text-coral-soft">30+</p>
              <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted">Tiny breeds covered</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-plum dark:text-coral-soft">100%</p>
              <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted">Free tools, no sign-up</p>
            </div>
            <div>
              <p className="text-4xl font-heading font-bold text-plum dark:text-coral-soft">0</p>
              <p className="mt-2 text-sm text-ink-muted dark:text-dark-muted">Sponsored content or ads</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="container-narrow py-20 text-center">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="text-5xl block mb-4" aria-hidden="true">💌</motion.span>
          <motion.h2 variants={fadeUp} className="text-h2 font-heading font-bold text-ink dark:text-dark-text">
            Join the tiny dog community
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-3 text-ink-muted dark:text-dark-muted max-w-md mx-auto">
            Weekly tips, new breed guides and tool updates. No spam, just genuinely useful advice.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-8 max-w-sm mx-auto flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 rounded-full border border-grey-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-green/30 dark:bg-dark-surface dark:border-dark-border dark:text-dark-text"
              aria-label="Email for newsletter"
            />
            <button className="px-5 py-3 rounded-full bg-plum text-white text-sm font-medium hover:bg-plum/90 transition-colors">
              Subscribe
            </button>
          </motion.div>
          <motion.p variants={fadeUp} className="mt-3 text-xs text-grey-500 dark:text-dark-subtle">
            Free forever. Unsubscribe any time.
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
