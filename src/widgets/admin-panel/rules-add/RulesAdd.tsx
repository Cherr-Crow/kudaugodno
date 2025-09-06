'use client';

import React, { useEffect, useState } from 'react';

import { nanoid } from 'nanoid';
import { useSearchParams } from 'next/navigation';

import { useGetOneHotelQuery } from '@/servicesApi/hotelsApi';
import { ButtonCustom } from '@/shared/ui/button-custom';
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
  const [ruleName, setRuleName] = useState('');
  const [ruleDescription, setRuleDescription] = useState('');
  const { data } = useGetOneHotelQuery(id ? +id : 0);
  const [rules, setRules] = useState(oldRules || typeRules);

  const handleChangeCheckbox = (obj: Rule) => {
    if (!obj.checked) {
      const _rules = rules.filter((rule) => rule.name !== obj.name);
      setRules(_rules);
      return;
    }
    const _rules = rules.map((rule) =>
      rule.name === obj.name ? { ...rule, description: obj.description } : rule,
    );
    setRules(_rules);
  };

  useEffect(() => {
    if (!data) return;
    if (Array.isArray(data.rules) && !!data.rules.length) setRules(data.rules);
  }, [data]);

  useEffect(() => {
    getRules(rules || []);
  }, [rules]);

  const handleAddRule = () => {
    if (!rules) return;
    const _rules = [...rules, { name: ruleName, description: ruleDescription }];
    setRules(_rules);
    setRuleName('');
    setRuleDescription('');
  };

  return (
    <div className={`flex flex-col gap-3 pb-[10px] ${className ?? ''}`}>
      <ul className='mb-2 flex flex-col gap-5'>
        {rules?.map((rule) => (
          <li className='' key={nanoid()}>
            <RuleAdd rule={rule} getValue={handleChangeCheckbox} />
          </li>
        ))}
      </ul>
      <div className='min-w-80 rounded-2xl bg-grey-50 p-5'>
        <input
          type='text'
          name='addRule'
          className='mb-5 w-full rounded-md border border-grey-700 px-3 py-2 text-lg font-light focus:outline-none focus:ring-1 focus:ring-blue-500'
          placeholder='Название правила'
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
        />
        <textarea
          className='mb-[10px] h-[164px] w-full resize-none rounded-md border border-grey-700 px-3 py-2 text-lg font-light outline-none focus:border-blue-600'
          placeholder='Введите описание правила'
          name='addRule'
          value={ruleDescription}
          onChange={(e) => setRuleDescription(e.target.value)}
          title='Описание правила'
        />
        <ButtonCustom
          variant='secondary'
          size='s'
          className='min-w-[212px] bg-white'
          onClick={handleAddRule}
          disabled={!ruleName.trim() || !ruleDescription.trim()}
        >
          <Typography>Добавить правило</Typography>
        </ButtonCustom>
      </div>
    </div>
  );
}
