import { Typography } from "@/shared/typography"

const mockDataTrips = [
  {
    title: "Экскурсии",
    optionsCount: 1234,
    image: "/interesting-places-img.png",
  },
  {
    title: "Необычные места",
    optionsCount: 567,
    image: "/interesting-places-img.png",
  },
  {
    title: "Еда",
    optionsCount: 890,
    image: "/interesting-places-img.png",
  },
  {
    title: "Лучшие рестораны",
    optionsCount: 456,
    image: "/interesting-places-img.png",
  },
  {
    title: "Парки",
    optionsCount: 234,
    image: "/interesting-places-img.png",
  },
  {
    title: "Культурные мероприятия",
    optionsCount: 345,
    image: "/interesting-places-img.png",
  },
  {
    title: "Развлечения",
    optionsCount: 678,
    image: "/interesting-places-img.png",
  },
];
const mockDataFavorites = [{
  title: "Франция",
  optionsCount: 1234,
  image: "/interesting-places-img.png",
},
{
  title: "Италия",
  optionsCount: 567,
  image: "/interesting-places-img.png",
},
{
  title: "Испания",
  optionsCount: 890,
  image: "/interesting-places-img.png",
},
{
  title: "Германия",
  optionsCount: 456,
  image: "/interesting-places-img.png",
},
{
  title: "Япония",
  optionsCount: 234,
  image: "/interesting-places-img.png",
},
{
  title: "Австралия",
  optionsCount: 345,
  image: "/interesting-places-img.png",
},
{
  title: "Канада",
  optionsCount: 678,
  image: "/interesting-places-img.png",
},
{
  title: "Франция",
  optionsCount: 1234,
  image: "/interesting-places-img.png",
},
{
  title: "Италия",
  optionsCount: 567,
  image: "/interesting-places-img.png",
},
{
  title: "Испания",
  optionsCount: 890,
  image: "/interesting-places-img.png",
},
{
  title: "Германия",
  optionsCount: 456,
  image: "/interesting-places-img.png",
},
{
  title: "Япония",
  optionsCount: 234,
  image: "/interesting-places-img.png",
},
{
  title: "Австралия",
  optionsCount: 345,
  image: "/interesting-places-img.png",
},
{
  title: "Канада",
  optionsCount: 678,
  image: "/interesting-places-img.png",
},
]

interface InterestingPlacesNearbyProps {
  type: string;
}

export function InterestingPlacesNearby({ type }: InterestingPlacesNearbyProps) {

  return (

    <div className={`hidden min-w-[274px] ${type === 'trips' ? 'max-h-[350px]' : 'max-h-[744px]'} pt-2 px-5 border-[1px] border-grey-100 rounded-[20px] bg-white text-center shadow-lg lg:block`}>

      <Typography variant="l-bold" className="block mb-5">Интересные места рядом</Typography>
      {type === 'trips' &&
        <Typography variant="m-bold" className="block mb-4">Москва</Typography>
      }

      <div className={`${type === 'trips' ? 'max-h-[250px]' : 'max-h-[680px]'} overflow-y-auto`}>
        <ul className="flex flex-col gap-1 overflow-hidden">

          {type === 'trips' && mockDataTrips.map((place, index) => (
            <li key={index} className="flex mb-2 rounded-[12px] cursor-pointer hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]">
              <div className="">
                <img className="w-full h-full rounded-tl-[20px] rounded-tr-[20px]" src={place.image} alt="Иллюстрация" />
              </div>
              <div className="pl-2 text-left text-grey-700">
                <Typography variant="m-bold" className="block">{place.title}</Typography>
                <Typography variant="s" className="block">{place.optionsCount} вариантов</Typography>
              </div>
            </li>
          ))}

          {type === 'favorites' && mockDataFavorites.map((place, index) => (
            <li key={index} className="flex mb-2 rounded-[12px] cursor-pointer hover:shadow-[0_4px_10px_0_rgba(0,0,0,0.1)]">
              <div className="">
                <img className="w-full h-full rounded-tl-[20px] rounded-tr-[20px]" src={place.image} alt="Иллюстрация" />
              </div>
              <div className="pl-2 text-left text-grey-700">
                <Typography variant="m-bold" className="block">{place.title}</Typography>
                <Typography variant="s" className="block">{place.optionsCount} вариантов</Typography>
              </div>
            </li>
          ))}


        </ul>
      </div>

    </div>

  )

}