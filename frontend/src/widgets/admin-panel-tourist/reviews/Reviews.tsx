'use client';
import { useState } from 'react';

import { TabBar } from '@/shared/ui/tab-bar';
import { Typography } from '@/shared/ui/typography';

import { MyArticles } from './MyArticles';
import { MyReviews } from './MyReviews';

export function Reviews() {
  const [tab, setTab] = useState<'Мои отзывы' | 'Мои статьи'>('Мои отзывы');

  function handleTab(tab: 'Мои отзывы' | 'Мои статьи'): void {
    setTab(tab);
  }

  return (
    <section className='w-full'>
      <TabBar
        tabs={['Мои отзывы', 'Мои статьи']}
        getActiveTab={handleTab}
        className={`${tab === 'Мои статьи' ? 'mb-2 md:mb-7' : 'mb-6'} md:mb-4 lg:mb-6`}
      />

      {tab === 'Мои статьи' && (
        <div className='md:mb-10 lg:mb-8'>
          <Typography
            variant='m'
            className='mb-2 block text-blue-200 md:mr-12 md:inline'
          >
            Вы написали 20 статей
          </Typography>
          <Typography variant='s' className='text-white md:text-[16px]'>
            Начислено
            <span className='text-[16px] font-semibold md:text-[20px]'> 500 </span>
            бонусов за статьи, комментарии и 👍 к ним
          </Typography>
        </div>
      )}

      {tab === 'Мои отзывы' ? (
        <div className='flex flex-col gap-3 md:gap-4'>
          <MyReviews />
          <MyReviews />
        </div>
      ) : (
        <div className='flex flex-col gap-3 md:flex-row md:flex-wrap md:gap-x-8 md:gap-y-5 lg:gap-x-4'>
          <MyArticles />
          <MyArticles />
          <MyArticles />
          <MyArticles />
        </div>
      )}

      {tab === 'Мои отзывы' ? (
        <div className='hidden lg:absolute lg:-bottom-2 lg:right-32 lg:block'>
          <img
            src='/frog_main.png'
            className='lg:w-[140px]'
            alt='Лягушка с чемоданом'
          />
        </div>
      ) : (
        <div className='hidden lg:absolute lg:right-[30%] lg:top-10 lg:block'>
          <img
            src='/frog_sits_on_suitcase.png'
            className=''
            alt='Лягушка на чемодане'
          />
        </div>
      )}
    </section>
  );
}
