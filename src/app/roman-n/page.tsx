import { PopupWindow } from '@/shared/popup-window';
import { nanoid } from 'nanoid';
import React from 'react';

export default function RomanN() {
  return (
    <div className='w-screen h-screen'>
      <div className='relative'>
        <h2 className='bg-slate-400 w-fit'>'элемент PopupWindow'</h2>
        <PopupWindow className='px-4 py-5 top-15 left-3'>
          <ul className='w-fit'>
            {testList.map((option) => (
              <li key={nanoid()} className=''>
                {option}
              </li>
            ))}
          </ul>
        </PopupWindow>
        <PopupWindow className='px-2 py-3 top-24 left-40'>
          <h2 className=''>какой то подзаголовок</h2>
          <p className='text-sm'>текст для подзаголовка</p>
        </PopupWindow>
      </div>
    </div>
  );
}

const testList = [
  'option 1',
  'option 2',
  'option 3',
  'option 4',
  'option 5',
  'option 6',
  'option 7',
];
