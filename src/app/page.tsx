import { Hotel } from '@/types/hotel';
import { Hotels } from '@/types/hotels';
import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { HotOffer } from '@/widgets/hot-offer';
import { HotelAmenities } from '@/widgets/hotel-amenities';
import { OurAdvantages } from '@/widgets/our-advantages';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { Wzhuh } from '@/widgets/wzhuh';

export default async function Home() {
  // const data = await fetch('http://176.108.253.5/hotels/');
  // const posts: Hotels = await data.json();
  // const arr: Hotel[] = [];
  // arr.length = 3;
  // arr.fill(posts.results[0]);

  return (
    <div className='container flex flex-col gap-3'>
      <Hero />
      <Wzhuh className='xl:hidden' />
      {/*TODO: блоки "HotOffer" оживить после подключения бэкенда*/}
      {/*<HotOffer*/}
      {/*  array={arr}*/}
      {/*  type='hotel'*/}
      {/*  title='Ой... А эти туры скоро разберут'*/}
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
