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
    console.log('Toggling complete for ID:', id);
    const newTodoData = todoData.map((data) => {
      if (data.id === id) {
        data.completed = !data.completed;
      }
      return data;
    });
    setTodoData(newTodoData);
  };
  
  const handleClick = (id) => {
    console.log('Deleting ID:', id);
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
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
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}