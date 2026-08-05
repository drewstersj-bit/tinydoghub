import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About TinyDogHub',
  description: 'Our mission is to be the most trusted resource in the UK for tiny dog owners. Learn about our editorial standards.',
};

export default function AboutPage() {
  return (
    <SectionLanding
      title="About TinyDogHub"
      description="Our mission is to be the most useful and trusted resource in the UK for Chihuahua, toy breed and puppy owners."
    >
      <div className="prose prose-charcoal dark:prose-invert max-w-none">
        <h2>Our Mission</h2>
        <p>
          TinyDogHub exists because tiny dog owners deserve better information.
          Not marketing dressed as advice. Not generic content repurposed from large-dog guides.
          Real, researched, practical guidance written by people who understand the unique needs of small dogs.
        </p>

        <h2>Editorial Standards</h2>
        <p>
          Every guide on this site is written or reviewed by experienced tiny dog owners and researchers.
          We cite sources, acknowledge uncertainty, and never recommend products unless we genuinely believe they help.
        </p>

        <h2>Commercial Transparency</h2>
        <p>
          Where we recommend products, they link to{' '}
          <a href="https://mychiandme.co.uk" target="_blank" rel="noopener noreferrer">My Chi and Me</a> or{' '}
          <a href="https://mypupandme.co.uk" target="_blank" rel="noopener noreferrer">My Pup and Me</a> — trusted UK retailers specialising in small dog products.
          These recommendations are editorial choices, not paid placements.
        </p>
      </div>
    </SectionLanding>
  );
}
