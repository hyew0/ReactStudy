import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";
import posts from "./posts";


const rootReducer = combineReducers({
    todos: todos,
    counter: counter,
    posts: posts
})

export default rootReducer;