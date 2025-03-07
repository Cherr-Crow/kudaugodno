import React from 'react';

import { ITourFlightCard } from './TourFlightCard.types';
import { SvgSprite } from '../svg-sprite';

export function TourFlightCard({ flights }: ITourFlightCard) {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2'>
      {flights.map((flight, flightIndex) => (
        <div key={flightIndex} className='flex flex-col gap-6 p-3'>
          <div className='text-xl font-semibold'>{flight.route}</div>
          <div className='text-lg'>{flight.duration}</div>
          <div className='flex gap-4'>
            {flight.baggage.map((item, baggageIndex) => (
              <span
                key={baggageIndex}
                className='badge bg-gray-200 rounded-lg bg-green-100 px-3 py-1 text-sm'
              >
                {item}
              </span>
            ))}
          </div>
          <div className='flex h-full flex-col gap-3 rounded-lg bg-blue-100 p-3 shadow-lg'>
            {flight.segments.map((segment, segmentIndex) =>
              segment.layover ? (
                <div
                  key={segmentIndex}
                  className='text-gray-600 rounded-lg bg-green-100 p-3 text-sm'
                >
                  {segment.layover}
                </div>
              ) : (
                <div key={segmentIndex} className='flex flex-col gap-6'>
                  <div className='flex items-center gap-3'>
                    <SvgSprite
                      name={'airplane-tour'}
                      width={14}
                      className='transition-transform group-hover:hidden'
                    />
                    <div className='text-sm'>
                      <div className='font-medium'>{segment.airline}</div>
                      <div>{segment.flightDuration}</div>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-6'>
                    <div>
                      <div className='font-semibold'>{segment.departure?.time}</div>
                      <div className='text-gray-600 text-sm'>
                        {segment.departure?.location}
                      </div>
                    </div>
                    <div>
                      <div className='font-semibold'>{segment.arrival?.time}</div>
                      <div className='text-gray-600 text-sm'>
                        {segment.arrival?.location}
                      </div>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
