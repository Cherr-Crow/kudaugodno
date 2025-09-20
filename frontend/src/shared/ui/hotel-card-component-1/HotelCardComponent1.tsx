import { useRouter } from 'next/navigation';

import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';
import { Rating } from '@/shared/rating';
import { extractNumber } from '@/shared/utils/extractNumber';

import { SvgSprite } from '../svg-sprite';
import { Typography } from '../typography';
import { IHotelCardComponent1 } from './HotelCardComponent1.types';

export function HotelCardComponent1({
  hotel,
  tab,
  filteredRoom,
  searchProps,
}: IHotelCardComponent1) {
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

  return (
    <div key={hotel.tourInfo ? `tour-${hotel.tourInfo.id}` : `hotel-${hotel.id}`}>
      <div
        key={`hotel-${hotel.id}`}
        className='hotel-card relative flex flex-col rounded-lg bg-white text-blue-950 shadow-xl md:flex-row'
      >
        <div className='hotel-image relative z-0 mb-4 w-full overflow-hidden rounded-bl-3xl rounded-tl-3xl md:mb-0 md:mr-4 md:w-2/5'>
          <button className='absolute right-2 top-2 z-10 rounded-full bg-blue-50 p-3 lg:hidden'>
            <SvgSprite name='heart-outline' width={15} />
          </button>
          <HotelComponentPhotoSlider hotel={hotel} />
        </div>

        <div
          onClick={() => handleRouting(hotel.id, hotel.name, hotel.country, tab)}
          style={{ cursor: 'pointer' }}
          className='hotel-info relative z-10 w-full rounded-lg bg-white p-4 md:ml-[-26px] md:w-3/5 md:rounded-3xl md:shadow-xl'
        >
          {/* Рейтинг и информация */}
          <div className='mb-2 flex justify-between gap-2'>
            <Rating category={hotel.star_category} starSize={16} gap={1} />
            {/* Кнопка "Показать отзывы" */}
            {/* {hotel.reviews && hotel.reviews.length > 0 && (
              <div className='group ml-auto flex items-center justify-end gap-0.5'>
                <button
                  className='flex items-center gap-1 text-blue-600 hover:underline'
                  onClick={() => toggleReviews(hotel.id)}
                >
                  <Typography variant='m' className='text-xs md:text-base'>
                    {reviewStates[hotel.id]?.showAllReviews
                      ? 'Скрыть отзывы'
                      : `Еще ${hotel.reviews.length} отзывов`}
                  </Typography>
                </button>
              </div>
            )} */}

            <div className='flex items-center gap-2'>
              <Typography
                variant='l'
                className='rounded-lg bg-green-300 px-2 py-2 text-[16px] font-medium text-grey-950 md:px-3 md:py-2 md:text-sm'
              >
                {hotel.user_rating}
              </Typography>
              <button className='hidden rounded-full bg-blue-50 p-3 lg:flex'>
                <SvgSprite name='heart-outline' width={30} />
              </button>
            </div>
          </div>

          <div className='relative mb-2 flex flex-col flex-wrap gap-2'>
            <Typography variant='h4' className='text-[16px] md:text-lg'>
              {hotel.name}
            </Typography>
            <Typography variant='l' className='text-xs md:text-sm'>
              {hotel.city}
            </Typography>
            <Typography variant='l' className='text-xs text-grey-700 md:text-sm'>
              {hotel.distance_to_the_center != null &&
                `${(hotel.distance_to_the_center / 1000).toFixed(1)} км до центра`}
            </Typography>
            <Typography variant='l' className='text-xs text-grey-700 md:text-sm'>
              {hotel.distance_to_the_metro != null &&
                `${(hotel.distance_to_the_metro / 1000).toFixed(1)} км до центра`}
            </Typography>
          </div>

          {/* Удобства */}
          <div className='hotel-amenities mb-2 flex flex-nowrap gap-2'>
            {filteredRoom.amenities_common
              .slice(0, 3)
              .map((amenity, amenityIndex) => (
                <Typography
                  key={`amenity-${amenityIndex}`}
                  variant='l-bold'
                  className='rounded-xl bg-blue-50 px-2 py-1 text-xs md:text-lg'
                >
                  {amenity}
                </Typography>
              ))}
          </div>

          {/* Цена */}
          <div className='hotel-price flex items-center justify-between rounded-xl bg-blue-50 p-2'>
            <Typography variant='l-bold' className='mb-2 text-xs'>
              Питание:{' '}
              {filteredRoom.type_of_meals
                .replace(/^\[|\]$/g, '')
                .split(',')
                .map((m) => m.replace(/['"]/g, '').trim())
                .join(', ')}
            </Typography>
            <div className='flex flex-col gap-1'>
              <Typography
                variant='h4'
                className='text-[16px] text-blue-600 md:text-lg'
              >
                {filteredRoom.price * extractNumber(searchProps.nights)} ₽
              </Typography>
              <Typography className='flex flex-row gap-1 text-[13px] text-grey-700'>
                <Typography>
                  {extractNumber(searchProps.nights) || 7}{' '}
                  {extractNumber(searchProps.nights) === 1
                    ? 'ночь'
                    : extractNumber(searchProps.nights) >= 2 &&
                        extractNumber(searchProps.nights) <= 4
                      ? 'ночи'
                      : 'ночей'}
                </Typography>
                <Typography>
                  {filteredRoom.number_of_adults}{' '}
                  {filteredRoom.number_of_adults === 1
                    ? 'гость'
                    : filteredRoom.number_of_adults >= 2 &&
                        filteredRoom.number_of_adults <= 4
                      ? 'гостя'
                      : 'гостей'}
                </Typography>
              </Typography>
            </div>
          </div>

          {/* Отзывы */}
          <div className='mt-4 flex flex-col'>
            {/* <div
              ref={(el) => {
                reviewsContainerRefs.current[hotel.id] = el;
              }}
              className={`transition-max-height overflow-hidden duration-300 ${reviewStates[hotel.id]?.showAllReviews ? 'max-h-[220px] overflow-y-scroll' : 'max-h-0'}`}
            >
              {hotel.reviews.map((review) => (
                <div key={`review-${review.id}`} className='mb-4 border-b pb-4'>
                  <div className='mb-2 flex items-center gap-3'>
                    <img
                      src={review.userPhoto}
                      alt={review.username}
                      className='h-8 w-8 rounded-full'
                    />
                    <div>
                      <Typography variant='s' className='font-semibold'>
                        {review.username}
                      </Typography>
                    </div>
                    <div className='ml-auto rounded-lg bg-green-300 px-2 py-1 text-sm font-medium md:px-3 md:py-2'>
                      {review.rating}
                    </div>
                  </div>
                  <Typography variant='xs' className='mb-2 mr-2 text-blue-950'>
                    {review.date}
                  </Typography>
                  <Typography variant='s' className='mb-2 text-blue-950'>
                    {review.text}
                  </Typography>
                </div>
              ))}
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
