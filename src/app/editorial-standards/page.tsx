import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Standards',
  description: 'How Tiny Dog Hub researches information, verifies listings and handles corrections.',
};

export default function EditorialStandardsPage() {
  return (
    <SectionLanding
      title="Editorial Standards"
      description="How we research, write and maintain the information on Tiny Dog Hub."
    >
      <div className="prose prose-charcoal dark:prose-invert max-w-none">
        <h2>How Information is Researched</h2>
        <p>
          Every breed guide, health article and care recommendation on Tiny Dog Hub is researched
          using veterinary sources, breed club standards and published studies where available.
          We cross-reference multiple sources and clearly state when information is based on
          owner experience rather than clinical evidence.
        </p>

        <h2>How Listings are Verified</h2>
        <p>
          Dog-friendly places, walks and venues listed on Tiny Dog Hub are checked before
          publication. We verify that venues actively welcome dogs and note any restrictions
          (such as size limits or lead requirements). Listings are reviewed periodically and
          updated when we receive new information.
        </p>

        <h2>How Corrections are Handled</h2>
        <p>
          If you spot an error — factual, typographical or otherwise — please let us know
          via our <a href="/corrections">corrections page</a>. We aim to investigate and
          correct confirmed errors within 48 hours. Significant corrections are noted at
          the top of the affected article.
        </p>

        <h2>Medical Disclaimer</h2>
        <p>
          Tiny Dog Hub provides educational information only. Nothing on this site constitutes
          veterinary advice. Always consult a qualified veterinarian for health concerns about
          your dog. We do not diagnose, treat or prescribe.
        </p>
      </div>
    </SectionLanding>
  );
}
