'use client';
import { useEffect, useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { InputMask, Mask } from '@react-input/mask';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { selectUserId } from '@/rtk/userSlice';
import {
  useDeleteUserMutation,
  useGetUserDataQuery,
  useUpdateUserMutation,
} from '@/servicesApi/userApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { useToast } from '@/shared/ui/toast/toastService';
import { Typography } from '@/shared/ui/typography';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';

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

  const router = useRouter();
  const { showToast } = useToast();

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [birthDateValue, setBirthDateValue] = useState<string>('');

  const { data: fetchMeData, refetch } = useFetchMeQuery();
  const [changeTouristProfile] = useUpdateUserMutation();
  const [deleteTouristProfile] = useDeleteUserMutation();

  const user = fetchMeData?.user;
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
            refetch();
          } catch {}
        }
      }
    };

    reader.readAsDataURL(file);
  }

  const handleChangeProfile = async () => {
    const serverBirthDate = user?.birth_date || null;
    const clientBirthDateRaw = getValues().birthDate || null;
    const clientBirthDate = clientBirthDateRaw
      ? clientBirthDateRaw.split('.').reverse().join('-')
      : null;

    const values = getValues();

    const isDataChanged =
      (values.firstName && values.firstName !== user?.first_name) ||
      (values.lastName && values.lastName !== user?.last_name) ||
      (values.phone && values.phone !== user?.phone_number) ||
      (values.email && values.email !== user?.email) ||
      clientBirthDate !== serverBirthDate;

    if (!isDataChanged) {
      console.log('Данные не изменились. Запрос не отправляется.');
      showToast('Данные успешно сохранены', 'success');
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
      } catch {
        showToast('Ошибка сервера', 'error');
      }
    }
  };

  const handleDeleteProfile = async () => {
    if (userId) {
      try {
        await deleteTouristProfile({ role: 'USER', id: userId }).unwrap();
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

  return (
    <section className='relative overflow-hidden pb-24 pt-11 md:static md:pb-36 md:pt-8 xl:pb-20 xl:pt-12'>
      <div className='absolute left-0 top-0 z-[-1] h-[213px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[427px] md:rounded-bl-[100px] md:rounded-br-none md:bg-[url("/admin-panel-tourist-bg960.svg")] xl:md:rounded-br-[100px] xl:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>
      <div className='container'>
        <Typography
          variant='h1'
          className='mb-3.5 text-4xl font-semibold leading-9 text-white md:mb-7 md:text-[2.50rem] md:leading-[130%] xl:mb-10 xl:text-6xl'
        >
          Личные данные
        </Typography>
        <form
          className='relative flex flex-col items-center rounded-2xl bg-white px-4 py-10 shadow-xl md:p-5 xl:px-48 xl:py-10'
          onSubmit={handleSubmit(handleChangeProfile)}
        >
          {!user ? (
            <div className='text-gray-500 py-10 text-center text-xl lg:min-h-[588px]'>
              Загрузка профиля...
            </div>
          ) : (
            <>
              <div className='mb-5 flex w-full flex-col md:flex-row md:items-center md:justify-between'>
                <label
                  htmlFor='image'
                  className='group relative mb-5 ml-auto mr-auto flex h-44 w-44 cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[#C5DAFF] md:m-0 md:h-56 md:w-56'
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
                  <Typography variant='s' className='mx-auto text-red-primary-800'>
                    {errors.image.message}
                  </Typography>
                )}
                <div className='flex flex-col gap-5 md:w-[65.53%]'>
                  <label htmlFor='firstName' className='flex flex-col gap-1'>
                    <Typography className='text-xl font-medium leading-8'>
                      Имя*
                    </Typography>
                    <input
                      {...register('firstName')}
                      id='firstName'
                      className='w-full rounded-lg border border-grey-700 p-3 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                      type='text'
                      placeholder='Введите имя'
                    />
                    {errors.firstName && (
                      <Typography variant='s' className='text-red-primary-800'>
                        {errors.firstName.message}
                      </Typography>
                    )}
                  </label>

                  <label htmlFor='lastName' className='flex flex-col gap-1'>
                    <Typography className='text-xl font-medium leading-8'>
                      Фамилия*
                    </Typography>
                    <input
                      {...register('lastName')}
                      id='lastName'
                      className='w-full rounded-lg border border-grey-700 p-3 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                      type='text'
                      placeholder='Введите фамилию'
                    />
                    {errors.lastName && (
                      <Typography variant='s' className='text-red-primary-800'>
                        {errors.lastName.message}
                      </Typography>
                    )}
                  </label>

                  <label htmlFor='birthDateText' className='flex flex-col gap-1'>
                    <Typography className='text-xl font-medium leading-8'>
                      Дата рождения
                    </Typography>
                    <div className='relative min-h-[50px] rounded-lg border border-grey-700 text-grey-950 transition focus-within:border-blue-600 hover:border-blue-600 focus:border-blue-600 active:border-blue-600'>
                      <input
                        onChange={(e) => handleChangeBirthdate(e, true)}
                        id='birthDate'
                        className='absolute right-[1px] top-0 z-10 max-h-[48px] max-w-[50px] cursor-pointer rounded-lg p-3 text-base focus:outline-none'
                        type='date'
                        value={birthDateValue}
                      />
                      <InputMask
                        {...register('birthDate')}
                        mask='__.__.____'
                        replacement={{ _: /\d/ }}
                        onChange={(e) => handleChangeBirthdate(e, false)}
                        id='birthDateText'
                        className='absolute bottom-0 left-0 right-[35px] top-0 w-full rounded-lg p-3 text-base focus:outline-none'
                        type='text'
                        placeholder='ДД.ММ.ГГГГ'
                      />
                    </div>
                    {errors.birthDate && (
                      <Typography variant='s' className='text-red-primary-800'>
                        {errors.birthDate.message}
                      </Typography>
                    )}
                  </label>
                </div>
              </div>
              <div className='mb-6 flex w-full flex-col gap-5'>
                <Typography
                  variant='subtitle4'
                  className='font-medium leading-[1.88rem]'
                >
                  Контакты
                </Typography>
                <div className='flex flex-col gap-5 md:flex-row'>
                  <label htmlFor='email' className='flex flex-col gap-1 md:w-[50%]'>
                    <Typography className='text-xl font-medium leading-8'>
                      Email*
                    </Typography>
                    <input
                      {...register('email')}
                      id='email'
                      className='w-full rounded-lg border border-grey-700 p-3 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                      type='text'
                      placeholder='Введите email'
                    />
                    {errors.email && (
                      <Typography variant='s' className='text-red-primary-800'>
                        {errors.email.message}
                      </Typography>
                    )}
                  </label>
                  <label htmlFor='phone' className='flex flex-col gap-1 md:w-[50%]'>
                    <Typography className='text-xl font-medium leading-8'>
                      Телефон*
                    </Typography>
                    <InputMask
                      mask='+7 (___) ___-__-__'
                      replacement={{ _: /\d/ }}
                      {...register('phone')}
                      id='phone'
                      className='w-full rounded-lg border border-grey-700 p-3 text-base font-normal leading-6 text-grey-950 transition hover:border-blue-600 focus:border-blue-600 focus:outline-none focus-visible:border-blue-600 focus-visible:outline-none active:border-blue-600'
                      type='text'
                      placeholder='Введите телефон'
                      autoComplete='off'
                    />
                    {errors.phone && (
                      <Typography variant='s' className='text-red-primary-800'>
                        {errors.phone.message}
                      </Typography>
                    )}
                  </label>
                </div>
              </div>
              <div className='w-full text-center md:flex md:flex-row-reverse md:justify-between'>
                <ButtonCustom
                  className='mb-4 w-full md:max-w-[9.50rem] md:px-7 md:py-3 xl:px-7 xl:py-5'
                  variant='primary'
                  size='s'
                  type='submit'
                  // onClick={handleChangeProfile}
                >
                  Сохранить
                </ButtonCustom>
                <button
                  className='text-[#E94C4C] transition hover:text-red-primary-800 focus:text-red-primary-800 focus-visible:text-red-primary-800 active:text-red-primary-400'
                  onClick={handleDeleteProfile}
                  type='button'
                >
                  <Typography
                    variant='s-bold'
                    className='text-lg font-normal lg:text-xl'
                  >
                    Удалить профиль
                  </Typography>
                </button>
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
      </div>
    </section>
  );
}
