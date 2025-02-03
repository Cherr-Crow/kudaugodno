import React from 'react';
import { RoomDescriptionProps } from './RoomDescription.types';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

const RoomDescription: React.FC<RoomDescriptionProps> = ({description }) => {
    return (
    <div className='flex-col flex gap-2'>
        <div className='flex'>
            <Typography variant="m-bold" className="text-black sm:hidden">Цена за</Typography>
            <SvgSprite name='room-guests' className='ml-2 md:hidden' />
        </div>
        
        <div className='flex gap-2 mb-2 md:text-xs lg:text-base'>
            <SvgSprite name='bed' className='' />
            {description}Двухспальная кровать
        </div>    
    </div>
    )
};

export default RoomDescription;
