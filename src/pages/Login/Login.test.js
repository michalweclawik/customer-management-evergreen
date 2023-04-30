import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";

jest.mock("../../hooks/useLogin", () => ({
  useLogin: jest.fn(() => ({
    login: jest.fn(),
    error: null,
    isPending: false,
  })),
}));

describe("Login", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a form with email and password input fields and a submit button", () => {
    render(<Login />);
    expect(screen.getByLabelText("email:")).toBeInTheDocument();
    expect(screen.getByLabelText("password:")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Log in" })).toBeInTheDocument();
  });

  it("calls the login function with the email and password when the form is submitted", async () => {
    const mockLogin = jest.fn();
    jest.mock("../../hooks/useLogin", () => ({
      useLogin: jest.fn(() => ({
        login: mockLogin,
        error: null,
        isPending: false,
      })),
    }));

    render(<Login />);
    const emailInput = screen.getByLabelText("email:");
    const passwordInput = screen.getByLabelText("password:");
    const submitButton = screen.getByRole("button", { name: "Log in" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123");
    });
  });

  it("displays an error message if the login function returns an error", async () => {
    const errorMessage = "Invalid credentials";
    jest.mock("../../hooks/useLogin", () => ({
      useLogin: jest.fn(() => ({
        login: jest.fn(),
        error: errorMessage,
        isPending: false,
      })),
    }));

    render(<Login />);
    const submitButton = screen.getByRole("button", { name: "Log in" });
    fireEvent.submit(submitButton);

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument();
    });
  });

  it("disables the submit button and displays a loading message while the login function is pending", async () => {
    jest.mock("../../hooks/useLogin", () => ({
      useLogin: jest.fn(() => ({
        login: jest.fn(),
        error: null,
        isPending: true,
      })),
    }));

    render(<Login />);
    const submitButton = screen.getByRole("button", { name: "Log in" });

    expect(submitButton).toBeDisabled();
    expect(screen.getByText("loading")).toBeInTheDocument();

    await waitFor(() => {
      expect(submitButton).not.toBeDisabled();
      expect(screen.queryByText("loading")).toBeNull();
    });
  });
});
