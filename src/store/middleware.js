import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { addTodo, updateTodo, removeTodo } from "./slices/todoSlice";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(addTodo, updateTodo, removeTodo),
  effect: (_, listenerApi) => {
    localStorage.setItem("todoData", JSON.stringify(listenerApi.getState()));
  },
});
