import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import Create from "./Create";

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("../../hooks/useAuthContext");
const mockUseAuthContext = useAuthContext;

jest.mock("../../hooks/useCollection");
const mockUseCollection = useCollection;

jest.mock("../../hooks/useFirestore");
const mockUseFirestore = useFirestore;

describe("Create", () => {
  const mockUser = { displayName: "John Doe", uid: "123" };
  const mockDocuments = [
    { id: "1", data: () => ({ companyName: "ABC Inc." }) },
    { id: "2", data: () => ({ companyName: "XYZ Corp." }) },
  ];
  const mockAddDocument = jest.fn();
  const mockResponse = { error: null };

  beforeEach(() => {
    mockUseAuthContext.mockReturnValue({ user: mockUser });
    mockUseCollection.mockReturnValue({ documents: mockDocuments });
    mockUseFirestore.mockReturnValue({
      addDocument: mockAddDocument,
      response: mockResponse,
    });
    useNavigate.mockReturnValue(jest.fn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a form with input fields and a submit button", () => {
    render(<Create />);
    expect(
      screen.getByRole("textbox", { name: "Company Name" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "First Name:" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Last Name:" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Phone number:" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Adress" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Customer" })
    ).toBeInTheDocument();
  });

  it("displays an error message when the form is submitted with empty fields", async () => {
    render(<Create />);
    fireEvent.submit(screen.getByRole("button", { name: "Add Customer" }));
    await waitFor(() => {
      expect(
        screen.getByText("Please fill in all required fields.")
      ).toBeInTheDocument();
    });
    expect(mockAddDocument).not.toHaveBeenCalled();
    expect(useNavigate).not.toHaveBeenCalled();
  });
});
