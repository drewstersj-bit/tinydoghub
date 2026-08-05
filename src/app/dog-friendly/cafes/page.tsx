import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Friendly Cafes',
  description: 'Find cafes, restaurants and pubs across the UK that welcome small dogs. Curated reviews and practical information.',
};

export default function DogFriendlyCafesPage() {
  return (
    <SectionLanding
      title="Dog Friendly Cafes"
      description="Curated cafes, restaurants and pubs across the UK that genuinely welcome small dogs. Honest reviews and practical details."
    />
  );
}
