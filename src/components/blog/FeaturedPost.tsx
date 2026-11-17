import { featuredPost } from '@/content/blog';
import { ArrowRightIcon } from '@/components/ui/icons';

const bubbleStyles = [
  'self-start -rotate-2 bg-white shadow-[0_12px_24px_-10px_rgb(10_8_59/0.4)]',
  'self-end rotate-[1.5deg] bg-ink-900 text-paper',
  'self-center -rotate-1 bg-brand-100',
];

/** The featured article: a wide card with subject-line art on the left. */
export function FeaturedPost() {
  const post = featuredPost;
  return (
    <section aria-label="Featured article" className="mx-auto max-w-[1200px] px-6 pb-[72px]">
      <a
        href={post.href}
        data-testid="featured-post"
        className="group flex flex-wrap overflow-hidden rounded-[28px] border border-line bg-white text-ink-900 no-underline hover:text-ink-900"
      >
        <div
          aria-hidden="true"
          className="box-border flex min-h-[380px] flex-[1_1_520px] flex-col justify-center gap-3 overflow-hidden bg-brand-500 p-10 max-[600px]:min-h-[300px] max-[600px]:p-6"
        >
          {post.subjectLines.map((line, i) => (
            <div key={line} className={`max-w-[90%] rounded-xl px-[18px] py-3.5 text-base font-semibold ${bubbleStyles[i]}`}>
              {line}
            </div>
          ))}
        </div>
        <div className="flex flex-[1_1_400px] flex-col justify-center gap-4 p-10 max-[600px]:p-6">
          <div className="flex flex-wrap items-center gap-3 text-sm text-ink-500">
            <span className="inline-flex h-[26px] items-center rounded-full bg-brand-100 px-2.5 font-semibold text-brand-900">
              Featured · {post.category}
            </span>
            <span>{post.readMinutes} min read</span>
          </div>
          <h2 className="m-0 font-display text-[clamp(30px,3.5vw,44px)] leading-[1.05] font-bold tracking-[-0.02em] group-hover:underline">
            {post.title}
          </h2>
          <p className="m-0 text-[17px] leading-[1.6] text-ink-700">{post.excerpt}</p>
          <span className="inline-flex items-center gap-2 font-semibold text-brand-700">
            Read the article <ArrowRightIcon />
          </span>
        </div>
      </a>
    </section>
  );
}
