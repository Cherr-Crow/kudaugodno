import { InterestingPlacesNearby } from '@/widgets/interesting-places-nearby';

import { FavoritesHotelCard } from './FavoritesHotelCard';

export function Favorites() {
  return (
    <section className='w-full'>
      <div className='flex rounded-[20px] bg-white px-4 py-4 md:px-5 lg:justify-between lg:py-5'>
        <div className='flex flex-col gap-4 lg:mr-4'>
          <FavoritesHotelCard />
          <FavoritesHotelCard />
        </div>
        <InterestingPlacesNearby type='favorites' />
      </div>
    </section>
  );
}
