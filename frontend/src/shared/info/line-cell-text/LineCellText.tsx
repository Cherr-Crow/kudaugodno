import { Typography } from '@/shared/ui/typography';

import { ILineCellText } from './LineCellText.types';

export function LineCellText({ text }: ILineCellText) {
  return (
    <Typography
      variant='h5'
      className='max-h-[26px] font-semibold leading-[1.1em] text-blue-950'
    >
      {text}
    </Typography>
  );
}
