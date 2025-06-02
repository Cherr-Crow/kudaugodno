'use client';
import { useEffect, useState, useRef } from 'react';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch } from '@/rtk/store';
import { selectUserId } from '@/rtk/userSlice';
import { useLogoutMutation } from '@/servicesApi/authApi';
import {
  useDeleteUserMutation,
  useGetAllUsersDataQuery,
  useGetUserDataQuery,
  useUpdateUserMutation,
} from '@/servicesApi/userApi';
import { userApi } from '@/servicesApi/userApi';
import { Checkbox } from '@/shared/ui/checkbox';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { ICompany, ITourist } from '@/types/users';

function isCompany(user: ITourist | ICompany): user is ICompany {
  return 'company_name' in user;
}

export function TourOperatorProfile() {
  const userId = useSelector(selectUserId);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [isMenuVisible, setIsVisible] = useState<boolean>(false);
  const [companyName, setCompanyName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);

  const inputImg = useRef<HTMLInputElement>(null);

  const { data: user, refetch } = useGetUserDataQuery(undefined, { skip: !userId });
  const { data: users } = useGetAllUsersDataQuery(undefined, { skip: !userId });
  ({ users });
  const [changeCompanyData] = useUpdateUserMutation();
  const [logout] = useLogoutMutation();
  const [deleteCompanyProfile] = useDeleteUserMutation();

  const getCompanyName = (): string | undefined => {
    if (user && isCompany(user) && user.company_name) return user.company_name;
    return undefined;
  };

  const formDataToChangeRequest = (isChangeImage: boolean = false) => {
    const companyNameFromUser = getCompanyName();

    const data = isChangeImage
      ? {
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone_number: user?.phone_number,
          email: user?.email,
          company_name: companyNameFromUser,
        }
      : {
          first_name: user?.first_name,
          last_name: user?.last_name,
          phone_number: phone ? phone : user?.phone_number,
          email: email ? email : user?.email,
          company_name: companyName ? companyName : companyNameFromUser,
        };

    const formData = new FormData();

    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        formData.append(key, value);
      }
    }

    return formData;
  };

  const fillUserFields = () => {
    if (!user || !isCompany(user)) return;
    setCompanyName(user.company_name || '');
    setEmail(user.email || '');
    setPhone(user.phone_number || '');
  };

  const exitEditMode = () => {
    setIsVisible(false);
    setIsEditMode(false);
  };

  const handleEditProfile = async () => {
    const isDataChanged =
      (user &&
        companyName &&
        isCompany(user) &&
        companyName !== user?.company_name) ||
      (phone && phone !== user?.phone_number) ||
      (email && email !== user?.email);

    if (!isDataChanged) {
      console.log('Данные не изменились. Запрос не отправляется.');
      exitEditMode();
      return;
    }

    const formData = formDataToChangeRequest();

    try {
      const updatedData = await changeCompanyData(formData).unwrap();
      // код ниже явно обновляет кэш юзера, чтобы мы заполнили value уже новыми измененными данными, а не подставляли закэшированные
      dispatch(
        userApi.util.updateQueryData('getUserData', undefined, (draft) => {
          Object.assign(draft, updatedData);
        }),
      );
    } catch {}
    exitEditMode();
  };

  const handleDeleteCompany = async () => {
    try {
      await deleteCompanyProfile().unwrap();
      router.push('/auth-page');
    } catch {}
  };

  function previewFile(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      if (typeof reader.result === 'string') {
        setPreviewAvatar(reader.result);

        const formData = formDataToChangeRequest(true);
        formData.append('avatar', file);

        try {
          await changeCompanyData(formData).unwrap();
          refetch();
        } catch {}
      }
    };

    reader.readAsDataURL(file);
  }

  const handleLogout = async () => {
    try {
      logout();
      router.push('/auth-page');
    } catch {}
  };

  useEffect(() => {
    fillUserFields();
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
              {isEditMode ? (
                <>
                  <button
                    className='rounded-[20px] px-4 py-2 text-left hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                    onClick={handleEditProfile}
                  >
                    Сохранить
                  </button>
                  <button
                    className='rounded-[20px] px-4 py-2 text-left hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                    onClick={() => {
                      exitEditMode(), fillUserFields();
                    }}
                  >
                    Отменить изменения
                  </button>
                </>
              ) : (
                <button
                  className='rounded-[20px] px-4 py-2 text-left hover:bg-grey-200 focus:bg-grey-200 focus:outline-none md:w-[215px] md:px-5 md:py-3'
                  onClick={() => {
                    setIsEditMode(true), setIsVisible(false);
                  }}
                >
                  Редактировать
                </button>
              )}

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
                className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out md:pt-3 ${isEditMode ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
                value={companyName}
                disabled={!isEditMode}
                type='text'
                name='name'
                placeholder='Название туроператора'
              />
            </div>
            {/* <div className='mb-4 w-full'>
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
            </div> */}
            <div className='mb-4 w-full'>
              <label
                className='mb-2 block text-[20px] font-medium md:mb-1'
                htmlFor='email'
              >
                Email
              </label>
              <input
                id='tour-operator-email'
                className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out md:pt-3 ${isEditMode ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                disabled={!isEditMode}
                type='email'
                name='email'
                placeholder='Введите почту'
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
                className={`transition-border w-full rounded-[8px] border border-grey-700 px-2 pb-3 pt-2 duration-300 ease-in-out md:pt-3 ${isEditMode ? 'cursor-pointer hover:border-blue-600 focus:border-blue-600 focus:outline-none' : ''}`}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                disabled={!isEditMode}
                type='phone'
                name='phone'
                placeholder='Введите номер в формате +7(9**)*******'
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
