'use client';

import React, { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import { ISlider } from './Slider.types';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

// eslint-disable-next-line import/order
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// import Swiper from 'swiper';
// import { SwiperOptions } from 'swiper/types';

// const swiperParams: SwiperOptions = {
//   slidesPerView: 3,
//   spaceBetween: 50,
// };

// const swiper = new Swiper('.swiper', swiperParams);

export function Slider({}: ISlider) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <section className='bg-grey-600 p-4'>
      Slider
      <div className='bg-green-secondary mx-auto max-w-[1000px] p-4'>
        <Swiper
          style={{}}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper2'
        >
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-3.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-1.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-2.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-3.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-4.png'
              alt=''
            />
          </SwiperSlide>
        </Swiper>
        <Swiper
          onSwiper={() => {
            setThumbsSwiper;
          }}
          loop={true}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper mt-5'
        >
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-3.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-1.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-2.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-3.png'
              alt=''
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              className='h-[100%] w-[100%] object-cover'
              src='/Novotel-Nairobi-Westlands-photo-4.png'
              alt=''
            />
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
