'use client';

import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

// eslint-disable-next-line import/order
import { IRoomModal } from './RoomModal.types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

export function RoomModal({ room }: IRoomModal) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null);

  const [style, setStyle] = useState<{}>({});

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth >= 640) {
        setStyle({ display: 'block' });
      } else {
        setStyle({ display: 'none' });
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  if (room === undefined) return;

  const roomPhotos = room.photo;
  const nomer = room.category;
  const doubleBed = room.double_bed;
  const area = room.area;
  const amenitiel = room;

  const settings = {
    modules: [Navigation, Pagination],
    navigation: false,
    loop: true,
    speed: 500,
    breakpoints: {
      320: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  return (
    <section className='relative mx-auto max-h-[800px] max-w-[1011px] overflow-y-auto rounded-[20px] p-[20px] md:pt-[30px] lg:p-[40px] lg:pt-[60px]'>
      <Typography className='mb-[20px] block font-semibold tracking-[1px] md:mb-[30px] md:text-[35px] lg:mb-[57px] lg:text-[60px] lg:tracking-[2.4px]'>
        Номер {nomer}
      </Typography>
      <div className='mx-auto mb-10 max-w-[280px] sm:max-w-[530px] md:max-w-[730px] xl:max-w-[930px]'>
        <Swiper
          {...settings}
          ref={swiperRef}
          style={{}}
          loop={true}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper2 rounded-[20px] lg:h-[622px]'
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
        <div className='absolute left-[2%] right-[3%] z-10 hidden -translate-y-1/2 transform justify-between md:top-[48%] md:flex lg:top-[58%]'>
          <button
            className='ml-8 rounded-full bg-white p-2 opacity-70 shadow-md hover:opacity-100 active:opacity-70'
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.swiper.slidePrev();
              }
            }}
          >
            <SvgSprite
              name='arrow'
              color='blue'
              width={45}
              height={45}
              strokeWidth={2}
              className='rotate-180'
            />
          </button>
          <button
            className='mr-5 rounded-full bg-white p-2 opacity-70 shadow-md hover:opacity-100 active:opacity-70'
            onClick={() => {
              if (swiperRef.current) {
                swiperRef.current.swiper.slideNext();
              }
            }}
          >
            <SvgSprite
              name='arrow'
              color='blue'
              width={45}
              height={45}
              strokeWidth={2}
            />
          </button>
        </div>
        <Swiper
          style={{ ...style }}
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={15}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper mt-5 hidden lg:h-[188px]'
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
            <div className='mb-2 flex items-center md:mb-2 lg:mb-5'>
              <SvgSprite className='mr-2' name={'sofa'} width={30} height={30} />
              <Typography className='text-blue-900 md:tracking-[-0.8px] lg:text-xl lg:font-normal'>
                {doubleBed}{' '}
                {doubleBed === 1
                  ? 'двуспальная кровать'
                  : `двуспальных ${doubleBed === 5 || doubleBed === 0 ? 'кроватей' : 'кровати'}`}
              </Typography>
            </div>
            <div className='mb-1 flex items-center md:mb-3 lg:mb-5'>
              <SvgSprite className='mr-2' name={'ruler'} width={30} height={30} />
              <Typography className='text-blue-900 lg:text-xl lg:font-normal'>
                {area} м<sup>2</sup>
              </Typography>
            </div>
            <div className='m-0 flex items-center lg:mb-5'>
              <div className='flex items-center'>
                {room.number_of_adults
                  ? Array.from({ length: room.number_of_adults }).map((_, index) => (
                      <div
                        key={`${index}/room.number_of_adults`}
                        className='mr-1 h-[24px] w-[12px] bg-cover'
                        style={{
                          backgroundImage: `url('/human.png')`,
                        }}
                      ></div>
                    ))
                  : null}
              </div>{' '}
              {room.number_of_children ? '+ ' : ''}
              <div className='ml-1 flex'>
                {room.number_of_children
                  ? Array.from({ length: room.number_of_children }).map(
                      (_, index) => (
                        <div
                          key={`${index}/room.number_of_children`}
                          className='mr-1 h-[22px] w-[15px] bg-cover'
                          style={{
                            backgroundImage: `url('/fonchild.png')`,
                          }}
                        ></div>
                      ),
                    )
                  : null}
              </div>
            </div>
          </div>
        </div>
        {/* <div className='relative flex w-[100%] flex-col gap-4'>
          <div
            ref={amenitiesContainerRef}
            className={`grid grid-cols-1 gap-4 overflow-hidden rounded-2xl p-0.5 sm:grid-cols-2 ${
              showAll
                ? 'h-[277px] overflow-y-auto md:h-[258px]'
                : 'h-[277px] overflow-hidden md:h-[258px]'
            }`}
          >
            {(showAll ? amenities : amenities.slice(0, visibleAmenities)).map(
              (amenity) => (
                <div
                  key={nanoid()}
                  className='bg-gray-100 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'
                >
                  <SvgSprite name={serviceNames(amenity)} width={24} height={24} />
                  <Typography variant='s' className='text-gray-700'>
                    {amenity}
                  </Typography>
                </div>
              ),
            )}

            {amenities.length > visibleAmenities && (
              <button
                onClick={toggleAmenities}
                className='group flex items-center justify-center gap-0.5 rounded-2xl bg-blue-300 px-4 py-4 shadow-md outline outline-1 outline-blue-600'
              >
                <Typography variant='s-bold' className='text-gray-700'>
                  {showAll
                    ? 'Скрыть удобства'
                    : `Еще ${amenities.length - visibleAmenities} удобств`}
                </Typography>
                <SvgSprite
                  name='arrow'
                  width={24}
                  className={`transition-transform duration-200 group-hover:translate-x-1 ${showAll ? 'rotate-90' : ''}`}
                  color='#4757ea'
                />
              </button>
            )}
          </div>
        </div> */}
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
              Общие
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
              Кофе-станция
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
              Ванная комната
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
              Вид
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
