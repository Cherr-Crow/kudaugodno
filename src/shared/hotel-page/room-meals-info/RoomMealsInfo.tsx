import React, { useEffect, useState } from 'react';

import { Select } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';

import { RoomMealsInfoProps } from './RoomMealsInfo.types';

export const RoomMealsInfo: React.FC<RoomMealsInfoProps> = ({
  meals,
  className,
  onMealsChange,
}) => {
  const [options, setOptions] = useState<string[]>([]);

  useEffect(() => {
    const names = meals.map((meal) => meal.name);
    setOptions(names);
  }, [meals]);

  return (
    <div
      className={`flex w-full items-center justify-between text-blue-950 md:flex-col md:items-center md:gap-1 lg:text-center ${className}`}
    >
      <Typography className='md:text-[13px] lg:text-[16px]'>Тип питания</Typography>
      <Select
        options={options}
        startValue={options[0]}
        onSelect={onMealsChange}
        color='blue'
        size='meals'
        className='w-[180px] text-left text-[13px]'
      />
    </div>
  );
};
