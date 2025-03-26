import { InterestingPlacesNearby } from '@/widgets/interesting-places-nearby';

import { HotelCard } from './cards/HotelCard';
import { TripCard } from './cards/TripCard';

export function ActiveTrips({}) {
  return (
    <div className='md:flex md:flex-col'>
      <div className='mb-4 md:mb-5 lg:flex lg:gap-5'>
        <TripCard type='active' />
        <InterestingPlacesNearby type='trips' />
      </div>
      <div className='lg:flex lg:gap-5'>
        <HotelCard type='active' />
        <InterestingPlacesNearby type='trips' />
      </div>
    </div>
  );
}
