import { ArrowRightIcon } from '@/components/ui/icons';

const sources = ['Mailchimp', 'ActiveCampaign', 'MailerLite', 'Brevo'];

export function Migration() {
  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-30">
      <div className="flex flex-wrap items-center gap-12 rounded-[32px] bg-brand-100 p-[clamp(32px,5vw,64px)]">
        <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-5">
          <span className="eyebrow text-brand-900">Migration</span>
          <h2 className="m-0 font-display text-[clamp(32px,4vw,48px)] leading-[1.05] font-bold tracking-[-0.02em]">
            Switch in 7 days. We do the moving.
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ink-700">
            A 100% free, done-for-you migration of lists, templates and automations. Included with annual plans of
            20k+ subscribers.
          </p>
          <a
            href="#"
            className="inline-flex h-11 items-center gap-2 self-start text-base font-semibold text-brand-900 no-underline"
          >
            See how migration works <ArrowRightIcon />
          </a>
        </div>
        <div className="grid min-w-0 flex-[1_1_320px] grid-cols-2 gap-3 max-[480px]:grid-cols-1">
          {sources.map((source) => (
            <a
              key={source}
              href="#"
              className="flex h-16 items-center justify-between rounded-2xl bg-white px-5 font-semibold text-ink-900 no-underline hover:text-ink-900"
            >
              {source}{' '}
              <span aria-hidden="true" className="text-brand-700">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
