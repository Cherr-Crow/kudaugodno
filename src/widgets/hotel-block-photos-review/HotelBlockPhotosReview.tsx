import React, { useEffect, useRef, useState } from 'react';
import { IHotelBlockPhotosReview } from './HotelBlockPhotosReview.types';
import { hotels } from '@/temp/hotel-mock';
import { Typography } from '@/shared/typography';
import { Rating } from '@/shared/rating';
import { SvgSprite } from '@/shared/svg-sprite';
import { serviceNames } from './service';
import { Amenity } from '@/types/amenity';
import { nanoid } from 'nanoid';

export function HotelBlockPhotosReview({ }: IHotelBlockPhotosReview) {
  const [amenities, setAmenities] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const amenitiesContainerRef = useRef<HTMLDivElement | null>(null);
  const [visibleAmenities, setVisibleAmenities] = useState(3);

  const [reviewStates, setReviewStates] = useState<{ [hotelId: number]: boolean }>({});
  const reviewContainerRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    const _arr = hotels[0].amenities.reduce((akk: string[], prev: Amenity) => {
      return [...akk, ...prev.amenity];
    }, []);
    setAmenities(_arr);
  }, [hotels]);

  const toggleReviews = (hotelId: number) => {
    setReviewStates((prevState) => {
      const newState = { ...prevState, [hotelId]: !prevState[hotelId] };
      if (!newState[hotelId] && reviewContainerRefs.current[hotelId]) {
        reviewContainerRefs.current[hotelId].scrollTop = 0;
      }
      return newState;
    });
  };

  useEffect(() => {
    const updateVisibleAmenities = () => {
      if (window.innerWidth >= 1024) {
        setVisibleAmenities(11);
      } else if (window.innerWidth >= 768) {
        setVisibleAmenities(5);
      } else {
        setVisibleAmenities(3);
      }
    };

    updateVisibleAmenities();
    window.addEventListener("resize", updateVisibleAmenities);

    return () => {
      window.removeEventListener("resize", updateVisibleAmenities);
    };
  }, [amenities.length]);

  const toggleAmenities = () => {
    setShowAll((prev) => {
      if (prev && amenitiesContainerRef.current) {
        amenitiesContainerRef.current.scrollTop = 0;
      }
      return !prev;
    });
  };

  return (
    <>
      <div className='p-4'>
        {hotels.slice(0, 1).map((hotel) => (
          <div key={hotel.id} className='mb-6'>
            <div className='py-4'>
              <div className='flex flex-row items-center'>
                <Typography
                  variant='h2'
                  className='mr-2 flex items-center text-2xl font-bold'
                >
                  {hotel.name}
                </Typography>
                <Rating category={hotel.star_category} />
              </div>

              <div className='flex items-center gap-2'>
                <SvgSprite name='location' width={24} height={24} />
                <Typography variant='s' className='text-gray-600 text-sm'>
                  {hotel.country + ', ' + hotel.city}
                </Typography>
                <Typography
                  variant='s-bold'
                  className='rounded-lg bg-green-secondary p-1 pl-2 pr-2 text-sm font-medium'
                >
                  {hotel.user_rating}
                </Typography>
              </div>
            </div>

            <div className='grid h-[182px] grid-cols-1 gap-4 py-4 md:h-auto lg:grid-cols-2'>
              <img
                src={hotel.photos[0]?.photo}
                alt={`Hotel ${hotel.name} hotel-photo`}
                className='hidden h-full w-full rounded-lg object-cover shadow-md lg:block'
              />

              <div className='flex gap-4 overflow-x-auto md:grid md:grid-cols-2'>
                <img
                  src={hotel.photos[1]?.photo}
                  alt={`Hotel ${hotel.name} hotel-photo`}
                  className='flex-shrink-0 rounded-lg object-cover shadow-md md:w-full'
                />
                <img
                  src={hotel.photos[2]?.photo}
                  alt={`Hotel ${hotel.name} hotel-photo`}
                  className='flex-shrink-0 rounded-lg object-cover shadow-md md:w-full'
                />
                <img
                  src={hotel.photos[3]?.photo}
                  alt={`Hotel ${hotel.name} hotel-photo`}
                  className='flex-shrink-0 rounded-lg object-cover shadow-md md:w-full'
                />

                <div className='relative w-48 flex-shrink-0 rounded-lg p-2 shadow-md md:w-full'>
                  <div
                    className='absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 transform bg-cover bg-center'
                    style={{
                      backgroundImage: `url(${hotel.photos[4]?.photo})`,
                      opacity: 0.6,
                    }}
                  />
                  <div className='absolute left-1/2 top-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-1 rounded-3xl bg-blue-light p-3 pl-4 pr-4 md:min-w-40'>
                    <SvgSprite name='image' width={24} />
                    <Typography
                      variant='s-bold'
                      className='text-sm font-bold text-black'
                    >
                      Все фотографии
                    </Typography>
                  </div>
                </div>
              </div>
            </div>

            <div className='grid grid-cols-1 gap-4 py-4 lg:grid-cols-2'>

              <div className="relative flex flex-col gap-4">
                <div
                  ref={amenitiesContainerRef}
                  className={`grid p-0.5 grid-cols-1 gap-4 lg:grid-cols-2 overflow-hidden rounded-2xl ${showAll ? "h-[287px] md:h-[450px] overflow-y-auto" : "h-[287px] md:h-[450px] overflow-hidden"
                    }`}
                >
                  {(showAll ? amenities : amenities.slice(0, visibleAmenities)).map((amenity) => (
                    <div
                      key={nanoid()}
                      className="bg-gray-100 flex items-center justify-center gap-2 rounded-2xl px-4 py-4 shadow-md outline outline-1 outline-blue-bold"
                    >
                      <SvgSprite name={serviceNames(amenity)} width={24} height={24} />
                      <Typography variant="s" className="text-gray-700">
                        {amenity}
                      </Typography>
                    </div>
                  ))}

                  {amenities.length > visibleAmenities && (
                    <button
                      onClick={toggleAmenities}
                      className="group flex items-center justify-center gap-0.5 rounded-2xl bg-blue-300 px-4 py-4 shadow-md outline outline-1 outline-blue-600"
                    >
                      <Typography variant="s-bold" className="text-gray-700">
                        {showAll ? "Скрыть удобства" : `Еще ${amenities.length - visibleAmenities} удобств`}
                      </Typography>
                      <SvgSprite
                        name="arrow"
                        width={24}
                        className={`transition-transform group-hover:translate-x-1 duration-200 ${showAll ? "rotate-90" : ""}`}
                        color="#4757ea"
                      />
                    </button>
                  )}
                </div>
              </div>

              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div className='h-44 flex-1 rounded-2xl p-6 shadow-md md:h-56'>
                  <div className='flex gap-8 md:flex-col md:gap-2'>
                    <SvgSprite name='amenity-check-in' width={32} />
                    <Typography variant='l' className='mb-2 font-semibold'>
                      Условия заселения
                    </Typography>
                  </div>
                  <div className='flex flex-col'>
                    <Typography variant='m' className='text-gray-600'>
                      Заселение: {hotel.check_in_time}
                    </Typography>
                    <Typography variant='m' className='text-gray-600 mb-3'>
                      Выселение: {hotel.check_out_time}
                    </Typography>
                  </div>
                  <div className='group flex items-center gap-0.5'>
                    <Typography variant='s' className='text-blue-600'>
                      Все условия
                    </Typography>
                    <SvgSprite
                      name='arrow'
                      width={20}
                      className='transition-transform duration-200 group-hover:translate-x-1'
                      color='#4757ea'
                    />
                  </div>
                </div>

                <div
                  className='flex min-h-40 items-center rounded-2xl bg-cover bg-center p-2 shadow-md'
                  style={{
                    backgroundImage: "url('map.png')",
                    backgroundPosition: '10% 10%',
                  }}
                >
                  <div className='m-auto flex items-center justify-center gap-1 rounded-3xl bg-blue-light p-3 pl-6 pr-6'>
                    <SvgSprite name='location' width={24} />
                    <Typography variant='s-bold' className='text-black'>
                      Смотреть на карте
                    </Typography>
                  </div>
                </div>

                <div key={hotel.id} className="flex-1 rounded-2xl p-4 shadow-md md:col-span-2">
                  <div
                    ref={(ref) => { reviewContainerRefs.current[hotel.id] = ref; }}
                    className={`h-[150px] overflow-hidden rounded-2xl transition-all duration-300 ${reviewStates[hotel.id] ? "overflow-y-auto" : "overflow-hidden"
                      }`}
                  >
                    {hotel.reviews.map((review) => (
                      <div key={review.id} className="mb-4 border-b pb-4">
                        <div className="mb-2 flex items-center gap-3">
                          <img
                            src={review.userPhoto}
                            alt={review.username}
                            className="h-8 w-8 rounded-full"
                          />
                          <div>
                            <Typography variant="s" className="font-semibold">
                              {review.username}
                            </Typography>
                          </div>
                          <div className="ml-auto rounded-lg bg-green-secondary px-2 py-1 text-sm font-medium md:px-3 md:py-2">
                            {review.rating}
                          </div>
                        </div>
                        <Typography variant="xs" className="text-gray-500 mb-2">
                          {review.date}
                        </Typography>
                        <div className="flex items-center justify-between">
                          <Typography variant="s" className="text-gray-700 mb-2">
                            {review.text}
                          </Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                  {hotel.reviews && hotel.reviews.length > 1 && (
                    <div className="group flex items-center justify-end gap-0.5 mt-2">
                      <button
                        className="text-blue-600 flex items-center gap-1"
                        onClick={() => toggleReviews(hotel.id)}
                      >
                        <Typography variant="s">
                          {reviewStates[hotel.id]
                            ? "Скрыть отзывы"
                            : `Еще ${hotel.reviews.length - 1} отзывов`}
                        </Typography>
                        <SvgSprite
                          name="arrow"
                          width={20}
                          className={`transition-transform group-hover:translate-x-1 duration-300 ${reviewStates[hotel.id] ? "rotate-90" : ""
                            }`}
                          color="#4757ea"
                        />
                      </button>
                    </div>
                  )}
                </div>


              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
