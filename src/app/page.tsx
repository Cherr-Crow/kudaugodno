import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { HotOffer } from '@/widgets/hot-offer';
import { OurAdvantages } from '@/widgets/our-advantages';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { Wzhuh } from '@/widgets/wzhuh';

export default function Home() {
  return (
    <div className='flex flex-col'>
      <Hero />
      <Wzhuh />
      <HotOffer />
      <HotOffer />
      <AdvertisingBanner />
      <PopularDestinations />
      <OurAdvantages />
      <SubscribeToTheNewsletter />
    </div>
  );
}
