import React from 'react';

import { nanoid } from 'nanoid';

import { TourFlightCard } from '@/shared/tour-flight-card';
import { Typography } from '@/shared/typography';
import { flightData } from '@/temp/flight-mock';
import { hotels } from '@/temp/hotel-mock';

import { IModalTours } from './ModalTours.types';

export function ModalTours({ type }: IModalTours) {
  const hotel = hotels[0];

  const infoMock = [
    {
      title: 'Официальный сайт отеля',
      text: 'https://all.accor.com/hotel/9332/index.en.shtml',
    },
    {
      title: 'Рейс/вылет',
      text: 'Регулярный рейс, арабская авиакомпания Air Arabia, (сайт авиакомпании https://www.airarabia.com/ru), рейс с пересадкой в ОАЭ в городе Шардже 2 ч, в стоимость авиабилета входит ручная кладь 10 кг и питание на борту самолета. Вылет и прилет аэропорт Домодедово. Трансфер',
    },
    {
      title: 'В тур включен трансфер из аэропорта до отеля и из отеля до аэропорта.',
      text: 'Туроператор',
    },
    { title: 'Fun&Sun', text: 'Комната' },
    { title: 'Superior room', text: 'Питание' },
    { title: 'BB', text: 'только завтраки' },
  ];
  return (
    <div className='justify-beteen z-50 m-4 mx-auto grid h-auto max-h-[406px] gap-2 rounded-[20px] bg-[#FFFFFF] text-[#1A1F4C] lg:max-w-[761px]'>
      <Typography variant='l' className='mb-5 font-semibold leading-[30px]'>
        Информация о туре
      </Typography>
      {type === 'comfort' && (
        <div>
          {infoMock.map((elem) => {
            return (
              <div className='mb-4 grid lg:grid-cols-2' key={nanoid()}>
                <div className='max-w-fit'>
                  <Typography className='text-wrap font-semibold'>
                    {elem.title}
                  </Typography>
                </div>
                <div className='max-w-fit'>
                  <Typography className='text-balance'>{elem.text}</Typography>
                </div>
              </div>
            );
          })}
        </div>
      )}{' '}
      {type === 'trip' && (
        <div className='flex w-full flex-col gap-4'>
          <Typography variant='l' className='font-bold text-white md:text-lg'>
            Тур с перелетом в {hotel.country}
          </Typography>
          <div className='rounded-lg bg-white shadow-lg'>
            <TourFlightCard flights={flightData.flights} />
          </div>
        </div>
      )}
    </div>
  );
}
