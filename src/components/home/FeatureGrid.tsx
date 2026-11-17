import type { ReactNode } from 'react';

type CardProps = {
  title: string;
  body: string;
  illustration: ReactNode;
  tone?: 'light' | 'dark';
};

function FeatureCard({ title, body, illustration, tone = 'light' }: CardProps) {
  const dark = tone === 'dark';
  return (
    <article
      className={`flex min-h-[300px] flex-col justify-between gap-6 rounded-3xl p-8 ${
        dark ? 'bg-ink-900 text-paper' : 'border border-line bg-white'
      }`}
    >
      <div aria-hidden="true">{illustration}</div>
      <div className="flex flex-col gap-2.5">
        <h3 className="m-0 font-display text-[26px] leading-[1.15] font-semibold">{title}</h3>
        <p className={`m-0 text-base leading-[1.55] ${dark ? 'text-ink-200' : 'text-ink-700'}`}>{body}</p>
      </div>
    </article>
  );
}

function BuilderIllustration() {
  return (
    <div className="box-border flex h-[200px] gap-3.5 rounded-2xl bg-white p-3.5 shadow-[0_16px_40px_-16px_rgb(10_8_59/0.35)]">
      <div className="grid flex-[0_0_120px] auto-rows-[40px] grid-cols-2 gap-1.5">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="rounded-lg bg-paper" />
        ))}
      </div>
      <div className="relative flex min-w-0 flex-1 flex-col gap-2 rounded-[10px] bg-sand px-[10%] py-3">
        <div className="h-[54px] rounded-lg bg-brand-300" />
        <div className="h-2 w-4/5 rounded bg-ink-200" />
        <div className="h-2 w-3/5 rounded bg-ink-200" />
        <div className="flex h-10 items-center justify-center rounded-lg border-2 border-dashed border-brand-500 bg-brand-50 font-mono text-[11px] text-brand-700">
          Drop block here
        </div>
        <div className="absolute top-[104px] left-[36%] flex h-10 w-[92px] -rotate-4 items-center justify-center rounded-lg bg-ink-900 text-xs font-semibold text-paper shadow-[0_10px_20px_-6px_rgb(10_8_59/0.5)]">
          Product
        </div>
      </div>
    </div>
  );
}

function AutomationIllustration() {
  const box = 'rounded-[10px] border border-line bg-white px-3.5 py-2';
  const line = <div className="h-3.5 w-0.5 bg-ink-300" />;
  return (
    <div className="flex h-[180px] flex-col items-center justify-center rounded-2xl bg-paper text-xs font-semibold">
      <div className="rounded-[10px] bg-brand-500 px-3.5 py-2 text-ink-900">Joins list</div>
      {line}
      <div className={box}>Wait 1 day</div>
      {line}
      <div className="flex gap-2.5">
        <div className={box}>Welcome</div>
        <div className="rounded-[10px] bg-ink-900 px-3 py-2 text-paper">Tag: new</div>
      </div>
    </div>
  );
}

function SegmentIllustration() {
  const rule = 'flex items-center gap-1.5 rounded-lg border border-line bg-white px-2.5 py-2';
  return (
    <div className="box-border flex h-[180px] flex-col gap-2 rounded-2xl bg-paper p-4 text-xs">
      <div className={rule}>
        <strong>Purchased</strong>
        <span className="text-ink-500">in last 30 days</span>
      </div>
      <span className="self-start rounded-full bg-ink-900 px-2 py-0.5 font-mono text-[10px] text-paper">AND</span>
      <div className={rule}>
        <strong>Opened</strong>
        <span className="text-ink-500">any campaign</span>
      </div>
      <div className="mt-auto flex items-center gap-2">
        <div className="h-2 flex-1 overflow-hidden rounded bg-line">
          <div className="h-full w-[38%] bg-brand-500" />
        </div>
        <span className="font-mono text-[11px] text-ink-500">Segment: VIP</span>
      </div>
    </div>
  );
}

function PopupIllustration() {
  return (
    <div className="flex h-[180px] flex-col overflow-hidden rounded-2xl border border-line bg-paper">
      <div className="flex h-6 flex-none items-center gap-[5px] bg-sand px-2.5">
        {[0, 1, 2].map((i) => (
          <span key={i} className="size-[7px] rounded bg-ink-300" />
        ))}
      </div>
      <div className="relative flex flex-1 flex-col gap-1.5 p-3">
        <div className="h-2 w-1/2 rounded bg-line" />
        <div className="h-2 w-[70%] rounded bg-line" />
        <div className="absolute inset-0 bg-[rgb(10_8_59/0.35)]" />
        <div className="absolute top-1/2 left-1/2 flex w-[70%] -translate-1/2 flex-col gap-2 rounded-xl bg-white p-3 shadow-[0_12px_24px_-8px_rgb(10_8_59/0.4)]">
          <strong className="font-display text-[15px]">Get 10% off</strong>
          <div className="flex gap-1.5">
            <div className="h-[26px] flex-1 rounded-md border border-ink-300" />
            <div className="h-[26px] w-[54px] rounded-md bg-brand-500" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SmsIllustration() {
  const bubble = 'max-w-[90%] self-start rounded-[12px_12px_12px_4px] px-2.5 py-2 text-[11px] leading-[1.35]';
  return (
    <div className="flex h-[180px] items-end justify-center overflow-hidden rounded-2xl bg-ink-800">
      <div className="box-border flex h-40 w-[150px] flex-col gap-2 rounded-t-[22px] border-6 border-b-0 border-ink-700 bg-paper px-2.5 py-3.5">
        <div className={`${bubble} bg-white text-ink-900`}>Your order shipped! Track it here.</div>
        <div className={`${bubble} bg-brand-500 font-semibold text-ink-900`}>24h only: 10% off with WARM10</div>
      </div>
    </div>
  );
}

export function FeatureGrid() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-col gap-12 px-6 pt-30 pb-24">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <h2 className="heading-section m-0 max-w-[640px]">
          Everything you need to grow a list. Nothing you’ll pay extra for.
        </h2>
        <p className="m-0 max-w-[380px] text-[17px] leading-[1.55] text-ink-500">
          Premium features come standard. No hidden costs, no feature gates, no usage traps.
        </p>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        <article className="col-span-2 flex min-h-[300px] flex-col justify-between gap-6 rounded-3xl bg-brand-500 p-8 text-ink-900 max-[700px]:col-span-1">
          <div aria-hidden="true">
            <BuilderIllustration />
          </div>
          <div className="flex max-w-[460px] flex-col gap-2.5">
            <h3 className="m-0 font-display text-[32px] leading-[1.1] font-bold">Drag-and-drop email builder</h3>
            <p className="m-0 text-[17px] leading-[1.55]">
              Start from a free, responsive template or a blank canvas. Product blocks, countdowns and
              personalization, no code.
            </p>
          </div>
        </article>
        <FeatureCard
          title="Unlimited automation"
          body="Welcome series, abandoned carts, win-backs. Use a premade workflow or build your own."
          illustration={<AutomationIllustration />}
        />
        <FeatureCard
          title="Smart segmentation"
          body="Group subscribers by behaviour, purchases or any field, and send to exactly the right people."
          illustration={<SegmentIllustration />}
        />
        <FeatureCard
          title="Popups and forms"
          body="Capture leads on any site with free popups, embedded forms and landing pages."
          illustration={<PopupIllustration />}
        />
        <FeatureCard
          title="SMS and transactional"
          body="Text messages and order emails from the same place as your campaigns."
          illustration={<SmsIllustration />}
          tone="dark"
        />
      </div>
    </section>
  );
}
