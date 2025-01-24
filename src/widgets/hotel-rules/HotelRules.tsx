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
      imgname: 'paw',
    },
    {
      rule: 'Детская кроватка при необходимости оплачивается отдельно - 500р/ночь. Детский стульчик предоставляется по запросу',
      imgname: 'face',
    },
  ];

  return (
    <section>
      <div className='mb-5 rounded-2xl p-4 shadow-md sm:shadow-none'>
        <Typography
          variant='s'
          className='mb-7 block text-base font-semibold md:text-[24px] md:font-normal lg:text-[32px]'
        >
          Правила
        </Typography>

        <ul className=''>
          {reles.map((item) => (
            <li
              className='mb-3 flex items-start gap-3 lg:items-center'
              key={nanoid()}
            >
              <SvgSprite
                name={item.imgname}
                width={30}
                className='m-0 mr-2 cursor-pointer'
              />
              <Typography className='block font-normal text-blue-900'>
                {item.rule}
              </Typography>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
