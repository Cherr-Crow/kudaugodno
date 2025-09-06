import React, { useState } from 'react';

import { IRuleAdd } from './RuleAdd.types';
import { SvgSprite } from '../svg-sprite';
import { Typography } from '../typography';

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
    <div className={`flex gap-5 ${className ?? ''}`}>
      <div className='flex min-w-[280px] items-center justify-between whitespace-nowrap rounded-lg bg-blue-50 px-3 py-[10px]'>
        <Typography variant='m' className='text-grey-950'>
          {rule.name}
        </Typography>
        <SvgSprite
          name={'cross'}
          color='#1a1f4c'
          strokeWidth='2'
          width={10}
          height={10}
          className='cursor-pointer'
          onClick={() => handleChange(false)}
        />
      </div>
      <input
        type='text'
        name={rule.name}
        className='w-full rounded-md border border-grey-600 px-3 py-2 text-lg outline-none focus:border-blue-600'
        placeholder='Введите описание правила'
        value={description}
        onChange={handleChangeValue}
      />
    </div>
  );
}
