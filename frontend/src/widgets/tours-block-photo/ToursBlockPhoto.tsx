'use client';
import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { HotelPhotoBlock } from '@/shared/hotel-photo-block';
import { HotelPhotoModal } from '@/shared/hotel-photo-modal/HotelPhotoModal';
import { Modal } from '@/shared/modal';
import { Rating } from '@/shared/rating';
import { SettlementConditionsCard } from '@/shared/settlement-conditions-card';
import { SettlementConditionsModal } from '@/shared/settlement-conditions-modal';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { ModalTours } from '@/shared/ui/modal-tours';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { YandexMap } from '../ymap';
import { IToursBlockPhoto } from './ToursBlockPhoto.types';

export function ToursBlockPhoto({ hotel }: IToursBlockPhoto) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalMap, setIsOpenModalMap] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState<boolean>(false);
  const [showSettlementsModal, setShowSettlementsModal] = useState<boolean>(false);

  const handleClickAllPhoto = () => {
    setShowAllPhoto(true);
  };

  const handleClickBackPhoto = () => {
    setShowAllPhoto(false);
  };

  const handleCloseModalMap = () => {
    setIsOpenModalMap(false);
  };
  const handleOpenModalMap = () => {
    setIsOpenModalMap(true);
  };

  let coordinates: [number, number] = [55.751574, 37.573856]; // Москва
  if (hotel?.width && hotel.longitude) {
    coordinates = [Number(hotel.width), Number(hotel.longitude)];
  }

  if (!hotel) return <div>Информация об отеле отсутствует.</div>;

  return (
    <>
      {hotel && (
        <div className=''>
          <div key={hotel.id + nanoid()}>
            <div className='grid py-4'>
              <div className='order-1 xl:order-2'>
                <div className='lg:flex-fow flex flex-col xl:mt-6'>
                  <Typography
                    variant='h2'
                    className={`mb-2 mr-2 flex text-2xl font-semibold`}
                  >
                    {hotel.name}
                  </Typography>
                  <Rating category={hotel.star_category} />
                </div>
                <div className='flex items-center gap-2'>
                  <SvgSprite name='location' width={24} height={24} />
                  <Typography className='text-gray-600 text-sm'>
                    {hotel.country + ', ' + hotel.city}
                  </Typography>
                  <Typography
                    variant='s-bold'
                    className='bg-green-secondary rounded-lg p-1 pl-2 pr-2 text-sm font-medium'
                  >
                    {hotel.user_rating}
                  </Typography>
                </div>
              </div>
            </div>

            <HotelPhotoBlock
              photos={hotel.photo.slice(0, 5)}
              onShowAllPhoto={handleClickAllPhoto}
            />

            <div className='grid grid-cols-1 gap-4 py-4 lg:grid-cols-1'>
              <div className='grid grid-cols-1 gap-4 lg:grid-cols-4'>
                <div className='flex h-44 flex-col rounded-2xl p-6 shadow-md md:h-56'>
                  <div className='flex md:flex-col md:gap-2'>
                    <SvgSprite
                      name='amenity-wifi'
                      width={32}
                      className='transition-transform duration-200 group-hover:translate-x-1'
                      color='#4757ea'
                    />
                    <Typography variant='l' className='mb-2'>
                      Wi-fi и другие удобства
                    </Typography>
                  </div>
                  <div className='mb-3 flex flex-col'>
                    <Typography variant='m' className='text-gray-600'>
                      Бесплатный Wi-fi по всей территории отеля
                    </Typography>
                  </div>
                  <div className='group flex items-center gap-0.5'>
                    <Typography variant='l' className='cursor-pointer text-blue-600'>
                      Ещё 27 удобств
                    </Typography>
                    <SvgSprite
                      name='arrow'
                      width={20}
                      className='transition-transform duration-200 group-hover:translate-x-1'
                      color='#4757ea'
                    />
                  </div>
                </div>

                <SettlementConditionsCard
                  check_in_time={hotel.check_in_time}
                  check_out_time={hotel.check_out_time}
                  onShowModal={() => setShowSettlementsModal(true)}
                />

                <div className='h-44 flex-1 justify-around rounded-2xl p-6 shadow-md md:h-56'>
                  <div className='flex gap-8 md:flex-col md:gap-2'>
                    <SvgSprite
                      name='airplane'
                      width={32}
                      className='transition-transform duration-200 group-hover:translate-x-1'
                      color='#4757ea'
                    />
                    <Typography variant='l' className='mb-2'>
                      Перелет
                    </Typography>
                  </div>
                  <div className='mb-3 flex flex-col'>
                    <Typography variant='m' className='text-gray-600'>
                      Рейс с пересадкой Air Arabia, Домодедово
                    </Typography>
                  </div>
                  <div className='group flex items-center gap-0.5'>
                    <Typography variant='l' className='cursor-pointer text-blue-600'>
                      Подробнее
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
                  className='relative order-last flex min-h-40 items-center rounded-2xl bg-cover bg-center p-2 shadow-md lg:order-none'
                  style={{
                    backgroundImage: "url('map.png')",
                    backgroundPosition: '10% 10%',
                  }}
                >
                  <ButtonCustom
                    onClick={handleOpenModalMap}
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
                <Modal isOpen={isOpenModalMap} getState={handleCloseModalMap}>
                  <div className='h-[500px] w-[270px] overflow-hidden rounded-2xl sm:h-[500px] sm:w-[500px] md:h-[550px] md:w-[600px]'>
                    <YandexMap coordinates={coordinates} />
                  </div>
                </Modal>
                <div
                  onClick={() => setIsOpenModal(!isOpenModal)}
                  className='flex h-44 flex-1 cursor-pointer flex-col justify-center rounded-2xl p-6 shadow-md md:h-56 lg:col-span-3'
                >
                  <Typography variant='s-bold' className='text-black mb-1'>
                    Информация о туре
                  </Typography>
                  <Typography variant='s-bold' className='text-black'>
                    Отель, рейс/вылет, страховка,трансфер и др.
                  </Typography>
                </div>
                <div className='hidden h-44 flex-1 items-center justify-center p-6 md:h-56 lg:flex'>
                  <ButtonCustom
                    variant='primary'
                    size='l'
                    className='col-snap-1 justify-end self-center lg:flex'
                  >
                    <Typography variant='s-bold'>
                      {hotel?.rooms?.length > 0 &&
                        hotel.rooms[0].calendar_dates?.length > 0 && (
                          <Typography variant='s-bold'>
                            {`${hotel.rooms[0].calendar_dates[0].price}₽ за ${hotel.rooms[0].number_of_adults === 1 ? '1-го' : `${hotel.rooms[0].number_of_adults}-х`}`}
                          </Typography>
                        )}
                    </Typography>
                  </ButtonCustom>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
      {
        <Modal getState={setIsOpenModal} isOpen={isOpenModal}>
          <ModalTours type={'trip'} />
        </Modal>
      }
    </>
  );
}
