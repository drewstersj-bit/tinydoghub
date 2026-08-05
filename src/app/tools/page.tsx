import { SectionLanding } from '@/components/shared/SectionLanding';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tools for Tiny Dog Owners',
  description: 'Free interactive tools for small dog owners. Harness finder, puppy growth tracker, size calculators and more.',
};

const TOOLS = [
  { title: 'Harness Finder', description: 'Answer a few questions and get a personalised harness recommendation for your dog.', href: '/tools/harness-finder', icon: '🎯' },
  { title: 'Puppy Growth Tracker', description: 'Track your puppy\'s weight over time and compare against breed growth curves.', href: '/tools/puppy-growth-tracker', icon: '📈' },
];

export default function ToolsPage() {
  return (
    <SectionLanding
      title="Tools for Tiny Dog Owners"
      description="Free interactive tools designed specifically for Chihuahua, toy breed and puppy owners."
    >
      <div className="grid sm:grid-cols-2 gap-6">
        {TOOLS.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group p-6 rounded-card border border-soft-grey/50 bg-white shadow-card hover:shadow-card-hover transition-all dark:bg-dark-surface dark:border-dark-border"
          >
            <span className="text-2xl" aria-hidden="true">{tool.icon}</span>
            <h3 className="mt-3 font-heading font-semibold text-charcoal dark:text-dark-text group-hover:text-forest-green dark:group-hover:text-muted-sage transition-colors">
              {tool.title}
            </h3>
            <p className="mt-2 text-sm text-charcoal/60 dark:text-dark-muted">{tool.description}</p>
          </Link>
        ))}
      </div>
    </SectionLanding>
  );
}
