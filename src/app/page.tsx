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
      <div className='flex flex-col gap-10 md:gap-[60px] lg:gap-20'>
        <Hero />
        <WzhuhBanner className='container md:hidden' />
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
          className=''
        />
        <AdvertisingBanner />
        <PopularDestinations />
        <SubscribeToTheNewsletter />
      </div>
    </Suspense>
  );
}
