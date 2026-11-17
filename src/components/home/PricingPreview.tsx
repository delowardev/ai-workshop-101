import { ButtonLink } from '@/components/ui/ButtonLink';
import { CheckIcon } from '@/components/ui/icons';

const freeFeatures = ['Up to 2,500 subscribers', '15,000 emails a month', 'Automation, segmentation, popups and forms'];

const paidPlans = [
  { name: 'Standard', detail: 'Up to 30,000 emails · no Sender branding', price: '$7', popular: false },
  { name: 'Professional', detail: 'Unlimited emails · priority support', price: '$15', popular: true },
];

export function PricingPreview() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 py-30">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="eyebrow text-brand-700">Pricing</span>
        <h2 className="heading-section m-0 max-w-[720px]">Free to start. Fair as you grow.</h2>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-4">
        <article data-testid="plan-free" className="flex flex-col gap-6 rounded-[28px] border-2 border-ink-900 bg-white p-10 max-[480px]:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 font-display text-[28px] font-bold">Free Forever</h3>
            <span className="inline-flex h-7 items-center rounded-full bg-brand-100 px-3 text-[13px] font-semibold text-brand-900">
              No card needed
            </span>
          </div>
          <p className="m-0 flex items-baseline gap-2">
            <span className="font-display text-7xl leading-none font-extrabold">$0</span>
            <span className="text-base text-ink-500">/ month, forever</span>
          </p>
          <ul className="m-0 flex list-none flex-col gap-3 p-0 text-base">
            {freeFeatures.map((feature) => (
              <li key={feature} className="flex gap-2.5">
                <CheckIcon className="flex-none text-success" />
                {feature}
              </li>
            ))}
          </ul>
          <ButtonLink href="#" variant="primary" size="xl">
            Start with free plan
          </ButtonLink>
        </article>

        <article data-testid="plan-paid" className="flex flex-col gap-6 rounded-[28px] bg-sand p-10 max-[480px]:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="m-0 font-display text-[28px] font-bold">Paid plans</h3>
            <span className="text-sm text-ink-500">Billed annually · 10% off</span>
          </div>
          <ul className="m-0 flex list-none flex-col overflow-hidden rounded-[18px] bg-white p-0">
            {paidPlans.map((plan, i) => (
              <li
                key={plan.name}
                className={`flex flex-wrap items-center justify-between gap-4 px-6 py-5 ${i > 0 ? 'border-t border-line' : ''}`}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <strong className="text-lg">{plan.name}</strong>
                    {plan.popular && (
                      <span className="inline-flex h-[22px] items-center rounded-full bg-ink-900 px-2 text-[11px] font-bold text-paper">
                        Popular
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-ink-500">{plan.detail}</span>
                </div>
                <p className="m-0 flex items-baseline gap-1 whitespace-nowrap">
                  <span className="text-[13px] text-ink-500">from</span>
                  <span className="font-display text-[40px] leading-none font-extrabold">{plan.price}</span>
                  <span className="text-sm text-ink-500">/mo</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="m-0 text-base leading-[1.6] text-ink-700">
            Price scales with your list, not your features. Enterprise plans for 100k+ subscribers.
          </p>
          <ButtonLink href="#" variant="dark" size="xl" className="mt-auto">
            Compare plans
          </ButtonLink>
        </article>
      </div>
    </section>
  );
}
