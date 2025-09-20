'use client';

import { Suspense } from 'react';

import { StocksTours } from '@/widgets/stocks/StocksTours';

export default function StocksToursPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <StocksTours />
    </Suspense>
  );
}
