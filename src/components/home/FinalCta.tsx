import { EmailSignup } from '@/components/ui/EmailSignup';

export function FinalCta() {
  return (
    <section className="bg-brand-500 text-ink-900">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-7 px-6 py-28 text-center">
        <h2 className="m-0 max-w-[900px] font-display text-[clamp(44px,6.5vw,88px)] leading-[0.95] font-extrabold tracking-[-0.035em]">
          Your next send starts here.
        </h2>
        <p className="m-0 max-w-[520px] text-[19px] leading-normal">
          Join 180,000+ businesses. Free up to 2,500 subscribers, no credit card needed.
        </p>
        <EmailSignup id="cta-email" variant="plain" buttonClassName="bg-ink-900 text-paper" className="max-w-[480px]" />
      </div>
    </section>
  );
}
