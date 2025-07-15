import { Suspense } from 'react';

import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { HotOffer } from '@/widgets/hot-offer';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { WzhuhBanner } from '@/widgets/wzhuh';

export default async function Home() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <div className='flex flex-col gap-3'>
        <Hero />
        <WzhuhBanner className='p3 container md:hidden' />
        {/* TODO: блоки "HotOffer" оживить после подключения бэкенда*/}
        {/* <HotOffer
        type='tour'
        title='Ой... А эти туры скоро разберут'
        link='/catalog?tab=Туры'
      /> */}
        <HotOffer
          type='hotel'
          title='Что насчет...'
          link='/catalog?tab=Отели'
          className='pb-8 md:pb-12 lg:pb-[70px]'
        />
        <AdvertisingBanner />
        <PopularDestinations />
        {/* <OurAdvantages>
          <Typography
            variant='h4'
            className='mb-5 text-[22px] font-semibold lg:text-[32px]'
          >
            Зачем ехать в тур с нами?
          </Typography>
        </OurAdvantages> */}
        <SubscribeToTheNewsletter />
      </div>
    </Suspense>
  );
}
