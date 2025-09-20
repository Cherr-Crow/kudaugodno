'use client';

import React, { useEffect, useState } from 'react';

import { InputMask } from '@react-input/mask';
import Link from 'next/link';

import { useCreateNewCompanyMutation } from '@/servicesApi/userApi';
import { Modal } from '@/shared/modal';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { timeForComponent } from '@/shared/ui/time-for-component/time';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';
import { isRegisterError } from '@/shared/utils/isRegisterError';

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

  const { showToast } = useToast();

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

  let contentButton: React.ReactNode;

  function validateName(name: string) {
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
    } catch (err) {
      if (isRegisterError(err)) {
        const { email } = err.data;
        if (email.includes('Пользователь с таким Email уже существует.')) {
          showToast('Эта почта уже занята', 'error');
          return;
        }
      } else {
        showToast('Ошибка сервера', 'error');
      }
    }
  };

  if (file == null) {
    contentButton = (
      <div>
        <label
          htmlFor='file'
          className='mb-[24px] block h-[43px] cursor-pointer md:mb-[36px] lg:mb-[41px]'
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
      <label
        htmlFor='file'
        className='mb-[24px] block h-[43px] cursor-pointer md:mb-[36px] lg:mb-[41px]'
      >
        <ButtonCustom
          type='button'
          className='flex min-w-[150px] items-center justify-between bg-white py-[7px] pr-[12px]'
          variant='secondary'
          size='l'
        >
          <Typography variant='s-bold' className='mr-3'>
            {buttonText}
          </Typography>
          <SvgSprite onClick={handleButtonDelete} name='cross-circled' width={24} />
        </ButtonCustom>
      </label>
    );
  }

  return (
    <section>
      <div className='mx-auto min-h-[960px] rounded-[20px] border-blue-600 md:min-h-[640px] md:max-w-[100%] md:rounded-[100px] md:rounded-bl-none md:rounded-br-none md:border-[90px] lg:border-x-[140px]'>
        <div className='relative h-[100%] min-h-[1025px] items-center rounded-t-3xl bg-blue-50 bg-[url(/authforbisback.jpg)] bg-[position:109.5%_-400%] bg-no-repeat px-4 py-[28px] md:m-[-10px] md:min-h-[1022px] md:rounded-[20px] md:bg-[position:107%_-13px] lg:md:bg-[position:104%_99%] lg:bg-[length:120%]'>
          <div className='mx-auto flex h-[100%] min-h-[468px] max-w-[540px] flex-col items-center md:max-w-[528px] md:pt-[45px] lg:max-w-[580px]'>
            <Typography
              variant='m'
              className='-mt-[6px] mb-4 w-[80%] text-nowrap text-center text-xl font-black tracking-[0.001em] text-grey-950 md:mb-[50px] md:mt-[51px] md:w-[105%] md:text-[48px] md:font-semibold md:tracking-[0.001em] lg:-mt-2 lg:mb-[50px]'
            >
              Заявка на подключение
            </Typography>
            <form
              className='mb-[25px] w-full md:mb-[30px]'
              method='post'
              encType='multipart/form-data'
            >
              <Typography className='mb-1 block text-lg font-semibold tracking-[0.001em] text-grey-950 md:text-[20px] lg:mb-0'>
                Выберите тип
              </Typography>
              <div className='mb-1 flex md:mb-2'>
                <Checkbox
                  label='Туроператор'
                  onChange={() => setRole('TOUR_OPERATOR')}
                  isChecked={role === 'TOUR_OPERATOR'}
                  className='my-1 mr-[20px] text-2xl tracking-[0.03em] text-blue-950'
                />
                <Checkbox
                  label='Отельер'
                  onChange={() => setRole('HOTELIER')}
                  isChecked={role === 'HOTELIER'}
                  className='my-1 text-2xl tracking-[0.03em] text-blue-950'
                />
              </div>

              <label
                htmlFor='hotelName'
                className='mb-[9px] block md:mb-3 lg:mb-[16px]'
              >
                <Typography
                  variant='subtitle4'
                  className='mb-1 block text-[18px] font-semibold tracking-[0.001em] text-grey-950 md:mb-0 lg:text-[19px] lg:tracking-[0.01em]'
                >
                  Название отеля / туроператора
                </Typography>
                {!isHotelNameValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Название не корректно (не менее 2х и не более 20и букв)
                  </Typography>
                )}
                <input
                  id='hotelName'
                  className='h-[40px] w-full rounded-[8px] px-[15px] md:h-[42px] md:border md:border-grey-950 md:bg-transparent lg:h-[50px]'
                  type='text'
                  name='hotelName'
                  placeholder='Отель Ромашка/Туроператор РомашкаАвиа'
                  onBlur={() => {
                    setIsHotelNameValid(validateName(hotelName));
                    setHotelName((prev) => prev.trim());
                  }}
                  onChange={(e) => {
                    setHotelName(e.target.value);
                  }}
                  value={hotelName}
                />
              </label>
              <label htmlFor='firstName' className='mb-[10px] block md:mb-4'>
                <Typography className='mb-1 block text-lg font-semibold text-grey-950 md:mb-[2px] md:text-lg lg:text-[19px] lg:tracking-[0.01em]'>
                  Имя
                </Typography>
                {!isNameValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Имя не корректно (не менее 2х и не более 20и букв)
                  </Typography>
                )}
                <input
                  id='firstName'
                  className='h-[40px] w-full rounded-[8px] px-[15px] md:h-[42px] md:border md:border-grey-950 md:bg-transparent lg:h-[50px]'
                  type='text'
                  name='firstName'
                  placeholder='Иван'
                  onBlur={() => {
                    setIsNameValid(validateName(name));
                    setName((prev) => prev.trim());
                  }}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              </label>
              <label htmlFor='lastName' className='mb-[10px] block md:mb-[14px]'>
                <Typography className='mb-1 block text-lg font-semibold text-grey-950 md:mb-0 md:text-lg lg:text-[19px] lg:tracking-[0.01em]'>
                  Фамилия
                </Typography>
                {!isLastNameValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Фамилия не корректна (не менее 2х и не более 20и букв)
                  </Typography>
                )}
                <input
                  id='lastName'
                  className='h-[40px] w-full rounded-[8px] px-[15px] md:h-[42px] md:border md:border-grey-950 md:bg-transparent lg:h-[50px]'
                  type='text'
                  name='lastName'
                  placeholder='Иванов'
                  onBlur={() => {
                    setIsLastNameValid(validateName(lastName));
                    setLastName((prev) => prev.trim());
                  }}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  value={lastName}
                />
              </label>
              <label
                htmlFor='email'
                className='mb-[12px] block md:mb-[16px] lg:mb-[16px]'
              >
                <Typography className='mb-1 block text-lg font-semibold text-grey-950 md:text-lg lg:mb-[6px] lg:text-[19px] lg:tracking-[0.01em]'>
                  Email
                </Typography>
                {!isEmailValid && (
                  <Typography className='mb-[3px] mt-[-16px] block text-nowrap font-normal text-red-primary-800'>
                    Некорректный адрес почты
                  </Typography>
                )}
                <input
                  id='email'
                  className='h-[40px] w-full rounded-[8px] px-[15px] md:-mt-1 md:h-[42px] md:border md:border-grey-950 md:bg-transparent lg:h-[50px]'
                  type='email'
                  name='email'
                  placeholder='example@gmail.com'
                  onBlur={() => {
                    emailValid(email);
                    setEmail((prev) => prev.trim());
                  }}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                />
              </label>
              <label htmlFor='tel' className='mb-[9px] block md:mb-[14px]'>
                <Typography className='mb-1 block text-lg font-semibold text-grey-950 md:text-lg lg:text-[19px] lg:tracking-[0.01em]'>
                  Телефон
                </Typography>
                <InputMask
                  mask='+7 (___) ___-__-__'
                  replacement={{ _: /\d/ }}
                  id='tel'
                  className='h-[40px] w-full rounded-[8px] px-[15px] md:h-[42px] md:border md:border-grey-950 md:bg-transparent lg:h-[50px]'
                  type='tel'
                  name='tel'
                  placeholder='+7 (999) 678-22-22'
                  onChange={handleInputChange}
                  value={phone}
                />
              </label>
              <Typography className='text-md mt-[14px] block font-semibold tracking-[0.001em] text-grey-950 md:text-[19px] md:tracking-[0.01em]'>
                Добавить документы
              </Typography>
              <Typography className='mb-[6px] block text-[16px] font-normal tracking-[0.001em] text-grey-800 md:mb-2 md:mt-1 md:tracking-[0.001em] lg:mb-[21px] lg:w-[60%] lg:tracking-[0.01em]'>
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
                  className='h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:mt-[8px] md:block md:w-auto md:px-[23px] md:py-[20px] lg:mt-3 lg:py-[20px]'
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
      <Modal
        hasScrollbar={false}
        isOpen={isOpenModal}
        className='relative min-h-[546px] max-w-[343px] rounded-[20px] bg-cover bg-no-repeat px-4 py-14 md:min-h-[531px] md:max-w-[800px] md:px-[60px] md:py-12 lg:min-h-[623px] lg:max-w-[1180px] lg:py-[40px]'
        getState={handleCloseModal}
        crossClassName='right-[23px] z-10 top-[19px] md:right-[38px] md:top-[33px]'
      >
        <div className='absolute inset-0 z-0 bg-blue-100'>
          <img
            src='bg-modal.png'
            alt='bg-modal.png'
            className='h-full w-full object-cover md:object-[0_-140px]'
          />
        </div>

        <div className='relative z-10'>
          <Typography className='m-auto mb-[19px] block text-center text-xl font-semibold leading-6 tracking-[0.01em] md:mb-[24px] md:mt-[17px] md:text-[28px] md:tracking-[0.001em] lg:mb-[27px] lg:mt-[27px] lg:text-[32px] lg:tracking-[0.001em]'>
            Ваши данные отправлены администратору сайта
          </Typography>

          <Typography className='text-4 m-auto mb-[22px] block text-center font-normal leading-5 md:mb-[18px] md:text-[19px] md:leading-6 lg:mb-[25px] lg:w-[69%] lg:text-[20px] lg:leading-8'>
            Скоро администратор свяжется с вами по указанной почте. Если все в
            порядке, вы получите доступ к Личному кабинету туроператора. А пока вы
            можете подготовить документы, которые понадобятся для дальнейшей
            регистрации
          </Typography>

          <ButtonCustom
            type='button'
            variant='primary'
            size='m'
            className='m-auto block h-[70px] w-full px-[34px] py-[8px] md:mx-auto md:block md:w-auto md:px-[24px] md:py-[14px] lg:px-[26px] lg:py-[22px]'
          >
            <Link
              className='flex gap-2 text-nowrap text-base font-semibold tracking-[0.001em] text-grey-950 md:text-[16px] md:tracking-[0.01em] lg:text-[19px] lg:tracking-[0.01em] lg:text-green-950'
              href={'/'}
            >
              <SvgSprite
                name='arrow-download'
                width={24}
                strokeWidth={2}
                color='black'
              />
              Скачать список документов
            </Link>
          </ButtonCustom>
          <SvgSprite
            className='m-auto mt-8 h-[150px] w-[150px] md:mt-8 md:h-[178px] md:w-[178px] lg:h-[220px] lg:w-[220px]'
            name='frog-modal'
          />
        </div>
      </Modal>
    </section>
  );
}
