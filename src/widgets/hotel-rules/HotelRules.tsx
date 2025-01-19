import React from 'react';
import { IHotelRules } from './HotelRules.types';
import { Typography } from '@/shared/typography';
import { nanoid } from 'nanoid';
import { SvgSprite } from '@/shared/svg-sprite';
import { ISvgSprite } from '@/shared/svg-sprite/SvgSprite.types';

export function HotelRules({}: IHotelRules) {

  interface IRules {
    rule: string;
    imgname: ISvgSprite['name'];
  }

  const reles: Array<IRules> = [
    {
      rule: 'Можно с животными. Гулять с собаками разрешается в специально отведённых местах',
      imgname: 'paw'
    },
    {
      rule: 'Детская кроватка при необходимости оплачивается отдельно - 500р/ночь. Детский стульчик предоставляется по запросу',
      imgname: 'face'
    }
  ];

  return (
    <section>
      <div className="rounded-2xl p-4 shadow-md mb-5 sm:shadow-none">
        <Typography variant="s" className="block mb-7 font-semibold text-base md:font-normal md:text-[24px] lg:text-[32px]">
          Правила
        </Typography>

        <ul className="">
         {reles.map((item) => (

            <li className='flex items-start lg:items-center mb-3' key={nanoid()}>
                <SvgSprite
                  name={item.imgname}
                  width={30}
                  className='cursor-pointer m-0 mr-2'
                />
                <Typography className="block font-normal text-blue-900">
                  {item.rule}
                </Typography>
            </li>  
          ))}
        </ul>
      </div> 
    </section>
  );
}
