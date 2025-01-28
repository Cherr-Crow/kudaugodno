import React from 'react';
import { Typography } from '../typography';
import { Hotel } from '@/types/hotel';

interface HotelComponentReviewProps {
  hotel: Hotel;
  showAllReviews: boolean; 
}

export function HotelComponentReview({ hotel, showAllReviews }: HotelComponentReviewProps) {
  if (!hotel || !hotel.reviews || hotel.reviews.length === 0) {
    return null;
  }

  return (
    <div
      className={`transition-max-height duration-300 ease-in-out ${
        showAllReviews ? 'max-h-[500px] overflow-y-scroll' : 'max-h-0 overflow-hidden'
      }`}
    >
      {hotel.reviews.map((review) => (
        <div key={review.id} className="mb-4 border-b pb-4">
          <div className="mb-2 flex items-center gap-3">
            <img
              src={review.userPhoto}
              alt={review.username}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <Typography variant="s" className="font-semibold">
                {review.username}
              </Typography>
            </div>
            <div className="ml-auto rounded-lg bg-green-secondary px-2 py-1 text-sm font-medium md:px-3 md:py-2">
              {review.rating}
            </div>
          </div>
          <Typography variant="xs" className="text-gray-500 mb-2">
            {review.date}
          </Typography>
          <Typography variant="s" className="text-gray-700 mb-2">
            {review.text}
          </Typography>
        </div>
      ))}
    </div>
  );
}
