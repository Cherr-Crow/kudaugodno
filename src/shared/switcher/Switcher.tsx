'use client';

import React, { useState } from 'react';
import { ISwitcher } from './Switcher.types';

const Switcher: React.FC<ISwitcher> = ({
  label = '',
  isActive = false,
  isDisabled = false,
  onToggle = () => {},
}) => {
  const [active, setActive] = useState(isActive);

  const handleToggle = () => {
    if (isDisabled) return;
    const newState = !active;
    setActive(newState);
    onToggle(newState);
  };

  return (
    <div className="flex items-center space-x-1">
      <button
        className={`relative flex h-8 w-16 rounded-2xl transition-colors duration-300
          ${isDisabled ? 'bg-blue-disabled outline outline-blue-extra-light cursor-not-allowed' : active? 'bg-blue-primary outline outline-blue-500' : 'bg-blue-light outline outline-blue-300' }
          ${!isDisabled && 'hover:bg-blue-extra-light hover:outline hover:outline-blue-light'}
          ${!isDisabled && 'hover:drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]'}
          ${!isDisabled && 'active:bg-blue-primary active:outline active:outline-blue-500'}
        `}
        onClick={handleToggle}
        disabled={isDisabled}
      >
        <span
          className={`absolute left-0 top-0.5 m-1 h-5 w-5 transform rounded-full bg-white transition-transform duration-300
            ${active ? 'translate-x-9' : 'translate-x-0'}
            drop-shadow-[0_3.81px_11.43px_rgba(0,0,0,0.1)],
            drop-shadow-[0_0.95px_1.9px_rgba(0,0,0,0.1)]
          `}
        />
      </button>
      <span className="text-xl font-medium">
        {active ? label || 'On' : 'Off'}
      </span>
    </div>
  );
};

export default Switcher;