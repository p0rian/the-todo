import React from "react";
import { renderWithProviders } from "utils/test-utils";
import { TodoItem } from "../todo-item";

describe("TodoItem component", () => {
  it("renders correctly", () => {
    const item = {
      title: "Buy groceries",
      isCompleted: false,
      id: "1",
    };
    const { container } = renderWithProviders(<TodoItem item={item} />);
    expect(container).toMatchSnapshot();
  });
});
