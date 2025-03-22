import { Typography } from "@/shared/typography"

import { FavoritesHotelCard } from "./FavoritesHotelCard"

export function Favorites() {

  return (

    <section className="relative">

      <div className="absolute -z-10 left-0 right-0 top-0 h-full w-full rounded-bl-[20px] rounded-br-[20px] bg-[url('/admin-panel-tourist-bckg.jpg')] bg-no-repeat bg-contain md:h-[90%] md:rounded-bl-[100px] md:rounded-br-[100px] lg:bg-[url('/admin-panel-tourist-bckg-lg.jpg')]"></div>

      <div className="container py-8 md:py-10 lg:py-16">
        <Typography variant="h1" className="mb-8 text-[32px] font-semibold text-white md:mb-10 md:text-[40px] md:font-medium lg:mb-12 lg:text-[60px]">Избранное</Typography>
        <div className="flex py-4 px-4 rounded-[20px] bg-white md:px-5 lg:gap-4 lg:py-5">
          <div className="flex flex-col gap-4">
            <FavoritesHotelCard />
            <FavoritesHotelCard />
          </div>
        </div>

      </div>

    </section >

  )

}