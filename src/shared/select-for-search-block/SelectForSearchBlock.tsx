import { Select } from '../ui/select';
import { Typography } from '../ui/typography';
// eslint-disable-next-line import/order
import { ISelectForSearchBlock } from './SelectForSearchBlock.types';

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
  const placeholder = type === 'guests' ? 'Гостей' : 'Ночей';
  const generateOptions = (type: SelectType): string[] => {
    if (type === 'guests') {
      return [
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
    <div
      className={`relative flex h-full w-full justify-items-stretch ${className ?? ''}`}
    >
      <div className='flex h-full w-full flex-col justify-center'>
        {startValue && (
          <>
            <Typography className='text-sm text-grey-400 md:text-base lg:hidden'>
              {placeholder}
            </Typography>
            <Typography className='hidden text-grey-400 lg:block lg:text-base'>
              {type === 'guests' ? 'Гостей' : 'Ночей'}
            </Typography>
          </>
        )}
        <Select
          size='default'
          options={options}
          onSelect={handleSelectChange}
          startValue={startValue}
          arrowClass='absolute right-1 -top-2 md:right-3 md:-top-3 lg:right-4'
          className='z-60 w-full'
        />
      </div>
    </div>
  );
}
