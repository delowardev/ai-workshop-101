import Image from 'next/image';
import { integrations } from '@/content/site';
import { EmailSignup } from '@/components/ui/EmailSignup';
import { EditorMockup } from './EditorMockup';

export function Hero() {
  return (
    <section className="flex flex-col items-center px-6 pt-14 text-center">
      <div className="flex w-full max-w-[1100px] flex-col items-center gap-6">
        <a
          href="#"
          className="box-border inline-flex min-h-9 flex-wrap items-center justify-center gap-2.5 rounded-full border border-line bg-white px-1.5 py-1 text-sm text-ink-900 no-underline hover:text-ink-900"
        >
          <span className="inline-flex h-6 items-center rounded-full bg-ink-900 px-2.5 text-xs font-bold text-paper">New</span>
          Run campaigns from your AI assistant
          <span aria-hidden="true" className="pr-2 text-brand-700">
            →
          </span>
        </a>

        <h1 className="m-0 font-display text-[clamp(44px,8vw,112px)] leading-[0.92] font-extrabold tracking-[-0.04em]">
          Email marketing
          <br />
          without the <span className="text-brand-500">hassle.</span>
        </h1>

        <p className="m-0 max-w-[600px] text-xl leading-normal text-ink-700">
          Create, automate and send emails people want to read. Every premium feature included, free up to 2,500
          subscribers.
        </p>

        <EmailSignup id="hero-email" className="max-w-[520px]" />

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-sm text-ink-500">
          <span>No credit card needed · Works with</span>
          <span className="flex items-center gap-4">
            {integrations.map((item) => (
              <Image key={item.name} src={item.logo} alt={item.name} width={26} height={26} />
            ))}
          </span>
        </div>
      </div>

      <EditorMockup />
    </section>
  );
}
