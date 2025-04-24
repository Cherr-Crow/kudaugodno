import React, { useState } from 'react';

import { IHotel } from '@/types/hotel';

import { HotelComponentReview } from '../hotel-component-review';
import { Typography } from '../typography';

interface HotelComponentButtonMoreReviewProps {
  hotel: IHotel;
}

export function HotelComponentButtonMoreReview({
  hotel,
}: HotelComponentButtonMoreReviewProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleToggleReviews = () => {
    setShowAllReviews((prevState) => !prevState);
  };

  if (!hotel.reviews || hotel.reviews.length === 0) {
    return null;
  }

  return (
    <div key={hotel.id} className='mb-4'>
      <div className='group mb-4 flex items-center justify-end gap-0.5'>
        <button
          className='flex items-center gap-1 text-blue-600 hover:underline'
          onClick={handleToggleReviews}
        >
          <Typography variant='m'>
            {showAllReviews
              ? 'Скрыть отзывы'
              : `Еще ${hotel.reviews.length} отзывов`}
          </Typography>
        </button>
      </div>
      <HotelComponentReview hotel={hotel} showAllReviews={showAllReviews} />
    </div>
  );
}
