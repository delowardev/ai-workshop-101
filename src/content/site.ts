// Shared site content: navigation, integrations and footer links.
// Links point to "#" until their pages exist. Internal routes are rendered with next/link,
// which adds the GitHub Pages base path.
import prestashop from '@/assets/logos/prestashop.svg';
import shopify from '@/assets/logos/shopify.svg';
import woocommerce from '@/assets/logos/woocommerce.svg';
import wordpress from '@/assets/logos/wordpress.svg';
import zapier from '@/assets/logos/zapier.svg';

export const mainNav = [
  { label: 'Features', href: '#' },
  { label: 'Resources', href: '/blog' },
  { label: 'Migration', href: '#' },
  { label: 'Pricing', href: '#' },
];

export const integrations = [
  { name: 'Shopify', logo: shopify },
  { name: 'WooCommerce', logo: woocommerce },
  { name: 'WordPress', logo: wordpress },
  { name: 'PrestaShop', logo: prestashop },
  { name: 'Zapier', logo: zapier },
];

const placeholder = (label: string) => ({ label, href: '#' });

export const footerColumns = [
  { title: 'Product', links: ['Email marketing', 'Automation', 'SMS marketing', 'Popups and forms'].map(placeholder) },
  { title: 'Use cases', links: ['Ecommerce', 'Small business', 'SaaS', 'Nonprofit'].map(placeholder) },
  {
    title: 'Resources',
    links: [...['Help center', 'Templates', 'Sender Academy'].map(placeholder), { label: 'Blog', href: '/blog' }],
  },
];
