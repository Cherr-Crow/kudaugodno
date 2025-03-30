'use client';
import { useEffect, useState } from 'react';

import { HotelBooking } from '@/widgets/hotel-booking';

export default function HotelBookingPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <HotelBooking hotelId={1} />
        </>
      )}
    </>
  );
}
