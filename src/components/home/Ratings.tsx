const ratings = [
  { score: '4.8', source: 'Shopify' },
  { score: '4.8', source: 'WordPress' },
  { score: '4.7', source: 'Capterra' },
  { score: '4.7', source: 'G2' },
];

export function Ratings() {
  return (
    <section aria-label="Ratings" className="border-y border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-x-12 gap-y-6 px-6 py-8">
        <p className="m-0 max-w-[320px] font-display text-[22px] leading-[1.25] font-semibold">
          Trusted by <span className="text-brand-700">180,000+</span> businesses worldwide
        </p>
        <dl className="m-0 flex flex-wrap gap-x-10 gap-y-4">
          {ratings.map((r) => (
            <div key={r.source} className="flex flex-col-reverse gap-0.5">
              <dt className="text-[13px] text-ink-500">{r.source}</dt>
              <dd className="m-0 font-mono text-2xl font-medium">
                {r.score}
                <span className="text-sm text-ink-500">/5</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
