import React, { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';

import { IRuleAdd } from './RuleAdd.types';

export function RuleAdd({ name, className, getValue }: IRuleAdd) {
  const [ruleDescription, setRuleDescription] = useState('');

  const handleChangeCheckbox = (e: boolean) => {
    getValue({ name: name, description: `${name}: ${ruleDescription}`, checked: e });
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRuleDescription(e.target.value);
  };

  return (
    <div className={`flex justify-between ${className ?? ''}`}>
      <Checkbox label={name} className='w-1/3' onChange={handleChangeCheckbox} />
      <input
        type='text'
        name={name}
        className='w-full rounded-md border border-grey-600 px-4 py-2'
        placeholder='Введите описание правила'
        value={ruleDescription}
        onChange={handleChangeValue}
      />
    </div>
  );
}
