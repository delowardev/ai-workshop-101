import { blogPosts } from '@/content/blog';
import { PostIllustration } from './PostIllustration';

/** Grid of the latest articles, followed by pagination. */
export function PostGrid() {
  return (
    <section aria-labelledby="latest-heading" className="mx-auto max-w-[1200px] px-6 pb-[72px]">
      <h2 id="latest-heading" className="sr-only">
        Latest articles
      </h2>
      <ul className="m-0 grid list-none grid-cols-[repeat(auto-fill,minmax(min(320px,100%),1fr))] gap-x-6 gap-y-8 p-0">
        {blogPosts.map((post) => (
          <li key={post.title}>
            <a href={post.href} data-testid="post-card" className="group flex flex-col gap-4 text-ink-900 no-underline hover:text-ink-900">
              <PostIllustration kind={post.illustration} />
              <div className="flex gap-3 text-[13px] text-ink-500">
                <span className="font-semibold text-brand-700">{post.category}</span>
                <span>{post.readMinutes} min read</span>
              </div>
              <h3 className="m-0 font-display text-2xl leading-[1.15] font-bold group-hover:underline">{post.title}</h3>
              <p className="m-0 text-base leading-[1.55] text-ink-500">{post.excerpt}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
