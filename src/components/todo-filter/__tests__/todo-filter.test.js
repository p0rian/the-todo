import React from "react";
import { renderWithProviders } from "utils/test-utils";
import { TodoFilter } from "../todo-filter";

describe("TodoFilter component", () => {
  it("renders correctly", () => {
    const filter = "all";
    const handleFilterChange = jest.fn();
    const { container } = renderWithProviders(
      <TodoFilter filter={filter} handleFilterChange={handleFilterChange} />,
    );
    expect(container).toMatchSnapshot();
  });
});
