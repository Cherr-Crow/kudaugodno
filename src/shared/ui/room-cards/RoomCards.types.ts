type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomCards extends DivProps {
  name: string;
  tourId?: number;
  roomId?: number;
  start_date: string;
  end_date: string;
  flight_to?: string;
  flight_from?: string;
  departure_country?: string;
  departure_city?: string;
  arrival_country?: string;
  arrival_city?: string;
  tour_operator: string;
  guests?: number;
  hotel?: string;
  room?: string;
  transfer?: boolean;
  price: string;
  document?: string | null;
  nights?: number;
  services: string[];
  // services: {
  //   type:
  //   | 'entertainment'
  //   | 'bus'
  //   | 'icon_document'
  //   | 'icon_video'
  //   | 'trash-light'
  //   | 'plant'
  //   | 'tennis-racket'
  //   | 'sort'
  //   | 'airplane'
  //   | 'arrow-pointer'
  //   | 'bell'
  //   | 'calendar'
  //   | 'firecracker'
  //   | 'waves'
  //   | 'warning'
  //   | 'user'
  //   | 'telegram'
  //   | 'star'
  //   | 'star-full'
  //   | 'sofa'
  //   | 'phone'
  //   | 'ru'
  //   | 'gb'
  //   | 'like-bold'
  //   | 'location'
  //   | 'magic-wand'
  //   | 'mail'
  //   | 'arrow'
  //   | 'cross'
  //   | 'fire'
  //   | 'image'
  //   | 'lightning'
  //   | 'list'
  //   | 'logo'
  //   | 'heart-outline'
  //   | 'search'
  //   | 'amenity-animals-allowed'
  //   | 'amenity-cart-restaurant'
  //   | 'amenity-check-in'
  //   | 'amenity-family-room'
  //   | 'amenity-pool'
  //   | 'amenity-spa'
  //   | 'amenity-wifi'
  //   | 'our_advantage_1'
  //   | 'our_advantage_2'
  //   | 'our_advantage_3'
  //   | 'check-mark'
  //   | 'paw'
  //   | 'face'
  //   | 'eat';
  //   text: string;
  // }[];
}
export interface IDateTimeFormatOptions {
  year?: 'numeric' | '2-digit';
  month?: 'long' | 'short' | 'narrow';
  day?: 'numeric' | '2-digit';
  weekday?: 'long' | 'short' | 'narrow';
  hour?: 'numeric' | '2-digit';
  minute?: 'numeric' | '2-digit';
  second?: 'numeric' | '2-digit';
}
