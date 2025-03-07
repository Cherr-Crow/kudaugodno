/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SvgSprite } from '@/shared/svg-sprite';

interface ImageSliderProps {
  images: photoTypeRoom[];
  // onClick: () => void
}

type photoTypeRoom = {
  id: number;
  photo: string;
  room: number;
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const swiperRef = useRef<any>(null);

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
    <div className='w-full'>
      <div className='relative w-full rounded-xl bg-white pb-5 pt-5 md:pl-5'>
        <Swiper ref={swiperRef} {...settings} className='z-1 absolute'>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.photo}
                alt={`Фото ${index + 1}`}
                className='h-[240px] w-full rounded-3xl object-cover'
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute left-0 right-0 top-1/2 z-10 hidden -translate-y-1/2 transform justify-between md:flex'>
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
              width={20}
              height={20}
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
              width={20}
              height={20}
              strokeWidth={2}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
