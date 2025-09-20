import { useState, useEffect } from 'react';

import { Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { IWzhuh } from '@/types/wzhuh';

import { WzhuhResultArticles } from './result-blocks/WzhuhResultArticles';
import 'swiper/css';
import 'swiper/css/pagination';
import { WzhuhResultHotels } from './result-blocks/WzhuhResultHotels';
import { WzhuhResultTours } from './result-blocks/WzhuhResultTours';
interface Props {
  data: IWzhuh;
  city: string;
  onGenerateAgain: (city: string) => void;
}

export function WzhuhResult({ data, city, onGenerateAgain }: Props) {
  const [visible, setVisible] = useState(false);
  const bigDescription = [
    `${data.description} ${data.description} ${data.description}`,
    `${data.description} ${data.description} ${data.description}`,
    `${data.description} ${data.description} ${data.description}`,
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-all duration-1000 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
    >
      <div className='text-grey-950'>
        <Typography
          variant='l-bold'
          className='mb-5 block md:mb-6 md:text-[32px] md:font-semibold lg:mb-[60px] lg:text-[48px]'
        >
          Маршрут: {data.departure_city} — {data.arrival_city}
        </Typography>

        <div className='mb-[17px] max-h-[159px] overflow-hidden rounded-[20px] md:mb-5 md:max-h-[471px] lg:mb-[22px]'>
          <Swiper
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{
              delay: 5500,
              disableOnInteraction: false,
            }}
            speed={500}
            slidesPerView={1}
            spaceBetween={20}
            modules={[Pagination, Autoplay]}
            className='wzhuhSwiper'
          >
            {data.photos &&
              data.photos.map(({ photos }, i) => (
                <SwiperSlide key={i}>
                  <div className='h-[159px] w-full overflow-hidden rounded-[20px] md:h-[471px]'>
                    <img
                      src={photos}
                      alt={`Фото ${i + 1}`}
                      className='h-full w-full object-cover'
                    />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        <div className='mb-[18px] flex flex-col md:mb-[39px] lg:mb-10'>
          <ul className='wzhuh__list mb-4 pl-[11px] md:mb-5 lg:mb-[22px] lg:flex lg:flex-col lg:gap-2'>
            {bigDescription &&
              bigDescription.map((string, i) => (
                <li key={i} className='relative pl-[14px] md:pl-[19px] lg:pl-[18px]'>
                  <Typography variant='m' className='md:text-[20px] lg:leading-5'>
                    {string}
                  </Typography>
                </li>
              ))}
          </ul>
          <Typography
            variant='l-bold'
            className='mb-4 block md:mb-5 md:text-[24px] md:font-semibold lg:mb-4'
          >
            Лучшее время для поездки
          </Typography>
          <Typography
            variant='m'
            className='mb-4 block md:mb-5 md:text-[20px] md:leading-8'
          >
            {data.best_time_to_travel} Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Atque ullam doloremque provident rerum. Ipsam commodi,
            alias vel corporis quibusdam repellat hic, reiciendis earum itaque dicta
            iusto maxime modi, sint amet.
          </Typography>
          <Typography
            variant='l-bold'
            className='mb-4 block md:text-[24px] md:font-semibold'
          >
            Для кого подойдет?
          </Typography>
          <Typography variant='m' className='md:text-[20px] md:leading-8'>
            {data.suitable_for_whom} Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Quae, laudantium quidem veritatis, aut inventore quasi
            iusto ex, tempore blanditiis deleniti cum. Ex laudantium modi aut
            incidunt ea quos quasi iste?
          </Typography>
        </div>

        <div className='lg:w-[1180px] xl:mx-auto'>
          <WzhuhResultTours tours={data.tours} />

          <WzhuhResultHotels
            arrival_city={data.arrival_city}
            description_hotel={data.description_hotel}
            hotels={data.hotels}
          />

          <WzhuhResultArticles description_blog={data.description_blog} />
        </div>

        <ButtonCustom
          variant='wzhuh'
          size='m'
          className='flex gap-[2px] place-self-center px-[38px] py-[14px] text-white md:px-7 md:py-[21px]'
          onClick={() => onGenerateAgain(city)}
        >
          <Typography variant='l-bold' className=''>
            Сгенерировать еще вариант
          </Typography>
          <SvgSprite
            name='magic-wand'
            width={30}
            height={30}
            color='#fff'
            className='self-end'
          />
        </ButtonCustom>
      </div>
    </div>
  );
}
