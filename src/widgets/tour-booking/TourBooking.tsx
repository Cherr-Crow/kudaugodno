/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { useGetOneTourQuery } from '@/servicesApi/toursApi';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { HotelBookingPayForm } from '@/shared/hotel-booking-pay-form';
import { Rating } from '@/shared/rating';
import { TourFlightCard } from '@/shared/tour-flight-card';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';
import { NamedInput } from '@/shared/ui/named-input';
import { Typography } from '@/shared/ui/typography';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';
import { isoToDateFormat } from '@/shared/utils/isoToDateFormat';
import { flightData } from '@/temp/flight-mock';

import { ITourBooking } from './TourBooking.types';

const extractNumber = (text: string): number => {
  const match = text?.toString().match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

type TInsuranceSelection = Record<string, { all?: boolean; persons?: number[] }>;

export function TourBooking({ tourId }: ITourBooking) {
  //  Загрузка данных из блока поиска

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

  const searchParams = useSearchParams();
  const hotelId = Number(searchParams.get('hotelId')) ?? null;

  const { data: hotel } = useGetOneHotelQuery(hotelId, {
    skip: hotelId === null,
  });

  // const room = hotel?.rooms.find((room) => room.id === Number(searchData.roomId || 0));

  // Данные

  const [mockData, setMockData] = useState(() => {
    return {
      dates: `${isoToDateFormat(searchData.checkInDate || '2025-06-17')} - ${isoToDateFormat(searchData.checkOutDate || '2025-06-29')}`,
      guestsInfo: `${searchData.guests} гостей на ${searchData.nights} ночей`,
      paymentInfo: 'Необходимо оплатить при заселении',
      resortFee: 100,
      price: searchData.price,
      flightInfo: {
        flightType: 'Чартерный рейс',
        flightDetails:
          'Туроператор может изменить полётную программу. Например, может поменяться время вылета, авиакомпания или аэропорты. Мы сообщим, если что-то изменится.',
      },
      checkInDate: isoToDateFormat(searchData.checkInDate || '2025-06-17'),
      checkOutDate: isoToDateFormat(searchData.checkOutDate || '2025-06-29'),
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
          date_born: '',
          citizenship: '',
          international_passport_no: '',
          validity_international_passport: '',
        }),
      ),
    };
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

  const INSURANCE = [
    {
      title: 'Медицинская страховка',
      description:
        'Медицинская страховка покрывает расходы в пределах определённой суммы, которая прописана в полисе, при экстренных случаях: сильной боли, плохом самочувствии, травме, обострении хронических заболеваний.',
      key: 'med_insurance',
      pricePerOne: '5000',
      per: 'person',
    },
    {
      title: 'Оформление визы',
      description:
        'Поможем подготовить пакет документов, передадим его туроператору, а он отправит в Визовый центр. Если у вас нет биометрических данных, нужно будет приехать в Визовый центр и сдать отпечатки пальцев. Готовые оригиналы документов доставим вам домой курьером.',
      key: 'visa',
      pricePerOne: '560',
      per: 'person',
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
      pricePerOne: '1680',
      per: 'all',
    },
  ];

  const [insuranceSelection, setInsuranceSelection] = useState<TInsuranceSelection>(
    {},
  );

  useEffect(() => {
    const medEntry = insuranceSelection['med_insurance'];
    const visaEntry = insuranceSelection['visa'];
    const cancellationEntry = insuranceSelection['cancellation_insurance'];

    const medCount = medEntry?.all ? guests : medEntry?.persons?.length || 0;
    const visaCount = visaEntry?.all ? guests : visaEntry?.persons?.length || 0;
    const cancellationCount = cancellationEntry ? 1 : 0;

    const medPricePerOne = Number(mockData.med_insurance_price_per_one) || 0;
    const visaPricePerOne = Number(mockData.visa_price_per_one) || 0;

    setMockData((prev) => ({
      ...prev,
      med_insurance_count: medCount,
      med_insurance_total_price: String(medPricePerOne * medCount),
      visa_count: visaCount,
      visa_total_price: String(visaPricePerOne * visaCount),
      cancellation_insurance_total: String(cancellationCount * 1680),
    }));
  }, [insuranceSelection, guests]);

  const toggleInsurance = (key: string, per: 'person' | 'all') => {
    setInsuranceSelection((prev) => {
      const copy = { ...prev };
      const existing = copy[key];
      if (!existing) {
        if (per === 'all') copy[key] = { all: true };
        else copy[key] = { persons: Array.from({ length: guests }, (_, i) => i) };
        return copy;
      }
      delete copy[key];
      return copy;
    });
  };

  const handleGuestToggle = (
    insuranceKey: string,
    guestIndex: number,
    checked: boolean,
  ) => {
    setInsuranceSelection((prev) => {
      const entry = prev[insuranceKey];
      if (!entry || entry.all) return prev;

      const selected = new Set(entry.persons || []);
      if (checked) selected.add(guestIndex);
      else selected.delete(guestIndex);

      const arr = Array.from(selected).sort((a, b) => a - b);
      const copy = { ...prev };
      if (arr.length === 0) delete copy[insuranceKey];
      else copy[insuranceKey] = { persons: arr };
      return copy;
    });
  };

  const handleSelectAll = (insuranceKey: string, checked: boolean) => {
    setInsuranceSelection((prev) => {
      const entry = prev[insuranceKey];
      if (!entry) return prev;
      if (entry.all) return prev;

      const copy = { ...prev };
      if (checked) {
        copy[insuranceKey] = {
          persons: Array.from({ length: guests }, (_, i) => i),
        };
      } else {
        delete copy[insuranceKey];
      }
      return copy;
    });
  };

  const handleAddGuest = () => {
    const newIndex = mockData.guestsDetails.length;

    setMockData((prevState) => ({
      ...prevState,
      guestsDetails: [
        ...prevState.guestsDetails,
        {
          pk: newIndex,
          firstname: '',
          lastname: '',
          date_born: '',
          citizenship: '',
          international_passport_no: '',
          validity_international_passport: '',
        },
      ],
      guests: prevState.guests + 1,
    }));

    setInsuranceSelection((prev) => {
      const updated: TInsuranceSelection = { ...prev };
      Object.entries(prev).forEach(([k, entry]) => {
        if (entry.all) return;
        const arr = entry.persons || [];
        if (arr.length === mockData.guestsDetails.length) {
          updated[k] = { persons: [...arr, newIndex] };
        }
      });
      return updated;
    });

    setGuests((p) => p + 1);
  };

  const handleRemoveGuest = () => {
    setGuests((prev) => {
      if (prev <= 1) return prev;
      const newCount = prev - 1;

      setMockData((prevState) => ({
        ...prevState,
        guestsDetails: prevState.guestsDetails.slice(0, newCount),
        guests: newCount,
      }));

      setInsuranceSelection((prevIns) => {
        const updated: TInsuranceSelection = {};
        Object.entries(prevIns).forEach(([k, entry]) => {
          if (entry.all) {
            updated[k] = entry;
            return;
          }
          const filtered = (entry.persons || []).filter((i) => i < newCount);
          if (filtered.length > 0) updated[k] = { persons: filtered };
        });
        return updated;
      });

      return newCount;
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
    <section className='relative mx-auto mb-5'>
      <div
        className={`absolute left-0 top-0 -z-10 h-[200px] w-full rounded-bl-[20px] rounded-br-[20px] bg-blue-600 bg-[url("/plain.svg")] bg-no-repeat md:h-[400px] md:rounded-bl-[100px] md:rounded-br-[100px]`}
      ></div>
      <div className='container'>
        <div className='pt-[0px] md:pb-[25px] md:pt-[15px]'>
          <Breadcrumbs
            color='white'
            paths={[
              { label: 'Туры', href: '/catalog?tab=Туры' },
              {
                label: `${hotel?.country}, ${hotel?.city}`,
                href: `/catalog?tab=Туры?where=${hotel?.city}`,
              },
              {
                label: `${hotel?.name}`,
                href: `/tour-page?where=${hotel?.city}&hotelName=${hotel?.name}&hotelId=${hotel.id}`,
              },
              {
                label: 'Бронирование',
              },
            ]}
          />
        </div>
        <div className='flex flex-col md:flex-row'>
          {/* {left side content} */}
          <div className='flex w-full flex-col gap-4 p-4 md:-mt-[64px] md:w-2/3'>
            <Typography
              variant='h2'
              className='hidden font-bold text-white md:block'
            >
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
                    Необходимо оплатить при заселении {mockData.resortFee} ₽ с
                    человека за ночь
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
              <ul className='flex flex-col gap-3 p-4'>
                {INSURANCE.map((item) => {
                  const entry = insuranceSelection[item.key];
                  const personsSelected = entry?.persons || [];

                  const added = !!entry;

                  return (
                    <li key={item.key} className='flex flex-col gap-3'>
                      <div className='flex flex-col gap-4 md:flex-row'>
                        <div className='flex flex-col gap-2'>
                          <Typography
                            variant='l'
                            className='font-bold text-grey-950'
                          >
                            {item.title}
                          </Typography>
                          <Typography variant='m' className='text-grey-950'>
                            {item.description}
                          </Typography>
                        </div>
                        <div className='md:min-w-[233px] lg:min-w-[260px]'>
                          {!added ? (
                            <button
                              className='flex w-full items-center justify-between rounded-[20px] bg-white p-5 shadow-lg md:h-[84px] lg:h-[88px]'
                              onClick={() =>
                                toggleInsurance(
                                  item.key,
                                  item.per === 'all' ? 'all' : 'person',
                                )
                              }
                            >
                              <div className='flex flex-col items-start gap-1'>
                                <Typography variant='l-bold'>Добавить</Typography>
                                <Typography variant='m' className='text-grey-800'>
                                  {item.per === 'all'
                                    ? `${formatNumberToPriceInRub(Number(item.pricePerOne))} за всех`
                                    : `от ${formatNumberToPriceInRub(Number(item.pricePerOne))} за одного`}
                                </Typography>
                              </div>
                              <div className='relative h-[14px] w-[14px]'>
                                <div className="absolute inset-0 before:absolute before:left-0 before:top-1/2 before:h-0 before:w-full before:-translate-y-1/2 before:border-t-2 before:border-blue-950 before:content-[''] after:absolute after:left-1/2 after:top-0 after:h-full after:w-0 after:-translate-x-1/2 after:border-l-2 after:border-blue-950 after:content-['']"></div>
                              </div>
                            </button>
                          ) : (
                            <div className='w-full'>
                              {item.per === 'all' ? (
                                <div className='flex flex-col gap-3 rounded-[20px] border-4 border-green-300 bg-white p-5'>
                                  <div className='flex justify-between'>
                                    <Typography variant='l-bold'>
                                      {formatNumberToPriceInRub(
                                        Number(item.pricePerOne),
                                      )}
                                    </Typography>
                                    <button
                                      onClick={() =>
                                        toggleInsurance(
                                          item.key,
                                          item.per === 'all' ? 'all' : 'person',
                                        )
                                      }
                                    >
                                      <div className='relative h-[14px] w-[14px]'>
                                        <div className="absolute inset-0 before:absolute before:left-0 before:top-1/2 before:h-0 before:w-full before:-translate-y-1/2 before:border-t-2 before:border-blue-950 before:content-['']"></div>
                                      </div>
                                    </button>
                                  </div>
                                </div>
                              ) : (
                                <div className='flex max-h-56 flex-col gap-3 rounded-[20px] border-4 border-green-300 bg-white p-5'>
                                  <div className='flex justify-between'>
                                    <Typography variant='l-bold'>
                                      {formatNumberToPriceInRub(
                                        Number(item.pricePerOne) *
                                          personsSelected.length,
                                      )}
                                    </Typography>
                                    <button
                                      onClick={() =>
                                        toggleInsurance(
                                          item.key,
                                          item.per === 'all' ? 'all' : 'person',
                                        )
                                      }
                                    >
                                      <div className='relative h-[14px] w-[14px]'>
                                        <div className="absolute inset-0 before:absolute before:left-0 before:top-1/2 before:h-0 before:w-full before:-translate-y-1/2 before:border-t-2 before:border-blue-950 before:content-['']"></div>
                                      </div>
                                    </button>
                                  </div>
                                  <div className='mb-2 flex items-center'>
                                    <Checkbox
                                      isChecked={
                                        personsSelected.length === guests &&
                                        guests > 0
                                      }
                                      onChange={(checked) =>
                                        handleSelectAll(item.key, checked)
                                      }
                                      label='Выбрать всех'
                                      className='bold text-[13px] text-grey-950'
                                    />
                                  </div>
                                  <ul
                                    className={`flex flex-col gap-2 pl-7 ${guests >= 3 ? 'scrollbar-blue overflow-y-auto' : ''}`}
                                  >
                                    {mockData.guestsDetails.map((guest) => (
                                      <li key={guest.pk} className='flex flex-col'>
                                        <Checkbox
                                          isChecked={personsSelected.includes(
                                            guest.pk,
                                          )}
                                          onChange={(checked) =>
                                            handleGuestToggle(
                                              item.key,
                                              guest.pk,
                                              checked,
                                            )
                                          }
                                          label={`${guest.firstname || `Гость ${guest.pk + 1}`} ${guest.lastname}`}
                                          className='gap-1 text-[13px] text-grey-950'
                                        />
                                        <Typography
                                          variant='m'
                                          className='pl-9 text-grey-800'
                                        >
                                          {formatNumberToPriceInRub(
                                            Number(item.pricePerOne),
                                          )}
                                        </Typography>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
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
                          maskDate={true}
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
                            mockData.guestsDetails[index]
                              ?.international_passport_no || ''
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
                          maskDate={true}
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
                onClick={handleAddGuest}
                variant={'secondary'}
                size={'s'}
              >
                Добавить пользователя
              </ButtonCustom>
              <ButtonCustom
                className='mb-4'
                onClick={handleRemoveGuest}
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
          <div className='w-full p-4 md:sticky md:top-[30px] md:w-1/3 md:self-start'>
            <HotelBookingPayForm data={tourData} />
          </div>
        </div>
      </div>
    </section>
  );
}
