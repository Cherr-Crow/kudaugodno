'use client';

import React, { useState } from 'react';

import { nanoid } from 'nanoid';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { IRoomModal } from './RoomModal.types';
import { serviceNames } from '../hotel-block-photos-review/service';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// eslint-disable-next-line import/order
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

export function RoomModal({}: IRoomModal) {
  const { data: hotel } = useGetOneHotelQuery(1);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  if (hotel === undefined) return;
  const roomPhotos = hotel.rooms[0].photo;
  const nomer = hotel.rooms[0].category;
  const doubleBed = hotel.rooms[0].double_bed;
  const area = hotel.rooms[0].area;
  const amenitiel = hotel.rooms[0];

  return (
    <section className='relative mx-auto min-h-[200px] max-w-[1011px] rounded-[20px] p-[20px] shadow-md md:pt-[30px] lg:p-[40px] lg:pt-[60px]'>
      <Typography className='mb-[20px] block font-semibold tracking-[1px] md:mb-[30px] md:text-[35px] lg:mb-[57px] lg:text-[60px] lg:tracking-[2.4px]'>
        Номер {nomer}
      </Typography>
      <div className='absolute right-[20px] top-[22px] w-[16px] cursor-pointer md:w-[20px] lg:right-[40px] lg:top-[40px] lg:w-[24px]'>
        <img className='max-w-[100%]' src='/closeimg.jpg' alt='' />
      </div>
      <div className='bg-green-secondary mx-auto max-w-[1000px]'>
        <Swiper
          style={{}}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper2 hidden rounded-[20px] lg:h-[622px]'
        >
          {roomPhotos &&
            roomPhotos.map(({ id, photo }) => (
              <SwiperSlide key={id}>
                <img
                  className='h-[100%] w-[100%] object-cover'
                  src={photo}
                  alt={String(id)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={15}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper mb-10 mt-5 hidden lg:h-[188px]'
        >
          {roomPhotos &&
            roomPhotos.map(({ id, photo }) => (
              <SwiperSlide key={id}>
                <img
                  className='h-[100%] w-[100%] cursor-pointer rounded-[20px] object-cover'
                  src={photo}
                  alt={String(id)}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
      <div className='md:flex'>
        <div className='mb-4 md:mr-8'>
          <div className='m-0 h-[136px] max-w-[304px] rounded-[20px] border-[1px] border-blue-200 bg-blue-50 p-4 pb-3 md:h-[145px] md:w-[190px] md:p-2 lg:mr-[0px] lg:h-[168px] lg:w-[262px] lg:p-4'>
            <div className='mb-2 flex items-center md:mb-5'>
              <SvgSprite className='mr-2' name={'sofa'} width={30} height={30} />
              <Typography className='text-blue-900 md:tracking-[-0.8px] lg:text-xl lg:font-normal'>
                {doubleBed} двуспальная кровать
              </Typography>
            </div>
            <div className='mb-1 flex items-center md:mb-3 lg:mb-5'>
              <SvgSprite className='mr-2' name={'ruler'} width={30} height={30} />
              <Typography className='text-blue-900 lg:text-xl lg:font-normal'>
                {area} м<sup>2</sup>
              </Typography>
            </div>
            <div className='m-0 flex items-center lg:mb-5'>
              <SvgSprite
                className='mr-2'
                name={'parentsChld'}
                width={88}
                height={32}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='mb-[15px] flex h-[56px] w-[300px] items-center justify-center gap-2 rounded-[20px] px-4 py-4 shadow-md outline outline-1 outline-blue-bold md:max-w-[210px] lg:mb-[26px] lg:h-[70px] lg:max-w-[300px] lg:rounded-2xl'>
            <SvgSprite name={serviceNames('Много зелени')} width={24} height={24} />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] flex h-[56px] w-[300px] items-center justify-center gap-1 rounded-[20px] px-4 py-4 shadow-md outline outline-1 outline-blue-bold md:max-w-[210px] lg:mb-[26px] lg:h-[70px] lg:max-w-[310px] lg:rounded-2xl'>
            <SvgSprite name={serviceNames('Много зелени')} width={24} height={24} />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] flex h-[56px] w-[300px] items-center justify-center gap-2 rounded-[20px] px-4 py-4 shadow-md outline outline-1 outline-blue-bold md:max-w-[210px] lg:mb-[26px] lg:h-[70px] lg:max-w-[310px] lg:rounded-2xl'>
            <SvgSprite name={serviceNames('Много зелени')} width={24} height={24} />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] flex h-[56px] w-[300px] items-center justify-center gap-2 rounded-[20px] px-4 py-4 shadow-md outline outline-1 outline-blue-bold md:max-w-[210px] lg:mb-[26px] lg:h-[70px] lg:max-w-[310px] lg:rounded-2xl'>
            <SvgSprite name={serviceNames('Много зелени')} width={24} height={24} />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] hidden h-[56px] w-[300px] items-center justify-center gap-2 rounded-[20px] px-4 py-4 shadow-md outline outline-1 outline-blue-bold md:flex md:max-w-[210px] lg:mb-[26px] lg:h-[70px] lg:max-w-[310px] lg:rounded-2xl'>
            <SvgSprite name={serviceNames('Много зелени')} width={24} height={24} />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
        </div>
      </div>
      <div className='py-5 pb-0 lg:py-5'>
        <Typography
          variant='l'
          className='font-grey-950 mb-7 block text-blue-900 md:mb-4 md:text-[24px] md:font-normal md:text-grey-950 lg:text-[32px]'
        >
          Удобства
        </Typography>
        <ul className='mb-5 grid grid-cols-2 gap-7 lg:flex lg:justify-between'>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              В номере
            </p>
            <ul>
              {amenitiel?.amenities_common.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              Общие
            </p>
            <ul>
              {amenitiel?.amenities_coffee.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              Спорт и отдых
            </p>
            <ul>
              {amenitiel?.amenities_bathroom.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <p className='mb-3 block font-semibold text-blue-900 md:text-lg md:text-grey-950 lg:text-xl'>
              Для детей
            </p>
            <ul>
              {amenitiel?.amenities_view.map((item) => (
                <li key={nanoid()}>
                  <div className='mb-2 flex' key={nanoid()}>
                    <SvgSprite
                      name='check-mark'
                      width={16}
                      className='m-0 mr-4 cursor-pointer'
                    />
                    <Typography variant='s' className='font-normal md:text-base'>
                      {item}
                    </Typography>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </section>
  );
}
