'use client';
import React, { useState } from 'react';

import { FilterYear } from '@/shared/filter-year';

export default function ApplicationsPage() {
  const [years] = useState<number[]>([2024, 2023, 2022]);
  return (
    <div className=''>
      <div className='container'>
        <FilterYear yearsArr={years}></FilterYear>
      </div>
    </div>
  );
}
