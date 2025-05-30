/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { FilterAirportDistance } from '@/shared/filter-airport-distance';
import { FilterAmenities } from '@/shared/filter-amenities';
import { FilterCity } from '@/shared/filter-city';
import { FilterPlaceType } from '@/shared/filter-place-type';
import { FilterPrice } from '@/shared/filter-price';
import { FilterRating } from '@/shared/filter-rating';
import { FilterRecreationType } from '@/shared/filter-recreation-type';
import { FilterStarCategory } from '@/shared/filter-star-category';
import { FilterTourOperator } from '@/shared/filter-tour-operator';
import { FilterTypeOfMeals } from '@/shared/filter-type-of-meals';
import { HotelComponentMap } from '@/shared/hotel-component-map';
import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';
import { Rating } from '@/shared/rating';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SearchBlock } from '@/shared/ui/search-block';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { getDateNow } from '@/shared/utils/getDateNow';
import { useSearchBlockState } from '@/shared/utils/useSearchBlockState';
import { IHotel } from '@/types/hotel';

type HotelCatalogProps = {
  hotels: IHotel[];
  initialTab: 'Туры' | 'Отели';
};

export function HotelCatalog({ initialTab, hotels }: HotelCatalogProps) {
  {
    /* Отзывы*/
  }

  // const [reviewStates, setReviewStates] = useState<{
  //   [hotelId: number]: { showAllReviews: boolean };
  // }>(
  //   hotels.reduce((acc: { [key: number]: { showAllReviews: boolean } }, hotel) => {
  //     acc[hotel.id] = { showAllReviews: false };
  //     return acc;
  //   }, {}),
  // );

  // const reviewsContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  // const toggleReviews = (hotelId: number) => {
  //   setReviewStates((prevState) => {
  //     const newState = {
  //       ...prevState,
  //       [hotelId]: { showAllReviews: !prevState[hotelId].showAllReviews },
  //     };
  //     if (
  //       !newState[hotelId].showAllReviews &&
  //       reviewsContainerRefs.current[hotelId]
  //     ) {
  //       reviewsContainerRefs.current[hotelId]!.scrollTop = 0;
  //     }
  //     return newState;
  //   });
  // };

  {
    /* Фильтры*/
  }

  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [recreationType, setRecreationType] = useState<string[]>([]);
  const [placeType, setPlaceType] = useState<string[]>([]);
  const [price, setPrice] = useState<[number, number]>([1000, 1000000]);
  const [rating, setRating] = useState<[number, number]>([1, 10]);
  const [starCategory, setStarCategory] = useState<number[]>([]);
  const [mealType, setMealType] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [airportDistance, setAirportDistance] = useState<string>('Любое');
  const [tourOperators, setTourOperators] = useState<string[]>([]);

  const [appliedFilters, setAppliedFilters] = useState({
    selectedCities: [] as string[],
    recreationType: [] as string[],
    placeType: [] as string[],
    price: [1000, 1000000] as [number, number],
    rating: [1, 10] as [number, number],
    starCategory: [] as number[],
    mealType: [] as string[],
    amenities: [] as string[],
    airportDistance: 'Любое',
    tourOperators: [] as string[],
  });

  const [tab, setTab] = useState<'Туры' | 'Отели'>(initialTab);

  // Load data to filter from URL

  const searchParams = useSearchParams();

  // Инициализация компонента стейтов для SearchTour
  const searchState = useSearchBlockState({
    defaultCheckInDate: `${getDateNow(+5)}`,
    defaultNights: '7 ночей',
    defaultGuests: '2 гостя',
  });
  const { updateUrlParams, ...searchProps } = searchState;

  // Обновление URL
  useEffect(() => {
    updateUrlParams(router);
  }, [
    searchProps.departureCity,
    searchProps.where,
    searchProps.checkInDate,
    searchProps.checkOutDate,
    searchProps.nights,
    searchProps.guests,
  ]);

  useEffect(() => {
    const selectedCitiesParam = searchParams.get('where');
    if (selectedCitiesParam) {
      setSelectedCities(selectedCitiesParam.split(','));
    } else {
      setSelectedCities([]);
    }
  }, [searchParams]);

  // // Load tours from hotelIds
  // const hotelIds = hotels?.map((hotel) => hotel.id) || [];
  // const { data: tours } = useGetToursByHotelsQuery({
  //   hotelIds,
  //   limit: 10,
  //   offset: 0,
  // });

  // Filters visibility

  const [filtersVisible, setFiltersVisible] = useState(false);

  const handleToggleFilters = () => {
    setFiltersVisible((prevState) => !prevState);
  };

  // Filters reset

  const handleFiltersReset = () => {
    setSelectedCities([]);
    setRecreationType([]);
    setPlaceType([]);
    setPrice([1000, 1000000]);
    setRating([1, 10]);
    setStarCategory([]);
    setMealType([]);
    setAmenities([]);
    setAirportDistance('Любое');
    setTourOperators([]);
  };

  useEffect(() => {
    if (
      selectedCities.length === 0 &&
      recreationType.length === 0 &&
      placeType.length === 0 &&
      price[0] === 1000 &&
      price[1] === 1000000 &&
      rating[0] === 1 &&
      rating[1] === 10 &&
      starCategory.length === 0 &&
      mealType.length === 0 &&
      amenities.length === 0 &&
      airportDistance === 'Любое' &&
      tourOperators.length === 0
    ) {
      handleApplyFilters();
    }
  }, [
    selectedCities,
    recreationType,
    placeType,
    price,
    rating,
    starCategory,
    mealType,
    amenities,
    airportDistance,
    tourOperators,
  ]);

  //Filtering hotels

  const filterHotels = () =>
    hotels.filter((hotel) => {
      const {
        selectedCities,
        recreationType,
        placeType,
        price,
        rating,
        starCategory,
        mealType,
        amenities,
        airportDistance,
      } = appliedFilters;

      const isWithinAirportDistance =
        airportDistance === 'Любое' ||
        (hotel.distance_to_the_airport !== null &&
          ((airportDistance === 'До 15 км' &&
            hotel.distance_to_the_airport <= 15000) ||
            (airportDistance === 'До 50 км' &&
              hotel.distance_to_the_airport <= 50000) ||
            (airportDistance === 'До 75 км' &&
              hotel.distance_to_the_airport <= 75000) ||
            (airportDistance === 'До 100 км' &&
              hotel.distance_to_the_airport <= 100000)));

      const isWithinPriceRange =
        // (price[0] !== 0 || price[1] !== 0) &&
        // hotel.rooms.some((room) => room.price >= price[0] && room.price <= price[1]);
        (price[0] !== 0 || price[1] !== 0) &&
        hotel.rooms.some(
          (room) =>
            Array.isArray(room.dates) &&
            room.dates.length > 0 &&
            typeof room.dates[0].price === 'number' &&
            room.dates[0].price >= price[0] &&
            room.dates[0].price <= price[1],
        );

      const isCitySelected =
        selectedCities.length === 0 || selectedCities.includes(hotel.city);

      const isRecreationTypeSelected =
        recreationType.length === 0 || recreationType.includes(hotel.type_of_rest);

      const isPlaceTypeSelected =
        placeType.length === 0 || placeType.includes(hotel.place);

      const isWithinRatingRange =
        (rating[0] === 0 && rating[1] === 0) ||
        (hotel.user_rating >= rating[0] && hotel.user_rating <= rating[1]);

      const isStarCategorySelected =
        starCategory.length === 0 || starCategory.includes(hotel.star_category);

      const isMealTypeSelected =
        mealType.length === 0 ||
        // hotel.rooms.some((room) => mealType.includes(room.type_of_meals[0].name));
        hotel.rooms.some((room) =>
          room.type_of_meals.some((meal) => mealType.includes(meal.name)),
        );

      const isAmenitiesSelected =
        amenities.length === 0 ||
        amenities.every((amenity) =>
          hotel.amenities_common.some((cat) => cat.includes(amenity)),
        );

      const isGuestsSelected =
        searchProps.guests === 'Гостей' ||
        searchProps.guests === undefined ||
        hotel.rooms.some((room) => {
          const totalGuests =
            (room.number_of_adults || 0) + (room.number_of_children || 0);
          const guestsNumber =
            searchProps.guests === 'Любое'
              ? 0
              : parseInt(searchProps.guests || '0', 10);
          return totalGuests >= guestsNumber;
        });

      // const isNightsSelected =
      //   searchProps.nights === null ||
      //   (tours || []).some((tour) => {
      //     const start = new Date(tour.start_date);
      //     const end = new Date(tour.end_date);
      //     const tourNights = Math.ceil(
      //       (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24),
      //     );
      //     return tourNights === Number(searchProps.nights);
      //   });

      return (
        isWithinAirportDistance &&
        isCitySelected &&
        isRecreationTypeSelected &&
        isPlaceTypeSelected &&
        isWithinPriceRange &&
        isWithinRatingRange &&
        isStarCategorySelected &&
        isMealTypeSelected &&
        isAmenitiesSelected &&
        isGuestsSelected
        // && isNightsSelected
      );
    });

  const filteredHotels = useMemo(() => filterHotels(), [hotels, appliedFilters]);

  const handleApplyFilters = () => {
    setAppliedFilters({
      selectedCities,
      recreationType,
      placeType,
      price,
      rating,
      starCategory,
      mealType,
      amenities,
      airportDistance,
      tourOperators,
    });
  };

  // Filter Component

  const filterComponents = useMemo(() => {
    const allFilters = [
      {
        component: (
          <FilterCity
            key='city'
            selectedCities={selectedCities}
            onCityChange={setSelectedCities}
          />
        ),
        isActive: appliedFilters.selectedCities.length > 0,
      },
      {
        component: (
          <FilterRecreationType
            key='recreation'
            selectedTypes={recreationType}
            onTypeChange={setRecreationType}
          />
        ),
        isActive: appliedFilters.recreationType.length > 0,
      },
      {
        component: (
          <FilterPlaceType
            key='place'
            selectedPlaceTypes={placeType}
            onPlaceTypeChange={setPlaceType}
          />
        ),
        isActive: appliedFilters.placeType.length > 0,
      },
      {
        component: (
          <FilterPrice key='price' price={price} onPriceChange={setPrice} />
        ),
        isActive:
          appliedFilters.price[0] !== 1000 || appliedFilters.price[1] !== 1000000,
      },
      {
        component: (
          <FilterRating key='rating' rating={rating} onRatingChange={setRating} />
        ),
        isActive: appliedFilters.rating[0] !== 1 || appliedFilters.rating[1] !== 10,
      },
      {
        component: (
          <FilterStarCategory
            key='star'
            starCategory={starCategory}
            onStarCategoryChange={setStarCategory}
          />
        ),
        isActive: appliedFilters.starCategory.length > 0,
      },
      {
        component: (
          <FilterTypeOfMeals
            key='meals'
            selectedMeals={mealType}
            onMealChange={setMealType}
          />
        ),
        isActive: appliedFilters.mealType.length > 0,
      },
      {
        component: (
          <FilterAmenities
            key='amenities'
            selectedAmenities={amenities}
            onAmenitiesChange={setAmenities}
          />
        ),
        isActive: appliedFilters.amenities.length > 0,
      },
      {
        component: (
          <FilterAirportDistance
            key='airport'
            selectedDistance={airportDistance}
            onDistanceChange={setAirportDistance}
          />
        ),
        isActive: appliedFilters.airportDistance !== 'Любое',
      },
      ...(tab === 'Туры'
        ? [
            {
              component: (
                <FilterTourOperator
                  key='operator'
                  selectedOperators={tourOperators}
                  onOperatorsChange={setTourOperators}
                />
              ),
              isActive: appliedFilters.tourOperators.length > 0,
            },
          ]
        : []),
    ];

    return allFilters.sort((a, b) =>
      a.isActive === b.isActive ? 0 : a.isActive ? -1 : 1,
    );
  }, [
    selectedCities,
    recreationType,
    placeType,
    price,
    rating,
    starCategory,
    mealType,
    amenities,
    airportDistance,
    tourOperators,
    tab,
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
  }, [filteredHotels, sortOrder, tab]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  {
    /* Карта*/
  }

  const [isMapVisible, setIsMapVisible] = useState(false);

  {
    /* Роутинг*/
  }

  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  if (!isClient) {
    return null;
  }

  {
    /* Компонент каталога*/
  }

  return (
    <div className='hotel-catalog-page container flex flex-col justify-center'>
      <div
        className={`mb-[10px] flex w-full rounded-bl-[20px] rounded-br-[20px] bg-blue-600 p-10 md:h-[90%] md:rounded-bl-[100px] md:rounded-br-[100px]`}
      >
        {searchProps.isInitialized && (
          <SearchBlock tab={tab} setTab={setTab} {...searchProps} />
        )}
      </div>
      <div className='flex w-full flex-col md:flex-row'>
        <aside
          className={`w-full p-4 md:w-1/4 ${filtersVisible ? 'block' : 'hidden'} lg:block`}
        >
          <div className='filter-section mb-6 flex flex-col gap-1'>
            <div className='hidden flex-wrap items-center justify-between bg-white px-4 text-blue-950 md:flex lg:flex-nowrap'>
              <Typography variant='h5'>Фильтры</Typography>
              <button className='hover:underline' onClick={handleFiltersReset}>
                Сбросить все
              </button>
            </div>
            {filterComponents.map((f) => (
              <div key={f.component.key}>{f.component}</div>
            ))}
            <div className='mt-2 flex w-full justify-center'>
              <ButtonCustom
                className='w-full'
                onClick={handleApplyFilters}
                variant={'primary'}
                size={'s'}
              >
                Найти
              </ButtonCustom>
            </div>
          </div>
        </aside>

        {/* Мобильная версия фильтров*/}
        <div
          className={`fixed bottom-0 left-0 right-0 top-0 bg-white p-4 shadow-lg md:hidden ${filtersVisible ? 'block' : 'hidden'} overflow-y-auto`}
        >
          <div className='filter-section mb-6 flex flex-col gap-1 text-blue-950'>
            <button
              className='text-secondary mr-auto hover:underline'
              onClick={handleFiltersReset}
            >
              Сбросить все
            </button>
            {filterComponents.map((f) => (
              <div key={f.component.key}>{f.component}</div>
            ))}
            <div className='mt-2 flex w-full justify-center'>
              <ButtonCustom
                className='w-full'
                onClick={handleApplyFilters}
                variant={'primary'}
                size={'s'}
              >
                Найти
              </ButtonCustom>
            </div>
          </div>
          <button
            className='text-secondary absolute right-4 top-4'
            onClick={handleToggleFilters}
          >
            <SvgSprite name='cross' width={20} />
          </button>
        </div>

        <main className='mx-auto w-full max-w-md p-4 md:max-w-xl lg:w-3/4 lg:max-w-none'>
          {/* Мобильная версия кнопок*/}
          <div className='mb-4 flex md:hidden'>
            {isMapVisible ? (
              <button
                onClick={() => setIsMapVisible((prev) => !prev)}
                className='text-primary ml-auto flex w-20 justify-center gap-1 rounded-lg bg-blue-50 px-2 py-1 font-medium'
              >
                <SvgSprite name='map' width={20} />
                <Typography variant='s'>Карта</Typography>
              </button>
            ) : (
              <button
                onClick={() => setIsMapVisible((prev) => !prev)}
                className='text-primary ml-auto flex gap-1 rounded-lg bg-blue-50 px-2 py-1 font-medium'
              >
                <SvgSprite name='list' width={20} color='blue' />
                <Typography variant='s'>Список</Typography>
              </button>
            )}
          </div>

          <div className='view-options mb-4 flex items-center justify-between gap-2'>
            <div className='hidden gap-4 text-blue-950 md:flex'>
              <button
                onClick={() => setIsMapVisible((prev) => !prev)}
                className='text-primary flex gap-1 rounded-lg bg-blue-50 px-2 py-1 font-medium'
              >
                <SvgSprite name='list' width={20} color='blue' />
                <Typography variant='s'>Список</Typography>
              </button>
              <button
                onClick={() => setIsMapVisible((prev) => !prev)}
                className='text-primary flex gap-1 rounded-lg bg-blue-50 px-2 py-1 font-medium'
              >
                <SvgSprite name='map' width={20} />
                <Typography variant='s'>Карта</Typography>
              </button>
            </div>
            <button
              className='text-primary flex gap-1 rounded-lg border border-grey-100 bg-grey-50 px-2 py-1 font-medium'
              onClick={toggleSortOrder}
            >
              <Typography variant='s'>По популярности</Typography>
              <SvgSprite name='sort' width={20} />
            </button>

            <button
              className='text-primary flex gap-1 rounded-lg border border-grey-100 bg-grey-50 px-2 font-medium lg:hidden'
              onClick={handleToggleFilters}
            >
              <Typography variant='s'>Фильтры</Typography>
              <SvgSprite name='filter' width={20} />
            </button>
          </div>

          {/* Блок с отелями */}
          {isMapVisible ? (
            <HotelComponentMap />
          ) : (
            <div className='hotels-list grid gap-6 md:grid-cols-1'>
              {sortedHotels.length > 0 ? (
                <>
                  {sortedHotels.map((hotel, index) => {
                    const filteredRoom = hotel.rooms.find(
                      // (room) =>
                      //   room.price >= appliedFilters.price[0] &&
                      //   room.price <= appliedFilters.price[1],
                      (room) =>
                        Array.isArray(room.dates) &&
                        room.dates.length > 0 &&
                        typeof room.dates[0].price === 'number' &&
                        room.dates[0].price >= appliedFilters.price[0] &&
                        room.dates[0].price <= appliedFilters.price[1],
                    );
                    if (filteredRoom)
                      return (
                        <div
                          key={
                            `hotel - ${hotel.id}`
                            // hotel.tourInfo
                            //   ? `tour-${hotel.tourInfo.id}`
                            //   : `hotel-${hotel.id}`
                          }
                        >
                          <div
                            key={`hotel-${hotel.id}`}
                            className='hotel-card relative flex flex-col rounded-lg bg-white text-blue-950 shadow-xl md:flex-row'
                          >
                            <div className='hotel-image relative z-0 mb-4 w-full overflow-hidden md:mb-0 md:mr-4 md:w-2/5'>
                              <button className='absolute right-2 top-2 z-10 rounded-full bg-blue-50 p-3 lg:hidden'>
                                <SvgSprite name='heart-outline' width={15} />
                              </button>
                              <HotelComponentPhotoSlider hotel={hotel} />
                            </div>

                            <div
                              onClick={() =>
                                handleRouting(
                                  hotel.id,
                                  hotel.name,
                                  hotel.country,
                                  tab,
                                )
                              }
                              style={{ cursor: 'pointer' }}
                              className='hotel-info relative z-10 w-full rounded-lg p-4 md:ml-[-16px] md:w-3/5'
                            >
                              {/* Рейтинг и информация */}
                              <div className='mb-2 flex gap-2'>
                                <Rating
                                  category={hotel.star_category}
                                  starSize={16}
                                  gap={1}
                                />
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
                                <Typography
                                  variant='h4'
                                  className='mb-2 text-[16px] md:text-lg'
                                >
                                  {hotel.name}
                                </Typography>
                                <Typography
                                  variant='l'
                                  className='mb-2 text-xs md:text-sm'
                                >
                                  {hotel.city}
                                </Typography>
                              </div>

                              {/* Удобства */}
                              <div className='hotel-amenities mb-2 flex flex-nowrap gap-2'>
                                {hotel.amenities_common
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
                                <Typography
                                  variant='l-bold'
                                  className='mb-2 text-xs'
                                >
                                  Питание: {filteredRoom.type_of_meals[0].name}
                                </Typography>
                                <Typography
                                  variant='h4'
                                  className='text-[16px] text-blue-600 md:text-lg'
                                >
                                  {/* {filteredRoom.price} ₽ */}
                                  {filteredRoom?.dates?.[0]?.price
                                    ? `${filteredRoom.dates[0].price} ₽`
                                    : 'Цена не указана'}
                                </Typography>
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

                          {/* Блок с объявлениями */}
                          {index === Math.floor(sortedHotels.length / 2) && (
                            <div
                              className='announcement-block relative mt-6 flex flex-row items-center justify-between px-6 py-6 md:pr-0'
                              key='announcement'
                            >
                              <div className='announcement-block-backgorund absolute inset-0 z-0 rounded-xl bg-blue-50 md:bottom-6 md:top-6 lg:top-12'></div>

                              <div className='z-10 flex flex-col items-center justify-center gap-2 rounded-xl text-center md:items-start md:text-left'>
                                <Typography
                                  variant='h4'
                                  className='text-lg text-blue-950'
                                >
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
                      );
                  })}
                </>
              ) : (
                <div className='flex w-auto items-center justify-center'>
                  <Typography variant='h4'>
                    Отелей по выбранным критериям не найдено.
                  </Typography>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
