import React from 'react';
import { SvgSprite } from '@/shared/svg-sprite';
import { IAdvertisingBanner } from './AdvertisingBanner.types';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/typography';

export function AdvertisingBanner({ className }: IAdvertisingBanner) {
    return (
        <div className="relative w-full h-[204px]">
            <img 
                src="friends-near-lifeguard-tower_mobile.svg"
                alt="friends-near-lifeguard-tower"
                className="absolute w-full h-full rounded-[20px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-0 m-0">
                <Typography variant="h4" className="mt-10 lg:text-[40px] md:text-[40px] text-white">
                    ТУРЦИЯ
                </Typography>
                <Typography variant="m" className="mb-4 lg:text-[32px] md:text-[32px] text-[16px] text-white">
                    Скидка до 50% при покупке тура сегодня
                </Typography>
                <div className="px-6 w-full flex justify-center">   
                    <ButtonCustom 
                        variant="secondary" 
                        size="m" 
                        className='w-full h-[44px] bg-white text-black flex justify-center items-center mb-9'>
                        <div className="flex items-center justify-center gap-6">
                            <Typography variant="m-bold" className="text-black">Подробнее</Typography>
                            <SvgSprite name='arrow-pointer' width={10} />
                        </div>
                    </ButtonCustom>                       
                </div>
            </div>
        </div>
    );
}
    