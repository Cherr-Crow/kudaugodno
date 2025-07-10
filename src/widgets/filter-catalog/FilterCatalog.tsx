/* eslint-disable no-commented-code/no-commented-code */
'use client';

import React, { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'next/navigation';

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
import { BackgroundOverlay } from '@/shared/ui/background-overlay';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SearchBlock } from '@/shared/ui/search-block';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { getDateNow } from '@/shared/utils/getDateNow';
import { useSearchBlockState } from '@/shared/utils/useSearchBlockState';
import CatalogData from '@/widgets/catalog-data/CatalogData';

type HotelCatalogProps = {
  initialTab: 'Туры' | 'Отели';
};

export function FilterCatalog({ initialTab }: HotelCatalogProps) {
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
    defaultDepartureCity: 'Москва',
    defaultWhere: 'Турция',
    defaultCheckInDate: `${getDateNow(+5)}`,
    defaultNights: '7 ночей',
    defaultGuests: '2 гостя',
  });
  const { ...searchProps } = searchState;
  // Обновление URL

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
    console.log(filtersVisible);
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

  {
    /* Карта*/
  }

  {
    /* Роутинг*/
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  {
    /* Компонент каталога*/
  }

  return (
    <div className='hotel-catalog-page relative flex flex-col justify-center'>
      <div
        className={`relative flex w-full px-10 pb-4 pt-4 md:mb-[30px] md:px-[80px] md:pb-[74px] md:pt-[80px] lg:pb-[48px] lg:pt-[48px]`}
      >
        <BackgroundOverlay
          className={`h-[100%] bg-[url('/plain.svg')] bg-contain bg-[position:60px_40px] bg-no-repeat`}
        />
        <SearchBlock
          className='gap-4 md:gap-3'
          tab={tab}
          setTab={setTab}
          {...searchProps}
        />
      </div>
      <div className='container flex w-full flex-col md:flex-row'>
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

        <CatalogData
          appliedFilters={appliedFilters}
          handleToggleFilters={handleToggleFilters}
          searchProps={searchProps}
          tab={tab}
        />
      </div>
    </div>
  );
}
