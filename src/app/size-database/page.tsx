import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Database',
  description: 'Average measurements for every tiny dog breed at every age. Chest, neck, weight and height data with interactive charts.',
};

export default function SizeDatabasePage() {
  return (
    <SectionLanding
      title="Size Database"
      description="Average measurements for every tiny dog breed at every life stage. Weight, height, chest and neck — with interactive charts and printable guides."
    />
  );
}
