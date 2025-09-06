import React, { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';
import { NamedInput } from '@/shared/ui/named-input';
import { Select } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';

import { DistanceInputBlockProps } from './DistanceBlock.types';

export const DistanceBlock: React.FC<DistanceInputBlockProps> = ({
  label,
  value,
  onChange,
}) => {
  const [enabled, setEnabled] = useState(value !== null);
  const [unit, setUnit] = useState<'м' | 'км'>('м');
  const [inputValue, setInputValue] = useState(value ? value : '');

  const handleCheckbox = (checked: boolean) => {
    setEnabled(checked);
    if (!checked) {
      setInputValue('');
      onChange(null);
    }
  };

  const handleInput = (val: string | number) => {
    let num = Number(val);
    if (isNaN(num)) num = 0;
    setInputValue(val);
    if (enabled) {
      if (unit === 'км') num = num * 1000;
      onChange(num);
    }
  };

  const handleUnit = (unitVal: string) => {
    if (unitVal === 'м' || unitVal === 'км') {
      setUnit(unitVal);
      if (enabled && inputValue !== '') {
        let num = Number(inputValue);
        if (isNaN(num)) num = 0;
        onChange(unitVal === 'км' ? num * 1000 : num);
      }
    }
  };

  return (
    <div className='flex h-[46px] flex-row items-center md:gap-3'>
      <div className='flex items-center gap-[1px]'>
        <Checkbox variant='white' isChecked={enabled} onChange={handleCheckbox} />
        <Typography variant='m' className='whitespace-nowrap'>
          {label}
        </Typography>
      </div>
      <NamedInput
        className='w-[59px] text-xl'
        paddings='px-2 py-2'
        placeholder='200'
        name={label}
        border='border-grey-700 decoration-none'
        getValue={handleInput}
        type='number'
        startValue={inputValue}
        disabled={!enabled}
      />
      <Select
        options={['м', 'км']}
        color='blue'
        size='distance'
        className='text-md max-w-[83px]'
        id={`select-${label}`}
        getValue={handleUnit}
        value={unit}
      />
    </div>
  );
};

{
  /* <div className='flex flex-row gap-3 items-center h-[46px]'>
              <div className='flex gap-[1px] items-center'>
              <Checkbox variant='white'/>
              <Typography variant='m'>Аэропорт</Typography>
              </div>
              <NamedInput
              className='min-w-[59px] text-xl'
              paddings='px-2 py-2'
              placeholder='200'
              name='Расстояние до Аэропорта'
              border='border-grey-700'
              getValue={(val) => setDstanceToTheAirport(val as number)}
              type='number'
              startValue={0}/>
              <Select
              options={['м','км']}
              color='blue'
              size='distance'
              className='w-full text-md'
              id='select-type-of-placements'
              getValue={setPlace}
            />
            </div> */
}
