'use client';

import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  useAddFlightMutation,
  useChangeFlightMutation,
  useLazyGetOneFlightQuery,
} from '@/servicesApi/flightsApi';
import { Modal } from '@/shared/modal';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { Select } from '@/shared/ui/select';
import { airports } from '@/temp/airports-mock';
import { IFlight } from '@/types/flight-type';

export default function AddedFlights() {
  const router = useRouter();
  const idFlight = useSearchParams().get('id');

  const [trigger, { data }] = useLazyGetOneFlightQuery();
  const [changeFlight] = useChangeFlightMutation();

  const [addFlight, { error: queryErr, isError }] = useAddFlightMutation();
  const airportsName = airports.map((airport) => airport.name);

  const [flightNumber, setFlightNumber] = useState<string>('');
  const [airline, setAirline] = useState<string>(airportsName[0]);
  const [departureCity, setDepartureCity] = useState<string>('');
  const [arrivalCity, setArrivalCity] = useState<string>('');
  const [departureAirport, setDepartureAirport] = useState<string>('');
  const [arrivalAirport, setArrivalAirport] = useState<string>('');
  const [departureDate, setDepartureDate] = useState<string>('');
  const [departureTime, setDepartureTime] = useState<string>('');
  const [arrivalDate, setArrivalDate] = useState<string>('');
  const [arrivalTime, setArrivalTime] = useState<string>('');
  const [shortDescription, setShortDescription] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [priceForChild, setPriceForChild] = useState<string | undefined>(undefined);
  const [serviceClass, setServiceClass] = useState<string>('Эконом');
  const [flightType, setFlightType] = useState<string>('Регулярный');
  const errors = useRef<{ name: string; description: string }[]>([]);
  const [errModal, setErrModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const handleAirlineChange = (val: string) => {
    setAirline(val);
    const _airCode = airports.filter((airport) => airport.name === val)[0].code;
    setFlightNumber(_airCode + ' ' + (Date.now() % 10000));
  };
  const handleDepartureCityChange = (val: string) => {
    setDepartureCity(val);
  };
  const handleArrivalCityChange = (val: string) => {
    setArrivalCity(val);
  };
  const handleDepartureAirportChange = (val: string) => {
    setDepartureAirport(val);
  };
  const handleArrivalAirportChange = (val: string) => {
    setArrivalAirport(val);
  };
  const handleDepartureDateChange = (val: string) => {
    setDepartureDate(val.replaceAll('.', '-'));
  };
  const handleDepartureTimeChange = (val: string) => {
    setDepartureTime(val);
  };
  const handleArrivalDateChange = (val: string) => {
    setArrivalDate(val.replaceAll('.', '-'));
  };
  const handleArrivalTimeChange = (val: string) => {
    setArrivalTime(val);
  };
  const handleShortDescriptionChange = (val: string) => {
    setShortDescription(val);
  };
  const handlePriceChange = (val: string) => {
    setPrice(val);
  };
  const handlePriceForChildChange = (val: string | undefined) => {
    setPriceForChild(val);
  };
  const handleServiceClassChange = (val: string) => {
    setServiceClass(val);
  };
  const handleFlightTypeChange = (val: string) => {
    setFlightType(val);
  };
  const handleBack = () => {
    router.back();
  };
  const handleSave = async () => {
    const _flight: Omit<IFlight, 'id'> = {
      flight_number: flightNumber,
      airline,
      departure_airport: departureAirport,
      arrival_airport: arrivalAirport,
      departure_date: departureDate,
      departure_time: departureTime,
      arrival_date: arrivalDate,
      arrival_time: arrivalTime,
      price,
      price_for_child: priceForChild,
      service_class: serviceClass,
      flight_type: flightType || 'Регулярный',
      description: 'string',
    };
    if (!idFlight) {
      try {
        await addFlight(_flight).unwrap();
        setSuccessModal(true);
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        await changeFlight({ body: _flight, id: +idFlight }).unwrap();
        setSuccessModal(true);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const closeErrModal = () => {
    setErrModal(false);
    errors.current = [];
  };

  // TODO: обработка ошибки валидации с бэка
  useEffect(() => {
    if (!isError) return;
    setErrModal(true);

    if (queryErr && typeof queryErr === 'object' && 'status' in queryErr) {
      interface ErrorsValidate {
        [key: string]: string[];
      }
      const errorsValidate = queryErr.data as ErrorsValidate;
      for (const key in errorsValidate) {
        errors.current.push({ name: key, description: errorsValidate[key][0] });
      }
    } else {
      throw new Error();
    }
  }, [isError]);

  useEffect(() => {
    if (!successModal) return;
    const timer = setTimeout(() => {
      setSuccessModal(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [successModal]);

  useEffect(() => {
    if (!idFlight) return;
    trigger(+idFlight);
  }, [idFlight]);

  useEffect(() => {
    if (!data) return;
    setFlightNumber(data.flight_number);
    setAirline(data.airline);
    setDepartureAirport(data.departure_airport);
    setArrivalAirport(data.arrival_airport);
    setDepartureDate(data.departure_date);
    setDepartureTime(data.departure_time);
    setArrivalDate(data.arrival_date);
    setArrivalTime(data.arrival_time);
    setPrice(data.price);
    setServiceClass(data.service_class);
    setPriceForChild(data.price_for_child);
    setFlightType(data.flight_type);
  }, [data]);

  return (
    <div className='w-full'>
      <div
        className='mb-5 w-fit cursor-pointer rounded-full border border-grey-300 bg-gradient-to-br from-grey-200 p-2 shadow-md active:shadow-none'
        onClick={handleBack}
      >
        <SvgSprite name='arrow' width={20} height={20} className='rotate-180' />
      </div>
      <div className='flex flex-col gap-5 rounded-2xl border border-grey-100 p-10 shadow-md'>
        <div className='flex flex-col gap-5'>
          <div className='flex w-full flex-col gap-3'>
            <Typography variant='l-bold'>Авиакомпания</Typography>
            <Select
              options={airportsName}
              color='blue'
              size='small'
              className='w-full'
              getValue={handleAirlineChange}
              startValue={airline}
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Typography variant='l-bold'>Класс</Typography>
            <Select
              options={['Эконом', 'Бизнес', 'Первый']}
              color='blue'
              size='small'
              className='w-full'
              getValue={handleServiceClassChange}
              startValue={serviceClass}
            />
          </div>
          <NamedInput
            name='Цена билета для взрослого'
            title='Цена билета для взрослого'
            placeholder='6 500 ₽'
            getValue={(val) => handlePriceChange(val as string)}
            startValue={price}
          />
          <NamedInput
            name='Цена для ребенка'
            title='Цена для ребенка'
            placeholder='6 500 ₽'
            getValue={(val) => handlePriceForChildChange(val as string)}
            startValue={priceForChild}
          />

          <NamedInput
            name='Номер рейса'
            title='Номер рейса'
            placeholder='SU-12345'
            disabled
            startValue={flightNumber}
          />
        </div>
        <div className='flex w-full flex-col gap-3'>
          <Typography variant='l-bold'>Тип рейса</Typography>
          <Select
            options={['Регулярный', 'Чартерный']}
            color='blue'
            size='small'
            className='w-full'
            getValue={handleFlightTypeChange}
            startValue={flightType}
          />
        </div>
        <div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2'>
          <NamedInput
            name='Город вылета'
            title='Город вылета'
            placeholder='Москва'
            getValue={(val) => handleDepartureCityChange(val as string)}
            startValue={departureCity}
          />
          <NamedInput
            name='Аэропорт вылета'
            title='Аэропорт вылета'
            placeholder='Домодедово, DME'
            getValue={(val) => handleDepartureAirportChange(val as string)}
            startValue={departureAirport}
          />
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Дата вылета</Typography>
            <InputDateForSearchBlock
              placeholder='Дата вылета'
              getValue={handleDepartureDateChange}
              className='rounded-md border border-blue-600 py-5'
              startValue={departureDate}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Время вылета</Typography>
            <input
              type='time'
              name='timeStart'
              id='timeStart'
              placeholder='12:50'
              className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              onChange={(e) => handleDepartureTimeChange(e.target.value)}
              value={departureTime}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2'>
          <NamedInput
            name='Город прилёта'
            title='Город прилёта'
            placeholder='Шарм-Эль-Шейх'
            getValue={(val) => handleArrivalCityChange(val as string)}
            startValue={arrivalCity}
          />
          <NamedInput
            name='Аэропорт прилёта'
            title='Аэропорт прилёта'
            placeholder='Sharm-El-Sheikh, SSH'
            getValue={(val) => handleArrivalAirportChange(val as string)}
            startValue={arrivalAirport}
          />
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Дата прилёта</Typography>
            <InputDateForSearchBlock
              placeholder='Дата прилёта'
              getValue={handleArrivalDateChange}
              className='rounded-md border border-blue-600 py-5'
              startValue={arrivalDate}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Время прилёта</Typography>
            <input
              type='time'
              name='timeEnd'
              id='timeEnd'
              className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              onChange={(e) => handleArrivalTimeChange(e.target.value)}
              value={arrivalTime}
            />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Typography variant='l-bold'>Краткое описание</Typography>
          <input
            name='shortDescription'
            id='shortDescription'
            className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
            onChange={(e) => handleShortDescriptionChange(e.target.value)}
            value={shortDescription}
          />
        </div>
        <div className='flex w-full'>
          <ButtonCustom
            variant='tetriary'
            size='m'
            className='-ml-7 flex items-center gap-2 bg-transparent text-blue-700 transition-colors hover:text-blue-900'
          >
            <div className='border-current flex h-6 w-6 items-center justify-center rounded-full border'>
              <SvgSprite
                color='blue'
                name='cross'
                className='h-[8px] w-[8px] rotate-45 transform'
              />
            </div>
            <span className='text-base font-medium'>
              Добавить класс обслуживания
            </span>
          </ButtonCustom>
        </div>
      </div>
      <div className={`mt-10 flex justify-end gap-4`}>
        <ButtonCustom variant='secondary' size='m' onClick={handleBack}>
          <Typography variant='l-bold'>Отменить</Typography>
        </ButtonCustom>
        <ButtonCustom variant='primary' size='m' onClick={handleSave}>
          <Typography variant='l-bold'>Сохранить</Typography>
        </ButtonCustom>
      </div>
      <Modal isOpen={errModal} getState={closeErrModal} err>
        <ul className=''>
          <Typography variant='subtitle4'>
            Следующие поля заполнены не верно:
          </Typography>
          {isError &&
            errors.current.map((err) => (
              <li key={nanoid()}>
                <Typography>{err.name + ': ' + err.description}</Typography>
              </li>
            ))}
        </ul>
      </Modal>
      <Modal isOpen={successModal} getState={() => {}}>
        <div className='flex flex-col items-center gap-3 px-10'>
          <Typography variant='subtitle4'>Успешно</Typography>
          <Typography>
            {idFlight ? 'рейс обновлён' : 'рейс добавлен в базу данных'}
          </Typography>
        </div>
      </Modal>
    </div>
  );
}
