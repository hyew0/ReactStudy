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

  
  return (
    <div className="container">
        <div className="todoBlock">
          <div className="title">
            <h1>To do List</h1>
          </div>

          <Lists todoData={todoData} setTodoData={setTodoData} />

          <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
        </div>
    </div>
  )
}
