/* eslint-disable react/no-children-prop */
import { ImageSlider } from '@/shared/hotel-page/image-slider';
import { RoomAmenities } from '@/shared/hotel-page/room-amenities';
import { RoomDescription } from '@/shared/hotel-page/room-description';
import { RoomPricing } from '@/shared/hotel-page/room-pricing';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Select } from '@/shared/ui/select';
import React from 'react';

const testList = [
    '   1',
    '   2',
    '   3',
    '   4',
    '   5',
    '   6',
    '   7',
  ];

interface IRoomCardProps {
    id: number;
    name: string;
    description: string;
    amenities: string[];
    price: number;
    images: string[]; 
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomCard: React.FC<IRoomCardProps> = ({ id, name, description, amenities, price, images }) => {
    return (
        <div className="w-full bg-white md:shadow-lg rounded-xl md:flex mb-3"> 
        <h3 className="text-lg font-bold mt-4 block md:hidden">{name}</h3>
            <div className="md:w-1/3 p-0"> 
                <div className=" rounded-xl overflow-hidden"> 
                    <ImageSlider images={images} />
                </div>
            </div>
            <div className="room-details md:w-2/3"> 
                <div className="shadow-lg rounded-xl p-5 md:shadow-none"> 
                    <h3 className="text-lg font-bold hidden md:block">{name}</h3>
                    <div className='w-full  flex pb-2 md:hidden'>
                        <Typography variant="m-bold" className="text-black md:hidden">Цена за</Typography>
                        <SvgSprite name='room-guests' className='ml-2 ' />
                    </div>
                    <RoomDescription description={description} />
                    <RoomAmenities amenities={amenities} /> 
                    <div className=' flex mb-4 mt-4 md:hidden'> 
                                <Typography variant='m' children='Колличество номеров' />
                                <div className='ml-auto '>
                                    <Select options={testList} color='blue' size='mobile'  />
                                </div>                                                                                          
                    </div >
                    <div className='block md:hidden'>
                        <RoomPricing price={price} /> 
                    </div>

                    <div className=" flex justify-center items-center w-full md:hidden">
                        <ButtonCustom variant='primary' size='s' className='w-full '>
                            <div className='flex justify-center items-center w-full'>
                                <Typography variant='m-bold' children='Бронировать ' />
                            </div>
                        </ButtonCustom>
                    </div>
                <div className='flex flex-col w-full pt-4 xl:pt-10'>       
                        <div className='hidden md:block'>
                            <div className='flex flex-col md:flex-row '>
                                <div className='flex flex-col md:flex-row'>
                                    <div className='hidden md:block'>
                                        <div className='pb-2 flex'>
                                            <SvgSprite name='bed'  />
                                            <Typography variant='s' children='1 двухспальная кровать' className='ml-2 block lg:hidden'/>
                                            <Typography variant='m' children='1 двухспальная кровать' className='ml-2 hidden lg:block'/>
                                        </div>
                                        <div className='w-full flex'>
                                            <SvgSprite name='square_room'  />
                                            <Typography variant='m' children={amenities} className='ml-2 ' />
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
                                            <Typography variant='xs' children={amenities} className='ml-2 block lg:hidden ' />
                                            <Typography variant='m' children={amenities} className='ml-2 hidden lg:block ' />
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
                            <div className='w-full lg:mt-4'>
                                <div className='flex ml-20 xl:mt-14 '>
                                    <div className='mt-8'>
                                        <h3 className="text-lg mr-6">17-27 июля</h3>
                                    </div>
                                    <div className='xl:ml-12'>                                                                                
                                        <RoomPricing price={price} />                                        
                                        <div className='flex justify-center '>
                                            <Typography variant='m-bold' className='ml-4 mr-4' children= '10 ночей' />
                                        </div>
                                    </div>
                                    <div className='xl:ml-24 lg:ml-20'>
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
        
            

        </div>
        
    );
};

export default RoomCard;
