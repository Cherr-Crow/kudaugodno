import React, { useState } from 'react';
import { Typography } from '../typography';
import { HotelComponentReview } from '../hotel-component-review';
import { Hotel } from '@/types/hotel';

interface HotelComponentButtonMoreReviewProps {
  hotel: Hotel;
}

export function HotelComponentButtonMoreReview({ hotel }: HotelComponentButtonMoreReviewProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const handleToggleReviews = () => {
    setShowAllReviews((prevState) => !prevState);
  };

  if (!hotel.reviews || hotel.reviews.length === 0) {
    return null;
  }

  return (
    <div key={hotel.id} className="mb-4">
      <div className="group flex items-center justify-end gap-0.5 mb-4">
        <button
          className="text-blue-600 hover:underline flex items-center gap-1"
          onClick={handleToggleReviews}
        >
          <Typography variant="m">
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
