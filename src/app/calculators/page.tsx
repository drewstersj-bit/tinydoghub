import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dog Calculators',
  description: 'Free calculators for tiny dog owners. Food portions, dog age, weight conversion and more.',
};

export default function CalculatorsPage() {
  return (
    <SectionLanding
      title="Calculators"
      description="Quick calculations for feeding, weight, age and more — tailored for small dogs and toy breeds."
    />
  );
}
