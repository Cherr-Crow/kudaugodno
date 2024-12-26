'use client';

import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { Value } from './Calendar.types';

export function CalendarBlock() {
  const [value, onChange] = useState<Value>(new Date());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient ? (
    <div>
      <Calendar
        onChange={onChange}
        value={value}
        next2Label='›'
        prev2Label='›'
        navigationLabel={({ label }) => (
          <span className='custom-calendar-label'>
            <span style={{ fontSize: '30px' }}>{label.charAt(0)}</span>
            {label.slice(1)}
          </span>
        )}
      />
    </div>
  ) : (
    <></>
  );
}
