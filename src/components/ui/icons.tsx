// Inline stroke icons. Decorative, so hidden from screen readers.

export function CheckIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12l5 5L20 7" />
    </svg>
  );
}

export function ArrowRightIcon({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
