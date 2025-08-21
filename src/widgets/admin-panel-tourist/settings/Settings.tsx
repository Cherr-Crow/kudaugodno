'use client';

import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { selectUserDataWithSettings } from '@/rtk/currentUserSlice';
import { useLazyFetchMeQuery } from '@/servicesApi/authApi';
import { useUpdateUserMutation } from '@/servicesApi/userApi';
import { Select } from '@/shared/ui/select';
import { Switcher } from '@/shared/ui/switcher';
import { Typography } from '@/shared/ui/typography';
import { ITourist, ICompany } from '@/types/users';

import {
  CURRENCIES,
  LANGUAGES,
  CONNECTIONS,
  mapUiToApiValueFromList,
  mapApiToUiValueFromList,
} from './settingsMap';
import { SettingsSkeleton } from './SettingsSkeleton';

function isTourist(user: ITourist | ICompany): user is ITourist {
  return 'currency' in user;
}

type Currency = (typeof CURRENCIES)[number]['label'];
type Language = (typeof LANGUAGES)[number]['label'];
type Connection = (typeof CONNECTIONS)[number]['label'];

function isCurrency(value: unknown): value is Currency {
  return typeof value === 'string' && CURRENCIES.some((c) => c.label === value);
}

function isLanguage(value: unknown): value is Language {
  return typeof value === 'string' && LANGUAGES.some((c) => c.label === value);
}

function isConnection(value: unknown): value is Connection {
  return typeof value === 'string' && CONNECTIONS.some((c) => c.label === value);
}

