'use client';
import { Hotel } from '@/types/hotel';
import React, { useState } from 'react';
import { Typography } from '@/shared/typography';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchForm } from '@/shared/ui/search-form';
import { TabBar } from '@/shared/ui/tab-bar';

export default function CatalogHotels() {
  const [tabClick, setTabClick] = useState<string>('Туры');
  const hotels: Hotel[] = [
    {
      id: 1,
      name: 'Novotel Nairobi Westlands',
      star_category: 4,
      place: 'Кения, Найроби',
      amenities: [
        { id: 1, name: 'Много зелени' },
        { id: 2, name: 'Развлевения для детей' },
        { id: 3, name: 'Первая линия' },
        { id: 4, name: 'Можно с животными' },
        { id: 5, name: 'Семейные номера' },
        { id: 6, name: 'СПА' },
        { id: 7, name: '2 бассейна' },
        { id: 8, name: 'Трансфер от аэропорта' },
        { id: 9, name: '3 теннисных корта' },
        { id: 10, name: 'Ресторан аля-карт' },
        { id: 11, name: 'Бесплатный Wi-fi' },
        { id: 12, name: 'Доп-удобство-1' },
        { id: 13, name: 'Доп-удобство-2' },
      ],
      country: 'Кения',
      city: 'Найроби',
      address: 'Westlands Road, Найроби',
      distance_to_sea: 0,
      distance_to_airport: 20,
      description:
        'Отель с просторными номерами, бассейном и утренними завтраками. Удобно расположен в центре города.',
      rooms: [
        {
          id: 1,
          category: { id: 1, name: 'Стандартный номер' },
          food: 'Завтрак включен',
          type_of_holiday: 'Семейный',
          smoking: false,
          pet: false,
          area: 25,
          amenities: [
            { id: 1, name: 'Wi-Fi' },
            { id: 2, name: 'Телевизор' },
          ],
          capacity: 2,
          single_bed: null,
          double_bed: 1,
          nightly_price: 5000,
          photos: [
            { id: 1, photo: 'room1.png' },
            { id: 2, photo: 'room2.png' },
          ],
        },
        {
          id: 2,
          category: { id: 2, name: 'Люкс' },
          food: 'Полупансион',
          type_of_holiday: 'Романтический',
          smoking: false,
          pet: false,
          area: 50,
          amenities: [
            { id: 1, name: 'Wi-Fi' },
            { id: 2, name: 'Мини-бар' },
            { id: 3, name: 'Джакузи' },
          ],
          capacity: 4,
          single_bed: null,
          double_bed: 2,
          nightly_price: 10000,
          photos: [
            { id: 3, photo: 'room3.png' },
            { id: 4, photo: 'room4.png' },
          ],
        },
      ],
      user_rating: 8.6,
      reviews: [
        {
          id: 1,
          username: 'Константин Константинопольский',
          userPhoto: 'user1-photo.png',
          date: '26.03.2023',
          rating: 8.9,
          text: `Расположение идеальное и близко ко многим хорошим местам, например Sarit entre и Westgate Mall. 
          Завтрак был отличным, с таким количеством вариантов на выбор. 
          Первая линия. Лежаки и полотенца предоставлялись от отеля. СПА чудесный, есть много возможностей для спорта. 
          Очень зеленая территория.`,
        },
      ],
      check_in_time: '14:00',
      check_out_time: '12:00',
      photos: [
        { id: 1, photo: 'Novotel-Nairobi-Westlands-photo-1.png' },
        { id: 2, photo: 'Novotel-Nairobi-Westlands-photo-2.png' },
        { id: 3, photo: 'Novotel-Nairobi-Westlands-photo-3.png' },
        { id: 4, photo: 'Novotel-Nairobi-Westlands-photo-4.png' },
        { id: 5, photo: 'Novotel-Nairobi-Westlands-photo-5.png' },
      ],
    },
  ];

  return (
    <div className='p-4'>
      {hotels.map((hotel) => (
        <div key={hotel.id} className='container mb-6'>
          <div className='py-4'>
            <div className='flex flex-row items-center'>
              <Typography
                variant='h2'
                className='mr-2 flex items-center text-2xl font-bold'
              >
                {hotel.name}
              </Typography>
              {Array.from({ length: hotel.star_category }).map((_, index) => (
                <img
                  key={index}
                  src='icon-star.svg'
                  alt='star-icon'
                  className='text-yellow-500 h-5 w-5'
                />
              ))}

              {/* Можно убрать пустые звезды в рейтинге отеля */}
              {Array.from({ length: 5 - hotel.star_category }).map((_, index) => (
                <img
                  key={index + hotel.star_category}
                  src='icon-star-hollow.svg'
                  alt='empty-star-icon'
                  className='text-gray-300 h-5 w-5'
                />
              ))}
            </div>

            <div className='flex items-center gap-2'>
              <img
                src={'icon-location.svg'}
                alt='location-icon'
                className='h-4 w-4'
              />
              <Typography variant='s' className='text-gray-600 text-sm'>
                {hotel.place}
              </Typography>
              <Typography
                variant='s-bold'
                className='rounded-lg bg-green-secondary p-1 pl-2 pr-2 text-sm font-medium'
              >
                {hotel.user_rating}
              </Typography>
            </div>
          </div>

          <div className='grid h-[182px] grid-cols-1 gap-4 py-4 md:h-auto lg:grid-cols-2'>
            <img
              src={hotel.photos[0]?.photo}
              alt={`Hotel ${hotel.name} hotel-photo`}
              className='hidden h-full w-full rounded-lg object-cover shadow-md lg:block'
            />

            <div className='flex gap-4 overflow-x-auto md:grid md:grid-cols-2'>
              <img
                src={hotel.photos[1]?.photo}
                alt={`Hotel ${hotel.name} hotel-photo`}
                className='flex-shrink-0 rounded-lg object-cover shadow-md md:w-full'
              />
              <img
                src={hotel.photos[2]?.photo}
                alt={`Hotel ${hotel.name} hotel-photo`}
                className='flex-shrink-0 rounded-lg object-cover shadow-md md:w-full'
              />
              <img
                src={hotel.photos[3]?.photo}
                alt={`Hotel ${hotel.name} hotel-photo`}
                className='flex-shrink-0 rounded-lg object-cover shadow-md md:w-full'
              />

              <div className='relative w-48 flex-shrink-0 rounded-lg p-2 shadow-md md:w-full'>
                <div
                  className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-cover bg-center'
                  style={{
                    backgroundImage: `url(${hotel.photos[4]?.photo})`,
                    opacity: 0.6,
                  }}
                />
                <div className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-1 rounded-3xl bg-blue-light p-3 pl-4 pr-4 md:min-w-40'>
                  <img
                    src={'amenity-icon-all-photos.svg'}
                    alt='check-in-icon'
                    className='h-6 w-6'
                  />
                  <Typography
                    variant='s-bold'
                    className='text-sm font-bold text-black'
                  >
                    Все фотографии
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div className='grid grid-cols-1 gap-4 py-4 lg:grid-cols-2'>
            <div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
              {hotel.amenities.slice(0, 11).map((amenity) => {
                const getIcon = (name: string) => {
                  switch (name) {
                    case 'Много зелени':
                      return 'amenity-icon-greenary.svg';
                    case 'Первая линия':
                      return 'amenity-icon-first-line.svg';
                    case 'Семейные номера':
                      return 'amenity-icon-family-room.svg';
                    case '2 бассейна':
                      return 'amenity-icon-pool.svg';
                    case '3 теннисных корта':
                      return 'amenity-icon-tennis-court.svg';
                    case 'Бесплатный Wi-fi':
                      return 'amenity-icon-wifi.svg';
                    case 'Развлевения для детей':
                      return 'amenity-icon-kids-entertainment.svg';
                    case 'Можно с животными':
                      return 'amenity-icon-animals-allowed.svg';
                    case 'Трансфер от аэропорта':
                      return 'amenity-icon-airport-transfer.svg';
                    case 'СПА':
                      return 'amenity-icon-spa.svg';
                    case 'Ресторан аля-карт':
                      return 'amenity-icon-cart-restaurant.svg';
                    default:
                      return 'amenity-icon-default.svg';
                  }
                };

                return (
                  <div
                    key={amenity.id}
                    className='bg-gray-100 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'
                  >
                    <img
                      src={getIcon(amenity.name)}
                      alt={amenity.name}
                      className='h-6 w-6'
                    />
                    <Typography variant='s' className='text-gray-700'>
                      {amenity.name}
                    </Typography>
                  </div>
                );
              })}

              {hotel.amenities.length > 11 && (
                <div className='group flex items-center justify-center gap-0.5 rounded-2xl bg-blue-300 px-4 py-4 shadow-md outline outline-1 outline-blue-600'>
                  <Typography variant='s-bold' className='text-sm text-blue-bold'>
                    Еще {hotel.amenities.length - 11} удобств
                  </Typography>
                  <img
                    src={'icon-arrow.svg'}
                    alt='arrow-icon'
                    className='mt-0.5 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1'
                  />
                </div>
              )}
            </div>

            <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div className='h-44 flex-1 rounded-2xl p-6 shadow-md md:h-56'>
                <div className='flex gap-8 md:flex-col md:gap-2'>
                  <img
                    src={'amenity-icon-check-in.svg'}
                    alt={`check-in-icon`}
                    className='h-8 w-8'
                  />
                  <Typography variant='l' className='mb-2 font-semibold'>
                    Условия заселения
                  </Typography>
                </div>
                <div className='flex flex-col'>
                  <Typography variant='m' className='text-gray-600'>
                    Заселение: {hotel.check_in_time}
                  </Typography>
                  <Typography variant='m' className='text-gray-600 mb-3'>
                    Выселение: {hotel.check_out_time}
                  </Typography>
                </div>
                <div className='group flex items-center gap-0.5'>
                  <Typography variant='l' className='text-2xl text-blue-600'>
                    Все условия
                  </Typography>
                  <img
                    src={'icon-arrow.svg'}
                    alt='check-in-icon'
                    className='mt-0.5 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1'
                  />
                </div>
              </div>

              <div
                className='flex min-h-40 items-center rounded-2xl bg-cover bg-center p-2 shadow-md'
                style={{
                  backgroundImage: "url('map.png')",
                  backgroundPosition: '10% 10%',
                }}
              >
                <div className='m-auto flex items-center justify-center gap-1 rounded-3xl bg-blue-light p-3 pl-6 pr-6'>
                  <img
                    src={'icon-location.svg'}
                    alt='check-in-icon'
                    className='h-6 w-6'
                  />
                  <Typography variant='s-bold' className='text-black'>
                    Смотреть на карте
                  </Typography>
                </div>
              </div>

              <div className='flex-1 rounded-2xl p-4 shadow-md md:col-span-2'>
                {hotels[0].reviews.map((review) => (
                  <div key={review.id} className='mb-4 border-b pb-4'>
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
                      <div className='ml-auto rounded-lg bg-green-secondary px-2 py-1 text-sm font-medium md:px-3 md:py-2'>
                        {review.rating}
                      </div>
                    </div>
                    <Typography variant='xs' className='text-gray-500 mb-2'>
                      {review.date}
                    </Typography>
                    <div className='flex items-center justify-between'>
                      <Typography variant='s' className='text-gray-700 mb-2'>
                        {review.text}
                      </Typography>
                    </div>
                  </div>
                ))}
                <div className='group flex items-center justify-end gap-0.5'>
                  <Typography variant='s' className='text-blue-600'>
                    Еще 70 отзывов
                  </Typography>
                  <img
                    src='icon-arrow.svg'
                    alt='arrow-icon'
                    className='mt-0.5 h-3 w-3 transition-transform duration-200 group-hover:translate-x-1'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      return (
      <section
        className={`container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]`}
      >
        <Breadcrumbs></Breadcrumbs>
        <SearchForm
          className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}
          tabClick={''}
        />
      </section>
      );
    </div>
  );
}
