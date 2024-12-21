import React from 'react';
import { IWzhuh } from './Wzhuh.types';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';

export function Wzhuh({ className }: IWzhuh) {
  return (
    <section className={`${className}`}>
      <div className="container " >

        <div className='container pt-10 pb-10 flex flex-row gap-28 items-start justify-center lg:justify-start sm:justify-center bg-blue-disabled rounded-3xl'>
          <div className="flex flex-col items-center lg:items-start lg:text-start text-center">
            <Typography variant="h3" className="mb-0 lg:text-[40px] md:text-[40px]  text-[20px]">
              Псс....Не знаете куда и зачем?
            </Typography>
            <Typography variant="subtitle3" className="mb-3 lg:text-[32px] md:text-[32px] text-[16px]">
              Нажми и отправим куда-угодно
            </Typography>
            <ButtonCustom variant="wzhuh" size="l">
              <div className="flex items-center justify-center gap-2 lg:h-9 md:h-9 h-2 lg:w-28 md:w-28 w-18  lg:text-[40px] md:text-[40px] text-[20px]">
                <Typography variant="l-bold" children="Вжух" className="text-white" />
                <SvgSprite name="magic-wand" width={30} color="#fff" className=''/>
              </div>
            </ButtonCustom>
          </div>
  
          <div className="justify-center sm:order-2 -mt-20 hidden lg:flex">
            <img
              src="frog_main_page.svg"
              alt="Лягушка с чемоданом"
              className="h-100 w-auto object-contain "
            />
          </div>
        </div>

      </div>
    </section>
  );
}
