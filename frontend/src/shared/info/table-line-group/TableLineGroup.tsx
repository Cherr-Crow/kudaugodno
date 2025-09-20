import { ITableLineGroup } from './TableLineGroup.types';

export function TableLineGroup({ children }: ITableLineGroup) {
  return <div className='mb-10 flex flex-col gap-y-5 last:mb-0'>{children}</div>;
}
