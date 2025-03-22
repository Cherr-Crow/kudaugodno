import { HotelCard } from "./cards/HotelCard"
import { TripCard } from "./cards/TripCard"

export function ArchivalTrips({ }) {

  return (
    <>
      <div className="flex flex-col gap-5 lg:max-w-[902px]">
        <TripCard type='archival' />
        <HotelCard type='archival' />
      </div>

      <div className="hidden lg:block lg:absolute lg:-bottom-2 lg:right-32">
        <img src="/frog_main.png" className="lg:w-[140px]" alt="Лягушка с чемоданом" />
      </div>

    </>
  )

}