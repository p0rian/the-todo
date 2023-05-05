import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { listenerMiddleware } from "./middleware";

const todoState = JSON.parse(localStorage.getItem("todoData") || "null");
const preloadedState = todoState ? { todoData: todoState.todoData } : {};

export const store = configureStore({
  preloadedState,
  reducer: { ...reducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});
