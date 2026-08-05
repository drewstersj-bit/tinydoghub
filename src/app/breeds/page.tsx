import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tiny Dog Breeds',
  description: 'Explore detailed profiles for Chihuahuas, Yorkies, Pomeranians and every tiny dog breed. Health, temperament, sizing and care information.',
};

export default function BreedsPage() {
  return (
    <SectionLanding
      title="Tiny Dog Breeds"
      description="Comprehensive guides for every toy and miniature breed. From temperament and health to sizing and daily care."
    />
  );
}
