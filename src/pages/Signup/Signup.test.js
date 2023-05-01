import { render, screen, fireEvent } from "@testing-library/react";
import Signup from "./Signup";

describe("Signup component", () => {
  test("renders email, password, and display name input fields", () => {
    render(<Signup />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/display name/i)).toBeInTheDocument();
  });

  test("submitting the form calls the useSignup hook with input values", () => {
    const mockSignup = jest.fn();
    jest.mock("../../hooks/useSignup", () => ({
      useSignup: () => ({ signup: mockSignup, isPending: false, error: null }),
    }));
    render(<Signup />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const displayNameInput = screen.getByLabelText(/display name/i);
    const submitButton = screen.getByText(/sign up/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(displayNameInput, { target: { value: "Test User" } });
    fireEvent.click(submitButton);

    expect(mockSignup).toHaveBeenCalledWith(
      "test@example.com",
      "password123",
      "Test User"
    );
  });

  test("displays loading state when isPending is true", () => {
    jest.mock("../../hooks/useSignup", () => ({
      useSignup: () => ({ signup: jest.fn(), isPending: true, error: null }),
    }));
    render(<Signup />);

    const submitButton = screen.getByText(/sign up/i);
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/loading/i);
  });

  test("displays error message when error is not null", () => {
    const errorMessage = "Invalid email format";
    jest.mock("../../hooks/useSignup", () => ({
      useSignup: () => ({
        signup: jest.fn(),
        isPending: false,
        error: errorMessage,
      }),
    }));
    render(<Signup />);

    const errorDiv = screen.getByText(errorMessage);
    expect(errorDiv).toBeInTheDocument();
  });
});
