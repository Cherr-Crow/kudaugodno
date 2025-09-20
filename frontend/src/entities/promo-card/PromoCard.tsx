'use client';

import React, { useMemo, useState } from 'react';

import { useWindowSize } from 'usehooks-ts';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';

import { promoData } from './PromoCard.types';

interface PromoCardListProps {
  promoPage?: boolean;
}

export function PromoCardList({ promoPage = false }: PromoCardListProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    });
  };
  const { width } = useWindowSize();
  const isDesktop = width >= 1380;

  const visiblePromoData = useMemo(() => {
    const count = isDesktop ? 3 : 4;
    return promoData.slice(0, count);
  }, [isDesktop, promoData]);

  return (
    <ul
      className={
        promoPage
          ? 'grid grid-cols-1 gap-3 pb-10 md:grid md:grid-cols-2 md:gap-5 md:pb-20 lg:grid-cols-3'
          : `hide-scroll flex gap-3 overflow-x-auto md:grid md:grid-cols-2 md:gap-x-5 md:gap-y-4 md:overflow-visible lg:grid-cols-3`
      }
    >
      {visiblePromoData.map(({ id, img, title, text, promoCode }, index) => (
        <li
          key={id}
          className='mb-10 h-full min-w-[316px] overflow-hidden rounded-3xl bg-white shadow-md first:ml-4 last:mr-4 md:m-0 md:min-h-[503px] md:first:ml-0 md:last:mr-0'
        >
          <img
            src={img}
            alt={title}
            className='h-[152px] w-full object-cover md:min-h-[246px]'
          />
          <div className='relative mt-[-16px] flex min-h-[250px] w-full flex-col rounded-t-3xl bg-white px-4 py-3 pb-10 md:mt-[-18px] md:min-h-[275px] md:px-5 md:py-5'>
            <div className='flex-1 md:px-1'>
              <Typography
                variant='h5'
                className='mb-[-4px] leading-[1.2] md:mb-5 md:leading-[23px]'
              >
                {title}
              </Typography>
              <Typography
                variant='m'
                className='text-[14px] leading-[16px] text-grey-600'
              >
                {text}
              </Typography>
            </div>
            <ButtonCustom
              variant='secondary'
              size='s'
              className='mt-auto w-full py-2 md:py-5'
              onClick={() => handleCopy(promoCode, index)}
            >
              <Typography variant='m-bold' className='md:text-xl'>
                {copiedIndex === index
                  ? 'Промокод скопирован!'
                  : 'Скопировать промокод'}
              </Typography>
            </ButtonCustom>
          </div>
        </li>
      ))}
    </ul>
  );
}
