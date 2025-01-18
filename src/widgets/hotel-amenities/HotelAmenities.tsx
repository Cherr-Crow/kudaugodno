import React from 'react';
import { Typography } from '@/shared/typography';
import { IHotelAmenities } from './HotelAmenities';
import { SvgSprite } from '@/shared/svg-sprite';

export function HotelAmenities({ className }: IHotelAmenities) {
  // const amenities = [
  //   {
  //     title: 'Надёжное хранение всех документов в одном месте',
  //     description:
  //       'Больше не нужно искать билеты на разных почтах! Все ваши бронирования окажутся в личном кабинете',
  //     icon: 'our_advantage_1.svg', 
  //   },
  //   {
  //     title: 'Бонусная программа для постоянных покупателей',
  //     description: 'Копите бонусы и тратьте их на путешествия',
  //     icon: 'our_advantage_2.svg', 
  //   },
  //   {
  //     title: 'Скидки, акции и специальные предложения только у нас',
  //     description: 'Все акции на туры собраны в одном месте',
  //     icon: 'our_advantage_3.svg', 
  //   },
  // ];

  const amenities = [
   {
      title: 'В номере',
      comfort: [
        'Террасса',
        'Чайная станция',
        'Рабочий стол',
        'Кресло',
      ]
    },
    {
      title: 'Общие',
      comfort: [
        'Собственный пляж',
        'Круглосуточный ресепшен',
        'Питание по системе шведский стол',
        'Лобби-бар',
      ]
    },
    {
      title: 'Спорт и отдых',
      comfort: [
        '2 бассейна',
        'СПА',
        'Фитнес-центр',
        '4 корта для большого тенниса',
        'Настольный теннис',
        'Бильярд',
      ]
    },
    {
      title: 'Для детей',
      comfort: [
        'Аквапарк',
        'Детский клуб',
        'Вечерняя анимация',
        'Детская площадка',
      ]
    },
  ];


  return (
    <section className={`${className}`}>
      <div className="hidden sm:block">
        <Typography variant="l" className="block mb-7 font-black text-blue-900 md:font-normal md:text-[24px] md:text-black lg:text-[32px]">
          Удобства
        </Typography>
        
        {/* <div className="grid grid-cols-1 gap-3 mb-5 md:grid-cols-4 lg:gap-[25px]"> */}
        <div className="flex justify-between mb-5">

          {/* {amenities.map((advantage, index) => (
             <div>{advantage.title}</div>
             
           

          ))} */}


          {/* {amenities.map((item) => (

              item.comfort.map((comfortitem) => <li>{comfortitem}</li>)
              //  {<div>{item.title}</div>}
                )
          )} */}

          
          {amenities.map((item, idtop) => (

            <div className='' key={idtop}>
                <Typography className="block mb-3 font-semibold text-blue-900 md:text-lg md:text-black lg:text-xl">
                   {item.title}
                </Typography>
               {item.comfort.map((comfortitem, id) => (
                <div className="flex mb-2">
                  <SvgSprite
                  name='check-mark'
                  width={16}
                  className='cursor-pointer m-0 mr-4'
                />
                <Typography variant="s" className=" font-normal md:text-base">
                   {comfortitem}
                </Typography>
                </div>
                  

                // <div className="mb-2" key={id}>{comfortitem}</div>
               ))}
            
            </div>
          
            )
          )}


             
        </div>
      </div>
    </section>
  );
  
}
