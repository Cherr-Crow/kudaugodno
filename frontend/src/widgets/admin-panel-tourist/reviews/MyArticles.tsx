import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IMyArticle } from './MyArticles.types';

export function MyArticles({ className, isHorizontalOrientation }: IMyArticle) {
  return (
    <div
      className={`${className ?? ''} flex h-full w-full ${isHorizontalOrientation ? 'flex-col' : ''} rounded-[20px] shadow-lg md:flex-col`}
    >
      <div
        className={` ${isHorizontalOrientation ? 'h-[136px] w-full rounded-t-[20px]' : 'h-[191px] w-[40%] rounded-l-[20px]'} md:rounded-bl-0 overflow-hidden bg-grey-50 md:min-h-[308px] md:w-full md:rounded-tr-[20px] lg:min-w-[340px]`}
      >
        <img
          className='h-full w-full bg-cover'
          src='/admin-panel-tourist-article.jpg'
          alt='Фото статьи'
        />
      </div>

      <div
        className={`z-[2] flex ${isHorizontalOrientation ? 'mt-[-23px] w-full px-4 py-[11px]' : 'ml-[-30px] w-[66%] px-3 py-2'} flex-col rounded-[20px] border-t-[1px] border-grey-50 bg-white md:ml-0 md:mt-[-140px] md:min-h-[255px] md:w-full md:px-4 md:pb-5 md:pt-4 lg:mt-[-139px]`}
      >
        <div className='mb-2 flex gap-2 md:mb-4 lg:mb-3'>
          <div className='flex max-h-[28px] items-center justify-center gap-1 rounded-[40px] bg-blue-50 px-3 py-2 md:max-h-[32px]'>
            <SvgSprite name='fire' width={16} />
            <Typography variant='s' className='text-grey-950 md:text-[16px]'>
              Впечатления
            </Typography>
          </div>
          <div className='flex max-h-[28px] items-center justify-center gap-1 rounded-[40px] bg-blue-50 px-3 py-2 md:max-h-[32px]'>
            <Typography variant='s' className='text-grey-950 md:text-[16px]'>
              Турция
            </Typography>
          </div>
        </div>

        <Typography
          variant='m-bold'
          className='mb-2 line-clamp-2 leading-[22px] md:mb-4 md:text-[24px] md:font-semibold md:leading-8 lg:text-[24px]'
        >
          Что посмотреть и куда сходить в Стамбуле бесплатно
        </Typography>
        <Typography
          variant='s'
          className='mb-2 line-clamp-2 block md:mb-4 md:text-[16px]'
        >
          Как путешественнику получить классные впечатления и не потратить деньги.
        </Typography>

        <div className='mt-auto flex items-center justify-between md:justify-between md:gap-0'>
          <div className='flex items-center gap-[10px]'>
            <div className='flex max-h-[20px] items-center justify-center gap-1 rounded-[20px] bg-grey-50 px-1 py-1 md:max-h-[28px] md:px-2 md:py-2'>
              <img src='/like-yellow.png' alt='Иконка лайка' />
              <Typography variant='xs' className='text-grey-950 md:text-[13px]'>
                203
              </Typography>
            </div>
            <div className='flex max-h-[20px] items-center justify-center gap-1 rounded-[20px] bg-grey-50 px-1 py-1 md:max-h-[28px] md:px-2 md:py-2'>
              <img src='/heart-eyes.png' alt='Иконка heart-eyes' />
              <Typography variant='xs' className='text-grey-950 md:text-[13px]'>
                62
              </Typography>
            </div>
            <div className='flex max-h-[20px] items-center justify-center gap-1 rounded-[20px] bg-grey-50 px-1 py-1 md:max-h-[28px] md:px-2 md:py-2'>
              <img src='/fire.png' alt='Иконка огонька' />
              <Typography variant='xs' className='text-grey-950 md:text-[13px]'>
                9
              </Typography>
            </div>
            <div className='flex max-h-[20px] items-center justify-center gap-1 rounded-[20px] bg-grey-50 px-1 py-1 md:max-h-[28px] md:px-2 md:py-2'>
              <SvgSprite name='comments' width={9} />
              <Typography variant='xs' className='text-grey-950 md:text-[13px]'>
                100
              </Typography>
            </div>
          </div>
          <div className='flex justify-center self-end'>
            <div className='flex items-end justify-center gap-[1px]'>
              <SvgSprite name='eye' color='#676767' width={10} height={10} />
              <span className='text-[8px] leading-[10px] text-grey-800 md:text-[11px]'>
                5.8K
              </span>
              {/* <Typography variant='m' className='text-[8px] text-grey-800 md:text-[11px]'>
                5.8K
              </Typography> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
