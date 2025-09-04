/* eslint-disable no-commented-code/no-commented-code */
import { useEffect, useMemo, useState } from 'react';
import React from 'react';

import { AnnouncementCard } from '@/entities/announcement-card';
import { HotelCatalogCard } from '@/entities/hotel-catalog-card';
import { TourCatalogCard } from '@/entities/tour-catalog-card';
import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { useGetToursQuery } from '@/servicesApi/toursApi';
import { HotelComponentMap } from '@/shared/hotel-component-map';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Select } from '@/shared/ui/select';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { getNumericValue } from '@/shared/utils/getNumericValue';
import { IHotelsParamsQuery, IToursParamsQuery } from '@/types/api-interfaces';
import { IHotelMiniData } from '@/types/hotel';
import { ITour } from '@/types/tour';

export interface ICatalog {
  appliedFilters: {
    selectedCountries: string[];
    selectedCities: string[];
    recreationType: string[];
    placeType: string[];
    price: [number, number];
    rating: [number, number];
    starCategory: number[];
    mealType: string[];
    amenities: string[];
    airportDistance: string;
    tourOperators: string[];
  };
  handleToggleFilters: () => void;
  searchProps: {
    departureCity: string;
    where: string;
    arrivalCountry: string;
    hotelName: string;
    checkInDate: string;
    nights: string;
    guests: string;
  };
  tab: 'Отели' | 'Туры';
  filtersAppliedClicked: boolean;
}

interface HotelCardProps extends ICatalog {
  data: IHotelMiniData[] | ITour[];
}

