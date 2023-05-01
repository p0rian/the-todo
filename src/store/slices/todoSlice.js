import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoItems: [
    { id: 1, title: "first todo" },
    { id: 2, title: "first todo" },
    { id: 3, title: "first todo" },
  ],
};

const sliceName = "todo";
const todoSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: state.todoItems.at(-1).id + 1,
        title: action.payload.title,
      };
      state.todoItems.push(newTodo);
    },
  },
});

export const { addTodo } = todoSlice.actions;

export const todoDataSelector = (state) => state.todoData;

export const todoReducer = todoSlice.reducer;
