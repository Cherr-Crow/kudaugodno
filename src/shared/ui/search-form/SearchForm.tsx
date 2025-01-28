'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

import { SubmitHandler, useForm } from 'react-hook-form';

import './search-form-styles.css';
import { useScreen } from 'usehooks-ts';

import { PopupWindow } from '@/shared/popup-window';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';

import { FormData, SearchFormProps } from './SearchForm.types';
import { ButtonCustom } from '../button-custom';
import { searchData } from './search-form-utils';
import { Select } from '../select';

const LabelStyle =
  'flex flex-col  xl:h-[48px] h-[60px] mb-2 mt-2 pl-2 relative xl:border-r-2 xl:bg-transparent bg-white border-r-0 xl:rounded-none rounded-lg border-solid border-grey-100 ';
const formShadow =
  'shadow-[0px 7px 7px 0px rgba(44, 54, 131, 0.09),0px 16px 9px 0px rgba(44, 54, 131, 0.05),0px 28px 11px 0px rgba(44, 54, 131, 0.01),44px 44px 12px 0px rgba(44, 54, 131, 0),0px 1px 4px 0px rgba(0, 0, 0, 0.25);]';
const formStyle =
  'flex justify-center items-center pl-6 pr-2 xl:bg-white bg-transparent rounded-[40px]   xl:flex-row  flex-col';
const inputStyle =
  'border-none outline-none placeholder-black text-black font-[500]';

