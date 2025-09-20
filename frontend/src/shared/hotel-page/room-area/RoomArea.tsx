import React from 'react';

import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { RoomAreaProps } from './RoomArea.types';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const RoomArea: React.FC<RoomAreaProps> = ({
  area,
  className,
  textSettings,
  iconWidth,
}) => {
  return (
    <div className={`flex items-center md:w-[108px] ${className}`}>
      <SvgSprite
        className={`mr-2 w-[24px] ${iconWidth ? iconWidth : 'md:w-8'}`}
        name={'ruler'}
        color='#1a1f4c'
      />
      <Typography className={`text-blue-950 ${textSettings}`}>
        {area} м<sup>2</sup>
      </Typography>
    </div>
  );
};
