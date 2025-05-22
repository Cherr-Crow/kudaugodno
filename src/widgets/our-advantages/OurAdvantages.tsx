import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IAdvantage, IOurAdvantages } from './OurAdvantages.types';

export function OurAdvantages({ className, children }: IOurAdvantages) {
  const advantages: IAdvantage[] = [
    {
      title: 'Надёжное хранение всех документов в одном месте',
      description:
        'Больше не нужно искать билеты на разных почтах! Все ваши бронирования окажутся в личном кабинете',
      icon: 'our_advantage_1',
    },
    {
      title: 'Бонусная программа для постоянных покупателей',
      description: 'Копите бонусы и тратьте их на путешествия',
      icon: 'our_advantage_2',
    },
    {
      title: 'Скидки, акции и специальные предложения только у нас',
      description: 'Все акции на туры собраны в одном месте',
      icon: 'our_advantage_3',
    },
  ];

  return (
    <section className={`${className} container`}>
      <div className=''>
        {children}
        <div className='grid grid-cols-1 gap-3 md:grid-cols-3 lg:gap-5'>
          {advantages.map((advantage, index) => (
            <div
              key={index}
              className='relative flex min-h-[172px] flex-col gap-3 rounded-3xl bg-white p-5 text-left shadow-lg md:h-auto md:min-h-[280px] md:pt-[104px] lg:pt-[25px] xl:h-[290px]'
              style={{
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
              }}
            >
              <SvgSprite
                name={advantage.icon}
                className='absolute bottom-5 right-4 h-32 w-32 opacity-20 md:right-[50%] md:top-5 md:h-20 md:w-20 md:translate-x-[50%] md:opacity-100 lg:bottom-3 lg:right-4 lg:top-[unset] lg:h-36 lg:w-36 lg:translate-x-0'
              />
              <Typography
                variant='m-bold'
                className='md:font-bold lg:mb-1 lg:text-[26px] lg:font-medium lg:leading-[30px]'
              >
                {advantage.title}
              </Typography>
              <Typography variant='m' className='text-grey-800'>
                {advantage.description}
              </Typography>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
