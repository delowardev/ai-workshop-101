import type { PostIllustration as Kind } from '@/content/blog';

// Decorative cover art for post cards, drawn with CSS shapes.

function Flow() {
  return (
    <div className="flex h-full items-center justify-center gap-2.5 bg-ink-900">
      <span className="size-14 rounded-[14px] bg-brand-500" />
      <span className="h-0.5 w-8 bg-ink-500" />
      <span className="box-border size-14 rounded-[14px] border-2 border-ink-500" />
      <span className="h-0.5 w-8 bg-ink-500" />
      <span className="size-14 rounded-full bg-paper" />
    </div>
  );
}

function Cart() {
  return (
    <div className="flex h-full items-center justify-center bg-brand-100">
      <div className="relative h-[120px] w-[150px] -rotate-6 rounded-[6px_6px_18px_18px] bg-brand-500">
        <span className="absolute inset-x-[30px] -top-7 h-10 rounded-t-[30px] border-[6px] border-b-0 border-ink-900" />
      </div>
    </div>
  );
}

function AuthRecords() {
  return (
    <div className="flex h-full items-center justify-center gap-3 bg-sand font-mono text-xl font-medium max-[380px]:text-base">
      <span className="rounded-xl border-2 border-ink-900 bg-white px-4 py-3.5">SPF</span>
      <span className="rounded-xl bg-ink-900 px-4 py-3.5 text-paper">DKIM</span>
      <span className="rounded-xl bg-brand-500 px-4 py-3.5">DMARC</span>
    </div>
  );
}

function List() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 bg-brand-500">
      <span className="h-[22px] w-[180px] rounded-[11px] bg-white" />
      <span className="h-[22px] w-[180px] rounded-[11px] bg-white" />
      <span className="h-[22px] w-[180px] rounded-[11px] bg-white opacity-35" />
      <span className="h-[22px] w-[180px] rounded-[11px] bg-white" />
    </div>
  );
}

function Popup() {
  return (
    <div className="flex h-full items-center justify-center bg-ink-900">
      <div className="flex w-[200px] flex-col gap-2.5 rounded-[14px] bg-paper p-[18px]">
        <span className="h-3 w-[70%] rounded-md bg-ink-900" />
        <span className="h-7 rounded-md border-[1.5px] border-ink-300" />
        <span className="h-7 rounded-full bg-brand-500" />
      </div>
    </div>
  );
}

function Segments() {
  return (
    <div className="flex h-full items-center justify-center bg-brand-100">
      <div className="relative h-[140px] w-[200px]">
        <span className="absolute top-0 left-0 size-[120px] rounded-full bg-brand-500 opacity-90" />
        <span className="absolute right-0 bottom-0 size-[120px] rounded-full bg-ink-900 opacity-85" />
      </div>
    </div>
  );
}

const illustrations: Record<Kind, () => React.JSX.Element> = {
  flow: Flow,
  cart: Cart,
  'auth-records': AuthRecords,
  list: List,
  popup: Popup,
  segments: Segments,
};

export function PostIllustration({ kind }: { kind: Kind }) {
  const Illustration = illustrations[kind];
  return (
    <div aria-hidden="true" className="h-[220px] overflow-hidden rounded-[20px]">
      <Illustration />
    </div>
  );
}
