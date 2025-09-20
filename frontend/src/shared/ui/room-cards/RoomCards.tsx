'use client';

import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { Typography } from '@/shared/ui/typography';
import { formatNumberToPriceInRub } from '@/shared/utils/formatNumberToPriceInRub';

import { IRoomCards } from './RoomCards.types';
import { ButtonCustom } from '../button-custom';
import { PhotoCarousel } from '../photo-carousel';
import { SvgSprite } from '../svg-sprite';

export function RoomCards({
  name,
  tourId,
  roomId,
  tour_operator,
  guests,
  formatted_date,
  startDate,
  endDate,
  photos,
  meal,
  flight_info,
  total_price,
}: IRoomCards) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const type = searchParams.get('type') || '';
  const hotelId = searchParams.get('hotelId') || '';
  const hotelName = searchParams.get('hotelName') || '';
  const departureCity = searchParams.get('departureCity') || '';
  const where = searchParams.get('where') || '';
  const arrivalCountry = searchParams.get('arrivalCountry') || '';

  const handleBooking = () => {
    const searchData = {
      type,
      tourId: String(tourId) || '',
      hotelId: String(hotelId) || '',
      roomId: String(roomId) || '',
      name: name || '',
      startDate,
      endDate,
      tourOperator: tour_operator || 'Без оператора',
      price: total_price ? String(total_price) : '',
      flightTo: flight_info?.airline || '',
      nights: searchParams.get('nights') || '',
      guests: searchParams.get('guests') || '',
      checkInDate: startDate || '',
      checkOutDate: endDate || '',
      hotelName,
      departureCity,
      where,
      arrivalCountry,
    };
    localStorage.setItem('searchData', JSON.stringify(searchData));
    const url = '/tour-booking';
    router.push(`${url}?${new URLSearchParams(searchData).toString()}`);
  };

  function getNights(n: number): string {
    const lastDigit = n % 10;
    const lastTwoDigits = n % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return 'ночей';
    if (lastDigit === 1) return 'ночь';
    if (lastDigit >= 2 && lastDigit <= 4) return 'ночи';
    return 'ночей';
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  const tourNights = Math.ceil((+end - +start) / (1000 * 60 * 60 * 24));

  return (
    <div className='mb-5 flex min-h-[259px] max-w-[1800px] flex-col items-stretch justify-between rounded-2xl p-5 pt-4 shadow-md md:flex-row md:pb-6'>
      <div className='flex flex-col md:mr-[18px] md:w-[37%] lg:w-[46.6%]'>
        <Typography
          variant='h5'
          className='mb-1 text-blue-950 md:mb-3 lg:mb-4 lg:text-3xl'
        >
          {name}
        </Typography>
        <div className='mb-[10px] w-full md:mb-0'>
          <PhotoCarousel
            photos={photos}
            className='aspect-[2/1.2] rounded-[20px] md:aspect-[1/0.91] lg:aspect-[2/1]'
            buttonPositionClass='top-1/2 -translate-y-1/2'
          />
        </div>
      </div>
      <div className='w-full md:flex md:justify-between lg:flex-row lg:justify-between'>
        <div className='mb-[19px] flex flex-col justify-end md:mb-0'>
          <div className='flex items-center lg:mb-2'>
            <SvgSprite
              name='cutlery_items'
              width={40}
              height={40}
              strokeWidth={1}
              color='#1a1f4c'
              className='mr-2 w-[24px]'
            />
            <Typography variant='l-bold' className='text-blue-950'>
              {meal}
            </Typography>
          </div>
          <div className='mb-5 flex items-center space-x-2 text-blue-950 sm:flex md:mb-5'>
            <SvgSprite
              name='airplane'
              width={35}
              strokeWidth={1}
              color='#1a1f4c'
              className='w-[24px] lg:ml-[3px] lg:mr-[2px]'
            />
            <div className='flex flex-col lg:flex-row'>
              <Typography
                variant='l-bold'
                className='md:text-lg'
              >{`Прямой ${flight_info.type.toLocaleLowerCase()} рейс`}</Typography>
              <Typography
                variant='m'
                className='pl-1'
              >{` ${flight_info.airline}`}</Typography>
            </div>
          </div>
          <div className='lg:mb-5 lg:flex lg:gap-2'>
            <div className='mb-3 space-x-2'>
              <Typography variant='m' className='text-grey-600 lg:text-xl'>
                {`Туроператор `}
              </Typography>
              <Typography
                variant='m-bold'
                className='lg:text-xl'
              >{`${tour_operator} `}</Typography>
            </div>
            <div className='pl-2 md:mb-3 md:pl-0'>
              <Typography
                variant='m-bold'
                className='text-blue-950 lg:text-xl'
              >{`${guests} туриста `}</Typography>
              <Typography
                variant='m'
                className='whitespace-nowrap pl-7 text-blue-950 lg:pl-2 lg:text-xl'
              >{`${formatted_date}`}</Typography>
              <Typography
                variant='m'
                className='whitespace-nowrap pl-2 text-blue-950 lg:text-xl'
              >{`(${tourNights} ${getNights(tourNights)})`}</Typography>
            </div>
          </div>
        </div>
        <div className='flex flex-col justify-end md:mb-12 md:mr-[6px] lg:mr-[1px] lg:h-full lg:flex-col'>
          <Typography
            variant='h5'
            className='mb-1 self-center whitespace-nowrap text-blue-600 lg:mr-0 lg:text-blue-950'
          >
            {`${formatNumberToPriceInRub(Math.ceil(total_price || 0))}`}
          </Typography>
          <ButtonCustom
            variant='primary'
            size='s'
            type='submit'
            className='self-center px-[20px] py-[6px] md:px-[21px] md:py-[12px] lg:mb-[33px] lg:px-[32px] lg:py-5'
            style={{ gridArea: 'btnSubmit' }}
            onClick={handleBooking}
          >
            <Typography variant='l' className='lg:text-xl'>
              Бронировать
            </Typography>
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
