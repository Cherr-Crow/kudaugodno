'use client';
import React, { useEffect, useState } from 'react';

import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { HotelCatalog } from '@/widgets/hotel-catalog';

export default function CatalogHotels() {
  const { data, error, isLoading } = useGetHotelsQuery({ limit: 10, offset: 0 });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...!!!</div>;
  }

  if (error || !data?.results) {
    return (
      <div className='text-red-600 pt-[40px] text-center text-[32px]'>
        Ошибка загрузки
      </div>
    );
  }

  return (
    <div className='pt-6'>{isClient && <HotelCatalog hotels={data.results} />}</div>
  );
}
