import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "store/store";
import { TodoItem } from "../todo-item";

describe("TodoItem component", () => {
  it("renders correctly", () => {
    const item = {
      title: "Buy groceries",
      isCompleted: false,
      id: "1",
    };
    const { container } = render(
      <Provider store={store}>
        <TodoItem item={item} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
