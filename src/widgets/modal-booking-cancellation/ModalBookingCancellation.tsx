import { useState } from 'react';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

interface ModalBookingCancellationProps {
  onClose: () => void;
}

export function ModalBookingCancellation({
  onClose,
}: ModalBookingCancellationProps) {
  const [confirmationType, setConfirmationType] = useState<string>('');

  return (
    <div className='fixed inset-0 bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.6)]'>
      <div className="lg:ronded-[20px] flex w-[348px] flex-col justify-center rounded-xl bg-blue-100 bg-[url('/bg-booking-cancellation.png')] bg-no-repeat px-4 pb-20 pt-4 text-center md:w-[800px] md:bg-[url('/bg-booking-cancellation-md.png')] lg:w-[1180px] lg:px-8 lg:pb-10 lg:pt-8">
        <button className='mb-7 ml-auto h-4 w-4 lg:mb-0' onClick={onClose}>
          <SvgSprite name={'cross'} />
        </button>
        {confirmationType === '' ? (
          <>
            <Typography variant='l-bold' className='mb-4 md:text-[32px] lg:mb-4'>
              Отмена бронирования
            </Typography>
            <Typography
              variant='m'
              className='mb-4 md:mx-auto md:max-w-[600px] md:text-[20px] lg:mb-5 lg:leading-8'
            >
              Вы&nbsp;собираетесь отменить бронирование с&nbsp;оплатой напрямую
              в&nbsp;отель. Отмененный заказ не&nbsp;подлежит восстановлению.
            </Typography>
            <div className='mb-7 flex justify-center gap-2 lg:mb-8 lg:gap-6'>
              <ButtonCustom
                variant='secondary'
                size='s'
                className='bg-white lg:border-4 lg:px-14 lg:py-5'
                onClick={() => setConfirmationType('doNotCancel')}
              >
                <Typography variant='m-bold' className='md:px-6 md:text-[20px]'>
                  Не отменять
                </Typography>
              </ButtonCustom>
              <ButtonCustom
                variant='primary'
                size='s'
                className='lg:py-5'
                onClick={() => setConfirmationType('confirmCancellation')}
              >
                <Typography variant='m-bold' className='md:text-[20px]'>
                  {window.innerWidth > 768 ? 'Отменить бронирование' : 'Отменить'}{' '}
                </Typography>
              </ButtonCustom>
            </div>
          </>
        ) : (
          <div className='lg:mx-auto lg:flex lg:max-w-[360px] lg:flex-col lg:justify-center lg:text-center'>
            <Typography variant='l-bold' className='mb-4 md:text-[32px] lg:mb-6'>
              {confirmationType === 'confirmCancellation'
                ? 'Бронирование отменено'
                : 'Ваши данные сохранены'}{' '}
            </Typography>
            <ButtonCustom
              variant='secondary'
              size='s'
              className='mx-auto mb-7 bg-white lg:w-full lg:border-4 lg:px-24 lg:py-5'
              onClick={onClose}
            >
              <Typography variant='m-bold' className='md:text-[20px]'>
                Готово
              </Typography>
            </ButtonCustom>
          </div>
        )}

        <div className='flex justify-center'>
          <img
            src={`/${confirmationType === 'doNotCancel' ? 'happy_jumping_frog' : 'sad_frog_pulling_a_hat'}.png`}
            alt='Грустная лягушка'
            className='max-w-[152px] lg:max-w-[182px]'
          />
        </div>
      </div>
    </div>
  );
}
