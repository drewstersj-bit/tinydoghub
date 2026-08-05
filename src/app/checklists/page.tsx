import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checklists for Tiny Dog Owners',
  description: 'Practical checklists for new puppy owners, travel, grooming and seasonal care. Download and print.',
};

export default function ChecklistsPage() {
  return (
    <SectionLanding
      title="Checklists"
      description="Practical, printable checklists for every stage of tiny dog ownership. New puppy, travel prep, grooming routines and seasonal care."
    />
  );
}
