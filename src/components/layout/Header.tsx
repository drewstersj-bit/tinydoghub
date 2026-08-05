'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DarkModeToggle } from '@/components/shared/DarkModeToggle';

const NAV_ITEMS = [
  { label: 'Breeds', href: '/breed-database', emoji: '🐾' },
  { label: 'Health', href: '/health', emoji: '💚' },
  { label: 'Training', href: '/training', emoji: '🎓' },
  { label: 'Walks', href: '/walks', emoji: '🌳' },
  { label: 'Dog Friendly', href: '/dog-friendly/cafes', emoji: '☕' },
  { label: 'Tools', href: '/tools', emoji: '🧰' },
  { label: 'About', href: '/about', emoji: '💬' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-soft-grey/50 bg-warm-white/80 backdrop-blur-md dark:bg-dark-surface/80 dark:border-dark-border">
      <div className="container-wide flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-heading text-xl font-bold text-forest-green dark:text-muted-sage">
          <span aria-hidden="true">🐾</span>
          <span>TinyDogHub</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-1.5 text-sm font-medium text-charcoal/80 hover:text-forest-green transition-colors dark:text-dark-text/80 dark:hover:text-muted-sage"
            >
              <span className="text-xs" aria-hidden="true">{item.emoji}</span>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <DarkModeToggle />

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-card hover:bg-soft-grey/50 dark:hover:bg-dark-border/50 transition-colors"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden border-t border-soft-grey/50 dark:border-dark-border"
            aria-label="Mobile navigation"
          >
            <div className="container-wide py-4 flex flex-col gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-card text-sm font-medium text-charcoal/80 hover:bg-soft-grey/50 transition-colors dark:text-dark-text/80 dark:hover:bg-dark-border/50"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
