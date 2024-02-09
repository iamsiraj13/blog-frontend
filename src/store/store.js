import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./reducers/todosSlice";
import counterReducer from "./reducers/counterSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    counter: counterReducer,
  },
});
