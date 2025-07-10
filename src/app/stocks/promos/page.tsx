'use client';

// import { useEffect, useMemo, useState } from 'react';

// import { useSearchParams } from 'next/navigation';
// import { useScreen } from 'usehooks-ts';

import Link from 'next/link';

import { PromoCardList } from '@/entities/promo-card/PromoCard';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SvgSprite } from '@/shared/ui/svg-sprite';
// import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/ui/typography';

export default function StocksPromosPage() {
  // const screen = useScreen();
  // const [cardsToShow, setCardsToShow] = useState(4);

  // const initialCount = useMemo(() => {
  //     if (!screen?.width) return 3;
  //     if (screen.width >= 1024) return 12;
  //     if (screen.width >= 768) return 6;
  //     return 3;
  // }, [screen]);

  // useEffect(() => {
  //     setCardsToShow(initialCount);
  // }, [initialCount]);

  // const increment = initialCount;

  return (
    <div className='mx-auto max-w-[1440px]'>
      <div className='px-4 pt-[26px] md:px-20 md:pt-0 lg:px-[130px]'>
        <Breadcrumbs
          className='hidden md:visible md:mb-3 md:flex lg:mb-1'
          paths={[
            { label: 'Акции', href: '/stocks' },
            { label: 'Акции и спецпредложения' },
          ]}
        />
        <div className='mb-3 flex md:mb-6 lg:mb-8'>
          <Link href='/stocks/' className='mx-2 flex items-center md:hidden'>
            <SvgSprite name='arrow' className='rotate-180' />
          </Link>
          <Typography variant='h1' className='text-blue-950 md:text-5xl lg:text-7xl'>
            Акции и спецпредложения
          </Typography>
        </div>
        <PromoCardList promoPage={true} />
        {/* {hasMore && (
                <div className='mt-8 flex items-center justify-center'>
                    <ButtonCustom
                        variant='tetriary'
                        size='m'
                        type='button'
                        className='mt-2 xl:mt-0'
                        style={{ gridArea: 'btnSubmit' }}
                        onClick={() => setCardsToShow((prev) => prev + increment)}
                    >
                        <Typography variant='l-bold'>Показать ещё</Typography>
                    </ButtonCustom>
                </div>
            )} */}
      </div>
    </div>
  );
}
