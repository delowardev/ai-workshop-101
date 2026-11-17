// Shared site content: navigation, integrations and footer links.
// Links point to "#" until their pages exist.
import prestashop from '@/assets/logos/prestashop.svg';
import shopify from '@/assets/logos/shopify.svg';
import woocommerce from '@/assets/logos/woocommerce.svg';
import wordpress from '@/assets/logos/wordpress.svg';
import zapier from '@/assets/logos/zapier.svg';

export const mainNav = [
  { label: 'Features', href: '#' },
  { label: 'Resources', href: '#' },
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

export const footerColumns = [
  { title: 'Product', links: ['Email marketing', 'Automation', 'SMS marketing', 'Popups and forms'] },
  { title: 'Use cases', links: ['Ecommerce', 'Small business', 'SaaS', 'Nonprofit'] },
  { title: 'Resources', links: ['Help center', 'Templates', 'Sender Academy', 'Blog'] },
];
