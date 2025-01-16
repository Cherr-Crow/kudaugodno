'use client';
import { Breadcrumbs } from '@/shared/breadcrumbs';
import { SearchForm } from '@/shared/ui/search-form';
import { TabBar } from '@/shared/ui/tab-bar';
import React, { useState } from 'react';
export default function CatalogHotels({ }) {
  const [tabClick, setTabClick] = useState<string>('Туры');
  return (
    <section
      className={`container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]`}
    >
      <Breadcrumbs></Breadcrumbs>
      <SearchForm  className={'shadow-lg border-solid mb-[40px] xl:mb-[313px]'} tabClick={''} />
    </section>
  );
}
