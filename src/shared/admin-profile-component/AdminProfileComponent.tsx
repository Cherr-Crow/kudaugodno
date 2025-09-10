'use client';

/* eslint-disable no-commented-code/no-commented-code */
import { useEffect, useState, useRef } from 'react';
import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask, Mask } from '@react-input/mask';
import { usePathname, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import {
  clearCurrentUser,
  selectUserPersonalData,
  selectUserRole,
} from '@/rtk/currentUserSlice';
import { AppDispatch } from '@/rtk/store';
import { useLazyFetchMeQuery } from '@/servicesApi/authApi';
import { authApi } from '@/servicesApi/authApi';
import { useDeleteUserMutation, useUpdateUserMutation } from '@/servicesApi/userApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { useToast } from '@/shared/ui/toast/toastService';
import { ToastType } from '@/shared/ui/toast/ToastType.types';
import { Typography } from '@/shared/ui/typography';
import { ICompany, ITourist } from '@/types/users';

import { IAdminProfileComponent } from './AdminProfileComponent.types';
import { isoToDateFormat } from '../utils/isoToDateFormat';

// Размер загружаемой фотографии 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024;
const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
// Схема ZOD типизации и валидации для формы
export const FormSchema = z.object({
  image: z
    .instanceof(File, { message: 'Некорректный формат изображения' })
    .refine((file) => file && file.size <= MAX_FILE_SIZE, {
      message: 'Размер файла не должен быть больше 1MB',
    })
    .optional(),
  firstName: z
    .string()
    .refine((it) => it.length != 0, { message: 'Введите имя' })
    .refine(
      (it) => {
        for (let i = 0; i < it.length; i++) {
          if (it[i] == ' ') return false;
        }

        return true;
      },
      { message: 'Имя не должно содержать пробелы' },
    )
    .refine(
      (it) => {
        const regexPattern = /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/;

        return regexPattern.test(it);
      },
      { message: 'Недопустимые символы' },
    )
    .refine((it) => it.length > 2, { message: 'Имя слишком короткое' })
    .refine((it) => it.length < 20, { message: 'Имя слишком длинное' }),
  lastName: z
    .string()
    .refine((it) => it.length != 0, { message: 'Введите фамилию' })
    .refine(
      (it) => {
        for (let i = 0; i < it.length; i++) {
          if (it[i] == ' ') return false;
        }

        return true;
      },
      { message: 'Фамилия не должна содержать пробелы' },
    )
    .refine(
      (it) => {
        const regexPattern = /^[a-zA-Zа-яА-ЯёЁ\s'-]+$/;

        return regexPattern.test(it);
      },
      { message: 'Недопустимые символы' },
    )
    .refine((it) => it.length > 2, { message: 'Фамилия слишком короткая' })
    .refine((it) => it.length < 20, { message: 'Фамилия слишком длинная' }),
  birthDate: z.preprocess(
    (val) => (typeof val === 'string' && val.trim() === '' ? undefined : val),
    z
      .string()
      .regex(/^\d{2}\.\d{2}\.\d{4}$/, {
        message: 'Формат даты должен быть ДД.ММ.ГГГГ',
      })
      .refine(
        (val) => {
          const [dd, mm, yyyy] = val.split('.');
          const inputDate = new Date(`${yyyy}-${mm}-${dd}`);
          return inputDate <= new Date();
        },
        { message: 'Выберите корректную дату рождения' },
      )
      .optional(),
  ),
  email: z
    .string()
    .refine((it) => it.length != 0, { message: 'Введите Email' })
    .refine(
      (it) => {
        for (let i = 0; i < it.length; i++) {
          if (it[i] == ' ') return false;
        }

        return true;
      },
      { message: 'Email не должен содержать пробелы' },
    )
    .refine((it) => it.includes('@') && it.includes('.'), {
      message: 'Email должен содержать символы @ и .',
    }),
  phone: z
    .string()
    .trim()
    .nonempty({ message: 'Введите номер телефона' })
    .startsWith('+7', { message: 'Номер телефона должен начинаться с +7' })
    .regex(phoneRegex, {
      message: 'Номер должен быть в формате +7 (999) 999-99-99',
    }),
  company_name: z
    .string()
    .nonempty({ message: 'Введите название компании' })
    .min(2, { message: 'Название компании слишком короткое' })
    .max(50, { message: 'Название компании слишком длинное' })
    .regex(/^[a-zA-Zа-яА-ЯёЁ0-9\s'-]+$/, {
      message: 'Недопустимые символы в названии компании',
    }),
  country: z
    .string()
    .nonempty({ message: 'Введите страну' })
    .max(50, { message: 'Слишком длинное название страны' }),
  city: z
    .string()
    .nonempty({ message: 'Введите город' })
    .max(50, { message: 'Слишком длинное название города' }),
  address: z
    .string()
    .nonempty({ message: 'Введите адрес' })
    .max(100, { message: 'Слишком длинный адрес' }),
});

// Тип формы исходя из схемы ZOD
type FormData = z.infer<typeof FormSchema>;

function isCompany(user: ITourist | ICompany): user is ICompany {
  return 'company_name' in user;
}

const normalizePhone = (phone: string) => {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('7')) return `+${digits}`;
  return `+7${digits}`;
};

function getTypeFromPath(
  pathname: string,
): IAdminProfileComponent['type'] | undefined {
  if (pathname.includes('tour-operator')) return 'tour-operator';
  if (pathname.includes('hotelier')) return 'hotelier';
  if (pathname.includes('tourist')) return 'tourist';
}

export function AdminProfileComponent() {
  const pathname = usePathname();
  const type = getTypeFromPath(pathname);

  const mask = new Mask({
    mask: '+_ (___) ___-__-__',
    replacement: { _: /\d/ },
  });
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();

  const [isMenuVisible, setIsVisible] = useState<boolean>(false);
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);

  const [bills, setBills] = useState(false);
  const [digest, setDigest] = useState(false);
  const [newApplication, setNewApplication] = useState(false);
  const [changeApplicationInfo, setChangeApplicationInfo] = useState(false);
  const [touristMessage, setTouristMessage] = useState(false);

  const [managerMessage, setManagerMessage] = useState(false);

  const inputImg = useRef<HTMLInputElement>(null);

  const [fetchMe] = useLazyFetchMeQuery();
  const [changeCompanyData] = useUpdateUserMutation();
  // const [logout] = useLogoutMutation();
  // const [deactivateCompanyProfile] = useDeactivateUserMutation();

  const user = useSelector(selectUserPersonalData);
  const userId = user?.id;
  const roleId = useSelector(selectUserRole);

  const [deleteTourOperatorProfile] = useDeleteUserMutation();

  const [birthDateValue, setBirthDateValue] = useState<string>('');

  const [isEditing, setIsEditing] = useState(false);

  const getCompanyName = (): string | undefined => {
    if (user && isCompany(user) && user.company_name) return user.company_name;
    return undefined;
  };

  const {
    register,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      phone: mask.format(user?.phone_number || ''),
      birthDate: user?.birth_date?.split('-').reverse().join('.'),
      company_name: getCompanyName(),
      // country: user.country || '',
      // city: user.city || '',
      // streetAndHouse: user.address || '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: mask.format(user.phone_number) || '',
        birthDate: user.birth_date?.split('-').reverse().join('.') || '',
        company_name: getCompanyName(),
        // country: user.country || '',
        // city: user.city || '',
        // streetAndHouse: user.address || '',
      });
    }
  }, [user, reset]);

  const handleEditToggle = () => {
    if (isEditing) {
      handleEditProfile();
    }
    setIsEditing(!isEditing);
  };

  const handleCancelEdit = () => {
    if (user) {
      // Сбросить значения формы к исходным данным
      reset({
        firstName: user.first_name || '',
        lastName: user.last_name || '',
        email: user.email || '',
        phone: mask.format(user.phone_number) || '',
        birthDate: user.birth_date?.split('-').reverse().join('.') || '',
        company_name: getCompanyName(),
        // country: user.country || '',
        // city: user.city || '',
        // streetAndHouse: user.address || '',
      });

      // Сбросить превью аватара, если было загружено
      setPreviewAvatar(user.avatar || null);

      // Сброс состояния редактирования
      setIsEditing(false);
    }
  };

  const formDataToChangeRequest = (isChangeImage: boolean = false) => {
    const values = getValues();
    const data = isChangeImage
      ? {
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone_number: user?.phone_number,
          email: user?.email,
          birthDate: user?.birth_date?.split('-').reverse().join('.') || '',
          company_name: getCompanyName(),
          // country: user.country || '',
          // city: user.city || '',
          // streetAndHouse: user.address || '',
        }
      : {
          first_name: values.firstName || user?.first_name,
          last_name: values.lastName || user?.last_name,
          phone_number: values.phone
            ? normalizePhone(values.phone)
            : user?.phone_number,
          email: values.email || user?.email,
          birthDate: user?.birth_date?.split('-').reverse().join('.') || '',
          company_name: getCompanyName(),
          // country: user.country || '',
          // city: user.city || '',
          // streetAndHouse: user.address || '',
        };

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) formData.append(key, value);
    });
    return formData;
  };

  const handleEditProfile = async () => {
    const values = getValues();
    const isDataChanged =
      values.firstName !== user?.first_name ||
      values.lastName !== user?.last_name ||
      values.email !== user?.email ||
      (values.phone && normalizePhone(values.phone) !== user?.phone_number) ||
      (isCompany(user) && values.company_name !== user.company_name) ||
      (values.birthDate &&
        values.birthDate !== user?.birth_date?.split('-').reverse().join('.'));

    if (!isDataChanged) {
      console.log('Данные не изменились. Запрос не отправляется.');
      return;
    }

    const formData = formDataToChangeRequest();

    if (userId && roleId) {
      try {
        const updatedData = await changeCompanyData({
          role: roleId,
          id: userId,
          formData,
        }).unwrap();

        dispatch(
          authApi.util.updateQueryData('fetchMe', undefined, (draft) => {
            Object.assign(draft, updatedData);
          }),
        );

        showToast('Профиль успешно обновлён', 'success');
      } catch (err) {
        console.error('Ошибка обновления профиля', err);
        showToast('Ошибка при обновлении профиля', 'error');
      }
    }

    setIsEditing(false);
  };

  // const handleDeactivateCompany = async () => {
  //   if (userId) {
  //     try {
  //       await deactivateCompanyProfile(userId).unwrap();
  //       showToast('Аккаунт деактивирован!', 'info');
  //       dispatch(clearCurrentUser());
  //       router.push('/');
  //     } catch {
  //       showToast('Ошибка деактивации', 'error');
  //     }
  //   }
  // };

  const previewFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        setPreviewAvatar(reader.result);
        const formData = formDataToChangeRequest(true);
        formData.append('avatar', file);

        if (userId && roleId && user && isCompany(user)) {
          try {
            await changeCompanyData({ role: roleId, id: userId, formData }).unwrap();
            await fetchMe();
          } catch {}
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // const handleLogout = async () => {
  //   try {
  //     logout();
  //     dispatch(clearCurrentUser());
  //     router.push('/');
  //   } catch {}
  // };

  const handleChangeMailing = (stateSetter: (value: boolean) => void) => {
    return (checked: boolean) => {
      stateSetter(checked);

      const toastMessage = checked ? `Включили рассылку!` : `Отключили рассылку!`;

      const toastType: ToastType = checked ? 'success' : 'info';

      showToast(toastMessage, toastType);
    };
  };

  const handleDeleteProfile = async () => {
    if (userId) {
      try {
        await deleteTourOperatorProfile({
          role: 'TOUR_OPERATOR',
          id: userId,
        }).unwrap();
        dispatch(clearCurrentUser());
        router.push('/');
      } catch {}
    }
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

  const isClient = typeof window !== 'undefined';

  if (!user && isClient) {
    return (
      <div className='text-gray-500 py-10 text-center'>Загрузка профиля...</div>
    );
  }

  return (
    <div className='mx-auto md:mx-0 md:w-full'>
      <Typography
        variant='l-bold'
        className='-mt-5 mb-9 block text-[20px] font-semibold md:hidden'
      >
        Профиль
      </Typography>

      <div className='mb-7 rounded-[20px] border-2 border-grey-50 px-[16px] py-[17px] shadow-lg md:mb-[18px] md:px-[16px] md:pb-[18px] md:pr-[19px] md:pt-[21px]'>
        <div className='relative mb-4 flex justify-between md:mb-[21px] lg:mb-[34px]'>
          <div>
            <Typography
              variant='h2'
              className='mb-0.5 block text-[28px] leading-8 md:mb-1 md:text-[32px] md:tracking-[0.02em] lg:mt-3'
            >
              Основная&nbsp;
              <br className='md:hidden' />
              информация
            </Typography>
            <Typography
              variant='m'
              className='flex leading-5 text-grey-800 md:text-[20px] md:tracking-[-0.045em] lg:hidden'
            >
              {type === 'tour-operator' && (
                <>Данные о&nbsp;турагенте будем отображать на&nbsp;сайте</>
              )}
              {type === 'hotelier' && ''}
              {type === 'tourist' && ''}
            </Typography>
          </div>
          {/* Kebab button */}
          <button
            className='kebab-button absolute -top-1 right-0 self-start rounded-[12px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:rounded-[20px] md:px-[18px] md:py-[18px]'
            onClick={() => setIsVisible(!isMenuVisible)}
          >
            <SvgSprite name='more' className='' />
          </button>
          {isMenuVisible && (
            <div className='z-1 absolute right-0 top-11 flex flex-col rounded-[20px] border-2 border-grey-50 bg-white shadow-lg md:top-[3.75rem]'>
              {/* <button
                className='rounded-[20px] px-4 py-2 text-left text-red-primary-800 hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                onClick={handleLogout}
              >
                Выйти
              </button>
              <button
                className='rounded-[20px] px-4 py-2 text-left text-red-primary-800 hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                onClick={handleDeactivateCompany}
              >
                Деактивировать профиль
              </button> */}
              <button
                className='rounded-[20px] px-4 py-2 text-left text-red-primary-800 hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                onClick={handleDeleteProfile}
                type='button'
              >
                Удалить профиль
              </button>
            </div>
          )}
        </div>
        {(type === 'tour-operator' || type === 'hotelier') && (
          <form
            id={`${type}-data`}
            className='flex flex-col md:flex-row md:justify-between md:gap-5'
            onSubmit={handleSubmit(handleEditProfile)}
          >
            <label
              htmlFor='image'
              className='group relative mb-5 ml-auto mr-auto flex h-[180px] w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#C5DAFF] md:m-0 md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px] lg:gap-10'
              style={{
                backgroundImage: previewAvatar
                  ? `url('${previewAvatar}')`
                  : user?.avatar
                    ? `url('${user.avatar}')`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className='absolute inset-0 z-0 rounded-full transition duration-500 ease-in-out group-hover:bg-white group-hover:opacity-40 group-hover:backdrop-blur-[1px]' />

              <input
                onChange={(e) => previewFile(e)}
                ref={inputImg}
                type='file'
                id='image'
                className='hidden'
                accept='image/*'
                multiple={false}
              />

              <div className='relative z-10'>
                {user?.avatar || previewAvatar ? (
                  <SvgSprite
                    name='edit-image'
                    width={40}
                    height={40}
                    className='cursor-pointer'
                  />
                ) : (
                  <SvgSprite
                    name='add-image'
                    width={40}
                    height={40}
                    className='cursor-pointer'
                  />
                )}
              </div>
            </label>
            <div className='w-full md:w-[80%] lg:w-[76.5%]'>
              <Typography
                variant='h2'
                className='mb-2 block text-[20px] md:mb-4 lg:text-[24px] lg:tracking-wide'
              >
                Контактные данные
              </Typography>
              <div className='mb-5 flex flex-col gap-[11px] md:mb-10 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-4 lg:mb-11'>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor={`${type}-user-name`}
                  >
                    Имя
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'Имя обязательно',
                      minLength: {
                        value: 2,
                        message: 'Имя должно содержать минимум 2 буквы',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Имя должно содержать максимум 30 букв',
                      },
                      pattern: {
                        value: /^[А-Яа-яЁёA-Za-z\s-]+$/,
                        message: 'Имя может содержать только буквы',
                      },
                    })}
                    id={`${type}-user-name`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    placeholder='Иван'
                    maxLength={30}
                    disabled={!isEditing}
                  />
                  {errors.firstName && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.firstName.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor={`${type}-user-surname`}
                  >
                    Фамилия
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Фамилия обязательна',
                      minLength: {
                        value: 2,
                        message: 'Фамилия должна содержать минимум 2 буквы',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Фамилия должна содержать максимум 30 букв',
                      },
                      pattern: {
                        value: /^[А-Яа-яЁёA-Za-z\s-]+$/,
                        message: 'Фамилия может содержать только буквы',
                      },
                    })}
                    id={`${type}-user-surname`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    placeholder='Иванов'
                    maxLength={30}
                    disabled={!isEditing}
                  />
                  {errors.lastName && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.lastName.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email обязателен',
                      minLength: {
                        value: 8,
                        message: 'Email должен быть длиннее 8 символов',
                      },
                      maxLength: {
                        value: 40,
                        message: 'Email не должен быть длиннее 40 символов',
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введите корректный email',
                      },
                    })}
                    id={`${type}-email`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    disabled={!isEditing}
                    maxLength={40}
                    type='email'
                    name='email'
                    placeholder='Введите почту'
                  />
                  {errors.email && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.email.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='phone'
                  >
                    Телефон
                  </label>
                  <InputMask
                    {...register('phone')}
                    mask='+7 (___) ___-__-__'
                    replacement={{ _: /\d/ }}
                    id={`${type}-phone`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    disabled={!isEditing}
                    type='phone'
                    name='phone'
                    placeholder='Введите номер в формате +7(9**)*******'
                  />
                  {errors.phone && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.phone.message}
                    </Typography>
                  )}
                </div>
              </div>
              <Typography
                variant='h2'
                className='mb-4 block text-[20px] md:mb-5 lg:mb-4 lg:text-[24px] lg:tracking-wide'
              >
                Юридический адрес
              </Typography>
              <div className='mb-4 flex w-full flex-col gap-[6px] md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-[15px] lg:mb-11'>
                <div className='md:col-span-2'>
                  <label
                    className='inline-block text-[20px] font-medium leading-[13.5px] tracking-tighter lg:leading-normal lg:tracking-normal'
                    htmlFor='name'
                  >
                    {type === 'tour-operator' && 'Название турагента'}
                    {type === 'hotelier' && 'Название отеля / компании'}
                  </label>
                  <input
                    {...register('company_name')}
                    id={`${type}-name`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    disabled={!isEditing}
                    type='text'
                    name='name'
                    maxLength={50}
                    placeholder={
                      type === 'tour-operator'
                        ? 'Название туроператора'
                        : type === 'hotelier'
                          ? 'Название отеля'
                          : ''
                    }
                  />
                  {errors.company_name && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.company_name.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <label
                    className='inline-block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='country'
                  >
                    Страна
                  </label>
                  <input
                    id={`${type}-country`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    name='country'
                    placeholder='Введите страну туроператора'
                    disabled={!isEditing}
                  />
                </div>
                <div>
                  <label
                    className='inline-block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='city'
                  >
                    Город
                  </label>
                  <input
                    id={`${type}-city`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    name='city'
                    placeholder='Введите город туроператора'
                    disabled={!isEditing}
                  />
                </div>
                <div className='md:col-span-2'>
                  <label
                    className='inline-block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='address'
                  >
                    Улица, дом
                  </label>
                  <input
                    id={`${type}-address`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    name='address'
                    placeholder='Введите адрес туроператора'
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className='flex w-full text-center md:flex-row-reverse md:gap-3'>
                <ButtonCustom
                  className='w-full py-[10px] text-[18px] font-medium text-green-950 md:max-w-[195px] md:px-7 md:py-[13px] md:text-[20px] lg:max-w-[202px] lg:py-4 lg:text-[21px] xl:px-7 xl:py-5'
                  variant='primary'
                  size='s'
                  onClick={handleEditToggle}
                  type='button'
                >
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </ButtonCustom>
                {isEditing && (
                  <ButtonCustom
                    className='w-full py-[10px] text-[18px] font-medium text-green-950 md:max-w-[195px] md:px-7 md:py-[13px] md:text-[20px] lg:max-w-[202px] lg:py-4 lg:text-[21px] xl:px-7 xl:py-5'
                    variant='secondary'
                    size='s'
                    onClick={handleCancelEdit}
                    type='button'
                  >
                    Отменить
                  </ButtonCustom>
                )}
              </div>
            </div>
          </form>
        )}

        {type === 'tourist' && (
          <form
            id={`${type}-data`}
            className='flex flex-col md:flex-row md:justify-between md:gap-5'
            onSubmit={handleSubmit(handleEditProfile)}
          >
            <label
              htmlFor='image'
              className='group relative mb-5 ml-auto mr-auto flex h-[180px] w-[180px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#C5DAFF] md:m-0 md:h-[140px] md:w-[140px] lg:h-[180px] lg:w-[180px] lg:gap-10'
              style={{
                backgroundImage: previewAvatar
                  ? `url('${previewAvatar}')`
                  : user?.avatar
                    ? `url('${user.avatar}')`
                    : undefined,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }}
            >
              <div className='absolute inset-0 z-0 rounded-full transition duration-500 ease-in-out group-hover:bg-white group-hover:opacity-40 group-hover:backdrop-blur-[1px]' />

              <input
                onChange={(e) => previewFile(e)}
                ref={inputImg}
                type='file'
                id='image'
                className='hidden'
                accept='image/*'
                multiple={false}
              />

              <div className='relative z-10'>
                {user?.avatar || previewAvatar ? (
                  <SvgSprite
                    name='edit-image'
                    width={40}
                    height={40}
                    className='cursor-pointer'
                  />
                ) : (
                  <SvgSprite
                    name='add-image'
                    width={40}
                    height={40}
                    className='cursor-pointer'
                  />
                )}
              </div>
            </label>
            <div className='w-full md:w-[80%] lg:w-[76.5%]'>
              <Typography
                variant='h2'
                className='mb-2 block text-[20px] md:mb-4 lg:text-[24px] lg:tracking-wide'
              >
                Контактные данные
              </Typography>
              <div className='mb-5 flex flex-col gap-[11px] md:mb-10 md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-4 lg:mb-11'>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor={`${type}-user-name`}
                  >
                    Имя
                  </label>
                  <input
                    {...register('firstName', {
                      required: 'Имя обязательно',
                      minLength: {
                        value: 2,
                        message: 'Имя должно содержать минимум 2 буквы',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Имя должно содержать максимум 30 букв',
                      },
                      pattern: {
                        value: /^[А-Яа-яЁёA-Za-z\s-]+$/,
                        message: 'Имя может содержать только буквы',
                      },
                    })}
                    id={`${type}-user-name`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    placeholder='Иван'
                    maxLength={30}
                    disabled={!isEditing}
                  />
                  {errors.firstName && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.firstName.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor={`${type}-user-surname`}
                  >
                    Фамилия
                  </label>
                  <input
                    {...register('lastName', {
                      required: 'Фамилия обязательна',
                      minLength: {
                        value: 2,
                        message: 'Фамилия должна содержать минимум 2 буквы',
                      },
                      maxLength: {
                        value: 30,
                        message: 'Фамилия должна содержать максимум 30 букв',
                      },
                      pattern: {
                        value: /^[А-Яа-яЁёA-Za-z\s-]+$/,
                        message: 'Фамилия может содержать только буквы',
                      },
                    })}
                    id={`${type}-user-surname`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    type='text'
                    placeholder='Иванов'
                    maxLength={30}
                    disabled={!isEditing}
                  />
                  {errors.lastName && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.lastName.message}
                    </Typography>
                  )}
                </div>

                <div className='flex flex-col md:col-span-2'>
                  <label
                    htmlFor='birthDateText'
                    className='flex text-xl font-medium leading-7'
                  >
                    Дата рождения
                  </label>
                  <div
                    className={`relative min-h-[42px] rounded-lg border border-grey-700 text-grey-950 transition md:min-h-[42px] lg:min-h-[46px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                  >
                    <input
                      onChange={(e) => handleChangeBirthdate(e, true)}
                      id={`${type}-birthDate`}
                      className='absolute right-[1px] top-0 z-10 max-h-[48px] max-w-[50px] cursor-pointer rounded-lg px-3 py-1 text-base text-grey-950 focus:outline-none'
                      type='date'
                      value={birthDateValue}
                      disabled={!isEditing}
                    />
                    <InputMask
                      {...register('birthDate')}
                      mask='__.__.____'
                      replacement={{ _: /\d/ }}
                      onChange={(e) => handleChangeBirthdate(e, false)}
                      id='birthDateText'
                      className='absolute bottom-0 left-0 right-[35px] top-0 w-full rounded-lg px-3 py-1 text-base text-grey-950 focus:outline-none'
                      type='text'
                      placeholder='ДД.ММ.ГГГГ'
                      disabled={!isEditing}
                    />
                  </div>
                  {errors.birthDate && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.birthDate.message}
                    </Typography>
                  )}
                </div>

                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='email'
                  >
                    Email
                  </label>
                  <input
                    {...register('email', {
                      required: 'Email обязателен',
                      minLength: {
                        value: 8,
                        message: 'Email должен быть длиннее 8 символов',
                      },
                      maxLength: {
                        value: 40,
                        message: 'Email не должен быть длиннее 40 символов',
                      },
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: 'Введите корректный email',
                      },
                    })}
                    id={`${type}-email`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    disabled={!isEditing}
                    maxLength={40}
                    type='email'
                    name='email'
                    placeholder='Введите почту'
                  />
                  {errors.email && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.email.message}
                    </Typography>
                  )}
                </div>
                <div>
                  <label
                    className='block text-[20px] font-medium tracking-tighter lg:tracking-normal'
                    htmlFor='phone'
                  >
                    Телефон
                  </label>
                  <InputMask
                    {...register('phone')}
                    mask='+7 (___) ___-__-__'
                    replacement={{ _: /\d/ }}
                    id={`${type}-phone`}
                    className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 py-2 text-grey-950 duration-300 ease-in-out lg:py-[10px] ${isEditing ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                    disabled={!isEditing}
                    type='phone'
                    name='phone'
                    placeholder='Введите номер в формате +7(9**)*******'
                  />
                  {errors.phone && (
                    <Typography variant='s' className='text-red-primary-800'>
                      {errors.phone.message}
                    </Typography>
                  )}
                </div>
              </div>
              <div className='flex w-full text-center md:flex-row-reverse md:gap-3'>
                <ButtonCustom
                  className='w-full py-[10px] text-[18px] font-medium text-green-950 md:max-w-[195px] md:px-7 md:py-[13px] md:text-[20px] lg:max-w-[202px] lg:py-4 lg:text-[21px] xl:px-7 xl:py-5'
                  variant='primary'
                  size='s'
                  onClick={handleEditToggle}
                  type='button'
                >
                  {isEditing ? 'Сохранить' : 'Редактировать'}
                </ButtonCustom>
                {isEditing && (
                  <ButtonCustom
                    className='w-full py-[10px] text-[18px] font-medium text-green-950 md:max-w-[195px] md:px-7 md:py-[13px] md:text-[20px] lg:max-w-[202px] lg:py-4 lg:text-[21px] xl:px-7 xl:py-5'
                    variant='secondary'
                    size='s'
                    onClick={handleCancelEdit}
                    type='button'
                  >
                    Отменить
                  </ButtonCustom>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
      <div className='rounded-[20px] border-2 border-grey-50 px-[14px] py-[12px] shadow-lg md:px-[14px] md:pb-[17px] lg:px-[16px] lg:py-[16px]'>
        <div className='mb-1 flex flex-col md:mb-5 lg:mb-6'>
          <Typography
            variant='subtitle3'
            className='inline-block font-medium tracking-[-0.065em] md:tracking-[0.02em]'
          >
            Уведомления
          </Typography>
          <Typography
            variant='m'
            className='hidden text-[18px] font-normal text-grey-700 md:inline-block md:text-[20px] md:tracking-tighter lg:tracking-normal'
          >
            Будут приходить на указанный email
          </Typography>
        </div>
        {(type === 'tour-operator' || type === 'hotelier') && (
          <form action='PUT' className='flex flex-col gap-3 lg:gap-2'>
            <div className='flex'>
              <Checkbox
                id='bills'
                isChecked={bills}
                onChange={handleChangeMailing(setBills)}
              />
              <label className='text-[16px] lg:text-[20px]' htmlFor='bills'>
                Сверки и счета
              </label>
            </div>

            <div className='flex'>
              <Checkbox
                id='new-application'
                isChecked={newApplication}
                onChange={handleChangeMailing(setNewApplication)}
              />
              <label className='text-[16px] lg:text-[20px]' htmlFor='newApplication'>
                Новая заявка
              </label>
            </div>

            <div className='flex'>
              <Checkbox
                id='change-application-info'
                isChecked={changeApplicationInfo}
                onChange={handleChangeMailing(setChangeApplicationInfo)}
              />
              <label
                className='text-[16px] lg:text-[20px]'
                htmlFor='changeApplicationInfo'
              >
                Изменение информации в заявке
              </label>
            </div>

            <div className='flex'>
              <Checkbox
                id='tourist-message'
                isChecked={touristMessage}
                onChange={handleChangeMailing(setTouristMessage)}
              />
              <label className='text-[16px] lg:text-[20px]' htmlFor='touristMessage'>
                Сообщения от туриста
              </label>
            </div>

            <div className='flex'>
              <Checkbox
                id='digest'
                isChecked={digest}
                onChange={handleChangeMailing(setDigest)}
              />
              <label className='text-[16px] lg:text-[20px]' htmlFor='digest'>
                Дайджест
              </label>
            </div>

            <div className='flex'>
              <Checkbox
                id='manager-message'
                isChecked={managerMessage}
                onChange={handleChangeMailing(setManagerMessage)}
              />
              <label className='text-[16px] lg:text-[20px]' htmlFor='managerMessage'>
                Сообщение от менеджера
              </label>
            </div>
          </form>
        )}

        {type === 'tourist' && (
          <form action='PUT' className='flex flex-col gap-3 lg:gap-2'>
            <div className='flex'>
              <Checkbox
                id='change-application-info'
                isChecked={changeApplicationInfo}
                onChange={handleChangeMailing(setChangeApplicationInfo)}
              />
              <label
                className='text-[16px] lg:text-[20px]'
                htmlFor='changeApplicationInfo'
              >
                Изменение информации в заявке
              </label>
            </div>
            <div className='flex'>
              <Checkbox
                id='manager-message'
                isChecked={managerMessage}
                onChange={handleChangeMailing(setManagerMessage)}
              />
              <label className='text-[16px] lg:text-[20px]' htmlFor='managerMessage'>
                Сообщение от менеджера
              </label>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
