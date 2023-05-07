import React from "react";
import { renderWithProviders } from "utils/test-utils";
import { updateTodo } from "store/slices/todoSlice";
import { useDispatch } from "react-redux";
import { screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../todo-item";

describe("TodoItem", () => {
  const testItem = {
    id: "testId",
    title: "Test title",
    isCompleted: false,
  };

  it("renders correctly", () => {
    const { container } = renderWithProviders(<TodoItem item={testItem} />);
    expect(container).toMatchSnapshot();
  });
  it("renders the item title and delete button", () => {
    renderWithProviders(<TodoItem item={testItem} />);

    expect(screen.getByText(testItem.title)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "X" })).toBeInTheDocument();
  });

  it("marks the item as completed when checkbox is checked", () => {
    renderWithProviders(<TodoItem item={testItem} />);

    fireEvent.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  // it("opens edit mode when clicking on the item title", () => {
  //   renderWithProviders(<TodoItem item={testItem} />);

  //   fireEvent.click(screen.getByText(testItem.title));
  //   expect(screen.getByRole("textbox")).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
  //   expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  // });

  // it("updates the item title when 'Save' is clicked", () => {
  //   const { store } = renderWithProviders(<TodoItem item={testItem} />);

  //   fireEvent.click(screen.getByText(testItem.title));
  //   fireEvent.change(screen.getByRole("textbox"), { target: { value: "New title" } });
  //   fireEvent.click(screen.getByRole("button", { name: "Save" }));
  //   expect(store.getState().todoData.entities[testItem.id].title).toBe("New title");
  // });

  // it("cancels edit mode when 'Cancel' is clicked", () => {
  //   renderWithProviders(<TodoItem item={testItem} />);

  //   fireEvent.click(screen.getByText(testItem.title));
  //   fireEvent.change(screen.getByRole("textbox"), { target: { value: "New title" } });
  //   fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
  //   expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
  //   expect(screen.getByText(testItem.title)).toBeInTheDocument();
  // });

  // it("deletes the item when 'X' is clicked", () => {
  //   const { store } = renderWithProviders(<TodoItem item={testItem} />);

  //   fireEvent.click(screen.getByRole("button", { name: "X" }));
  //   expect(store.getState().todoData.entities[testItem.id]).toBeUndefined();
  // });
});
