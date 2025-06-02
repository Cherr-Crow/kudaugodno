import React from 'react';

import { ISelectForSearchBlock } from './SelectForSearchBlock.types';
import { Select } from '../ui/select';

type SelectType = 'guests' | 'nights';

interface Props extends ISelectForSearchBlock {
  type: SelectType;
  startValue?: string;
}

export function SelectForSearchBlock({
  className,
  getValue,
  type,
  startValue,
}: Props) {
  const generateOptions = (type: SelectType): string[] => {
    if (type === 'guests') {
      return [
        'Количество гостей',
        '1 гость',
        '2 гостя',
        '3 гостя',
        '4 гостя',
        '5 гостей',
        '6 гостей',
        '7 гостей',
        '8 гостей',
        '9 гостей',
        '10 гостей',
      ];
    }

    if (type === 'nights') {
      return [
        'Количество ночей',
        '1 ночь',
        '2 ночи',
        '3 ночи',
        '4 ночи',
        '5 ночей',
        '6 ночей',
        '7 ночей',
        '8 ночей',
        '9 ночей',
        '10 ночей',
      ];
    }

    return [];
  };

  const options = generateOptions(type);

  const handleSelectChange = (value: string) => {
    getValue?.(value);
  };

  return (
    <div className={`w-full ${className ?? ''}`}>
      <Select
        options={options}
        onSelect={handleSelectChange}
        startValue={startValue}
        className='z-5 w-full'
      />
    </div>
  );
}
