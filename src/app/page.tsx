import { Typography } from '@/shared/ui/typography';
import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { HotOffer } from '@/widgets/hot-offer';
import { OurAdvantages } from '@/widgets/our-advantages';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { Wzhuh } from '@/widgets/wzhuh';

export default async function Home() {
  return (
    <div className='flex flex-col gap-3'>
      <Hero />
      <Wzhuh className='p3 container md:hidden' />
      {/* TODO: блоки "HotOffer" оживить после подключения бэкенда*/}
      {/* <HotOffer
        type='tour'
        title='Ой... А эти туры скоро разберут'
        link='/catalog-tours'
      /> */}
      <HotOffer
        type='hotel'
        title='Что насчет...'
        link='/catalog-hotels'
        className='pb-8 md:pb-12 lg:pb-[70px]'
      />
      <AdvertisingBanner />
      <PopularDestinations />
      <OurAdvantages>
        <Typography
          variant='h4'
          className='mb-5 text-[22px] font-semibold lg:text-[32px]'
        >
          Зачем ехать в тур с нами?
        </Typography>
      </OurAdvantages>
      <SubscribeToTheNewsletter />
    </div>
  );
}
