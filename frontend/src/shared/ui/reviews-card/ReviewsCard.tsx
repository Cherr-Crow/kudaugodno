import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { IReviewsCard } from './ReviewsCard.types';

export function ReviewsCard({}: IReviewsCard) {
  return (
    <div className='mb-1 mr-6 min-w-[287px] rounded-[20px] p-5 shadow-md xl:mr-0'>
      <div className='flex justify-between'>
        <img
          className='mb-1 ml-6 h-[100px] rounded-full'
          src='https://steamuserimages-a.akamaihd.net/ugc/782989521799828488/99CC5CFF94186C28A21C7E81D145E9C6550DCC14/?imw=512&amp;imh=499&amp;ima=fit&amp;impolicy=Letterbox&amp;imcolor=%23000000&amp;letterbox=true'
          alt='Аватарка'
        />
        <div className='flex h-[40px] items-center justify-center rounded-[8px] bg-[#C7F85E] pl-3 pr-3'>
          <Typography variant='m-bold'>8.6</Typography>
        </div>
      </div>
      <div className='ml-6 flex max-w-[252px] flex-col'>
        <Typography variant='l-bold'>Алиса Селезнева</Typography>
        <Typography className='border-black border-b-[1px] pb-3'>
          Расположение идеальное и близко ко многим хорошим местам, например Sarit
          Centre и Westgate Mall. Завтрак был отличным, с таким количеством вариантов
          на выбор. Мы очень приятно провели время. Номер был хорошим и чистым - и
          хорошее соотношение цены и качества...
        </Typography>
        <Typography className='mt-1 text-blue-500'>Подробнее</Typography>
      </div>
    </div>
  );
}
