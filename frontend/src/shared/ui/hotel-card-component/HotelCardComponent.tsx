import { useRouter } from 'next/navigation';

import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';
import { Rating } from '@/shared/rating';
import { extractNumber } from '@/shared/utils/extractNumber';
import { getCurrentDistance } from '@/shared/utils/getCurrentDistance';

import { SvgSprite } from '../svg-sprite';
import { Typography } from '../typography';
import { IHotelCardComponent } from './HotelCardComponent.types';

export function HotelCardComponent({
  hotel,
  tab,
  filteredRoom,
  searchProps,
}: IHotelCardComponent) {
  const router = useRouter();

  const handleRouting = (
    hotelId: number,
    hotelName: string,
    hotelCountry: string,
    tab: string,
  ) => {
    const encodedName = encodeURIComponent(hotelName);
    const encodedId = encodeURIComponent(hotelId);
    const encodedCountry = encodeURIComponent(hotelCountry);
    const encodedType = encodeURIComponent(tab);

    if (tab === 'Туры') {
      router.push(
        `/tour-page?type${encodedType}&hotelId=${encodedId}&hotelName=${encodedName}&arrivalCountry=${encodedCountry}`,
      );
    } else {
      router.push(
        `/hotel-page?type${encodedType}&hotelId=${encodedId}&hotelName=${encodedName}&arrivalCountry=${encodedCountry}`,
      );
    }
  };

  const meals = (
    typeof filteredRoom.type_of_meals === 'string'
      ? JSON.parse(filteredRoom.type_of_meals)
      : filteredRoom.type_of_meals
  )
    .map((meal: { name: string }) => meal.name)
    .join(', ');

  return (
    <div className='rounded-[20px] bg-white lg:max-w-[899px]'>
      <div className='w-full rounded-[20px] md:flex md:shadow-lg'>
        <div className='relative h-[216px] overflow-hidden rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 xs:h-auto md:h-auto md:w-[80%] md:rounded-bl-[20px] md:rounded-tl-[20px] md:rounded-tr-none lg:min-w-[340px]'>
          <HotelComponentPhotoSlider hotel={hotel} />
        </div>

        <div
          className='z-2 relative mt-[-49px] cursor-pointer rounded-[20px] bg-white px-4 py-4 shadow-lg md:ml-[-15px] md:mt-0 md:w-full md:border-t-2 md:border-grey-100 md:px-6 md:py-4 lg:pb-4'
          onClick={() => handleRouting(hotel.id, hotel.name, hotel.country, tab)}
        >
          <div className='mb-4 flex justify-between md:mb-3 lg:mb-4'>
            <div>
              <div className='mb-1 md:mb-2'>
                <Rating category={hotel.star_category} starSize={16} gap={2} />
              </div>
              <Typography
                variant='m-bold'
                className='block md:mb-3 md:text-[20px] lg:mb-3'
              >
                {hotel.name}
              </Typography>
              <Typography
                variant='m'
                className='hidden text-blue-950 md:mb-2 md:block lg:mb-1'
              >
                {hotel.city}
              </Typography>
              <Typography
                variant='s'
                className='mb-1 block text-grey-700 md:mb-0 md:text-[16px]'
              >
                {hotel.distance_to_the_center &&
                  `${getCurrentDistance(hotel.distance_to_the_center)} от центра`}
              </Typography>
              <Typography variant='s' className='block text-grey-700 md:text-[16px]'>
                {hotel.distance_to_the_metro &&
                  `${getCurrentDistance(hotel.distance_to_the_metro)} от метро`}
              </Typography>
            </div>
            <div className='md:flex md:max-h-[44px] md:items-center md:gap-3'>
              <a
                href='#'
                className='hidden text-blue-700 transition-colors hover:text-blue-400 focus:text-blue-400 focus:outline-none focus-visible:text-blue-400 focus-visible:outline-none active:text-blue-900 md:block'
              >
                <Typography variant='m' className=''>
                  23 отзыва
                </Typography>
              </a>
              <div className='flex h-[44px] items-center justify-center rounded-[8px] bg-[#C7F85E] px-3'>
                <Typography variant='m-bold'>{hotel.user_rating}</Typography>
              </div>
              <div
                className='hidden h-12 w-12 items-center justify-center rounded-full bg-blue-50 md:flex'
                onClick={(e) => e.stopPropagation()}
              >
                <SvgSprite name='heart-outline' width={24} height={24} />
              </div>
            </div>
          </div>

          {/* Удобства */}
          <div className='hidden md:mb-5 md:flex md:gap-2 lg:mb-4'>
            {filteredRoom.amenities_common
              .slice(0, 3)
              .map((amenity, amenityIndex) => (
                <div
                  key={`amenity-${amenityIndex}`}
                  className='flex items-center justify-between rounded-xl bg-grey-50 px-3 py-2'
                >
                  <Typography variant='m'>{amenity}</Typography>
                </div>
              ))}
          </div>

          {/* Блок с ценой */}
          <div className='flex rounded-lg bg-blue-50 px-3 py-1 md:px-4 md:py-3 md:pr-6 lg:pb-2'>
            <div className='mr-auto'>
              <Typography variant='s' className='block text-blue-950'>
                Питание: {meals}
              </Typography>
              <Typography variant='s' className='block text-blue-950'>
                Удобства на&nbsp;этаже
              </Typography>
            </div>
            {/* Цена */}
            <div className='mt-2'>
              <Typography
                variant='m-bold'
                className='block text-blue-600 md:text-[20px] lg:mb-1'
              >
                {/* {filteredRoom.price * extractNumber(searchProps.nights)} ₽ */}
              </Typography>
              <Typography variant='s' className='block text-grey-700'>
                {extractNumber(searchProps.nights) || 7}{' '}
                {extractNumber(searchProps.nights) === 1
                  ? 'ночь'
                  : extractNumber(searchProps.nights) >= 2 &&
                      extractNumber(searchProps.nights) <= 4
                    ? 'ночи'
                    : 'ночей'}{' '}
                {filteredRoom.number_of_adults}{' '}
                {filteredRoom.number_of_adults === 1
                  ? 'гость'
                  : filteredRoom.number_of_adults >= 2 &&
                      filteredRoom.number_of_adults <= 4
                    ? 'гостя'
                    : 'гостей'}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
