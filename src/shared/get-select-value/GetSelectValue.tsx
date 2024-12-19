'use client';

import React, { useEffect, useState } from 'react';
import { IGetSelectValue } from './GetSelectValue.types';
import { Select } from '../ui/select';

export function GetSelectValue({}: IGetSelectValue) {
  const [value, setValue] = useState(options[0]);

  const handleChange = (val: string) => {
    setValue(val);
  };

  useEffect(() => {
    console.log(value);
  }, [value]);

  return <Select options={options} getValue={(val) => handleChange(val)} />;
}

const options = ['a', 'b', 'c'];
