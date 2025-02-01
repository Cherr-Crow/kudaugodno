import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { OurAdvantages } from '@/widgets/our-advantages';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { Wzhuh } from '@/widgets/wzhuh';

export default async function Home() {
  // const data = await fetch('http://82.202.137.38/hotels/');
  // const hotOffers = data.json();

  // console.log(hotOffers);

  return (
    <div className='flex flex-col gap-3'>
      <Hero />
      <Wzhuh className='p3 container md:hidden' />
      {/*TODO: блоки "HotOffer" оживить после подключения бэкенда*/}
      {/*<HotOffer*/}
      {/*  array={arr}*/}
      {/*  type='hotel'*/}
      {/*  title='Ой..., а эти туры скоро разберут'*/}
      {/*  link='/catalog-tours'*/}
      {/*/>*/}
      {/*<HotOffer*/}
      {/*  array={arr}*/}
      {/*  type='hotel'*/}
      {/*  title='Что насчет погреться в Турции?'*/}
      {/*  link='/catalog-hotels'*/}
      {/*  className='mt-10 md:mt-14 lg:mt-20'*/}
      {/*/>*/}
      <AdvertisingBanner />
      <PopularDestinations />
      <OurAdvantages />
      <SubscribeToTheNewsletter />
    </div>
  );
}
