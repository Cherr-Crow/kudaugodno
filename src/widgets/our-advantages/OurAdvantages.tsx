import React from 'react';

import { Typography } from '@/shared/typography';

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
    <section className={`${className}`}>
      <div className="">
        <Typography variant="h4" className="mb-5 font-semibold text-[22px] lg:text-[32px]">
          Зачем ехать в тур с нами?
        </Typography>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-5">
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className="bg-white min-h-[190px] md:h-auto xl:h-[290px] p-5 pr-28 lg:pr-40 rounded-3xl shadow-lg relative flex flex-col text-left"
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <img
                src={advantage.icon}
                alt={advantage.title}
                className="h-24 w-24 lg:h-36 lg:w-36 mb-4 absolute bottom-0 right-5"
              />
              <Typography
                variant="h4"
                className="text-[15px] font-semibold md:text-[17px] lg:mb-1 lg:leading-loose"
              >
                {advantage.title}
              </Typography>
              <Typography variant="m" className="text-gray-600">
                {advantage.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
  
}
