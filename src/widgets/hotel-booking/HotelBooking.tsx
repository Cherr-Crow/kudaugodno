/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useState } from 'react';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { HotelBookingPayForm } from '@/shared/hotel-booking-pay-form';
import { Rating } from '@/shared/rating';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { Typography } from '@/shared/ui/typography';
import { extractNumber } from '@/shared/utils/extractNumber';
import { getCheckOutDate } from '@/shared/utils/getCheckoutDate';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';

import { IHotelBooking } from './HotelBooking.types';

const userMock = {
  fullName: 'Иванов Иван Иванович',
  birthDate: '12.01.1891',
  document: 'паспорт РФ',
};

export function HotelBooking({ hotelId }: IHotelBooking) {
  //  Загрузка дынных из блока поиска

  const [searchData, setSearchData] = useState(() => {
    const storedData = localStorage.getItem('searchData');
    return storedData
      ? JSON.parse(storedData)
      : {
          type: '',
          departureCity: '',
          where: '',
          checkInDate: '',
          checkOutDate: '',
          nights: '',
          guests: '',
        };
  });
  const [guests, setGuests] = useState<number>(Number(searchData.guests) ?? 1);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSearchData = localStorage.getItem('searchData');
      if (storedSearchData) setSearchData(JSON.parse(storedSearchData));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('searchData', JSON.stringify(searchData));
    }
  }, [searchData]);

  // Загрузка данных об отелях

  const { data: hotel } = useGetOneHotelQuery(hotelId, {
    skip: hotelId === null,
  });

  // const room = hotel?.rooms.find((room) => room.id === Number(searchData.roomId || 0));

  // Данные

  const [mockData, setMockData] = useState({
    dates: `${isoToDateFormat(searchData.checkInDate)} - ${isoToDateFormat(getCheckOutDate(searchData.checkInDate, searchData.nights))}`,
    guestsInfo: `${guests} ${guests === 1 ? 'гость' : guests < 5 ? 'взрослых' : 'взрослых'} на ${searchData.nights} ${searchData.nights === 1 ? 'ночь' : searchData.nights < 5 ? 'ночи' : 'ночей'}`,
    paymentInfo: 'Необходимо оплатить при заселении',
    resortFee: 100,
    flightInfo: {
      flightType: 'Чартерный рейс',
      flightDetails:
        'Туроператор может изменить полётную программу. Например, может поменяться время вылета, авиакомпания или аэропорты. Мы сообщим, если что-то изменится.',
    },
    hotelAdress: 'Краснодарский край, пос. Сириус, Континентальный проспект д. 6',
    hotelPhoneNumber: '+7 (571) 079–27–45',
    hotelEmail: 'example@mail.com',
    checkInDate: isoToDateFormat(searchData.checkInDate),
    checkOutDate: isoToDateFormat(
      getCheckOutDate(searchData.checkInDate, searchData.nights),
    ),
    guests: extractNumber(searchData.guests),
    roomId: Number(searchData.roomId),
    phone: '',
    email: '',
    wishes: '',
    med_insurance_count: 0,
    med_insurance_price_per_one: '5000',
    med_insurance_total_price: '0',
    visa_count: 0,
    visa_price_per_one: '560',
    visa_total_price: '0',
    cancellation_insurance_total: '',
    guestsDetails: Array.from(
      { length: extractNumber(searchData.guests) },
      (_, index) => ({
        pk: index,
        firstname: '',
        lastname: '',
      }),
    ),
  });

  // Контакты

  const handleContactChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setMockData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Гости

  const handleGuestChange = (
    index: number,
    field: 'firstname' | 'lastname',
    value: string,
  ) => {
    setMockData((prevState) => {
      const updatedGuests = [...prevState.guestsDetails];
      updatedGuests[index] = {
        ...updatedGuests[index],
        [field]: value,
      };
      return {
        ...prevState,
        guestsDetails: updatedGuests,
      };
    });
  };

  // Дополнительные пожелания

  const handleWishesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedWishes = event.target.value;
    setMockData((prevState) => ({
      ...prevState,
      wishes: updatedWishes,
    }));
  };

  if (!hotel) return <div>Отель не найден</div>;
  // if (!room) return <div>Номер не найден</div>;

  const hotelData = {
    ...mockData,
    hotel: hotel,
    // room: room,
  };

  return (
    <section className='relative mx-auto mb-5'>
      <div
        className={`absolute left-0 top-0 -z-10 h-[200px] w-full rounded-bl-[20px] rounded-br-[20px] bg-blue-600 bg-[url("/plain.svg")] bg-no-repeat md:h-[400px] md:rounded-bl-[100px] md:rounded-br-[100px]`}
      ></div>
      <div className='container'>
        <div className='pt-[0px] md:pt-[15px]'>
          <Breadcrumbs
            color='white'
            paths={[
              { label: 'Отели', href: '/catalog?tab=Отели' },
              {
                label: `${hotel.country}, ${hotel.city}`,
                href: `/catalog?tab=Отели?where=${hotel.city}`,
              },
              {
                label: `${hotel.name}`,
                href: `/hotel-page?where=${hotel.city}&hotelName=${hotel.name}&hotelId=${hotel.id}`,
              },
              {
                label: 'Бронирование',
              },
            ]}
          />
        </div>
        <div className='flex flex-col md:flex-row'>
          {/* {left side content} */}
          <div className='flex w-full flex-col gap-4 p-4 md:w-2/3'>
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
                      className='rounded-xl bg-grey-50 p-1 text-xs text-grey-950 md:text-base'
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
                    Необходимо оплатить при заселении {mockData.resortFee} ₽ с
                    человека за ночь
                  </Typography>
                </div>
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
                      name='email'
                      type='text'
                      value={mockData.email}
                      onChange={handleContactChange}
                      placeholder='example@gmail.com'
                    />
                  </div>
                  <div className='flex w-full flex-col gap-2 md:mb-0 md:w-1/2 md:pl-2'>
                    <Typography variant='l' className='font-bold text-grey-950'>
                      Телефон
                    </Typography>
                    <NamedInput
                      id='phone'
                      name='phone'
                      type='tel'
                      value={mockData.phone}
                      onChange={handleContactChange}
                      placeholder='+7 (999) 678-22-22'
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-1'>
              <Typography variant='l' className='font-bold text-grey-950'>
                Гости, {guests}{' '}
                {guests === 1 ? 'гость' : guests < 5 ? 'гостя' : 'гостей'}
              </Typography>
              <Typography variant='m' className='text-grey-800'>
                Данные всех гостей нужны для визы, либо если заселяетесь в разное
                время
              </Typography>
            </div>

            {Array.from({ length: guests }).map((_, index) => (
              <div key={index} className='rounded-lg bg-white shadow-lg'>
                <div className='flex flex-col gap-2 p-6'>
                  <div className='bg-gray-100 flex flex-col gap-3 rounded-lg md:gap-4'>
                    <Typography variant='l' className='font-bold text-grey-950'>
                      Гость {index + 1}. Взрослый
                      {index === 0 && ', на которого оформляется номер'}
                    </Typography>

                    {index === 0 && (
                      <div className='flex w-min flex-col rounded-2xl bg-green-50 p-3 outline outline-2 outline-green-200'>
                        <Typography
                          variant='m'
                          className='text-nowrap font-bold text-grey-950'
                        >
                          {userMock.fullName}
                        </Typography>
                        <Typography variant='m' className='text-blue-950'>
                          {userMock.birthDate}, {userMock.document}
                        </Typography>
                      </div>
                    )}

                    <div className='flex flex-col gap-2 md:flex-row'>
                      {/* Имя */}
                      <div className='flex w-full flex-col gap-2 md:w-1/2 md:pr-2'>
                        <Typography variant='l' className='font-bold text-grey-950'>
                          Имя
                        </Typography>
                        <NamedInput
                          id={`firstName${index}`}
                          name='Имя'
                          type='text'
                          placeholder='Иван'
                          value={mockData.guestsDetails[index]?.firstname || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleGuestChange(index, 'firstname', e.target.value)
                          }
                        />
                      </div>

                      {/* Фамилия */}
                      <div className='flex w-full flex-col gap-2 md:w-1/2 md:pl-2'>
                        <Typography variant='l' className='font-bold text-grey-950'>
                          Фамилия
                        </Typography>
                        <NamedInput
                          id={`lastName${index}`}
                          name='Фамилия'
                          type='text'
                          placeholder='Иванов'
                          value={mockData.guestsDetails[index]?.lastname || ''}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleGuestChange(index, 'lastname', e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className='flex flex-row justify-between'>
              <ButtonCustom
                className='mb-4'
                onClick={() => {
                  setGuests((prev: number) => prev + 1);
                }}
                variant={'secondary'}
                size={'s'}
              >
                Добавить пользователя
              </ButtonCustom>
              <ButtonCustom
                className='mb-4'
                onClick={() => {
                  setGuests((prev: number) => (prev > 1 ? prev - 1 : prev));
                }}
                variant={'secondary'}
                size={'s'}
                disabled={guests === 1}
              >
                Убрать пользователя
              </ButtonCustom>
            </div>
            <div className='flex flex-col gap-1'>
              <Typography variant='l' className='font-bold text-grey-950'>
                Пожелания
              </Typography>
              <Typography variant='m' className='text-grey-800'>
                Выполнение пожеланий не гарантируется и остается на усмотрение отеля
              </Typography>
            </div>
            <div className='bg-gray-100 flex flex-col gap-4 rounded-lg p-6 shadow-md'>
              <Typography variant='l' className='font-bold text-grey-950'>
                Ваши пожелания (необязательно)
              </Typography>
              <textarea
                id='wishes-form'
                className='border-gray-300 w-full rounded-md border border-blue-600 p-2 px-4 py-2 text-grey-800 focus:outline-none focus:ring-1 focus:ring-blue-500'
                placeholder='Здесь можно написать свои пожелания'
                rows={3}
                value={mockData.wishes || ''}
                onChange={handleWishesChange}
              />
            </div>
          </div>
          {/* {right side content} */}
          <div className='w-full p-4 md:w-1/3'>
            <HotelBookingPayForm data={hotelData} />
          </div>
        </div>
      </div>
    </section>
  );
}
