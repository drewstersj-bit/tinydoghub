import Link from 'next/link';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Connect with other tiny dog owners across the UK. Share experiences, find local groups and get involved with Tiny Dog Hub.',
};

export default function CommunityPage() {
  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-12">
        <div className="max-w-3xl">
          <h1 className="text-3xl lg:text-4xl font-heading font-bold">
            The Tiny Dog Community
          </h1>
          <p className="mt-4 text-lg text-ink-muted">
            Tiny Dog Hub is growing into more than a resource — it&apos;s a community of people who understand that small dogs have big personalities and unique needs.
          </p>
        </div>

        {/* Ways to get involved */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
            <span className="text-3xl block mb-3" aria-hidden="true">📍</span>
            <h2 className="font-heading font-bold text-lg">Submit a Walk</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Know a great tiny-dog-friendly walk? Help other small dog owners discover it by sharing the route with us.
            </p>
            <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-plum hover:underline">
              Suggest a walk →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
            <span className="text-3xl block mb-3" aria-hidden="true">☕</span>
            <h2 className="font-heading font-bold text-lg">Recommend a Place</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Found a café or pub that genuinely welcomes tiny dogs? Let us know and we&apos;ll check it out.
            </p>
            <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-plum hover:underline">
              Suggest a venue →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
            <span className="text-3xl block mb-3" aria-hidden="true">✏️</span>
            <h2 className="font-heading font-bold text-lg">Report a Correction</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Spotted something wrong? Venue closed? Walk conditions changed? Help us keep everything accurate.
            </p>
            <Link href="/corrections" className="mt-4 inline-block text-sm font-medium text-plum hover:underline">
              Report a correction →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
            <span className="text-3xl block mb-3" aria-hidden="true">📸</span>
            <h2 className="font-heading font-bold text-lg">Share Your Photos</h2>
            <p className="mt-2 text-sm text-ink-muted">
              We&apos;d love to feature real tiny dogs on the site. Send us your best walking, café and adventure photos.
            </p>
            <Link href="/contact" className="mt-4 inline-block text-sm font-medium text-plum hover:underline">
              Send photos →
            </Link>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
            <span className="text-3xl block mb-3" aria-hidden="true">🐾</span>
            <h2 className="font-heading font-bold text-lg">Follow Along</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Follow us for tiny dog tips, new walk discoveries and behind-the-scenes from the team.
            </p>
            <p className="mt-4 text-sm text-grey-500">Social links coming soon</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-grey-200 shadow-card">
            <span className="text-3xl block mb-3" aria-hidden="true">💌</span>
            <h2 className="font-heading font-bold text-lg">Join the Newsletter</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Weekly tips, new guides and walk discoveries straight to your inbox. No spam, ever.
            </p>
            <p className="mt-4 text-sm text-grey-500">Newsletter launching soon</p>
          </div>
        </div>

        {/* Coming soon */}
        <div className="mt-16 p-8 rounded-2xl bg-plum/5 border border-plum/10 text-center">
          <h2 className="font-heading font-bold text-xl text-plum mb-3">What&apos;s coming next</h2>
          <p className="text-ink-muted max-w-lg mx-auto mb-6">
            We&apos;re building more ways for tiny dog owners to connect, share and help each other. Here&apos;s what we&apos;re working on:
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto text-left">
            <div className="flex items-start gap-2">
              <span className="text-coral mt-0.5">◦</span>
              <span className="text-sm text-ink-muted">Community walk meetups</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-coral mt-0.5">◦</span>
              <span className="text-sm text-ink-muted">User walk reviews</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-coral mt-0.5">◦</span>
              <span className="text-sm text-ink-muted">Venue rating system</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-coral mt-0.5">◦</span>
              <span className="text-sm text-ink-muted">Tiny dog photo gallery</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-coral mt-0.5">◦</span>
              <span className="text-sm text-ink-muted">Local tiny dog groups</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-coral mt-0.5">◦</span>
              <span className="text-sm text-ink-muted">Ask a question forum</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-ink-muted mb-4">Want to help shape what comes next?</p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-plum text-white font-medium hover:bg-plum/90 transition-colors">
            Get in touch
          </Link>
        </div>
      </div>
    </>
  );
}
