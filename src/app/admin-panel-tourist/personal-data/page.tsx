'use client';
import { useRef, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

// Размер загружаемой фотографии 1MB
const MAX_FILE_SIZE = 1 * 1024 * 1024;

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
  birthDate: z.string().optional(),
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
    .refine((it) => it.length != 0, { message: 'Введите номер телефона' })
    .refine(
      (it) => {
        for (let i = 0; i < it.length; i++) {
          if (it[i] == ' ') return false;
        }

        return true;
      },
      { message: 'Номер не должен содержать пробелы' },
    )
    .refine((it) => it[0] == '+', {
      message: 'Номер телефона должен начинаться с +7',
    })
    .refine((it) => it[1] == '7', {
      message: 'Номер телефона должен начинаться с +7',
    })
    .refine(
      (it) => {
        const regexPattern = /^[0-9+]+$/;

        return regexPattern.test(it);
      },
      { message: 'Телефон должен содержать только цифры и начинаться с +7' },
    )
    .refine((it) => it.length < 13, { message: 'Некорректный номер' }),
});

// Тип формы исходя из схемы ZOD
type FormData = z.infer<typeof FormSchema>;

export default function AdminPanelTouristPersonalData() {
  // Текст для инпута с датой рождения
  const [birthDateText, setbirthDateText] = useState<string>('');

  // Форма
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: { phone: '+7' },
  });

  // DIV, на фоне которого будет отображаться загруженное фото пользователя
  const containerImg = useRef<HTMLDivElement>(null);

  // INPUT для загрузки фото пользователя
  const inputImg = useRef<HTMLInputElement>(null);

  // Функция для обработки загруженного ползовательского фото для предварительного показа
  function previewFile() {
    const preview = containerImg.current;
    const file = inputImg.current?.files?.[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string' && preview) {
        preview.style.backgroundImage = `url(${reader.result as string})`;
        preview.style.backgroundPosition = 'center';
        preview.style.backgroundSize = 'cover';
        preview.style.backgroundRepeat = 'no-repeat';
      }
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

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
        <form className='relative flex flex-col items-center rounded-2xl bg-white px-4 py-10 shadow-xl md:p-5 xl:px-48 xl:py-10'>
          <div className='mb-5 flex w-full flex-col md:flex-row md:items-center md:justify-between'>
            <div
              ref={containerImg}
              className='mb-5 ml-auto mr-auto flex h-44 w-44 items-center justify-center rounded-full bg-[#C5DAFF] md:m-0 md:h-56 md:w-56'
            >
              <label htmlFor='image'>
                <input
                  {...register('image')}
                  onChange={() => {
                    previewFile();
                  }}
                  ref={inputImg}
                  type='file'
                  id='image'
                  className='hidden'
                  accept='image/*'
                  multiple={false}
                />
                <SvgSprite name='add-image' />
              </label>
            </div>
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
                  className='border-neutral-500/[1] w-full rounded-lg border p-3 text-base font-normal leading-6'
                  type='text'
                  placeholder='Иван'
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
                  className='border-neutral-500/[1] w-full rounded-lg border p-3 text-base font-normal leading-6'
                  type='text'
                  placeholder='Иванов'
                />
                {errors.lastName && (
                  <Typography variant='s' className='text-red-primary-800'>
                    {errors.lastName.message}
                  </Typography>
                )}
              </label>
              <label htmlFor='birthDate' className='flex flex-col gap-1'>
                <Typography className='text-xl font-medium leading-8'>
                  Дата рождения
                </Typography>
                <div className='relative'>
                  <Typography className='text-neutral-500/[1] absolute left-[0.75rem] top-1/2 -translate-y-1/2 text-base font-normal leading-6'>
                    {birthDateText}
                  </Typography>
                  <input
                    {...register('birthDate')}
                    onChange={(e) =>
                      setbirthDateText(e.target.value.split('-').reverse().join('.'))
                    }
                    id='birthDate'
                    className='border-neutral-500/[1] w-full rounded-lg border p-3'
                    type='date'
                  />
                </div>
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
                  className='border-neutral-500/[1] w-full rounded-lg border p-3 text-base font-normal leading-6'
                  type='text'
                  placeholder='example@gmail.com'
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
                <input
                  {...register('phone')}
                  id='phone'
                  className='border-neutral-500/[1] w-full rounded-lg border p-3 text-base font-normal leading-6'
                  type='text'
                  placeholder='+7(***)*******'
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
          <ButtonCustom
            className='w-full md:max-w-[9.50rem] md:px-7 md:py-3 xl:px-7 xl:py-5'
            variant='primary'
            size='s'
            type='submit'
          >
            Сохранить
          </ButtonCustom>
          <div className='hidden md:absolute md:-bottom-28 md:left-16 md:block xl:hidden'>
            <SvgSprite name='frog-on-chair' />
          </div>
          <div className='hidden xl:absolute xl:-bottom-[5.50rem] xl:-left-[3.38rem] xl:block'>
            <SvgSprite name='frog-on-suitcase' />
          </div>
        </form>
      </div>
    </section>
  );
}
