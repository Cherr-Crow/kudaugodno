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
        <div className="w-full">
            <div className="bg-white w-full rounded-xl  md:pl-5 pb-5 pt-5">
                <Swiper ref={swiperRef} {...settings}>
                    {images.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img src={image} alt={`Фото ${index + 1}`} className="rounded-lg w-full object-cover" />
                            <div className="absolute top-1/2 left-0 right-0 justify-between transform -translate-y-1/2 hidden md:flex">
                                <button
                                    className="p-2 bg-white rounded-full shadow-md  hover:bg-opacity-100 opacity-70 ml-5"
                                    onClick={() => {
                                        if (swiperRef.current) {
                                            swiperRef.current.swiper.slidePrev();
                                        }
                                    }}
                                >
                                    <SvgSprite name='arrow' className='rotate-180 [&>path]:stroke-blue-600 md:w-4 md:h-4 lg:w-7 lg:h-7 [&>path]:stroke-2' />
                                </button>
                                <button
                                    className="p-2 bg-white rounded-full shadow-md hover:bg-opacity-100 opacity-70 mr-2"
                                    onClick={() => {
                                        if (swiperRef.current) {
                                            swiperRef.current.swiper.slideNext();
                                        }
                                    }}
                                >
                                    <SvgSprite name='arrow' className='md:w-4 md:h-4 lg:w-7 lg:h-7  [&>path]:stroke-blue-600 [&>path]:stroke-2 ' />
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