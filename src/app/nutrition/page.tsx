import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tiny Dog Nutrition',
  description: 'Feeding guides and nutrition advice for Chihuahuas, toy breeds and puppies. Portions, schedules and food choices.',
};

export default function NutritionPage() {
  return (
    <SectionLanding
      title="Nutrition Guides"
      description="Feeding guidance tailored to tiny dogs. Portion control, meal schedules, food selection and dietary needs at every life stage."
    />
  );
}
