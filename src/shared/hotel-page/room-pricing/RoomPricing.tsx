import React from 'react';
import { RoomPricingProps } from './RoomPricing.types';
import { Typography } from '@/shared/typography';

const RoomPricing: React.FC<RoomPricingProps> = ({ price }) => {
    return (
        <><div className='w-full flex gap-1 justify-between md:hidden '>
            <div className='  flex gap-1 mb-4'>
                <Typography variant='m-bold' children={price} />
                <Typography variant='m-bold' children='руб' />
            </div>
            <div>
                <Typography variant='m' children='Цена за 10 дней' />
            </div>
        </div>
        <div className=' justify-center hidden md:block '>
            <div className='  flex justify-center gap-1'>
                <Typography variant='m-bold' children={price} />
                <Typography variant='m-bold' children='руб' />
            </div>
            
        </div></>
    )
     
};

export default RoomPricing;