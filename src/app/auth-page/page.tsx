import React from 'react';

import { TestButton } from '@/widgets/admin-panel-tourist/test-button/TestButton';
import { Authpage } from '@/widgets/authpage';

export default function Authorization() {
  return (
    <>
      <section className='container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]'>
        <TestButton />
        <Authpage />
      </section>
    </>
  );
}
