'use client';
import { useState, useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import { selectEmail } from '@/rtk/userSlice';
import { useCreateNewTouristMutation } from '@/servicesApi/userApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';
import { isRegisterError } from '@/shared/utils/isRegisterError';
import { ITourist } from '@/types/users';

const nameRegex = /^[a-zA-Zа-яА-ЯёЁ'-]+$/;
const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;

const FormSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty({ message: 'Введите имя' })
    .min(2, { message: 'Имя слишком короткое' })
    .max(20, { message: 'Имя слишком длинное' })
    .regex(nameRegex, { message: 'Недопустимые символы' })
    .refine((val) => !val.includes(' '), {
      message: 'Имя не должно содержать пробелы',
    }),
  lastName: z
    .string()
    .trim()
    .nonempty({ message: 'Введите фамилию' })
    .min(3, { message: 'Фамилия слишком короткая' })
    .max(20, { message: 'Фамилия слишком длинная' })
    .regex(nameRegex, { message: 'Недопустимые символы' })
    .refine((val) => !val.includes(' '), {
      message: 'Фамилия не должна содержать пробелы',
    }),
  birthDate: z
    .string()
    .refine((val) => /^\d{2}\.\d{2}\.\d{4}$/.test(val), {
      message: 'Формат даты должен быть ДД.ММ.ГГГГ',
    })
    .refine((val) => new Date(val.split('.').reverse().join('/')) <= new Date(), {
      message: 'Выберите корректную дату рождения',
    }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: 'Введите номер телефона' })
    .startsWith('+7', { message: 'Номер телефона должен начинаться с +7' })
    .regex(phoneRegex, {
      message: 'Номер должен быть в формате +7 (999) 999-99-99',
    }),
  email: z
    .string()
    .trim()
    .nonempty({ message: 'Введите Email' })
    .email({ message: 'Некорректный формат Email' })
    .refine((val) => !val.includes(' '), {
      message: 'Email не должен содержать пробелы',
    }),
});

// Тип формы исходя из схемы ZOD
type FormData = z.infer<typeof FormSchema>;

