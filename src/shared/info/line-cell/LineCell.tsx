import { ILineCell } from './LineCell.types';
import { Typography } from '../../ui/typography';

export function LineCell({ title, value }: ILineCell) {
  return (
    <div className='mb-4 flex flex-1 flex-col md:mb-0'>
      <Typography variant='l-bold' className='mb-1 leading-[1.1em] text-[#363636]'>
        {title}
      </Typography>
      <Typography
        variant='l'
        className='rounded-lg bg-[#F7F7F7] p-3 font-light leading-[1.1em] text-[#363636]'
      >
        {value ? value : 'Поле незаполнено'}
      </Typography>
    </div>
  );
}
