'use client';
import React, { useEffect, useState } from 'react';

import { useGetHotelsQuery } from '@/servicesApi/hotelsApi';
import { useGetToursQuery } from '@/servicesApi/toursApi';
import { CatalogList, ICatalog } from '@/widgets/CatalogList/CatalogList';

export default function CatalogData({
  appliedFilters,
  searchProps,
  tab,
  handleToggleFilters,
}: ICatalog) {
  const {
    data: hotels,
    isLoading: isLoadingHotels,
    error: errorHotel,
  } = useGetHotelsQuery({ limit: 10, offset: 0 }, { skip: tab !== 'Отели' });

  const {
    data: tours,
    error: errorTour,
    isLoading: isLoadingTours,
  } = useGetToursQuery({ limit: 10, offset: 0 }, { skip: tab !== 'Туры' });

  const isLoading = isLoadingHotels || isLoadingTours;

  const hasError = (tab === 'Отели' && errorHotel) || (tab === 'Туры' && errorTour);

  const dataToDisplay = tab === 'Отели' ? hotels?.results : tours?.results;

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (isLoading) {
    return <div className='pt-[40px] text-center text-[32px]'>Загрузка...!!!</div>;
  }

  if (hasError || !dataToDisplay) {
    return (
      <div className='text-red-600 pt-[40px] text-center text-[32px]'>
        Ошибка загрузки
      </div>
    );
  }

  return (
    <>
      {isClient && (
        <CatalogList
          handleToggleFilters={handleToggleFilters}
          data={dataToDisplay}
          appliedFilters={appliedFilters}
          tab={tab}
          searchProps={searchProps}
        />
      )}
    </>
  );
}
