import React from 'react';

import { ITourFlightCard } from './TourFlightCard.types';
import { SvgSprite } from '../ui/svg-sprite';

function calculateFlightDuration(
  departureDate: string,
  departureTime: string,
  arrivalDate: string,
  arrivalTime: string,
): string {
  const departure = new Date(`${departureDate}T${departureTime}`);
  const arrival = new Date(`${arrivalDate}T${arrivalTime}`);

  if (arrival < departure) {
    arrival.setDate(arrival.getDate() + 1);
  }

  const diffMs = arrival.getTime() - departure.getTime();
  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}ч ${minutes}м`;
}

export function TourFlightCard({ flights }: ITourFlightCard) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      {flights.map((flight) => {
        const duration = calculateFlightDuration(
          flight.departure_date,
          flight.departure_time,
          flight.arrival_date,
          flight.arrival_time,
        );

        return (
          <div key={flight.id} className='flex flex-col gap-6 p-3'>
            <div className='text-xl font-semibold'>
              {flight.departure_airport} - {flight.arrival_airport}
            </div>
            <div className='text-lg'>
              {flight.departure_date} {flight.departure_time} - {flight.arrival_date}{' '}
              {flight.arrival_time}
            </div>
            <div className='text-gray-600 text-sm'>Время в пути: {duration}</div>
            <div className='flex gap-4'>
              <span className='badge bg-gray-200 rounded-lg bg-green-100 px-3 py-1 text-sm'>
                {flight.service_class}
              </span>
              <span className='badge bg-gray-200 rounded-lg bg-green-100 px-3 py-1 text-sm'>
                {flight.flight_type}
              </span>
            </div>
            <div className='flex h-full flex-col gap-3 rounded-lg bg-blue-100 p-3 shadow-lg'>
              <div className='flex flex-col gap-6'>
                <div className='flex items-center gap-3'>
                  <SvgSprite
                    name={'airplane-tour'}
                    width={14}
                    className='transition-transform group-hover:hidden'
                  />
                  <div className='text-sm'>
                    <div className='font-medium'>{flight.airline}</div>
                    <div>{flight.price}</div>
                  </div>
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <div>
                    <div className='font-semibold'>{flight.departure_time}</div>
                    <div className='text-gray-600 text-sm'>
                      {flight.departure_airport}
                    </div>
                  </div>
                  <div>
                    <div className='font-semibold'>{flight.arrival_time}</div>
                    <div className='text-gray-600 text-sm'>
                      {flight.arrival_airport}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
