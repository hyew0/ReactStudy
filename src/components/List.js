import React, {memo} from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const List = memo(function List({data, handleCompleteChange, handleClick}) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    listeners,
    attributes,
  } = useSortable({ id: data.id });
  

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: '10px',
    margin: '5px 0',
    backgroundColor: isDragging ? '#e0f7fa' : '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <div className="flex items-center justify-between w-full">
        {/* 왼쪽: 드래그, 체크박스, 텍스트 */}
        <div className="flex items-center">
          <div
            {...listeners}
            onClick={(e) => e.stopPropagation()}
            className="cursor-grab text-gray-400 hover:text-gray-600 text-xl mr-2"
          >
            ≡
          </div>
          <div className="items-center">
            <input
              type="checkbox"
              onClick={(event) => event.stopPropagation()}
              onChange={() => handleCompleteChange(data.id)}
              checked={data.completed}
            />{' '}
            <span className={data.completed ? 'line-through' : ''}>
              {data.title}
            </span>
          </div>
        </div>

        {/* 오른쪽: 삭제 버튼 */}
        <div className="items-center">
          
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleClick(data.id);
            }}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100  hover:bg-red-200"
          >
            x
          </button>
        </div>
      </div>

    </div>
  );
}
);

export default List;