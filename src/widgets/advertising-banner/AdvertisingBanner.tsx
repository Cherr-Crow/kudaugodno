import React from 'react';
import { SvgSprite } from '@/shared/svg-sprite';
import { IAdvertisingBanner } from './AdvertisingBanner.types';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/typography';

export function AdvertisingBanner({ className }: IAdvertisingBanner) {
    return (
        <section className={`${className}`}>
        <div className={`relative w-full h-full ${className}`}>
            <img 
                src="friends-near-lifeguard-tower_mobile.svg"
                alt="friends-near-lifeguard-tower"
                className=" rounded-[20px] object-cover block w-full h-full md:hidden z-10" 
            />
            <img 
                src="friends-near-lifeguard-tower 1.svg"
                alt="friends-near-lifeguard-tower"
                className="rounded-[20px] object-cover hidden md:block md:w-[800px] md:h-[320px] lg:w-[1483px] lg:h-[470px]"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none">
                <div className="absolute lg:ml-14 lg:mt-24 md:ml-32 md:mt-10 inset-0 flex flex-col justify-center items-center p-0 m-0
                    md:w-[430px] md:h-[240px] lg:w-[430px] lg:h-[284px] md:bg-[url('/Content.svg')]
                    bg-no-repeat bg-center rounded-[40px] pointer-events-auto">
                    <Typography variant="h4" className="mt-0 md:mr-64 md:mb-3 lg:mr-60  md:text-[32px] lg:text-[40px] text-white 
                        md:text-black md:mt-8 p-0 ">
                        ТУРЦИЯ
                    </Typography>
                        <Typography variant="m" className="mt-0 mb-4 md:mr-52 md:mb-5 md:ml-8 lg:mr-24 md:text-[16px] lg:text-[24px] text-white 
                        md:text-black md:mt-0 p-0 ">
                        Скидка до 50% при покупке тура сегодня
                    </Typography>
                    <div className="px-6 w-full flex justify-center md:relative md:mb-9">   
                        <ButtonCustom 
                            variant="secondary" 
                            size="m" 
                            className='w-full bg-white text-black flex justify-center items-center'>
                            <div className="flex items-center justify-center gap-6">
                                <Typography variant="m-bold" className="text-black">Подробнее</Typography>
                                <SvgSprite name='arrow-pointer' width={10} />
                            </div>
                        </ButtonCustom>                       
                    </div>
                </div>
            </div>            
        </div>
        </section>
    );
}