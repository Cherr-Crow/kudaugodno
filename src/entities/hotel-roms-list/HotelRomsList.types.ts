export interface IHotelRoom {
    id: string;
    name: string;
    description: string;
    images: string[];
    size: string; 
    breakfastIncluded: boolean; 
    price: number; 
}

export interface IHotelRomsListProps {
    hotels: IHotelRoom[];
}

