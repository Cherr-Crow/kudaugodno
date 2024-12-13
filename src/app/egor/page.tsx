import React from 'react';
import { Switcher } from '@/shared/ui/switcher';
import { Checkbox } from '@/shared/checkbox';
import { RadioButton } from '@/shared/radio-button';

export default function Egor() {
  return <div className={`flex-col ml-5 mt-5`}>
    <div className={`mb-5`}>
      <label>Switcher</label>
      <Switcher/>
      <label>Switcher disabled</label>
      <Switcher isDisabled={true} />
      <label>Switcher's active by default</label>
      <Switcher isActive={true} />
    </div>

    <div className={`mb-5`}>
      <label>Checkbox</label>
      <Checkbox label='Checkbox text'/>
      <label>Checkbox disabled</label>
      <Checkbox label='Checkbox text' isDisabled={true} />
      <label>Switcher's active by default</label>
      <Checkbox label='Checkbox text' isChecked={true} />
    </div>

    <div>
      <label>RadioButton</label>
      <RadioButton label='RadioButton text'/>
      <label>RadioButton disabled</label>
      <RadioButton label='RadioButton text' isDisabled={true} />
      <label>Switcher's active by default</label>
      <RadioButton label='RadioButton text' isSelected={true} />
    </div>
  </div>;
}
