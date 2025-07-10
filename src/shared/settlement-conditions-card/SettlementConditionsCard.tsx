import { ISettlementConditionsCard } from './SettlementConditionsCard.types';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';

export function SettlementConditionsCard({
  check_in_time,
  check_out_time,
  onShowModal,
}: ISettlementConditionsCard) {
  return (
    <div className='flex-1 flex-col rounded-[20px] border border-grey-100 p-[18px] pb-[26px] text-blue-950 shadow-md md:max-w-[253px] lg:max-w-none'>
      <div className='mb-1 flex gap-1 md:mb-3 md:flex-col md:gap-2 lg:mb-4 lg:gap-[6px]'>
        <SvgSprite
          name='amenity-check-in'
          strokeWidth={2}
          className='w-7 text-blue-700 md:h-8 md:w-9'
        />
        <Typography
          variant='m-bold'
          className='font-semibold md:text-[18px] lg:text-[20px] lg:font-medium'
        >
          Условия заселения
        </Typography>
      </div>

      <Typography
        variant='m'
        className='text-gray-600 block md:mb-1 md:text-[18px] lg:mb-3 lg:text-[20px]'
      >
        Заселение с {check_in_time.slice(0, 5)}
      </Typography>
      <Typography
        variant='m'
        className='text-gray-600 mb-3 block leading-4 md:mb-5 md:text-[18px] lg:mb-7 lg:text-[20px]'
      >
        Выезд до {check_out_time.slice(0, 5)}
      </Typography>

      <button
        className='items-top flex cursor-pointer gap-1 text-blue-700'
        onClick={onShowModal}
      >
        <Typography variant='m' className='md:text-[18px] lg:text-[20px]'>
          Подробнее
        </Typography>
        <SvgSprite
          name='arrow'
          width={26}
          className='transition-transform duration-200 group-hover:translate-x-1 md:h-7 md:w-7'
        />
      </button>
    </div>
  );
}
