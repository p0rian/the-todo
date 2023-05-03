import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const todosAdapter = createEntityAdapter({});
const sliceName = "todo";
const todoSlice = createSlice({
  name: sliceName,
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        const { id, createdOn, title } = action.payload;
        todosAdapter.addOne(state, { id, createdOn, title });
      },
      prepare: (title) => {
        return {
          payload: {
            id: uuidv4(),
            createdOn: Date.now(),
            title,
          },
        };
      },
    },
    updateTodo: todosAdapter.updateOne,
    removeTodo: todosAdapter.removeOne,
  },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;

export const { selectAll: selectAllTodos, selectById: selectTodoById } =
  todosAdapter.getSelectors((state) => state.todoData);

export const todoReducer = todoSlice.reducer;
