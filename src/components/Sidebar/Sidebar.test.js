import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar";

describe("Sidebar", () => {
  const user = { displayName: "John Doe" };
  const today = new Date(2023, 4, 1, 12, 0, 0); // noon

  beforeEach(() => {
    jest.spyOn(global, "Date").mockImplementation(() => today);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("displays a greeting with the user's display name", () => {
    render(
      <Router>
        <Sidebar user={user} />
      </Router>
    );

    const greeting = screen.getByText(/good afternoon/i);
    expect(greeting).toBeInTheDocument();

    const name = screen.getByText(/john doe/i);
    expect(name).toBeInTheDocument();
  });

  it("displays links to list customers and add customer", () => {
    render(
      <Router>
        <Sidebar user={user} />
      </Router>
    );

    const link1 = screen.getByText(/list customers/i);
    expect(link1).toBeInTheDocument();

    const link2 = screen.getByText(/add customer/i);
    expect(link2).toBeInTheDocument();
  });
});
