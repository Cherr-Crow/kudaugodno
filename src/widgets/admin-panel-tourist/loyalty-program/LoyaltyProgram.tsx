import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

const testData = {
  name: 'Константа',
  level: 2,
  numberOfTrips: 13,
  discount: 7,
  balance: 400,
};

export function LoyaltyProgram() {
  return (
    <section className='relative overflow-hidden pb-10 pt-9 md:static md:pb-36 md:pt-8 xl:pb-20 xl:pt-12'>
      <div className='absolute left-0 top-0 z-[-1] h-[213px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[427px] md:rounded-bl-[100px] md:rounded-br-none md:bg-[url("/admin-panel-tourist-bg960.svg")] xl:md:rounded-br-[100px] xl:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>
      <div className='container'>
        <Typography
          variant='h1'
          className='mb-[24px] text-[32px] font-semibold leading-9 text-white md:mb-7 md:text-[2.50rem] md:leading-[130%] xl:mb-10 xl:text-6xl'
        >
          Программа Лояльности {testData.balance}
        </Typography>
        <div className='relative flex flex-col items-center rounded-2xl bg-white p-5 shadow-xl md:p-5 xl:px-48 xl:py-10'>
          <div className='absolute -top-[140%] right-[20px]'>
            <SvgSprite name='frog-with-purse' />
          </div>
          <ButtonCustom
            className='w-full md:max-w-[9.50rem] md:px-7 md:py-3 xl:px-7 xl:py-5'
            variant='primary'
            size='s'
          >
            Потратить
          </ButtonCustom>
        </div>
      </div>
    </section>
  );
}
