import React, { FC, JSX, useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  DragEndEvent,
  MouseSensor,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

export type PropsType = {
  children: JSX.Element | JSX.Element[];
  items: Array<{ id: string; [key: string]: any }>;
  onDragEnd: (oldIndex: number, newIndex: number) => void;
};

const SortableContainer: FC<PropsType> = (props: PropsType) => {
  const { items, children, onDragEnd } = props;

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8, //鼠标移动超过8px时触发拖拽
      },
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    //active (被拖拽的元素) 你正在拖动的那个元素
    //over (目标位置的元素) 你拖拽到上方的那个元素（鼠标释放时所在的元素）
    //拖拽 A 到 C 的位置 active.id = 'A' over.id = 'C' 结果：['B', 'C', 'A', 'D']
    const { active, over } = event;
    if (!over) return; //over 为 null 的情况：当拖拽到可放置区域外时，over 会是 null，需要处理

    if (active.id !== over.id) {
      //代码先判断 active.id !== over.id，避免不必要的自身交换

      const oldIndex = items.findIndex(
        (component) => component.id === active.id
      ); // 找到被拖拽项的原索引
      const newIndex = items.findIndex((component) => component.id === over.id); // 找到目标位置的索引

      return onDragEnd(oldIndex, newIndex); // 交换位置 important!!为了实现交换的同时数据联动，交换得由dispatch redux来处理
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {/* {items.map((id) => (
          <SortableItem key={id} id={id} />
        ))} */}
        {/* 这里放可以进行拖拽的item，但我们封装好组件，可拖拽的item需要由外边的使用者传递进来 */}
        {children}
      </SortableContext>
    </DndContext>
  );
};

export default SortableContainer;