export function CatalogList({
  appliedFilters,
  searchProps,
  tab,
  handleToggleFilters,
  data,
  filtersAppliedClicked,
}: HotelCardProps) {
  {
    /* Карта*/
  }

  const [isMapVisible, setIsMapVisible] = useState(false);

  {
    /* Сортировка*/
  }
  type SortOption =
    | 'По популярности'
    | 'По рейтингу'
    | 'Сначала дешевле'
    | 'Сначала дороже';

  const sortOptions: SortOption[] = [
    'По популярности',
    'По рейтингу',
    'Сначала дешевле',
    'Сначала дороже',
  ];

  const mapFiltersToQuery = (
    appliedFilters: ICatalog['appliedFilters'],
    searchProps: ICatalog['searchProps'],
    tab: ICatalog['tab'],
  ): IHotelsParamsQuery | IToursParamsQuery => {
    const starCategoryString =
      appliedFilters.starCategory.length > 0
        ? appliedFilters.starCategory.join(',')
        : undefined;

    const userRating =
      appliedFilters.rating[0] > 0 ? appliedFilters.rating[0] : undefined;

    const priceGte =
      appliedFilters.price[0] > 0 ? appliedFilters.price[0] : undefined;

    const priceLte =
      appliedFilters.price[1] > 0 ? appliedFilters.price[1] : undefined;

    const guests =
      searchProps.guests &&
      searchProps.guests !== 'Гостей' &&
      searchProps.guests !== 'Любое'
        ? Number(getNumericValue(searchProps.guests))
        : undefined;

    const nights =
      searchProps.nights && searchProps.nights !== 'Любое'
        ? Number(getNumericValue(searchProps.nights))
        : undefined;

    const city =
      appliedFilters.selectedCities.length > 0
        ? appliedFilters.selectedCities[0]
        : undefined;

    const country =
      appliedFilters.selectedCountries.length > 0
        ? appliedFilters.selectedCountries[0]
        : undefined;

    const baseParams = {
      price_gte: priceGte,
      price_lte: priceLte,
      user_rating: userRating,
      star_category: starCategoryString,
      guests: guests,
      nights: nights,
      type_of_rest:
        appliedFilters.recreationType.length > 0
          ? appliedFilters.recreationType[0]
          : undefined,
      place:
        appliedFilters.placeType.length > 0
          ? appliedFilters.placeType[0]
          : undefined,
    };

    if (tab === 'Отели') {
      return {
        ...baseParams,
        city: city || undefined,
        country: country || undefined,
        check_in_date: searchProps.checkInDate || undefined,
      };
    }

    if (tab === 'Туры') {
      return {
        ...baseParams,
        departure_city: searchProps.departureCity || undefined,
        arrival_city: city || undefined,
        arrival_country: country || undefined,
        start_date: searchProps.checkInDate || undefined,
        distance_to_the_airport:
          appliedFilters.airportDistance &&
          appliedFilters.airportDistance !== 'Любое'
            ? Number(getNumericValue(appliedFilters.airportDistance)) * 1000
            : undefined,
        tour_operator:
          appliedFilters.tourOperators.length > 0
            ? appliedFilters.tourOperators[0]
            : undefined,
      };
    }

    return baseParams;
  };

  const queryParams = mapFiltersToQuery(appliedFilters, searchProps, tab);

  const { data: hotelsData } = useGetHotelsQuery(queryParams, {
    skip: tab !== 'Отели',
  });

  const { data: toursData } = useGetToursQuery(queryParams, {
    skip: tab !== 'Туры',
  });

  const filteredResponse = tab === 'Туры' ? toursData : hotelsData;

  const [displayedData, setDisplayedData] =
    useState<(IHotelMiniData | ITour)[]>(data);

  useEffect(() => {
    let items = [];

    if (filtersAppliedClicked && filteredResponse?.results) {
      items = filteredResponse.results;
    } else {
      items = data;
    }

    // убираем дубликаты по id
    const unique = Array.from(
      new Map(
        items.map((item) => [
          'id' in item ? item.id : (item as ITour)?.hotel?.id,
          item,
        ]),
      ).values(),
    );

    setDisplayedData(unique);
  }, [filteredResponse, tab, filtersAppliedClicked, data]);

  const [selectedSort, setSelectedSort] = useState<SortOption>('По популярности');

  const getPrice = (item: ITour | IHotelMiniData): number => {
    if ('tour_operator' in item) {
      return Number(item.total_price) || 0;
    }

    return (
      Number(item.min_price_with_discount || item.min_price_without_discount) || 0
    );
  };

  const sortedData = useMemo(() => {
    return [...displayedData].sort((a, b) => {
      // Для рейтинга
      if (selectedSort === 'По рейтингу') {
        const ratingA = 'tour_operator' in a ? a.hotel.user_rating : a.user_rating;
        const ratingB = 'tour_operator' in b ? b.hotel.user_rating : b.user_rating;
        return ratingB - ratingA;
      }

      // Для цены
      const priceA = getPrice(a);
      const priceB = getPrice(b);

      if (selectedSort === 'Сначала дешевле') return priceA - priceB;
      if (selectedSort === 'Сначала дороже') return priceB - priceA;

      // По умолчанию (по популярности)
      return 0;
    });
  }, [displayedData, selectedSort]);

  const handleSortSelect = (option: string) => {
    setSelectedSort(option as SortOption);
  };

  {
    /* Роутинг*/
  }

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  {
    /* Подгрузка*/
  }

  const [loadCount, setLoadCount] = useState(20);

  const handleLoadMore = () => {
    setLoadCount((prev) => prev + 10);
  };

  // const handleRouting = ({
  //   tourId,
  //   hotelId,
  //   hotelName,
  //   hotelCountry,
  //   tab,
  // }: {
  //   hotelId?: number | null;
  //   tourId?: number | null;
  //   hotelName: string;
  //   hotelCountry: string;
  //   tab: string;
  // }) => {
  //   const encodedName = encodeURIComponent(hotelName);
  //   const encodedHotelId = hotelId ? encodeURIComponent(hotelId) : null;
  //   const encodedTourId = tourId ? encodeURIComponent(tourId) : null;
  //   const encodedCountry = encodeURIComponent(hotelCountry);
  //   const encodedType = encodeURIComponent(tab);

  //   if (tab === 'Туры' && encodedTourId) {
  //     router.push(
  //       `/tour-page?type=${encodedType}&tourId=${encodedTourId}&arrivalCountry=${encodedCountry}`,
  //     );
  //   } else {
  //     router.push(
  //       `/hotel-page?type=${encodedType}&hotelId=${encodedHotelId}&hotelName=${encodedName}&arrivalCountry=${encodedCountry}`,
  //     );
  //   }
  // };

  if (!isClient) {
    return null;
  }

  return (
    <main className='mx-auto flex w-full flex-col pt-5 md:pt-0 lg:w-3/4 lg:max-w-none lg:pl-1'>
      {/* Мобильная версия кнопок*/}
      <div className='mb-4 flex md:hidden'>
        {!isMapVisible ? (
          <button
            onClick={() => setIsMapVisible(true)}
            className='ml-auto flex justify-center gap-3 rounded-lg bg-blue-50 pb-2 pl-[10px] pr-4 pt-2'
          >
            <Typography variant='m'>Карта</Typography>
            <SvgSprite name='map' width={20} color='#3440CE' />
          </button>
        ) : (
          <button
            onClick={() => setIsMapVisible(false)}
            className='ml-auto flex gap-2 rounded-lg bg-blue-50 px-3 pb-2 pt-2'
          >
            <Typography variant='m'>Список</Typography>
            <SvgSprite name='list' width={20} color='#3440CE' />
          </button>
        )}
      </div>

      <div className='view-options mb-4 flex items-center justify-between gap-2 text-grey-950'>
        <div className='hidden gap-2 text-blue-950 md:flex'>
          <button
            onClick={() => setIsMapVisible(false)}
            className={`flex items-center justify-end gap-1 rounded-lg px-[10px] pb-2 pt-3 ${!isMapVisible ? 'md:bg-grey-50' : ''}`}
          >
            <SvgSprite name='list' width={24} color='#3440CE' />
            <Typography variant='m'>Список</Typography>
          </button>
          <button
            onClick={() => setIsMapVisible(true)}
            className={`flex items-center justify-center gap-2 rounded-lg px-[10px] pb-2 pt-3 ${isMapVisible ? 'md:bg-grey-50' : ''}`}
          >
            <SvgSprite name='map' width={20} color='#3440CE' />
            <Typography variant='m'>Карта</Typography>
          </button>
        </div>
        <div className='flex items-center gap-6'>
          <Select
            options={sortOptions}
            className='md flex gap-1 rounded-lg font-medium lg:border lg:border-grey-100'
            onSelect={handleSortSelect}
            Icon='sort'
            size='catalog'
            arrowClass='h-6 w-6'
          ></Select>

          <button
            className='text-primary flex gap-1 rounded-lg border border-grey-100 bg-grey-50 px-2 font-medium lg:hidden'
            onClick={handleToggleFilters}
          >
            <Typography variant='s'>Фильтры</Typography>
            <SvgSprite name='filter' width={20} />
          </button>
        </div>
      </div>

      {/* Блок с карточками */}
      {isMapVisible ? (
        <HotelComponentMap />
      ) : (
        <div className='hotels-list mb-5 flex flex-col gap-3 md:gap-4 lg:mb-8 lg:gap-5'>
          {sortedData.length > 0 ? (
            <>
              {sortedData.slice(0, loadCount).map((item, index) => {
                const isTour = 'tour_operator' in item;
                const announcementCardPosition =
                  Math.floor(sortedData.length / 2) - 1;

                return (
                  <React.Fragment key={`item-${index}`}>
                    {isTour ? (
                      <TourCatalogCard tour={item} />
                    ) : (
                      <HotelCatalogCard hotel={item} />
                    )}

                    {index === announcementCardPosition && <AnnouncementCard />}
                  </React.Fragment>
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
      {sortedData.length > loadCount && (
        <ButtonCustom
          size='m'
          variant='tetriary'
          className='self-center md:px-8 md:py-4 lg:px-14 lg:py-5'
          onClick={handleLoadMore}
        >
          <Typography
            variant='m'
            className='font-semibold lg:text-[20px] lg:font-medium lg:leading-8'
          >
            Показать ещё
          </Typography>
        </ButtonCustom>
      )}
    </main>
  );
}
