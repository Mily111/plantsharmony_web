import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Inscription from "../app/(auth)/inscription/page";
import { register } from "../../../utils/api";
import { useRouter } from "next/navigation";

jest.mock("../../../utils/api");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Inscription Component Integration Test", () => {
  let push: jest.Mock;

  beforeEach(() => {
    push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("registers user successfully and navigates to login", async () => {
    (register as jest.Mock).mockResolvedValue({
      message: "User registered successfully",
    });

    render(<Inscription />);

    fireEvent.change(screen.getByLabelText(/Nom d'utilisateur/i), {
      target: { value: "newUser" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "newuser@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "SecurePassword123!" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Inscription/i }));

    await waitFor(() =>
      expect(
        screen.getByText(/User registered successfully/i)
      ).toBeInTheDocument()
    );

    expect(push).toHaveBeenCalledWith("/connexion");
  });

  test("shows error for invalid email format", async () => {
    render(<Inscription />);

    fireEvent.change(screen.getByLabelText(/Nom d'utilisateur/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "SecurePassword123!" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Inscription/i }));

    expect(
      await screen.findByText(/Invalid email format/i)
    ).toBeInTheDocument();
  });

  test("shows error for weak password", async () => {
    render(<Inscription />);

    fireEvent.change(screen.getByLabelText(/Nom d'utilisateur/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/E-mail/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Mot de passe/i), {
      target: { value: "123" },
    });

    fireEvent.submit(screen.getByRole("button", { name: /Inscription/i }));

    expect(
      await screen.findByText(
        /Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character/i
      )
    ).toBeInTheDocument();
  });
});
