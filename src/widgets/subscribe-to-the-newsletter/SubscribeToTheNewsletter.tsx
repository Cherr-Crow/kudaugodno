"use client";

import React from 'react';
import { ISubscribeToTheNewsletter, FormData } from './SubscribeToTheNewsletter.types';
import { Typography } from '@/shared/typography';

import { useForm, SubmitHandler } from 'react-hook-form';
import { ButtonCustom } from '@/shared/ui/button-custom';


const beforElem = "before:content-[''] before:absolute before:top-[-100px] before:left-[-280px] before:w-[195px] before:h-[195px] before:bg-[#A3C0FE4D] before:rounded-full before:hidden xl:before:block";
const afterElem = "after:content-[''] after:absolute after:top-[-150px] after:left-[-330px] after:w-[300px] after:h-[300px] after:bg-[#7E9CFB33] after:rounded-[50%] after:hidden xl:after:block";
const beforElemSection = "before:content-[''] before:absolute before:top-[150px] before:left-[63%] before:w-[344px] before:h-[344px] before:bg-[#A3C0FE4D] before:rounded-full before:hidden xl:before:block";
const labelParagraphText = "xl:mb-8 font-normal xl:text-base xl:leading-10 ";

export function SubscribeToTheNewsletter({ className }: ISubscribeToTheNewsletter) {
  const [inptVal, setInptVal] = React.useState<string>('');

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInptVal(e.target.value);
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_SUBSCR}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataRes = await response.json();
    } catch (er) { console.log(er) }
  };

  return <section className={`${className} container flex relative ${beforElemSection} justify-center overflow-hidden bg-blue-600 text-white xl:p-8 p-5 rounded-tl-[20px] rounded-tr-[20px] xl:rounded-tl-[40px] xl:rounded-tr-[40px]`}>
    <div className={`flex  flex-col xl:w-3/4 relative ${beforElem} ${afterElem}`}>
      <Typography variant='l-bold' children='Новостная рассылка' className='xl:text-[40px] xl:mb-3 mb-2' />
      <Typography variant='m' children='Подпишитесь, чтобы первыми узнавать о новых турах, скидках и промокодах' className={`${labelParagraphText} mb-5`} />
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col xl:flex-row xl:mb-20 '>
        <label htmlFor='SubscribeEmail' className='w-full'>
          <input
            type="email"
            id='SubscribeEmail'
            value={inptVal}
            className='flex flex-col w-full rounded-[40px] xl:p-6 p-4 w-inherit mb-2 placeholder:text-base xl:placeholder:text-xl outline-none text-black'
            placeholder='Введите вашу почту'
            {...register('SubscribeEmail', {
              required: 'Поле обязательно для заполнения',
            })}
            onChange={handelChange}
          /><Typography variant='m' children='Нажимая на кнопку, вы соглашаетесь с политикой обработки персональных данных' className={`${labelParagraphText} `}/></label>
        <ButtonCustom type='submit' size='lm' variant='primary' children='Подписаться' className='text-black xl:font-medium xl:text-xl xl:w-fit w-full mt-4 xl:mt-0 xl:py-[22px]'></ButtonCustom>
      </form>
    </div>
  </section>;

}

