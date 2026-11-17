import { Fragment } from 'react';
import { ButtonLink } from '@/components/ui/ButtonLink';

const steps = [
  { kind: 'TRIGGER', label: 'Added to “Newsletter”', style: 'bg-brand-500 text-ink-900', kindStyle: '' },
  { kind: 'DELAY', label: 'Wait 1 day', style: 'border border-ink-700 bg-ink-800', kindStyle: 'text-ink-300' },
  { kind: 'EMAIL', label: 'Welcome + 10% code', style: 'border border-ink-700 bg-ink-800', kindStyle: 'text-ink-300' },
  { kind: 'IF', label: 'Opened → tag “Engaged”', style: 'bg-paper text-ink-900', kindStyle: 'text-ink-500' },
];

export function Automation() {
  return (
    <section className="bg-ink-900 text-paper">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-16 px-6 py-28">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
          <span className="eyebrow text-brand-300">Automation</span>
          <h2 className="heading-section m-0">Set it up once. It keeps sending.</h2>
          <p className="m-0 max-w-[460px] text-lg leading-[1.6] text-ink-200">
            Triggers, delays, conditions and tags on one visual canvas. Pick a premade workflow and edit it, or start
            blank.
          </p>
          <ButtonLink href="#" variant="outline-light" size="lg" className="self-start">
            Explore automation
          </ButtonLink>
        </div>

        <ol aria-label="Example workflow" className="m-0 flex min-w-0 flex-[1_1_420px] list-none flex-col items-center p-0">
          {steps.map((step, i) => (
            <Fragment key={step.kind}>
              {i > 0 && <li aria-hidden="true" className="h-8 w-0.5 bg-ink-500" />}
              <li className={`box-border flex w-full max-w-[360px] items-center gap-3.5 rounded-2xl px-5 py-[18px] ${step.style}`}>
                <span className={`font-mono text-[11px] font-medium tracking-[0.06em] ${step.kindStyle}`}>{step.kind}</span>
                <strong className="text-base">{step.label}</strong>
              </li>
            </Fragment>
          ))}
        </ol>
      </div>
    </section>
  );
}
