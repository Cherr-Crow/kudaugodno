'use client';

import React from 'react';
import { useEffect, useState } from 'react';

import { useSearchParams, useRouter } from 'next/navigation';

import { useLazyGetWzhuhQuery } from '@/servicesApi/wzhuhApi';
import { WzhuhError } from '@/widgets/wzhuh/WzhuhError';
import { WzhuhLoader } from '@/widgets/wzhuh/WzhuhLoader';
import { WzhuhResult } from '@/widgets/wzhuh/WzhuhResult';
import { WzhuhSearchBlock } from '@/widgets/wzhuh/WzhuhSearchBlock';

export function Wzhuh() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get('city');
  const id = searchParams.get('id');

  const [fetchWzhuh, { data }] = useLazyGetWzhuhQuery();

  const [animationComplete, setAnimationComplete] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [initStarted, setInitStarted] = useState(() => !!(id || city));

  const shouldShowResult = animationComplete && dataLoaded && id && data;
  const shouldShowLoader = initStarted && !animationComplete;
  const shouldShowError = animationComplete && dataLoaded && hasError;

  useEffect(() => {
    if (id || city) {
      runFullLoad(Number(id) ?? city);
    }
  }, []);

  const runFullLoad = async (param: string | number) => {
    setInitStarted(true);
    setAnimationComplete(false);
    setDataLoaded(false);
    setHasError(false);

    const delay = new Promise((resolve) => setTimeout(resolve, 1700));

    try {
      const result = await fetchWzhuh(param).unwrap();
      if (typeof param === 'string' && result?.id) {
        router.push(`?city=${encodeURIComponent(param)}&id=${result.id}`);
      }
    } catch {
      setHasError(true);
    } finally {
      await delay;
      setAnimationComplete(true);
      setDataLoaded(true);
    }
  };

  const handleSearch = (inputCity: string) => {
    runFullLoad(inputCity);
  };

  const handleResetError = () => {
    setHasError(false);
  };

  return (
    <section className='mb-10 mt-[24px] md:mb-[60px] md:mt-12 lg:mb-20 lg:mt-[60px]'>
      <div className='container'>
        {shouldShowLoader ? (
          <WzhuhLoader />
        ) : shouldShowResult ? (
          <WzhuhResult
            data={data}
            city={city ?? ''}
            onGenerateAgain={handleSearch}
          />
        ) : shouldShowError ? (
          <WzhuhError onRepeat={handleResetError} />
        ) : (
          <div className='relative overflow-hidden rounded-[20px] bg-blue-200 bg-[url("/wzhuh-search-block-375.png")] bg-[length:110%_110%] bg-[position:62%_5%] bg-no-repeat shadow-lg md:bg-[url("/wzhuh-search-block-960.png")] lg:bg-[url("/wzhuh-search-block-1440.png")]'>
            <div className='absolute bottom-[5px] right-[-15px] hidden md:block md:h-[170px] md:w-[192px] lg:bottom-[-54px] lg:right-[-7px] lg:h-[235px] lg:w-[237px]'>
              <img src='/frog_with_purse.png' alt='Лягушечка с кошельком' />
            </div>
            <WzhuhSearchBlock onSearch={handleSearch} />
          </div>
        )}
      </div>
    </section>
  );
}
