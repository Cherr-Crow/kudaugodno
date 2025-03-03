import React, { useState } from 'react';

import { Checkbox } from '@/shared/ui/checkbox';

import { IRuleAdd } from './RuleAdd.types';

export function RuleAdd({ rule, className, getValue }: IRuleAdd) {
  const [description, setDescription] = useState(rule.description);

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    getValue({ name: rule.name, description: e.target.value, checked: true });
  };

  const handleChange = (e: boolean) => {
    getValue({ name: rule.name, description, checked: e });
  };

  return (
    <div className={`flex justify-between ${className ?? ''}`}>
      <Checkbox
        label={rule.name}
        className='w-1/3'
        onChange={handleChange}
        isChecked={true}
      />
      <input
        type='text'
        name={rule.name}
        className='w-full rounded-md border border-grey-600 px-4 py-2'
        placeholder='Введите описание правила'
        value={description}
        onChange={handleChangeValue}
      />
    </div>
  );
}
