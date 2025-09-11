import { ITableLine } from './TableLine.types';

export function TableLine({ children }: ITableLine) {
  return <div className='flex w-full flex-col gap-x-5 md:flex-row'>{children}</div>;
}
