'use client';

import React, { useEffect, useState } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

import { IAuthpage } from './Authpage.types';

export function Authpage({}: IAuthpage) {
  const [showCodePanel, setShowCodePanel] = useState<boolean>(false);
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(45);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  // Показать кнопку Прислать новый код, Скрыть Обратный отсчёт
  // const [showButtonNewCode, setShowButtonNewCode] = useState<boolean>(false);

  const handleClick = () => {
    console.log('Привет', showCodePanel);
    setShowCodePanel(true);
    setShowBackArrow(true);
    setStartTimer(true);
    setSeconds(45);
  };

  const handleClickBack = () => {
    console.log('Пока', showCodePanel);
    setShowCodePanel(false);
    setShowBackArrow(false);
  };

  // Таймер

  useEffect(() => {
    if (!startTimer) return;
    // if()
    if (seconds === 0) {
      // setShowButtonNewCode(true);
      setStartTimer(false);
      return;
    }

    const i = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      // if (seconds === 0 ) {
      //   console.log('if (seconds === 0 )')
      //   clearInterval(i);
      // };
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [startTimer, seconds]);

  const handleSentNewCode = () => {
    console.log('Прислать новый код');
    setSeconds(45);
    // setShowButtonNewCode(false);
    setStartTimer(true);
    // setShowBackArrow(false);
  };

  // Ф-я показа времени в нужном формате

  const timeForComponent = (time: number) => {
    if (!time) return;
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60) - hours * 60;
    const seconds = time % 60;

    const formattedWithHours = [
      hours.toString().padStart(2, '0'),
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    const formattedWithouthHours = [
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].join(':');

    return hours >= 1 ? formattedWithHours : formattedWithouthHours;
  };

  return (
    <section className='md:py-[80px]'>
      <div className='mx-auto rounded-[20px] border-blue-700 md:min-h-[640px] md:max-w-[1180px] md:border-[50px]'>
        <div className='relative max-w-[1100px] items-center bg-blue-50 px-2 py-[30px] md:m-[-10px] md:h-[559px] md:rounded-[20px] md:bg-[url("/authback.jpg")]'>
          {showBackArrow && (
            <button
              onClick={handleClickBack}
              className='absolute left-[15px] top-[15px] h-[44px] w-[44px]'
            >
              <SvgSprite name='back-arrow' width={44} height={44} className='' />
            </button>
          )}

          {!showCodePanel ? (
            <div className='mx-auto flex h-[468px] max-w-[540px] flex-col items-center md:pt-[75px] lg:max-w-[580px] lg:pt-[55px]'>
              <Typography className='font-grey-950 mb-[30px] block text-[2rem] text-blue-900 md:mb-[36px] md:text-[40px] md:font-semibold md:text-grey-950 lg:mb-[56px] lg:text-[48px]'>
                Добро пожаловать !
              </Typography>
              <form className='mb-[25px] w-full md:mb-[30px]'>
                <Typography
                  children='Введите e-mail'
                  className='hidden text-nowrap text-lg font-semibold text-grey-950 md:mb-[7px] md:block lg:text-[20px]'
                />

                <label htmlFor='email' className='mb-[25px] block'>
                  <input
                    id='email'
                    className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                    type='email'
                    name='email'
                    placeholder='example@mail.com'
                  />
                </label>

                {!startTimer ? (
                  <ButtonCustom
                    onClick={handleClick}
                    variant='primary'
                    size='m'
                    className='h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:block md:w-auto md:px-[30px] md:py-[11px] lg:py-[20px]'
                  >
                    <Typography
                      children='Получить код'
                      className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'
                    />
                  </ButtonCustom>
                ) : (
                  <Typography className='mb-[15px] block text-nowrap text-[20px] font-normal text-grey-700 md:mb-[21px] md:text-[18px] lg:mb-[28px] lg:text-[20px]'>
                    Запросить новый код через {timeForComponent(seconds)}
                  </Typography>
                )}
              </form>

              <Typography
                children='Другие способы входа'
                className='mb-[15px] block text-nowrap text-base font-semibold text-grey-950 md:mb-[21px] md:text-[18px] lg:mb-[28px] lg:text-[20px]'
              />

              <div className='flex w-[100%] flex-col md:flex-row md:justify-between md:px-[15px] lg:px-[40px]'>
                <ButtonCustom
                  variant='wzhuh'
                  disabled={startTimer}
                  size='m'
                  className='mb-[12px] flex w-full justify-center md:w-[32%] md:py-[18px] lg:py-[12px]'
                >
                  <div className='flex h-5 w-full items-center justify-center gap-2 text-[20px] md:h-9 md:w-28 md:text-[40px] lg:h-12'>
                    <div className='h-[20px] w-[20px]'>
                      <SvgSprite name='google' width={20} color='#fff' />
                    </div>
                    <Typography variant='l-bold' className='text-white'>
                      Google
                    </Typography>
                  </div>
                </ButtonCustom>
                <ButtonCustom
                  variant='wzhuh'
                  disabled={startTimer}
                  size='m'
                  className='mb-[12px] flex w-full justify-center md:w-[32%] md:py-[18px] lg:py-[12px]'
                >
                  <div className='flex h-5 w-full items-center justify-center gap-2 text-[20px] md:h-9 md:w-28 md:text-[40px] lg:h-12'>
                    <div className='h-[20px] w-[20px] pt-[3px]'>
                      <SvgSprite name='vkontakte' width={24} color='#fff' />
                    </div>
                    <Typography variant='l-bold' className='text-white'>
                      Вконтакте
                    </Typography>
                  </div>
                </ButtonCustom>
                <ButtonCustom
                  variant='wzhuh'
                  disabled={startTimer}
                  size='m'
                  className='mb-[12px] flex w-full justify-center md:w-[32%] md:py-[18px] lg:py-[12px]'
                >
                  <div className='flex h-5 w-full items-center justify-center gap-2 text-[20px] md:h-9 md:w-28 md:text-[40px] lg:h-12'>
                    <div className='h-[20px] w-[20px]'>
                      <SvgSprite name='yandex' width={12} color='#fff' />
                    </div>
                    <Typography variant='l-bold' className='text-white'>
                      Яндекс
                    </Typography>
                  </div>
                </ButtonCustom>
              </div>
            </div>
          ) : (
            <div className='mx-auto flex h-[290px] max-w-[390px] flex-col items-center md:pt-[105px] lg:max-w-[580px] lg:pt-[94px]'>
              <Typography className='font-grey-950 mb-[28px] block text-[31px] text-blue-900 md:mb-[40px] md:text-[40px] md:font-semibold md:text-grey-950 lg:mb-[60px] lg:text-[48px]'>
                Добро пожаловать!
              </Typography>
              <form className='mb-[25px] w-full md:mb-[18px]'>
                <Typography
                  children='Введите код из письма'
                  className='mb-[16px] block text-nowrap text-center text-base font-semibold text-grey-950 md:text-[18px] lg:mb-[20px] lg:text-[20px]'
                />
                <div className='flex justify-between md:px-[37px] lg:px-[132px]'>
                  <label htmlFor='' className='block'>
                    <input
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                    />
                  </label>
                  <label htmlFor='' className='block'>
                    <input
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                    />
                  </label>
                  <label htmlFor='' className='block'>
                    <input
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                    />
                  </label>
                  <label htmlFor='' className='block'>
                    <input
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                    />
                  </label>
                </div>
              </form>

              {/* <Typography children='Неверный код, попробуйте ещё раз' className='block text-red-primary-800 font-normal text-[19px] mb-[15px] md:mb-[24px] lg:mb-[25px] md:text-[18px] lg:text-[20px] text-nowrap' /> */}

              {!startTimer ? (
                <ButtonCustom
                  onClick={handleSentNewCode}
                  variant='primary'
                  size='m'
                  className='mt-[25px] h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:block md:w-auto md:px-[30px] md:py-[11px] lg:py-[14px]'
                >
                  <Typography
                    children='Прислать новый код'
                    className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'
                  />
                </ButtonCustom>
              ) : (
                <Typography className='mb-[15px] block text-nowrap text-[20px] font-normal text-grey-700 md:mb-[21px] md:text-[18px] lg:mb-[28px] lg:text-[20px]'>
                  Запросить новый код через {timeForComponent(seconds)}
                </Typography>
              )}

              {/* <div>{seconds}</div> */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
