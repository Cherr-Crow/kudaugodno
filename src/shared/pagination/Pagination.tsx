import { useState } from 'react';

import { IPagination } from './Pagination.types';
import { SvgSprite } from '../ui/svg-sprite';

export function Pagination({ totalItems, pageSize = 20, onChange }: IPagination) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const [page, setPage] = useState(1);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    const offset = (newPage - 1) * pageSize;
    onChange(offset, pageSize);
  };

  const getVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (page <= 3) {
      return [1, 2, 3, 4, '...', totalPages];
    }
    if (page >= totalPages) {
      return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    return [1, '...', page - 1, page, page + 1, '...', totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className='flex items-center gap-2 pb-10'>
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='p-1 disabled:opacity-50'
      >
        <SvgSprite name='arrow' className='rotate-180' />
      </button>

      {visiblePages.map((p, idx) =>
        p === '...' ? (
          <span key={idx}>...</span>
        ) : (
          <button
            key={p}
            onClick={() => handlePageChange(p as number)}
            className={`size-[32px] items-center p-[5px] ${
              p === page ? 'rounded-lg border border-blue-500 text-blue-500' : ''
            }`}
          >
            {p}
          </button>
        ),
      )}

      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className='p-1 disabled:opacity-50'
      >
        <SvgSprite name='arrow' width={24} height={24} />
      </button>
    </div>
  );
}
