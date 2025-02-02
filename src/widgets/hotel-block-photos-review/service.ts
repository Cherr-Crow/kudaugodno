export const serviceNames = (name: string) => {
  switch (name) {
    case 'Много зелени':
      return 'plant';
    case 'Первая линия':
      return 'waves';
    case 'Семейные номера':
      return 'amenity-family-room';
    case '2 бассейна':
      return 'amenity-pool';
    case '3 теннисных корта':
      return 'tennis-racket';
    case 'Wi-fi':
      return 'amenity-wifi';
    case 'Развлечения для детей':
      return 'entertainment';
    case 'Можно с животными':
      return 'amenity-animals-allowed';
    case 'Трансфер от аэропорта':
      return 'bus';
    case 'СПА':
      return 'amenity-spa';
    case 'Ресторан аля-карт':
      return 'amenity-cart-restaurant';
    default:
      return 'image';
  }
};
