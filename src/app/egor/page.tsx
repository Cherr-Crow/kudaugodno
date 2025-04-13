'use client';
import React, { useEffect, useState } from 'react';

import { useGetApplicationsQuery } from '@/servicesApi/applicationsApi';
import { hotels } from '@/temp/hotel-mock';
import { HotelCatalog } from '@/widgets/hotel-catalog';

export default function Egor() {
  const [isClient, setIsClient] = useState(false);
  const { data } = useGetApplicationsQuery({
    limit: 10,
    offset: 0,
  });
  useEffect(() => {
    setIsClient(true);
  }, []);
  console.log(data);
  return (
    <div className={`ml-5 mt-5 flex-col`}>
      <div className='container'>
        {/* <HotelCatalog /> */}
        {isClient && (
          <>
            {/* <HotelBooking hotelId={1} />
            <TourBooking tourId={1} /> */}
            <HotelCatalog hotels={hotels} />
          </>
        )}
      </div>

      {/* <div className={`mb-5`}>
        <label>Switcher</label>
        <Switcher />
        <label>Switcher disabled</label>
        <Switcher isDisabled={true} />
        <label>Switcher active by default</label>
        <Switcher isActive={true} />
      </div> */}

      {/* <div className={`mb-5`}>
        <label>Checkbox</label>
        <Checkbox label='Checkbox text' />
        <label>Checkbox disabled</label>
        <Checkbox label='Checkbox text' isDisabled={true} />
        <label>Switcher active by default</label>
        <Checkbox label='Checkbox text' isChecked={true} />
      </div> */}

      {/* <div>
        <label>RadioButton</label>
        <RadioButton label='RadioButton text' />
        <label>RadioButton disabled</label>
        <RadioButton label='RadioButton text' isDisabled={true} />
        <label>Switcher active by default</label>
        <RadioButton label='RadioButton text' isSelected={true} />
      </div> */}

      {/* <div className='container mb-5 flex flex-col gap-3'>
        <Hero />
        <Wzhuh />
        <AdvertisingBanner />
        <PopularDestinations />
        <OurAdvantages />
        <SubscribeToTheNewsletter />
      </div> */}
    </div>
  );
}
