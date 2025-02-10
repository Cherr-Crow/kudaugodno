/* eslint-disable react/no-children-prop */
import React from 'react';



import { ImageSlider } from '@/shared/hotel-page/image-slider';
import { RoomAmenities } from '@/shared/hotel-page/room-amenities';
import { RoomDescription } from '@/shared/hotel-page/room-description';
import { RoomPricing } from '@/shared/hotel-page/room-pricing';
import { RoomSquare } from '@/shared/hotel-page/room-square';
import { SvgSprite } from '@/shared/svg-sprite';
import { Typography } from '@/shared/typography';
import { ButtonCustom } from '@/shared/ui/button-custom';
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

interface IRoomCardProps {
    id: number;
    name: string;
    description: string;
    quadrature: string;
    amenities: string;
    price: number;
    images: string[]; 
    hasChild?: boolean; // добавляем опциональный параметр hasChild
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RoomCard: React.FC<IRoomCardProps> = ({ id, name, description, quadrature, amenities, price, images, hasChild }) => {
    return (
        <div className="w-full bg-white md:shadow-lg rounded-xl md:flex mb-3 "> 
            <h3 className="text-lg font-bold mt-4 block md:hidden lg:mb-4">{name}</h3>
            <div className="md:w-1/3  "> 
                <div className=" rounded-xl overflow-hidden"> 
                    <ImageSlider images={images} />
                </div>
            </div>
            <div className="room-details md:w-2/3"> 
                <div className="shadow-lg rounded-xl p-5 md:shadow-none "> 
                    <h3 className="text-lg font-bold hidden md:block">{name}</h3>
                    <div className=' w-full  md:hidden'>
                        <div className='flex-col'>
                            <RoomDescription description={description} />
                            <RoomSquare quadrature={quadrature} />
                        </div>
                        
                        <RoomAmenities amenities={amenities} /> 
                        <div className=' flex md:flex-col mb-4 mt-4 md:w-full'> 
                            <Typography variant='m' children='Колличество номеров' />
                            <div className='ml-auto md:ml-0 '>
                                <Select options={testList} color='blue' size='mobile' />
                            </div>                                                                                          
                        </div >
                    </div>
                    <div className='flex lg:mt-4 '>
                        <div className=' flex '>
                            <div className='flex-1 hidden md:block'>
                                <RoomDescription description={description} />
                                <RoomSquare quadrature={quadrature} />
                            </div>
                            <div className='pt-5'>
                                <div className='flex items-center'>
                                    <SvgSprite name='room-guests' className='hidden md:block' /> 
                                    {hasChild &&  <div className='flex'> + 
                                        <SvgSprite name='room_guest_child' className='hidden md:block ml-2' />
                                        </div>} 
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-end ml-auto '>
                            <div className='hidden sm:block md:text-xs lg:text-base md:justify-end'>
                                <RoomAmenities amenities={amenities} />
                            </div>
                            <div className='hidden md:block md:ml-2 justify-end '>
                                <Typography variant='m' children='Колличество номеров' className='md:text-xs lg:text-base justify-end' />
                                <div className='ml-auto md:ml-2 flex justify-center'>
                                    <Select options={testList} color='blue' size='mobile' className='justify-end' />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='md:flex md:ml-20 md:gap-4 lg:justify-end lg:mt-5'>
                        <div className='hidden sm:block'>
                            <h3 className="w-full flex  mr-6">17-27 июля</h3>
                        </div>

                        <div className='block'>
                            <RoomPricing price={price} /> 
                        </div>
                        <div className=" flex justify-center sm:items-center">
                            <ButtonCustom variant='primary' size='s' className=' '>
                                <div className='flex justify-center items-center w-full'>
                                    <Typography variant='m-bold' children='Бронировать ' />
                                </div>
                            </ButtonCustom>
                        </div>
                    </div>                
                </div>
            </div>
        </div>
    );
};

export default RoomCard;