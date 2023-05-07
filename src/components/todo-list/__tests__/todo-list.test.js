import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "store/store";
import { TodoList } from "../todo-list";

describe("TodoList component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <TodoList />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
