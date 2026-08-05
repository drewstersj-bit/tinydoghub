import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Name Database',
  description: 'Browse thousands of names for Chihuahuas, toy breeds and puppies. Filter by gender, origin and style.',
};

export default function DogNamesPage() {
  return (
    <SectionLanding
      title="Dog Name Database"
      description="Find the perfect name for your tiny dog. Browse by gender, origin, meaning and popularity."
    />
  );
}
