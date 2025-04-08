import React, {memo, useState} from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const List = memo(function List({data, handleCompleteChange, handleClick, handleEdit}) {
  const {
    setNodeRef,
    transform,
    transition,
    isDragging,
    listeners,
    attributes,
  } = useSortable({ id: data.id });
  
  const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태
  const [editText, setEditText] = useState(data.title); // 수정 중인 텍스트 상태

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

  const handleSave = () => {
    handleEdit(data.id, editText); // 부모 컴포넌트로 수정된 텍스트 전달
    setIsEditing(false); // 수정 모드 종료
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
            {isEditing ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)} // 텍스트 업데이트
                onClick={(e) => e.stopPropagation()} // 클릭 이벤트 전파 방지
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave(); // Enter 키로 저장
                  if (e.key === 'Escape') setIsEditing(false); // Escape 키로 취소
                }}
                className="border rounded px-2 py-1"
              />
            ) : (
              <span
                className={data.completed ? 'line-through' : ''}
                onDoubleClick={() => setIsEditing(true)} // 더블 클릭으로 수정 모드 진입
              >
                {data.title}
              </span>
            )}
          </div>
        </div>

        {/* 오른쪽: 수정 및 삭제 버튼 */}
        <div className="items-center flex">
          {isEditing ? (
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleSave(); // 저장 버튼 클릭 시 저장
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-green-100 hover:bg-green-200 mr-2"
            >
              ✔
            </button>
          ) : (
            <button
              onClick={(event) => {
                event.stopPropagation();
                setIsEditing(true); // 수정 모드로 전환
              }}
              className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 hover:bg-green-200 mr-2"
            >
              edit
            </button>
          )}
          <button
            onClick={(event) => {
              event.stopPropagation();
              handleClick(data.id); // 삭제 핸들러 호출
            }}
            className="w-6 h-6 flex items-center justify-center rounded-full bg-blue-100 hover:bg-red-200"
          >
            x
          </button>
        </div>
      </div>
    </div>
  );
});

export default List;