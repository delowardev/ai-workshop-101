import Image from 'next/image';
import Link from 'next/link';
import logoWhite from '@/assets/sender-logo-white.svg';
import { footerColumns } from '@/content/site';

export function SiteFooter() {
  return (
    <footer className="bg-ink-900 text-ink-200">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-14 px-6 pt-[72px] pb-10">
        <div className="flex flex-wrap justify-between gap-12">
          <div className="flex max-w-[320px] flex-[1_1_260px] flex-col gap-4">
            <Image src={logoWhite} alt="Sender" width={136} height={40} />
            <p className="m-0 text-[15px] leading-[1.55]">
              Email and SMS marketing for businesses that would rather be running their business.
            </p>
          </div>
          <div className="grid flex-[2_1_520px] grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-8 text-[15px]">
            {footerColumns.map((column) => (
              <div key={column.title} className="flex flex-col gap-3">
                <h2 className="m-0 font-sans text-sm font-bold text-paper">{column.title}</h2>
                {column.links.map((link) => (
                  <Link key={link.label} href={link.href} className="text-ink-200 no-underline hover:text-paper">
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-ink-700 pt-6 text-[13px] text-ink-300">
          <span>Redesign concept · Phase 1 draft</span>
          <span>Privacy · Terms · Anti-spam policy</span>
        </div>
      </div>
    </footer>
  );
}
