import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import { Modal } from '@/shared/modal';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { YandexMap } from '@/widgets/ymap';

import { IHotelBlockPhotosReview } from './HotelBlockPhotosReview.types';
import { serviceNames } from './service';

export function HotelBlockPhotosReview({ hotel }: IHotelBlockPhotosReview) {
  const hotels = [hotel];

  const [amenities, setAmenities] = useState<string[]>([]);
  const [showAllPhoto, setShowAllPhoto] = useState<boolean>(false);

  const [showAll, setShowAll] = useState<boolean>(false);
  const amenitiesContainerRef = useRef<HTMLDivElement | null>(null);
  const [visibleAmenities, setVisibleAmenities] = useState(3);

  const [reviewStates, setReviewStates] = useState<{ [hotelId: number]: boolean }>(
    {},
  );
  const reviewContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const amenitiesNew = [
      ...hotel.amenities_common,
      ...hotel.amenities_for_children,
      ...hotel.amenities_in_the_room,
      ...hotel.amenities_sports_and_recreation,
    ];

    setAmenities(amenitiesNew);
  }, []);

  const toggleReviews = (hotelId: number) => {
    setReviewStates((prevState) => {
      const newState = { ...prevState, [hotelId]: !prevState[hotelId] };
      if (!newState[hotelId] && reviewContainerRefs.current[hotelId]) {
        reviewContainerRefs.current[hotelId].scrollTop = 0;
      }
      return newState;
    });
  };

  useEffect(() => {
    const updateVisibleAmenities = () => {
      if (window.innerWidth >= 1280) {
        setVisibleAmenities(11);
      } else if (window.innerWidth >= 840) {
        setVisibleAmenities(5);
      } else {
        setVisibleAmenities(3);
      }
    };

    updateVisibleAmenities();
    window.addEventListener('resize', updateVisibleAmenities);

    return () => {
      window.removeEventListener('resize', updateVisibleAmenities);
    };
  }, [amenities.length]);

  const toggleAmenities = () => {
    setShowAll((prev) => {
      if (prev && amenitiesContainerRef.current) {
        amenitiesContainerRef.current.scrollTop = 0;
      }
      return !prev;
    });
  };

  const handleClickAllPhoto = () => {
    setShowAllPhoto(true);
  };

  const handleClickBackPhoto = () => {
    setShowAllPhoto(false);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const coordinates: [number, number] = [-1.272749, 36.827872]; // Координаты для Москвы

  return (
    <>
      <div className='p-4'>
        {hotels.slice(0, 1).map((hotel) => (
          <div key={hotel.id} className='mb-6'>
            <div className='py-4'>
              <div className='flex flex-row items-center'>
                <Typography
                  variant='h2'
                  className='mr-2 flex items-center text-2xl font-bold'
                >
                  {hotel.name}
                </Typography>
                <Rating category={hotel.star_category} />
              </div>

              <div className='flex items-center gap-2'>
                <SvgSprite name='location' width={24} height={24} />
                <Typography variant='s' className='text-gray-600 text-sm'>
                  {hotel.country + ', ' + hotel.city}
                </Typography>
                <Typography
                  variant='s-bold'
                  className='rounded-lg bg-green-300 p-1 pl-2 pr-2 text-sm font-medium'
                >
                  {hotel.user_rating}
                </Typography>
              </div>
            </div>
            {!showAllPhoto ? (
              <div className='grid h-[182px] grid-cols-1 gap-4 py-4 md:h-auto lg:grid-cols-2'>
                <img
                  src={hotel.photo[0]?.photo}
                  alt={`Hotel ${hotel.name} hotel-photo`}
                  className='hidden h-full w-full rounded-3xl object-cover shadow-md lg:block'
                />

                <div className='flex gap-4 overflow-x-auto md:grid md:grid-cols-2'>
                  <img
                    src={hotel.photo[1]?.photo}
                    alt={`Hotel ${hotel.name} hotel-photo`}
                    className='flex-shrink-0 rounded-3xl object-cover shadow-md md:w-full'
                  />
                  <img
                    src={hotel.photo[2]?.photo}
                    alt={`Hotel ${hotel.name} hotel-photo`}
                    className='flex-shrink-0 rounded-3xl object-cover shadow-md md:w-full'
                  />
                  <img
                    src={hotel.photo[3]?.photo}
                    alt={`Hotel ${hotel.name} hotel-photo`}
                    className='flex-shrink-0 rounded-3xl object-cover shadow-md md:w-full'
                  />

                  <div className='relative w-48 flex-shrink-0 rounded-3xl p-2 shadow-md md:w-full'>
                    <div
                      className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-cover bg-center'
                      style={{
                        backgroundImage: `url(${hotel.photo[4]?.photo})`,
                        opacity: 0.6,
                      }}
                    />

                    <ButtonCustom
                      onClick={handleClickAllPhoto}
                      variant='tetriary'
                      size='m'
                      className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-1 rounded-3xl bg-blue-200 p-3 pl-4 pr-4 md:min-w-[180px]'
                    >
                      <div className='flex items-center gap-3'>
                        <SvgSprite name='image' width={20} />
                        <Typography variant='m-bold'>Все фотографии</Typography>
                      </div>
                    </ButtonCustom>
                  </div>
                </div>
              </div>
            ) : (
              <div className='py-4'>
                <ul className='grid h-[480px] gap-4 overflow-y-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
                  {hotel.photo.map((photo) => (
                    <li key={nanoid()}>
                      <img
                        src={photo.photo}
                        alt={`Hotel ${hotel.name} hotel-photo`}
                        className='h-[230px] w-[300px] rounded-3xl object-cover shadow-md lg:block'
                      />
                    </li>
                  ))}
                  <li
                    key={nanoid()}
                    className='relative h-[230px] w-[300px] flex-shrink-0 rounded-3xl p-2 shadow-md md:w-full'
                  >
                    <div
                      className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform rounded-3xl bg-cover bg-center'
                      style={{
                        backgroundImage: `url(${hotel.photo[0]?.photo})`,
                        opacity: 0.6,
                      }}
                    />
                    <ButtonCustom
                      onClick={handleClickBackPhoto}
                      variant='tetriary'
                      size='m'
                      className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform cursor-pointer items-center justify-center gap-1 rounded-3xl bg-blue-200 p-3 pl-4 pr-4 md:min-w-40'
                    >
                      <div className='flex items-center gap-3'>
                        <SvgSprite name='cross' width={15} />
                        <Typography variant='m-bold'>Назад</Typography>
                      </div>
                    </ButtonCustom>
                  </li>
                </ul>
              </div>
            )}
            <div className='grid grid-cols-1 gap-4 py-4 lg:grid-cols-2'>
              <div className='relative flex flex-col gap-4'>
                <div
                  ref={amenitiesContainerRef}
                  className={`grid grid-cols-1 gap-4 overflow-hidden rounded-2xl p-0.5 lg:grid-cols-2 ${
                    showAll
                      ? 'h-[287px] overflow-y-auto md:h-[450px]'
                      : 'h-[287px] overflow-hidden md:h-[450px]'
                  }`}
                >
                  {(showAll ? amenities : amenities.slice(0, visibleAmenities)).map(
                    (amenity) => (
                      <div
                        key={nanoid()}
                        className='bg-gray-100 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'
                      >
                        <SvgSprite
                          name={serviceNames(amenity)}
                          width={24}
                          height={24}
                        />
                        <Typography variant='s' className='text-gray-700'>
                          {amenity}
                        </Typography>
                      </div>
                    ),
                  )}

                  {amenities.length > visibleAmenities && (
                    <button
                      onClick={toggleAmenities}
                      className='group flex items-center justify-center gap-0.5 rounded-2xl bg-blue-300 px-4 py-4 shadow-md outline outline-1 outline-blue-600'
                    >
                      <Typography variant='s-bold' className='text-gray-700'>
                        {showAll
                          ? 'Скрыть удобства'
                          : `Еще ${amenities.length - visibleAmenities} удобств`}
                      </Typography>
                      <SvgSprite
                        name='arrow'
                        width={24}
                        className={`transition-transform duration-200 group-hover:translate-x-1 ${showAll ? 'rotate-90' : ''}`}
                        color='#4757ea'
                      />
                    </button>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='h-44 flex-1 rounded-2xl p-6 shadow-md md:h-56'>
                  <div className='flex gap-8 md:flex-col md:gap-2'>
                    <SvgSprite name='amenity-check-in' width={32} />
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
                  <div className='group flex cursor-pointer items-center gap-0.5'>
                    <Typography variant='s' className='text-blue-600'>
                      Все условия
                    </Typography>
                    <SvgSprite
                      name='arrow'
                      width={20}
                      className='transition-transform duration-200 group-hover:translate-x-1'
                      color='#4757ea'
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
                  <div className='relative m-auto flex items-center justify-center gap-1 rounded-3xl bg-blue-200 p-3 pl-6 pr-6'>
                    <ButtonCustom
                      onClick={handleOpenModal}
                      variant='tetriary'
                      size='m'
                      className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-1 rounded-3xl bg-blue-200 p-3 pl-4 pr-4 md:min-w-[195px]'
                    >
                      <div className='flex items-center gap-3'>
                        <SvgSprite name='location' width={24} />
                        <Typography variant='m-bold'>Смотреть на карте</Typography>
                      </div>
                    </ButtonCustom>
                  </div>
                </div>

                <div
                  key={hotel.id}
                  className='flex-1 rounded-2xl p-4 shadow-md md:col-span-2'
                >
                  <div
                    ref={(ref) => {
                      reviewContainerRefs.current[hotel.id] = ref;
                    }}
                    className={`h-[150px] overflow-hidden rounded-2xl transition-all duration-300 ${
                      reviewStates[hotel.id] ? 'overflow-y-auto' : 'overflow-hidden'
                    }`}
                  >
                    {/* {hotel.reviews.map((review) => (
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
                          <div className='ml-auto rounded-lg bg-green-300 px-2 py-1 text-sm font-medium md:px-3 md:py-2'>
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
                    ))} */}
                  </div>
                  {hotel.reviews && hotel.reviews.length > 1 && (
                    <div className='group mt-2 flex items-center justify-end gap-0.5'>
                      <button
                        className='flex items-center gap-1 text-blue-600'
                        onClick={() => toggleReviews(hotel.id)}
                      >
                        <Typography variant='s'>
                          {reviewStates[hotel.id]
                            ? 'Скрыть отзывы'
                            : `Еще ${hotel.reviews.length - 1} отзывов`}
                        </Typography>
                        <SvgSprite
                          name='arrow'
                          width={20}
                          className={`transition-transform duration-300 group-hover:translate-x-1 ${
                            reviewStates[hotel.id] ? 'rotate-90' : ''
                          }`}
                          color='#4757ea'
                        />
                      </button>
                    </div>
                  )}
                </div>
                <Modal isOpen={isOpenModal} getState={handleCloseModal}>
                  <div className='h-[500px] w-[270px] overflow-hidden rounded-2xl sm:h-[500px] sm:w-[500px] md:h-[550px] md:w-[600px]'>
                    <YandexMap coordinates={coordinates} />
                  </div>
                </Modal>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
