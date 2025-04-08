import React, { useState, useEffect } from 'react'
import './App.css'
import Lists from './components/Lists';
import Form from './components/Form';


export default function App() {

  const initialTodoData = localStorage.getItem('todoData') 
      ? JSON.parse(localStorage.getItem('todoData')) 
      : [];

  const [todoData, setTodoData] = useState(initialTodoData);
  const [value, setValue] = useState("");

  useEffect(() => {
    localStorage.setItem('todoData', JSON.stringify(todoData));}, [todoData]);


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
