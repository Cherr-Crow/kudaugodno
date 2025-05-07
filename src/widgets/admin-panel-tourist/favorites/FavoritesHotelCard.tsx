import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

export function FavoritesHotelCard() {
  return (
    <div className='rounded-[20px] bg-white lg:max-w-[899px]'>
      <Typography
        variant='subtitle4'
        className='mb-4 block font-medium md:mb-3 lg:mb-3'
      >
        Анталия
      </Typography>

      <div className='w-full rounded-[20px] md:flex md:shadow-lg'>
        <div className='relative h-[216px] rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 md:h-auto md:w-[90%] md:rounded-bl-[20px] md:rounded-tl-[20px] md:rounded-tr-none lg:min-w-[340px]'>
          <button className='absolute left-4 top-[calc((100%-44px)/2)] hidden h-[44px] w-[44px] rounded-full bg-white opacity-60 transition-opacity hover:opacity-70 focus:opacity-70 focus:outline-none focus-visible:opacity-70 focus-visible:outline-none active:opacity-80 md:flex md:items-center md:justify-center'>
            <SvgSprite
              name={'arrow'}
              height={25}
              color='#4757EA'
              className='rotate-180 transform'
            />
          </button>
          <img
            className='h-full w-full rounded-tl-[20px] rounded-tr-[20px] md:rounded-bl-[20px] md:rounded-tl-[20px] md:rounded-tr-none'
            src='/admin-panel-tourist-tour.jpg'
            alt='Фото'
          />
          <button className='absolute right-8 top-[calc((100%-44px)/2)] hidden h-[44px] w-[44px] rounded-full bg-white opacity-60 transition-opacity hover:opacity-70 focus:opacity-70 focus:outline-none focus-visible:opacity-70 focus-visible:outline-none active:opacity-80 md:flex md:items-center md:justify-center'>
            <SvgSprite name={'arrow'} height={25} color='#4757EA' />
          </button>
          <div className='absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white opacity-60 md:hidden'>
            <SvgSprite name='heart-outline' width={24} height={24} />
          </div>
        </div>

        <div className='z-2 relative mt-[-49px] rounded-[20px] bg-white px-4 py-4 shadow-lg md:ml-[-15px] md:mt-0 md:w-full md:border-t-2 md:border-grey-100 md:px-6 md:py-4 lg:pb-4'>
          <div className='mb-4 flex justify-between md:mb-3 lg:mb-4'>
            <div>
              <div className='mb-1 md:mb-2'>
                <Rating category={3} starSize={16} gap={2} />
              </div>
              <Typography
                variant='m-bold'
                className='block md:mb-3 md:text-[20px] lg:mb-3'
              >
                Norke Варшавская
              </Typography>
              <Typography
                variant='m'
                className='hidden text-blue-950 md:mb-2 md:block lg:mb-1'
              >
                Москва
              </Typography>
              <Typography
                variant='s'
                className='mb-1 block text-grey-700 md:mb-0 md:text-[16px]'
              >
                11.1 км&nbsp;от&nbsp;центра
              </Typography>
              <Typography variant='s' className='block text-grey-700 md:text-[16px]'>
                491 м&nbsp;от&nbsp;метро Варшавская
              </Typography>
            </div>
            <div className='md:flex md:max-h-[44px] md:items-center md:gap-3'>
              <a
                href='#'
                className='hidden text-blue-700 transition-colors hover:text-blue-400 focus:text-blue-400 focus:outline-none focus-visible:text-blue-400 focus-visible:outline-none active:text-blue-900 md:block'
              >
                <Typography variant='m' className=''>
                  23 отзыва
                </Typography>
              </a>
              <div className='flex h-[44px] items-center justify-center rounded-[8px] bg-[#C7F85E] px-3'>
                <Typography variant='m-bold'>8.7</Typography>
              </div>
              <div className='hidden h-12 w-12 items-center justify-center rounded-full bg-blue-50 md:flex'>
                <SvgSprite name='heart-outline' width={24} height={24} />
              </div>
            </div>
          </div>

          <div className='hidden md:mb-5 md:flex md:gap-2 lg:mb-4'>
            <div className='flex items-center justify-between rounded-xl bg-grey-50 px-3 py-2'>
              <Typography variant='m'>Wi-Fi</Typography>
            </div>
            <div className='flex items-center justify-between rounded-xl bg-grey-50 px-3 py-2'>
              <Typography variant='m'>Вид на&nbsp;море</Typography>
            </div>
            <div className='flex items-center justify-between rounded-xl bg-grey-50 px-3 py-2'>
              <Typography variant='m'>Парковка</Typography>
            </div>
          </div>

          <div className='flex rounded-lg bg-blue-50 px-3 py-1 md:px-4 md:py-3 md:pr-6 lg:pb-2'>
            <div className='mr-auto'>
              <Typography variant='s' className='block text-blue-950'>
                Питание: не&nbsp;включено
              </Typography>
              <Typography variant='s' className='block text-blue-950'>
                Удобства на&nbsp;этаже
              </Typography>
            </div>
            <div>
              <Typography
                variant='m-bold'
                className='block text-blue-600 md:text-[20px] lg:mb-1'
              >
                12&nbsp;500&nbsp;₽
              </Typography>
              <Typography variant='s' className='block text-grey-700'>
                3&nbsp;ночи 2&nbsp;гостя
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
