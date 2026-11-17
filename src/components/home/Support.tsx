const stats = [
  { value: '24/7', label: 'live support' },
  { value: '10s', label: 'average first reply' },
  { value: '99%', label: 'satisfaction rate' },
];

export function Support() {
  return (
    <section className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-12 px-6 py-28">
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-4">
          <span className="eyebrow text-brand-700">Support</span>
          <h2 className="heading-section m-0">Real humans, around the clock.</h2>
          <p className="m-0 max-w-[460px] text-[17px] leading-[1.6] text-ink-500">
            24/7 live chat and email on every plan, including free.
          </p>
        </div>
        <dl className="m-0 grid min-w-0 flex-[1_1_480px] grid-cols-3 gap-6 max-[480px]:grid-cols-1">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse gap-1.5 border-t-3 border-brand-500 pt-5">
              <dt className="text-sm text-ink-500">{stat.label}</dt>
              <dd className="m-0 font-display text-[clamp(40px,5vw,64px)] leading-none font-extrabold">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
