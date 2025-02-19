import React from 'react';

import { HotelBookingPayForm } from '@/shared/hotel-booking-pay-form';
import { Rating } from '@/shared/rating';
import { Typography } from '@/shared/typography';
import { NamedInput } from '@/shared/ui/named-input';
import { hotels } from '@/temp/hotel-mock';

import { IHotelBooking } from './HotelBooking.types';

export function HotelBooking({}: IHotelBooking) {
  const hotel = hotels[0];
  return (
    <div className='container mx-auto mb-5'>
      <div className='flex flex-col md:flex-row'>
        {/* {left side content} */}
        <div className='flex w-full flex-col gap-2 p-4 md:w-2/3'>
          <div className='rounded-lg bg-white p-4 shadow-lg'>
            <div className='hotel-info'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-4 lg:gap-1'>
                  <Rating category={hotel.star_category} starSize={16} gap={1} />
                  <Typography variant='l-bold' className='text-blue-950 md:text-lg'>
                    {hotel.name}
                  </Typography>
                  <Typography variant='l' className='text-blue-950 md:text-sm'>
                    {hotel.city}
                  </Typography>
                </div>
                <div className='flex h-[65px] w-[130px] md:h-full md:w-[25%]'>
                  <img
                    src='Novotel-Nairobi-Westlands-photo-1.png'
                    alt='Image of Novotel Nairobi Westlands hotel with a pool and palm trees'
                    className='mx-auto rounded-2xl'
                  />
                </div>
              </div>

              <div className='mb-3 grid grid-cols-3 gap-2'>
                {hotel.amenities_common.map((amenity, amenityIndex) => (
                  <Typography
                    key={`amenity-${amenityIndex}`}
                    variant='l-bold'
                    className='rounded-xl bg-grey-50 p-1 text-xs text-grey-800 md:text-base'
                  >
                    {amenity}
                  </Typography>
                ))}
              </div>
              <div className='flex flex-col gap-2 rounded-lg bg-blue-100 p-4'>
                <Typography
                  variant='m'
                  className='text-[14px] font-bold text-blue-950'
                >
                  1 ноября - 7 ноября
                </Typography>
                <Typography variant='m' className='text-blue-950'>
                  2 взрослых на 6 ночей
                </Typography>
                <Typography variant='m' className='font-bold text-blue-950'>
                  Необходимо оплатить при заселении
                </Typography>
                <Typography variant='m' className='text-blue-950'>
                  Курортный сбор до 100 ₽ с человека за ночь
                </Typography>
              </div>
            </div>
          </div>
          <div className='mb-5 rounded-lg bg-white shadow-lg'>
            <div className='flex flex-col gap-2 p-6'>
              <Typography variant='m' className='font-bold text-grey-950'>
                Контактные данные
              </Typography>
              <Typography variant='m' className='text-grey-800'>
                Пришлем информацию о бронировании
              </Typography>
              <div className='flex flex-col md:flex-row'>
                <div className='w-full md:w-1/2 md:pr-2'>
                  <NamedInput
                    id='email'
                    name='Email'
                    type='text'
                    placeholder='example@gmail.com'
                  />
                </div>
                <div className='w-full md:mb-0 md:w-1/2 md:pl-2'>
                  <NamedInput
                    id='phone'
                    name='Телефон'
                    type='tel'
                    placeholder='+7 (999) 678-22-22'
                  />
                </div>
              </div>
            </div>
          </div>

          <div className='rounded-lg bg-white shadow-lg'>
            <div className='flex flex-col gap-2 p-6'>
              <Typography variant='m' className='font-bold text-grey-950'>
                Гости, 2 гостя
              </Typography>
              <Typography variant='m' className='text-grey-800'>
                Данные всех гостей нужны для визы, либо если заселяетесь в разное
                время
              </Typography>
              <div className='bg-gray-100 flex flex-col gap-2 rounded-lg'>
                <Typography variant='m' className='font-bold text-grey-950'>
                  Гость. Взрослый, на которого оформляется номер
                </Typography>
                <Typography variant='m' className='font-bold text-grey-950'>
                  Иванова Ивана Иванович
                </Typography>
                <Typography variant='m' className='text-blue-950'>
                  12.01.1891, паспорт РО
                </Typography>
                <div className='flex flex-col md:flex-row'>
                  <div className='w-full md:w-1/2 md:pr-2'>
                    <NamedInput
                      id='firstName1'
                      name='Имя'
                      type='text'
                      placeholder='Иван'
                    />
                  </div>
                  <div className='w-full md:mb-0 md:w-1/2 md:pl-2'>
                    <NamedInput
                      id='lastName1'
                      name='Фамилия'
                      type='text'
                      placeholder='Иванов'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-100 flex flex-col gap-2 rounded-lg p-6 shadow-md'>
            <Typography variant='m' className='font-bold text-grey-950'>
              Второй гость. Взрослый
            </Typography>
            <div className='flex flex-col md:flex-row'>
              <div className='w-full md:w-1/2 md:pr-2'>
                <NamedInput
                  id='firstName2'
                  name='Имя'
                  type='text'
                  placeholder='Петр'
                />
              </div>
              <div className='w-full md:mb-0 md:w-1/2 md:pl-2'>
                <NamedInput
                  id='lastName2'
                  name='Фамилия'
                  type='text'
                  placeholder='Петров'
                />
              </div>
            </div>
          </div>
          <div className='rounded-lgbg-white flex flex-col gap-2 p-6 shadow-md'>
            <Typography variant='m' className='font-bold text-grey-950'>
              Пожелания
            </Typography>
            <Typography variant='m' className='text-grey-800'>
              Выполнение пожеланий не гарантируется и остается на усмотрение отеля
            </Typography>
            <div className='bg-gray-100 rounded-lg'>
              <Typography variant='m' className='font-bold text-grey-950'>
                Ваши пожелания (необязательно)
              </Typography>
              <textarea
                id='wishes-form'
                className='border-gray-300 w-full rounded-md border border-blue-600 p-2 px-4 py-2 text-grey-800 focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Здесь можно написать свои пожелания'
                rows={3}
              />
            </div>
          </div>
        </div>
        {/* {right side content} */}
        <div className='w-full p-4 md:w-1/3'>
          <HotelBookingPayForm />
        </div>
      </div>
    </div>
  );
}
