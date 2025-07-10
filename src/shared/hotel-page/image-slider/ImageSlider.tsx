/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable import/order */
/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { photoType } from '@/types/hotel';

interface ImageSliderProps {
  images: photoType[];
  // onClick: () => void
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const swiperRef = useRef<any>(null);

  const settings = {
    modules: [Navigation, Pagination],
    navigation: false,
    loop: true,
    speed: 500,
    breakpoints: {
      320: {
        slidesPerView: 1.65,
        spaceBetween: 16,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
    },
  };

  return (
    <div className='relative w-full rounded-[20px] bg-white'>
      <Swiper ref={swiperRef} {...settings} className='z-1 absolute'>
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image.photo}
              alt={`Фото ${index + 1}`}
              className='h-[150px] w-full rounded-[20px] object-cover md:h-[228px] md:max-w-[267px] lg:h-[228px] lg:max-w-[436px]'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute left-0 right-0 top-1/2 z-10 hidden -translate-y-1/2 transform justify-between md:top-[55%] md:flex lg:top-[57%]'>
        <button
          className='ml-8 rounded-full bg-white p-2 text-blue-600 opacity-70 shadow-md hover:opacity-80 active:bg-blue-600 active:text-white active:opacity-100 md:ml-2 md:flex md:h-[32px] md:w-[32px] md:items-center md:justify-center md:p-0 lg:ml-5 lg:h-[44px] lg:w-[44px]'
          onClick={() => {
            if (swiperRef.current) {
              swiperRef.current.swiper.slidePrev();
            }
          }}
        >
          <SvgSprite
            name='arrow'
            width={20}
            height={20}
            strokeWidth={2}
            className='rotate-180'
          />
        </button>
        <button
          className='mr-5 rounded-full bg-white p-2 text-blue-600 opacity-70 shadow-md hover:opacity-80 active:bg-blue-600 active:text-white active:opacity-100 md:mr-2 md:flex md:h-[32px] md:w-[32px] md:items-center md:justify-center md:p-0 lg:mr-5 lg:h-[44px] lg:w-[44px]'
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
  );
};

export default ImageSlider;
