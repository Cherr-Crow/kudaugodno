'use client';
import { useState } from 'react';

import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

export function MyReviews() {
  const [isReviewVisibilityFull, setIsReviewVisibilityFull] =
    useState<boolean>(false);

  return (
    <div className='rounded-[20px] bg-white px-4 py-4 shadow-lg md:px-8 md:py-4 lg:max-w-[89%] lg:px-5 lg:py-2'>
      <div className='mb-3 flex justify-between'>
        <Typography variant='s-bold' className='text-[24px] md:mb-2'>
          Ваш отзыв на&nbsp;отель
        </Typography>
        <div className='flex h-[40px] items-center justify-center rounded-[8px] bg-[#C7F85E] px-3'>
          <Typography variant='m-bold'>8.6</Typography>
        </div>
      </div>

      <div className='mb-6 flex gap-3 md:mb-5'>
        <div className='max-w-[44%] md:mr-2'>
          <img
            src='/admin-panel-tourist-hotel-review.png'
            className=''
            alt='Фото отеля'
          />
        </div>
        <div className='md:flex md:w-[74%] md:justify-between lg:w-[80%]'>
          <div>
            <div className='mb-1 md:mb-2'>
              <Rating category={3} starSize={16} gap={2} className='mb-6' />
            </div>
            <Typography variant='l-bold' className='mb-2 block'>
              Norke Antalia
            </Typography>
          </div>
          <div>
            <div className='flex items-center gap-1'>
              <SvgSprite name='face' height={16} color='#363636' className='' />
              <Typography variant='m' className='text-grey-950'>
                Семья с&nbsp;детьми
              </Typography>
            </div>
            <Typography variant='m' className='text-grey-800'>
              06.10.2024, 2 гостя
            </Typography>
          </div>
        </div>
      </div>

      <div className='mb-3'>
        <div className='mb-3 flex md:items-center'>
          <div className='mr-3 flex h-12 min-w-12 items-center justify-center rounded-full bg-blue-50'>
            <SvgSprite name='like-bold' color='#4757EA' height={20} />
          </div>
          <Typography variant='m' className='align-text-center'>
            Хороший пляж, отзывчивый персонал, лучший детский клуб из всех, что мы
            видели.
          </Typography>
        </div>
        <div className='flex md:items-center'>
          <div className='mr-3 flex h-12 min-w-12 rotate-180 transform items-center justify-center rounded-full bg-blue-50'>
            <SvgSprite name='like-bold' color='#4757EA' height={20} />
          </div>
          <Typography variant='m'>
            Немного разочаровало разнообразие ужинов.
          </Typography>
        </div>
      </div>

      <div className='mb-3 flex rounded-[20px] border-[1px] border-blue-100 px-2 py-4 md:py-5'>
        <div className='mr-3 flex h-12 min-w-12 items-center justify-center rounded-full bg-blue-50 md:mr-2'>
          <SvgSprite name='admin-response' />
        </div>
        <div>
          <Typography variant='m-bold' className='block'>
            Ответ от администрации
          </Typography>
          <Typography
            variant='m'
            className={`${isReviewVisibilityFull ? '' : 'line-clamp-2 md:line-clamp-1'} md:mb-2`}
          >
            Уважаемый гость, благодарим вас за столь высокую оценку нашего отеля.
            Приезжайте ещё! Уважаемый гость, благодарим вас за столь высокую оценку
            нашего отеля. Приезжайте ещё!
          </Typography>
          {!isReviewVisibilityFull && (
            <button
              className='text-blue-600 transition-colors hover:text-blue-300 focus:text-blue-300 focus:outline-none focus-visible:text-blue-300 focus-visible:outline-none active:text-blue-700'
              onClick={() => setIsReviewVisibilityFull(!isReviewVisibilityFull)}
            >
              Читать весь ответ
            </button>
          )}
        </div>
      </div>

      <div className='flex items-center justify-end gap-2'>
        <div className='flex gap-1'>
          <SvgSprite name='eye' color='#676767' />
          <Typography variant='xs' className='text-grey-800'>
            5.8K
          </Typography>
        </div>
        <div className='flex h-[28px] w-[55px] items-center justify-center gap-1 rounded-[20px] bg-grey-50'>
          <img src='/like-yellow.png' alt='Иконка лайка' />
          <Typography variant='s' className='text-grey-950'>
            203
          </Typography>
        </div>
      </div>
    </div>
  );
}
