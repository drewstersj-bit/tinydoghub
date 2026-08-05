import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Breed Database',
  description: 'Search and filter the complete tiny dog breed database. Compare sizes, temperaments and care requirements across all toy breeds.',
};

export default function BreedDatabasePage() {
  return (
    <SectionLanding
      title="Breed Database"
      description="Search, compare and filter every tiny dog breed. Find the perfect match based on size, temperament, exercise needs and living situation."
    />
  );
}
