import { MealType } from '../../../types/room';

type DivProps = React.ComponentPropsWithoutRef<'div'>;

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IRoomMealsInfo extends DivProps {}

export interface RoomMealsInfoProps {
  meals: MealType[];
  className?: string;
  onMealsChange: (meal: string) => void;
}
