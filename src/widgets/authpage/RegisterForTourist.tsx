'use client';
import { useState } from 'react';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { selectEmail } from '@/rtk/userSlice';
import { useCreateNewTouristMutation } from '@/servicesApi/userApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { ITourist } from '@/types/users';

export function RegisterForTourist() {
  const [name, setName] = useState<string>('');
  const [surname, setSurname] = useState<string>('');
  const [birthDate, setbirthDate] = useState<string>('');
  const [birthDateText, setbirthDateText] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  const [createTourist] = useCreateNewTouristMutation();

  const router = useRouter();
  const email = useSelector(selectEmail);

  const handleCreateNewUser = async () => {
    console.log(name, surname, birthDateText, phone);

    if (!email) {
      console.error('Email отсутствует');
      return;
    }
    const data: ITourist = {
      first_name: name,
      last_name: surname,
      phone_number: phone,
      birth_date: birthDate,
      email: email,
    };

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }
    console.log(formData);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log(formData instanceof FormData);
    try {
      await createTourist(formData).unwrap();
      router.push('/auth-page');
    } catch {}
  };

  const handleClickBack = () => {
    router.back();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    const cleaned = input.replace(/\D/g, '');

    let formatted = '';
    if (cleaned.length > 0) {
      formatted = `+7 (${cleaned.substring(1, 4)}`;
    }
    if (cleaned.length >= 4) {
      formatted += `) ${cleaned.substring(4, 7)}`;
    }
    if (cleaned.length >= 7) {
      formatted += `-${cleaned.substring(7, 9)}`;
    }
    if (cleaned.length >= 9) {
      formatted += `-${cleaned.substring(9, 11)}`;
    }

    setPhone(formatted);
  };

  return (
    <section className='md:py-[80px]'>
      <div className='relative mx-auto h-auto rounded-[20px] md:max-w-[1100px]'>
        <div className='absolute bottom-0 left-0 right-0 top-0 rounded-[20px] bg-blue-700'></div>
        <div className='z-1 absolute bottom-10 left-10 right-10 top-10 rounded-[20px] bg-blue-50'></div>
        <div className='z-2 relative max-w-[1100px] items-center px-2 py-[100px] md:rounded-[20px]'>
          <button
            onClick={handleClickBack}
            className='absolute left-[60px] top-[60px] h-[44px] w-[44px]'
          >
            <SvgSprite name='back-arrow' width={44} height={44} className='' />
          </button>
          <div className='mx-auto flex max-w-[540px] flex-col items-center md:pt-[75px] lg:max-w-[580px] lg:pt-[55px]'>
            <Typography className='font-grey-950 mb-[30px] block text-[2rem] text-blue-900 md:mb-[36px] md:text-[40px] md:font-medium md:text-grey-950 lg:mb-[56px] lg:text-[48px]'>
              Добро пожаловать!
            </Typography>
            <form className='w-full' action='PUT'>
              <div className='mb-5 flex w-full flex-col'>
                <label className='mb-1' htmlFor='name'>
                  <Typography variant='l-bold'>Имя</Typography>
                </label>
                <input
                  className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  type='text'
                  name='name'
                  placeholder='Иван'
                />
              </div>
              <div className='mb-5 flex w-full flex-col'>
                <label className='mb-1' htmlFor='surname'>
                  <Typography variant='l-bold'>Фамилия</Typography>
                </label>
                <input
                  className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                  value={surname}
                  type='text'
                  name='surname'
                  placeholder='Иванов'
                />
              </div>
              <label htmlFor='birthDate' className='mb-5 flex flex-col gap-1'>
                <Typography className='text-xl font-medium leading-8'>
                  Дата рождения
                </Typography>
                <div className='relative'>
                  <Typography
                    className={`${birthDateText ? 'black' : 'text-grey-500'} absolute left-[0.75rem] top-1/2 -translate-y-1/2 text-base font-normal leading-6`}
                  >
                    {birthDateText ? birthDateText : '01.08.1990'}
                  </Typography>
                  <input
                    onChange={(e) => {
                      setbirthDate(e.target.value);
                      setbirthDateText(
                        e.target.value.split('-').reverse().join('.'),
                      );
                    }}
                    id='birthDate'
                    className='border-neutral-500/[1] w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 focus:outline-none'
                    type='date'
                    placeholder='01.08.1990'
                  />
                </div>
              </label>
              <div className='mb-10 flex w-full flex-col'>
                <label className='mb-1' htmlFor='phone'>
                  <Typography variant='l-bold'>Телефон</Typography>
                </label>
                <input
                  className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
                  onChange={handleInputChange}
                  value={phone}
                  type='phone'
                  name='phone'
                  placeholder='+7 (999) 678-22-22'
                />
              </div>
              <ButtonCustom
                type='button'
                variant='primary'
                size='m'
                className='h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:block md:w-auto md:px-[30px] md:py-[11px] lg:py-[20px]'
                onClick={handleCreateNewUser}
              >
                <Typography className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'>
                  Зарегистрироваться
                </Typography>
              </ButtonCustom>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
