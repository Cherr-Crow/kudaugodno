import { Swiper, SwiperSlide } from 'swiper/react';

import { IHotelPhotoBlock } from './HotelPhotoBlock.types';
import { ButtonCustom } from '../ui/button-custom';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';

export function HotelPhotoBlock({ photos, onShowAllPhoto }: IHotelPhotoBlock) {
  return (
    <>
      {/* отображение фото для таблетки и десктопа */}
      <ul className='hidden md:grid md:grid-cols-[390px_185px_185px] md:grid-rows-[142px_146px] md:gap-5 md:gap-y-5 md:pb-[25px] lg:grid-cols-[580px_281px_281px] lg:grid-rows-[216px_216px] lg:gap-5 lg:pb-7'>
        {photos &&
          photos.map((img, index) => {
            const isFirst = index === 0;
            const isLast = index === photos.length - 1;

            return (
              <li
                key={index}
                className={`relative rounded-[20px] ${isFirst ? 'col-start-1 row-span-2 row-start-1' : ''}`}
              >
                <img
                  src={img.photo ?? photos[0].photo}
                  alt={`Фото отеля ${index + 1}`}
                  className={`h-full w-full rounded-[20px] object-cover ${isLast ? 'opacity-60' : ''}`}
                />

                {isLast && (
                  <ButtonCustom
                    onClick={onShowAllPhoto}
                    variant='tetriary'
                    size='m'
                    className='absolute left-1/2 top-1/2 min-w-[168px] -translate-x-1/2 -translate-y-1/2 md:py-[14px]'
                  >
                    <div className='flex items-center md:gap-2'>
                      <SvgSprite name='image' width={24} />
                      <Typography variant='l-bold'>Все фото</Typography>
                    </div>
                  </ButtonCustom>
                )}
              </li>
            );
          })}
      </ul>

      {/* слайдер для мобилки */}
      <div className='pb-3 md:hidden'>
        <Swiper
          navigation={false}
          loop={true}
          speed={500}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
          }}
          className='z-1 absolute h-[148px]'
        >
          {photos.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image.photo}
                alt={`Фото ${index + 1}`}
                className='h-full w-full rounded-[20px] object-cover'
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}
