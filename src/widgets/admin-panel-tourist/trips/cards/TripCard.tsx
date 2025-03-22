import { Typography } from "@/shared/typography"
import { ButtonCustom } from "@/shared/ui/button-custom"

interface TripCardProps {
  type: string;
}

export function TripCard({ type }: TripCardProps) {

  return (
    <div className="rounded-[20px] bg-white shadow-lg md:flex md:flex-row-reverse md:border-[1px] md:border-grey-100">
      <div className="relative h-[216px] rounded-tl-[20px] rounded-tr-[20px] bg-grey-50 md:w-[60%] md:h-auto md:rounded-[20px] lg:min-w-[340px]">
        <img className="w-full h-full rounded-tl-[20px] rounded-tr-[20px] md:rounded-[20px]" src="/admin-panel-tourist-tour.jpg" alt="Фото" />
        <div className="absolute top-4 left-4 flex items-center py-2 px-3 bg-white rounded-[20px] md:left-6 lg:left-7">
          <div className="w-8 h-8 mr-2 bg-yellow-primary rounded-full md:w-6 md:h-6 lg:w-8 lg:h-8"></div>
          <Typography variant="m-bold" className="lg:text-[20px]">Ожидает подтверждения</Typography>
        </div>
      </div>

      <div className="relative mt-[-20px] z-2 px-4 py-4 rounded-[20px] bg-white md:w-full md:py-5 md:pb-6 md:px-5 md:mt-0 md:pr-10 lg:min-w-[562px] lg:pt-6 lg:pb-4">
        <div className="flex justify-between mb-5 md:mb-10 lg:mb-10">
          <div>
            <Typography variant="m-bold" className="block mb-1 md:mb-4 md:text-[20px] md:font-medium lg:mb-4 lg:text-[24px]">Тур в Африку</Typography>
            <Typography variant="s" className="text-grey-950 lg:text-[13px]">№123456789</Typography>
          </div>
          {type === 'active' ?
            (<button className="py-2 px-4 text-[13px] font-medium bg-blue-200 hover:bg-blue-100 active:bg-blue-400 h-fit w-fit rounded-full hover:shadow-lg md:py-4 md:px-6 md:text-[18px] lg:px-9 lg:text-[20px]">Связаться с туроператором</button>)
            : (
              <button className="py-2 px-4 text-[13px] font-medium bg-blue-200 hover:bg-blue-100 active:bg-blue-400 h-fit w-fit rounded-full hover:shadow-lg md:py-4 md:px-6 md:text-[18px] lg:px-9 lg:text-[20px]">Оставить отзыв</button>
            )
          }

        </div>

        <div className="mb-5 md:flex lg:mb-7">
          <div className="mb-4 md:mr-16">
            <Typography variant="m" className="block mb-2 text-grey-950 md:text-[13px] md:font-normal lg:text-[16px]">2 гостя</Typography>
            <Typography variant="l-bold" className="md:text-[16px] md:font-medium lg:text-[20px]">23.10–28.10</Typography>
          </div>
          <div className="mb-4 md:mr-24">
            <Typography variant="m" className="block mb-2 text-grey-950 md:text-[13px] md:font-normal lg:text-[16px]">Отель</Typography>
            <Typography variant="l-bold" className="md:text-[16px] md:font-medium lg:text-[20px]">Super puper hotel</Typography>
          </div>
          <div>
            <Typography variant="m" className="block  mb-2 text-grey-950 md:text-[13px] md:font-normal lg:text-[16px]">Турфирма</Typography>
            <Typography variant="l-bold" className="md:text-[16px] md:font-medium lg:text-[20px]">Tess tour</Typography>
          </div>
        </div>

        <div className="md:flex md:items-center md:justify-between">
          <div className="mb-5 md:max-w-[166px] md:mb-0">
            <Typography variant="m" className="block mb-2 text-grey-950 md:mb-1 md:text-[13px] md:font-normal lg:mb-3 lg:text-[16px]">Страна, город</Typography>
            <Typography variant="l-bold" className="md:text-[16px] md:font-medium md:leading-3 lg:leading-8 lg:text-[20px]">ЮАР: Кейптаун, Йоханнесбург</Typography>
          </div>
          <ButtonCustom variant="secondary" size='s' className="w-full font-medium md:w-auto md:self-end md:text-[20px] lg:py-5 lg:px-8">Документы по туру</ButtonCustom>
        </div>

      </div>
    </div>
  )

}

