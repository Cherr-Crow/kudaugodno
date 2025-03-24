import React from 'react';

import { ITourFlightCard } from './TourFlightCard.types';

export function TourFlightCard({ flights }: ITourFlightCard) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      {flights.map((flight) => (
        <div key={flight.id} className='flex flex-col gap-6 p-3'>
          <div className='text-xl font-semibold'>{flight.airline}</div>
          <div className='text-lg'>
            {flight.departure_airport} → {flight.arrival_airport}
          </div>
          <div className='text-gray-600 text-sm'>
            Вылет: {flight.departure_date} {flight.departure_time} | Прилёт:{' '}
            {flight.arrival_date} {flight.arrival_time}
          </div>
          <div className='text-lg font-medium'>{flight.price}</div>
          <div className='text-gray-500 text-sm'>
            {flight.service_class} | {flight.flight_type}
          </div>
          <div className='rounded-lg bg-blue-100 p-3 shadow-lg'>
            <p className='text-gray-600 text-sm'>{flight.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
