'use client';

import React, { useEffect, useState } from 'react';

import { HotelBookingPayForm } from '@/shared/hotel-booking-pay-form';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { TourFlightCard } from '@/shared/tour-flight-card';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { flightData } from '@/temp/flight-mock';
import { hotels } from '@/temp/hotel-mock';

import { ITourBooking } from './TourBooking.types';

const insuranceData = [
  {
    title: 'Медицинская страховка',
    description:
      'Медицинская страховка покрывает расходы в пределах определённой суммы, которая прописана в полисе, при экстренных случаях: сильной боли, плохом самочувствии, травме, обострении хронических заболеваний.',
  },
  {
    title: 'Оформление визы',
    description:
      'Поможем подготовить пакет документов, передадим его туроператору, а он отправит в Визовый центр. Если у вас нет биометрических данных, нужно будет приехать в Визовый центр и сдать отпечатки пальцев. Готовые оригиналы документов доставим вам домой курьером.',
  },
  {
    title: 'Расширенная страховка от невыезда',
    description:
      'Страховая компания вернёт деньги, если:\n' +
      '- заболел кто-то из участников поездки\n' +
      '- заболел ребёнок или супруг, не летящие в тур\n' +
      '- пришёл отказ или задержка с визой\n' +
      '- отказали во въезде в страну\n' +
      '- произошло стихийное бедствие, которое препятствует поездке или возвращению домой\n' +
      'Компенсация расходов рассчитывается на одного человека.',
  },
];

