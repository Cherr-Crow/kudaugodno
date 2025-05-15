import React from 'react';

// import { SvgSprite } from '@/shared/svg-sprite';
import { Select } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';

import { RoomMealsInfoProps } from './RoomMealsInfo.types';

export const RoomMealsInfo: React.FC<RoomMealsInfoProps> = ({
  meals,
  className,
  onMealsChange,
}) => {
  const mealsArr = JSON.parse(meals.replace(/'/g, '"'));
  mealsArr.unshift('Без питания');

  return (
    <div
      className={`flex w-full items-center justify-between text-blue-950 md:flex-col md:items-center md:gap-1 lg:text-center ${className}`}
    >
      <Typography className='md:text-[13px] lg:text-[16px]'>Тип питания</Typography>
      {/* <div className='md:w-[30px]'>
        <SvgSprite name='cutlery_items' width={40} className='lg:h-6 lg:w-6' />
      </div> */}
      <Select
        options={mealsArr}
        startValue={mealsArr[0]}
        onSelect={onMealsChange}
        color='blue'
        size='meals'
        className='w-[180px] text-left text-[13px]'
      />
      {/* <Typography className='md:text-[13px] lg:text-[16px]'>{meals[0]}</Typography> */}
    </div>
  );
};
