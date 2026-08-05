import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the TinyDogHub community. Connect with other tiny dog owners across the UK.',
};

export default function CommunityPage() {
  return (
    <SectionLanding
      title="Community"
      description="Connect with other tiny dog owners across the UK. Share experiences, ask questions and find local meet-ups."
    />
  );
}
