'use client';

import React, { useEffect, useRef, useState } from 'react';
import { IRulesAdd } from './RulesAdd.types';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { RuleAdd } from '@/shared/ui/rule-add';
import { nanoid } from 'nanoid';
import { Rule } from '@/shared/ui/rule-add/RuleAdd.types';
import { Modal } from '@/shared/modal';
import { NamedInput } from '@/shared/ui/named-input';
import { ButtonCustom } from '@/shared/ui/button-custom';

const typeRules = [
  'Размещение животных',
  'Детская кроватка',
  'Курение на территории',
  'Возрастные ограничения',
  'Отмена бронирования',
];

export function RulesAdd({ className }: IRulesAdd) {
  const [rules, setRules] = useState(typeRules);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const ruleValues = useRef<Rule[]>([]);
  let nameRule: string = '';

  const handleChangeCheckbox = (obj: Rule) => {
    if (obj.checked) {
      ruleValues.current = [
        ...ruleValues.current,
        { name: obj.name, description: obj.description, checked: obj.checked },
      ];
    } else {
      ruleValues.current = ruleValues.current.filter((val) => val.name !== obj.name);
    }
    console.log(ruleValues.current);
  };

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = (e: boolean) => {
    setIsOpenModal(e);
  };

  const handleAddRule = () => {
    if (nameRule === '') return;
    setRules((prev) => [...prev, nameRule]);
    setIsOpenModal(false);
    nameRule = '';
  };

  const addNameRule = (e: string) => {
    nameRule = e;
  };

  return (
    <div className={`flex flex-col gap-3 ${className ?? ''}`}>
      <Typography children='Правила' variant='l-bold' />
      <ul className='flex flex-col gap-2'>
        {rules.map((rule) => (
          <li className='' key={nanoid()}>
            <RuleAdd name={rule} getValue={handleChangeCheckbox} />
          </li>
        ))}
      </ul>
      <AddedButton text='Добавить правило' onClick={handleOpenModal} />
      {isOpenModal && (
        <Modal close={handleCloseModal}>
          <NamedInput
            name='addRule'
            getValue={addNameRule}
            title='Название правила'
            placeholder='Введите название правила'
            className='mb-5 w-96'
          />
          <ButtonCustom variant='primary' size='m' onClick={handleAddRule}>
            <Typography children='Добавить' />
          </ButtonCustom>
        </Modal>
      )}
    </div>
  );
}