export function RegisterState() {
  const [birthDateValue, setBirthDateValue] = useState<string>('');

  const [createTourist] = useCreateNewTouristMutation();

  const email = useSelector(selectEmail);

  const { showToast } = useToast();

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  useEffect(() => {
    if (email) {
      setValue('email', email);
    }
  }, [email, setValue]);

  const handleCreateNewUser = async () => {
    const values = getValues();

    const data: ITourist = {
      first_name: values.firstName,
      last_name: values.lastName,
      phone_number: values.phone,
      birth_date: birthDateValue,
      email: values.email,
    };

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    try {
      await createTourist(formData).unwrap();
      reset();
    } catch (err) {
      if (isRegisterError(err)) {
        const { email } = err.data;
        if (email.includes('Пользователь с таким Email уже существует.')) {
          showToast('Эта почта уже занята', 'error');
          return;
        }
      }
    }
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

    setValue('phone', formatted);
  };

  const handleChangeBirthdate = (
    e: React.ChangeEvent<HTMLInputElement>,
    isFromCalendar: boolean,
  ) => {
    const date: string = e.target.value;
    if (isFromCalendar) {
      // YYYY-MM-DD от календаря
      setBirthDateValue(date);
      setValue('birthDate', isoToDateFormat(date));
    } else {
      // Ручной ввод в ДД.ММ.ГГГГ
      setValue('birthDate', date);
      if (/^\d{2}\.\d{2}\.\d{4}$/.test(date)) {
        setBirthDateValue(date.split('.').reverse().join('-'));
      }
    }
  };

  return (
    <form
      className='w-full md:max-w-[543px] lg:max-w-[580px]'
      method='POST'
      onSubmit={handleSubmit(handleCreateNewUser)}
    >
      <div className='mb-[14px] flex w-full flex-col md:mb-4'>
        <label className='mb-1 md:mb-[6px]' htmlFor='email'>
          <Typography variant='l-bold' className='font-semibold md:font-medium'>
            Email
          </Typography>
        </label>
        <input
          {...register('email')}
          className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
          id='email'
          type='email'
          placeholder='example@gmail.com'
        />
        {errors.email && (
          <Typography variant='s' className='text-red-primary-800'>
            {errors.email.message}
          </Typography>
        )}
      </div>
      <div className='mb-[14px] flex w-full flex-col md:mb-4'>
        <label className='mb-1 md:mb-[3px] lg:mb-2' htmlFor='phone'>
          <Typography variant='l-bold' className='font-semibold md:font-medium'>
            Телефон
          </Typography>
        </label>
        <input
          {...register('phone')}
          className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
          onChange={handleInputChange}
          id='phone'
          type='phone'
          placeholder='+7 (999) 678-22-22'
        />
        {errors.phone && (
          <Typography variant='s' className='text-red-primary-800'>
            {errors.phone.message}
          </Typography>
        )}
      </div>
      <div className='mb-[14px] flex w-full flex-col md:mb-[17px]'>
        <label className='mb-1 md:mb-[3px] lg:mb-2' htmlFor='firstName'>
          <Typography variant='l-bold' className='font-semibold md:font-medium'>
            Имя
          </Typography>
        </label>
        <input
          {...register('firstName')}
          className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
          id='firstName'
          type='text'
          placeholder='Иван'
        />
        {errors.firstName && (
          <Typography variant='s' className='text-red-primary-800'>
            {errors.firstName.message}
          </Typography>
        )}
      </div>
      <div className='mb-[14px] flex w-full flex-col md:mb-[16px]'>
        <label className='mb-1 md:mb-[3px] lg:mb-2' htmlFor='lastName'>
          <Typography variant='l-bold' className='font-semibold md:font-medium'>
            Фамилия
          </Typography>
        </label>
        <input
          {...register('lastName')}
          className='transition-border w-full rounded-lg border border-grey-700 bg-transparent px-3 py-2 hover:border-blue-600 focus:border-blue-600 focus:outline-none'
          id='lastName'
          type='text'
          placeholder='Иванов'
        />
        {errors.lastName && (
          <Typography variant='s' className='text-red-primary-800'>
            {errors.lastName.message}
          </Typography>
        )}
      </div>
      <label
        htmlFor='birthDateText'
        className='mb-[22px] flex flex-col md:mb-[22px] lg:mb-9'
      >
        <Typography
          variant='l-bold'
          className='mb-1 font-semibold md:mb-1 md:font-medium lg:mb-2'
        >
          Дата рождения
        </Typography>
        <div className='relative min-h-[52px] rounded-lg border border-grey-700 bg-transparent text-grey-950 transition focus-within:border-blue-600 hover:border-blue-600 focus:border-blue-600 active:border-blue-600'>
          <input
            onChange={(e) => handleChangeBirthdate(e, true)}
            id='birthDate'
            className='absolute right-[1px] top-0 z-10 max-h-[48px] max-w-[50px] cursor-pointer appearance-none rounded-lg bg-transparent p-3 text-base focus:outline-none'
            type='date'
            value={birthDateValue}
          />
          <input
            {...register('birthDate')}
            onChange={(e) => handleChangeBirthdate(e, false)}
            id='birthDateText'
            className='absolute bottom-0 left-0 right-[35px] top-0 w-full rounded-lg bg-transparent px-3 py-[14px] text-base focus:outline-none'
            type='text'
            maxLength={10}
            placeholder='ДД.ММ.ГГГГ'
          />
          <div className='pointer-events-none absolute right-3 top-1/2 z-20 h-7 w-7 -translate-y-1/2'>
            <SvgSprite name='calendar' color='#ADADAD' />
          </div>
        </div>
        {errors.birthDate && (
          <Typography variant='s' className='text-red-primary-800'>
            {errors.birthDate.message}
          </Typography>
        )}
      </label>
      <ButtonCustom
        type='submit'
        variant='primary'
        size='m'
        className='h-[70px] w-full px-[35px] py-[7px] md:mx-auto md:block md:h-auto md:w-auto md:px-[32px] md:py-[14px] lg:py-[15px]'
        // onClick={handleCreateNewUser}
      >
        <Typography className='text-nowrap text-base font-semibold text-grey-950'>
          Зарегистрироваться
        </Typography>
      </ButtonCustom>
    </form>
  );
}
