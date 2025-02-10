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
    images: string[];
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
        <div className="relative w-full">
            <div className="bg-white w-full rounded-xl md:pl-5 pb-5 pt-5">
                <Swiper ref={swiperRef} {...settings}>
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} alt={`Фото ${index + 1}`} className="rounded-lg w-full object-cover" />
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Кнопки навигации */}
                <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 z-50 ">
                    <button
                        className="p-2 bg-white rounded-full shadow-md hover:bg-opacity-100 opacity-70 ml-8 "
                        onClick={() => {
                            if (swiperRef.current) {
                                swiperRef.current.swiper.slidePrev();
                            }
                        }}
                    >
                        <SvgSprite name='arrow' color='blue' width={40} height={40} strokeWidth={2} className='rotate-180' />
                    </button>
                    <button                   
                        className="p-2 bg-white rounded-full shadow-md hover:bg-opacity-100 opacity-70 mr-5"
                        onClick={() => {
                            if (swiperRef.current) {
                                swiperRef.current.swiper.slideNext();
                            }
                        }}
                    >
                        <SvgSprite name='arrow' color='blue' width={40} height={40} strokeWidth={2}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageSlider;