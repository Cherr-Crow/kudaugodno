'use client';

import React, { useEffect, useState, useRef } from 'react';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { timeForComponent } from '@/shared/ui/time-for-component/time';

import { IAuthpage } from './Authpage.types';

export function Authpage({}: IAuthpage) {
  const [showCodePanel, setShowCodePanel] = useState<boolean>(false);
  const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(45);
  const [startTimer, setStartTimer] = useState<boolean>(false);

  const [input1, setInput1] = useState<string>('');
  const [input2, setInput2] = useState<string>('');
  const [input3, setInput3] = useState<string>('');
  const [input4, setInput4] = useState<string>('');

  const [email, setEmail] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const inputRef2 = useRef<HTMLInputElement>(null);
  const inputRef3 = useRef<HTMLInputElement>(null);
  const inputRef4 = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    if (isEmailValid && email !== '') {
      setShowCodePanel(true);
      setShowBackArrow(true);
      setStartTimer(true);
      setSeconds(45);
    }
  };

  const handleClickBack = () => {
    setShowCodePanel(false);
    setShowBackArrow(false);
  };

  useEffect(() => {
    if (!startTimer) return;
    if (seconds === 0) {
      setStartTimer(false);
      return;
    }

    const i = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [startTimer, seconds]);

  const handleSentNewCode = () => {
    console.log('Прислать новый код');
    setSeconds(45);
    setStartTimer(true);
  };

  function emailValid(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  const handleFocusForInput2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumberForFocusChenge(e.target.value)) {
      setInput1(onlyNumber(e.target.value));
      inputRef2.current?.focus();
    }
  };
  const handleFocusForInput3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumberForFocusChenge(e.target.value)) {
      setInput2(onlyNumber(e.target.value));
      inputRef3.current?.focus();
    }
  };
  const handleFocusForInput4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onlyNumberForFocusChenge(e.target.value)) {
      setInput3(onlyNumber(e.target.value));
      inputRef4.current?.focus();
    }
  };
  const handleDataToServer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput4(onlyNumber(e.target.value));
  };

  const codeForAuth = {
    input1,
    input2,
    input3,
    input4,
  };

  const codeForAuthArr = [+input1, +input2, input3, input4];

  useEffect(() => {
    if (input1 !== '' && input2 !== '' && input3 !== '' && input4 !== '') {
      setTimeout(() => {
        if (codeForAuth.input4 !== '') {
          setInput1('');
          setInput2('');
          setInput3('');
          setInput4('');
          console.log('Поехали! на сервер объектом:', codeForAuth);
          console.log('Поехали! на сервер массивом:', codeForAuthArr);
        }
      }, 500);
    }
  }, [input1, input2, input3, input4]);

  function onlyNumber(text: string) {
    const regex = new RegExp('^[0-9]$');
    if (regex.test(text)) {
      return text;
    } else {
      return '';
    }
  }

  function onlyNumberForFocusChenge(text: string) {
    const regex = new RegExp('^[0-9]$');
    if (regex.test(text) || text === '') {
      return true;
    } else {
      return false;
    }
  }

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
                  className='text-nowrap text-lg font-semibold text-grey-950 md:mb-[7px] md:block lg:text-[20px]'
                />

                <label htmlFor='email' className='mb-[25px] block'>
                  <input
                    id='email'
                    className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                    type='email'
                    name='email'
                    placeholder='example@mail.com'
                    onBlur={() => {
                      emailValid(email);
                    }}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </label>
                {!isEmailValid && (
                  <Typography
                    children='Некорректный адрес почты'
                    className='mb-[5px] mt-[-16px] block text-nowrap text-[19px] font-normal text-red-primary-800 md:text-[18px] lg:text-[20px]'
                  />
                )}
                {!startTimer ? (
                  <ButtonCustom
                    type='button'
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
                  type='button'
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
                  type='button'
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
                  type='button'
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
                      autoFocus
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                      onChange={handleFocusForInput2}
                      value={input1}
                    />
                  </label>
                  <label htmlFor='' className='block'>
                    <input
                      ref={inputRef2}
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                      onChange={handleFocusForInput3}
                      value={input2}
                    />
                  </label>
                  <label htmlFor='' className='block'>
                    <input
                      ref={inputRef3}
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                      onChange={handleFocusForInput4}
                      value={input3}
                    />
                  </label>
                  <label htmlFor='' className='block'>
                    <input
                      ref={inputRef4}
                      className='h-[75px] w-[75px] rounded-[8px] bg-blue-200 px-[15px] text-center text-[20px] text-grey-950 md:h-[81px] md:w-[65px]'
                      type='text'
                      placeholder=''
                      onChange={handleDataToServer}
                      value={input4}
                    />
                  </label>
                </div>
              </form>

              {/* <Typography children='Неверный код, попробуйте ещё раз' className='block text-red-primary-800 font-normal text-[19px] mb-[15px] md:mb-[24px] lg:mb-[25px] md:text-[18px] lg:text-[20px] text-nowrap' /> */}

              {!startTimer ? (
                <ButtonCustom
                  type='button'
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
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
