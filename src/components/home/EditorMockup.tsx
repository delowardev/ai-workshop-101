import Image from 'next/image';
import shopify from '@/assets/logos/shopify.svg';

const blocks = ['Text', 'Image', 'Product', 'Button', 'Countdown', 'Social'];

/** Illustration of the email builder. Decorative: hidden from screen readers. */
export function EditorMockup() {
  return (
    <div
      aria-hidden="true"
      className="mt-14 box-border h-[420px] w-full max-w-[1120px] rounded-t-3xl bg-ink-900 px-3.5 pt-3.5 text-left"
    >
      <div className="grid h-full grid-cols-[220px_1fr_260px] overflow-hidden rounded-t-[14px] bg-white max-[900px]:grid-cols-1">
        {/* Blocks panel */}
        <div className="flex flex-col gap-2.5 border-r border-line p-5 max-[900px]:hidden">
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-500">BLOCKS</span>
          <div className="grid grid-cols-2 gap-2">
            {blocks.map((block) => (
              <div
                key={block}
                className={`flex h-16 items-center justify-center rounded-[10px] text-xs font-semibold ${
                  block === 'Product' ? 'bg-brand-100 outline-2 outline-brand-500' : 'bg-paper'
                }`}
              >
                {block}
              </div>
            ))}
          </div>
        </div>

        {/* Email canvas */}
        <div className="bg-sand px-[clamp(16px,4vw,56px)] pt-7">
          <div className="box-border flex h-full flex-col gap-3.5 rounded-t-xl bg-white p-6">
            <div className="box-border flex h-[150px] items-end rounded-[10px] bg-brand-300 p-[18px]">
              <span className="font-display text-[34px] leading-none font-extrabold">The warm edit is here</span>
            </div>
            <span className="text-[15px] font-semibold">
              Hi{' '}
              <span className="inline-flex rounded bg-ink-100 px-1.5 font-mono text-xs leading-5">first_name</span>,
              fresh picks for sweater weather.
            </span>
            <div className="grid grid-cols-3 gap-2.5">
              <div className="h-[90px] rounded-lg bg-paper" />
              <div className="h-[90px] rounded-lg bg-paper outline-2 outline-offset-2 outline-brand-500 outline-dashed" />
              <div className="h-[90px] rounded-lg bg-paper" />
            </div>
          </div>
        </div>

        {/* Properties panel */}
        <div className="flex flex-col gap-3.5 border-l border-line p-5 max-[900px]:hidden">
          <span className="font-mono text-[11px] tracking-[0.06em] text-ink-500">PRODUCT BLOCK</span>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold">Source</span>
            <div className="flex h-[38px] items-center gap-2 rounded-lg border-[1.5px] border-ink-300 px-2.5 text-[13px]">
              <Image src={shopify} alt="" width={16} height={16} />
              Shopify store
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold">Columns</span>
            <div className="flex gap-1.5">
              {['2', '3', '4'].map((n) => (
                <span
                  key={n}
                  className={`flex h-[34px] flex-1 items-center justify-center rounded-lg text-[13px] ${
                    n === '3' ? 'bg-ink-900 text-paper' : 'bg-paper'
                  }`}
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold">Show</span>
            {['Price', 'Buy button'].map((option) => (
              <span key={option} className="flex items-center gap-2 text-[13px]">
                <span className="size-4 rounded bg-ink-900" />
                {option}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
