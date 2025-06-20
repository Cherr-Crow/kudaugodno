'use client';

import React, { useState } from 'react';

import { IAuthState } from './AuthState.types';
import { EnterCodeState } from './EnterCodeState';
import { EnterEmailState } from './EnterEmailState';

export function AuthState({ onStageChange }: IAuthState) {
  const [showCodePanel, setShowCodePanel] = useState<boolean>(false);

  const handleShowCodePanel = () => {
    setShowCodePanel(true);
    onStageChange('code');
  };

  return (
    <>
      {showCodePanel ? (
        <EnterCodeState />
      ) : (
        <EnterEmailState onEmailConfirmed={handleShowCodePanel} />
      )}
    </>
  );
}
