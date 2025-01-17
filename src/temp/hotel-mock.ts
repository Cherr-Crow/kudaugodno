import { Hotel } from "@/types/hotel";

export const hotels: Hotel[] = [
    {
        id: 1,
        name: 'Novotel Nairobi Westlands',
        star_category: 4,
        place: 'Кения, Найроби',
        amenities: [
            { id: 1, name: 'Много зелени' },
            { id: 2, name: 'Развлевения для детей' },
            { id: 3, name: 'Первая линия' },
            { id: 4, name: 'Можно с животными' },
            { id: 5, name: 'Семейные номера' },
            { id: 6, name: 'СПА' },
            { id: 7, name: '2 бассейна' },
            { id: 8, name: 'Трансфер от аэропорта' },
            { id: 9, name: '3 теннисных корта' },
            { id: 10, name: 'Ресторан аля-карт' },
            { id: 11, name: 'Бесплатный Wi-fi' },
            { id: 12, name: 'Доп-удобство-1' },
            { id: 13, name: 'Доп-удобство-2' },
        ],
        country: 'Кения',
        city: 'Найроби',
        address: 'Westlands Road, Найроби',
        distance_to_sea: 0,
        distance_to_airport: 20,
        description:
            'Отель с просторными номерами, бассейном и утренними завтраками. Удобно расположен в центре города.',
        rooms: [
            {
                id: 1,
                category: { id: 1, name: 'Стандартный номер' },
                food: 'Завтрак включен',
                type_of_holiday: 'Семейный',
                smoking: false,
                pet: false,
                area: 25,
                amenities: [
                    { id: 1, name: 'Wi-Fi' },
                    { id: 2, name: 'Телевизор' },
                ],
                capacity: 2,
                single_bed: null,
                double_bed: 1,
                nightly_price: 5000,
                photos: [
                    { id: 1, photo: 'room1.png' },
                    { id: 2, photo: 'room2.png' },
                ],
            },
            {
                id: 2,
                category: { id: 2, name: 'Люкс' },
                food: 'Полупансион',
                type_of_holiday: 'Романтический',
                smoking: false,
                pet: false,
                area: 50,
                amenities: [
                    { id: 1, name: 'Wi-Fi' },
                    { id: 2, name: 'Мини-бар' },
                    { id: 3, name: 'Джакузи' },
                ],
                capacity: 4,
                single_bed: null,
                double_bed: 2,
                nightly_price: 10000,
                photos: [
                    { id: 3, photo: 'room3.png' },
                    { id: 4, photo: 'room4.png' },
                ],
            },
        ],
        user_rating: 8.6,
        reviews: [
            {
                id: 1,
                username: 'Константин Константинопольский',
                userPhoto: 'user1-photo.png',
                date: '26.03.2023',
                rating: 8.9,
                text: `Расположение идеальное и близко ко многим хорошим местам, например Sarit entre и Westgate Mall. 
            Завтрак был отличным, с таким количеством вариантов на выбор. 
            Первая линия. Лежаки и полотенца предоставлялись от отеля. СПА чудесный, есть много возможностей для спорта. 
            Очень зеленая территория.`,
            },
        ],
        check_in_time: '14:00',
        check_out_time: '12:00',
        photos: [
            { id: 1, photo: 'Novotel-Nairobi-Westlands-photo-1.png' },
            { id: 2, photo: 'Novotel-Nairobi-Westlands-photo-2.png' },
            { id: 3, photo: 'Novotel-Nairobi-Westlands-photo-3.png' },
            { id: 4, photo: 'Novotel-Nairobi-Westlands-photo-4.png' },
            { id: 5, photo: 'Novotel-Nairobi-Westlands-photo-5.png' },
        ],
    },
];