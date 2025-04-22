'use client';
import { useEffect, useState, Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import { TourBooking } from '@/widgets/tour-booking';

function TourBookingWithParams() {
  const searchParams = useSearchParams();
  const [tourId, setTourId] = useState<number | null>(null);

  useEffect(() => {
    const tourIdParam = searchParams.get('tourId');
    setTourId(tourIdParam ? Number(tourIdParam) : null);
  }, [searchParams]);

  return tourId ? <TourBooking tourId={tourId} /> : <div>Загрузка...</div>;
}

export default function TourBookingPage() {
  return (
    <Suspense fallback={<div>Загрузка страницы бронирования...</div>}>
      <TourBookingWithParams />
    </Suspense>
  );
}