export function SearchForm({ tabClick, className }: SearchFormProps) {
  const windowWidth = useScreen();
  const [departureCity, setDepartureCity] = useState('');
  const [where, setWhere] = useState('');
  const [selectedDateArrival, setSelectedDateArrival] = useState<Date | null>(null); //стэйт выбранной даты из календаря
  const [selectedDateDeparture, setSelectedDateDeparture] = useState<Date | null>(
    null,
  );
  const [reqData, setReqData] = useState<{ [key: string]: string }[] | null>(null); /// стэйт первого инпута
  const [reqDataSecond, setReqDataSecond] = useState<{ [key: string]: string }[]>(
    [],
  );

  const inputChangeTimer = useRef<NodeJS.Timeout | null>(null);
  const inputChangeTimer2 = useRef<NodeJS.Timeout | null>(null);

  const calendarRef = useRef<HTMLDivElement | null>(null);
  const calendarSecondRef = useRef<HTMLDivElement | null>(null);
  const whereRef = useRef<HTMLDivElement | null>(null);

  const [wherePopup, setWherePopup] = useState<boolean>(true);
  const [calendar, setCalendar] = useState<boolean>(false);
  const [calendarSecond, setCalendarSecond] = useState<boolean>(false);
  const [guests, setGuests] = useState<string>('Количество гостей');

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    reset,
  } = useForm<FormData>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    reset({
      DepartureCity: '',
      Where: '',
      ArrivalDate: '',
      DepartureDate: '',
      Guests: '',
      'тип брони': tabClick,
    });
    setReqData(null);
    setReqDataSecond([]);
    setWhere('');
    setSelectedDateArrival(null);
    setSelectedDateDeparture(null);
    setGuests('Количество гостей');
    setValue('тип брони', tabClick); // передаю в форму тип брони (туры или отели)
  }, [tabClick]);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch(`https://${process.env.NEXT_PUBLIC_API}/api/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const dataRes = await response.json(); ////// тут уже разберемся когда API будет готово
      // eslint-disable-next-line unused-imports/no-unused-vars,@typescript-eslint/no-unused-vars
    } catch (error) {}
  };

  ///// первые два инпута НАЧАЛО ---------------------------------------------------------------

  const handleDepartureCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDepartureCity(value);
    setReqData(null);

    if (inputChangeTimer.current) {
      clearTimeout(inputChangeTimer.current);
    }

    if (departureCity.length <= 1) return; // если в инпуте меньше 2 символов, то не отправляю запрос потому как стэйт не изменится при первом вводе
    inputChangeTimer.current = setTimeout(async () => {
      const dataFetch = await searchData(value);
      setReqData(dataFetch.results);
    }, 1000);
  };

  const handleWhereChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setWhere(e.target.value);
    setReqDataSecond([]);
    if (inputChangeTimer2.current) {
      clearTimeout(inputChangeTimer2.current);
    }
    if (where.length <= 1) return; // если в инпуте меньше 2 символов, то не отправляю запрос потому как стэйт не изменится при первом вводе
    inputChangeTimer2.current = setTimeout(async () => {
      const dataFetch = await searchData(value);
      setReqDataSecond(dataFetch.results);
      setWherePopup(true);
    }, 1000);
  };

  useEffect(() => {
    if (reqData) {
      setDepartureCity(reqData[0].name);
    }
    if (reqDataSecond.length === 1) {
      setWhere(reqDataSecond[0].name);
    } else if (where === '' && !wherePopup) {
      if (reqDataSecond.length !== 0) setReqDataSecond([]);
      setWherePopup(false);
    }
  }, [reqData, reqDataSecond, departureCity, where]);

  /// первые два инпута КОНЕЦ -----------------------------------------------------------------------------------------------

  /************************************************************************/

  /// обработка данных из календаря НАЧАЛО ----------------------------------------------------------

  const handleDateArrival = (value: Date | null) => {
    if (value instanceof Date) {
      setSelectedDateArrival(value); // стэйт для инпута даты заезда
      setValue('ArrivalDate', value.toLocaleDateString()); // передаю в форму дату заезда
      setCalendar(false); // закрываю календарь после выбранной даты
    }
  };

  const handleDateDeparture = (value: Date | null) => {
    if (value instanceof Date) {
      setSelectedDateDeparture(value);
      setValue('DepartureDate', value.toLocaleDateString());
      setCalendarSecond(false);
    }
  };

  //// ЗАКРЫВАНИЕ ПУПАПОВ
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Для 1-го календаря
      if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
        setCalendar(false);
      }
      // Для 2-го календаря
      if (
        calendarSecondRef.current &&
        !calendarSecondRef.current.contains(e.target as Node)
      ) {
        setCalendarSecond(false);
      }
      // для "КУДА"
      if (
        reqDataSecond.length > 0 &&
        whereRef.current &&
        !whereRef.current.contains(e.target as Node)
      ) {
        setWherePopup(false);
      }
    };

    window.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('mousedown', handleClickOutside);
    };
  }, [reqDataSecond]);
  //// обработка данных из календаря КОНЕЦ ----------------------------------------------------------------

  const items = useMemo<React.ReactNode[]>(() => {
    if (reqDataSecond.length >= 1) {
      return reqDataSecond.map((el: { [key: string]: string }, index: number) => (
        <li
          key={index}
          className='m-2 h-max w-max cursor-pointer text-black'
          onClick={(e) => {
            setWhere((e.target as HTMLElement).textContent || '');
            setWherePopup(false);
          }}
        >
          {el.name}{' '}
        </li>
      ));
    } else {
      return [];
    }
  }, [reqDataSecond]);

  return isClient ? (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${formStyle} ${formShadow} ${className} search-form mx-auto`}
    >
      <label
        htmlFor='DepartureCity'
        className={`${LabelStyle} xl:w-[14%] ${tabClick === 'Отели' ? 'hidden' : 'block'} `}
        style={{ gridArea: 'input1' }}
      >
        <Typography
          variant='m'
          className={reqData ? 'text-black' : 'text-transparent'}
          children='Город вылета'
        />
        <input
          className={`${inputStyle} ${reqData ? '' : 'mt-[-12px] font-[500]'} ${windowWidth && windowWidth.width < 1280 && 'text-sm'}`}
          style={{ gridArea: 'input1' }}
          id='DepartureCity'
          type='text'
          placeholder='Город вылета'
          {...register('DepartureCity', {
            required: 'Поле обязательно для заполнения',
          })}
          value={departureCity}
          onInput={handleDepartureCityChange}
        />
        {errors.DepartureCity && (
          <div className='text-red-secondary'>{errors.DepartureCity.message}</div>
        )}
      </label>

      <label
        htmlFor='Where'
        className={`${LabelStyle} xl:w-[14%]`}
        style={{ gridArea: 'input2' }}
      >
        <Typography
          variant='m'
          className={reqDataSecond.length > 1 ? 'text-black' : 'text-transparent'}
          children='Куда'
        />
        <input
          className={`${inputStyle} ${reqDataSecond.length > 1 ? '' : 'mt-[-12px] font-[500]'} ${windowWidth && windowWidth.width < 1280 && 'text-sm'}`}
          id='Where'
          type='text'
          placeholder='Куда'
          {...register('Where', {
            required: 'Поле обязательно для заполнения',
          })}
          value={where}
          onChange={handleWhereChange}
        />
        {errors.Where && (
          <div className='text-red-secondary'>{errors.Where.message}</div>
        )}
        <PopupWindow
          ref={whereRef}
          children={
            <ul
              className={`w-max p-3 ${reqDataSecond.length > 1 ? 'block' : 'hidden'} relative`}
            >
              {items}
            </ul>
          }
          className={`${wherePopup ? 'block' : 'hidden'} z-[10]`}
        />
      </label>

      <label
        htmlFor='ArrivalDate'
        className={`${LabelStyle} mr-2`}
        style={{ gridArea: 'input3' }}
      >
        <Typography
          variant='m'
          className={selectedDateArrival ? 'text-black' : 'text-transparent'}
          children='Дата заезда'
        />
        <input
          className={`${inputStyle} ${selectedDateArrival ? '' : 'mt-[-12px] font-[500]'} ${windowWidth && windowWidth.width < 1280 && 'text-sm'}`}
          style={{ gridArea: 'input3' }}
          id='ArrivalDate'
          type='text'
          placeholder='Дата заезда'
          value={selectedDateArrival ? selectedDateArrival.toLocaleDateString() : ''}
          {...register('ArrivalDate', {
            required: 'Поле обязательно для заполнения Дата заезда',
          })}
          onFocus={() => setCalendar(true)}
        />
        {errors.ArrivalDate && (
          <div className='text-red-secondary'>{errors.ArrivalDate.message}</div>
        )}
        <SvgSprite
          name='calendar'
          width={20}
          height={20}
          color='#ADADAD'
          className='absolute left-3/4 top-4'
        />
        <PopupWindow
          ref={calendarRef}
          className={`${calendar ? 'block' : 'hidden'}`}
          children={undefined} // children={<Calendar onChange={handleDateArrival} />}
        />
      </label>

      <label
        htmlFor='DepartureDate'
        className={`${LabelStyle} ml-2`}
        style={{ gridArea: 'input4' }}
      >
        <Typography
          variant='m'
          className={selectedDateDeparture ? 'text-black' : 'text-transparent'}
          children='Дата выезда'
        />
        <input
          className={`${inputStyle} ${selectedDateDeparture ? '' : 'mt-[-12px] font-[500]'} ${windowWidth && windowWidth.width < 1280 && 'text-sm'}`}
          id='DepartureDate'
          type='text'
          placeholder='Дата выезда'
          value={
            selectedDateDeparture ? selectedDateDeparture.toLocaleDateString() : ''
          } // нужно сделать чтоб приходили чистые данные без тернарки
          {...register('DepartureDate', {
            required: 'Поле обязательно для заполнения',
          })}
          onFocus={() => setCalendarSecond(true)}
        />
        {errors.DepartureDate && (
          <div className='text-red-secondary'>{errors.DepartureDate.message}</div>
        )}
        <SvgSprite
          name='calendar'
          width={20}
          height={20}
          color='#ADADAD'
          className='absolute left-3/4 top-4'
        />
        <PopupWindow
          ref={calendarSecondRef}
          className={`${calendarSecond ? 'block' : 'hidden'}`}
          children={undefined} // children={<Calendar onChange={handleDateDeparture} />}
        />
      </label>

      <label
        htmlFor='Guests'
        className={`pl-5 ${LabelStyle} relative border-none text-transparent`}
        style={{ gridArea: 'input5' }}
      >
        <Typography
          variant='m'
          className={`mr-20 w-full ${guests !== 'Количество гостей' ? 'text-black' : 'text-transparent'}`}
          children=' Количество гостей'
        />
        <div
          className={`absolute ${guests !== 'Количество гостей' ? 'left-[2px] top-[12px] font-[500]' : 'left-[-7px] top-[-4px]'} text-black ${windowWidth && windowWidth.width < 1280 && 'text-sm'}`}
        >
          <Select
            options={[
              'Количество гостей',
              '1 гость',
              '2 гостя',
              '3 гостя',
              '4 гостя',
              '5 гостей',
              '6 гостей',
            ]}
            getValue={(value) => {
              setValue('Guests', value); // Передаю option в Form
              setGuests(value);
            }}
          />
        </div>
      </label>
      <ButtonCustom
        variant='primary'
        size='m'
        type='submit'
        className='mt-2 w-full xl:mt-0'
        style={{ gridArea: 'btnSubmit' }}
      >
        <Typography children='Найти' variant='l-bold' />
      </ButtonCustom>
    </form>
  ) : null;
}
