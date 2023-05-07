import React from "react";
import { renderWithProviders } from "utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { TodoList } from "../todo-list";

describe("TodoList component", () => {
  it("renders correctly", () => {
    const { container } = renderWithProviders(<TodoList />);

    expect(container).toMatchSnapshot();
  });

  it("renders the input and button elements", () => {
    renderWithProviders(<TodoList />);

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", { name: "Add Item" });
    expect(inputElement).toBeInTheDocument();
    expect(buttonElement).toBeInTheDocument();
  });

  it("a new todo item is added to the list when the 'Add Item' button is clicked", () => {
    renderWithProviders(<TodoList />);

    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", { name: "Add Item" });
    fireEvent.change(inputElement, { target: { value: "New Todo Item" } });
    fireEvent.click(buttonElement);
    const newTodoItem = screen.getByText("New Todo Item");
    expect(newTodoItem).toBeInTheDocument();
  });

  it("the correct number of total and active todo items are displayed", () => {
    renderWithProviders(<TodoList />);
    const allTodos = screen.getByText(/total items/i);
    const activeTodos = screen.getByText(/active items left/i);
    expect(allTodos).toHaveTextContent("Total items:0");
    expect(activeTodos).toHaveTextContent("Active items left:0");
  });

  it("the 'Active' filter button works correctly", () => {
    renderWithProviders(<TodoList />);
    const inputElement = screen.getByRole("textbox");
    const buttonElement = screen.getByRole("button", { name: "Add Item" });
    fireEvent.change(inputElement, { target: { value: "New Todo Item" } });
    fireEvent.click(buttonElement);
    fireEvent.change(inputElement, { target: { value: "Another Todo Item" } });
    fireEvent.click(buttonElement);
    const activeFilterButton = screen.getByTestId("toggle-button-active");
    fireEvent.click(activeFilterButton);
    const newTodoItem = screen.getByText("New Todo Item");
    const anotherTodoItem = screen.getByText("Another Todo Item");
    expect(newTodoItem).toBeInTheDocument();
    expect(anotherTodoItem).toBeInTheDocument();
    const totalItemsCounter = screen.getByText("Total items:2");
    const activeItemsCounter = screen.getByText("Active items left:2");
    expect(totalItemsCounter).toBeInTheDocument();
    expect(activeItemsCounter).toBeInTheDocument();
  });
});
