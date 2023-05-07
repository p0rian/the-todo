/* eslint-disable react/prop-types */
import React from "react";
import { render } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { todoReducer } from "store/slices/todoSlice";

export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = configureStore({ reducer: { todoData: todoReducer }, preloadedState }),
    ...renderOptions
  } = {},
) {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

  // Return an object with the store and all of RTL's query functions
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
