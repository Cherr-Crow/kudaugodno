'use client';

import React, { useState } from 'react';

import { nanoid } from 'nanoid';

import { Modal } from '@/shared/modal';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { Checkbox } from '@/shared/ui/checkbox';

import { ICheckBoxBlock } from './CheckBoxBlock.types';

export function CheckBoxBlock({
  title,
  checkboxes,
  getNewList,
  className,
}: ICheckBoxBlock) {
  const [list, setList] = useState<string[]>(checkboxes);
  const [newAmount, setNewAmount] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCheckedChange = (checked: boolean, name: string) => {
    if (checked) return;
    const _list = list.filter((item) => item !== name);
    setList(_list);
    getNewList(_list);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setNewAmount('');
  };

  const handleAddAmount = () => {
    if (list.some((item) => item === newAmount)) {
      alert('Такое удобство уже присутствует в этом списке!');
      return;
    }
    setList([...list, newAmount]);
    getNewList([...list, newAmount]);
    setIsOpenModal(false);
  };

  return (
    <div className={`flex flex-col gap-4 rounded-xl p-3 ${className ?? ''}`}>
      <Typography variant='s-bold'>{title}</Typography>
      <div className='flex gap-3'>
        {list.map((checkbox) => (
          <Checkbox
            label={checkbox}
            key={nanoid()}
            isChecked={true}
            onChange={(checked) => handleCheckedChange(checked, checkbox)}
          />
        ))}
      </div>
      <AddedButton text='Добавить удобство' onClick={handleOpenModal} />
      <Modal isOpen={isOpenModal} getState={handleCloseModal}>
        <div className='flex flex-col gap-4'>
          <input
            type='text'
            name='amounAdd'
            id={nanoid()}
            className='border-gray-200 w-full rounded border p-2 outline-none'
            placeholder='введите название нового удобства'
            value={newAmount}
            onChange={(e) => setNewAmount(e.target.value)}
          />
          <div className='flex gap-3'>
            <ButtonCustom variant='tetriary' size='s' onClick={handleCloseModal}>
              <Typography>Отменить</Typography>
            </ButtonCustom>
            <ButtonCustom variant='primary' size='s' onClick={handleAddAmount}>
              <Typography>Добавить</Typography>
            </ButtonCustom>
          </div>
        </div>
      </Modal>
    </div>
  );
}
