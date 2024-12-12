"use client";



import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar_custom.css';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export function CalendarBlock() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div>
      <Calendar className="mt-4 ml-4"  onChange={onChange} value={value}  next2Label="›"
      prev2Label="›" 
      navigationLabel={({ label }) => (
        <span className="custom-calendar-label">
          <span style={{ fontSize: '30px'}}>
            {label.charAt(0)}
          </span>
          {label.slice(1)}
         
        </span>
      )} />
    </div>
  );
}