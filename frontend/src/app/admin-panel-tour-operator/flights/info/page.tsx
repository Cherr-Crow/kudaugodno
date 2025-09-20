'use client';

import { useRouter, useSearchParams } from 'next/navigation';

import { DetailedFlightInfo } from '@/widgets/admin-panel/added-hotel-field/detailed-flight-info';

export default function Info() {
  const id = useSearchParams().get('id');
  const router = useRouter();

  if (!id) {
    router.push('/admin-panel-tour-operator/flights');
    return;
  }

  return (
    <div className='flex w-full flex-col gap-10'>
      <DetailedFlightInfo />
    </div>
  );
}
