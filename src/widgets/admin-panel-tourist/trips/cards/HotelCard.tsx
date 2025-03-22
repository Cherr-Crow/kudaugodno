'use client'
import { useState } from "react"

import { Rating } from "@/shared/rating"
import { Typography } from "@/shared/typography"
import { ButtonCustom } from "@/shared/ui/button-custom"
import { ModalBookingCancellation } from "@/widgets/modal-booking-cancellation"

interface HotelCardProps {
  type: string;
}


export function HotelCard({ type }: HotelCardProps) {

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleToggleBookingCancellationModal = () => {
    setIsModalOpen(!isModalOpen)
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
  }

  return (
    <>
      <div className="rounded-[20px] bg-white shadow-lg md:flex md:flex-row-reverse md:border-[1px] md:border-grey-100">

        <div className="relative h-[216px] rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 md:w-[59%] md:h-auto md:rounded-[20px] lg:min-w-[340px]">
          <img className="w-full h-full rounded-tl-[20px] rounded-tr-[20px] md:rounded-[20px]" src="/admin-panel-tourist-tour.jpg" alt="Фото" />
          <div className="absolute top-4 left-4 flex items-center py-2 px-3 bg-white rounded-[20px] md:left-12 md:top-6 lg:left-14">
            <div className="w-8 h-8 mr-2 bg-green-600 rounded-full md:w-6 md:h-6 lg:w-8 lg:h-8"></div>
            <Typography variant="m-bold" className="lg:text-[20px]">Забронировано</Typography>
          </div>
        </div>

        <div className="relative mt-[-20px] z-1 px-4 py-4 rounded-[20px] bg-white md:w-full md:py-5 md:pb-5 md:px-5 md:mt-0 md:pr-10 lg:min-w-[562px] lg:pt-5 lg:pb-6">

          <div className="flex justify-between mb-5 md:mb-14 lg:mb-8">
            <div>
              <div className="pb-2">
                <Rating category={3} starSize={16} gap={2} />
              </div>
              <Typography variant="m-bold" className="block md:text-[20px] lg:mb-4 lg:text-[24px]">Norke Варшавская</Typography>
            </div>
            {type === 'active' ? (
              <button className="py-2 px-4 text-[13px] font-medium bg-blue-200 hover:bg-blue-100 active:bg-blue-400 h-fit w-fit rounded-full hover:shadow-lg md:py-2 md:px-8 md:text-[16px] lg:px-8 lg:py-3 lg:text-[20px]" onClick={handleToggleBookingCancellationModal}>Отменить бронь</button>
            ) : (
              <button className="py-2 px-4 text-[13px] font-medium bg-blue-200 hover:bg-blue-100 active:bg-blue-400 h-fit w-fit rounded-full hover:shadow-lg md:py-2 md:px-8 md:text-[16px] lg:px-8 lg:py-3 lg:text-[20px]" onClick={handleToggleBookingCancellationModal}>Оставить отзыв</button>
            )

            }

          </div>

          <div className="mb-5 md:flex md:mb-8 lg:mb-7">
            <div className="mb-4 md:mr-16 lg:mr-[70px]">
              <Typography variant="m" className="block mb-2 text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]">2 гостя</Typography>
              <Typography variant="l-bold" className="md:text-[16px] md:font-medium lg:text-[20px]">23.10–28.10</Typography>
            </div>
            <div className="mb-4 md:mr-24 lg:mr-[100px]">
              <Typography variant="m" className="block mb-2 text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]">Страна, город</Typography>
              <Typography variant="l-bold" className="md:text-[16px] md:font-medium lg:text-[20px]">Россия, Москва</Typography>
            </div>
            <div className="">
              <Typography variant="m" className="block mb-2 text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]">Питание</Typography>
              <Typography variant="l-bold" className="md:text-[16px] md:font-medium lg:text-[20px]">Завтраки</Typography>
            </div>
          </div>

          <div className="md:flex md:justify-end">
            <ButtonCustom variant="secondary" size='m' className="w-full font-medium md:w-auto md:px-8 md:text-[20px] lg:py-4 lg:px-8">Документы по отелю</ButtonCustom>
          </div>

        </div>

      </div>

      {isModalOpen &&
        <ModalBookingCancellation onClose={handleToggleBookingCancellationModal} />
      }

    </>
  )

}