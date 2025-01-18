'use client';
import React, { useState } from 'react';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchForm } from '@/shared/ui/search-form';
import { HotelBlockPhotosReview } from '@/widgets/hotel-block-photos-review';

export default function CatalogHotels() {
  const [tabClick, setTabClick] = useState<string>('Туры');

  return (
    <>
      <section className="container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]">
        <Breadcrumbs />
        <SearchForm
          className={'mb-[40px] border-solid shadow-lg xl:mb-[313px]'}
          tabClick={tabClick}
        />
        <HotelBlockPhotosReview /> 
      </section>
    </>
  );
}
