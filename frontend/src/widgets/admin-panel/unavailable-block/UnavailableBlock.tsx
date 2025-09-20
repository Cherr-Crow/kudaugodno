import React, { useState } from 'react';

import { NamedInput } from '@/shared/ui/named-input';
import { InputDateForSearchBlock } from '@/shared/ui/search-block/input-date-for-search-block';
import { Typography } from '@/shared/ui/typography';

import { IUnavailableBlock } from './UnavailableBlock.types';

export function UnavailableBlock({ startData, getData }: IUnavailableBlock) {
  const [reason, setReason] = useState<string>(
    startData[0] ? startData[0].reason : '',
  );
  const [startDate, setStartDate] = useState<string>(
    startData[0] ? startData[0].start_date : '',
  );
  const [endDate, setEndDate] = useState<string>(
    startData[0] ? startData[0].end_date : '',
  );

  const handleReasonChange = (val: string) => {
    setReason(val);
    getData([
      {
        reason: val,
        start_date: startDate,
        end_date: endDate,
      },
    ]);
  };

  const handleStartDateChange = (val: string) => {
    const _val = val.replaceAll('.', '-');
    setStartDate(_val);
    getData([
      {
        reason,
        start_date: _val,
        end_date: endDate,
      },
    ]);
  };

  const handleEndDateChange = (val: string) => {
    const _val = val.replaceAll('.', '-');
    setEndDate(_val);
    getData([
      {
        reason,
        start_date: startDate,
        end_date: _val,
      },
    ]);
  };

  return (
    <div className=''>
      <Typography variant='l-bold'>
        Недоступны для бронирования по техническим причинам:
      </Typography>
      <div className='flex gap-3'>
        <NamedInput
          name='Причина'
          placeholder='Причина'
          getValue={(val) => handleReasonChange(val as string)}
          startValue={reason}
        />
        <InputDateForSearchBlock
          placeholder='С какого не доступен'
          getValue={handleStartDateChange}
          className='rounded-md border border-blue-600'
          startValue={startDate}
        />
        <InputDateForSearchBlock
          placeholder='До какого не доступен'
          getValue={handleEndDateChange}
          className='rounded-md border border-blue-600'
          startValue={endDate}
        />
      </div>
    </div>
  );
}
