'use client';
import React, { useEffect, useState } from 'react';

import { FilterCatalog } from '@/widgets/filter-catalog';

export default function CatalogHotels() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return <div>{isClient && <FilterCatalog initialTab='Отели' />}</div>;
}
