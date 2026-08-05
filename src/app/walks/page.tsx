import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Walks for Small Dogs',
  description: 'Discover small-dog-friendly walking routes across the UK. Interactive maps, difficulty ratings and local tips.',
};

export default function WalksPage() {
  return (
    <SectionLanding
      title="Dog Walks"
      description="Discover walking routes suitable for tiny dogs and puppies across the UK. Interactive maps, difficulty ratings and practical tips."
    />
  );
}
