'use client';
import { Suspense } from 'react';

import { useRouter } from 'next/navigation';

import { FilterCatalog } from '@/widgets/filter-catalog';

export default function CatalogPage() {
  const router = useRouter();

  const handleTabChange = (newTab: 'Туры' | 'Отели') => {
    router.push(`/catalog?tab=${newTab}`);
  };

  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <FilterCatalog onTabChange={handleTabChange} />
    </Suspense>
  );
}
