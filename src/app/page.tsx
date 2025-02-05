import { AdvertisingBanner } from '@/widgets/advertising-banner';
import { Hero } from '@/widgets/hero';
import { OurAdvantages } from '@/widgets/our-advantages';
import { PopularDestinations } from '@/widgets/popular-destinations';
import { SubscribeToTheNewsletter } from '@/widgets/subscribe-to-the-newsletter';
import { Wzhuh } from '@/widgets/wzhuh';

export default async function Home() {
  // const data = await fetch('http://176.109.109.78/api/v1/hotels/?limit=10')
  //   .then((res) => res.json())
  //   .then((data) => console.log(data));
  // const hotOffers = data.json();
  //
  // console.log(data);

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
