"use client"

import React, { useRef, useState } from 'react';
import { ISlider } from './Slider.types';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

// import Swiper from 'swiper';
// import { SwiperOptions } from 'swiper/types';

// const swiperParams: SwiperOptions = {
//   slidesPerView: 3,
//   spaceBetween: 50,
// };

// const swiper = new Swiper('.swiper', swiperParams);

export function Slider({}: ISlider) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  return (
    <section className='p-4 bg-grey-600'>
      Slider
      <div className='max-w-[1000px] p-4 bg-green-secondary mx-auto'>
         <Swiper
          style={{
            
          }}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{swiper: thumbsSwiper}}
          modules={[FreeMode, Navigation, Thumbs]}
          className='mySwiper2'
         >
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'
             src="/Novotel-Nairobi-Westlands-photo-3.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'
             src="/Novotel-Nairobi-Westlands-photo-1.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'
             src="/Novotel-Nairobi-Westlands-photo-2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'
             src="/Novotel-Nairobi-Westlands-photo-3.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'
             src="/Novotel-Nairobi-Westlands-photo-4.png" alt="" />
          </SwiperSlide>
         </Swiper>
         <Swiper 
           onSwiper={setThumbsSwiper}
           loop={true}
           spaceBetween={10}
           slidesPerView={4}
           freeMode={true}
           watchSlidesProgress={true}
           modules={[FreeMode, Navigation, Thumbs]}
           className='mySwiper mt-5'
         >
           <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'
            src="/Novotel-Nairobi-Westlands-photo-3.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'            
             src="/Novotel-Nairobi-Westlands-photo-1.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'            
             src="/Novotel-Nairobi-Westlands-photo-2.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'            
             src="/Novotel-Nairobi-Westlands-photo-3.png" alt="" />
          </SwiperSlide>
          <SwiperSlide>
            <img className='w-[100%] h-[100%] object-cover'            
             src="/Novotel-Nairobi-Westlands-photo-4.png" alt="" />
          </SwiperSlide>
         </Swiper>
      </div>
    </section>
  )
}
