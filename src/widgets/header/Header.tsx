/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useState } from 'react';

import { InputMask } from '@react-input/mask';
import Link from 'next/link';
// import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

import {
  closeAuthModal,
  openAuthModal,
  selectAuthModalStatus,
} from '@/rtk/authModalSlice';
import { selectUserId } from '@/rtk/userSlice';
import { useLogoutMutation } from '@/servicesApi/authApi';
import { useGetUserDataQuery } from '@/servicesApi/userApi';
import { Modal } from '@/shared/modal';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { PopupWindow } from '@/shared/ui/popup-window';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IHeader } from './Header.types';
import { AuthRegisterModal } from '../auth-register-modal/AuthRegisterModal';

export function Header({ className }: IHeader) {
  const dispatch = useDispatch();
  const isOpenAuthModal = useSelector(selectAuthModalStatus);

  const userId = useSelector(selectUserId);
  // const router = useRouter();
  const [openUser, setOpenUser] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openSupportMenu, setOpenSupportMenu] = useState(false);
  const [openBurgerMenu, setOpenBurgerMenu] = useState(false);
  // const [isOpenAuthModal, setIsOpenAuthModal] = useState<boolean>(false);
  const [activeMenu, setActiveMenu] = useState<
    'user' | 'support' | 'business' | null
  >(null);
  const [isMobile, setIsMobile] = useState(false);

  const { data: user } = useGetUserDataQuery(undefined, { skip: !userId });
  const [logout] = useLogoutMutation();

  const closeAllMenus = () => {
    setOpenUser(false);
    setOpenNotifications(false);
    setOpenSupportMenu(false);
    setOpenBurgerMenu(false);
    setActiveMenu(null);
  };

  const toggleUserMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openUser) {
      closeAllMenus();
    } else {
      closeAllMenus();
      setOpenUser(true);
    }
  };
  const toggleNotificationsMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeAllMenus();
    setOpenNotifications((prev) => !prev);
  };
  const toggleSupportMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeAllMenus();
    setOpenSupportMenu((prev) => !prev);
  };
  const toggleBurgerMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (openBurgerMenu) {
      closeAllMenus();
    } else {
      closeAllMenus();
      setOpenBurgerMenu(true);
    }
  };

  const handleToggle =
    (menu: 'user' | 'support' | 'business') => (e: React.MouseEvent) => {
      if (menu === 'business') {
        closeAllMenus();
        setActiveMenu(null);
      } else {
        e.preventDefault();
        e.stopPropagation();
        setActiveMenu((prev) => (prev === menu ? null : menu));
      }
    };

  const timeOptions = [
    '9:00',
    '9:30',
    '10:00',
    '10:30',
    '11:00',
    '11:30',
    '12:00',
    '12:30',
    '13:00',
    '13:30',
    '14:00',
    '14:30',
    '15:00',
    '15:30',
    '16:00',
    '16:30',
    '17:00',
    '17:30',
    '18:00',
    '18:30',
    '19:00',
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if ((openBurgerMenu || openNotifications) && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [openBurgerMenu, openNotifications]);

  return (
    <header className={`${className} w-full bg-grey-50 py-3 md:py-6 lg:py-6`}>
      <div className='container flex items-center justify-between'>
        <Link href='/' as='/' className=''>
          {/*<div className='border border-grey-900'>*/}
          <SvgSprite name='logo' width={65} className='link_hover sm:w-[106px]' />
          {/*</div>*/}
        </Link>
        <nav className='hidden gap-9 md:flex'>
          <Link className='link_hover' href='/catalog?tab=Туры'>
            <Typography variant='l-bold'>Туры</Typography>
          </Link>
          <Link className='link_hover' href='/catalog?tab=Отели'>
            <Typography variant='l-bold'>Отели</Typography>
          </Link>
          <Link className='link_hover' href='/blog-page'>
            <Typography variant='l-bold'>Блог</Typography>
          </Link>
          <Link className='link_hover' href='/roman-n'>
            <Typography variant='l-bold' className='hidden md:flex'>
              ПК
            </Typography>
          </Link>
        </nav>

        <div className='right-section-contacts flex h-full items-center gap-4 md:relative md:gap-5'>
          <div
            className='support-menu hidden cursor-pointer items-center gap-1 rounded-lg p-1 text-blue-600 transition hover:shadow-md focus:shadow-md focus:outline-none focus-visible:shadow-md active:text-grey-950 md:flex'
            onClick={toggleSupportMenu}
          >
            <div className='flex items-center gap-5 lg:-mr-1 lg:gap-[19px] xl:gap-[21px]'>
              <div className='mr-1 hidden cursor-pointer items-center gap-1 md:flex'>
                <SvgSprite name='phone' width={24} color='#4757EA' />
                <Typography variant='l' className='text-blue-600'>
                  Поддержка
                </Typography>
                {openSupportMenu && (
                  <PopupWindow
                    onClose={() => setOpenSupportMenu(false)}
                    className='z-100 absolute right-0 top-[64px] flex max-w-[308px] flex-col gap-2 rounded-lg py-4 md:pb-[22px]'
                  >
                    <div className='mt-1 flex flex-col gap-1 bg-blue-50 px-5 py-2'>
                      <Typography variant='m-bold' className='text-blue-950'>
                        Связаться с нами
                      </Typography>

                      <Link href='#' className='mt-1 flex items-center gap-1'>
                        <SvgSprite
                          name='phone'
                          width={24}
                          height={24}
                          className='scale-x-[-1] transform'
                        />
                        <span className='text-sm text-blue-950'>
                          +7 (900) 000-00-00
                        </span>
                      </Link>
                      <Link href='#' className='flex items-center gap-1'>
                        <SvgSprite name='telegram' width={21} height={21} />
                        <span className='text-sm text-blue-950'>@KudaYgodno</span>
                      </Link>
                      <Link href='#' className='flex items-center gap-1'>
                        <SvgSprite name='mail' width={21} height={21} />
                        <span className='text-sm text-blue-950'>
                          KudaYgodno@gmail.com
                        </span>
                      </Link>
                    </div>
                    <div className='flex flex-col gap-1 px-5'>
                      <Typography
                        variant='s-bold'
                        className='flex self-center text-grey-800'
                      >
                        или
                      </Typography>
                      <Typography
                        variant='s-bold'
                        className='mb-2.5 text-wrap text-blue-950'
                      >
                        Оставьте ваш телефон и мы перезвоним в удобное вам время
                      </Typography>

                      <InputMask
                        mask='+7 (___) ___-__-__'
                        replacement={{ _: /\d/ }}
                        type='tel'
                        placeholder='+7 (900) 000-00-00'
                        className='mb-2 rounded-lg border border-grey-300 px-3 py-3 text-sm'
                      />
                      <Typography className='mb-1 text-wrap text-xs text-blue-950'>
                        Удобное время для звонка:
                      </Typography>
                    </div>
                    <div className='-mb-1 flex flex-row flex-wrap items-center gap-2 px-4 text-sm text-blue-800'>
                      <Typography>С</Typography>
                      <div className='relative w-[105px]'>
                        <select
                          className='block w-full rounded-3xl border border-blue-300 bg-blue-200 px-4 py-1 pr-8 text-sm text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-400'
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                          }}
                        >
                          {timeOptions.map((t) => (
                            <option key={`from-${t}`}>{t}</option>
                          ))}
                        </select>
                        <div className='pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-blue-600'>
                          <SvgSprite
                            name='arrow'
                            strokeWidth={3}
                            width={14}
                            height={14}
                          />
                        </div>
                      </div>

                      <div className='flex flex-row items-center gap-1'>
                        <Typography>До</Typography>
                        <div className='relative w-[105px]'>
                          <select
                            className='block w-full rounded-3xl border border-blue-300 bg-blue-200 px-4 py-1 pr-8 text-sm text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-400'
                            style={{
                              appearance: 'none',
                              WebkitAppearance: 'none',
                              MozAppearance: 'none',
                            }}
                          >
                            {timeOptions
                              .slice()
                              .reverse()
                              .map((t) => (
                                <option key={`to-${t}`}>{t}</option>
                              ))}
                          </select>
                          <div className='pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-blue-600'>
                            <SvgSprite
                              name='arrow'
                              strokeWidth={3}
                              width={14}
                              height={14}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='px-5'>
                      <ButtonCustom
                        type='button'
                        className='mt-2 w-full rounded px-4 py-2 text-lg text-blue-950'
                        variant='tetriary'
                        size='s'
                      >
                        Заказать звонок
                      </ButtonCustom>
                    </div>
                  </PopupWindow>
                )}
              </div>
            </div>
          </div>
          <a
            href='/company-registration'
            className='mr-1 hidden items-center gap-1 rounded-lg text-[#4757EA] transition hover:shadow-md focus:shadow-md focus:outline-none focus-visible:shadow-md active:text-grey-950 md:flex'
          >
            <SvgSprite name='for-business' width={24} color='currentColor' />
            <Typography variant='l'>Бизнесу</Typography>
          </a>

          <div className='notifications-menu'>
            {openNotifications ? (
              <div
                onClick={(e) => {
                  toggleNotificationsMenu(e);
                }}
                className='flex w-[20px] items-center justify-center'
              >
                <SvgSprite name='cross' width={16} height={16} />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  toggleNotificationsMenu(e);
                }}
              >
                <SvgSprite
                  name='bell'
                  width={20}
                  color='#1a1f4c'
                  className='w-full cursor-pointer'
                />
              </div>
            )}
            {openNotifications && (
              <PopupWindow
                onClose={() => setOpenNotifications(false)}
                className='z-100 absolute right-1/2 top-[56px] flex h-[calc(100vh)] w-[100vw] translate-x-1/2 flex-col gap-5 text-nowrap rounded-tl-none rounded-tr-none px-4 py-4 md:right-0 md:top-[64px] md:h-[506px] md:max-w-[309px] md:translate-x-0 md:gap-3 md:rounded-lg md:px-5 md:py-3'
              >
                <div
                  style={isMobile ? { height: 'calc(100vh - 120px)' } : undefined}
                  className='mt-1 flex w-[100vw] flex-col overflow-y-auto md:mt-0 md:w-full md:px-0'
                >
                  <div
                    className={`${isMobile ? 'container' : 'flex'} flex h-[100vh] w-[100vw] flex-col gap-5 md:w-full md:gap-2`}
                  >
                    <Typography variant='m-bold' className='text-blue-950 md:mt-2'>
                      Уведомления
                    </Typography>
                    <div className='notification-item flex flex-row gap-2 last:border-none md:mt-1'>
                      <div>
                        <SvgSprite
                          name='firecracker'
                          width={24}
                          height={24}
                          className='flex self-start'
                        />
                      </div>
                      <div className='flex items-start'>
                        <Typography
                          variant='m'
                          className='text-wrap text-blue-950 md:text-sm'
                        >
                          Ваше бронирование одобрено. Теперь его можно увидеть в
                          разделе&nbsp;
                          <Link href='/cabinet/trips' className='text-blue-600'>
                            Поездки в Личном кабинете
                          </Link>
                        </Typography>
                      </div>
                      <Typography variant='xs' className='text-grey-500'>
                        17.02.24
                      </Typography>
                    </div>

                    <div className='notification-item flex flex-row gap-2 last:border-none'>
                      <div>
                        <SvgSprite
                          name='warning'
                          width={24}
                          height={24}
                          className='flex self-start'
                        />
                      </div>
                      <div className='flex items-start'>
                        <Typography
                          variant='m'
                          className='text-wrap text-blue-950 md:text-sm'
                        >
                          Туроператор отклонил вашу бронь и скоро свяжется с вами.
                          Либо воспользуйтесь кнопкой “Связаться с туроператором” в
                          разделе&nbsp;
                          <Link href='/cabinet/trips' className='text-blue-600'>
                            Поездки в Личном кабинете
                          </Link>
                        </Typography>
                      </div>
                      <Typography variant='xs' className='text-grey-500'>
                        10.02.24
                      </Typography>
                    </div>

                    <div className='notification-item flex flex-row gap-2 last:border-none'>
                      <div>
                        <SvgSprite
                          name='firecracker'
                          width={24}
                          height={24}
                          className='flex self-start'
                        />
                      </div>
                      <div className='flex items-start'>
                        <Typography
                          variant='m'
                          className='text-wrap text-blue-950 md:text-sm'
                        >
                          Ваша статья прошла модерацию.&nbsp; Теперь её можно увидеть
                          в&nbsp;
                          <Link href='/cabinet/articles' className='text-blue-600'>
                            Личном кабинете
                          </Link>
                        </Typography>
                      </div>
                      <Typography variant='xs' className='text-grey-500'>
                        17.02.24
                      </Typography>
                    </div>

                    <div className='notification-item flex flex-row gap-2 last:border-none'>
                      <div>
                        <SvgSprite
                          name='warning'
                          width={24}
                          height={24}
                          className='flex self-start'
                        />
                      </div>
                      <div className='flex items-start'>
                        <Typography
                          variant='m'
                          className='text-wrap text-blue-950 md:text-sm'
                        >
                          Ваша статья не прошла модерацию. Обратитесь в&nbsp;
                          <Link href='/support' className='text-blue-600'>
                            поддержку
                          </Link>
                        </Typography>
                      </div>
                      <Typography variant='xs' className='text-grey-500'>
                        10.02.24
                      </Typography>
                    </div>

                    <div className='notification-item flex flex-row gap-2'>
                      <div>
                        <SvgSprite
                          name='coins'
                          width={24}
                          height={24}
                          className='flex self-start'
                        />
                      </div>
                      <div className='flex items-start'>
                        <Typography
                          variant='m'
                          className='text-wrap text-blue-950 md:text-sm'
                        >
                          Вам начислено 520 бонусов. Отслеживать счет ваших бонусов
                          можно в разделе&nbsp;
                          <Link href='/cabinet/loyalty' className='text-blue-600'>
                            Программа Лояльности в Личном кабинете
                          </Link>
                        </Typography>
                        <Typography variant='xs' className='text-grey-500'>
                          10.02.24
                        </Typography>
                      </div>
                    </div>
                  </div>
                </div>
              </PopupWindow>
            )}
          </div>

          <div className='user-menu hidden md:block'>
            {openUser ? (
              <div
                onClick={(e) => {
                  toggleUserMenu(e);
                }}
                className='flex h-[40px] w-[40px] cursor-pointer items-center justify-center'
              >
                <SvgSprite name='cross' width={16} height={16} />
              </div>
            ) : (
              <div
                className={`flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border border-grey-950 p-1 md:h-10 md:w-10`}
                style={{
                  backgroundImage: user?.avatar
                    ? `url('${user.avatar}')`
                    : undefined,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                onClick={(e) => {
                  if (!user) {
                    toggleUserMenu(e);
                  } else {
                    dispatch(openAuthModal());
                  }
                }}
              >
                <Modal
                  isOpen={isOpenAuthModal}
                  getState={() => dispatch(closeAuthModal())}
                  isNewVariation={true}
                  auth={true}
                  hasScrollbar={true}
                >
                  <AuthRegisterModal />
                </Modal>
                {!user?.avatar && (
                  <SvgSprite name='user' width={24} color='#1a1f4c' />
                )}
              </div>
            )}

            {openUser && (
              <PopupWindow
                onClose={() => setOpenUser(false)}
                className='z-100 absolute right-0 flex min-h-[415px] flex-col text-nowrap rounded-lg py-2 md:top-[64px] md:w-[226px]'
              >
                <Link
                  href='/admin-panel-tour-operator'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='mt-0.5 px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Панель туроператора</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/trips'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Поездки</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/personal-data'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Личные данные</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/simplify-booking'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Упростить бронирование</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/favorites'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Избранное</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/reviews'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Мои отзывы и статьи</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/loyalty-program'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Программа Лояльности</Typography>
                </Link>
                <Link
                  href='/admin-panel-tourist/settings'
                  onClick={(e) => {
                    toggleUserMenu(e);
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography>Настройки</Typography>
                </Link>
                <Link
                  href='/'
                  onClick={(e) => {
                    toggleUserMenu(e), logout();
                  }}
                  className='px-4 py-[10px] text-blue-950 hover:bg-blue-100'
                >
                  <Typography className='flex items-center gap-2 align-middle text-blue-950'>
                    <SvgSprite name={'exit-icon'} width={14} height={16} /> Выйти
                  </Typography>
                </Link>
              </PopupWindow>
            )}
          </div>

          {/* Mobile: burger menu */}
          <div className='burger-menu block md:hidden' onClick={toggleBurgerMenu}>
            {openBurgerMenu ? (
              <div
                onClick={(e) => {
                  toggleBurgerMenu(e);
                }}
                className='flex h-[32px] w-[32px] items-center justify-center'
              >
                <SvgSprite name='cross' width={16} height={16} />
              </div>
            ) : (
              <div
                onClick={(e) => {
                  toggleBurgerMenu(e);
                }}
              >
                <SvgSprite name='burger-menu' width={32} height={32} />
              </div>
            )}

            {openBurgerMenu && (
              <PopupWindow
                onClose={() => setOpenBurgerMenu(false)}
                className='z-100 absolute inset-0 left-1/2 top-[56px] flex h-[calc(100vh)] -translate-x-1/2 text-nowrap rounded-tl-none rounded-tr-none bg-white pt-[14px]'
              >
                <div
                  style={
                    typeof window !== 'undefined' && window.innerWidth < 768
                      ? { height: 'calc(100vh - 120px)' }
                      : undefined
                  }
                  className='flex w-[100%] min-w-[100vw] flex-col overflow-y-auto rounded-tl-none rounded-tr-none md:mt-0'
                >
                  <Link
                    href='/catalog?tab=Туры'
                    onClick={(e) => {
                      toggleBurgerMenu(e);
                    }}
                    className='px-4 py-[14px] text-blue-950 hover:bg-blue-100'
                  >
                    <Typography>Туры</Typography>
                  </Link>
                  <Link
                    href='/catalog?tab=Отели'
                    onClick={(e) => {
                      toggleBurgerMenu(e);
                    }}
                    className='px-4 py-[14px] text-blue-950 hover:bg-blue-100'
                  >
                    <Typography>Отели</Typography>
                  </Link>
                  <Link
                    href='/blog-page'
                    onClick={(e) => {
                      toggleBurgerMenu(e);
                    }}
                    className='px-4 py-[12px] text-blue-950 hover:bg-blue-100'
                  >
                    <Typography>Блог</Typography>
                  </Link>

                  <div className='flex flex-col'>
                    {/* Личный кабинет */}
                    <div className='relative'>
                      {user ? (
                        <Link
                          href='/#'
                          onClick={handleToggle('user')}
                          className={`flex ${activeMenu === 'user' ? 'font-bold' : 'font-semibold'} flex-row items-center justify-between gap-2 px-4 py-[18px] text-blue-950 hover:bg-blue-100`}
                        >
                          <Typography
                            className={`${activeMenu === 'user' ? 'font-bold' : 'font-semibold'}`}
                          >
                            Личный кабинет
                          </Typography>
                          <SvgSprite
                            name='arrow'
                            width={12}
                            height={12}
                            className={`mr-[13px] text-blue-950 transition-transform duration-300 ${activeMenu === 'user' ? 'rotate-90' : ''}`}
                          />
                        </Link>
                      ) : (
                        <div
                          // {/* <Link */}
                          onClick={(e) => {
                            handleToggle('user');
                            toggleBurgerMenu(e);
                            dispatch(openAuthModal());
                          }}
                          className={`flex ${activeMenu === 'user' ? 'font-bold' : 'font-semibold'} cursor-pointer flex-row items-center justify-start gap-2 px-4 py-[18px] text-blue-600 hover:bg-blue-100`}
                          // href='/auth-page'
                        >
                          <SvgSprite name={'enter-icon'} width={14} height={16} />{' '}
                          Войти в Личный кабинет
                          {/* </Link> */}
                        </div>
                      )}

                      {activeMenu === 'user' && (
                        <div className='absolute left-0 z-50 flex w-full flex-col text-nowrap rounded-lg bg-white shadow-lg'>
                          <Link
                            href='/admin-panel-tour-operator'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Панель туроператора</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/trips'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Поездки</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/personal-data'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Личные данные</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/simplify-booking'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Упростить бронирование</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/favorites'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Избранное</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/reviews'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Мои отзывы и статьи</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/loyalty-program'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Программа Лояльности</Typography>
                          </Link>
                          <Link
                            href='/admin-panel-tourist/settings'
                            onClick={toggleUserMenu}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography>Настройки</Typography>
                          </Link>
                          <Link
                            href='/'
                            onClick={(e) => {
                              toggleUserMenu(e), logout();
                            }}
                            className='px-4 py-[8px] text-blue-950 hover:bg-grey-100'
                          >
                            <Typography className='flex items-center gap-2 align-middle text-blue-950'>
                              <SvgSprite name={'exit-icon'} width={14} height={16} />{' '}
                              Выйти
                            </Typography>
                          </Link>
                        </div>
                      )}
                    </div>

                    {/* Поддержка */}
                    <div className='relative'>
                      <Link
                        href='/#'
                        onClick={handleToggle('support')}
                        className={`flex ${activeMenu === 'support' ? 'font-extrabold' : 'font-semibold'} flex-row items-center justify-between gap-2 px-4 py-[18px] text-blue-600 hover:bg-blue-100`}
                      >
                        <Typography>Поддержка</Typography>
                        <SvgSprite
                          name='arrow'
                          width={12}
                          height={12}
                          className={`mr-[13px] text-blue-950 transition-transform duration-300 ${activeMenu === 'support' ? 'rotate-90' : ''}`}
                        />
                      </Link>
                      {activeMenu === 'support' && (
                        <div className='absolute left-0 z-50 -mt-[4px] w-full rounded-lg bg-white px-4 py-4 shadow-lg'>
                          <Typography
                            variant='m-bold'
                            className='mb-1 block text-blue-950'
                          >
                            Связаться с нами
                          </Typography>

                          <div className='mb-2 flex flex-col gap-[3px]'>
                            <Link href='#' className='flex items-center gap-[1px]'>
                              <SvgSprite
                                name='phone'
                                width={24}
                                height={24}
                                className='scale-x-[-1] transform'
                              />
                              <span className='text-sm text-blue-950'>
                                +7 (900) 000-00-00
                              </span>
                            </Link>
                            <Link href='#' className='flex items-center gap-[1px]'>
                              <SvgSprite name='telegram' width={21} height={21} />
                              <span className='text-sm text-blue-950'>
                                @KudaYgodno
                              </span>
                            </Link>
                            <Link href='#' className='flex items-center gap-[5px]'>
                              <SvgSprite name='mail' width={21} height={21} />
                              <span className='text-sm text-blue-950'>
                                KudaYgodno@gmail.com
                              </span>
                            </Link>
                          </div>
                          <div className='-mt-1 flex flex-col'>
                            <Typography
                              variant='s-bold'
                              className='mb-1 flex self-center text-grey-800'
                            >
                              или
                            </Typography>
                            <Typography
                              variant='s-bold'
                              className='mb-2 block text-wrap text-blue-950'
                            >
                              Оставьте ваш телефон и мы перезвоним в удобное вам
                              время
                            </Typography>

                            <InputMask
                              mask='+7 (___) ___-__-__'
                              replacement={{ _: /\d/ }}
                              placeholder='+7 (900) 000-00-00'
                              className='mb-2 rounded-lg border border-grey-300 px-3 py-3 text-sm'
                            />
                            <Typography className='mb-3 text-wrap text-xs text-blue-950'>
                              Удобное время для звонка:
                            </Typography>
                          </div>
                          <div className='-mb-1 flex flex-row flex-wrap items-center gap-1 text-sm text-blue-800'>
                            <Typography>С</Typography>
                            <div className='relative mr-1 w-[105px]'>
                              <select
                                className='block w-full rounded-3xl border border-blue-300 bg-blue-200 px-4 py-1 text-sm text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-400'
                                style={{
                                  appearance: 'none',
                                  WebkitAppearance: 'none',
                                  MozAppearance: 'none',
                                }}
                              >
                                {timeOptions.map((t) => (
                                  <option key={`from-${t}`}>{t}</option>
                                ))}
                              </select>
                              <div className='pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-blue-600'>
                                <SvgSprite
                                  name='arrow'
                                  strokeWidth={3}
                                  width={14}
                                  height={14}
                                />
                              </div>
                            </div>

                            <div className='flex items-center gap-1'>
                              <Typography>До</Typography>
                              <div className='relative w-[105px]'>
                                <select
                                  className='block w-full rounded-3xl border border-blue-300 bg-blue-200 px-4 py-1 text-sm text-blue-800 focus:outline-none focus:ring-1 focus:ring-blue-400'
                                  style={{
                                    appearance: 'none',
                                    WebkitAppearance: 'none',
                                    MozAppearance: 'none',
                                  }}
                                >
                                  {timeOptions
                                    .slice()
                                    .reverse()
                                    .map((t) => (
                                      <option key={`to-${t}`}>{t}</option>
                                    ))}
                                </select>
                                <div className='pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 rotate-90 text-blue-600'>
                                  <SvgSprite
                                    name='arrow'
                                    strokeWidth={3}
                                    width={14}
                                    height={14}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <ButtonCustom
                            onClick={(e) => {
                              toggleBurgerMenu(e);
                            }}
                            type='button'
                            className='mt-3 w-full rounded px-4 py-2 text-lg text-blue-950'
                            variant='tetriary'
                            size='s'
                          >
                            Заказать звонок
                          </ButtonCustom>
                        </div>
                      )}
                    </div>

                    {/* Бизнесу */}

                    <Link
                      href='/company-registration'
                      onClick={handleToggle('business')}
                      className={`relative flex ${activeMenu === 'business' ? 'font-extrabold' : 'font-semibold'} mt-3 flex-row items-center justify-between gap-2 px-4 py-[18px] text-blue-600 hover:bg-blue-100`}
                    >
                      <Typography>Бизнесу</Typography>
                      <SvgSprite
                        name='arrow'
                        width={12}
                        height={12}
                        className={`mr-[13px] text-blue-950 transition-transform duration-300 ${activeMenu === 'business' ? 'rotate-90' : ''}`}
                      />
                    </Link>
                  </div>
                </div>
              </PopupWindow>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
