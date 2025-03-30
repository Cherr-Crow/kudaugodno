'use client';
import { useEffect, useState } from 'react';

import { TourBooking } from '@/widgets/tour-booking';

export default function TourBookingPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <>
          <TourBooking tourId={1} />
        </>
      )}
    </>
  );
}
