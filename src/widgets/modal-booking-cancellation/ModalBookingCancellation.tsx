import { useState } from "react";

import { SvgSprite } from "@/shared/svg-sprite"
import { Typography } from "@/shared/typography"
import { ButtonCustom } from "@/shared/ui/button-custom"


interface ModalBookingCancellationProps {
  onClose: () => void;
}

export function ModalBookingCancellation({ onClose }: ModalBookingCancellationProps) {

  const [confirmationType, setConfirmationType] = useState<string>('')

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.6)]">
      <div className="flex flex-col w-[348px] pt-4 pb-20 px-4 justify-center rounded-xl text-center bg-blue-100 bg-[url('/bg-booking-cancellation.png')] bg-no-repeat md:w-[800px] md:bg-[url('/bg-booking-cancellation-md.png')] lg:w-[1180px] lg:pb-10 lg:pt-8 lg:px-8 lg:ronded-[20px]">
        <button className="w-4 h-4 ml-auto mb-7 lg:mb-0" onClick={onClose}>
          <SvgSprite name={'cross'} />
        </button>
        {confirmationType === '' ? (
          <>
            <Typography variant="l-bold" className="mb-4 md:text-[32px] lg:mb-4">Отмена бронирования</Typography>
            <Typography variant="m" className="mb-4 md:max-w-[600px] md:mx-auto md:text-[20px] lg:mb-5 lg:leading-8">Вы&nbsp;собираетесь отменить бронирование с&nbsp;оплатой напрямую в&nbsp;отель. Отмененный заказ не&nbsp;подлежит восстановлению.</Typography>
            <div className="flex justify-center gap-2 mb-7 lg:gap-6 lg:mb-8">
              <ButtonCustom variant="secondary" size="s" className="bg-white lg:px-14 lg:py-5 lg:border-4" onClick={() => setConfirmationType('doNotCancel')}>
                <Typography variant="m-bold" className="md:px-6 md:text-[20px]">Не отменять</Typography>
              </ButtonCustom>
              <ButtonCustom variant="primary" size="s" className="lg:py-5" onClick={() => setConfirmationType('confirmCancellation')}>
                <Typography variant="m-bold" className="md:text-[20px]">{window.innerWidth > 768 ? 'Отменить бронирование' : 'Отменить'} </Typography>
              </ButtonCustom>
            </div>
          </>
        ) : (
          <div className="lg:flex lg:flex-col lg:justify-center lg:text-center lg:max-w-[360px] lg:mx-auto">
            <Typography variant="l-bold" className="mb-4 md:text-[32px] lg:mb-6">{confirmationType === 'confirmCancellation' ? 'Бронирование отменено' : 'Ваши данные сохранены'} </Typography>
            <ButtonCustom variant="secondary" size="s" className="mx-auto mb-7 bg-white lg:w-full lg:px-24 lg:py-5 lg:border-4" onClick={onClose}>
              <Typography variant="m-bold" className="md:text-[20px]">Готово</Typography>
            </ButtonCustom>
          </div>
        )
        }

        <div className="flex justify-center">
          <img src={`/${confirmationType === 'doNotCancel' ? 'happy_jumping_frog' : 'sad_frog_pulling_a_hat'}.png`} alt="Грустная лягушка" className="max-w-[152px] lg:max-w-[182px]" />
        </div>
      </div>
    </div>
  )
}
