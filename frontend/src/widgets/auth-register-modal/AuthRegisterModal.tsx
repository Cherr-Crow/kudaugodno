import { useState } from 'react';

import { TabBar } from '@/shared/ui/tab-bar';
import { Typography } from '@/shared/ui/typography';

import { AuthState } from './auth/AuthState';
import { RegisterState } from './register/RegisterState';

export function AuthRegisterModal() {
  const [activeTab, setActiveTab] = useState<'Авторизация' | 'Регистрация'>(
    'Авторизация',
  );
  const [authStage, setAuthStage] = useState<'email' | 'code'>('email');

  return (
    <div
      className={`flex flex-col items-center bg-blue-100 px-5 pb-[47px] pt-[42px] md:relative md:min-w-[800px] md:px-32 lg:min-w-[1180px] ${activeTab === 'Авторизация' && authStage === 'code' ? 'pb-12 md:pb-[88px] md:pt-[117px] lg:pb-[66px] lg:pt-[156px]' : 'md:pb-6 md:pt-5 lg:pb-12 lg:pt-[44px]'} ${activeTab === 'Регистрация' ? 'md:pt-5 lg:pb-[38px] lg:pt-[35px]' : 'min-h-[386px] md:min-h-[526px] lg:min-h-[638px]'}`}
    >
      {/* лягушачий блок */}
      {['Авторизация', 'Регистрация'].includes(activeTab) && (
        <>
          <div
            className={`absolute hidden ${
              activeTab === 'Регистрация'
                ? 'bottom-[157px] left-[13px] lg:block lg:h-[240px] lg:w-[240px]'
                : 'bottom-[15px] left-[-12px] md:z-0 md:block lg:bottom-[31px] lg:left-[13px] lg:h-[240px] lg:w-[240px]'
            } h-[200px] w-[200px]`}
          >
            <img
              src='/frog_on_chair.png'
              alt=''
              className='scale-x-[-1] transform'
            />
          </div>

          <div
            className={`absolute hidden lg:block lg:h-auto lg:w-auto ${
              activeTab === 'Регистрация'
                ? 'lg:bottom-[169px] lg:right-[59px]'
                : 'lg:bottom-[38px] lg:right-[59px]'
            }`}
          >
            <img
              src='/frog_sits_on_suitcase.png'
              alt=''
              className='h-[213px] w-[118px]'
            />
          </div>
        </>
      )}

      <Typography
        variant='subtitle3'
        className='mb-[18px] font-semibold md:mb-5 md:text-[40px] md:font-medium lg:mb-8 lg:text-[48px]'
      >
        Добро пожаловать!
      </Typography>

      {authStage !== 'code' && (
        <TabBar
          tabs={['Авторизация', 'Регистрация']}
          getActiveTab={(tab) => {
            if (tab === 'Авторизация' || tab === 'Регистрация') {
              setActiveTab(tab);
            }
          }}
          setTab={activeTab}
          className={`mb-4 md:mb-6 lg:mb-[38px] ${activeTab === 'Регистрация' ? 'md:mb-[26px] lg:mb-[38px]' : ''}`}
        />
      )}

      {activeTab === 'Авторизация' ? (
        <AuthState onStageChange={(stage) => setAuthStage(stage)} />
      ) : (
        <RegisterState />
      )}
    </div>
  );
}
