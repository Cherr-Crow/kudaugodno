import React, { Suspense } from 'react';

import { BusinessRegister } from '@/widgets/business-register';

export default function BusinessRegisterPage() {
  return (
    <Suspense fallback={<div>Загрузка страницы регистрации для бизнеса...</div>}>
      <BusinessRegister />
    </Suspense>
  );
}
