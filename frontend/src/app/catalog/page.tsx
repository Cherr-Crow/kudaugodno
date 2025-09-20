'use client';

import { Suspense } from 'react';

import { FilterCatalog } from '@/widgets/filter-catalog';

export default function CatalogPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <FilterCatalog />
    </Suspense>
  );
}
