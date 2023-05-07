import React from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { store } from "store/store";
import { App } from "../App";

describe("App component", () => {
  it("renders correctly", () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(container).toMatchSnapshot();
  });
});
