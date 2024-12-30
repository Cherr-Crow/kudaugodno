import React from 'react';
import { IWzhuh } from './Wzhuh.types';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

export function Wzhuh({ className }: IWzhuh) {
  return (
    <section className={`${className}`}>

      <div className="p-5 md:pt-0 flex flex-col items-center md:flex-row gap-8 md:gap-28 justify-center md:justify-start bg-blue-disabled rounded-3xl">

        <div className="flex flex-col items-center text-center md:items-start md:text-start xl:ml-[170px]">
          <Typography variant='h5' className="mb-1 md:text-[30px] lg:text-[40px] lg:mb-6">
            Псс....Не знаете куда и зачем?
          </Typography>
          <Typography variant='m' className="mb-2 md:text-[22px] lg:text-[32px] lg:mb-6">
            Нажми и отправим куда-угодно
          </Typography>
          <ButtonCustom variant="wzhuh" size="m">
            <div className="flex items-center text-[20px] justify-center gap-2 w-16 h-5 md:w-28 md:h-9 md:text-[40px] lg:h-12">
              <Typography variant="l-bold" className="text-white">
                Вжух
              </Typography>
              <SvgSprite name="magic-wand" width={30} color="#fff" />
            </div>
          </ButtonCustom>
        </div>

        <div className="md:order-2 -mt-10 hidden md:block">
          <img
            src="frog_main_page.svg"
            alt="Лягушка с чемоданом"
            className="h-auto md:h-100 w-auto object-contain"
          />
        </div>
      </div>
      
    </section>
  );
}
