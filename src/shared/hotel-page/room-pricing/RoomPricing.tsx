/* eslint-disable react/no-children-prop */
import React from 'react';

import { Typography } from '@/shared/typography';

import { RoomPricingProps } from './RoomPricing.types';

const RoomPricing: React.FC<RoomPricingProps> = ({ price }) => {
    return (
        <><div className='w-full flex gap-1 justify-between md:flex-col md:justify-center'>
            <div className='  flex gap-1 mb-2 md:justify-center'>
                <Typography variant='m-bold' children={price} />
                <Typography variant='m-bold' children='руб' />
            </div>
            <div className='flex md:justify-center'>
                <Typography variant='m' children='Цена за 10 ночей'className=' md:hidden' />
                <Typography variant='m' children='10 ночей' className=' hidden md:block' />
            </div>
        </div>
        </>
    )
     
};

export default RoomPricing;