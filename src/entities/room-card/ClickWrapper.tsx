'use client';

import { ReactNode, useState } from 'react';

// Компонент-обертка для карточки, чтобы состояние :active правильно работало - пропускало нажатия по кнопкам и селекту, но срабатывало по нажатию на саму карточку

export function ClickWrapper({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  const [active, setActive] = useState(false);

  function isInteractiveElement(el: HTMLElement): boolean {
    return (
      ['BUTTON', 'A', 'SELECT', 'INPUT', 'TEXTAREA', 'LABEL'].includes(el.tagName) ||
      !!el.closest('button, a, select, input, textarea, label, .ui-select, .slider')
    );
  }

  function handleMouseDown(e: React.MouseEvent) {
    if (!isInteractiveElement(e.target as HTMLElement)) {
      setActive(true);
    }
  }

  function handleMouseUp(e: React.MouseEvent) {
    if (!isInteractiveElement(e.target as HTMLElement)) {
      setActive(false);
      onClick();
    }
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => setActive(false)}
      className={`relative rounded-[20px] transition-transform duration-300 ${
        active ? 'inner-border-active' : ''
      }`}
    >
      {children}
    </div>
  );
}
