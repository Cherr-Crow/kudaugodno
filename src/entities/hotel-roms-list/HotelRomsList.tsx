import React from 'react';
import { IHotelRomsListProps } from './HotelRomsList.types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation'; 
import { Navigation } from 'swiper/modules';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Typography } from '@/shared/typography';
import { SvgSprite } from '@/shared/svg-sprite';
import { Select } from '@/shared/ui/select';

const testList = [
    '   1',
    '   2',
    '   3',
    '   4',
    '   5',
    '   6',
    '   7',
  ];
  
export function HotelRomsList({ hotels }: IHotelRomsListProps) {
 
    return (   
        <div className=" grid-cols-1 gap-4 ">
            {hotels.map((hotel) => (
                <div key={hotel.id} className="w-full flex-1">
                    <h3 className="text-lg font-bold mt-3 block md:hidden">{hotel.name}</h3>
                    <div className="bg-white shadow-lg rounded-xl md:flex pl-5 pr-5 pb-5 pt-5 ">
                        <div className="md:w-1/3">
                        <Swiper
                            spaceBetween={10}
                            slidesPerView={1.5}
                            navigation={{
                                nextEl: '#swiper-button-next',
                                prevEl: '#swiper-button-prev',
                            }}
                            pagination={{ clickable: true }}
                            modules={[Navigation]}
                            className="swiper-wrapper"
                            breakpoints={{
                                640: {
                                    slidesPerView: 1,
                                },
                               
                            }}
                        >
                            {hotel.images.map((image, index) => (
                                <SwiperSlide key={index} className="w-full">
                                    <img
                                        src={image}
                                        alt={`Изображение номера ${hotel.name}`}
                                        className="rounded-lg w-full  object-cover"
                                    />
                                    <div className="absolute top-1/2 left-0 right-0 justify-between transform -translate-y-1/2 hidden md:flex">
                                        <button id="swiper-button-prev" className="p-2 bg-white rounded-full shadow-md  hover:bg-opacity-100 opacity-70 ml-5">
                                            <SvgSprite name='arrow' className='rotate-180 [&>path]:stroke-blue-600 md:w-4 md:h-4 lg:w-7 lg:h-7 [&>path]:stroke-2' />
                                        </button>
                                        <button id="swiper-button-next" className="p-2 bg-white rounded-full shadow-md hover:bg-opacity-100 opacity-70 mr-2">
                                            <SvgSprite name='arrow' className='md:w-4 md:h-4 lg:w-7 lg:h-7  [&>path]:stroke-blue-600 [&>path]:stroke-2 ' />
                                        </button>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        </div>
                        <div className=" w-full flex flex-col mt-5 md:flex-row  md:hidden">
                            
                            <div className="w-full  flex pb-2 ">  
                                <Typography variant='m'  children='Цена за' />
                                <SvgSprite name='room-guests' className='ml-2 ' />
                               
                            </div>
                            <div className="w-full flex ">
                                
                                <div className='pb-2 flex'>
                                    <SvgSprite name='bed'  />
                                    <Typography variant='m' children='1 двухспальная кровать' className='ml-2 ' />
                                </div>  
                            </div>
                            <div className="w-full flex ">
                                <SvgSprite name='square_room'  />
                                <div className='ml-2 pb-2'>
                                    <Typography variant='m' children={hotel.size}  />
                                     
                                </div> 
                            </div>
                            <div className="w-full flex ">
                                
                                <div className='pb-4 flex'>
                                    <SvgSprite name='icutlery_items' className='ml-2 '/>
                                    <Typography variant='m' children='Завтрак включен' className='ml-2 ' />
                                </div>                                                              
                            </div>
                            <div className=' flex mb-4 '> 
                                <Typography variant='m' children='Колличество номеров' />
                                <div className='ml-auto '>
                                    <Select options={testList} color='blue' size='mobile'  />
                                </div>                                                                                          
                            </div >
                            <div  className= 'w-full flex gap-1 mb-4 justify-between '>
                                <div className='  flex gap-1 mb-4'>
                                    <Typography variant='m-bold' children= {hotel.price} />
                                    <Typography variant='m-bold' children= 'руб' />
                                </div>
                                <div >
                                    <Typography variant='m-bold' children='Цена за 10 дней'  />
                                </div>
                            </div>                           
                        </div>
                        <div className=" flex justify-center items-center w-full md:hidden">
                            <ButtonCustom variant='primary' size='s' className='w-full '>
                                <div className='flex justify-center items-center w-full'>
                                    <Typography variant='m-bold' children='Бронировать ' />
                                </div>
                            </ButtonCustom>
                        </div>
                        <div className='flex flex-col w-full'>
                            <div className="hidden md:block ml-5">
                                <h3 className="text-lg font-bold ">{hotel.name}</h3>
                            </div>

                            <div className='hidden md:block'>
                                <div className='flex flex-col md:flex-row ml-5 '>
                                    <div className='flex flex-col md:flex-row '>
                                        <div className='hidden md:block'>
                                            <div className='pb-2 flex'>
                                                <SvgSprite name='bed'  />
                                                <Typography variant='s' children='1 двухспальная кровать' className='ml-2 block lg:hidden'/>
                                                <Typography variant='m' children='1 двухспальная кровать' className='ml-2 hidden lg:block'/>
                                            </div>
                                            <div className='w-full flex'>
                                                <SvgSprite name='square_room'  />
                                                <Typography variant='m' children={hotel.size} className='ml-2 ' />
                                            </div>  
                                        </div>
                                        <div className="flex items-center justify-center h-16 w-16 xl:ml-10">
                                            <SvgSprite name='room-guests' />
                                        </div>
                                    </div>
                                    <div className='flex flex-col md:flex-row '>
                                        <div className='flex flex-col xl:ml-10 '>
                                            <div className="flex items-center justify-center">
                                                <SvgSprite name='icutlery_items' className='ml-2 '/>
                                            </div>
                                            <div className='flex flex-col  '>
                                                <Typography variant='xs' children='Завтрак включен' className='ml-2 block lg:hidden ' />
                                                <Typography variant='m' children='Завтрак включен' className='ml-2 hidden lg:block ' />
                                            </div>
                                        </div>
                                        <div className='flex flex-col xl:ml-10 ' >
                                            <div className='flex flex-col  '>
                                                <Typography variant='s' children='Колличество номеров' className='block lg:hidden ' />
                                                 <Typography variant='m' children='Колличество номеров' className='hidden lg:block ' />
                                               

                                            </div>
                                            <div className='flex items-center justify-center'>
                                                <Select options={testList} color='blue' size='mobile' className='' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-full mt-6'>
                                    <div className='flex ml-20 xl:mt-24 '>
                                        <div className='mt-8'>
                                            <h3 className="text-lg mr-6">17-27 июля</h3>
                                        </div>
                                        <div className='xl:ml-12'>
                                            <div >
                                                <Typography variant='l-bold' children= {hotel.price} />
                                                <Typography variant='l-bold' children= 'руб' />
                                            </div>
                                            <div className='mt-2'>
                                                <Typography variant='m-bold' className='ml-6 mr-6' children= '10 ночей' />
                                            </div>
                                        </div>
                                        <div className='xl:ml-24'>
                                             <ButtonCustom variant='primary' size='s' className='w-full '>
                                                 <div className='flex justify-center items-center w-full'>
                                                     <Typography variant='m-bold' children='Бронировать ' />
                                                 </div>
                                             </ButtonCustom>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ))}
            <div className="group flex items-center justify-center px-6 w-full  md:relative md:mb-9 mt-6 mb-7 ml-6 ">
               <ButtonCustom variant='tetriary' size='m' className=''>
                           <div className='flex items-center gap-3 bg-blue-200'>
                                <Typography variant='m-bold' children='Показать еще' />
                           </div>
                 </ButtonCustom>
            </div>
        </div>
    );
  }
