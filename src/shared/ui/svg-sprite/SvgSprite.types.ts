type DivProps = React.ComponentPropsWithoutRef<'svg'>;

export interface ISvgSprite extends DivProps {
  className?: string;
  name: NameSvg;
  color?: string;
  width?: number;
  height?: number;
}

export type NameSvg =
  | 'room_guest_child'
  | 'cutlery_items'
  | 'square_room'
  | 'bed'
  | 'room-guests'
  | 'map'
  | 'entertainment'
  | 'bus'
  | 'icon_document'
  | 'icon_video'
  | 'trash-light'
  | 'plant'
  | 'tennis-racket'
  | 'sort'
  | 'airplane'
  | 'arrow-pointer'
  | 'bell'
  | 'calendar'
  | 'firecracker'
  | 'waves'
  | 'warning'
  | 'user'
  | 'telegram'
  | 'star'
  | 'star-full'
  | 'sofa'
  | 'phone'
  | 'ru'
  | 'gb'
  | 'like-bold'
  | 'location'
  | 'magic-wand'
  | 'mail'
  | 'arrow'
  | 'cross'
  | 'fire'
  | 'image'
  | 'lightning'
  | 'list'
  | 'logo'
  | 'heart-outline'
  | 'search'
  | 'amenity-animals-allowed'
  | 'amenity-cart-restaurant'
  | 'amenity-check-in'
  | 'amenity-family-room'
  | 'amenity-pool'
  | 'amenity-spa'
  | 'amenity-wifi'
  | 'our_advantage_1'
  | 'our_advantage_2'
  | 'our_advantage_3'
  | 'check-mark'
  | 'paw'
  | 'face'
  | 'ruler'
  | 'parentsChld'
  | 'filter'
  | 'back-arrow'
  | 'google'
  | 'vkontakte'
  | 'yandex'
  | 'arrow-check'
  | 'airplane-tour'
  | 'eat'
  | 'admin-panel-tourist-background'
  | 'add-image'
  | 'frog-on-chair'
  | 'frog-on-suitcase'
  | 'frog-with-purse'
  | 'more'
  | 'eye'
  | 'admin-response'
  | 'comments'
  | 'ellipsisVertical'
  | 'greenCircle'
  | 'for-business'
  | 'exit-icon'
  | 'enter-icon'
  | 'coins'
  | 'burger-menu'
  | 'guest-adult'
  | 'guest-child'
  | 'single-bed'
  | 'edit-image'
  | 'success'
  | 'error'
  | 'warning-fill'
  | 'info';

// при добавлении нового типа svg, переносите его и в svgNameList для отображения в ПК плз.

export const svgNameList = [
  'room_guest_child',
  'icutlery_items',
  'square_room',
  'room-guests',
  'bed',
  'map',
  'entertainment',
  'bus',
  'icon_document',
  'icon_video',
  'trash-light',
  'plant',
  'tennis-racket',
  'sort',
  'airplane',
  'arrow-pointer',
  'bell',
  'calendar',
  'firecracker',
  'waves',
  'warning',
  'user',
  'telegram',
  'star',
  'star-full',
  'sofa',
  'phone',
  'ru',
  'gb',
  'like-bold',
  'location',
  'magic-wand',
  'mail',
  'arrow',
  'cross',
  'fire',
  'image',
  'lightning',
  'list',
  'logo',
  'heart-outline',
  'search',
  'amenity-animals-allowed',
  'amenity-cart-restaurant',
  'amenity-check-in',
  'amenity-family-room',
  'amenity-pool',
  'amenity-spa',
  'amenity-wifi',
  'our_advantage_1',
  'our_advantage_2',
  'our_advantage_3',
  'check-mark',
  'paw',
  'face',
  'ruler',
  'parentsChld',
  'filter',
  'back-arrow',
  'google',
  'vkontakte',
  'yandex',
  'arrow-check',
  'airplane-tour',
  'eat',
  'admin-panel-tourist-background',
  'add-image',
  'frog-on-chair',
  'frog-on-suitcase',
  'frog-with-purse',
  'more',
  'eye',
  'admin-response',
  'comments',
  'ellipsisVertical',
  'greenCircle',
  'for-business',
  'exit-icon',
  'enter-icon',
  'coins',
  'burger-menu',
  'guest-adult',
  'guest-child',
  'single-bed',
  'edit-image',
  'success',
  'error',
  'warning-fill',
  'info',
];
