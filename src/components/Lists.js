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

/* 
Lists.js에서 localStorage를 사용할 수 있는 이유
Lists.js는 React 컴포넌트로, 브라우저 환경에서 실행됩니다. 
브라우저 환경에서는 localStorage가 전역 객체인 window의 일부로 제공되므로, 
React 컴포넌트 어디에서나 localStorage를 사용할 수 있습니다.

useEffect가 필요 없는 이유
Lists.js에서 useEffect를 사용하지 않고도 localStorage를 업데이트할 수 있는 이유는, 
상태 변경 함수(setTodoData) 내부에서 localStorage를 직접 업데이트하고 있기 때문입니다.

상태가 변경될 때마다 localStorage를 즉시 업데이트하므로, 추가적으로 useEffect를 사용할 필요가 없습니다.
*/

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
        localStorage.setItem('todoData', JSON.stringify(arrayMove(prev, oldIndex, newIndex)));
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
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };
  
  const handleClick = (id) => {
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
    localStorage.setItem('todoData', JSON.stringify(newTodoData));
  };

  const handleEdit = (id, newText) => {
    setTodoData((prev) =>{
      const updated = prev.map((item) =>
        item.id === id ? { ...item, title: newText } : item
      );
      localStorage.setItem('todoData', JSON.stringify(updated));
      return updated;
    });
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
              handleEdit={handleEdit} // 수정 핸들러 추가
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  )
}