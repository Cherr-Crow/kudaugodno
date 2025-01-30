import React from 'react';
import { RoomDescriptionProps } from './RoomDescription.types';
import { SvgSprite } from '@/shared/svg-sprite';

const RoomDescription: React.FC<RoomDescriptionProps> = ({ description }) => {
    return (
    <div className='pb-2 flex gap-2 md:hidden'>
        <SvgSprite name='bed' className=' ' />
        {description}Двухспальная кровать
    </div>
    )
};

export default RoomDescription;
