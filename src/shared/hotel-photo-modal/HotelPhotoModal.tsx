import { IHotelPhotoModal } from './HotelPhotoModal.types';
import { Rating } from '../rating';
import { SvgSprite } from '../ui/svg-sprite';
import { Typography } from '../ui/typography';

export function HotelPhotoModal({
  name,
  star_category,
  user_rating,
  country,
  city,
  photos,
}: IHotelPhotoModal) {
  return (
    <div
      className={`flex max-h-[calc(100vh-2rem)] flex-col md:px-8 md:py-10 lg:px-10 lg:py-12`}
    >
      <div className='flex flex-shrink-0 items-center justify-between pb-10'>
        <div>
          <div className='mb-5 flex flex-col items-center md:flex-row'>
            <Typography
              variant='h2'
              className='mr-5 flex items-center text-2xl font-semibold'
            >
              {name}
            </Typography>
            <Rating category={star_category} />
          </div>

          <div className='flex items-center gap-2'>
            <SvgSprite name='location' width={24} height={24} />
            <Typography variant='l' className='text-gray-600 mr-3'>
              {country + ', ' + city}
            </Typography>
            <div className='rounded-lg bg-green-300 px-3 py-2'>
              <Typography variant='m-bold'>{user_rating}</Typography>
            </div>
          </div>
        </div>
      </div>

      <div className='h-[calc((100vh-2rem)-148px)] overflow-hidden'>
        <ul className='scrollbar-blue grid h-full gap-5 overflow-y-auto pr-6 md:auto-rows-[280px] md:grid-cols-[338px_338px] lg:auto-rows-[340px] lg:grid-cols-[340px_340px_340px]'>
          {photos &&
            photos.map((img, index) => (
              <li key={index} className='rounded-[20px]'>
                <img
                  src={img.photo}
                  alt={`Фото отеля ${index}`}
                  className='h-full w-full rounded-[20px] object-cover'
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
