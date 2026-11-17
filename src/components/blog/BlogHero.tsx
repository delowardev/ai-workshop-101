'use client';

import type { FormEvent } from 'react';

/** Blog intro with the article search. This is a static concept site, so search does nothing. */
export function BlogHero() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <section className="mx-auto flex max-w-[1200px] flex-wrap items-end justify-between gap-8 px-6 pt-14 pb-10">
      <div className="flex flex-[1_1_520px] flex-col gap-4">
        <span className="eyebrow text-brand-700">The Sender blog</span>
        <h1 className="m-0 font-display text-[clamp(44px,6vw,80px)] leading-[0.95] font-extrabold tracking-[-0.04em]">
          Better emails, every week.
        </h1>
        <p className="m-0 max-w-[560px] text-[19px] leading-normal text-ink-700">
          Practical guides on email marketing, automation and deliverability. No fluff, just things you can use today.
        </p>
      </div>
      <form
        role="search"
        onSubmit={handleSubmit}
        className="box-border flex h-[52px] w-full max-w-[340px] flex-[0_1_340px] items-center gap-2.5 rounded-full border-[1.5px] border-ink-300 bg-white px-[18px] max-[600px]:max-w-none max-[600px]:flex-auto"
      >
        <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="shrink-0 text-ink-500">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-4-4" />
        </svg>
        <label htmlFor="blog-search" className="sr-only">
          Search articles
        </label>
        <input
          id="blog-search"
          type="search"
          placeholder="Search articles"
          className="min-w-0 flex-1 border-0 bg-transparent text-base text-ink-900 outline-none placeholder:text-ink-500"
        />
      </form>
    </section>
  );
}
