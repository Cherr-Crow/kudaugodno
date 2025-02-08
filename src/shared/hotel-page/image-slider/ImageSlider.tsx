/* eslint-disable @next/next/no-img-element */
import React, { useRef } from 'react';

import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { SvgSprite } from '@/shared/svg-sprite';

interface ImageSliderProps {
  images: string[];
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const swiperRef = useRef<any>(null); // Убедитесь, что тип рефа правильный

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
      },
    },
  };

  return (
    <div className='w-full'>
      <div className='w-full rounded-xl bg-white pb-5 pt-5 md:pl-5'>
        <Swiper ref={swiperRef} {...settings}>
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Фото ${index + 1}`}
                className='w-full rounded-lg object-cover'
              />
              <div className='absolute left-0 right-0 top-1/2 hidden -translate-y-1/2 transform justify-between md:flex'>
                <button
                  className='ml-5 rounded-full bg-white p-2 opacity-70 shadow-md hover:bg-opacity-100'
                  onClick={() => {
                    if (swiperRef.current) {
                      swiperRef.current.swiper.slidePrev();
                    }
                  }}
                >
                  <SvgSprite
                    name='arrow'
                    className='rotate-180 md:h-4 md:w-4 lg:h-7 lg:w-7 [&>path]:stroke-blue-600 [&>path]:stroke-2'
                  />
                </button>
                <button
                  className='mr-2 rounded-full bg-white p-2 opacity-70 shadow-md hover:bg-opacity-100'
                  onClick={() => {
                    // Проверяем, что реф существует
                    if (swiperRef.current) {
                      swiperRef.current.swiper.slideNext();
                    }
                  }}
                >
                  <SvgSprite
                    name='arrow'
                    className='md:h-4 md:w-4 lg:h-7 lg:w-7 [&>path]:stroke-blue-600 [&>path]:stroke-2'
                  />
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageSlider;
