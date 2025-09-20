'use client';

import React, { useState } from 'react';

import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext } from '@dnd-kit/sortable';

import { AmenitiesItem } from '@/shared/ui/amenitiesItem/amenities-Item';
import { SvgSprite } from '@/shared/ui/svg-sprite';
import { Typography } from '@/shared/ui/typography';

import { IAmenitiesChangeBlock } from './AmenitiesChangeBlock.types';
import { IAmenity } from '../admin-panel/added-hotel-field/services/arrais';

export function AmenitiesChangeBlock({
  checkboxes,
  getNewList,
}: IAmenitiesChangeBlock) {
  const [list, setList] = useState(checkboxes);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleCheckedChange = (checked: boolean, id: string) => {
    const item = list.find((i) => i.id === id);
    if (!item) return;

    let updatedChecked: string[];

    if (checked) {
      updatedChecked = [...checkedItems, item.label];
      setCheckedItems(updatedChecked);
    } else {
      updatedChecked = checkedItems.filter((label) => label !== item.label);
      setCheckedItems(updatedChecked);
    }

    const selectedLabels = list.filter((item) =>
      updatedChecked.includes(item.label),
    );

    getNewList(selectedLabels);
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeItem = list.find((item) => item.id === active.id);
    const overItem = list.find((item) => item.id === over.id);
    if (!activeItem || !overItem) return;

    const activeLabel = activeItem.label;
    const overLabel = overItem.label;

    const isActiveChecked = checkedItems.includes(activeLabel);
    const isOverChecked = checkedItems.includes(overLabel);

    // Если оба — отмеченные, меняем порядок в checkedItems
    if (isActiveChecked && isOverChecked) {
      const oldIndex = checkedItems.indexOf(activeLabel);
      const newIndex = checkedItems.indexOf(overLabel);
      const newChecked = arrayMove(checkedItems, oldIndex, newIndex);
      setCheckedItems(newChecked);

      const selectedLabels = list.filter((item) => newChecked.includes(item.label));
      getNewList(selectedLabels);
      return;
    }

    // Иначе двигаем в основном списке (например, если это unselected)
    const oldIndex = list.findIndex((item) => item.id === active.id);
    const newIndex = list.findIndex((item) => item.id === over.id);
    const newList = arrayMove(list, oldIndex, newIndex);
    setList(newList);

    const selectedLabels = newList.filter((item) =>
      checkedItems.includes(item.label),
    );
    getNewList(selectedLabels);
  };

  const selected = checkedItems
    .map((label) => list.find((item) => item.label === label))
    .filter((item): item is (typeof list)[number] => Boolean(item));

  const unselected = list.filter((item) => !checkedItems.includes(item.label));

  const sortedList = [...selected, ...unselected];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // не будет драгаться, пока курсор не сместится на 5px
      },
    }),
  );

  function AmenitiesItemOverlay({
    item,
    isChecked,
  }: {
    item: IAmenity;
    isChecked: boolean;
  }) {
    return (
      <div
        className={`flex h-[56px] w-[250px] shrink-0 cursor-grabbing items-center justify-center gap-2 rounded-[20px] border border-blue-950 p-3 text-blue-950 transition-all ${isChecked ? 'bg-blue-200' : 'bg-white'} shadow-lg`}
      >
        <SvgSprite name={item.icon} color='#1a1f4c' strokeWidth='2' />
        <Typography variant='l'>{item.label}</Typography>
      </div>
    );
  }

  return (
    <div className={`flex flex-col gap-[6px] rounded-xl`}>
      <Typography variant='s-bold'>
        Основные (отображаются вверху страницы)
      </Typography>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={(event) => {
          handleDragEnd(event);
          setActiveId(null);
        }}
        onDragCancel={() => setActiveId(null)}
      >
        <SortableContext items={sortedList.map((item) => item.id)}>
          <div className='flex flex-wrap gap-x-5 gap-y-3'>
            {sortedList.map((item) => (
              <AmenitiesItem
                key={item.id}
                item={item}
                isChecked={checkedItems.includes(item.label)}
                onCheckedChange={(checked) => handleCheckedChange(checked, item.id)}
              />
            ))}
          </div>
        </SortableContext>
        <DragOverlay style={{ cursor: 'grabbing' }}>
          {activeId ? (
            <AmenitiesItemOverlay
              item={list.find((i) => i.id === activeId)!}
              isChecked={checkedItems.includes(
                list.find((i) => i.id === activeId)!.label,
              )}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
