'use client';

import { useEffect, useState, Suspense } from 'react';

import { useSearchParams } from 'next/navigation';

import { HotelBooking } from '@/widgets/hotel-booking';

function HotelBookingWithParams() {
  const searchParams = useSearchParams();
  const [hotelId, setHotelId] = useState<number | null>(null);

  useEffect(() => {
    const hotelIdParam = searchParams.get('hotelId');
    setHotelId(hotelIdParam ? Number(hotelIdParam) : null);
  }, [searchParams]);

  return hotelId ? <HotelBooking hotelId={hotelId} /> : <div>Загрузка...</div>;
}

export default function HotelBookingPage() {
  return (
    <Suspense fallback={<div>Загрузка страницы бронирования...</div>}>
      <HotelBookingWithParams />
    </Suspense>
  );
}
