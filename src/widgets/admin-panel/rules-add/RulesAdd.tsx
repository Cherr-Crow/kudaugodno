'use client';

import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { Modal } from '@/shared/modal';
import { AddedButton } from '@/shared/ui/added-button';
import { ButtonCustom } from '@/shared/ui/button-custom';
import { NamedInput } from '@/shared/ui/named-input';
import { RuleAdd } from '@/shared/ui/rule-add';
import { Rule } from '@/shared/ui/rule-add/RuleAdd.types';
import { Typography } from '@/shared/ui/typography';

import { IRulesAdd } from './RulesAdd.types';

const typeRules = [
  { name: 'Размещение животных', description: '' },
  { name: 'Детская кроватка', description: '' },
  { name: 'Курение на территории', description: '' },
  { name: 'Возрастные ограничения', description: '' },
  { name: 'Отмена бронирования', description: '' },
];

export function RulesAdd({ className, getRules, oldRules }: IRulesAdd) {
  const id = useSearchParams().get('id');
  const { data } = useGetOneHotelQuery(id ? +id : 0);
  const [rules, setRules] = useState(oldRules || typeRules);
  const [isOpenModal, setIsOpenModal] = useState(false);
  let name: string = '';
  let description: string = '';
  let newRules = rules;

  const handleChangeCheckbox = (obj: Rule) => {
    if (!obj.checked) {
      const _rules = newRules?.filter((rule) => rule.name !== obj.name);
      setRules(_rules);
      newRules = _rules;
      return;
    }
    newRules = newRules?.map((rule) => {
      return rule.name === obj.name
        ? { ...rule, description: obj.description }
        : rule;
    });
  };

  useEffect(() => {
    if (!data) return;
    if (Array.isArray(data.rules) && !!data.rules.length) setRules(data.rules);
  }, [data]);

  useEffect(() => {
    getRules(newRules || []);
  }, [newRules]);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleAddRule = () => {
    if (!rules) return;
    const _rules = [...rules, { name, description }];
    setRules(_rules);
    setIsOpenModal(false);
  };

  return (
    <div className={`flex flex-col gap-3 overflow-scroll pb-10 ${className ?? ''}`}>
      <Typography variant='l-bold'>Правила</Typography>
      <ul className='flex flex-col gap-2'>
        {rules?.map((rule) => (
          <li className='' key={nanoid()}>
            <RuleAdd rule={rule} getValue={handleChangeCheckbox} />
          </li>
        ))}
      </ul>
      <AddedButton text='Добавить правило' onClick={handleOpenModal} />
      <Modal isOpen={isOpenModal} getState={setIsOpenModal}>
        <div className='min-w-80'>
          <NamedInput
            name='addRule'
            getValue={(val) => (name = val as string)}
            title='Название правила'
            placeholder='Введите название правила'
            className='mb-5 w-96'
          />
          <NamedInput
            name='addRule'
            getValue={(val) => (description = val as string)}
            title='Описание правила'
            placeholder='Введите описание правила'
            className='mb-5 w-96'
          />
          <ButtonCustom variant='primary' size='m' onClick={handleAddRule}>
            <Typography>Добавить</Typography>
          </ButtonCustom>
        </div>
      </Modal>
    </div>
  );
}
