import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { DiscountOffers } from '@/widgets/discount-offers';

const testData = {
  name: 'Констанция',
  level: 2,
  numberOfTrips: 13,
  discount: 7,
  balance: 400,
};

export function LoyaltyProgram() {
  return (
    <div className='relative'>
      <section className='container pb-10 md:pb-4 lg:pb-[60px]'>
        <div className='absolute left-0 top-0 z-[-1] h-[213px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[339px] md:rounded-bl-[100px] md:rounded-br-[100px] md:bg-[url("/admin-panel-tourist-bg960.svg")] lg:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>
        <div className='mb-[-18px] flex md:mb-12 md:pl-[52px] md:pt-[52px] lg:mb-10 lg:pl-0 lg:pt-[48px]'>
          <Typography
            variant='h1'
            className='pt-[30px] text-[32px] font-semibold leading-9 text-white md:pt-0 md:text-[40px] md:font-medium md:leading-[52px] lg:text-6xl'
          >
            Программа Лояльности
          </Typography>
          <img
            src='/frog_with_purse.png'
            alt='frog_with_purse'
            className='h-[140px] w-[145px] pr-4 md:hidden'
          />
        </div>
        <div className='flex gap-5 lg:gap-8'>
          <div className='flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-xl md:gap-[32px] md:pb-[34px] lg:max-w-[860px] lg:pb-[40px]'>
            <Typography
              variant='h2'
              className='text-[20px] font-semibold leading-[30px] md:mb-[34px] md:text-[28px] md:font-medium md:leading-8 lg:mb-10 lg:text-[40px] lg:leading-[52px]'
            >
              {testData.name}, ты путешественник 2 уровня
            </Typography>
            <div className='flex gap-16 md:pl-[25px] lg:mb-[-16px] lg:gap-[26px] lg:pl-5'>
              <img
                src='/frog_with_purse.png'
                alt='frog_with_purse'
                className='hidden h-[268px] w-[286px] md:block lg:h-[314px] lg:w-[344px]'
              />
              <div className='flex flex-col gap-2 lg:max-w-[396px]'>
                <ul className='flex flex-wrap gap-x-2 gap-y-5 rounded-[20px] bg-blue-50 px-2 py-5 md:gap-5 md:px-[30px] md:pb-[28px] md:pl-9 lg:gap-4 lg:py-3 lg:pb-5 lg:pl-[38px]'>
                  {Array(18)
                    .fill(null)
                    .map((_, index) => (
                      <li key={index}>
                        <SvgSprite
                          name='airplane'
                          width={20}
                          height={20}
                          strokeWidth={0}
                          color={
                            index < testData.numberOfTrips ? '#4757ea' : '#9e9e9e'
                          }
                          className='stroke-none md:h-[35px] md:w-[35px] lg:h-[40px] lg:w-[41px]'
                        />
                      </li>
                    ))}
                </ul>
                <Typography variant='m' className='lg:text-[20px] lg:leading-8'>
                  Еще через {18 - testData.numberOfTrips} поездок ты станешь
                  путешественником 3 уровня и получите скидку в {testData.discount}%
                  на избранные предложения
                </Typography>
              </div>
            </div>
            <div className='flex flex-col gap-2 md:gap-4 md:pl-[20px] lg:gap-2'>
              <Typography
                variant='h2'
                className='text-[21px] font-semibold leading-[30px] md:text-2xl md:font-medium lg:text-[32px] lg:leading-[40px]'
              >
                Получайте бонусы за поездки и отзывы. Обменивайте их на скидку.
              </Typography>
              <Typography variant='m' className='lg:text-[20px] lg:leading-8'>
                Бонус за поездку — 3% от стоимости тура или отеля. <br /> Бонус за
                комментарий — 2 бонуса за каждый комментарий + по 1 бонусу за каждые
                10 👍 вашему комментарию. Это будет означать, что другие
                путешественники считают его полезным. <br /> Бонус за статью в блоге
                — 5 бонусов за статью + по 1 бонусу за каждые 10 👍
              </Typography>
            </div>
            <div className='flex flex-col gap-5 md:flex-row md:justify-between md:pl-5 lg:pr-6'>
              <Typography
                variant='h2'
                className='text-[20px] font-semibold leading-[30px] md:pt-2 md:text-2xl md:font-medium lg:pt-3 lg:text-[32px] lg:leading-[40px]'
              >
                У тебя на счету {testData.balance} бонусов
              </Typography>
              <ButtonCustom
                className='w-full md:w-max md:px-7 md:py-3 lg:py-4'
                variant='primary'
                size='s'
              >
                <Typography
                  variant='m'
                  className='md:text-[20px] md:font-medium md:leading-8'
                >
                  Потратить
                </Typography>
              </ButtonCustom>
            </div>
          </div>
          <DiscountOffers className='hidden lg:block' />
        </div>
      </section>
    </div>
  );
}
