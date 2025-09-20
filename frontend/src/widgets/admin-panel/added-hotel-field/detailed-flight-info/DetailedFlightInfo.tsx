import { useRouter, useSearchParams } from 'next/navigation';

import { useGetOneFlightQuery } from '@/servicesApi/flightsApi';
import { LineCell } from '@/shared/info/line-cell/LineCell';
import { LineCellText } from '@/shared/info/line-cell-text/LineCellText';
import { TableLine } from '@/shared/info/table-line/TableLine';
import { TableLineGroup } from '@/shared/info/table-line-group/TableLineGroup';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Select } from '@/shared/ui/select';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';
import { addTextBeforeBid } from '@/shared/utils/addTextBeforeBid';

export function DetailedFlightInfo() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const idTyped = id !== null ? parseInt(id) : id;
  const { data, isLoading } = useGetOneFlightQuery(idTyped);

  const router = useRouter();

  const handleButtonAllFlight = () => {
    router.push('/admin-panel-tour-operator/flights');
  };
  const handleButtonBack = () => {
    router.back();
  };
  if (isLoading) {
    return <div>Загрузка...</div>;
  }
  return (
    <div className='mb-10'>
      <div
        className='flex w-fit cursor-pointer items-center gap-2 py-[13px]'
        onClick={handleButtonAllFlight}
      >
        <SvgSprite name={'arrow'} width={40} height={40} className='rotate-180' />
        <Typography variant='h4' className='text-base-950 leading-[1.1em]'>
          Все рейсы
        </Typography>
      </div>
      <div className='rounded-[20px] p-10 shadow-[0px_7px_7px_rgba(44,54,131,0.09)]'>
        <TableLineGroup>
          <LineCellText text='Общая информация' />
          <TableLine>
            <LineCell title='Авиакомпания' value={data?.airline} />
            <LineCell title='Номер рейса' value={data?.flight_number} />
          </TableLine>
          <TableLine>
            <LineCell title='Тип' value={data?.flight_type} />
            <LineCell title='Класс' value={data?.service_class} />
          </TableLine>
          <TableLine>
            <LineCell title='Цена билета на взрослого' value={data?.price} />
            <LineCell title='Цена билета на ребенка' value={data?.price_for_child} />
          </TableLine>
        </TableLineGroup>
        <TableLineGroup>
          <LineCellText text='Вылет' />
          <TableLine>
            <LineCell title='Город вылета' value={data?.departure_city} />
            <LineCell title='Аэропорт вылета' value={data?.departure_airport} />
          </TableLine>
          <TableLine>
            <LineCell title='Дата вылета' value={data?.departure_date} />
            <LineCell title='Время вылета' value={data?.departure_time} />
          </TableLine>
        </TableLineGroup>
        <TableLineGroup>
          <LineCellText text='Прилет' />
          <TableLine>
            <LineCell title='Город прилета' value={data?.arrival_city} />
            <LineCell title='Аэропорт прилета' value={data?.arrival_airport} />
          </TableLine>
          <TableLine>
            <LineCell title='Дата прилета' value={data?.arrival_date} />
            <LineCell title='Время прилета' value={data?.arrival_time} />
          </TableLine>
        </TableLineGroup>
      </div>
      <div className='mt-10 flex flex-col items-center justify-between gap-6 md:flex-row'>
        <Select
          startValue={
            data?.flight_number
              ? `Заявка № ${data?.flight_number}`
              : 'Выбрать номер заявки'
          }
          options={addTextBeforeBid(['tt-332', 'yt-321', 'yt-5555', 'tt-222'])}
          color='blue'
          className='min-w-[280px]'
          arrowClass='w-[20px] h-[20px]'
          size='flights'
        />
        <div className='flex justify-center'>
          <ButtonCustom
            variant='secondary'
            size='l'
            onClick={handleButtonBack}
            className='box-border border-4 px-8 py-5 text-xl font-medium leading-[1.1em]'
          >
            Назад
          </ButtonCustom>
          <ButtonCustom
            variant='primary'
            size='l'
            className='ml-4 border-[0px] px-9 py-6 text-xl font-medium leading-[1.1em]'
            disabled={!data?.flight_number}
          >
            Добавить к заявке
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
}
