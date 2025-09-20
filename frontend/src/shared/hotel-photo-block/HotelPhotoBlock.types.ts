import { photoType } from '@/types/hotel';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IHotelPhotoBlock extends DivProps {
  photos: photoType[];
  onShowAllPhoto: () => void;
}
