'use client';

import React, { useState } from 'react';

import { ButtonCustom } from '@/shared/ui/button-custom';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { ICheckBoxBlock } from './CheckBoxBlock.types';

export function CheckBoxBlock({
  title,
  checkboxes,
  getNewList,
  className,
}: ICheckBoxBlock) {
  const [list, setList] = useState<string[]>(checkboxes);
  const [newAmount, setNewAmount] = useState('');

  const handleCheckedChange = (checked: boolean, name: string) => {
    if (checked) return;
    const _list = list.filter((item) => item !== name);
    setList(_list);
    getNewList(_list);
  };

  const handleAddAmount = () => {
    if (list.some((item) => item === newAmount)) {
      alert('Такое удобство уже присутствует в этом списке!');
      return;
    }
    setList([...list, newAmount]);
    getNewList([...list, newAmount]);
    setNewAmount('');
  };

  return (
    <div className={`flex flex-col rounded-lg bg-grey-50 p-5 ${className ?? ''}`}>
      <Typography variant='l-bold' className='mb-2 text-grey-950'>
        {title}
      </Typography>
      <div className='mb-4 flex gap-5'>
        {list.map((item, idx) => (
          <div
            className='flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-[10px]'
            key={idx}
          >
            <Typography variant='m' className='text-grey-950'>
              {item}
            </Typography>
            <SvgSprite
              name={'cross'}
              color='#1a1f4c'
              strokeWidth='2'
              width={10}
              height={10}
              className='cursor-pointer'
              onClick={() => handleCheckedChange(false, item)}
            />
          </div>
        ))}
      </div>
      <div className='flex h-[46px] gap-5'>
        <input
          type='text'
          name='amountAdd'
          className='w-full rounded-lg border border-grey-400 bg-transparent px-3 py-2 outline-none focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Введите название нового удобства'
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <ButtonCustom
          variant='secondary'
          size='s'
          className='h-full min-w-[216px] bg-white'
          onClick={handleAddAmount}
          disabled={!newAmount.trim()}
        >
          <Typography variant='m-bold'>Добавить удобство</Typography>
        </ButtonCustom>
      </div>
    </div>
  );
}
