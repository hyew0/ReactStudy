import { useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

/* 
useSelector: useSelector Hooks를 이용해서 스토어의 값을 가져올 수 있다.
useDispatch: useDispatch Hooks를 이용해서 스토어의 값을 변경할 수 있다.
*/

function App() {

  const counter = useSelector((state) => state.counter);
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos);

  const [todoValue, setTodoValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({type: 'ADD_TODO', text: todoValue})
  }  

  const handleIncrement = () => {
    dispatch({type: 'INCREMENT'})
  }

  const handleDecrement = () => {
    dispatch({type: 'DECREMENT'})
  }


  return (
    <div className="App">
      <p>
        Clicked: {counter} times
        {" "}
        <button onClick={handleIncrement}>
          +
        </button>
        {" "}
        <button onClick={handleDecrement}>
          -
        </button>
      </p>

      <div>
        
        <form onSubmit={handleSubmit}>
          <input  
            type='text' 
            value={todoValue} 
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <input type='submit'/>
        </form>

        <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
      
      
    </div>
  );
}

export default App;
