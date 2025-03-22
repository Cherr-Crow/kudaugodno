import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

interface TripCardProps {
  type: string;
}

export function TripCard({ type }: TripCardProps) {
  return (
    <div className='rounded-[20px] bg-white shadow-lg md:flex md:flex-row-reverse md:border-[1px] md:border-grey-100'>
      <div className='relative h-[216px] rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 md:h-auto md:w-[60%] md:rounded-[20px] lg:min-w-[340px]'>
        <img
          className='h-full w-full rounded-tl-[20px] rounded-tr-[20px] md:rounded-[20px]'
          src='/admin-panel-tourist-tour.jpg'
          alt='Фото'
        />
        <div className='absolute left-4 top-4 flex items-center rounded-[20px] bg-white px-3 py-2 md:left-6 lg:left-7'>
          <div className='mr-2 h-8 w-8 rounded-full bg-yellow-primary md:h-6 md:w-6 lg:h-8 lg:w-8'></div>
          <Typography variant='m-bold' className='lg:text-[20px]'>
            Ожидает подтверждения
          </Typography>
        </div>
      </div>

      <div className='z-2 relative mt-[-20px] rounded-[20px] bg-white px-4 py-4 md:mt-0 md:w-full md:px-5 md:py-5 md:pb-6 md:pr-10 lg:min-w-[562px] lg:pb-4 lg:pt-6'>
        <div className='mb-5 flex justify-between md:mb-10 lg:mb-10'>
          <div>
            <Typography
              variant='m-bold'
              className='mb-1 block md:mb-4 md:text-[20px] md:font-medium lg:mb-4 lg:text-[24px]'
            >
              Тур в Африку
            </Typography>
            <Typography variant='s' className='text-grey-950 lg:text-[13px]'>
              №123456789
            </Typography>
          </div>
          {type === 'active' ? (
            <button className='h-fit w-fit rounded-full bg-blue-200 px-4 py-2 text-[13px] font-medium hover:bg-blue-100 hover:shadow-lg active:bg-blue-400 md:px-6 md:py-4 md:text-[18px] lg:px-9 lg:text-[20px]'>
              Связаться с туроператором
            </button>
          ) : (
            <button className='h-fit w-fit rounded-full bg-blue-200 px-4 py-2 text-[13px] font-medium hover:bg-blue-100 hover:shadow-lg active:bg-blue-400 md:px-6 md:py-4 md:text-[18px] lg:px-9 lg:text-[20px]'>
              Оставить отзыв
            </button>
          )}
        </div>

        <div className='mb-5 md:flex lg:mb-7'>
          <div className='mb-4 md:mr-16'>
            <Typography
              variant='m'
              className='mb-2 block text-grey-950 md:text-[13px] md:font-normal lg:text-[16px]'
            >
              2 гостя
            </Typography>
            <Typography
              variant='l-bold'
              className='md:text-[16px] md:font-medium lg:text-[20px]'
            >
              23.10–28.10
            </Typography>
          </div>
          <div className='mb-4 md:mr-24'>
            <Typography
              variant='m'
              className='mb-2 block text-grey-950 md:text-[13px] md:font-normal lg:text-[16px]'
            >
              Отель
            </Typography>
            <Typography
              variant='l-bold'
              className='md:text-[16px] md:font-medium lg:text-[20px]'
            >
              Super puper hotel
            </Typography>
          </div>
          <div>
            <Typography
              variant='m'
              className='mb-2 block text-grey-950 md:text-[13px] md:font-normal lg:text-[16px]'
            >
              Турфирма
            </Typography>
            <Typography
              variant='l-bold'
              className='md:text-[16px] md:font-medium lg:text-[20px]'
            >
              Tess tour
            </Typography>
          </div>
        </div>

        <div className='md:flex md:items-center md:justify-between'>
          <div className='mb-5 md:mb-0 md:max-w-[166px]'>
            <Typography
              variant='m'
              className='mb-2 block text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]'
            >
              Страна, город
            </Typography>
            <Typography
              variant='l-bold'
              className='md:text-[16px] md:font-medium md:leading-3 lg:text-[20px] lg:leading-8'
            >
              ЮАР: Кейптаун, Йоханнесбург
            </Typography>
          </div>
          <ButtonCustom
            variant='secondary'
            size='s'
            className='w-full font-medium md:w-auto md:self-end md:text-[20px] lg:px-8 lg:py-5'
          >
            Документы по туру
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
