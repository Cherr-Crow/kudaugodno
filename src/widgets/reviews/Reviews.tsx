import { IReviews } from './Reviews.types';

export function Reviews({ className, children }: IReviews) {
  return (
    <section
      className={`${className} container relative mb-1 flex h-[541px] flex-col items-center justify-center gap-3 text-center md:mb-[54px] md:h-[623px] md:gap-0 lg:mb-10`}
    >
      {children}
      <img
        src='reviewer-photo.png'
        alt='reviewer-photo'
        className='absolute left-[8px] top-[48px] h-[128px] w-[103px] rounded-[20px] object-center md:left-[22px] md:top-[128px] md:h-[187px] md:w-[150px] lg:left-[126px] lg:top-[96px] lg:h-[223px] lg:w-[180px]'
      />
      <img
        src='reviewer-photo.png'
        alt='reviewer-photo'
        className='absolute right-[8px] top-[26px] h-[132px] w-[132px] rounded-[20px] object-center md:right-[18px] md:top-[98px] md:h-[135px] md:w-[135px] lg:right-[352px] lg:top-[40px] lg:h-[132px] lg:w-[132px]'
      />
      <img
        src='reviewer-photo.png'
        alt='reviewer-photo'
        className='absolute right-[77px] top-[100px] h-[97px] w-[97px] rounded-[20px] object-center md:right-[282px] md:top-[120px] lg:right-[768px] lg:top-[106px]'
      />
      <img
        src='reviewer-photo.png'
        alt='reviewer-photo'
        className='absolute bottom-[25px] left-[8px] h-[139px] w-[139px] rounded-[20px] object-center md:bottom-[-54px] md:left-[640px] lg:bottom-[-40px] lg:left-[744px]'
      />
      <img
        src='reviewer-photo.png'
        alt='reviewer-photo'
        className='absolute bottom-[36px] right-[10px] h-[165px] w-[165px] rounded-[20px] object-center md:right-[438px] md:h-[180px] md:w-[180px] lg:bottom-[50px] lg:right-[924px]'
      />
      <img
        src='reviewer-photo.png'
        alt='reviewer-photo'
        className='absolute hidden rounded-[20px] object-center lg:bottom-[178px] lg:right-[124px] lg:block lg:h-[215px] lg:w-[180px]'
      />
    </section>
  );
}
