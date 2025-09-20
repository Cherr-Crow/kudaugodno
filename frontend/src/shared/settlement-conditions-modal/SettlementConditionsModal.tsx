import { ISettlementConditionsModal } from './SettlementConditionsModal.types';
import { Typography } from '../ui/typography';

export function SettlementConditionsModal({
  check_in_time,
  check_out_time,
}: ISettlementConditionsModal) {
  return (
    <div className='px-5 pb-6 pt-[18px] text-blue-950 md:min-w-[800px] md:px-8 md:py-8 lg:min-w-[782px] lg:px-8 lg:pb-8 lg:pt-9'>
      <Typography
        variant='l-bold'
        className='mb-2 block font-semibold md:mb-5 md:text-[24px] lg:mb-6 lg:text-[32px]'
      >
        Условия заселения
      </Typography>

      <div className='flex justify-between'>
        <div className='md:mr-20 lg:mr-16'>
          <Typography
            variant='s-bold'
            className='text-gray-600 block text-nowrap md:text-[16px] lg:mb-0 lg:text-xl'
          >
            Заселение с {check_in_time.slice(0, 5)}
          </Typography>
          <Typography
            variant='s-bold'
            className='text-gray-600 block text-nowrap md:text-[16px] lg:mb-0 lg:text-xl'
          >
            Выезд до {check_out_time.slice(0, 5)}
          </Typography>
        </div>

        <Typography
          variant='s'
          className='max-w-[161px] leading-[1.6] md:mx-auto md:max-w-[370px] md:text-[16px] md:leading-5 lg:text-base lg:leading-7'
        >
          Доступно раннее заселение. Подробности уточните у менеджера.
        </Typography>
      </div>
    </div>
  );
}
