import React from 'react';

import { Typography } from '@/shared/ui/typography';

import { IOurAdvantages } from './OurAdvantages.types';

export function OurAdvantages({ className }: IOurAdvantages) {
  const advantages = [
    {
      title: 'Надёжное хранение всех документов в одном месте',
      description:
        'Больше не нужно искать билеты на разных почтах! Все ваши бронирования окажутся в личном кабинете',
      icon: 'our_advantage_1.svg',
    },
    {
      title: 'Бонусная программа для постоянных покупателей',
      description: 'Копите бонусы и тратьте их на путешествия',
      icon: 'our_advantage_2.svg',
    },
    {
      title: 'Скидки, акции и специальные предложения только у нас',
      description: 'Все акции на туры собраны в одном месте',
      icon: 'our_advantage_3.svg',
    },
  ];

  return (
    <section className={`${className} container`}>
      <div className=''>
        <Typography
          variant='h4'
          className='mb-5 text-[22px] font-semibold lg:text-[32px]'
        >
          Зачем ехать в тур с нами?
        </Typography>
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-5'>
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className='relative flex min-h-[190px] flex-col rounded-3xl bg-white p-5 pr-28 text-left shadow-lg md:h-auto lg:pr-40 xl:h-[290px]'
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={advantage.icon}
                alt={advantage.title}
                className='absolute bottom-0 right-5 mb-4 h-24 w-24 lg:h-36 lg:w-36'
              />
              <Typography
                variant='h4'
                className='text-[15px] font-semibold md:text-[17px] lg:mb-1 lg:leading-loose'
              >
                {advantage.title}
              </Typography>
              <Typography variant='m' className='text-gray-600'>
                {advantage.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
