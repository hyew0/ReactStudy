import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import React from 'react';
import List from './List';

export default function Lists({ todoData, setTodoData }) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setTodoData((prev) => {
        const oldIndex = prev.findIndex((item) => item.id === active.id);
        const newIndex = prev.findIndex((item) => item.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const handleCompleteChange = (id) => {
    const newTodoData = todoData.map((data) =>
      data.id === id ? { ...data, completed: !data.completed } : data
    );
    setTodoData(newTodoData);
  };

  const handleClick = (id) => {
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };

  const handleEdit = (id, newText) => {
    setTodoData((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, title: newText } : item
      )
    );
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todoData.map((data) => data.id)}
        strategy={verticalListSortingStrategy}
      >
        <div>
          {todoData.map((data) => (
            <List
              key={data.id}
              data={data}
              handleCompleteChange={handleCompleteChange}
              handleClick={handleClick}
              handleEdit={handleEdit}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
