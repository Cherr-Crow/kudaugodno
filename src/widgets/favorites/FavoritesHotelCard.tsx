import { Rating } from "@/shared/rating"
import { SvgSprite } from "@/shared/svg-sprite"
import { Typography } from "@/shared/typography"

export function FavoritesHotelCard() {

  return (
    <div className="rounded-[20px] bg-white lg:max-w-[899px]">

      <Typography variant="subtitle4" className="block mb-4 font-medium md:mb-3 lg:mb-3">Анталия</Typography>

      <div className="w-full md:flex rounded-[20px] md:shadow-lg">

        <div className="relative h-[216px] rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 md:w-[90%] md:h-auto md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-none lg:min-w-[340px]">
          <button className="hidden absolute top-[calc((100%-44px)/2)] left-4 w-[44px] h-[44px] rounded-full bg-white opacity-60 transition-opacity hover:opacity-70 active:opacity-80 focus:outline-none focus-visible:outline-none focus:opacity-70 focus-visible:opacity-70 md:flex md:items-center md:justify-center">
            <SvgSprite name={'arrow'} height={25} color="#4757EA" className="transform rotate-180" />
          </button>
          <img className="w-full h-full rounded-tl-[20px] rounded-tr-[20px] md:rounded-tl-[20px] md:rounded-bl-[20px] md:rounded-tr-none" src="/admin-panel-tourist-tour.jpg" alt="Фото" />
          <button className="hidden absolute top-[calc((100%-44px)/2)] right-8 w-[44px] h-[44px] rounded-full bg-white opacity-60 transition-opacity hover:opacity-70 active:opacity-80 focus:outline-none focus-visible:outline-none focus:opacity-70 focus-visible:opacity-70 md:flex md:items-center md:justify-center">
            <SvgSprite name={'arrow'} height={25} color="#4757EA" />
          </button>
          <div className="absolute top-4 right-4 flex items-center justify-center w-12 h-12 rounded-full opacity-60 bg-white md:hidden">
            <SvgSprite name="heart-outline" width={24} height={24} />
          </div>
        </div>

        <div className="relative mt-[-49px] z-2 px-4 py-4 rounded-[20px] shadow-lg bg-white md:w-full md:py-4 md:px-6 md:mt-0 md:ml-[-15px] md:border-t-2 md:border-grey-100 lg:pb-4">

          <div className="flex justify-between mb-4 md:mb-3 lg:mb-4">
            <div>
              <div className="mb-1 md:mb-2">
                <Rating category={3} starSize={16} gap={2} />
              </div>
              <Typography variant="m-bold" className="block md:mb-3 md:text-[20px] lg:mb-3">Norke Варшавская</Typography>
              <Typography variant="m" className="hidden text-blue-950 md:block md:mb-2 lg:mb-1">Москва</Typography>
              <Typography variant="s" className="block mb-1 text-grey-700 md:mb-0 md:text-[16px]">11.1 км&nbsp;от&nbsp;центра</Typography>
              <Typography variant="s" className="block text-grey-700 md:text-[16px]">491 м&nbsp;от&nbsp;метро Варшавская</Typography>
            </div>
            <div className="md:flex md:gap-3 md:max-h-[44px] md:items-center">
              <a href="#" className="hidden md:block text-blue-700 transition-colors hover:text-blue-400 active:text-blue-900 focus:outline-none focus-visible:outline-none focus:text-blue-400 focus-visible:text-blue-400">
                <Typography variant="m" className="">23 отзыва</Typography>
              </a>
              <div className='flex h-[44px] items-center justify-center rounded-[8px] bg-[#C7F85E] px-3'>
                <Typography variant='m-bold'>8.7</Typography>
              </div>
              <div className="hidden items-center justify-center w-12 h-12 rounded-full bg-blue-50 md:flex">
                <SvgSprite name="heart-outline" width={24} height={24} />
              </div>
            </div>
          </div>

          <div className="hidden md:flex md:gap-2 md:mb-5 lg:mb-4">
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-grey-50">
              <Typography variant='m'>Wi-Fi</Typography>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-grey-50">
              <Typography variant='m'>Вид на&nbsp;море</Typography>
            </div>
            <div className="flex items-center justify-between py-2 px-3 rounded-xl bg-grey-50">
              <Typography variant='m'>Парковка</Typography>
            </div>
          </div>

          <div className="flex px-3 py-1 rounded-lg bg-blue-50 md:px-4 md:pr-6 md:py-3 lg:pb-2">
            <div className="mr-auto">
              <Typography variant="s" className="block text-blue-950">Питание: не&nbsp;включено</Typography>
              <Typography variant="s" className="block text-blue-950">Удобства на&nbsp;этаже</Typography>
            </div>
            <div>
              <Typography variant="m-bold" className="block text-blue-600 md:text-[20px] lg:mb-1">12&nbsp;500&nbsp;₽</Typography>
              <Typography variant="s" className="block text-grey-700">3&nbsp;ночи 2&nbsp;гостя</Typography>
            </div>
          </div>

        </div>

      </div>

    </div>
  )

}