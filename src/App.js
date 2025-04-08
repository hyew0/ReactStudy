import React, { useState } from 'react'
import './App.css'
import Lists from './components/Lists';
import Form from './components/Form';

export default function App() {

  const [todoData, setTodoData] = useState([
    {
      id: 1,
      title: "공부하기",
      completed: false,
    },
    {
      id: 2,
      title: "운동하기",
      completed: false,
    },
    {
      id: 3,
      title: "게임하기",
      completed: false,
    },
  ]);

  const [value, setValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let newTodo = {
      id: Date.now(),
      title: value,
      completed: false,
    }

    setTodoData( (prev) => 
      [...prev,newTodo]
    );
    setValue("");
  };

  const handleRemoveClick = () => {
    setTodoData([]);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
        <div className="w-full p-6 m-4 bg-white rounded shadow md:w-3/4 md:max-w-lg lg:w-3/4 lg:max-w-lg">
          <div className="flex justify-between mb-3">
            <h1>To do List</h1>
            <button onClick={handleRemoveClick}>Delete All</button>
          </div>
          


          <Lists todoData={todoData} setTodoData={setTodoData} />

          <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
        </div>
    </div>
  )
}
