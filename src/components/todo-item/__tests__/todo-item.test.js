import React from "react";
import { renderWithProviders } from "utils/test-utils";
import { screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "../todo-item";

describe("TodoItem", () => {
  const testItem = {
    id: "testId1",
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

    fireEvent.change(screen.getByRole("checkbox"), {
      target: { checked: true },
    });
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("opens edit mode when clicking on the item title", () => {
    renderWithProviders(<TodoItem item={testItem} />);

    fireEvent.click(screen.getByText(testItem.title));
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  });

  it("cancels edit mode when 'Cancel ' is clicked", () => {
    renderWithProviders(<TodoItem item={testItem} />);

    fireEvent.click(screen.getByText(testItem.title));
    fireEvent.change(screen.getByRole("textbox"), { target: { value: "New title" } });
    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    expect(screen.getByText(testItem.title)).toBeInTheDocument();
  });

  it("deletes the item when 'X' is clicked", () => {
    const { store } = renderWithProviders(<TodoItem item={testItem} />);

    fireEvent.click(screen.getByRole("button", { name: "X" }));
    expect(store.getState().todoData.entities[testItem.id]).toBeUndefined();
  });

  it("updates the item correctly", async () => {
    const preloadedState = {
      todoData: {
        entities: {
          [testItem.id]: testItem,
        },
        ids: [testItem.id],
      },
    };
    const { store } = renderWithProviders(<TodoItem item={testItem} />, { preloadedState });
    fireEvent.click(screen.getByText(testItem.title));
    fireEvent.change(screen.getByRole("textbox"), {
      target: { value: "Updated title" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    // Wait for the update operation to complete before checking the result
    await new Promise((resolve) => {
      setTimeout(() => {
        // Your async code goes here
        resolve();
      }, 1000);
    });
    const updatedItem = store.getState().todoData.entities[testItem.id];

    // Check if the item is updated correctly
    expect(updatedItem).toEqual({
      id: testItem.id,
      title: "Updated title",
      isCompleted: false,
    });
  });
});
