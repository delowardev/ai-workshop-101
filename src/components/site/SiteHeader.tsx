import Image from 'next/image';
import logo from '@/assets/sender-logo.svg';
import { mainNav } from '@/content/site';
import { ButtonLink } from '@/components/ui/ButtonLink';

export function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-5">
      <a href="#" aria-label="Sender home" className="flex">
        <Image src={logo} alt="Sender" width={136} height={40} priority />
      </a>
      <nav aria-label="Main" className="hidden gap-8 text-[15px] font-medium min-[860px]:flex">
        {mainNav.map((item) => (
          <a key={item.label} href={item.href} className="text-ink-900 no-underline hover:text-brand-700">
            {item.label}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-2">
        <ButtonLink href="#" variant="ghost" size="md" className="px-4 max-[480px]:hidden">
          Log in
        </ButtonLink>
        <ButtonLink href="#" variant="dark" size="md">
          Start free
        </ButtonLink>
      </div>
    </header>
  );
}
