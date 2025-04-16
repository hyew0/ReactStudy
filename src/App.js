import { useEffect, useState } from 'react';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {fetchPosts} from './actions/post';

/* 
store action reducer dispatch
store: 리덕스에서 관리하는 상태를 저장하는 객체이다.
action: store의 상태를 변경하기 위한 객체이다.
        action은 type과 payload로 구성되어 있다.
reducer: action을 받아서 새로운 state를 만들어주는 함수이다.
dispatch: action을 store에 전달하는 함수이다.
          dispatch는 action을 store에 전달하고, store는 reducer를 호출하여 새로운 state를 만든다.

useSelector: useSelector Hooks를 이용해서 스토어의 값을 가져올 수 있다.
useDispatch: useDispatch Hooks를 이용해서 스토어의 값을 변경할 수 있다.
              store에 있는 dispatch 함수에 접근하는 hook이다.
*/

function App() {

  const counter = useSelector((state) => state.counter);
  const todos = useSelector((state) => state.todos);
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  console.log('Posts:', posts);
  
  useEffect(() => {
    
    dispatch(fetchPosts());
  }, [dispatch])

  
  

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
        
      <ul>
          {todos.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>

        <form onSubmit={handleSubmit}>
          <input  
            type='text' 
            value={todoValue} 
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <input type='submit'/>
        </form>

        
      </div>

      <div>
        <ul>
          {posts.map((post,i) => <li key={i}>{post.title}</li>)}
        </ul>
      </div>
      
      
    </div>
  );
}

export default App;
