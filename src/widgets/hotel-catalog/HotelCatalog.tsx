'use client';
import React, { useMemo, useRef, useState } from 'react';

import { FilterAmenities } from '@/shared/filter-amenities';
import { FilterCity } from '@/shared/filter-city';
import { FilterPlaceType } from '@/shared/filter-place-type';
import { FilterPrice } from '@/shared/filter-price';
import { FilterRating } from '@/shared/filter-rating';
import { FilterRecreationType } from '@/shared/filter-recreation-type';
import { FilterStarCategory } from '@/shared/filter-star-category';
import { FilterTypeOfMeals } from '@/shared/filter-type-of-meals';
import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { hotels } from '@/temp/hotel-mock';

export function HotelCatalog() {
  {
    /* Отзывы*/
  }

  const [reviewStates, setReviewStates] = useState<{
    [hotelId: number]: { showAllReviews: boolean };
  }>(
    hotels.reduce((acc: { [key: number]: { showAllReviews: boolean } }, hotel) => {
      acc[hotel.id] = { showAllReviews: false };
      return acc;
    }, {}),
  );

  const reviewsContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const toggleReviews = (hotelId: number) => {
    setReviewStates((prevState) => {
      const newState = {
        ...prevState,
        [hotelId]: { showAllReviews: !prevState[hotelId].showAllReviews },
      };
      if (
        !newState[hotelId].showAllReviews &&
        reviewsContainerRefs.current[hotelId]
      ) {
        reviewsContainerRefs.current[hotelId]!.scrollTop = 0;
      }
      return newState;
    });
  };

  {
    /* Фильтры*/
  }

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [recreationType, setRecreationType] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([500, 20000]);
  const [rating, setRating] = useState<[number, number]>([1, 10]);
  const [starCategory, setStarCategory] = useState<number[]>([]);
  const [mealType, setMealType] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);

  const handleFiltersReset = () => {
    setSelectedCities([]);
    setRecreationType([]);
    setPlaceType([]);
    setPrice([500, 20000]);
    setRating([1, 10]);
    setStarCategory([]);
    setMealType([]);
    setAmenities([]);
  };

  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleToggleFilters = () => {
    setFiltersVisible((prevState) => !prevState);
  };

  const filterHotels = () => {
    return hotels.filter((hotel) => {
      return (
        (selectedCities.length === 0 || selectedCities.includes(hotel.city)) &&
        (recreationType.length === 0 ||
          recreationType.includes(hotel.type_of_rest)) &&
        (placeType.length === 0 || placeType.includes(hotel.place)) &&
        ((price[0] === 0 && price[1] === 0) ||
          hotel.rooms.some(
            (room) =>
              room.nightly_price >= price[0] && room.nightly_price <= price[1],
          )) &&
        ((rating[0] === 0 && rating[1] === 0) ||
          (hotel.user_rating >= rating[0] && hotel.user_rating <= rating[1])) &&
        (starCategory.length === 0 || starCategory.includes(hotel.star_category)) &&
        (mealType.length === 0 ||
          hotel.rooms.some((room) => mealType.includes(room.food.type_of_meals))) &&
        (amenities.length === 0 ||
          amenities.every((amenity) =>
            hotel.amenities.some((cat) => cat.amenity.includes(amenity)),
          ))
      );
    });
  };

  const filteredHotels = useMemo(filterHotels, [
    selectedCities,
    recreationType,
    placeType,
    price,
    rating,
    starCategory,
    mealType,
    amenities,
  ]);

  {
    /* Сортировка*/
  }

  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const sortedHotels = useMemo(() => {
    return [...filteredHotels].sort((a, b) =>
      sortOrder === 'asc'
        ? a.user_rating - b.user_rating
        : b.user_rating - a.user_rating,
    );
  }, [filteredHotels, sortOrder]);
  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <div className='hotel-catalog-page bg-gray-50 flex justify-center'>
      <div className='flex flex-col md:flex-row'>
        <aside
          className={`border-gray-200 w-full p-4 md:w-1/4 ${filtersVisible ? 'block' : 'hidden'} lg:block`}
        >
          <div className='hidden flex-wrap items-center justify-between bg-white p-4 shadow-md md:flex lg:flex-nowrap'>
            <Typography variant='h5' className='text-primary'>
              Фильтры
            </Typography>
            <button
              className='text-secondary hover:underline'
              onClick={handleFiltersReset}
            >
              Сбросить все
            </button>
          </div>

          <div className='filter-section mb-6'>
            <FilterCity
              selectedCities={selectedCities}
              onCityChange={setSelectedCities}
            />
            <FilterRecreationType
              selectedTypes={recreationType}
              onTypeChange={setRecreationType}
            />
            <FilterPlaceType
              selectedPlaceTypes={placeType}
              onPlaceTypeChange={setPlaceType}
            />
            <FilterPrice price={price} onPriceChange={setPrice} />
            <FilterRating rating={rating} onRatingChange={setRating} />
            <FilterStarCategory
              starCategory={starCategory}
              onStarCategoryChange={setStarCategory}
            />
            <FilterTypeOfMeals selectedMeals={mealType} onMealChange={setMealType} />
            <FilterAmenities
              selectedAmenities={amenities}
              onAmenitiesChange={setAmenities}
            />
          </div>
        </aside>

        {/* Мобильная версия фильтров*/}
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 bg-white p-4 shadow-lg md:hidden ${filtersVisible ? 'block' : 'hidden'} overflow-y-auto`}
        >
          <div className='filter-section mb-6'>
            <button
              className='text-secondary hover:underline'
              onClick={handleFiltersReset}
            >
              Сбросить все
            </button>
            <FilterCity
              selectedCities={selectedCities}
              onCityChange={setSelectedCities}
            />
            <FilterRecreationType
              selectedTypes={recreationType}
              onTypeChange={setRecreationType}
            />
            <FilterPlaceType
              selectedPlaceTypes={placeType}
              onPlaceTypeChange={setPlaceType}
            />
            <FilterPrice price={price} onPriceChange={setPrice} />
            <FilterRating rating={rating} onRatingChange={setRating} />
            <FilterStarCategory
              starCategory={starCategory}
              onStarCategoryChange={setStarCategory}
            />
            <FilterTypeOfMeals selectedMeals={mealType} onMealChange={setMealType} />
            <FilterAmenities
              selectedAmenities={amenities}
              onAmenitiesChange={setAmenities}
            />
          </div>
          <button
            className='text-secondary hover:underline'
            onClick={handleFiltersReset}
          >
            Сбросить все
          </button>
          <button
            className='text-secondary absolute right-4 top-4'
            onClick={handleToggleFilters}
          >
            <SvgSprite name='cross' width={20} />
          </button>
        </div>

        <main className='mx-auto w-full max-w-md p-4 md:max-w-xl lg:w-3/4 lg:max-w-none'>
          <div className='mb-4 flex md:hidden'>
            <button className='text-primary ml-auto flex w-20 justify-center gap-1 rounded-xl bg-blue-50 px-2 py-1 font-medium'>
              <SvgSprite name='map' width={20} />
              <Typography variant='s'>Карта</Typography>
            </button>
          </div>

          <div className='view-options mb-4 flex items-center justify-between'>
            <div className='hidden gap-4 lg:flex'>
              <button className='text-primary flex gap-1 font-medium'>
                <SvgSprite name='list' width={20} color='blue' />
                <Typography variant='s'>Список</Typography>
              </button>
              <button className='text-primary flex gap-1 font-medium'>
                <SvgSprite name='map' width={20} />
                <Typography variant='s'>Карта</Typography>
              </button>
            </div>
            <button
              className='text-primary flex gap-1 font-medium'
              onClick={toggleSortOrder}
            >
              <Typography variant='s'>По популярности</Typography>
              <SvgSprite name='sort' width={20} />
            </button>

            <button
              className='text-primary flex gap-1 font-medium lg:hidden'
              onClick={handleToggleFilters}
            >
              <Typography variant='s'>Фильтры</Typography>
              <SvgSprite name='filter' width={20} />
            </button>
          </div>

          <div className='hotels-list grid gap-6 md:grid-cols-1'>
            {filteredHotels.length > 0 ? (
              <>
                {sortedHotels.map((hotel, index) => (
                  <div key={hotel.id}>
                    <div
                      key={`hotel-${hotel.id}`}
                      className='hotel-card relative flex flex-col rounded-lg bg-white shadow-xl md:flex-row'
                    >
                      <div className='hotel-image relative z-0 mb-4 w-full overflow-hidden md:mb-0 md:mr-4 md:w-2/5'>
                        <button className='absolute right-2 top-2 z-10 rounded-full bg-blue-50 p-3 lg:hidden'>
                          <SvgSprite name='heart-outline' width={15} />
                        </button>
                        <HotelComponentPhotoSlider hotel={hotel} />
                      </div>

                      <div className='hotel-info relative z-10 w-full rounded-lg p-4 md:ml-[-16px] md:w-3/5'>
                        {/* Рейтинг и информация */}
                        <div className='mb-2 flex gap-2'>
                          <Rating category={hotel.star_category} />
                          {/* Кнопка "Показать отзывы" */}
                          {hotel.reviews && hotel.reviews.length > 0 && (
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
                          )}

                          <div className='flex items-center gap-2'>
                            <Typography
                              variant='l'
                              className='rounded-lg bg-green-300 px-2 py-1 text-xs font-medium text-grey-950 md:px-3 md:py-2 md:text-sm'
                            >
                              {hotel.user_rating}
                            </Typography>
                            <button className='hidden rounded-full bg-blue-50 p-3 lg:flex'>
                              <SvgSprite name='heart-outline' width={30} />
                            </button>
                          </div>
                        </div>

                        <div className='relative mb-2 flex flex-col flex-wrap gap-2'>
                          <Typography
                            variant='h4'
                            className='mb-2 text-xs md:text-lg'
                          >
                            {hotel.name}
                          </Typography>
                          <Typography variant='l' className='mb-2 text-xs'>
                            {hotel.city}
                          </Typography>
                        </div>

                        {/* Удобства */}
                        <div className='hotel-amenities mb-2 flex flex-nowrap gap-2'>
                          {hotel.amenities[0]?.amenity
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
                        <div className='hotel-price mt-4 flex items-center justify-between rounded-xl bg-blue-50'>
                          <Typography
                            variant='l-bold'
                            className='mb-2 text-xs md:text-lg'
                          >
                            Питание: {hotel.rooms[0]?.food.type_of_meals}
                          </Typography>
                          <Typography
                            variant='h4'
                            className='text-xs text-blue-600 md:text-lg'
                          >
                            {hotel.rooms[0].nightly_price} ₽
                          </Typography>
                        </div>

                        {/* Отзывы */}
                        <div className='mt-4 flex flex-col'>
                          <div
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
                                  className='text-gray-500 mb-2'
                                >
                                  {review.date}
                                </Typography>
                                <Typography
                                  variant='s'
                                  className='text-gray-700 mb-2'
                                >
                                  {review.text}
                                </Typography>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Блок с объявлениями */}
                    {index === Math.floor(sortedHotels.length / 2) && (
                      <div
                        className='announcement-block relative mt-6 flex flex-row items-center justify-between px-6 py-6 md:pr-0'
                        key='announcement'
                      >
                        <div className='announcement-block-backgorund absolute inset-0 z-0 rounded-xl bg-blue-50 md:bottom-6 md:top-6 lg:top-12'></div>

                        <div className='z-10 flex flex-col items-center justify-center gap-2 rounded-xl text-center md:items-start md:text-left'>
                          <Typography variant='h4' className='text-lg text-blue-950'>
                            Скидка на 10% на первую поездку
                          </Typography>
                          <ButtonCustom
                            type='button'
                            variant='primary'
                            size='s'
                            className='w-full text-sm font-bold text-green-950 md:w-auto md:border-blue-600 md:bg-blue-600 md:text-white md:hover:border-blue-200 md:hover:bg-blue-200 md:active:border-blue-500 md:active:bg-blue-500'
                          >
                            Узнать подробнее
                          </ButtonCustom>
                        </div>

                        <div className='z-10 hidden w-1/2 justify-end md:flex'>
                          <img
                            src='famous-tourists-sights.png'
                            alt='famous-tourists-sights'
                            className='h-auto max-w-full object-contain'
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </>
            ) : (
              <div className='flex w-auto items-center justify-center'>
                <Typography variant='h4'>
                  Отелей по выбранным критериям не найдено.
                </Typography>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
