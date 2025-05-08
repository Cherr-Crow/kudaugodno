'use client';

import Link from 'next/link';

import { OfferCard } from '@/entities/offer-card';
import { useGetWhatAboutHotelsQuery } from '@/servicesApi/hotelsApi';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IHotOffer } from './HotOffer.types';

export function HotOffer({ className, link, title, type }: IHotOffer) {
  const { data: selection } = useGetWhatAboutHotelsQuery();

  const handleSaveId = (id: number) => {
    localStorage.setItem('selectedHotelId', `${id}`);
  };

  if (!selection || selection.length === 0) {
    return (
      <div className='container mb-5 md:mb-8'>
        <div className='rounded-[20px] bg-blue-50 p-6 text-center shadow-lg'>
          <Typography variant='l-bold'>
            Пока нет подборок для отображения :( Создайте их в админке!
          </Typography>
        </div>
      </div>
    );
  }

  const { name_set: selectionName, hotel } = selection[0];
  const hotels = hotel.length === 3 ? hotel : hotel.slice(0, 3);

  return (
    <section className={className}>
      <div className='container'>
        <div className='mb-5 flex items-center justify-between md:mb-8'>
          {hotels && Array.isArray(hotels) && hotels.length > 0 && (
            <Typography
              variant='l'
              className='font-semibold md:text-2xl lg:text-[32px]'
            >
              {type === 'hotel' ? `${selectionName}?` : title}
            </Typography>
          )}
          {link && (
            <div className='hidden items-center gap-5 md:flex md:pr-2 lg:gap-6 lg:pr-3'>
              <Link href={link}>
                <Typography className='md:text-lg'>Смотреть больше</Typography>
              </Link>
              <SvgSprite name='arrow-pointer' width={15} />
            </div>
          )}
        </div>
        <ul className='grid gap-3 md:grid-cols-2 md:gap-5 lg:grid-cols-3'>
          {hotels &&
            hotels.length > 0 &&
            hotels.map((offer, i) => (
              <li
                className={i === 2 ? 'md:hidden lg:block' : ''}
                key={i}
                onClick={() => handleSaveId(offer.id)}
              >
                <Link href={`hotel-page?type=Отели&hotelId=${offer.id}`}>
                  <OfferCard offer={offer} />
                </Link>
              </li>
            ))}
        </ul>
        {link && (
          <div className='mt-6 flex items-center justify-end gap-4 pr-4 md:hidden'>
            <Link href={link}>
              <Typography variant='m-bold' className='text-grey-950 md:text-2xl'>
                Смотреть больше
              </Typography>
            </Link>
            <SvgSprite name='arrow-pointer' width={15} color='#363636' />
          </div>
        )}
      </div>
    </section>
  );
}
