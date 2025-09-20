'use client';
import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask, Mask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { z } from 'zod';

import {
  clearCurrentUser,
  selectUserPersonalData,
  setCurrentUser,
} from '@/rtk/currentUserSlice';
import { useLazyFetchMeQuery } from '@/servicesApi/authApi';
import { useDeleteUserMutation, useUpdateUserMutation } from '@/servicesApi/userApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { useToast } from '@/shared/ui/toast/toastService';
import { ToastType } from '@/shared/ui/toast/ToastType.types';
import { Typography } from '@/shared/ui/typography';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';
import { AdminPanelDashboard } from '@/widgets/admin-panel/admin-panel-dashboard';

// Размер загружаемой фотографии 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024;
const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
// Схема ZOD типизации и валидации для формы
const FormSchema = z.object({
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
});

// Тип формы исходя из схемы ZOD
type FormData = z.infer<typeof FormSchema>;

export function PersonalData() {
  const mask = new Mask({
    mask: '+_ (___) ___-__-__',
    replacement: { _: /\d/ },
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const { showToast } = useToast();

  const [isMenuVisible, setIsVisible] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveClicked, setIsSaveClicked] = useState(false);

  const handleEditToggle = () => {
    if (isEditing) {
      setIsSaveClicked(true);
      handleChangeProfile();
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
      });

      // Сбросить превью аватара, если было загружено
      setPreviewAvatar(user.avatar || null);

      // Сброс состояния редактирования
      setIsEditing(false);
    }
  };

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [birthDateValue, setBirthDateValue] = useState<string>('');

  const [fetchMe] = useLazyFetchMeQuery();
  const [changeTouristProfile] = useUpdateUserMutation();
  const [deleteTouristProfile] = useDeleteUserMutation();
  const [changeApplicationInfo, setChangeApplicationInfo] = useState(false);
  const [managerMessage, setManagerMessage] = useState(false);

  const user = useSelector(selectUserPersonalData);

  const userId = user?.id;

  const formDataToChangeRequest = (isChangeImage: boolean = false) => {
    let data;

    if (isChangeImage === true) {
      data = {
        first_name: user?.first_name,
        last_name: user?.last_name,
        phone_number: user?.phone_number,
        email: user?.email,
      };
    } else {
      const values = getValues();
      data = {
        first_name: values.firstName ? values.firstName : user?.first_name,
        last_name: values.lastName ? values.lastName : user?.last_name,
        phone_number: values.phone ? values.phone : user?.phone_number,
        email: values.email ? values.email : user?.email,
      };
    }

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        formData.append(key, value);
      }
    }

    return formData;
  };

  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: user?.first_name,
      lastName: user?.last_name,
      email: user?.email,
      phone: user?.phone_number,
      birthDate: user?.birth_date?.split('-').reverse().join('.'),
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
      });
    }
  }, [user, reset]);

  // INPUT для загрузки фото пользователя
  const inputImg = useRef<HTMLInputElement>(null);

  function previewFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setValue('image', file);

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        setPreviewAvatar(reader.result);

        const formData = formDataToChangeRequest(true);
        formData.append('avatar', file);

        if (userId) {
          try {
            await changeTouristProfile({
              role: 'USER',
              id: userId,
              formData: formData,
            }).unwrap();
            await fetchMe();
          } catch {}
        }
      }
    };

    reader.readAsDataURL(file);
  }

  const handleChangeProfile = async () => {
    if (!isSaveClicked) return;

    const serverBirthDate = user?.birth_date || null;
    const clientBirthDateRaw = getValues().birthDate || null;
    const clientBirthDate = clientBirthDateRaw
      ? clientBirthDateRaw.split('.').reverse().join('-')
      : null;

    const values = getValues();

    const formatDate = (date?: string | null) =>
      date ? date.split('.').reverse().join('-') : null;

    const normalizePhone = (phone?: string | null) =>
      phone ? phone.replace(/[^\d]/g, '') : '';

    const isDataChanged =
      values.firstName !== user?.first_name ||
      values.lastName !== user?.last_name ||
      values.email !== user?.email ||
      normalizePhone(values.phone) !== normalizePhone(user?.phone_number) ||
      formatDate(values.birthDate) !== serverBirthDate;

    if (!isDataChanged) {
      console.log('Данные не изменились. Запрос не отправляется.');
      return;
    }

    const data = {
      first_name: values.firstName ? values.firstName : user?.first_name,
      last_name: values.lastName ? values.lastName : user?.last_name,
      phone_number: values.phone ? values.phone : user?.phone_number,
      email: values.email ? values.email : user?.email,
    };

    const formData = formDataToChangeRequest();

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        formData.append(key, value);
      }
    }

    if (clientBirthDate !== serverBirthDate) {
      formData.append('birth_date', clientBirthDate ?? '');
    }

    if (userId) {
      try {
        await changeTouristProfile({
          role: 'USER',
          id: userId,
          formData: formData,
        }).unwrap();
        showToast('Данные успешно сохранены', 'success');
        const data = await fetchMe().unwrap();
        if (data?.user) {
          dispatch(setCurrentUser(data.user));
        }
      } catch {
        showToast('Ошибка сервера', 'error');
      }
    }
    setIsEditing(false);
    setIsSaveClicked(false);
  };

  const handleDeleteProfile = async () => {
    if (userId) {
      try {
        await deleteTouristProfile({ role: 'USER', id: userId }).unwrap();
        dispatch(clearCurrentUser());
        router.push('/');
      } catch {}
    }
  };

  const handleChangeMailing = (stateSetter: (value: boolean) => void) => {
    return (checked: boolean) => {
      stateSetter(checked);

      const toastMessage = checked ? `Включили рассылку!` : `Отключили рассылку!`;

      const toastType: ToastType = checked ? 'success' : 'info';

      showToast(toastMessage, toastType);
    };
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
    <section className='relative overflow-hidden pb-24 pt-[47px] md:static md:pb-36 md:pt-8 xl:pb-20 xl:pt-12'>
      <div className='absolute left-0 top-0 z-[-1] h-[213px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[427px] md:rounded-bl-[100px] md:rounded-br-none md:bg-[url("/admin-panel-tourist-bg960.svg")] xl:md:rounded-br-[100px] xl:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>
      <div className='container'>
        <Typography
          variant='h1'
          className='mb-3.5 text-[28px] font-semibold leading-9 text-white md:mb-7 md:text-[2.50rem] md:leading-[130%] xl:mb-10 xl:text-6xl'
        >
          Личные данные
        </Typography>
        <div className='flex w-full items-start justify-between gap-4'>
          <div className='hidden lg:flex'>
            <AdminPanelDashboard type='tourist' />
          </div>
          <div className='flex w-full flex-col gap-4'>
            <form
              className='relative flex w-full flex-col items-center rounded-2xl bg-white px-4 py-10 shadow-xl md:p-5 md:pt-12 lg:pt-6 xl:px-12 xl:py-10'
              onSubmit={handleSubmit(handleChangeProfile)}
            >
              {!user ? (
                <div className='text-gray-500 py-10 text-center text-xl lg:min-h-[588px]'>
                  Загрузка профиля...
                </div>
              ) : (
                <>
                  <div className='relative hidden w-full self-start lg:mb-[64px] lg:flex'>
                    <Typography
                      variant='h2'
                      className='hidden self-start text-[32px] font-semibold text-grey-950 lg:flex'
                    >
                      Основная информация
                    </Typography>
                    {/* Kebab button Desktop */}
                    <button
                      className='kebab-button absolute right-2 top-2 self-start rounded-[12px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:rounded-[20px] md:px-[18px] md:py-[18px] lg:-top-1 lg:right-0'
                      onClick={() => setIsVisible(!isMenuVisible)}
                    >
                      <SvgSprite name='more' className='' />
                    </button>
                  </div>
                  <div className='mb-5 flex w-full flex-col md:flex-row md:items-center md:justify-between lg:mb-[38px]'>
                    {/* Kebab button */}
                    <button
                      className='kebab-button absolute right-2 top-2 self-start rounded-[12px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:rounded-[20px] md:px-[18px] md:py-[18px] lg:hidden'
                      onClick={() => setIsVisible(!isMenuVisible)}
                    >
                      <SvgSprite name='more' className='' />
                    </button>
                    {isMenuVisible && (
                      <div className='z-1 absolute right-0 top-11 flex flex-col rounded-[20px] border-2 border-grey-50 bg-white shadow-lg md:top-[3.75rem]'>
                        <button
                          className='rounded-[20px] px-4 py-2 text-left text-red-primary-800 hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                          onClick={handleDeleteProfile}
                          type='button'
                        >
                          Удалить профиль
                        </button>
                      </div>
                    )}
                    <label
                      htmlFor='image'
                      className='md:h-54 md:w-54 group relative mb-5 ml-auto mr-auto flex h-44 w-44 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#C5DAFF] md:m-0 md:mt-7 md:self-start lg:mt-0'
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
                        {...register('image')}
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
                    {errors.image && (
                      <Typography
                        variant='s'
                        className='mx-auto text-red-primary-800'
                      >
                        {errors.image.message}
                      </Typography>
                    )}
                    <div className='mb-1 flex flex-col gap-2 md:grid md:w-[71%] md:grid-cols-2 lg:w-[76.5%] lg:gap-x-5 lg:gap-y-5'>
                      <label htmlFor='firstName' className='flex flex-col'>
                        <Typography className='text-xl font-medium leading-7'>
                          Имя
                        </Typography>
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
                          {...register('firstName')}
                          id='firstName'
                          className='w-full rounded-lg border border-grey-700 px-3 py-2 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                          type='text'
                          placeholder='Введите имя'
                          maxLength={30}
                          disabled={!isEditing}
                        />
                        {errors.firstName && (
                          <Typography variant='s' className='text-red-primary-800'>
                            {errors.firstName.message}
                          </Typography>
                        )}
                      </label>

                      <label htmlFor='lastName' className='flex flex-col'>
                        <Typography className='text-xl font-medium leading-7'>
                          Фамилия
                        </Typography>
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
                          id='lastName'
                          className='w-full rounded-lg border border-grey-700 px-3 py-2 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                          type='text'
                          placeholder='Введите фамилию'
                          maxLength={30}
                          disabled={!isEditing}
                        />
                        {errors.lastName && (
                          <Typography variant='s' className='text-red-primary-800'>
                            {errors.lastName.message}
                          </Typography>
                        )}
                      </label>

                      <label
                        htmlFor='birthDateText'
                        className='flex flex-col md:col-span-2'
                      >
                        <Typography className='text-xl font-medium leading-7'>
                          Дата рождения
                        </Typography>
                        <div className='relative min-h-[42px] rounded-lg border border-grey-700 text-grey-950 transition focus-within:border-blue-600 hover:border-blue-600 focus:border-blue-600 active:border-blue-600 md:min-h-[42px] lg:min-h-[46px]'>
                          <input
                            onChange={(e) => handleChangeBirthdate(e, true)}
                            id='birthDate'
                            className='absolute right-[1px] top-0 z-10 max-h-[48px] max-w-[50px] cursor-pointer rounded-lg px-3 py-1 text-base focus:outline-none'
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
                            className='absolute bottom-0 left-0 right-[35px] top-0 w-full rounded-lg px-3 py-1 text-base focus:outline-none'
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
                      </label>

                      <label htmlFor='email' className='flex flex-col'>
                        <Typography className='text-xl font-medium leading-7'>
                          Email
                        </Typography>
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
                          id='email'
                          className='w-full rounded-lg border border-grey-700 px-3 py-2 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                          type='text'
                          placeholder='Введите email'
                          maxLength={40}
                          disabled={!isEditing}
                        />
                        {errors.email && (
                          <Typography variant='s' className='text-red-primary-800'>
                            {errors.email.message}
                          </Typography>
                        )}
                      </label>
                      <label htmlFor='phone' className='flex flex-col'>
                        <Typography className='text-xl font-medium leading-7'>
                          Телефон
                        </Typography>
                        <InputMask
                          mask='+7 (___) ___-__-__'
                          replacement={{ _: /\d/ }}
                          {...register('phone')}
                          id='phone'
                          className='w-full rounded-lg border border-grey-700 px-3 py-2 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                          type='text'
                          placeholder='Введите телефон'
                          autoComplete='off'
                          disabled={!isEditing}
                        />
                        {errors.phone && (
                          <Typography variant='s' className='text-red-primary-800'>
                            {errors.phone.message}
                          </Typography>
                        )}
                      </label>
                    </div>
                  </div>
                  <div className='mb-4 w-full text-center md:flex md:flex-row-reverse md:gap-3 lg:mb-0'>
                    <ButtonCustom
                      className='w-full px-7 py-3 md:max-w-[9.50rem] lg:h-[4.4rem] lg:max-w-[12.50rem] lg:text-[20px] xl:px-7 xl:py-5'
                      variant='primary'
                      size='s'
                      onClick={handleEditToggle}
                    >
                      {isEditing ? 'Сохранить' : 'Редактировать'}
                    </ButtonCustom>
                    {isEditing && (
                      <ButtonCustom
                        className='w-full px-7 py-3 md:max-w-[9.50rem] lg:h-[4.4rem] lg:max-w-[12.50rem] lg:text-[20px] xl:px-7 xl:py-5'
                        variant='secondary'
                        size='s'
                        onClick={handleCancelEdit}
                      >
                        Отменить
                      </ButtonCustom>
                    )}
                  </div>

                  <div className='hidden md:absolute md:-bottom-28 md:right-[28%] md:block xl:hidden'>
                    <SvgSprite name='frog-on-chair' />
                  </div>
                  <div className='hidden xl:absolute xl:-bottom-[5.50rem] xl:-left-[3.38rem] xl:block'>
                    <SvgSprite name='frog-on-suitcase' />
                  </div>
                </>
              )}
            </form>
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
                  <label
                    className='text-[16px] lg:text-[20px]'
                    htmlFor='managerMessage'
                  >
                    Сообщение от менеджера
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
