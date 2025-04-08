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
    useSortable,
  } from '@dnd-kit/sortable';
  import { CSS } from '@dnd-kit/utilities';
  import React from 'react';
  
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
      const newTodoData = todoData.map((data) => {
        if (data.id === id) {
          data.completed = !data.completed;
        }
        return data;
      });
      setTodoData(newTodoData);
    };
  
    const handleClick = (id) => {
      const newTodoData = todoData.filter((data) => data.id !== id);
      setTodoData(newTodoData);
    };
  
    const RenderSortableItem = ({ data }) => {
      const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
      } = useSortable({ id: data.id });
  
      const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: '10px',
        margin: '5px 0',
        backgroundColor:  isDragging ? '#e0f7fa' : '#f9f9f9', 
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'grab',
      };
  
      return (
        <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
        >
          <div
            className={`flex items-center justify-between w-full `}
          >
            <div className="items-center">
              <input
                type="checkbox"
                onChange={() => handleCompleteChange(data.id)}
                defaultChecked={data.completed}
              />{' '}
              <span className={data.completed ? 'line-through' : ''}>
                {data.title}
              </span>
            </div>
            <div className="items-center">
              <button onClick={() => handleClick(data.id)}>x</button>
            </div>
          </div>
        </div>
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
              <RenderSortableItem key={data.id} data={data} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  }