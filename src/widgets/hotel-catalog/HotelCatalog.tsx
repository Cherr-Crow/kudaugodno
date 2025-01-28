"use client";
import React, { useRef, useState } from 'react';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { hotels } from '@/temp/hotel-mock';
import { FilterPrice } from '@/shared/filter-price';
import { FilterCity } from '@/shared/filter-city';
import { FilterPlaceType } from '@/shared/filter-place-type';
import { FilterRecreationType } from '@/shared/filter-recreation-type';
import { FilterRating } from '@/shared/filter-rating';
import { FilterStarCategory } from '@/shared/filter-star-category';
import { FilterTypeOfMeals } from '@/shared/filter-type-of-meals';
import { FilterAmenities } from '@/shared/filter-amenities';
import { HotelComponentPhotoSlider } from '@/shared/hotel-component-photo-slider';

export function HotelCatalog() {
  const [reviewStates, setReviewStates] = useState<{ [hotelId: number]: { showAllReviews: boolean } }>(
    hotels.reduce((acc: { [key: number]: { showAllReviews: boolean } }, hotel) => {
      acc[hotel.id] = { showAllReviews: false };
      return acc;
    }, {})
  );

  const reviewsContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const toggleReviews = (hotelId: number) => {
    setReviewStates((prevState) => {
      const newState = { ...prevState, [hotelId]: { showAllReviews: !prevState[hotelId].showAllReviews } };
      if (!newState[hotelId].showAllReviews && reviewsContainerRefs.current[hotelId]) {
        reviewsContainerRefs.current[hotelId]!.scrollTop = 0;
      }
      return newState;
    });
  };

  return (
    <div className="hotel-catalog-page bg-gray-50">
      <header className="flex justify-between items-center p-4 bg-white shadow-md">
        <Typography variant="h1" className="text-primary">
          Фильтр
        </Typography>
        <button className="text-secondary underline">Сбросить все (3)</button>
      </header>

      <div className="flex flex-col md:flex-row">
        {/* Фильтры */}
        <aside className="w-full md:w-1/4 p-4 border-b md:border-b-0 md:border-r border-gray-200">
          <div className="filter-section mb-6">
            <FilterCity />
            <FilterRecreationType />
            <FilterPlaceType />
            <FilterPrice />
            <FilterRating />
            <FilterStarCategory />
            <FilterTypeOfMeals />
            <FilterAmenities />
          </div>
        </aside>

        {/* Основной контент */}
        <main className="w-full md:w-3/4 p-4">
          <div className="view-options flex justify-between items-center mb-4">
            <div className="flex">
              <button className="mr-4 text-primary font-medium">Список</button>
              <button className="text-gray-500">Карта</button>
            </div>
            <button className="text-primary font-medium">По популярности</button>
          </div>

          <div className="hotels-list grid gap-6 md:grid-cols-1">
            {hotels.map((hotel) => (
              <div
                key={hotel.id}
                className="hotel-card flex flex-col md:flex-row rounded-lg shadow-xl bg-white relative"
              >
                <div className="hotel-image w-full md:w-2/5 mb-4 md:mb-0 md:mr-4 z-0 relative overflow-hidden">
                  <HotelComponentPhotoSlider hotel={hotel} />
                </div>

                <div className="hotel-info p-4 w-full md:w-3/5 md:ml-[-16px] rounded-lg z-10 relative">
                  {/* Рейтинг и информация */}
                  <div className="flex flex-wrap flex-col mb-2 gap-2 relative">
                    <Rating category={hotel.star_category} />
                    <Typography variant="h4" className="mb-2">
                      {hotel.name}
                    </Typography>
                    <Typography variant="l" className="mb-2 text-secondary">
                      {hotel.city}
                    </Typography>
                    <div className="flex gap-2 absolute top-0 right-0">
                      {/* Кнопка "Показать отзывы" */}
                      {hotel.reviews && hotel.reviews.length > 0 && (
                        <div className="group flex items-center justify-end gap-0.5">
                          <button
                            className="text-blue-600 hover:underline flex items-center gap-1"
                            onClick={() => toggleReviews(hotel.id)}
                          >
                            <Typography variant="m">
                              {reviewStates[hotel.id]?.showAllReviews
                                ? "Скрыть отзывы"
                                : `Еще ${hotel.reviews.length} отзывов`}
                            </Typography>
                          </button>
                        </div>
                      )}

                      <Typography
                        variant="l"
                        className="text-secondary rounded-lg bg-green-secondary px-2 py-1 text-sm font-medium md:px-3 md:py-2"
                      >
                        {hotel.user_rating}
                      </Typography>

                      <button className="bg-blue-50 p-3 rounded-full">
                        <SvgSprite name="heart-outline" width={30} />
                      </button>
                    </div>
                  </div>

                  {/* Удобства */}
                  <div className="hotel-amenities flex flex-wrap mb-2 gap-2">
                    {hotel.amenities[0]?.amenity.slice(0, 3).map((amenity, index) => (
                      <Typography
                        key={index}
                        variant="l-bold"
                        className="bg-gray-100 px-2 py-1 rounded-xl bg-blue-disabled"
                      >
                        {amenity}
                      </Typography>
                    ))}
                  </div>

                  {/* Цена */}
                  <div className="hotel-price flex justify-between items-center mt-4 rounded-xl bg-blue-disabled">
                    <Typography variant="l" className="mb-2">
                      Питание: {hotel.rooms[0]?.food.type_of_meals}
                    </Typography>
                    <Typography variant="h3" className="text-primary">
                      {hotel.rooms[0].nightly_price} ₽
                    </Typography>
                  </div>

                  {/* Отзывы */}
                  <div className="flex flex-col mt-4">
                    <div
                      ref={(el) => {
                        reviewsContainerRefs.current[hotel.id] = el;
                      }}
                      className={`overflow-hidden transition-max-height duration-300 ${reviewStates[hotel.id]?.showAllReviews ? "max-h-[220px] overflow-y-scroll" : "max-h-0"}`}
                    >

                      {hotel.reviews.map((review) => (
                        <div key={review.id} className="mb-4 border-b pb-4">
                          <div className="mb-2 flex items-center gap-3">
                            <img
                              src={review.userPhoto}
                              alt={review.username}
                              className="h-8 w-8 rounded-full"
                            />
                            <div>
                              <Typography variant="s" className="font-semibold">
                                {review.username}
                              </Typography>
                            </div>
                            <div className="ml-auto rounded-lg bg-green-secondary px-2 py-1 text-sm font-medium md:px-3 md:py-2">
                              {review.rating}
                            </div>
                          </div>
                          <Typography variant="xs" className="text-gray-500 mb-2">
                            {review.date}
                          </Typography>
                          <Typography variant="s" className="text-gray-700 mb-2">
                            {review.text}
                          </Typography>
                        </div>
                      ))}
                    </div>

                  </div>

                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}


