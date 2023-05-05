import { configureStore } from "@reduxjs/toolkit";
import { reducers } from "./reducers";
import { listenerMiddleware } from "./middleware";

const todoState = JSON.parse(localStorage.getItem("todoData") || "null");
export const store = configureStore({
  preloadedState: {
    todoData: todoState.todoData,
  },
  reducer: { ...reducers },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
});
