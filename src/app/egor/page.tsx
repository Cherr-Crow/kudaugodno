import { Switcher } from '@/shared/switcher';
import React from 'react';

export default function Egor() {
  return <div className={`flex-col`}>
    <label>Switcher</label>
    <Switcher/>
    <label>Switcher disabled</label>
    <Switcher isDisabled={true} />
    <label>Switcher's active by default</label>
    <Switcher isActive={true} />
  </div>;
}
