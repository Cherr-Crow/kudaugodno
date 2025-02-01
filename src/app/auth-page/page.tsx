import { Authpage } from '@/widgets/authpage';
import React from 'react';

export default function Authorization() {
  return (
    <>
      <section className="container rounded-bl-[20px] rounded-br-[20px] xl:rounded-bl-[100px] xl:rounded-br-[100px]">
        <Authpage/>
      </section>
    </>
  );
}