import React from 'react';

import { AuthForBusiness } from '@/widgets/auth-for-business';
import { Reviews } from '@/widgets/reviews';

import { IBusinessRegister } from './BusinessRegister.types';
import { SvgSprite } from '../../shared/ui/svg-sprite';
import { Typography } from '../../shared/ui/typography';

export function BusinessRegister({}: IBusinessRegister) {
  return (
    <section className='relative flex flex-col gap-[39px] md:gap-0'>
      <div className='container'>
        {/* Фон хэдера */}
        <div className='absolute left-0 top-0 z-[-1] h-[218px] w-full bg-[url("/about-us-hero-bg375.png")] bg-cover bg-no-repeat md:h-[378px] md:rounded-b-[100px] md:bg-[url("/about-us-hero-bg960.png")] lg:h-[452px] lg:bg-[url("/about-us-hero-bg1440.png")] lg:bg-[-12px_0px]'></div>
        {/* Хэдер */}
        <div className='flex flex-col items-center pt-[40px] text-center md:pt-[72px] lg:pt-[95px]'>
          <Typography
            variant='h1'
            className='mb-1 w-[80%] text-[30px] tracking-wider text-white md:mb-[22px] md:w-full md:text-[38px] md:tracking-[0.045em] lg:mb-[22px] lg:text-[62px] lg:tracking-[0.001em]'
          >
            Привлекайте новых гостей
          </Typography>
          <Typography
            variant='m'
            className='mb-5 text-[24px] font-normal tracking-[0.005em] text-white md:mb-[52px] md:max-w-[580px] md:text-[32px] md:leading-[2.7rem] md:tracking-[0.001em] lg:mb-[63px]'
          >
            Зарегистрируйтесь и получайте больше бронирований!
          </Typography>
          {/* Фото под хэдером */}
          <ul className='flex h-[128px] flex-row flex-nowrap items-center gap-3 md:h-[272px] md:gap-5'>
            {[1, 2, 3, 4].map((item, index) => (
              <li
                key={item}
                className={`mt-[19px] h-[120px] w-[375px] overflow-hidden rounded-b-2xl rounded-t-none md:h-full md:w-[253px] md:rounded-[40px] lg:rounded-[40px] ${item === 2 ? 'block' : 'hidden'} ${item === 1 && 'md:block'} ${item === 3 && 'md:block'} ${item === 4 && 'lg:block'} lg:rounded-4xl md:h-[206px] lg:w-[280px]`}
              >
                <img
                  src={`about-us-hero-pic${index + 1}.png`}
                  className={`h-full w-full object-cover ${
                    item === 2
                      ? 'object-[center_-84px] md:!object-center'
                      : 'object-center'
                  }`}
                  alt={`about-us-hero-pic${item}`}
                />
              </li>
            ))}
          </ul>
        </div>

        {/* Карточки */}
        <div className='cards mx-auto'>
          <Typography
            variant='h2'
            className='mb-[18px] mt-[47px] w-[90%] text-[20px] font-bold leading-tight tracking-[0.02em] text-blue-950 md:mb-5 md:mt-[50px] md:w-[100%] md:text-center md:text-[28px] md:tracking-[0.015em] lg:mb-[29px] lg:text-[36px] lg:tracking-[0.015em]'
          >
            Доступ к уникальной аудитории и экономия времени
          </Typography>

          <div className='grid grid-cols-1 gap-5 md:grid-cols-3 md:gap-5'>
            {/* Карточка 1 */}
            <div className='flex min-h-[190px] w-full flex-col rounded-3xl bg-white p-6 shadow-[0_10px_20px_rgba(26,31,74,0.25)] md:h-full md:pb-8 lg:p-6'>
              <div className='mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-50 md:mb-3 md:h-[52px] md:w-[52px] lg:mb-3'>
                <SvgSprite name='check-mark' width={26} />
              </div>
              <Typography className='text-md mb-3 font-bold leading-snug text-green-950 md:mb-[10px] md:text-2xl md:leading-tight'>
                Продавайте на своих условиях
              </Typography>
              <Typography className='w-[85%] text-sm leading-relaxed tracking-wider text-grey-800 md:w-full'>
                Настраивайте условия тарифов и получайте выплаты как удобно вам
              </Typography>
            </div>

            {/* Карточка 2 */}
            <div className='flex min-h-[190px] w-full flex-col rounded-3xl bg-white p-6 shadow-[0_10px_20px_rgba(26,31,74,0.25)] md:h-full lg:p-6'>
              <div className='mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-50 md:mb-3 md:h-[52px] md:w-[52px] lg:mb-3'>
                <SvgSprite name='check-mark' width={26} />
              </div>
              <Typography className='text-md mb-3 w-[55%] font-bold leading-snug text-green-950 md:mb-[8px] md:w-[100%] md:text-2xl md:leading-tight'>
                Управляйте ценами и доступностью
              </Typography>
              <Typography className='w-[85%] text-sm leading-6 tracking-widest text-grey-800 md:w-full'>
                Контролируйте заказы, цены и доступность напрямую в профиле
              </Typography>
            </div>

            {/* Карточка 3 */}
            <div className='flex min-h-[190px] w-full flex-col rounded-3xl bg-white p-6 shadow-[0_10px_20px_rgba(26,31,74,0.25)] md:h-full lg:p-6'>
              <div className='mb-3 flex h-[52px] w-[52px] items-center justify-center rounded-lg bg-blue-50 md:mb-3 md:h-[52px] md:w-[52px] lg:mb-3'>
                <SvgSprite name='check-mark' width={26} />
              </div>
              <Typography className='text-md mb-3 font-bold leading-snug text-green-950 md:text-2xl md:leading-tight'>
                Низкий процент отмен
              </Typography>
              <Typography className='text-sm leading-relaxed tracking-widest text-grey-800 md:w-full'>
                С нашим сервисом вы можете надёжно планировать свою загрузку
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className='md:mb-[38px] lg:mb-[39px]'>
        <Reviews className='gap-0 md:-mt-[14px] md:h-[620px] md:gap-6 lg:-mt-0 lg:gap-4'>
          <Typography
            variant='h4'
            className='mt-[25px] font-extrabold leading-[20px] tracking-[0.01em] md:-mt-3 md:text-[44px] md:leading-[52px] md:tracking-[0.04em] lg:-mt-6 lg:text-[44px] lg:tracking-[0.04em]'
          >
            120 000 + туристов
          </Typography>
          <Typography
            variant='m'
            className='-mt-[5px] leading-[18px] tracking-[0.001em] md:text-[32px] lg:text-[32px] lg:leading-9'
          >
            увидят ваш объект размещения
          </Typography>
        </Reviews>
      </div>
      <AuthForBusiness />
    </section>
  );
}
