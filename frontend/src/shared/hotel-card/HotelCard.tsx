import React from 'react';

import { useGetRoomsByHotelIdQuery } from '@/servicesApi/roomsApi';
import { IHotelMiniData } from '@/types/hotel';
import { ITour } from '@/types/tour';

import { IHotelCard } from './HotelCard.types';
import { HotelComponentPhotoSlider } from '../hotel-component-photo-slider';
import { Rating } from '../rating';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';

export function HotelCard({ isTour, tab, handleRouting, item }: IHotelCard) {
  const hotel = isTour ? (item as ITour).hotel : (item as IHotelMiniData);
  const { data: rooms } = useGetRoomsByHotelIdQuery(hotel.id);

  return (
    <div className='hotel-card relative flex flex-col rounded-lg bg-white text-blue-950 shadow-xl md:flex-row'>
      <div className='hotel-image relative z-0 mb-4 w-full overflow-hidden md:mb-0 md:mr-4 md:w-2/5'>
        <button className='absolute right-2 top-2 z-10 rounded-full bg-blue-50 p-3 lg:hidden'>
          <SvgSprite name='heart-outline' width={15} />
        </button>
        <HotelComponentPhotoSlider photos={hotel.photo} />
      </div>

      <div
        onClick={() => {
          handleRouting({
            tourId: isTour ? item.id : null,
            hotelId: hotel.id,
            hotelName: hotel.name,
            hotelCountry: hotel.country,
            tab: tab ?? 'Отели',
          });
          console.log('Clicked tour ID:', item.id);
        }}
        style={{ cursor: 'pointer' }}
        className='hotel-info relative z-10 w-full rounded-lg p-4 md:ml-[-16px] md:w-3/5'
      >
        {/* Рейтинг и информация */}
        <div className='mb-2 flex gap-2'>
          <Rating category={hotel.star_category} starSize={16} gap={1} />
          {/* Кнопка "Показать отзывы" */}
          {/* {hotel.reviews && hotel.reviews.length > 0 && (
                                    <div className='group ml-auto flex items-center justify-end gap-0.5'>
                                      <button
                                        className='flex items-center gap-1 text-blue-600 hover:underline'
                                        onClick={() => toggleReviews(hotel.id)}
                                      >
                                        <Typography
                                          variant='m'
                                          className='text-xs md:text-base'
                                        >
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
          <Typography variant='h4' className='mb-2 text-[16px] md:text-lg'>
            {hotel.name}
          </Typography>
          <Typography variant='l' className='mb-2 text-xs md:text-sm'>
            {hotel.city}
          </Typography>
        </div>

        {/* Удобства */}
        {hotel.amenities_common && hotel.amenities_common.length > 0 && (
          <div className='hotel-amenities mb-2 flex flex-nowrap gap-2'>
            {hotel.amenities_common.slice(0, 3).map((amenity, amenityIndex) => (
              <Typography
                key={`amenity-${amenityIndex}`}
                variant='l-bold'
                className='rounded-xl bg-blue-50 px-2 py-1 text-xs md:text-lg'
              >
                {amenity}
              </Typography>
            ))}
          </div>
        )}
        {/* Туроператор */}
        {isTour && (
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center'>
              <SvgSprite name='airplane' width={24} className='mr-3' />
              <Typography variant='m'>Прямой регулярный рейс</Typography>
            </div>

            <Typography variant='m'>
              Туроператор: {(item as ITour).tour_operator}
            </Typography>
          </div>
        )}

        {/* Цена */}
        <div className='hotel-price flex items-center justify-between rounded-xl bg-blue-50 p-2'>
          <div className='flex items-center'>
            <SvgSprite name='eat' width={24} className='mr-3' />
            <Typography variant='m-bold'>
              {isTour
                ? (item as ITour).type_of_meals?.[0]?.name || 'Без питания'
                : 'Без питания'}
            </Typography>
          </div>

          {isTour ? (
            <Typography
              variant='h4'
              className='text-[16px] text-blue-600 md:text-lg'
            >
              {(item as ITour).total_price
                ? `${(item as ITour).total_price} ₽`
                : 'Цена не указана'}
            </Typography>
          ) : (
            rooms &&
            rooms.some((room) => Array.isArray(room.calendar_dates)) && (
              <Typography
                variant='h4'
                className='text-[16px] text-blue-600 md:text-lg'
              >
                {rooms[0].calendar_dates?.[0]?.price
                  ? `${rooms[0].calendar_dates[0].price} ₽`
                  : 'Цена не указана'}
              </Typography>
            )
          )}
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
                                      <div
                                        key={`review-${review.id}`}
                                        className='mb-4 border-b pb-4'
                                      >
                                        <div className='mb-2 flex items-center gap-3'>
                                          <img
                                            src={review.userPhoto}
                                            alt={review.username}
                                            className='h-8 w-8 rounded-full'
                                          />
                                          <div>
                                            <Typography
                                              variant='s'
                                              className='font-semibold'
                                            >
                                              {review.username}
                                            </Typography>
                                          </div>
                                          <div className='ml-auto rounded-lg bg-green-300 px-2 py-1 text-sm font-medium md:px-3 md:py-2'>
                                            {review.rating}
                                          </div>
                                        </div>
                                        <Typography
                                          variant='xs'
                                          className='mb-2 mr-2 text-blue-950'
                                        >
                                          {review.date}
                                        </Typography>
                                        <Typography
                                          variant='s'
                                          className='mb-2 text-blue-950'
                                        >
                                          {review.text}
                                        </Typography>
                                      </div>
                                    ))} 
                                  </div>*/}
        </div>
      </div>
    </div>
  );
}