export function Settings() {
  const [currency, setCurrency] = useState<Currency>('₽');
  const [language, setLanguage] = useState<Language>('RU');
  const [notifications, setNotifications] = useState<boolean>(true);
  const [connection, setConnection] = useState<Connection>('Телефон');
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [fetchMe] = useLazyFetchMeQuery();
  const [changeTouristProfile] = useUpdateUserMutation();

  const user = useSelector(selectUserDataWithSettings);

  useEffect(() => {
    if (!user || !isTourist(user)) return;

    if (isTourist(user)) {
      if (user.currency) {
        setCurrency(mapApiToUiValueFromList(CURRENCIES, user.currency) as Currency);
      }
      if (user.language) {
        setLanguage(mapApiToUiValueFromList(LANGUAGES, user.language) as Language);
      }
      if (user.notifications_enabled) {
        setNotifications(user.notifications_enabled);
      }
      if (user.preferred_contact_channel) {
        setConnection(
          mapApiToUiValueFromList(
            CONNECTIONS,
            user.preferred_contact_channel,
          ) as Connection,
        );
      }
      setIsInitialized(true);
    }
  }, [user]);

  const handleChangeSetting = async <
    T extends 'currency' | 'language' | 'notifications' | 'connection',
  >(
    key: T,
    value: T extends 'notifications' ? boolean : string,
  ) => {
    const settingToSend = (() => {
      switch (key) {
        case 'currency':
          return {
            currency: mapUiToApiValueFromList(CURRENCIES, value as string),
          };
        case 'language':
          return {
            language: mapUiToApiValueFromList(LANGUAGES, value as string),
          };
        case 'notifications':
          return {
            notifications_enabled: value as boolean,
          };
        case 'connection':
          return {
            preferred_contact_channel: mapUiToApiValueFromList(
              CONNECTIONS,
              value as string,
            ),
          };
        default:
          return {};
      }
    })();

    if (user) {
      const changedData = {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        email: user.email,
        ...settingToSend,
      };

      const formData = new FormData();

      for (const [key, value] of Object.entries(changedData)) {
        formData.append(key, typeof value === 'boolean' ? String(value) : value);
      }

      if (user.id) {
        try {
          await changeTouristProfile({
            role: 'USER',
            id: user.id,
            formData: formData,
          }).unwrap();
          await fetchMe();
        } catch {}
      }
    }
  };

  return (
    <section className='relative pb-2 pt-10 md:min-h-[85vh] md:pt-10 lg:flex lg:min-h-0 lg:justify-start lg:pb-2 lg:pt-12'>
      <div className='absolute left-0 top-0 z-[-1] h-[159px] w-full rounded-bl-2xl rounded-br-2xl bg-[url("/admin-panel-tourist-bg375.svg")] bg-cover bg-no-repeat md:h-[427px] md:rounded-bl-[100px] md:rounded-br-[100px] md:bg-[url("/admin-panel-tourist-bg960.svg")] lg:md:rounded-br-[100px] lg:h-[280px] lg:bg-[url("/admin-panel-tourist-bg1446.svg")]'></div>
      <div className='container'>
        <div className='lg:max-w-[876px]'>
          <Typography
            variant='h1'
            className='mb-5 text-[32px] font-semibold text-white md:mb-9 md:text-[40px] md:font-medium lg:text-[60px]'
          >
            Настройки
          </Typography>
          {!user || !isInitialized ? (
            <SettingsSkeleton />
          ) : (
            <>
              <div className='mb-4 flex items-center justify-between rounded-[20px] border border-grey-100 bg-white px-5 py-5 shadow-lg md:py-5'>
                <Typography variant='m' className='md:text-xl'>
                  Валюта
                </Typography>
                <Select
                  options={CURRENCIES.map((c) => c.label)}
                  onSelect={(e) => {
                    if (isCurrency(e) && e !== currency) {
                      setCurrency(e);
                      handleChangeSetting('currency', e);
                    }
                  }}
                  value={currency}
                  color='blue'
                  size='settings'
                  className='relative max-h-[42px] max-w-[83px] rounded-[20px]'
                />
              </div>
              <div className='mb-4 flex items-center justify-between rounded-[20px] border border-grey-100 bg-white px-5 py-4 shadow-lg md:py-5'>
                <Typography variant='m' className='md:text-xl'>
                  Язык
                </Typography>
                <Select
                  options={LANGUAGES.map((c) => c.label)}
                  onSelect={(e) => {
                    if (isLanguage(e) && e !== language) {
                      setLanguage(e);
                      handleChangeSetting('language', e);
                    }
                  }}
                  value={language}
                  color='blue'
                  size='settings'
                  className='relative max-h-[42px] max-w-[97px] rounded-[20px] p-0'
                />
              </div>
              <div className='mb-4 flex items-center justify-between rounded-[20px] border border-grey-100 bg-white px-5 pb-5 pt-4 shadow-lg md:py-6'>
                <Typography variant='m' className='md:text-xl'>
                  Оповещения
                </Typography>
                <Switcher
                  className=''
                  isActive={notifications}
                  onToggle={(val: boolean) => {
                    if (typeof val === 'boolean' && val !== notifications) {
                      setNotifications(val);
                      handleChangeSetting('notifications', val);
                    }
                  }}
                />
              </div>
              <div className='flex flex-wrap items-center justify-between rounded-[20px] border border-grey-100 bg-white px-4 py-4 shadow-lg md:py-[18px] md:pl-5'>
                <Typography variant='m' className='mb-4 md:mb-0 md:text-xl'>
                  Приоритетный канал связи с оператором
                </Typography>
                <Select
                  options={CONNECTIONS.map((c) => c.label)}
                  value={connection}
                  onSelect={(e) => {
                    if (isConnection(e) && e !== connection) {
                      setConnection(e);
                      handleChangeSetting('connection', e);
                    }
                  }}
                  color='blue'
                  size='settings'
                  className='relative ml-auto max-h-[42px] max-w-[137px] rounded-[20px] p-0'
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className='hidden md:absolute md:bottom-[-20px] md:right-[45%] md:block lg:right-[10%]'>
        <img
          src='/frog_sits_on_suitcase.png'
          className=''
          alt='Лягушка на чемодане'
        />
      </div>
    </section>
  );
}
