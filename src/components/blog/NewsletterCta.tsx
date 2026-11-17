import { EmailSignup } from '@/components/ui/EmailSignup';

/** Weekly newsletter signup in a dark band. The page's one orange button lives here. */
export function NewsletterCta() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-24">
      <div className="flex flex-wrap items-center justify-between gap-8 rounded-[32px] bg-ink-900 p-[clamp(32px,5vw,56px)] text-paper max-[600px]:p-6">
        <div className="flex flex-[1_1_400px] flex-col gap-3">
          <h2 className="m-0 font-display text-[clamp(30px,3.5vw,44px)] leading-[1.05] font-bold tracking-[-0.02em]">
            One email a week. All signal.
          </h2>
          <p className="m-0 text-[17px] leading-[1.55] text-ink-200">New guides and templates in your inbox every Thursday.</p>
        </div>
        <EmailSignup id="newsletter-email" variant="plain" buttonLabel="Subscribe" className="max-w-[460px] flex-[1_1_380px] pt-8" />
      </div>
    </section>
  );
}
