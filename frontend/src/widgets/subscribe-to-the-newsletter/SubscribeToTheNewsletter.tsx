'use client';

import React, { useState } from 'react';

import { useSendMailingMutation } from '@/servicesApi/subscribeApi';
import { ButtonCustom } from '@/shared/ui/button-custom/ButtonCustom';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';

import { ISubscribeToTheNewsletter } from './SubscribeToTheNewsletter.types';

export function SubscribeToTheNewsletter({}: ISubscribeToTheNewsletter) {
  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [sendMailing, { isLoading }] = useSendMailingMutation();

  const { showToast } = useToast();

  function emailValid(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setIsEmailValid(emailRegex.test(email));
  }

  const handleClick = async () => {
    emailValid(email);
    if (isEmailValid && email !== '') {
      try {
        await sendMailing({ email, mailing: true }).unwrap();
        showToast('Спасибо за подписку!', 'success');
        setEmail('');
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <section>
      <div
        className='min-h-[315px] rounded-t-3xl bg-cover bg-no-repeat pb-4 pt-5 md:rounded-t-[40px] md:pb-[78px] md:pt-[100px] lg:px-[5%] lg:pb-[65px] lg:pt-[93px]'
        style={{ backgroundImage: `url('/subsimg.jpg')` }}
      >
        <div className='container'>
          <Typography
            variant='l'
            className='font-grey-950 mb-2 block tracking-wider text-white md:mb-6 md:text-[41px] md:font-medium lg:mb-6 lg:text-[40px] lg:tracking-wide'
          >
            Новостная рассылка
          </Typography>

          <Typography className='mb-6 block font-normal text-white md:mb-8 md:text-[32px] md:font-thin md:leading-tight md:text-blue-200 lg:mb-8 lg:pr-[0px] lg:text-[32px]'>
            Подпишитесь, чтобы первыми узнавать о новых турах, скидках и промокодах
          </Typography>

          <form
            action=''
            className='order-1 mb-2 flex flex-col md:block'
            onSubmit={(e) => e.preventDefault()}
          >
            <label htmlFor='email' className='order-2 mb-2'>
              <input
                id='email'
                type='email'
                placeholder='Введите вашу почту'
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => emailValid(email)}
                className='h-[55px] w-full rounded-[7px] pl-[15px] text-base font-normal outline-none md:mb-3 md:mr-5 md:w-[79%] md:rounded-[25px] md:pl-[32px] md:text-[18px] lg:h-[70px] lg:w-[80%] lg:rounded-[35px] lg:pl-[30px] lg:text-[20px]'
              />
            </label>

            <ButtonCustom
              onClick={handleClick}
              variant='primary'
              size='m'
              type='button'
              disabled={isLoading}
              className='order-4 h-[70px] w-full px-[35px] py-[7px] md:h-[55px] md:w-[18%] md:px-[3px] lg:h-[70px] lg:w-[15.5%] lg:px-[8px] lg:py-[20px]'
            >
              <Typography className='text-nowrap text-base font-semibold md:text-[16px] md:font-normal lg:text-[20px]'>
                {isLoading ? 'Отправка...' : 'Подписаться'}
              </Typography>
            </ButtonCustom>

            {!isEmailValid && (
              <Typography className='mb-[5px] mt-1 block text-nowrap text-[19px] font-normal text-red-primary-800 md:text-[18px] lg:text-[20px]'>
                Некорректный адрес почты
              </Typography>
            )}

            <Typography className='order-3 mb-4 block font-normal text-white md:order-4 md:text-blue-200'>
              Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных
              данных
            </Typography>
          </form>
        </div>
      </div>
    </section>
  );
}
