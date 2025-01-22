'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Select } from '@/shared/ui/select';

const monthIvan = [
  { value: 1, checked: false },
  { value: 2, checked: false },
  { value: 3, checked: false },
  {
    value: 4,
    checked: false,
  },
  { value: 5, checked: false },
  { value: 6, checked: false },
  { value: 7, checked: false },
  { value: 8, checked: false },
  { value: 9, checked: false },
  { value: 10, checked: false },
  { value: 11, checked: false },
  { value: 12, checked: false },
  { value: 13, checked: false },
  { value: 14, checked: false },
  { value: 15, checked: false },
  { value: 16, checked: false },
  { value: 17, checked: false },
  { value: 18, checked: false },
  { value: 19, checked: false },
  { value: 20, checked: false },
  { value: 21, checked: false },
  { value: 22, checked: false },
  { value: 23, checked: false },
  { value: 24, checked: false },
  { value: 25, checked: false },
  { value: 26, checked: false },
  { value: 27, checked: false },
  { value: 28, checked: false },
  { value: 29, checked: false },
  { value: 30, checked: false },
  { value: 31, checked: false },
];

export default function FromNikita() {
  const [chart, setChart] = useState('1/3');
  const [startData, setStartData] = useState<number>(1);
  const [workArr, setWorkArr] =
    useState<{ value: number; checked: boolean }[]>(monthIvan);

  const handleValueChart = (e: string) => {
    setChart(e);
  };

  const handleChangeStartDate = (index: number) => {
    setStartData(index);
  };

  useEffect(() => {
    if (chart === '1/3') {
      setWorkArr((prev) =>
        prev.map((el) => {
          if (el.value >= startData && (el.value - startData) % 4 === 0) {
            return { ...el, checked: true };
          }
          return { ...el, checked: false };
        }),
      );
    }

    if (chart === '5/2') {
      setWorkArr((prev) =>
        prev.map((el) => {
          switch (el.value - startData) {
            case 0:
              return { ...el, checked: true };
            case 1:
              return { ...el, checked: true };
            case 2:
              return { ...el, checked: true };
            case 3:
              return { ...el, checked: true };
            case 4:
              return { ...el, checked: true };
            case 7:
              return { ...el, checked: true };
            case 8:
              return { ...el, checked: true };
            case 9:
              return { ...el, checked: true };
            case 10:
              return { ...el, checked: true };
            case 11:
              return { ...el, checked: true };
            case 14:
              return { ...el, checked: true };
            case 15:
              return { ...el, checked: true };
            case 16:
              return { ...el, checked: true };
            case 17:
              return { ...el, checked: true };
            case 18:
              return { ...el, checked: true };
            case 21:
              return { ...el, checked: true };
            case 22:
              return { ...el, checked: true };
            case 23:
              return { ...el, checked: true };
            case 24:
              return { ...el, checked: true };
            case 27:
              return { ...el, checked: true };
            case 28:
              return { ...el, checked: true };
            case 29:
              return { ...el, checked: true };
            case 30:
            default:
              return { ...el, checked: false };
          }
        }),
      );
    }
  }, [chart, startData]);

  return (
    <div className='w-screen bg-white p-32'>
      <p className='m-2'>График работы</p>
      <Select
        options={['1/3', '5/2']}
        className='mb-20'
        getValue={handleValueChart}
      />
      <ul className='flex'>
        <h4 className=''>Иван</h4>
        {Array(31)
          .fill(0)
          .map((item, index: number) => {
            return (
              <li className='flex flex-col items-center border' key={index}>
                <div className='border-b p-2'>{index + 1}</div>
                <div className=''>
                  <input
                    type='checkbox'
                    checked={workArr[index].checked}
                    onChange={() => handleChangeStartDate(index + 1)}
                  />
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
