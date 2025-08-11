/* eslint-disable no-commented-code/no-commented-code */
import { useEffect, useMemo, useState } from 'react';

import { AnnouncementCard } from '@/entities/announcement-card/AnnouncementCard';
import { HotelCatalogCard } from '@/entities/hotel-catalog-card';
import { TourCatalogCard } from '@/entities/tour-catalog-card';
import { HotelComponentMap } from '@/shared/hotel-component-map';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { IHotelMiniData } from '@/types/hotel';
import { ITour } from '@/types/tour';

export interface ICatalog {
  appliedFilters: {
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
}: HotelCardProps) {
  {
    /* Карта*/
  }

  const [isMapVisible, setIsMapVisible] = useState(false);

  {
    /* Сортировка*/
  }
  const filterHotels = () =>
    data.filter((item) => {
      const isTour = tab === 'Туры';
      const hotel = isTour ? (item as ITour)?.hotel : (item as IHotelMiniData);
      // const rooms = isTour ? (item as ITour)?.rooms : (item as IHotel)?.rooms;
      const {
        selectedCities,
        // recreationType,
        // placeType,
        // price,
        rating,
        starCategory,
        // mealType,
        amenities,
        airportDistance,
        tourOperators,
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

      // const isWithinPriceRange =
      //   (price[0] !== 0 || price[1] !== 0) &&
      //   (isTour
      //     ? typeof (item as ITour).total_price === 'string' &&
      //     Number((item as ITour).total_price) >= price[0] &&
      //     Number((item as ITour).total_price) <= price[1]
      //     : rooms.some((room) => {
      //       const roomPrice = room.calendar_dates?.[0]?.price;
      //       return (
      //         typeof roomPrice === 'number' &&
      //         roomPrice >= price[0] &&
      //         roomPrice <= price[1]
      //       );
      //     }));

      const isCitySelected =
        selectedCities.length === 0 || selectedCities.includes(hotel.city);

      const isWhereSelected =
        !searchProps.where ||
        searchProps.where === '' ||
        (isTour
          ? (item as ITour).arrival_country
              ?.toLowerCase()
              .includes(searchProps.where.toLowerCase())
          : hotel.country?.toLowerCase().includes(searchProps.where.toLowerCase()));

      // const isRecreationTypeSelected =
      //   recreationType.length === 0 || recreationType.includes(hotel.type_of_rest);

      // const isPlaceTypeSelected =
      //   placeType.length === 0 || placeType.includes(hotel.place);

      const isWithinRatingRange =
        (rating[0] === 0 && rating[1] === 0) ||
        (hotel.user_rating >= rating[0] && hotel.user_rating <= rating[1]);

      const isStarCategorySelected =
        starCategory.length === 0 || starCategory.includes(hotel.star_category);

      const isTourOperatorSelected =
        tourOperators.length === 0 ||
        (isTour && tourOperators.length === 0) ||
        (isTour &&
          tourOperators.includes(
            (item as ITour).tour_operator?.toLowerCase() ?? '',
          ));

      // const isMealTypeSelected =
      //   mealType.length === 0 ||
      //   rooms.some((room) =>
      //     room.type_of_meals.some((meal) => mealType.includes(meal.name)),
      //   );

      const isAmenitiesSelected =
        amenities.length === 0 ||
        amenities.every((amenity) =>
          hotel.amenities_common.some((cat) => cat.includes(amenity)),
        );

      // const isGuestsSelected =
      //   searchProps.guests === 'Гостей' ||
      //   searchProps.guests === undefined ||
      //   rooms.some((room) => {
      //     const totalGuests =
      //       (room.number_of_adults || 0) + (room.number_of_children || 0);
      //     const guestsNumber =
      //       searchProps.guests === 'Любое'
      //         ? 0
      //         : parseInt(searchProps.guests || '0', 10);
      //     return totalGuests >= guestsNumber;
      //   });

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
        // isRecreationTypeSelected &&
        // isPlaceTypeSelected &&
        // isWithinPriceRange &&
        isWithinRatingRange &&
        isStarCategorySelected &&
        // isMealTypeSelected &&
        isAmenitiesSelected &&
        // isGuestsSelected &&
        isTourOperatorSelected &&
        isWhereSelected
        // && isNightsSelected
      );
    });

  const filteredData = useMemo(() => filterHotels(), [data, appliedFilters]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const ratingA = 'hotel' in a ? a.hotel.user_rating : a.user_rating;
      const ratingB = 'hotel' in b ? b.hotel.user_rating : b.user_rating;
      return sortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
    });
  }, [filteredData, sortOrder, tab]);

  const toggleSortOrder = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
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

  if (!isClient) {
    return null;
  }

  return (
    <main className='mx-auto flex w-full flex-col lg:w-3/4 lg:max-w-none lg:pl-1'>
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

      {/* Блок с карточками */}
      {isMapVisible ? (
        <HotelComponentMap />
      ) : (
        <div className='hotels-list mb-5 grid gap-3 md:grid-cols-1 md:gap-4 lg:mb-8 lg:gap-5'>
          {sortedData.length > 0 ? (
            <>
              {sortedData.slice(0, loadCount).map((item, index) => {
                const isTour = 'tour_operator' in item;
                const announcementCardPosition =
                  Math.floor(sortedData.length / 2) - 1;

                const card = isTour ? (
                  <TourCatalogCard key={`card-${index}`} tour={item} />
                ) : (
                  <HotelCatalogCard key={`card-${index}`} hotel={item} />
                );

                if (index === announcementCardPosition) {
                  return (
                    <>
                      {card}
                      <AnnouncementCard />
                    </>
                  );
                }

                return card;
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
