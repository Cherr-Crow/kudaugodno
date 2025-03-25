import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

export function MyArticles() {
  return (
    <div className='flex w-full rounded-[20px] shadow-lg md:max-w-[calc((100%-32px)/2)] md:flex-col lg:max-w-[calc((100%-32px)/3)]'>
      <div className='md:rounded-bl-0 h-[191px] w-[40%] rounded-bl-[20px] rounded-tl-[20px] bg-grey-50 md:h-auto md:w-full md:rounded-tr-[20px] lg:min-w-[340px]'>
        <img
          className='md:rounded-bl-0 h-full w-full rounded-bl-[20px] rounded-tl-[20px] md:rounded-tr-[20px]'
          src='/admin-panel-tourist-article.jpg'
          alt='Фото'
        />
      </div>

      <div className='z-2 ml-[-30px] flex w-[66%] flex-col rounded-[20px] border-t-[1px] border-grey-50 bg-white px-3 py-2 md:ml-0 md:mt-[-140px] md:min-h-[255px] md:w-full md:px-4 md:py-4 md:pb-6 lg:mt-[-114px]'>
        <div className='mb-2 flex gap-2 md:mb-3'>
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
          className='mb-1 line-clamp-2 md:mb-4 md:text-[20px] lg:text-[24px] lg:leading-7'
        >
          Что посмотреть и куда сходить в Стамбуле бесплатно
        </Typography>
        <Typography variant='s' className='line-clamp-2 md:text-[16px]'>
          Как путешественнику получить классные впечатления и не потратить деньги.
        </Typography>

        <div className='mt-auto flex items-center justify-center gap-2 md:justify-between md:gap-0'>
          <div className='flex items-center justify-center gap-2 md:gap-2'>
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
          </div>
          <div className='flex items-center justify-center gap-2 md:gap-4'>
            <div className='flex max-h-[20px] items-center justify-center gap-1 rounded-[20px] bg-grey-50 px-1 py-1 md:max-h-[28px] md:px-2 md:py-2'>
              <SvgSprite name='comments' width={9} />
              <Typography variant='xs' className='text-grey-950 md:text-[13px]'>
                100
              </Typography>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <SvgSprite name='eye' color='#676767' />
              <Typography className='text-[8px] text-grey-800 md:text-[11px]'>
                5.8K
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
