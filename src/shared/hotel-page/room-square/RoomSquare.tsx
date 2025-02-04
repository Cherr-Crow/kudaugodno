import React from 'react';

import { SvgSprite } from '@/shared/svg-sprite';

import { RoomSquareProps } from './RoomSquare.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomSquare: React.FC<RoomSquareProps> = ({quadrature }) => {
    return (
    <div className='flex-col flex gap-2 mb-2 lg:mt-2'>
        <div className='flex gap-2 md:text-xs lg:text-base'>
            <SvgSprite name='square_room' className='ml-2 md:hidden ' />
            {quadrature} м2
        </div>
              
    </div>
    )
};

export default RoomSquare;