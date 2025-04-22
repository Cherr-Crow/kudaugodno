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

type IFlightForm = {
  flightNumber: string;
  airline: string;
  departureCity: string;
  arrivalCity: string;
  departureAirport: string;
  arrivalAirport: string;
  departureDate: string;
  departureTime: string;
  arrivalDate: string;
  arrivalTime: string;
  shortDescription: string;
  price: string;
  priceForChild?: string;
  serviceClass: string;
  flightType: string;
};

export default function AddedFlights() {
  const router = useRouter();
  const idFlight = useSearchParams().get('id');

  const [trigger, { data }] = useLazyGetOneFlightQuery();
  const [changeFlight] = useChangeFlightMutation();

  const [addFlight, { error: queryErr, isError }] = useAddFlightMutation();
  const airportsName = airports.map((airport) => airport.name);

  const errors = useRef<{ name: string; description: string }[]>([]);
  const [errModal, setErrModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const [formData, setFormData] = useState<IFlightForm>({
    flightNumber: '',
    airline: airportsName[0],
    departureCity: '',
    arrivalCity: '',
    departureAirport: '',
    arrivalAirport: '',
    departureDate: '',
    departureTime: '',
    arrivalDate: '',
    arrivalTime: '',
    shortDescription: '',
    price: '',
    priceForChild: undefined,
    serviceClass: 'Эконом',
    flightType: 'Регулярный',
  });

  const updateFields = (updates: Partial<IFlightForm>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleAirlineChange = (val: string) => {
    const airport = airports.find((airport) => airport.name === val);
    const airCode = airport?.code || '';
    updateFields({
      airline: val,
      flightNumber: `${airCode} ${Date.now() % 10000}`,
    });
  };

  const handleDateChange =
    (field: 'arrivalDate' | 'departureDate') => (val: string) => {
      updateFields({ [field]: val.replaceAll('.', '-') });
    };

  const handleBack = () => {
    router.back();
  };

  const handleSave = async () => {
    const _flight: Omit<IFlight, 'id'> = {
      flight_number: formData.flightNumber,
      airline: formData.airline,
      departure_city: formData.departureCity,
      arrival_city: formData.arrivalCity,
      departure_airport: formData.departureAirport,
      arrival_airport: formData.arrivalAirport,
      departure_date: formData.departureDate,
      departure_time: formData.departureTime,
      arrival_date: formData.arrivalDate,
      arrival_time: formData.arrivalTime,
      price: formData.price,
      price_for_child: formData.priceForChild,
      service_class: formData.serviceClass,
      flight_type: formData.flightType || 'Регулярный',
      description: 'string',
    };

    try {
      if (!idFlight) {
        await addFlight(_flight).unwrap();
      } else {
        await changeFlight({ body: _flight, id: +idFlight }).unwrap();
      }
      setSuccessModal(true);
    } catch (error) {
      console.error(error);
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
    setFormData({
      flightNumber: data.flight_number,
      airline: data.airline,
      departureCity: data.departure_city,
      arrivalCity: data.arrival_city,
      departureAirport: data.departure_airport,
      arrivalAirport: data.arrival_airport,
      departureDate: data.departure_date,
      departureTime: data.departure_time,
      arrivalDate: data.arrival_date,
      arrivalTime: data.arrival_time,
      price: data.price,
      priceForChild: data.price_for_child,
      serviceClass: data.service_class,
      flightType: data.flight_type,
      shortDescription: '',
    });
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
              getValue={(val) => handleAirlineChange(val)}
              startValue={formData.airline}
            />
          </div>
          <div className='flex w-full flex-col gap-3'>
            <Typography variant='l-bold'>Класс</Typography>
            <Select
              options={['Эконом', 'Бизнес', 'Первый']}
              color='blue'
              size='small'
              className='w-full'
              getValue={(val) => updateFields({ serviceClass: val })}
              startValue={formData.serviceClass}
            />
          </div>
          <NamedInput
            name='Цена билета для взрослого'
            title='Цена билета для взрослого'
            placeholder='6 500 ₽'
            getValue={(val) => updateFields({ price: val as string })}
            startValue={formData.price}
          />
          <NamedInput
            name='Цена для ребенка'
            title='Цена для ребенка'
            placeholder='6 500 ₽'
            getValue={(val) => updateFields({ priceForChild: val as string })}
            startValue={formData.priceForChild}
          />

          <NamedInput
            name='Номер рейса'
            title='Номер рейса'
            placeholder='SU-12345'
            disabled
            startValue={formData.flightNumber}
          />
        </div>
        <div className='flex w-full flex-col gap-3'>
          <Typography variant='l-bold'>Тип рейса</Typography>
          <Select
            options={['Регулярный', 'Чартерный']}
            color='blue'
            size='small'
            className='w-full'
            getValue={(val) => updateFields({ flightType: val })}
            startValue={formData.flightType}
          />
        </div>
        <div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2'>
          <NamedInput
            name='Город вылета'
            title='Город вылета'
            placeholder='Москва'
            getValue={(val) => updateFields({ departureCity: val as string })}
            startValue={formData.departureCity}
          />
          <NamedInput
            name='Аэропорт вылета'
            title='Аэропорт вылета'
            placeholder='Домодедово, DME'
            getValue={(val) => updateFields({ departureAirport: val as string })}
            startValue={formData.departureAirport}
          />
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Дата вылета</Typography>
            <InputDateForSearchBlock
              placeholder='Дата вылета'
              getValue={handleDateChange('departureDate')}
              className='rounded-md border border-blue-600 py-5'
              startValue={formData.departureDate}
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
              onChange={(e) => updateFields({ departureTime: e.target.value })}
              value={formData.departureTime}
            />
          </div>
        </div>
        <div className='grid grid-cols-1 items-center gap-5 md:grid-cols-2'>
          <NamedInput
            name='Город прилёта'
            title='Город прилёта'
            placeholder='Шарм-Эль-Шейх'
            getValue={(val) => updateFields({ arrivalCity: val as string })}
            startValue={formData.arrivalCity}
          />
          <NamedInput
            name='Аэропорт прилёта'
            title='Аэропорт прилёта'
            placeholder='Sharm-El-Sheikh, SSH'
            getValue={(val) => updateFields({ arrivalAirport: val as string })}
            startValue={formData.arrivalAirport}
          />
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Дата прилёта</Typography>
            <InputDateForSearchBlock
              placeholder='Дата прилёта'
              getValue={handleDateChange('arrivalDate')}
              className='rounded-md border border-blue-600 py-5'
              startValue={formData.arrivalDate}
            />
          </div>
          <div className='flex flex-col gap-3'>
            <Typography variant='l-bold'>Время прилёта</Typography>
            <input
              type='time'
              name='timeEnd'
              id='timeEnd'
              className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
              onChange={(e) => updateFields({ arrivalTime: e.target.value })}
              value={formData.arrivalTime}
            />
          </div>
        </div>
        <div className='flex flex-col gap-3'>
          <Typography variant='l-bold'>Краткое описание</Typography>
          <input
            name='shortDescription'
            id='shortDescription'
            className='w-full rounded-md border border-blue-600 px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500'
            onChange={(e) => updateFields({ shortDescription: e.target.value })}
            value={formData.shortDescription}
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
