import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "store/store";
import { TodoFilter } from "../todo-filter";

describe("TodoFilter component", () => {
  it("renders correctly", () => {
    const filter = "all";
    const handleFilterChange = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <TodoFilter filter={filter} handleFilterChange={handleFilterChange} />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
