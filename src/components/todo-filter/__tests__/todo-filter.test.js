import React from "react";
import { screen, fireEvent } from "@testing-library/react";
import { renderWithProviders } from "utils/test-utils";
import { TodoFilter } from "../todo-filter";

describe("TodoFilter component", () => {
  const filter = "all";
  const handleFilterChange = jest.fn();
  it("renders correctly", () => {
    const { container } = renderWithProviders(
      <TodoFilter filter={filter} handleFilterChange={handleFilterChange} />,
    );
    expect(container).toMatchSnapshot();
  });
  it("renders all filter button", () => {
    renderWithProviders(<TodoFilter filter={filter} handleFilterChange={handleFilterChange} />);
    const buttonElement = screen.getByTestId("toggle-button-all");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders active filter button", () => {
    renderWithProviders(<TodoFilter filter={filter} handleFilterChange={handleFilterChange} />);
    const buttonElement = screen.getByTestId("toggle-button-active");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders completed filter button", () => {
    renderWithProviders(<TodoFilter filter={filter} handleFilterChange={handleFilterChange} />);
    const buttonElement = screen.getByTestId("toggle-button-completed");
    expect(buttonElement).toBeInTheDocument();
  });

  it("clicking on filter button calls the handleFilterChange function", () => {
    renderWithProviders(<TodoFilter filter={filter} handleFilterChange={handleFilterChange} />);
    const activeFilterButton = screen.getByTestId("toggle-button-active");
    fireEvent.click(activeFilterButton);
    expect(handleFilterChange).toHaveBeenCalledWith(expect.any(Object), "active");
  });
});
