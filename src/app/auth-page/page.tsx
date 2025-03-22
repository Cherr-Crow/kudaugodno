import React from 'react';

import { AuthForBusiness } from '@/widgets/auth-for-business';
import { Authpage } from '@/widgets/authpage';
import { TestButton } from '@/widgets/admin-panel-tourist/test-button/TestButton';

export default function Authorization() {
  return (
    <>
      <section className='container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]'>
        <TestButton />
        <Authpage />
        <AuthForBusiness />
      </section>
    </>
  );
}
