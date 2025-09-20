import { useSortable, defaultAnimateLayoutChanges } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { IAmenitiesItem } from './amenities-Item.types';
import { SvgSprite } from '../svg-sprite';
import { Typography } from '../typography';

export function AmenitiesItem({ item, onCheckedChange, isChecked }: IAmenitiesItem) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: item.id,
      animateLayoutChanges: defaultAnimateLayoutChanges,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms cubic-bezier(0.25, 1, 0.5, 1)',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onCheckedChange(!isChecked)}
      className={`flex h-[56px] w-[280px] shrink-0 items-center justify-center gap-2 rounded-[20px] border border-blue-950 p-3 text-center text-blue-950 transition-all ${isChecked ? 'bg-blue-200' : 'bg-white'} hover:bg-muted/60 ${isDragging ? 'z-50 cursor-grabbing opacity-50' : 'cursor-pointer'}`}
    >
      <SvgSprite
        width={32}
        height={32}
        name={item.icon}
        color='#1a1f4c'
        strokeWidth='2'
      />
      <Typography variant='l'>{item.label}</Typography>
    </div>
  );
}
