import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const todosAdapter = createEntityAdapter({});
const sliceName = 'todo';
const todoSlice = createSlice({
  name: sliceName,
  initialState: todosAdapter.getInitialState(),
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        const { id, createdOn, title, isCompleted } = action.payload;
        todosAdapter.addOne(state, { id, createdOn, title, isCompleted });
      },
      prepare: (title) => {
        return {
          payload: {
            id: uuidv4(),
            createdOn: Date.now(),
            title,
            isCompleted: false,
          },
        };
      },
    },
    updateTodo: todosAdapter.updateOne,
    removeTodo: todosAdapter.removeOne,
  },
});

export const { addTodo, updateTodo, removeTodo } = todoSlice.actions;

export const selectAllTodos = (state) =>
  todosAdapter.getSelectors((state) => state.todoData).selectAll(state);

export const selectCompletedTodos = (state) =>
  selectAllTodos(state).filter((todo) => todo.isCompleted);

export const selectActiveTodos = (state) =>
  selectAllTodos(state).filter((todo) => todo.isCompleted === false);

export const todoReducer = todoSlice.reducer;
