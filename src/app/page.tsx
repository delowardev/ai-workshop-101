import { Automation } from '@/components/home/Automation';
import { FeatureGrid } from '@/components/home/FeatureGrid';
import { FinalCta } from '@/components/home/FinalCta';
import { Hero } from '@/components/home/Hero';
import { Integrations } from '@/components/home/Integrations';
import { Migration } from '@/components/home/Migration';
import { PricingPreview } from '@/components/home/PricingPreview';
import { Ratings } from '@/components/home/Ratings';
import { Support } from '@/components/home/Support';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <Ratings />
        <FeatureGrid />
        <Automation />
        <PricingPreview />
        <Migration />
        <Integrations />
        <Support />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
