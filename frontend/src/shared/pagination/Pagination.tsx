import React, { useEffect, useState } from 'react';

import { IPagination } from './Pagination.types';
import { SvgSprite } from '../ui/svg-sprite';

type Dot = { dots: true; from: number; to: number };
type Visible = number | Dot;

export function Pagination({ totalItems, pageSize = 20, onChange }: IPagination) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page > totalPages) {
      const clamped = totalPages;
      setPage(clamped);
      onChange((clamped - 1) * pageSize, pageSize);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalPages]);

  const handlePageChange = (newPage: number) => {
    const clamped = Math.max(1, Math.min(newPage, totalPages));
    if (clamped === page) return;
    setPage(clamped);
    onChange((clamped - 1) * pageSize, pageSize);
  };

  const getVisiblePages = (): Visible[] => {
    if (totalPages <= 6) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const setPages = new Set<number>();
    setPages.add(1);
    setPages.add(totalPages);

    for (let i = page - 1; i <= page + 1; i++) {
      if (i > 1 && i < totalPages) setPages.add(i);
    }

    if (page <= 3) {
      setPages.add(2);
      setPages.add(3);
      setPages.add(4);
    }

    if (page >= totalPages - 2) {
      setPages.add(totalPages - 1);
      setPages.add(totalPages - 2);
      setPages.add(totalPages - 3);
    }

    const sorted = Array.from(setPages).sort((a, b) => a - b);
    const result: Visible[] = [];

    for (let i = 0; i < sorted.length; i++) {
      if (i > 0 && sorted[i] - sorted[i - 1] > 1) {
        result.push({ dots: true, from: sorted[i - 1] + 1, to: sorted[i] - 1 });
      }
      result.push(sorted[i]);
    }

    return result;
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex items-center gap-2 pb-10'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='p-1 disabled:opacity-50'
        aria-label='prev'
      >
        <SvgSprite name='arrow' className='rotate-180' />
      </button>

      {visiblePages.map((p, idx) =>
        typeof p === 'number' ? (
          <button
            key={`page-${p}`}
            onClick={() => handlePageChange(p)}
            className={`flex h-8 min-w-[32px] items-center justify-center px-2 ${
              p === page
                ? 'rounded-lg border border-blue-500 text-blue-500'
                : 'hover:bg-gray-100'
            }`}
            aria-current={p === page ? 'page' : undefined}
          >
            {p}
          </button>
        ) : (
          <button
            key={`dots-${idx}`}
            onClick={() => {
              const middle = Math.floor((p.from + p.to) / 2);
              handlePageChange(middle);
            }}
            className='text-gray-500 px-2 hover:text-blue-500'
          >
            …
          </button>
        ),
      )}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className='p-1 disabled:opacity-50'
        aria-label='next'
      >
        <SvgSprite name='arrow' width={24} height={24} />
      </button>
    </div>
  );
}
