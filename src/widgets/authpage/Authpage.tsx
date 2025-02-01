'use client';

import React, { useState, useEffect } from 'react';
import { IAuthpage } from './Authpage.types';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/svg-sprite';

export function Authpage({}: IAuthpage) {
    const [showCodePanel, setShowCodePanel] = useState<boolean>(false);
    const [showBackArrow, setShowBackArrow] = useState<boolean>(false);
    const [seconds, setSeconds] = useState<number>(45);
    const [startTimer, setStartTimer] = useState<boolean>(false);


    // Показать кнопку Прислать новый код, Скрыть Обратный отсчёт
    // const [showButtonNewCode, setShowButtonNewCode] = useState<boolean>(false);
    



  const handleClick = () => {
    console.log("Привет", showCodePanel);
    setShowCodePanel(true);
    setShowBackArrow(true);
    setStartTimer(true);
    setSeconds(45);
  };

  const handleClickBack = () => {
    console.log("Пока", showCodePanel);
    setShowCodePanel(false);
    setShowBackArrow(false);
  };

  // Таймер

  
  useEffect(()=>{
    if (!startTimer) return;
    // if()
    if (seconds === 0 ) {
      // setShowButtonNewCode(true);
      setStartTimer(false);
      return;
    }


    const i = setInterval(()=>{
      setSeconds((seconds)=> seconds -1)
      // if (seconds === 0 ) {
      //   console.log('if (seconds === 0 )')
      //   clearInterval(i);
      // };

    }, 1000);
    return()=>{
      clearInterval(i);
    };
  }, [startTimer, seconds]);

  const handleSentNewCode = () => {
    console.log("Прислать новый код");
    setSeconds(45);
    // setShowButtonNewCode(false);
    setStartTimer(true);
    // setShowBackArrow(false);
  };

  // Ф-я показа времени в нужном формате

  let timeForComponent=(time: number)=>{
    if(!time) return;
    let hours = Math.floor(time / 60 / 60);
    let minutes = Math.floor(time / 60) - (hours * 60);
    let seconds = time % 60;

    let formattedWithHours = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');


    let  formattedWithouthHours = [        
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
      ].join(':');     
      

      return hours>=1 ? formattedWithHours : formattedWithouthHours;
}


  return (
    <section className='md:py-[80px]'>
      <div className=' md:min-h-[640px] md:max-w-[1180px] mx-auto md:border-[50px] border-blue-secondary rounded-[20px]'>
        <div 
          className='relative items-center py-[30px] px-2
          bg-blue-disabled md:bg-[url("/authback.jpg")] max-w-[1100px] md:h-[559px] md:rounded-[20px] md:m-[-10px]'
        > 
          {showBackArrow && 
            <button onClick={handleClickBack} className='absolute top-[15px] left-[15px] w-[44px] h-[44px]'>
            <SvgSprite name='back-arrow' width={44} height={44} className=''/>
           </button>
          }
         
          {!showCodePanel ?
              <div className='flex flex-col items-center max-w-[540px] h-[468px] lg:max-w-[580px] mx-auto md:pt-[75px] lg:pt-[55px]'>
                <Typography className='block mb-[30px] md:mb-[36px] lg:mb-[56px] text-blue-900 md:text-black text-[2rem] md:text-[40px] lg:text-[48px] font-black md:font-semibold' >
                  Добро пожаловать !
                </Typography>
                <form className='w-full mb-[25px] md:mb-[30px]'>
                  <Typography children='Введите e-mail' className='hidden md:block text-black text-lg font-semibold text-nowrap md:mb-[7px] lg:text-[20px]' />
                  
                  <label htmlFor="email" className='block mb-[25px]'>
                    <input id='email' className='h-[55px] md:h-[47px] w-full rounded-[8px] px-[15px] md:border md:border-black md:bg-transparent'
                    type="email" name="email" placeholder='example@mail.com'/>
                  </label>


                  {!startTimer 
                    ?
                    <ButtonCustom onClick={handleClick} variant='primary' size='m' className='h-[70px] px-[35px] py-[7px] w-full md:block md:mx-auto md:w-auto md:px-[30px] md:py-[11px] lg:py-[20px]'>
                     <Typography children='Получить код' className='text-base text-black lg:text-green-950 font-semibold text-nowrap md:text-[20px]' />
                    </ButtonCustom>
                    :
                    <Typography className='block text-grey-secondary font-normal text-[20px] mb-[15px] md:mb-[21px] lg:mb-[28px] md:text-[18px] lg:text-[20px] text-nowrap'>
                     Запросить новый код через {timeForComponent(seconds)}
                    </Typography>  
                   }

                  
                </form>
              

                <Typography children='Другие способы входа' className='block text-black text-base mb-[15px] md:mb-[21px] lg:mb-[28px] md:text-[18px] lg:text-[20px] font-semibold text-nowrap' />

                <div className='flex flex-col w-[100%] md:flex-row md:justify-between md:px-[15px] lg:px-[40px]'>
                  <ButtonCustom variant="wzhuh" disabled={startTimer} size="m" className='mb-[12px] w-full md:w-[32%] md:py-[18px] lg:py-[12px] flex justify-center'>
                    <div className="flex items-center text-[20px] justify-center gap-2 w-full h-5 md:w-28 md:h-9 md:text-[40px] lg:h-12">
                      <div className='w-[20px] h-[20px]'>
                        <SvgSprite name="google" width={20} color="#fff" />
                      </div>
                      <Typography variant="l-bold" className="text-white">
                        Google
                      </Typography>
                    </div>
                  </ButtonCustom>
                  <ButtonCustom variant="wzhuh" disabled={startTimer} size="m" className='mb-[12px] w-full md:w-[32%] md:py-[18px] lg:py-[12px] flex justify-center'>
                    <div className="flex items-center text-[20px] justify-center gap-2 w-full h-5 md:w-28 md:h-9 md:text-[40px] lg:h-12">
                      <div className='w-[20px] h-[20px] pt-[3px]'>
                        <SvgSprite name="vkontakte" width={24} color="#fff" />
                      </div>
                      <Typography variant="l-bold" className="text-white">
                        Вконтакте
                      </Typography>
                    </div>
                  </ButtonCustom>
                  <ButtonCustom variant="wzhuh" disabled={startTimer} size="m" className='mb-[12px] w-full md:w-[32%] md:py-[18px] lg:py-[12px] flex justify-center'>
                    <div className="flex items-center text-[20px] justify-center gap-2 w-full h-5 md:w-28 md:h-9 md:text-[40px] lg:h-12">
                      <div className='w-[20px] h-[20px]'>
                        <SvgSprite name="yandex" width={12} color="#fff" />
                      </div>
                      <Typography variant="l-bold" className="text-white">
                        Яндекс
                      </Typography>
                    </div>
                  </ButtonCustom>
                </div>
              </div>  
            :
              <div className='flex flex-col items-center max-w-[390px] h-[290px] lg:max-w-[580px] mx-auto md:pt-[105px] lg:pt-[94px]'>
                <Typography className='text-[31px] block mb-[28px] md:mb-[40px] lg:mb-[60px] text-blue-900 md:text-black md:text-[40px] lg:text-[48px] font-black md:font-semibold' >
                  Добро пожаловать!
                </Typography>
                <form className='w-full mb-[25px] md:mb-[18px]'>
                  <Typography children='Введите код из письма' className='block text-center text-black text-base font-semibold text-nowrap mb-[16px] lg:mb-[20px] md:text-[18px] lg:text-[20px]' />
                  <div className='flex justify-between md:px-[37px] lg:px-[132px]'>
                    <label htmlFor="" className='block'>
                      <input className='text-black text-[20px] bg-blue-light text-center h-[75px] md:h-[81px] w-[75px] md:w-[65px] rounded-[8px] px-[15px]'
                      type="text" placeholder=''/>
                    </label>
                    <label htmlFor="" className='block'>
                      <input className='text-black text-[20px] bg-blue-light text-center h-[75px] md:h-[81px] w-[75px] md:w-[65px] rounded-[8px] px-[15px]'
                      type="text" placeholder=''/>
                    </label>
                    <label htmlFor="" className='block'>
                      <input className='text-black text-[20px] bg-blue-light text-center h-[75px] md:h-[81px] w-[75px] md:w-[65px] rounded-[8px] px-[15px]'
                      type="text" placeholder=''/>
                    </label>
                    <label htmlFor="" className='block'>
                      <input className='text-black text-[20px] bg-blue-light text-center h-[75px] md:h-[81px] w-[75px] md:w-[65px] rounded-[8px] px-[15px]'
                      type="text" placeholder=''/>
                    </label>
                  
                  </div>
                  
                </form>

                {/* <Typography children='Неверный код, попробуйте ещё раз' className='block text-red-primary-800 font-normal text-[19px] mb-[15px] md:mb-[24px] lg:mb-[25px] md:text-[18px] lg:text-[20px] text-nowrap' /> */}

                {!startTimer 
                    ?
                    <ButtonCustom onClick={handleSentNewCode} variant='primary' size='m' className='h-[70px] px-[35px] py-[7px] w-full md:block md:mx-auto md:w-auto md:px-[30px] md:py-[11px] lg:py-[14px] mt-[25px]'>
                     <Typography children='Прислать новый код' className='text-base text-black lg:text-green-950 font-semibold text-nowrap md:text-[20px]' />
                    </ButtonCustom>
                    :
                    <Typography className='block text-grey-secondary font-normal text-[20px] mb-[15px] md:mb-[21px] lg:mb-[28px] md:text-[18px] lg:text-[20px] text-nowrap'>
                     Запросить новый код через {timeForComponent(seconds)}
                    </Typography>  
                }
                  
                  {/* <div>{seconds}</div> */}
               

              </div> 
          }

        </div>
      </div>
    </section>
  )
}
