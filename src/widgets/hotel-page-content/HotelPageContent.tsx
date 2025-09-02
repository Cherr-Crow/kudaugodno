import { useState } from 'react';

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
    userPhoto: 'user1-photo.png',
    username: 'Константин Константинопольский',
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
  const [showAllAmenities, setShowAllAmenities] = useState<boolean>(false);
  const [showAllPhoto, setShowAllPhoto] = useState<boolean>(false);
  const [showSettlementsModal, setShowSettlementsModal] = useState<boolean>(false);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const amenities = [
    ...hotel.amenities_common,
    ...hotel.amenities_for_children,
    ...hotel.amenities_in_the_room,
    hotel.amenities_sports_and_recreation,
  ];

  const handleOpenModalAmenities = () => {
    setShowAllAmenities(true);
    console.log(showAllAmenities); // заглушка
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
    <div className='py-10 text-blue-950'>
      <div className='pb-10'>
        <div className='flex flex-col md:flex-row'>
          <Typography variant='h1' className='font-semibold'>
            {hotel.name}
          </Typography>
          <Rating category={hotel.star_category} starSize={16} />
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

      <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-4'>
        <div
          // ref={amenitiesContainerRef}
          className='grid grid-cols-1 gap-4 overflow-hidden rounded-2xl p-0.5 pb-2 lg:grid-cols-2'
        >
          {amenities.slice(0, 3).map((amenity) => (
            <div
              key={nanoid()}
              className='bg-gray-100 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'
            >
              <SvgSprite name='amenity-spa' width={24} height={24} />
              <Typography variant='s' className='text-gray-700'>
                {amenity}
              </Typography>
            </div>
          ))}

          <button
            onClick={handleOpenModalAmenities}
            className='group flex items-center justify-center gap-0.5 rounded-2xl bg-blue-300 px-4 py-4 shadow-md outline outline-1 outline-blue-600'
          >
            <Typography variant='s-bold' className='text-gray-700'>
              Показать все
            </Typography>
            <SvgSprite
              name='arrow'
              width={24}
              className={`transition-transform duration-200 group-hover:translate-x-1`}
              color='#4757ea'
            />
          </button>
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
                  <Typography variant='m-bold'>На карте</Typography>
                </div>
              </ButtonCustom>
            </div>
          </div>

          <div className='flex-1 rounded-2xl p-4 shadow-md md:col-span-2'>
            <div
              className={`overflow-hidden rounded-2xl transition-all duration-300`}
            >
              <div className='mb-4 border-b pb-4'>
                <div className='mb-2 flex items-center gap-3'>
                  <img
                    src={hotelReviews[0].userPhoto}
                    alt={hotelReviews[0].username}
                    className='h-8 w-8 rounded-full'
                  />
                  <div>
                    <Typography variant='s' className='font-semibold'>
                      {hotelReviews[0].username}
                    </Typography>
                  </div>
                  <div className='ml-auto rounded-lg bg-green-300 px-2 py-1 text-sm font-medium md:px-3 md:py-2'>
                    {hotelReviews[0].rating}
                  </div>
                </div>
                <Typography variant='xs' className='text-gray-500 mb-2'>
                  {hotelReviews[0].date}
                </Typography>
                <div className='flex items-center justify-between'>
                  <Typography variant='s' className='text-gray-700 mb-2'>
                    {hotelReviews[0].text}
                  </Typography>
                </div>
              </div>
            </div>
            {hotelReviews && hotelReviews.length > 1 && (
              <div className='group mt-2 flex items-center justify-end gap-0.5'>
                <button
                  className='flex items-center gap-1 text-blue-600'
                  onClick={() => setShowAllAmenities(true)}
                >
                  <Typography variant='s'>
                    {`Еще ${hotelReviews.length - 1} отзывов`}
                  </Typography>
                  <SvgSprite
                    name='arrow'
                    width={20}
                    className={`transition-transform duration-300 group-hover:translate-x-1`}
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
  );
}