const extractNumber = (text: string): number => {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const calculateNights = (checkIn: string, checkOut: string) => {
  if (!checkIn || !checkOut) return 1;
  const formattedCheckIn = checkIn.split('.').reverse().join('-');
  const formattedCheckOut = checkOut.split('.').reverse().join('-');
  const inDate = new Date(formattedCheckIn);
  const outDate = new Date(formattedCheckOut);
  if (isNaN(inDate.getTime()) || isNaN(outDate.getTime())) {
    console.error('Некорректные даты:', checkIn, checkOut);
    return 1;
  }
  const diffTime = outDate.getTime() - inDate.getTime();
  return Math.max(Math.ceil(diffTime / (1000 * 60 * 60 * 24)), 1);
};

export function TourBooking({ tourId }: ITourBooking) {
  const [email, setEmail] = useState(localStorage.getItem('email') || '');
  const [phone, setPhone] = useState(localStorage.getItem('phone') || '');
  const [searchData, setSearchData] = useState(() => {
    const storedData = localStorage.getItem('searchData');
    return storedData
      ? JSON.parse(storedData)
      : {
          departureCity: '',
          where: '',
          checkInDate: '',
          checkOutDate: '',
          guests: '',
        };
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedEmail = localStorage.getItem('email');
      const storedPhone = localStorage.getItem('phone');
      const storedSearchData = localStorage.getItem('searchData');
      if (storedEmail) setEmail(storedEmail);
      if (storedPhone) setPhone(storedPhone);
      if (storedSearchData) setSearchData(JSON.parse(storedSearchData));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('email', email);
      localStorage.setItem('phone', phone);
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }
  }, [email, phone, searchData]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const nights = calculateNights(searchData.checkInDate, searchData.checkOutDate);

  const mockData = {
    dates: `${searchData.checkInDate} - ${searchData.checkOutDate}`,
    guestsInfo: `${extractNumber(searchData.guests)} гостей на ${nights} ночей`,
    paymentInfo: 'Необходимо оплатить при заселении',
    resortFee: 100,
    flightInfo: {
      flightType: 'Чартерный рейс',
      flightDetails:
        'Туроператор может изменить полётную программу. Например, может поменяться время вылета, авиакомпания или аэропорты. Мы сообщим, если что-то изменится.',
    },
    checkInDate: searchData.checkInDate,
    checkOutDate: searchData.checkOutDate,
    tourOperator: 'Teztur',
    tourOperatorPhoneNumber: '+7(971) 079–27–45',
    tourOperatorEmail: 'example@mail.com',
    airCompany: 'Air Arabia',
    cancellationPolicy:
      'Отменить тур можно связавшись с туроператором. В случае аннулирования тура от Вас потребуют возмещения понесённых расходов. Точный размер штрафа уточнит менеджер туроператора.',
    flightFrom: searchData.departureCity,
    flightTo: searchData.where,
    guests: extractNumber(searchData.guests),
  };

  const hotel = hotels.find((h) => h.id === tourId);
  if (!hotel) return <div>Тур не найден</div>;

  const tourData = {
    ...mockData,
    tourId: tourId,
    hotelName: hotel.name,
  };

  return (
    <div className='container mx-auto mb-5'>
      <div className='flex flex-col md:flex-row'>
        {/* {left side content} */}
        <div className='flex w-full flex-col gap-4 p-4 md:w-2/3'>
          <Typography variant='l' className='font-bold text-white md:text-lg'>
            Тур с перелетом в {hotel.country}
          </Typography>
          <div className='rounded-lg bg-white p-4 shadow-lg'>
            <div className='hotel-info'>
              <div className='flex flex-row justify-between'>
                <div className='flex flex-col gap-4 lg:gap-1'>
                  <Rating category={hotel.star_category} starSize={16} gap={1} />
                  <Typography
                    variant='l'
                    className='font-bold text-blue-950 md:text-lg'
                  >
                    {hotel.name}
                  </Typography>
                  <Typography variant='l' className='text-blue-950 md:text-sm'>
                    {hotel.city}
                  </Typography>
                </div>
                <div className='flex h-[65px] w-[130px] md:h-full md:w-[25%]'>
                  <img
                    src={hotel.photo?.[0]?.photo}
                    alt='Image of Novotel Nairobi Westlands hotel with a pool and palm trees'
                    className='mx-auto rounded-2xl'
                  />
                </div>
              </div>
              <div className='mb-3 grid grid-cols-3 gap-2'>
                {hotel.amenities_common.map((amenity, amenityIndex) => (
                  <Typography
                    key={`amenity-${amenityIndex}`}
                    variant='l-bold'
                    className='rounded-xl bg-grey-50 p-1 text-xs text-grey-800 md:text-base'
                  >
                    {amenity}
                  </Typography>
                ))}
              </div>
              <div className='flex flex-col gap-2 rounded-lg bg-blue-100 p-4'>
                <Typography
                  variant='l'
                  className='text-[14px] font-bold text-blue-950'
                >
                  {mockData.dates}
                </Typography>
                <Typography variant='m' className='text-blue-950'>
                  {mockData.guestsInfo}
                </Typography>
                <Typography variant='l' className='font-bold text-blue-950'>
                  {mockData.paymentInfo}
                </Typography>
                <Typography variant='m' className='text-blue-950'>
                  Необходимо оплатить при заселении {mockData.resortFee} ₽ с человека
                  за ночь
                </Typography>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Перелет
            </Typography>
            <div className='flex flex-col gap-2 rounded-lg bg-blue-100 p-4'>
              <Typography
                variant='l'
                className='text-[14px] font-bold text-blue-950'
              >
                {mockData.flightInfo.flightType}
              </Typography>
              <Typography variant='m' className='text-blue-950'>
                {mockData.flightInfo.flightDetails}
              </Typography>
            </div>
          </div>

          <div className='rounded-lg bg-white shadow-lg'>
            <TourFlightCard flights={flightData.flights} />
          </div>

          <div className='flex flex-col gap-1'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Добавьте в тур
            </Typography>
          </div>
          <div className='mb-5 rounded-lg bg-white shadow-lg'>
            <div className='flex flex-col gap-3 p-6'>
              {insuranceData.map((item, index) => (
                <div key={index} className='flex flex-col gap-3'>
                  <div className='flex flex-col gap-4 md:flex-row'>
                    <div className='flex flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        {item.title}
                      </Typography>
                      <Typography variant='m' className='text-grey-950'>
                        {item.description}
                      </Typography>
                    </div>
                    <div className='mt-4 flex items-center justify-between md:ml-auto md:mt-0'>
                      <ButtonCustom
                        variant={'primary'}
                        size={'s'}
                        className='group flex h-6 flex-row gap-2 text-nowrap bg-white transition-transform'
                      >
                        Добавить в заказ{' '}
                        <SvgSprite
                          name={'cross'}
                          width={10}
                          className='rotate-45 transition-transform group-active:hidden'
                        />
                        <SvgSprite
                          name={'arrow'}
                          width={14}
                          className='hidden transition-transform group-active:block'
                        />
                      </ButtonCustom>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className='flex flex-col gap-1'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Контактные данные
            </Typography>
            <Typography variant='m' className='text-grey-800'>
              Пришлем информацию о бронировании
            </Typography>
          </div>
          <div className='mb-5 rounded-lg bg-white shadow-lg'>
            <div className='flex flex-col p-6'>
              <div className='flex flex-col gap-2 md:flex-row'>
                <div className='flex w-full flex-col gap-2 md:w-1/2 md:pr-2'>
                  <Typography variant='l' className='font-bold text-grey-950'>
                    Email
                  </Typography>
                  <NamedInput
                    id='email'
                    name='Email'
                    type='text'
                    value={email}
                    onChange={handleEmailChange}
                    placeholder='example@gmail.com'
                  />
                </div>
                <div className='flex w-full flex-col gap-2 md:mb-0 md:w-1/2 md:pl-2'>
                  <Typography variant='l' className='font-bold text-grey-950'>
                    Телефон
                  </Typography>
                  <NamedInput
                    id='phone'
                    name='Телефон'
                    type='tel'
                    value={phone}
                    onChange={handlePhoneChange}
                    placeholder='+7 (999) 678-22-22'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <Typography variant='l' className='font-bold text-grey-950'>
              Гости, {mockData.guests}{' '}
              {mockData.guests === 1
                ? 'гость'
                : mockData.guests < 5
                  ? 'гостя'
                  : 'гостей'}
            </Typography>
            <Typography variant='m' className='text-grey-800'>
              Фамилию и имя укажите, как в загранпаспорте
            </Typography>
          </div>
          {Array.from({ length: mockData.guests }).map((_, index) => (
            <div key={index} className='rounded-lg bg-white shadow-lg'>
              <div className='flex flex-col gap-2 p-6'>
                <div className='bg-gray-100 flex flex-col gap-3 rounded-lg md:gap-4'>
                  <Typography variant='l' className='font-bold text-grey-950'>
                    Гость {index + 1}. Взрослый
                    {index === 0 && ', на которого оформляется номер'}
                  </Typography>
                  <div className='flex flex-col justify-start gap-6 md:grid md:grid-cols-2'>
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Имя
                      </Typography>
                      <NamedInput
                        id={`firstName${index}`}
                        name='Имя'
                        type='text'
                        placeholder='Ivan'
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Фамилия
                      </Typography>
                      <NamedInput
                        id={`lastName${index}`}
                        name='Фамилия'
                        type='text'
                        placeholder='Ivanov'
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        День рождения
                      </Typography>
                      <NamedInput
                        id={`birthDate${index}`}
                        name='День рождения'
                        type='text'
                        placeholder='27.12.1989'
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Гражданство
                      </Typography>
                      <NamedInput
                        id={`citizenship${index}`}
                        name='Гражданство'
                        type='text'
                        placeholder='Russia'
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Серия и номер паспорта
                      </Typography>
                      <NamedInput
                        id={`passport${index}`}
                        name='Серия и номер паспорта'
                        type='text'
                        placeholder='2345 123456'
                      />
                    </div>
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Срок действия
                      </Typography>
                      <NamedInput
                        id={`validityPeriod${index}`}
                        name='Срок действия'
                        type='text'
                        placeholder='14.12.2026'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* {right side content} */}
        <div className='w-full p-4 md:w-1/3'>
          <HotelBookingPayForm data={tourData} />
        </div>
      </div>
    </div>
  );
}
