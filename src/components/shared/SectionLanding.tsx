import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface SectionLandingProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export function SectionLanding({ title, description, children }: SectionLandingProps) {
  return (
    <>
      <Breadcrumbs />
      <div className="container-wide py-section-sm">
        <header className="max-w-3xl">
          <h1 className="text-h1 font-heading font-bold text-charcoal dark:text-dark-text">
            {title}
          </h1>
          <p className="mt-4 text-body-lg text-charcoal/70 dark:text-dark-muted">
            {description}
          </p>
        </header>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </>
  );
}
