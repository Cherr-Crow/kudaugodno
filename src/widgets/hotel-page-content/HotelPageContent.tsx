import React, { useEffect, useRef, useState } from 'react';

import { nanoid } from 'nanoid';

import { HotelPhotoBlock } from '@/shared/hotel-photo-block';
import { HotelPhotoModal } from '@/shared/hotel-photo-modal/HotelPhotoModal';
import { Modal } from '@/shared/modal';
import { Rating } from '@/shared/rating';
import { SettlementConditionsCard } from '@/shared/settlement-conditions-card';
import { SettlementConditionsModal } from '@/shared/settlement-conditions-modal';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { YandexMap } from '@/widgets/ymap';

import { IHotelPageContent } from './HotelPageContent.types';

const hotelReviews = [
  {
    id: 1,
    userPhoto: 'url/photo',
    username: 'username',
    rating: 5,
    date: '21.03.2021',
    text: 'Отличный отель, рекомендую всем!',
  },
  {
    id: 1,
    userPhoto: 'url/photo',
    username: 'username',
    rating: 5,
    date: '21.03.2021',
    text: 'Отличный отель, рекомендую всем!',
  },
  {
    id: 1,
    userPhoto: 'url/photo',
    username: 'username',
    rating: 5,
    date: '21.03.2021',
    text: 'Отличный отель, рекомендую всем!',
  },
];

export function HotelPageContent({ hotel }: IHotelPageContent) {
  const hotels = [hotel];

  const [amenities, setAmenities] = useState<string[]>([]);
  const [showAllPhoto, setShowAllPhoto] = useState<boolean>(false);
  const [showSettlementsModal, setShowSettlementsModal] = useState<boolean>(false);

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

  const coordinates: [number, number] = [
    Number(hotel.width),
    Number(hotel.longitude),
  ];

  return (
    <>
      <div className='py-4'>
        {hotels.slice(0, 1).map((hotel) => (
          <div key={hotel.id} className='mb-6'>
            <div className='py-4'>
              {/* <div className='flex flex-row items-center'> */}
              <div className='flex flex-col items-center md:flex-row'>
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
            <HotelPhotoBlock
              photos={hotel.photo.slice(0, 5)}
              onShowAllPhoto={handleClickAllPhoto}
            />
            <Modal
              isOpen={showAllPhoto}
              getState={handleClickBackPhoto}
              isNewVariation={true}
              isHotelPhotoModal={true}
            >
              <HotelPhotoModal
                name={hotel.name}
                star_category={hotel.star_category}
                user_rating={hotel.user_rating}
                country={hotel.country}
                city={hotel.city}
                photos={hotel.photo}
              />
            </Modal>

            <div className='grid grid-cols-1 py-4 lg:grid-cols-2 lg:gap-4'>
              <div className='relative mb-3 flex flex-col gap-4'>
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
                        <SvgSprite name='amenity-spa' width={24} height={24} />
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

              <div className='grid grid-cols-1 gap-3 md:grid-cols-2'>
                <SettlementConditionsCard
                  check_in_time={hotel.check_in_time}
                  check_out_time={hotel.check_out_time}
                  onShowModal={() => setShowSettlementsModal(true)}
                />

                <Modal
                  isOpen={showSettlementsModal}
                  getState={() => setShowSettlementsModal(false)}
                  isNewVariation={true}
                  isSmallModal={true}
                >
                  <SettlementConditionsModal
                    check_in_time={hotel.check_in_time}
                    check_out_time={hotel.check_out_time}
                  />
                </Modal>

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
                  {hotelReviews && hotelReviews.length > 1 && (
                    <div className='group mt-2 flex items-center justify-end gap-0.5'>
                      <button
                        className='flex items-center gap-1 text-blue-600'
                        onClick={() => toggleReviews(hotel.id)}
                      >
                        <Typography variant='s'>
                          {reviewStates[hotel.id]
                            ? 'Скрыть отзывы'
                            : `Еще ${hotelReviews.length - 1} отзывов`}
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
