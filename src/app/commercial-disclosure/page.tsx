import { SectionLanding } from '@/components/shared/SectionLanding';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Commercial Disclosure',
  description: 'Transparency about the relationship between Tiny Dog Hub and My Chi and Me.',
};

export default function CommercialDisclosurePage() {
  return (
    <SectionLanding
      title="Commercial Disclosure"
      description="Full transparency about who we are and how this site connects to our sister shop."
    >
      <div className="prose prose-charcoal dark:prose-invert max-w-none">
        <h2>Our Relationship with My Chi and Me</h2>
        <p>
          Tiny Dog Hub is created and maintained by the same team behind{' '}
          <a href="https://mychiandme.co.uk" target="_blank" rel="noopener noreferrer">My Chi and Me</a>,
          a UK-based online shop specialising in harnesses, leads and accessories for small dogs.
        </p>

        <h2>How This Affects Content</h2>
        <p>
          Where we link to products on My Chi and Me, those links are clearly labelled as
          coming from our sister shop. We do not accept paid placements, sponsored posts or
          display advertising from third parties.
        </p>
        <p>
          Editorial decisions — which breeds to cover, which places to list, what advice to
          give — are made independently of commercial considerations. If we recommend a product,
          it is because we genuinely believe it helps small dog owners.
        </p>

        <h2>Affiliate Links</h2>
        <p>
          At present, Tiny Dog Hub does not use third-party affiliate links. All product links
          point to My Chi and Me. If this changes in future, we will update this page and
          clearly mark any affiliate links.
        </p>

        <h2>Questions</h2>
        <p>
          If you have questions about our commercial relationships, please{' '}
          <a href="/contact">get in touch</a>.
        </p>
      </div>
    </SectionLanding>
  );
}
