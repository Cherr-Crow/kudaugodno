import { Suspense } from 'react';

import { Wzhuh } from '@/widgets/wzhuh';

export default function WzhuhPage() {
  return (
    <Suspense fallback={<div>Загрузка...</div>}>
      <Wzhuh />
    </Suspense>
  );
}
