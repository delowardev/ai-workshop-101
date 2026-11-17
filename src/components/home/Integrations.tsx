import Image from 'next/image';
import { integrations } from '@/content/site';
import { ButtonLink } from '@/components/ui/ButtonLink';

export function Integrations() {
  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap gap-4 px-6 pb-30">
      <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7 rounded-[28px] border border-line bg-white p-10 max-[480px]:p-6">
        <div className="flex flex-col gap-3">
          <h2 className="m-0 font-display text-4xl leading-[1.1] font-bold tracking-[-0.02em]">Plugs into your stack</h2>
          <p className="m-0 text-base leading-[1.55] text-ink-500">Sync customers and orders from the tools you already run.</p>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-2.5">
          {integrations.map((item) => (
            <a
              key={item.name}
              href="#"
              className="flex h-16 items-center gap-3 rounded-[14px] bg-paper px-4 text-[15px] font-semibold text-ink-900 no-underline hover:text-ink-900"
            >
              <Image src={item.logo} alt="" width={28} height={28} />
              {item.name}
            </a>
          ))}
          <a
            href="#"
            className="flex h-16 items-center justify-center gap-2 rounded-[14px] border-[1.5px] border-dashed border-ink-300 px-4 text-[15px] font-semibold text-ink-700 no-underline"
          >
            Jumpseller, API &amp; more
          </a>
        </div>
      </div>

      <div className="flex min-w-0 flex-[1_1_360px] flex-col justify-between gap-7 rounded-[28px] bg-ink-900 p-10 text-paper max-[480px]:p-6">
        <div className="flex flex-col gap-3">
          <span className="inline-flex h-7 items-center self-start rounded-full bg-brand-500 px-3 text-[13px] font-bold text-ink-900">
            New · MCP server
          </span>
          <h2 className="m-0 font-display text-4xl leading-[1.1] font-bold tracking-[-0.02em]">
            Run campaigns from your AI assistant
          </h2>
          <p className="m-0 text-base leading-[1.55] text-ink-200">Draft, segment and schedule by just asking. Free on every plan.</p>
        </div>
        <ButtonLink href="#" variant="outline-light" size="lg" className="self-start">
          Connect Sender MCP
        </ButtonLink>
      </div>
    </section>
  );
}
