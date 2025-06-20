'use client';

import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { setUserEmail } from '@/rtk/userSlice';
import { useGetCodeMutation } from '@/servicesApi/authApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';

import { IEnterEmailState } from './EnterEmailState.types';
import { OtherWaysToAuth } from './OtherWaysToAuth';

function isRegisterError(
  err: unknown,
): err is { status: number; data: { error: string; register: boolean } } {
  return (
    typeof err === 'object' &&
    err !== null &&
    'status' in err &&
    typeof err.status === 'number' &&
    'data' in err &&
    typeof err.data === 'object' &&
    err.data !== null &&
    'register' in err.data &&
    typeof err.data.register === 'boolean' &&
    'error' in err.data &&
    typeof err.data.error === 'string'
  );
}

export function EnterEmailState({ onEmailConfirmed }: IEnterEmailState) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState<string>('');

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [getCode, { error }] = useGetCodeMutation();

  const fetchAuthCode = async () => {
    try {
      await getCode({ email: email }).unwrap();
      dispatch(setUserEmail(email));
      onEmailConfirmed();
    } catch (err) {
      if (isRegisterError(err)) {
        const { register, error } = err.data;
        if (register === false && error === 'Пользователь не найден') {
          // если при попытке получить код для входа пользователь получает ошибку "Пользователь не найден" и одновременно статус register=false, то диспатчится email и подставляется в таб Регистрация
          dispatch(setUserEmail(email));
          return;
        }
      }
    }
  };

  const handleClick = async () => {
    if (isEmailValid && email !== '') {
      fetchAuthCode();
    }
  };

  function emailValid(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  return (
    <>
      <form className='mb-10 w-full md:mb-[30px] md:flex md:flex-col md:items-center lg:mx-auto lg:mb-[32px] lg:max-w-[581px]'>
        <Typography
          variant='l-bold'
          className='mb-[6px] block text-nowrap font-semibold text-grey-950 md:mb-[7px] md:self-start md:text-[18px] lg:mb-[10px] lg:text-xl'
        >
          Введите email
        </Typography>

        <label htmlFor='email' className='mb-5 block md:w-full lg:mb-[22px]'>
          <input
            id='email'
            className='w-full rounded-[8px] border border-grey-700 bg-transparent px-[10px] py-2 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600 md:max-w-[542px] md:pb-[10px] md:pt-3 lg:max-w-none'
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
          <Typography className='mb-[5px] mt-[-16px] block text-nowrap text-[19px] font-normal text-red-primary-800 md:text-[18px] lg:text-[20px]'>
            Некорректный адрес почты
          </Typography>
        )}
        {error && isEmailValid && (
          <Typography
            variant='l-bold'
            className='mb-4 mt-[-16px] block text-wrap text-center text-[19px] font-normal text-red-primary-800 md:text-[18px] lg:text-[20px]'
          >
            Пожалуйста, проверьте корректность введенного email или
            зарегистрируйтесь.
          </Typography>
        )}
        <ButtonCustom
          type='button'
          onClick={handleClick}
          variant='primary'
          size='s'
          className='w-full py-1 md:block md:w-auto md:px-[30px] md:py-[14px] lg:py-[20px]'
        >
          <Typography
            variant='m-bold'
            className='text-grey-950 md:text-[16px] lg:text-[20px] lg:text-green-950'
          >
            Получить код
          </Typography>
        </ButtonCustom>
      </form>
      <OtherWaysToAuth />
    </>
  );
}
