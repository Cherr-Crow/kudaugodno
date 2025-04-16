'use client';

import { useEffect, useState } from 'react';

import { Typography } from '@/shared/typography';
import { Select } from '@/shared/ui/select';
import { Switcher } from '@/shared/ui/switcher';

const userSettings = {
  currency: '$',
  language: 'RU',
  notifications: false,
  connection: 'Почта',
};

const CURRENCIES = ['₽', '$', '€'] as const;
type Currency = (typeof CURRENCIES)[number];

const LANGUAGES = ['RU', 'EN'] as const;
type Language = (typeof LANGUAGES)[number];

const CONNECTIONS = ['Телефон', 'Почта'] as const;
type Connection = (typeof CONNECTIONS)[number];

function isCurrency(value: unknown): value is Currency {
  return (
    typeof value === 'string' && (CURRENCIES as readonly string[]).includes(value)
  );
}

function isLanguage(value: unknown): value is Language {
  return (
    typeof value === 'string' && (LANGUAGES as readonly string[]).includes(value)
  );
}

function isConnection(value: unknown): value is Connection {
  return (
    typeof value === 'string' && (CONNECTIONS as readonly string[]).includes(value)
  );
}

export function Settings() {
  const [currency, setCurrency] = useState<Currency>('₽');
  const [language, setLanguage] = useState<Language>('RU');
  const [notifications, setNotifications] = useState<boolean>(true);
  const [connection, setConnection] = useState<Connection>('Телефон');

  useEffect(() => {
    if (!userSettings) return;

    if (isCurrency(userSettings.currency)) {
      setCurrency(userSettings.currency);
    }

    if (isLanguage(userSettings.language)) {
      setLanguage(userSettings.language);
    }

    if (typeof userSettings.notifications === 'boolean') {
      setNotifications(userSettings.notifications);
    }

    if (isConnection(userSettings.connection)) {
      setConnection(userSettings.connection);
    }
  }, []);

  const handleChangeSetting = <
    T extends 'currency' | 'language' | 'notifications' | 'connection',
  >(
    key: T,
    value: T extends 'notifications' ? boolean : string,
  ) => {
    switch (key) {
      case 'currency':
        if (isCurrency(value)) setCurrency(value);
        break;
      case 'language':
        if (isLanguage(value)) setLanguage(value);
        break;
      case 'connection':
        if (isConnection(value)) setConnection(value);
        break;
      case 'notifications':
        if (typeof value === 'boolean') setNotifications(value);
        break;
    }

    const settingsToSend = {
      currency,
      language,
      notifications,
      connection,
      [key]: value,
    };

    // Имитация отправки на сервер
    console.log('PATCH /user/settings', settingsToSend);
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
          <div className='mb-4 flex items-center justify-between rounded-[20px] border border-grey-100 bg-white px-5 py-5 shadow-lg md:pb-6 md:pt-4'>
            <Typography variant='m' className='md:text-xl'>
              Валюта
            </Typography>
            {userSettings && (
              <Select
                options={[...CURRENCIES]}
                onSelect={(e) => {
                  if (isCurrency(e)) {
                    setCurrency(e);
                    handleChangeSetting('currency', e);
                  }
                }}
                startValue={currency}
                color='blue'
                size='small'
                className='max-h-[42px] max-w-[83px] rounded-[20px]'
              />
            )}
          </div>
          <div className='mb-4 flex items-center justify-between rounded-[20px] border border-grey-100 bg-white px-5 py-4 shadow-lg md:pb-5 md:pt-4'>
            <Typography variant='m' className='md:text-xl'>
              Язык
            </Typography>
            {userSettings && (
              <Select
                options={[...LANGUAGES]}
                onSelect={(e) => {
                  if (isLanguage(e)) {
                    setLanguage(e);
                    handleChangeSetting('language', e);
                  }
                }}
                startValue={language}
                color='blue'
                size='small'
                className='max-h-[42px] max-w-[83px] rounded-[20px] p-0'
              />
            )}
          </div>
          <div className='mb-4 flex items-center justify-between rounded-[20px] border border-grey-100 bg-white px-5 pb-5 pt-4 shadow-lg md:pb-4 md:pt-5'>
            <Typography variant='m' className='md:text-xl'>
              Оповещения
            </Typography>
            {userSettings && (
              <Switcher
                className=''
                key={String(notifications)}
                isActive={notifications}
                onToggle={(val: boolean) => {
                  if (typeof val === 'boolean') setNotifications(val);
                  handleChangeSetting('notifications', val);
                }}
              />
            )}
          </div>
          <div className='flex flex-wrap items-center justify-between rounded-[20px] border border-grey-100 bg-white px-4 py-4 shadow-lg md:pl-5 md:pt-6'>
            <Typography variant='m' className='mb-4 md:text-xl'>
              Приоритетный канал связи с оператором
            </Typography>
            {userSettings && (
              <Select
                options={[...CONNECTIONS]}
                startValue={connection}
                onSelect={(e) => {
                  if (isConnection(e)) {
                    setConnection(e);
                    handleChangeSetting('connection', e);
                  }
                }}
                color='blue'
                size='small'
                className='ml-auto max-h-[42px] max-w-[137px] rounded-[20px] p-0'
              />
            )}
          </div>
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
