import type { Metadata } from 'next';
import { BlogHero } from '@/components/blog/BlogHero';
import { CategoryNav } from '@/components/blog/CategoryNav';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { NewsletterCta } from '@/components/blog/NewsletterCta';
import { Pagination } from '@/components/blog/Pagination';
import { PostGrid } from '@/components/blog/PostGrid';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';

export const metadata: Metadata = {
  title: 'Blog: better emails, every week | Sender (redesign concept)',
  description: 'Practical guides on email marketing, automation and deliverability.',
};

export default function BlogPage() {
  return (
    <>
      <SiteHeader current="Resources" />
      <main>
        <BlogHero />
        <CategoryNav />
        <FeaturedPost />
        <PostGrid />
        <Pagination />
        <NewsletterCta />
      </main>
      <SiteFooter />
    </>
  );
}
