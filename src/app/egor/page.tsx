'use client';
import React, { useEffect, useState } from 'react';

import { ITour } from '@/types/tour-type';
import { HotelBooking } from '@/widgets/hotel-booking';
import { TourBooking } from '@/widgets/tour-booking';

export default function Egor() {
  const [isClient, setIsClient] = useState(false);
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/v1/tours/')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Ошибка: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setTours(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div className={`ml-5 mt-5 flex-col`}>
      <div className='container'>
        {/* <HotelCatalog /> */}
        {isClient && (
          <>
            <ul>
              {tours.map((tour) => (
                <li key={tour.id}>
                  <strong>{tour.hotel}</strong> — {tour.start_date}, {tour.end_date}
                </li>
              ))}
            </ul>
            <HotelBooking hotelId={1} />
            <TourBooking tourId={1} />
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
