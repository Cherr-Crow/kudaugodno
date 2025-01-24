import React from 'react';
import { IRoomModal } from './RoomModal.types';
import { Typography } from '@/shared/typography';
import { serviceNames } from '../hotel-block-photos-review/service';
import { SvgSprite } from '@/shared/svg-sprite';
import { hotels } from '@/temp/hotel-mock';
import { nanoid } from 'nanoid';

export function RoomModal({}: IRoomModal) {
  return (
   <section className='relative p-[20px] md:pt-[30px] lg:p-[40px] lg:pt-[60px] rounded-[20px] mx-auto max-w-[1011px] shadow-md  min-h-[200px]'>
      <Typography className='block font-semibold md:text-[35px] lg:text-[60px] mb-[20px] md:mb-[30px] lg:mb-[57px] tracking-[1px] lg:tracking-[2.4px]'  >
        Модальное окно комнаты
      </Typography>
      <Typography className='block font-semibold md:text-[35px] lg:text-[60px] mb-[20px] md:mb-[30px] lg:mb-[57px] tracking-[1px] lg:tracking-[2.4px]'  >
        Номер Comfort
      </Typography>
      <div className='absolute right-[20px] top-[22px] lg:right-[40px] lg:top-[40px] cursor-pointer w-[16px] md:w-[20px] lg:w-[24px]'>
        <img className='max-w-[100%]' src="/closeimg.jpg" alt="" />
      </div>
      {/* Блок с картинками */}
      <div className='mb-[20px] lg:mb-[40px]'>
        <div className='rounded-[20px] overflow-hidden h-[224px] md:h-[545px] lg:h-[621px] md:mb-[20px]'>
          <img className='h-[100%] w-[100%]' src="modalromimg.jpg" alt=""/>
        </div>
        <div className='hidden md:flex md:overflow-x-auto md:gap-2 lg:gap-10 justify-between'>
          <div className='rounded-[20px] w-[220px] md:h-[163px] lg:h-[188px] overflow-hidden'>
            <img className='h-[100%] w-[100%] ' src="Novotel-Nairobi-Westlands-photo-1.png" alt=""/>
          </div>
          <div className='rounded-[20px] w-[220px] md:h-[163px] lg:h-[188px] overflow-hidden'>
            <img className='h-[100%] w-[100%] ' src="Novotel-Nairobi-Westlands-photo-2.png" alt=""/>
          </div>
          <div className='rounded-[20px] w-[220px] md:h-[163px] lg:h-[188px] overflow-hidden'>
            <img className='h-[100%] w-[100%] ' src="Novotel-Nairobi-Westlands-photo-3.png" alt=""/>
          </div>
          <div className='rounded-[20px] w-[220px] md:h-[163px] lg:h-[188px] overflow-hidden'>
            <img className='h-[100%] w-[100%] ' src="Novotel-Nairobi-Westlands-photo-4.png" alt=""/>
          </div>
        </div>
      </div> 
      {/* Блок со списком преимуществ */}
      <div className='md:flex'>
        <div className='mb-4 md:mr-8'>
          <div className='p-4 pb-3 md:p-2 lg:p-4 m-0 lg:mr-[0px] rounded-[20px] border-[1px] border-blue-light max-w-[304px] md:w-[190px] lg:w-[262px] h-[136px] md:h-[145px] lg:h-[168px] bg-blue-disabled'>
            <div className='flex items-center mb-2 md:mb-5'>
              <SvgSprite className='mr-2'
                name={'sofa'}
                width={30}
                height={30}
              />
              <Typography className='text-blue-900 lg:text-xl md:tracking-[-0.8px] lg:font-normal'>
                1 двуспальная кровать
              </Typography>
            </div>
            <div className='flex items-center mb-1 md:mb-3 lg:mb-5'>
              <SvgSprite className='mr-2'
                name={'ruler'}
                width={30}
                height={30}
              />
              <Typography className='text-blue-900 lg:text-xl lg:font-normal'>
                30 м<sup>2</sup>
              </Typography>
            </div>
            <div className='flex items-center m-0 lg:mb-5'>
              <SvgSprite className='mr-2'
                name={'parentsChld'}
                width={88}
                height={32}
              />
            </div>
          </div>
        </div>
        <div className='flex flex-wrap justify-between'>
          <div className='mb-[15px] lg:mb-[26px] w-[300px] md:max-w-[210px] lg:max-w-[300px] h-[56px] lg:h-[70px] flex items-center justify-center gap-2 rounded-[20px] lg:rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'>
            <SvgSprite
              name={serviceNames('Много зелени')}
              width={24}
              height={24}
            />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] lg:mb-[26px] w-[300px] md:max-w-[210px] lg:max-w-[310px] h-[56px] lg:h-[70px] flex items-center justify-center gap-1 rounded-[20px] lg:rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'>
            <SvgSprite
              name={serviceNames('Много зелени')}
              width={24}
              height={24}
            />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] lg:mb-[26px] w-[300px] md:max-w-[210px] lg:max-w-[310px] h-[56px] lg:h-[70px] flex items-center justify-center gap-2 rounded-[20px] lg:rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'>
            <SvgSprite
              name={serviceNames('Много зелени')}
              width={24}
              height={24}
            />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='mb-[15px] lg:mb-[26px] w-[300px] md:max-w-[210px] lg:max-w-[310px] h-[56px] lg:h-[70px] flex items-center justify-center gap-2 rounded-[20px] lg:rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'>
            <SvgSprite
              name={serviceNames('Много зелени')}
              width={24}
              height={24}
            />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
          <div className='hidden md:flex mb-[15px] lg:mb-[26px] w-[300px] md:max-w-[210px] lg:max-w-[310px] h-[56px] lg:h-[70px] items-center justify-center gap-2 rounded-[20px] lg:rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold'>
            <SvgSprite
              name={serviceNames('Много зелени')}
              width={24}
              height={24}
            />
            <Typography variant='s' className='text-gray-700'>
              Много зелени
            </Typography>
          </div>
        </div>
      </div>
      {/* Блок Удобства */}
      <div className='py-5 pb-0 lg:py-5'>
        <Typography variant="l" className="block mb-7 font-black text-blue-900 md:font-normal md:text-[24px] md:text-black md:mb-4 lg:text-[32px]">
                  Удобства
        </Typography>
        <ul className=" grid grid-cols-1 gap-7 mb-5 sm:flex ">

         {hotels[0].rooms.map((item) => (
            <li className='' key={nanoid()}>
                <Typography className="block mb-3 font-semibold text-blue-900 md:text-lg md:text-black lg:text-xl">
                   {item.category.name}
                </Typography>
               {item.amenities.map((comfortitem) => (
                <div className="flex mb-2" key={nanoid()}>
                  <SvgSprite
                  name='check-mark'
                  width={16}
                  className='cursor-pointer m-0 mr-4'
                />
                <Typography variant="s" className=" font-normal md:text-base">
                   {comfortitem.name}
                </Typography>
                </div>
               ))}
            </li>
            )
          )}
        </ul>
      </div>
   </section>
  )
}
