type DivProps = React.ComponentPropsWithoutRef<'div'>;

export interface IRoomDescription extends DivProps {}
export interface RoomDescriptionProps {
    description: string; // Определите этот тип в соответствии с типом вашей переменной описания
}
