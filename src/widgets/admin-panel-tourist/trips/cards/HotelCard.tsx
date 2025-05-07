'use client';
import { useState } from 'react';

import { Rating } from '@/shared/rating';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';
import { ModalBookingCancellation } from '@/widgets/modal-booking-cancellation';

interface HotelCardProps {
  type: string;
}

export function HotelCard({ type }: HotelCardProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleToggleBookingCancellationModal = () => {
    setIsModalOpen(!isModalOpen);
    if (!isModalOpen) {
      document.body.style.overflow = 'hidden';
      if (window.innerWidth > 1024) {
        document.body.style.paddingRight = `17px`;
      }
    } else {
      document.body.style.overflow = 'auto';
      if (window.innerWidth > 1024) {
        document.body.style.paddingRight = '0';
      }
    }
  };

  return (
    <>
      <div className='rounded-[20px] bg-white shadow-lg md:flex md:flex-row-reverse md:border-[1px] md:border-grey-100'>
        <div className='relative h-[216px] rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 md:h-auto md:w-[59%] md:rounded-[20px] lg:min-w-[340px]'>
          <img
            className='h-full w-full rounded-tl-[20px] rounded-tr-[20px] md:rounded-[20px]'
            src='/admin-panel-tourist-tour.jpg'
            alt='Фото'
          />
          <div className='absolute left-4 top-4 flex items-center rounded-[20px] bg-white px-3 py-2 md:left-12 md:top-6 lg:left-14'>
            <div className='mr-2 h-8 w-8 rounded-full bg-green-600 md:h-6 md:w-6 lg:h-8 lg:w-8'></div>
            <Typography variant='m-bold' className='lg:text-[20px]'>
              Забронировано
            </Typography>
          </div>
        </div>

        <div className='z-1 relative mt-[-20px] rounded-[20px] bg-white px-4 py-4 md:mt-0 md:w-full md:px-5 md:py-5 md:pb-5 md:pr-10 lg:min-w-[562px] lg:pb-6 lg:pt-5'>
          <div className='mb-5 flex justify-between md:mb-14 lg:mb-8'>
            <div>
              <div className='pb-2'>
                <Rating category={3} starSize={16} gap={2} />
              </div>
              <Typography
                variant='m-bold'
                className='block md:text-[20px] lg:mb-4 lg:text-[24px]'
              >
                Norke Варшавская
              </Typography>
            </div>
            {type === 'active' ? (
              <button
                className='h-fit w-fit rounded-full bg-blue-200 px-4 py-2 text-[13px] font-medium hover:bg-blue-100 hover:shadow-lg active:bg-blue-400 md:px-8 md:py-2 md:text-[16px] lg:px-8 lg:py-3 lg:text-[20px]'
                onClick={handleToggleBookingCancellationModal}
              >
                Отменить бронь
              </button>
            ) : (
              <button
                className='h-fit w-fit rounded-full bg-blue-200 px-4 py-2 text-[13px] font-medium hover:bg-blue-100 hover:shadow-lg active:bg-blue-400 md:px-8 md:py-2 md:text-[16px] lg:px-8 lg:py-3 lg:text-[20px]'
                onClick={handleToggleBookingCancellationModal}
              >
                Оставить отзыв
              </button>
            )}
          </div>

          <div className='mb-5 md:mb-8 md:flex lg:mb-7'>
            <div className='mb-4 md:mr-16 lg:mr-[70px]'>
              <Typography
                variant='m'
                className='mb-2 block text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]'
              >
                2 гостя
              </Typography>
              <Typography
                variant='l-bold'
                className='md:text-[16px] md:font-medium lg:text-[20px]'
              >
                23.10–28.10
              </Typography>
            </div>
            <div className='mb-4 md:mr-24 lg:mr-[100px]'>
              <Typography
                variant='m'
                className='mb-2 block text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]'
              >
                Страна, город
              </Typography>
              <Typography
                variant='l-bold'
                className='md:text-[16px] md:font-medium lg:text-[20px]'
              >
                Россия, Москва
              </Typography>
            </div>
            <div className=''>
              <Typography
                variant='m'
                className='mb-2 block text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]'
              >
                Питание
              </Typography>
              <Typography
                variant='l-bold'
                className='md:text-[16px] md:font-medium lg:text-[20px]'
              >
                Завтраки
              </Typography>
            </div>
          </div>

          <div className='md:flex md:justify-end'>
            <ButtonCustom
              variant='secondary'
              size='m'
              className='w-full font-medium md:w-auto md:px-8 md:text-[20px] lg:px-8 lg:py-4'
            >
              Документы по отелю
            </ButtonCustom>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ModalBookingCancellation onClose={handleToggleBookingCancellationModal} />
      )}
    </>
  );
}
