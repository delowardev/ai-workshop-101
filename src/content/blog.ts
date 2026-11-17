// Blog content: categories and posts shown on /blog.
// Post pages don't exist yet, so every post links to "#".

export const blogCategories = ['All', 'Email marketing', 'Automation', 'Ecommerce', 'Deliverability', 'Lead capture'];

export type PostIllustration = 'flow' | 'cart' | 'auth-records' | 'list' | 'popup' | 'segments';

export type BlogPost = {
  title: string;
  excerpt: string;
  category: string;
  readMinutes: number;
  href: string;
  illustration: PostIllustration;
};

export const featuredPost = {
  title: 'Subject lines that get opened: 12 patterns worth stealing',
  excerpt:
    'Curiosity, urgency, personalization and the rest. What each pattern does, when to use it and the mistakes that send it to spam.',
  category: 'Email marketing',
  readMinutes: 9,
  href: '#',
  subjectLines: ['You left something behind…', 'Anna, this one’s just for you', 'Back in stock: the one you wanted'],
};

export const blogPosts: BlogPost[] = [
  {
    title: 'The welcome series, step by step',
    excerpt: 'What to send in the first week, and how to turn new subscribers into first-time buyers.',
    category: 'Automation',
    readMinutes: 7,
    href: '#',
    illustration: 'flow',
  },
  {
    title: 'Abandoned cart emails that don’t feel pushy',
    excerpt: 'Timing, tone and incentives for recovering carts without training customers to wait for discounts.',
    category: 'Ecommerce',
    readMinutes: 6,
    href: '#',
    illustration: 'cart',
  },
  {
    title: 'SPF, DKIM and DMARC in plain English',
    excerpt: 'The three records that decide whether you reach the inbox, and how to set them up in ten minutes.',
    category: 'Deliverability',
    readMinutes: 8,
    href: '#',
    illustration: 'auth-records',
  },
  {
    title: 'How to clean your list without losing good subscribers',
    excerpt: 'A re-engagement flow first, then a sunset policy. Healthier lists, better delivery.',
    category: 'Email marketing',
    readMinutes: 5,
    href: '#',
    illustration: 'list',
  },
  {
    title: 'Popups that convert without annoying visitors',
    excerpt: 'Triggers, frequency caps and offers that grow your list and keep your bounce rate down.',
    category: 'Lead capture',
    readMinutes: 6,
    href: '#',
    illustration: 'popup',
  },
  {
    title: 'Building segments that update themselves',
    excerpt: 'Dynamic segments for VIPs, lapsed buyers and engaged readers, ready to plug into any campaign.',
    category: 'Automation',
    readMinutes: 5,
    href: '#',
    illustration: 'segments',
  },
];
