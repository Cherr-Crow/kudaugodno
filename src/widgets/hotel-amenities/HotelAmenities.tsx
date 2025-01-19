import React from 'react';
import { Typography } from '@/shared/typography';
import { IHotelAmenities } from './HotelAmenities.types';
import { SvgSprite } from '@/shared/svg-sprite';
import { nanoid } from '@reduxjs/toolkit';
import { hotels } from '@/temp/hotel-mock';

export function HotelAmenities({}: IHotelAmenities) {

  
  return (
    <section>
      <div className="hidden sm:block">
        <Typography variant="l" className="block mb-7 font-black text-blue-900 md:font-normal md:text-[24px] md:text-black lg:text-[32px]">
          Удобства
        </Typography>
        
        <ul className="grid grid-cols-2 gap-7 mb-5 lg:flex lg:justify-between">

          {hotels[0].amenities.map((item) => (
            <li className='' key={nanoid()}>
                <Typography className="block mb-3 font-semibold text-blue-900 md:text-lg md:text-black lg:text-xl">
                   {item.category_name}
                </Typography>
               {item.amenity.map((comfortitem) => (
                <div className="flex mb-2" key={nanoid()}>
                  <SvgSprite
                  name='check-mark'
                  width={16}
                  className='cursor-pointer m-0 mr-4'
                />
                <Typography variant="s" className=" font-normal md:text-base">
                   {comfortitem}
                </Typography>
                </div>
                  
               ))}
            
            </li>
            )
          )}

        </ul>
      </div>
    </section>
  );
  
}
