'use client';

import React, { useState } from 'react';

// import { SvgSprite } from '@/shared/svg-sprite';

import Link from 'next/link';

import { Modal } from '@/shared/modal';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
// import { ButtonCustom } from '@/shared/ui/button-custom';
// import { timeForComponent } from '@/shared/ui/time-for-component/time';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';

import { IAuthForBusiness } from './AuthForBusiness.types';

export function AuthForBusiness({}: IAuthForBusiness) {
  const [file, setFile] = useState<string>('');
  const [buttonText, setButtonText] = useState<string>('Загрузить');
  const [isOpenModal, setIsOpenModal] = useState(false);

  let contentButton: React.ReactNode;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // e.preventDefault();

    setFile(() => e.target.value);

    if (e.target.value !== '' && e.target.value !== null) {
      setButtonText(e.target.files[0].name);
    }
  };

  const handleButtonDelete = () => {
    setFile('');
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    // setNewAmount('');
  };

  if (file == '') {
    contentButton = (
      <div>
        <label
          htmlFor='file'
          className='mb-9 inline-block h-[43px] cursor-pointer md:mb-7'
        >
          <ButtonCustom
            type='button'
            className='pointer-events-none flex min-w-[150px] items-center justify-between bg-white py-[7px] pr-[12px]'
            variant='secondary'
            size='l'
          >
            <Typography variant='s-bold' className='mr-1'>
              Загрузить
            </Typography>
            <SvgSprite className='rotate-45' name='cross' width={12} />
          </ButtonCustom>
          <input
            className='h-0 w-0'
            multiple
            onChange={handleChange}
            id='file'
            name='file_arr[]'
            type='file'
          />
        </label>
      </div>
    );
  } else {
    contentButton = (
      <label htmlFor='file' className='mb-7 block h-[43px] cursor-pointer'>
        <ButtonCustom
          type='button'
          className='flex min-w-[150px] items-center justify-between bg-white py-[7px] pr-[12px]'
          variant='secondary'
          size='l'
        >
          <Typography variant='s-bold' className='mr-3'>
            {buttonText}
          </Typography>
          <SvgSprite onClick={handleButtonDelete} name='cross' width={12} />
        </ButtonCustom>
      </label>
    );
  }

  return (
    <section className='py-[80px] md:py-[80px]'>
      <div className='mx-auto min-h-[960px] rounded-[20px] border-blue-700 md:min-h-[640px] md:max-w-[1180px] md:border-[50px]'>
        <div className='relative h-[960px] max-w-[1100px] items-center bg-blue-50 bg-right-bottom px-2 py-[28px] md:m-[-10px] md:h-[1022px] md:rounded-[20px] md:bg-[url(/authforbisback.jpg)]'>
          <div className='mx-auto flex h-[468px] max-w-[540px] flex-col items-center md:max-w-[582px] md:pt-[45px]'>
            <Typography className='mb-7 w-[80%] text-center text-[32px]/[110%] font-black text-grey-950 md:mb-11 md:w-[100%] md:text-[48px] md:font-semibold'>
              Заявка на подключение
            </Typography>
            <form className='mb-[25px] w-full md:mb-[30px]' method='post'>
              <Typography
                children='Выберите тип'
                className='mb-2 block text-[21px] font-semibold text-grey-950'
              />

              <div className='mb-3 flex'>
                <Checkbox label='Туроператор' className='my-1 mr-7' />
                <Checkbox label='Отельер' className='my-1' />
              </div>

              <label htmlFor='hotelName' className='mb-[17px] block'>
                <Typography
                  children='Название'
                  className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'
                />
                <input
                  id='hotelName'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='text'
                  name='hotelName'
                  placeholder='Отель Ромашка/Туроператор РомашкаАвиа'
                />
              </label>
              <label htmlFor='firstName' className='mb-[17px] block'>
                <Typography
                  children='Имя'
                  className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'
                />
                <input
                  id='firstName'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='text'
                  name='firstName'
                  placeholder='Иван'
                />
              </label>
              <label htmlFor='lastName' className='mb-[17px] block'>
                <Typography
                  children='Фамилия'
                  className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'
                />
                <input
                  id='lastName'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='text'
                  name='lastName'
                  placeholder='Иванов'
                />
              </label>
              <label htmlFor='email' className='mb-[17px] block'>
                <Typography
                  children='Email'
                  className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'
                />
                <input
                  id='email'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='email'
                  name='email'
                  placeholder='example@gmail.com'
                />
              </label>
              <label htmlFor='tel' className='mb-5 block'>
                <Typography
                  children='Телефон'
                  className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'
                />
                <input
                  id='tel'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='tel'
                  name='tel'
                  placeholder='+7 (999) 678-22-22'
                />
              </label>
              <Typography
                children='Добавить документы'
                className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-2'
              />
              <Typography className='mb-3 block text-[16px] font-normal text-grey-800'>
                Прикрепите документы об отеле/туроператоре (необязательно)
              </Typography>

              {contentButton}

              <ButtonCustom
                type='button'
                // onClick={handleClick}
                variant='primary'
                size='m'
                className='h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:block md:w-auto md:px-[32px] md:py-[20px] lg:py-[20px]'
              >
                <Typography
                  children='Отправить заявку'
                  className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'
                />
              </ButtonCustom>
            </form>
          </div>
        </div>
      </div>
      <div className='relative m-auto min-h-[478px] max-w-[348px] rounded-[20px] bg-[url("/authModal375.jpg")] px-5 py-16 md:min-h-[480px] md:max-w-[800px] md:bg-[url("/authModal800.jpg")] md:px-[120px] md:py-12 lg:min-h-[638px] lg:max-w-[1180px] lg:bg-[url("/authModal1024.jpg")] lg:py-[110px]'>
        <div className='absolute right-[30px] top-[30px] cursor-pointer'>
          <SvgSprite className='' name='cross' width={16} />
        </div>
        <Typography className='m-auto mb-6 block w-[80%] text-center text-[18px] font-semibold tracking-wide md:w-[100%] md:text-[24px] lg:text-[32px]'>
          Ваши данные отправлены администратору сайта
        </Typography>
        <Typography className='text-4 m-auto mb-4 block text-center font-normal md:mb-5 md:text-[19px] lg:mb-6 lg:w-[60%] lg:text-[19px]/[150%]'>
          Скоро администратор свяжется с вами по указанной почте. Если всё в порядке,
          вы получите доступ к Личному кабинету туроператора.
        </Typography>
        {/* <Typography className='block font-normal text-4 md:text-[18px] lg:text-5'>
          Если всё в порядке, вы получите доступ к Личному кабинету туроператора.
        </Typography>  */}
        <ButtonCustom
          type='button'
          // onClick={handleClick}
          variant='primary'
          size='m'
          className='m-auto block h-[70px] px-[30px] py-[7px] md:mx-auto md:block md:w-auto md:px-[30px] md:py-[12px] lg:px-[100px] lg:py-[20px]'
        >
          {/* <Typography
            children='На главную'
            className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'
          /> */}
          <Link
            className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'
            href={'/'}
          >
            На главную
          </Link>
        </ButtonCustom>
      </div>
      <Modal isOpen={isOpenModal} getState={handleCloseModal}></Modal>
    </section>
  );
}
