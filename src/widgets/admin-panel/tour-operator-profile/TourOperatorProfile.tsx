'use client';
import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { selectUserId } from '@/rtk/userSlice';
import { useLogoutMutation } from '@/servicesApi/authApi';
import {
  useDeleteUserMutation,
  useGetAllUsersDataQuery,
  useGetUserDataQuery,
  useUpdateUserMutation,
} from '@/servicesApi/userApi';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { Checkbox } from '@/shared/ui/checkbox';
import { ICompany, ITourist } from '@/types/users';

function isCompany(user: ITourist | ICompany): user is ICompany {
  return 'company_name' in user;
}

export function TourOperatorProfile() {
  const userId = useSelector(selectUserId);
  const router = useRouter();

  const [isMenuVisible, setIsVisible] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [avatar, setAvatar] = useState<FileList | null>(null);

  const [emailPlaceholder, setEmailPlaceholder] = useState('example@gmail.com');
  const [bgStyle, setBgStyle] = useState<React.CSSProperties>({});

  const containerImg = useRef<HTMLDivElement>(null);
  const inputImg = useRef<HTMLInputElement>(null);

  const { data: user } = useGetUserDataQuery(undefined, { skip: !userId });
  const { data: users } = useGetAllUsersDataQuery(undefined, { skip: !userId });
  ({ users });
  const [changeCompanyData] = useUpdateUserMutation();
  const [logout] = useLogoutMutation();
  const [deleteCompanyProfile] = useDeleteUserMutation();

  const handleEditProfile = async () => {
    setIsVisible(false);

    let companyNameFromUser;

    if (
      user &&
      isCompany(user) &&
      user.company_name &&
      (user.role === 'TOUR_OPERATOR' || user.role === 'HOTELIER')
    ) {
      companyNameFromUser = user.company_name;
    }

    const data = {
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone_number: phone ? phone : user?.phone_number,
      email: email ? email : user?.email,
      company_name: companyName ? companyName : companyNameFromUser,
      // avatar: avatar ? avatar[0] : user?.avatar,
    };

    const formData = new FormData();

    if (avatar) {
      formData.append('avatar', avatar[0]);
    }

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string | Blob);
      }
    }

    if (user?.id) {
      try {
        await changeCompanyData(formData).unwrap();
      } catch {}
    }
  };

  const handleDeleteCompany = async () => {
    if (user?.id) {
      try {
        await deleteCompanyProfile().unwrap();
        router.push('/auth-page');
      } catch {}
    }
  };

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

  const handleLogout = async () => {
    try {
      logout();
      router.push('/auth-page');
    } catch {}
  };

  useEffect(() => {
    if (user?.email) {
      setEmailPlaceholder(user.email);
    }
    if (user?.avatar) {
      setBgStyle({
        backgroundImage: `url('${user.avatar}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      });
    }
  }, [user]);

  if (!user) {
    return (
      <div className='text-gray-500 py-10 text-center'>Загрузка профиля...</div>
    );
  }

  return (
    <div className='mx-auto md:mx-0 md:w-full'>
      <Typography
        variant='l-bold'
        className='mb-7 block text-[20px] font-semibold md:hidden'
      >
        Профиль
      </Typography>

      <div className='mb-7 rounded-[20px] border-2 border-grey-50 px-[16px] py-[17px] shadow-lg md:mb-[18px] md:px-[14px] md:pb-[18px] md:pr-[19px] md:pt-[21px]'>
        <div className='relative mb-4 flex justify-between md:mb-[21px]'>
          <div>
            <Typography
              variant='h1'
              className='mb-1 block text-[24px] md:mb-3 md:text-[32px]'
            >
              Основная информация
            </Typography>
            <Typography variant='m' className='text-grey-800 md:text-[20px]'>
              Данные о&nbsp;туроператоре будем отображать на&nbsp;сайте
            </Typography>
          </div>
          <button
            className='self-start rounded-[12px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:rounded-[20px] md:px-[18px] md:py-[18px]'
            onClick={() => setIsVisible(!isMenuVisible)}
          >
            <SvgSprite name='more' className='' />
          </button>
          {isMenuVisible && (
            <div className='z-1 absolute right-0 top-11 flex flex-col rounded-[20px] border-2 border-grey-50 bg-white shadow-lg md:top-[3.75rem]'>
              <button
                className='rounded-[20px] px-4 py-2 text-left hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                onClick={handleEditProfile}
              >
                Редактировать
              </button>
              <button
                className='rounded-[20px] px-4 py-2 text-left text-red-primary-800 hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                onClick={handleLogout}
              >
                Выйти
              </button>
              <button
                className='rounded-[20px] px-4 py-2 text-left text-red-primary-800 hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                onClick={handleDeleteCompany}
              >
                Удалить профиль
              </button>
            </div>
          )}
        </div>
        <form
          id='tour-operator-data'
          className='flex flex-col md:flex-row md:justify-between'
          action='PUT'
        >
          <div
            ref={containerImg}
            className='mb-5 ml-auto mr-auto flex h-44 w-44 cursor-pointer items-center justify-center rounded-full bg-[#C5DAFF] md:m-0 md:h-[140px] md:w-[140px]'
            style={bgStyle}
          >
            <label htmlFor='image'>
              <input
                onChange={(e) => {
                  previewFile();
                  setAvatar(e.target.files);
                }}
                ref={inputImg}
                type='file'
                id='image'
                className='hidden'
                accept='image/*'
                multiple={false}
              />
              <SvgSprite name='add-image' className='cursor-pointer' />
            </label>
          </div>
          <div className='w-full md:w-[70%] lg:w-[80%]'>
            <div className='mb-4 w-full'>
              <label
                className='mb-2 inline-block text-[20px] font-medium md:mb-1'
                htmlFor='name'
              >
                Название туроператора
              </label>
              <input
                id='tour-operator-name'
                className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                type='text'
                name='name'
                placeholder={`${user && isCompany(user) ? user.company_name : 'Название туроператора'}`}
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                className='mb-2 inline-block text-[20px] font-medium md:mb-1'
                htmlFor='address'
              >
                Адрес
              </label>
              <input
                id='tour-operator-address'
                className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
                type='text'
                name='address'
                placeholder='Введите адрес туроператора'
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                className='mb-2 block text-[20px] font-medium md:mb-1'
                htmlFor='email'
              >
                Email
              </label>
              <input
                id='tour-operator-email'
                className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type='email'
                name='email'
                placeholder={emailPlaceholder}
              />
            </div>
            <div className='mb-4 w-full'>
              <label
                className='mb-2 block text-[20px] font-medium md:mb-1'
                htmlFor='phone'
              >
                Телефон
              </label>
              <input
                id='tour-operator-phone'
                className='transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none md:pt-3'
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                type='phone'
                name='phone'
                placeholder={`${user ? user.phone_number : '+7(9**)*******'}`}
              />
            </div>
          </div>
        </form>
      </div>

      <div className='mb-7 rounded-[20px] border-2 border-grey-50 px-[16px] pb-[16px] pt-[21px] shadow-lg md:hidden'>
        <div className='mb-4 flex justify-between'>
          <Typography variant='l-bold' className='text-[24px]'>
            Пользователи
          </Typography>
          <button className='self-start rounded-[10px] bg-grey-50 px-2 py-2 transition-colors duration-300 ease-in-out hover:bg-grey-200 focus:bg-grey-200 focus:outline-none'>
            <SvgSprite name='more' className='' />
          </button>
        </div>
        <form id='tour-operator-users' action='PUT'>
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-name'
          >
            Имя
          </label>
          <input
            id='tour-operator-user-name'
            className='transition-border mb-3 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='Иван'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-surname'
          >
            Фамилия
          </label>
          <input
            id='tour-operator-user-surname'
            className='transition-border mb-4 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='Иванов'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-email'
          >
            Email
          </label>
          <input
            id='tour-operator-user-email'
            className='transition-border mb-3 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='email'
            placeholder='example@gmail.com'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-phone'
          >
            Телефон
          </label>
          <input
            id='tour-operator-user-phone'
            className='transition-border mb-3 w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='phone'
            placeholder='+7(9**)*******'
          />
          <label
            className='mb-1 block text-[20px] font-medium'
            htmlFor='tour-operator-user-role'
          >
            Роль
          </label>
          <input
            id='tour-operator-user-role'
            className='transition-border w-full rounded-[10px] border border-grey-700 px-3 py-3 duration-300 ease-in-out hover:border-blue-600 focus:border-blue-600 focus:outline-none'
            type='text'
            placeholder='Мастер'
          />
        </form>
      </div>

      <div className='rounded-[20px] border-2 border-grey-50 px-[16px] py-[14px] shadow-lg md:px-[14px] md:pb-[17px]'>
        <Typography variant='subtitle3' className='mb-3 inline-block font-medium'>
          Рассылки
        </Typography>
        <form action='PUT'>
          <div className='mb-3 flex'>
            <Checkbox id='bills' />
            <label className='text-[16px]' htmlFor='bills'>
              Сверки и счета
            </label>
          </div>
          <div className='mb-3 flex'>
            <Checkbox id='digest' />
            <label className='text-[16px]' htmlFor='digest'>
              Дайджест
            </label>
          </div>
          <div className='mb-3 flex'>
            <Checkbox id='bookingInfo' />
            <label className='text-[16px]' htmlFor='bookingInfo'>
              Информация о бронированиях
            </label>
          </div>
          <div className='flex'>
            <Checkbox id='bookingNotices' />
            <label className='text-[16px]' htmlFor='bookingNotices'>
              Смс-уведомления о бронированиях
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}
