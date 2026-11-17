import type { ReactNode } from 'react';

const variants = {
  primary: 'bg-brand-500 text-ink-900 font-bold hover:bg-brand-600 hover:text-ink-900',
  dark: 'bg-ink-900 text-paper font-semibold hover:bg-ink-800 hover:text-paper',
  outline: 'border-[1.5px] border-ink-900 text-ink-900 font-semibold hover:bg-ink-900 hover:text-paper',
  'outline-light': 'border-[1.5px] border-paper text-paper font-semibold hover:bg-paper hover:text-ink-900',
  ghost: 'text-ink-900 font-semibold hover:text-brand-700',
};

const sizes = {
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-[52px] px-6 text-base',
  xl: 'h-14 px-7 text-[17px]',
};

type Props = {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

/** A link styled as a pill button. One primary (orange) button per view. */
export function ButtonLink({ href, children, variant = 'primary', size = 'md', className = '' }: Props) {
  return (
    <a
      href={href}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full no-underline transition-colors ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </a>
  );
}
