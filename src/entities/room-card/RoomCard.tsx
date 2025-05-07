/* eslint-disable react/no-children-prop */
import React, { useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { ImageSlider } from '@/shared/hotel-page/image-slider';
import { RoomAmenities } from '@/shared/hotel-page/room-amenities';
import { RoomDescription } from '@/shared/hotel-page/room-description';
import { RoomPricing } from '@/shared/hotel-page/room-pricing';
import { RoomSquare } from '@/shared/hotel-page/room-square';
import { Modal } from '@/shared/modal';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Select } from '@/shared/ui/select';
import { Typography } from '@/shared/ui/typography';
import { RoomType } from '@/types/room';
import { RoomModal } from '@/widgets/room-modal';

interface IRoomCardProps {
  room: RoomType;
  key: number;
  hotelId?: number | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomCard: React.FC<IRoomCardProps> = ({ room, hotelId }) => {
  const arrNumbersForSelect = [];
  for (let i = room.quantity_rooms; i > 0; i--) {
    arrNumbersForSelect.unshift(String(i));
  }

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const searchParams = useSearchParams();
  const router = useRouter();

  const [type, setType] = useState<string>('');

  const [departureCity, setDepartureCity] = useState<string>('');
  const [where, setWhere] = useState<string>('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [nights, setNights] = useState('Количество ночей');
  const [guests, setGuests] = useState('Количество гостей');

  useEffect(() => {
    setType(searchParams.get('type') || '');
    setDepartureCity(searchParams.get('departureCity') || '');
    setWhere(searchParams.get('where') || '');
    setCheckInDate(searchParams.get('checkInDate') || '');
    setCheckOutDate(searchParams.get('checkOutDate') || '');
    setNights(searchParams.get('nights') || 'Количество ночей');
    setGuests(searchParams.get('guests') || 'Количество гостей');
  }, [searchParams]);

  const handleBooking = () => {
    const searchData = {
      hotelId: hotelId ? hotelId.toString() : '',
      roomId: room.id ? room.id.toString() : '',
      type,
      departureCity,
      where,
      checkInDate,
      checkOutDate,
      nights,
      guests,
    };
    localStorage.setItem('searchData', JSON.stringify(searchData));

    const url = type === 'Туры' ? '/tour-booking' : '/hotel-booking';
    router.push(`${url}?${new URLSearchParams(searchData).toString()}`);
  };

  return (
    <div className='relative mb-3 w-full rounded-xl bg-white md:flex md:shadow-lg'>
      <h3 className='text-5 mt-4 block font-black text-blue-950 sm:text-[18px] md:hidden md:text-[24px] md:font-semibold lg:mb-4'>
        {room.category}
      </h3>
      <div className='md:w-[36%]'>
        <div className='relative overflow-hidden rounded-xl'>
          <ImageSlider images={room.photo} />
          <div
            className='absolute left-[40px] top-[20px] z-10 m-auto flex h-[86%] w-[35%] cursor-pointer items-center justify-center text-center text-[0px] font-bold transition hover:bg-grey-opacity hover:text-[24px] sm:left-[70px] sm:w-[75%] sm:hover:text-[32px] md:w-[55%] lg:w-[70%]'
            onClick={handleOpenModal}
          >
            Открыть комнату
          </div>
        </div>
      </div>
      <div className='room-details md:w-2/3'>
        <div className='rounded-xl p-5 shadow-lg md:shadow-none'>
          <h3 className='text-5 hidden font-black text-blue-950 sm:text-[18px] md:block md:text-[24px] md:font-semibold'>
            {room.category}
          </h3>
          <div className='w-full md:hidden'>
            <div className='flex-col'>
              <RoomDescription description={String(room.double_bed)} />
              <RoomSquare quadrature={String(room.area)} />
            </div>

            <RoomAmenities amenities={room.type_of_meals} />
            <div className='mb-4 mt-4 flex md:w-full md:flex-col'>
              <Typography variant='m' children='Количество номеров' />
              <div className='ml-auto md:ml-0'>
                <Select options={arrNumbersForSelect} color='blue' size='mobile' />
              </div>
            </div>
          </div>
          <div className='flex lg:mt-4'>
            <div className='flex'>
              <div className='mr-1 hidden flex-1 md:block'>
                <RoomDescription description={String(room.double_bed)} />
                <RoomSquare quadrature={String(room.area)} />
              </div>
              <div className='lg:ml-11'>
                <div className='flex items-center'>
                  <div className='m-0 flex items-center pt-3 lg:mb-5'>
                    <div className='flex items-center'>
                      {room.number_of_adults
                        ? Array.from({ length: room.number_of_adults }).map(
                            (_, index) => (
                              <div
                                key={`${index}/room.number_of_adults`}
                                className='mr-1 h-[24px] w-[12px] bg-cover'
                                style={{
                                  backgroundImage: `url('/human.png')`,
                                }}
                              ></div>
                            ),
                          )
                        : null}
                    </div>{' '}
                    {room.number_of_children ? '+ ' : ''}
                    <div className='ml-1 flex'>
                      {room.number_of_children
                        ? Array.from({ length: room.number_of_children }).map(
                            (_, index) => (
                              <div
                                key={`${index}/room.number_of_children`}
                                className='mr-1 h-[22px] w-[15px] bg-cover'
                                style={{
                                  backgroundImage: `url('/fonchild.png')`,
                                }}
                              ></div>
                            ),
                          )
                        : null}
                    </div>
                  </div>
                  {/* <SvgSprite
                    name='room-guests'
                    width={48}
                    height={32}
                    className='hidden md:block'
                  />
                  {room.number_of_children && (
                    <div className='hidden md:flex'>
                      {' '}
                      +
                      <SvgSprite
                        name='room_guest_child'
                        width={32}
                        className='ml-2 hidden md:block'
                      />
                    </div>
                  )} */}
                </div>
              </div>
            </div>
            <div className='ml-auto flex justify-end'>
              <div className='hidden md:flex md:justify-end md:text-xs lg:text-base'>
                <RoomAmenities amenities={room.type_of_meals} />
              </div>
              <div className='hidden justify-end md:ml-2 md:block'>
                <Typography
                  variant='m'
                  children='Количество номеров'
                  className='text-4 justify-end font-normal text-blue-950 md:text-[13px] lg:text-[16px]'
                ></Typography>
                <div className='ml-auto flex justify-center md:ml-2'>
                  <Select
                    options={arrNumbersForSelect}
                    color='blue'
                    size='mobile'
                    className='justify-end'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='md:ml-20 md:flex md:gap-4 lg:mt-5 lg:justify-end'>
            <div className='hidden md:flex'>
              <h3 className='text-4 mr-6 flex w-full font-normal text-blue-950 lg:text-[20px]'>
                17-27 июля
              </h3>
            </div>

            <div className='block'>
              <RoomPricing price={room.price} />
            </div>
            <div className='flex justify-center sm:items-center'>
              <ButtonCustom
                variant='primary'
                size='s'
                className=''
                onClick={handleBooking}
              >
                <div className='flex w-full items-center justify-center'>
                  <Typography variant='m-bold' children='Бронировать ' />
                </div>
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={isOpenModal} getState={handleCloseModal}>
        <RoomModal room={room} />
      </Modal>
    </div>
  );
};

export default RoomCard;
