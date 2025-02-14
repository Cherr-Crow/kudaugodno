/* eslint-disable react/no-children-prop */
import React from 'react';

import { ImageSlider } from '@/shared/hotel-page/image-slider';
import { RoomAmenities } from '@/shared/hotel-page/room-amenities';
import { RoomDescription } from '@/shared/hotel-page/room-description';
import { RoomPricing } from '@/shared/hotel-page/room-pricing';
import { RoomSquare } from '@/shared/hotel-page/room-square';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Select } from '@/shared/ui/select';

const testList = ['   1', '   2', '   3', '   4', '   5', '   6', '   7'];

interface IRoomCardProps {
  id: number;
  name: string;
  description: string;
  quadrature: string;
  amenities: string;
  price: number;
  images: string[];
  hasChild?: boolean; // добавляем опциональный параметр hasChild
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomCard: React.FC<IRoomCardProps> = ({
  id,
  name,
  description,
  quadrature,
  amenities,
  price,
  images,
  hasChild,
}) => {
  return (
    <div className='mb-3 w-full rounded-xl bg-white md:flex md:shadow-lg'>
      <h3 className='mt-4 block text-lg font-bold md:hidden lg:mb-4'>{name}</h3>
      <div className='md:w-1/3'>
        <div className='overflow-hidden rounded-xl'>
          <ImageSlider images={images} />
        </div>
      </div>
      <div className='room-details md:w-2/3'>
        <div className='rounded-xl p-5 shadow-lg md:shadow-none'>
          <h3 className='hidden text-lg font-bold md:block'>{name}</h3>
          <div className='w-full md:hidden'>
            <div className='flex-col'>
              <RoomDescription description={description} />
              <RoomSquare quadrature={quadrature} />
            </div>

            <RoomAmenities amenities={amenities} />
            <div className='mb-4 mt-4 flex md:w-full md:flex-col'>
              <Typography variant='m' children='Колличество номеров' />
              <div className='ml-auto md:ml-0'>
                <Select options={testList} color='blue' size='mobile' />
              </div>
            </div>
          </div>
          <div className='flex lg:mt-4'>
            <div className='flex'>
              <div className='hidden flex-1 md:block'>
                <RoomDescription description={description} />
                <RoomSquare quadrature={quadrature} />
              </div>
              <div className='lg:ml-11'>
                <div className='flex items-center'>
                  <SvgSprite
                    name='room-guests'
                    width={48}
                    height={32}
                    className='hidden md:block'
                  />
                  {hasChild && (
                    <div className='hidden md:flex'>
                      {' '}
                      +
                      <SvgSprite
                        name='room_guest_child'
                        width={32}
                        className='ml-2 hidden md:block'
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='ml-auto flex justify-end'>
              <div className='hidden md:flex md:justify-end md:text-xs lg:text-base'>
                <RoomAmenities amenities={amenities} />
              </div>
              <div className='hidden justify-end md:ml-2 md:block'>
                <Typography
                  variant='m'
                  children='Колличество номеров'
                  className='justify-end md:text-xs lg:text-base'
                />
                <div className='ml-auto flex justify-center md:ml-2'>
                  <Select
                    options={testList}
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
              <h3 className='mr-6 flex w-full'>17-27 июля</h3>
            </div>

            <div className='block'>
              <RoomPricing price={price} />
            </div>
            <div className='flex justify-center sm:items-center'>
              <ButtonCustom variant='primary' size='s' className=' '>
                <div className='flex w-full items-center justify-center'>
                  <Typography variant='m-bold' children='Бронировать ' />
                </div>
              </ButtonCustom>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
