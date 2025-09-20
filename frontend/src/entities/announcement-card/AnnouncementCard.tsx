import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';

export const AnnouncementCard: React.FC = () => {
  return (
    <div
      className='relative flex-row items-center justify-between rounded-[20px] bg-blue-50 p-4 pt-[14px] md:flex md:h-[212px] md:px-[60px] md:pr-0'
      key='announcement'
    >
      <div className='flex flex-col justify-center gap-[6px] rounded-xl text-center md:items-start md:gap-4 md:text-left'>
        <Typography
          variant='h3'
          className='text-left text-xl text-blue-950 md:text-xl lg:text-[25px]'
        >
          Скидка 10% на первую поездку
        </Typography>
        <ButtonCustom
          type='button'
          variant='wzhuh'
          size='s'
          className='text-md h-[58px] w-full !border-0 !p-[7px] font-bold text-white md:max-w-[199px] md:text-white lg:max-w-[220px] lg:!py-4 lg:text-lg'
        >
          Узнать подробнее
        </ButtonCustom>
      </div>

      <div className='absolute bottom-0 right-0 hidden md:block'>
        <img
          src='famous-tourists-sights.png'
          alt='famous-tourists-sights'
          className='h-auto max-w-full object-contain'
        />
      </div>
    </div>
  );
};
