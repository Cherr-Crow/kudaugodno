/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useState } from 'react';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { useGetOneTourQuery } from '@/servicesApi/toursApi';
import { HotelBookingPayForm } from '@/shared/hotel-booking-pay-form';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { TourFlightCard } from '@/shared/tour-flight-card';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';
import { flightData } from '@/temp/flight-mock';

import { ITourBooking } from './TourBooking.types';

const extractNumber = (text: string): number => {
  const match = text.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

export function TourBooking({ tourId }: ITourBooking) {
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

  // Поиск отеля по tourId
  const { data: tour } = useGetOneTourQuery(tourId as number, {
    skip: tourId === null,
  });

  const hotelId = Number(tour?.hotel.id);

  const { data: hotel } = useGetOneHotelQuery(hotelId, {
    skip: hotelId === null,
  });

  // const room = hotel?.rooms.find((room) => room.id === Number(searchData.roomId || 0));

  // Данные

  const [mockData, setMockData] = useState({
    dates: `${isoToDateFormat(searchData.checkInDate)} - ${isoToDateFormat(searchData.checkOutDate)}`,
    guestsInfo: `${guests} гостей на ${searchData.nights} ночей`,
    paymentInfo: 'Необходимо оплатить при заселении',
    resortFee: 100,
    price: searchData.price,
    flightInfo: {
      flightType: 'Чартерный рейс',
      flightDetails:
        'Туроператор может изменить полётную программу. Например, может поменяться время вылета, авиакомпания или аэропорты. Мы сообщим, если что-то изменится.',
    },
    checkInDate: isoToDateFormat(searchData.checkInDate),
    checkOutDate: isoToDateFormat(searchData.checkOutDate),
    tourOperatorPhoneNumber: '+7(971) 079–27–45',
    tourOperatorEmail: 'example@mail.com',
    airCompany: 'Air Arabia',
    cancellationPolicy:
      'Отменить тур можно связавшись с туроператором. В случае аннулирования тура от Вас потребуют возмещения понесённых расходов. Точный размер штрафа уточнит менеджер туроператора.',
    flightTo: tour?.arrival_city,
    flightFrom: tour?.departure_city,
    departureCountry: searchData.departure_country,
    departureCity: searchData.departure_city,
    arrivalCountry: searchData.arrival_country,
    arrivalCity: searchData.arrival_city,
    roomId: Number(searchData.roomId),
    guests: guests,
    phone: '',
    email: '',
    wishes: '',
    med_insurance: true,
    visa: true,
    cancellation_insurance: false,
    guestsDetails: Array.from(
      { length: extractNumber(searchData.guests) },
      (_, index) => ({
        pk: index,
        firstname: '',
        lastname: '',
        date_born: '',
        citizenship: '',
        international_passport_no: '',
        validity_international_passport: '',
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

  const handleGuestChange = (index: number, field: string, value: string) => {
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

  // Страховка

  const [insuranceData, setInsuranceData] = useState([
    {
      title: 'Медицинская страховка',
      description:
        'Медицинская страховка покрывает расходы в пределах определённой суммы, которая прописана в полисе, при экстренных случаях: сильной боли, плохом самочувствии, травме, обострении хронических заболеваний.',
      key: 'med_insurance',
      value: true,
    },
    {
      title: 'Оформление визы',
      description:
        'Поможем подготовить пакет документов, передадим его туроператору, а он отправит в Визовый центр. Если у вас нет биометрических данных, нужно будет приехать в Визовый центр и сдать отпечатки пальцев. Готовые оригиналы документов доставим вам домой курьером.',
      key: 'visa',
      value: true,
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
      key: 'cancellation_insurance',
      value: false,
    },
  ]);

  const toggleInsurance = (key: string) => {
    if (key in mockData) {
      setInsuranceData((prevData) =>
        prevData.map((item) =>
          item.key === key ? { ...item, value: !item.value } : item,
        ),
      );

      setMockData((prevData) => ({
        ...prevData,
        [key]: !prevData[key as keyof typeof mockData],
      }));
    } else {
      console.error(`Invalid key: ${key}`);
    }
  };

  // Дополнительные пожелания

  const handleWishesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedWishes = event.target.value;
    setMockData((prevState) => ({
      ...prevState,
      wishes: updatedWishes,
    }));
  };

  if (!tour) return <div>Тур не найден</div>;
  if (!hotel) return <div>Отель не найден</div>;
  // if (!room) return <div>Номер не найден</div>;

  const tourData = {
    ...mockData,
    tour: tour,
    hotel: hotel,
    // room: room,
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
                {hotel.amenities_common.map(
                  (amenity: string, amenityIndex: number) => (
                    <Typography
                      key={`amenity-${amenityIndex}`}
                      variant='l-bold'
                      className='rounded-xl bg-grey-50 p-1 text-xs text-grey-950 md:text-base'
                    >
                      {amenity}
                    </Typography>
                  ),
                )}
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
                        variant='primary'
                        size='s'
                        className='group flex h-6 flex-row gap-2 text-nowrap bg-white transition-transform'
                        onClick={() => toggleInsurance(item.key)}
                      >
                        {item.value ? 'Удалить из заказа' : 'Добавить в заказ'}
                        <SvgSprite
                          name='cross'
                          width={10}
                          className='rotate-45 transition-transform group-active:hidden'
                        />
                        <SvgSprite
                          name='arrow'
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
              Фамилию и имя укажите, как в загранпаспорте
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
                  <div className='flex flex-col justify-start gap-6 md:grid md:grid-cols-2'>
                    {/* Имя */}
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Имя
                      </Typography>
                      <NamedInput
                        id={`firstname${index}`}
                        name='Имя'
                        type='text'
                        placeholder='Ivan'
                        value={mockData.guestsDetails[index]?.firstname || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleGuestChange(index, 'firstname', e.target.value)
                        }
                      />
                    </div>

                    {/* Фамилия */}
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Фамилия
                      </Typography>
                      <NamedInput
                        id={`lastname${index}`}
                        name='Фамилия'
                        type='text'
                        placeholder='Ivanov'
                        value={mockData.guestsDetails[index]?.lastname || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleGuestChange(index, 'lastname', e.target.value)
                        }
                      />
                    </div>

                    {/* День рождения */}
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        День рождения
                      </Typography>
                      <NamedInput
                        id={`date_born${index}`}
                        name='День рождения'
                        type='text'
                        placeholder='27.12.1989'
                        value={mockData.guestsDetails[index]?.date_born || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleGuestChange(index, 'date_born', e.target.value)
                        }
                      />
                    </div>

                    {/* Гражданство */}
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Гражданство
                      </Typography>
                      <NamedInput
                        id={`citizenship${index}`}
                        name='Гражданство'
                        type='text'
                        placeholder='Russia'
                        value={mockData.guestsDetails[index]?.citizenship || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleGuestChange(index, 'citizenship', e.target.value)
                        }
                      />
                    </div>

                    {/* Серия и номер паспорта */}
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Серия и номер паспорта
                      </Typography>
                      <NamedInput
                        id={`international_passport_no${index}`}
                        name='Серия и номер паспорта'
                        type='text'
                        placeholder='2345 123456'
                        value={
                          mockData.guestsDetails[index]?.international_passport_no ||
                          ''
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleGuestChange(
                            index,
                            'international_passport_no',
                            e.target.value,
                          )
                        }
                      />
                    </div>

                    {/* Срок действия паспорта */}
                    <div className='flex w-full flex-col gap-2'>
                      <Typography variant='l' className='font-bold text-grey-950'>
                        Срок действия
                      </Typography>
                      <NamedInput
                        id={`validity_international_passport${index}`}
                        name='Срок действия'
                        type='text'
                        placeholder='14.12.2026'
                        value={
                          mockData.guestsDetails[index]
                            ?.validity_international_passport || ''
                        }
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                          handleGuestChange(
                            index,
                            'validity_international_passport',
                            e.target.value,
                          )
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
                setGuests((prev: number) => prev - 1);
              }}
              variant={'secondary'}
              size={'s'}
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
          <HotelBookingPayForm data={tourData} />
        </div>
      </div>
    </div>
  );
}
