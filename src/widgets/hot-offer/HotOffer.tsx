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
        <div className='mb-5 flex items-center justify-between md:mb-6 lg:mb-5'>
          {hotels && Array.isArray(hotels) && hotels.length > 0 && (
            <Typography
              variant='l'
              className='font-semibold md:text-2xl lg:text-[32px]'
            >
              {type === 'hotel' ? `${selectionName}?` : title}
            </Typography>
          )}
          {link && (
            <Link
              href={link}
              className='hidden items-center gap-5 py-3 md:flex md:pr-2 lg:gap-6 lg:pr-3'
            >
              <Typography className='md:text-lg'>Смотреть больше</Typography>
              <SvgSprite name='arrow-pointer' width={15} />
            </Link>
          )}
        </div>
      </div>
      <div className='hide-scroll overflow-auto md:container md:overflow-visible'>
        <ul className='flex flex-nowrap gap-3 px-[16px] md:grid md:grid-cols-2 md:gap-5 md:px-0 lg:grid-cols-3'>
          {hotels &&
            hotels.length > 0 &&
            hotels.map((offer, i) => (
              <li
                className={`mb-5 min-h-[372px] min-w-80 md:mb-0 md:first:pl-0 md:last:pr-0 ${i === 2 ? 'md:hidden lg:block' : ''}`}
                key={i}
                onClick={() => handleSaveId(offer.id)}
              >
                <OfferCard offer={offer} />
              </li>
            ))}
        </ul>
      </div>
      <div className='container'>
        {link && (
          <Link
            href={link}
            className='mt-6 flex items-center justify-end gap-4 pr-4 md:hidden'
          >
            <Typography variant='m-bold' className='text-grey-950 md:text-2xl'>
              Смотреть больше
            </Typography>
            <SvgSprite name='arrow-pointer' width={15} color='#363636' />
          </Link>
        )}
      </div>
    </section>
  );
}
