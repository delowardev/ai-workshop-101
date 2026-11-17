'use client';

import { useState, type FormEvent } from 'react';

type Props = {
  id: string;
  /** "outlined" for light backgrounds, "plain" on colored ones */
  variant?: 'outlined' | 'plain';
  buttonClassName?: string;
  className?: string;
};

/**
 * Email capture form. This is a static concept site, so nothing is sent:
 * submitting only shows a confirmation message.
 */
export function EmailSignup({ id, variant = 'outlined', buttonClassName = 'bg-brand-500 text-ink-900', className = '' }: Props) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (event.currentTarget.checkValidity()) setSubmitted(true);
  }

  return (
    <div className={`flex w-full flex-col items-center gap-3 ${className}`}>
      <form
        onSubmit={handleSubmit}
        data-testid={`${id}-form`}
        className={`box-border flex w-full gap-2 rounded-full bg-white p-1.5 ${variant === 'outlined' ? 'border-[1.5px] border-ink-900' : ''}`}
      >
        <label htmlFor={id} className="sr-only">
          Your email
        </label>
        <input
          id={id}
          type="email"
          required
          placeholder="you@company.com"
          className="h-[52px] min-w-0 flex-1 border-0 bg-transparent px-[18px] text-base text-ink-900 outline-none placeholder:text-ink-500"
        />
        <button
          type="submit"
          className={`cursor-pointer whitespace-nowrap rounded-full border-0 px-6 text-base font-bold ${buttonClassName}`}
        >
          Start free
        </button>
      </form>
      <p role="status" data-testid={`${id}-status`} className="m-0 min-h-5 text-sm">
        {submitted ? 'Thanks! This is a design preview, so no email was sent.' : ''}
      </p>
    </div>
  );
}
