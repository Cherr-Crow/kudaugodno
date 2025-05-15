'use client';

import React, { useRef, useState } from 'react';

import type { Swiper as SwiperType } from 'swiper';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { type SwiperRef } from 'swiper/react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { RoomArea } from '@/shared/hotel-page/room-area';
import { RoomBedsInfo } from '@/shared/hotel-page/room-beds-info';
import { NumberOfGuestsIcons } from '@/shared/number-of-guests-icons/NumberOfGuestsIcons';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IRoomModal } from './RoomModal.types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export function RoomModal({ room, rules }: IRoomModal) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const swiperRef = useRef<SwiperRef | null>(null);

  const amenitiesData = [
    { key: 'Общие', value: room.amenities_common },
    { key: 'Кофе-станция', value: room.amenities_coffee },
    { key: 'В ванной комнате', value: room.amenities_bathroom },
    { key: 'Вид', value: room.amenities_view },
  ];

  const amenities: { [key: string]: string[] } = {};

  amenitiesData.forEach(({ key, value }) => {
    if (value && Array.isArray(value) && value.length > 0) {
      amenities[key] = value;
    }
  });

  if (!room) return null;

  return (
    <div className='bg-white text-grey-950'>
      <Typography className='mb-[20px] block font-medium tracking-[1px] text-blue-950 md:mb-[30px] md:text-[40px] lg:mb-[60px] lg:text-[60px] lg:tracking-[2.4px]'>
        Номер {room.category}
      </Typography>
      <div className='mx-auto mb-5 h-[224px] max-w-[304px] md:relative md:h-[623px] md:max-w-[760px] lg:h-[623px] lg:max-w-[923px]'>
        <Swiper
          navigation={false}
          speed={500}
          ref={swiperRef}
          loop={true}
          slidesPerView={1}
          spaceBetween={0}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper2 h-full w-full rounded-[20px] lg:h-[622px]'
        >
          {room.photo &&
            room.photo.map(({ id, photo }) => (
              <SwiperSlide key={id} className='h-full rounded-[20px]'>
                <img
                  className='h-full w-full rounded-[20px] object-cover'
                  src={photo}
                  alt={String(id)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <div className='absolute left-0 right-0 z-10 hidden -translate-y-1/2 transform justify-between md:top-[51%] md:flex'>
          <button
            className='flex items-center justify-center rounded-full bg-white text-blue-600 opacity-70 shadow-md transition hover:opacity-80 active:bg-blue-600 active:text-white active:opacity-100 md:ml-6 md:h-[48px] md:w-[48px] lg:h-[50px] lg:w-[50px]'
            onClick={() => {
              swiperRef.current?.swiper.slidePrev();
            }}
          >
            <SvgSprite
              name='arrow'
              width={24}
              height={24}
              strokeWidth={2}
              className='rotate-180'
            />
          </button>
          <button
            className='flex items-center justify-center rounded-full bg-white text-blue-600 opacity-70 shadow-md transition hover:opacity-80 active:bg-blue-600 active:text-white active:opacity-100 md:mr-6 md:h-[48px] md:w-[48px]'
            onClick={() => {
              swiperRef.current?.swiper.slideNext();
            }}
          >
            <SvgSprite name='arrow' width={24} height={24} strokeWidth={2} />
          </button>
        </div>
        <div className='hidden md:block'>
          <Swiper
            onSwiper={setThumbsSwiper}
            loop={true}
            spaceBetween={20}
            breakpoints={{
              840: {
                slidesPerView: 3.3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className='mySwiper mt-5 hidden md:h-[188px]'
          >
            {room.photo &&
              room.photo.map(({ id, photo }) => (
                <SwiperSlide key={id}>
                  <img
                    className='h-full w-full cursor-pointer rounded-[20px] object-cover'
                    src={photo}
                    alt={String(id)}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </div>
      </div>
      <div className='mb-5 flex w-full flex-col gap-3 rounded-[20px] bg-blue-50 p-5 md:mt-[230px] md:flex-row md:justify-between md:gap-0 md:border md:border-blue-200 md:p-4 md:align-middle lg:mt-[250px] lg:px-5 lg:py-4'>
        <RoomBedsInfo
          singleBeds={room.single_bed}
          duoBeds={room.double_bed}
          className='text-blue-950'
          textSettings='lg:text-[20px]'
        />
        <RoomArea area={room.area} textSettings='lg:text-[20px]' />
        <NumberOfGuestsIcons
          numOfAdults={room.number_of_adults}
          numOfChildren={room.number_of_children}
          className='order-[-1] md:order-none'
        />
      </div>
      <div className='lg:py-5'>
        <div className='md:flex md:justify-between'>
          <ul className='mb-5 md:mb-0 md:max-w-[492px] md:flex-1 md:columns-2 lg:max-w-[709px]'>
            <Typography
              variant='l'
              className='mb-2 block font-semibold text-grey-950 md:mb-4 md:text-[24px]'
            >
              Удобства
            </Typography>
            {amenities &&
              Object.entries(amenities).map(([title, items], index) => (
                <li key={index} className='mb-3 md:mb-5 md:break-inside-avoid'>
                  <Typography
                    variant='m-bold'
                    className='mb-2 block md:mb-4 md:text-xl'
                  >{`${title}:`}</Typography>
                  <ul className='flex flex-col gap-2 md:gap-3'>
                    {items.map((item, index) => (
                      <li key={index}>
                        <div className='flex'>
                          <SvgSprite
                            name='check-mark'
                            width={16}
                            className='mr-3 cursor-pointer'
                          />
                          <Typography className='md:text-xl'>{item}</Typography>
                        </div>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
          </ul>
          <ul className='flex flex-col gap-5 md:max-w-[200px]'>
            {rules &&
              rules.map((rule, index) => (
                <li key={index}>
                  <Typography
                    variant='m-bold'
                    className='md:text-xl'
                  >{`${rule.name}: `}</Typography>
                  <Typography variant='m' className='md:text-xl'>
                    {rule.description.toLowerCase()}
                  </Typography>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
