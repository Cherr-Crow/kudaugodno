import React from 'react';
import { Typography } from '@/shared/typography';
import { IHotelAmenities } from './HotelAmenities.types';
import { SvgSprite } from '@/shared/svg-sprite';
import { nanoid } from '@reduxjs/toolkit';

export function HotelAmenities({}: IHotelAmenities) {

  const amenities = [
   {
      title: 'В номере',
      comfort: [
        'Террасса',
        'Чайная станция',
        'Рабочий стол',
        'Кресло',
      ]
    },
    {
      title: 'Общие',
      comfort: [
        'Собственный пляж',
        'Круглосуточный ресепшен',
        'Питание по системе шведский стол',
        'Лобби-бар',
      ]
    },
    {
      title: 'Спорт и отдых',
      comfort: [
        '2 бассейна',
        'СПА',
        'Фитнес-центр',
        '4 корта для большого тенниса',
        'Настольный теннис',
        'Бильярд',
      ]
    },
    {
      title: 'Для детей',
      comfort: [
        'Аквапарк',
        'Детский клуб',
        'Вечерняя анимация',
        'Детская площадка',
      ]
    },
  ];

  return (
    <section>
      <div className="hidden sm:block">
        <Typography variant="l" className="block mb-7 font-black text-blue-900 md:font-normal md:text-[24px] md:text-black lg:text-[32px]">
          Удобства
        </Typography>
        
        <ul className="grid grid-cols-2 gap-7 mb-5 lg:flex lg:justify-between">

          {amenities.map((item) => (
            <li className='' key={nanoid()}>
                <Typography className="block mb-3 font-semibold text-blue-900 md:text-lg md:text-black lg:text-xl">
                   {item.title}
                </Typography>
               {item.comfort.map((comfortitem) => (
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
