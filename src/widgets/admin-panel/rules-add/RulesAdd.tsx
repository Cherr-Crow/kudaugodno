'use client';

import React, { useEffect, useState } from 'react';
import { IRulesAdd } from './RulesAdd.types';
import { Typography } from '@/shared/typography';
import { AddedButton } from '@/shared/ui/added-button';
import { RuleAdd } from '@/shared/ui/rule-add';
import { nanoid } from 'nanoid';

const typeRules = [
  'Размещение животных',
  'Детская кроватка',
  'Курение на территории',
  'Возрастные ограничения',
  'Отмена бронирования',
];

export function RulesAdd({ className }: IRulesAdd) {
  const [rules, setRules] = useState(typeRules);
  const [valuesRule, setValuesRule] = useState<
    { name: string; description: string }[]
  >([]);

  const getValueRule = (e: {
    name: string;
    description: string;
    checked: boolean;
  }) => {
    if (e.checked) {
      setValuesRule((prev) => [...prev, e]);
    } else {
      setValuesRule((prev) => prev.filter((v) => v.name !== e.name));
    }
  };

  useEffect(() => {
    console.log(valuesRule);
  }, [valuesRule]);

  return (
    <div className={`flex flex-col gap-3 ${className && className}`}>
      <Typography children='Правила' variant='l-bold' />
      <ul className='flex flex-col gap-2'>
        {rules.map((rule) => (
          <li className='' key={nanoid()}>
            <RuleAdd name={rule} getValue={getValueRule} />
          </li>
        ))}
      </ul>
      <AddedButton text='Добавить правило' onClick={() => {}} />
    </div>
  );
}
