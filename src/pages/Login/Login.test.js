import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

import { customRender } from "../../utis/testUtils";
import { BrowserRouter } from "react-router-dom";

it("should render the form", () => {
  const { container } = customRender(<Login />);
  expect(container).toMatchSnapshot();
});
