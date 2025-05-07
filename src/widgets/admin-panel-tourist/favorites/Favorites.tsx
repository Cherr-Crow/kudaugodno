import { Typography } from '@/shared/ui/typography';
import { InterestingPlacesNearby } from '@/widgets/interesting-places-nearby';

import { FavoritesHotelCard } from './FavoritesHotelCard';

export function Favorites() {
  return (
    <section className='relative'>
      <div className='absolute left-0 top-0 z-[-1] h-[213px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[427px] md:rounded-bl-[100px] md:rounded-br-[100px] md:bg-[url("/admin-panel-tourist-bg960.svg")] lg:md:rounded-br-[100px] lg:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>

      <div className='container py-8 md:py-10 lg:py-16'>
        <Typography
          variant='h1'
          className='mb-8 text-[32px] font-semibold text-white md:mb-10 md:text-[40px] md:font-medium lg:mb-12 lg:text-[60px]'
        >
          Избранное
        </Typography>
        <div className='flex rounded-[20px] bg-white px-4 py-4 md:px-5 lg:justify-between lg:py-5'>
          <div className='flex flex-col gap-4 lg:mr-4'>
            <FavoritesHotelCard />
            <FavoritesHotelCard />
          </div>
          <InterestingPlacesNearby type='favorites' />
        </div>
      </div>
    </section>
  );
}
