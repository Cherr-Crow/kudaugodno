'use client';

import React, { useEffect, useState } from 'react';

import Link from 'next/link';

import { useCreateNewCompanyMutation } from '@/servicesApi/userApi';
import { Modal } from '@/shared/modal';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { timeForComponent } from '@/shared/ui/time-for-component/time';

import { IAuthForBusiness } from './AuthForBusiness.types';

export function AuthForBusiness({}: IAuthForBusiness) {
  const [file, setFile] = useState<FileList | null>(null);
  const [buttonText, setButtonText] = useState<string | null>('Загрузить');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  const [role, setRole] = useState<string>('');

  const [hotelName, setHotelName] = useState<string>('');
  const [isHotelNameValid, setIsHotelNameValid] = useState<boolean>(true);

  const [name, setName] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<boolean>(true);

  const [lastName, setLastName] = useState<string>('');
  const [isLastNameValid, setIsLastNameValid] = useState<boolean>(true);

  const [email, setEmail] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true);

  const [phone, setPhone] = useState<string>('');

  const [startTimer, setStartTimer] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(15);

  const [registerCompany] = useCreateNewCompanyMutation();

  useEffect(() => {
    if (!startTimer) return;
    if (seconds === 0) {
      setStartTimer(false);
      return;
    }

    const i = setInterval(() => {
      setSeconds((seconds) => seconds - 1);
      console.log(seconds);
    }, 1000);
    return () => {
      clearInterval(i);
    };
  }, [startTimer, seconds]);

  let contentButton: React.ReactNode;

  function validateName(name: string) {
    console.log(name);
    const regex = /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/;
    if (!regex.test(name)) {
      return false;
    }
    if (name.length < 2 || name.length > 20) {
      return false;
    }
    if (name.trim() !== name) {
      return false;
    }

    setIsNameValid(true);
    return true;
  }

  function emailValid(email: string) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (emailRegex.test(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;

    // Удаляем все нечисловые символы
    const cleaned = input.replace(/\D/g, '');

    // Применяем маску
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
    // Обновляем состояние
    setPhone(formatted);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(e.target.files);
    setFile(() => e.target.files);

    if (e.target.value !== '' && e.target.value !== null) {
      if (!e.target.files || e.target.files.length === 0) {
        return;
      }

      setButtonText(e.target.files[0].name);
    }
  };

  const handleButtonDelete = () => {
    setFile(null);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = async () => {
    if (
      isHotelNameValid &&
      hotelName !== '' &&
      isNameValid &&
      name !== '' &&
      isLastNameValid &&
      lastName !== '' &&
      isEmailValid &&
      email !== '' &&
      phone.length == 18
    ) {
      const data = {
        role: role,
        first_name: name,
        last_name: lastName,
        email: email,
        phone_number: phone,
        company_name: hotelName,
      };

      const formData = new FormData();
      if (file !== null) {
        formData.append('documents', file[0]);
      }

      for (const [key, value] of Object.entries(data)) {
        formData.append(key, value);
      }

      for (const [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      console.log(formData instanceof FormData);

      try {
        await registerCompany(formData).unwrap();
        setIsOpenModal(true);
        setStartTimer(true);
        setSeconds(15);

        setHotelName('');
        setName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setFile(null);
        setIsFormValid(true);
      } catch {}
    } else {
      setIsFormValid(false);
    }
  };

  if (file == null) {
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
            accept='image/*,.jpg,.png,.jpeg'
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
        <div className='relative h-[100%] min-h-[960px] max-w-[1100px] items-center bg-blue-50 bg-right-bottom px-2 py-[28px] md:m-[-10px] md:min-h-[1022px] md:rounded-[20px] md:bg-[url(/authforbisback.jpg)]'>
          <div className='mx-auto flex h-[100%] min-h-[468px] max-w-[540px] flex-col items-center md:max-w-[582px] md:pt-[45px]'>
            <Typography className='mb-7 w-[80%] text-center text-[32px]/[110%] font-black text-grey-950 md:mb-11 md:w-[100%] md:text-[48px] md:font-semibold'>
              Заявка на подключение
            </Typography>
            <form
              className='mb-[25px] w-full md:mb-[30px]'
              method='post'
              encType='multipart/form-data'
            >
              <Typography className='mb-2 block text-[21px] font-semibold text-grey-950'>
                Выберите тип
              </Typography>
              <div className='mb-3 flex'>
                <Checkbox
                  label='Туроператор'
                  onChange={() => setRole('TOUR_OPERATOR')}
                  isChecked={role === 'TOUR_OPERATOR'}
                  className='my-1 mr-7'
                />
                <Checkbox
                  label='Отельер'
                  onChange={() => setRole('HOTELIER')}
                  isChecked={role === 'HOTELIER'}
                  className='my-1'
                />
              </div>

              <label htmlFor='hotelName' className='mb-[17px] block'>
                <Typography className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'>
                  Название
                </Typography>
                {!isHotelNameValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Название не корректно (не менее 2х и не более 20и букв)
                  </Typography>
                )}
                <input
                  id='hotelName'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='text'
                  name='hotelName'
                  placeholder='Отель Ромашка/Туроператор РомашкаАвиа'
                  onBlur={() => {
                    setIsHotelNameValid(validateName(hotelName));
                  }}
                  onChange={(e) => {
                    setHotelName(e.target.value.trim());
                  }}
                  value={hotelName}
                />
              </label>
              <label htmlFor='firstName' className='mb-[17px] block'>
                <Typography className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'>
                  Имя
                </Typography>
                {!isNameValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Имя не корректно (не менее 2х и не более 20и букв)
                  </Typography>
                )}
                <input
                  id='firstName'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='text'
                  name='firstName'
                  placeholder='Иван'
                  onBlur={() => {
                    setIsNameValid(validateName(name));
                  }}
                  onChange={(e) => {
                    setName(e.target.value.trim());
                  }}
                  value={name}
                />
              </label>
              <label htmlFor='lastName' className='mb-[17px] block'>
                <Typography className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'>
                  Фамилия
                </Typography>
                {!isLastNameValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Фамилия не корректна (не менее 2х и не более 20и букв)
                  </Typography>
                )}
                <input
                  id='lastName'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='text'
                  name='lastName'
                  placeholder='Иванов'
                  onBlur={() => {
                    setIsLastNameValid(validateName(lastName));
                  }}
                  onChange={(e) => {
                    setLastName(e.target.value.trim());
                  }}
                  value={lastName}
                />
              </label>
              <label htmlFor='email' className='mb-[17px] block'>
                <Typography className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'>
                  Email
                </Typography>
                {!isEmailValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Некорректный адрес почты
                  </Typography>
                )}
                <input
                  id='email'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='email'
                  name='email'
                  placeholder='example@gmail.com'
                  onBlur={() => {
                    emailValid(email);
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </label>
              <label htmlFor='tel' className='mb-5 block'>
                <Typography className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-3'>
                  Телефон
                </Typography>
                <input
                  id='tel'
                  className='h-[55px] w-full rounded-[8px] px-[15px] md:h-[47px] md:border md:border-grey-950 md:bg-transparent'
                  type='tel'
                  name='tel'
                  placeholder='+7 (999) 678-22-22'
                  onChange={handleInputChange}
                  value={phone}
                />
              </label>
              <Typography className='mb-1 block text-[21px] font-semibold text-grey-950 md:mb-2'>
                Добавить документы
              </Typography>
              <Typography className='mb-3 block text-[16px] font-normal text-grey-800'>
                Прикрепите документы об отеле/туроператоре (необязательно)
              </Typography>

              {contentButton}

              {!isFormValid && (
                <Typography className='mb-[15px] block text-center text-[18px] font-normal text-red-primary-800'>
                  Все поля формы должны быть заполнены!
                </Typography>
              )}

              {!startTimer ? (
                <ButtonCustom
                  type='button'
                  onClick={handleOpenModal}
                  variant='primary'
                  size='m'
                  className='h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:block md:w-auto md:px-[32px] md:py-[20px] lg:py-[20px]'
                >
                  <Typography className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'>
                    Отправить заявку
                  </Typography>
                </ButtonCustom>
              ) : (
                <Typography className='mb-[15px] block text-nowrap text-[20px] font-normal text-grey-700 md:mb-[21px] md:text-[18px] lg:mb-[28px] lg:text-[20px]'>
                  Отправить новую заявку через {timeForComponent(seconds)}
                </Typography>
              )}
            </form>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} getState={handleCloseModal}>
        <div className='relative m-auto min-h-[478px] max-w-[348px] rounded-[20px] bg-[url("/authModal375.jpg")] px-5 py-16 md:min-h-[480px] md:max-w-[800px] md:bg-[url("/authModal800.jpg")] md:px-[120px] md:py-12 lg:min-h-[638px] lg:max-w-[1180px] lg:bg-[url("/authModal1024.jpg")] lg:py-[110px]'>
          <Typography className='m-auto mb-6 block w-[80%] text-center text-[18px] font-semibold tracking-wide md:w-[100%] md:text-[24px] lg:text-[32px]'>
            Ваши данные отправлены администратору сайта
          </Typography>
          <Typography className='text-4 m-auto mb-4 block text-center font-normal md:mb-5 md:text-[19px] lg:mb-6 lg:w-[60%] lg:text-[19px]/[150%]'>
            Скоро администратор свяжется с вами по указанной почте. Если всё в
            порядке, вы получите доступ к Личному кабинету туроператора.
          </Typography>
          <ButtonCustom
            type='button'
            variant='primary'
            size='m'
            className='m-auto block h-[70px] px-[30px] py-[7px] md:mx-auto md:block md:w-auto md:px-[30px] md:py-[12px] lg:px-[100px] lg:py-[20px]'
          >
            <Link
              className='text-nowrap text-base font-semibold text-grey-950 md:text-[20px] lg:text-green-950'
              href={'/'}
            >
              На главную
            </Link>
          </ButtonCustom>
        </div>
      </Modal>
    </section>
  );
}
