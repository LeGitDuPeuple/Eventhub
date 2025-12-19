import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { Register } from "../components/Register";
import { userService } from "../service/userService";

// mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("le bouton est désactivé si le formulaire est invalide", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const button = screen.getByText("Créer un compte");
    expect(button).toBeDisabled();
  });

  test("le bouton s’active quand l’email et le mot de passe sont valides", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: { value: "test@mail.com" },
    });

    const passwordInput = screen.getByDisplayValue("");
    fireEvent.change(passwordInput, {
      target: { value: "BonMotDePasse123!" },
    });

    const button = screen.getByText("Créer un compte");
    expect(button).not.toBeDisabled();
  });

  test("crée un compte et redirige vers /login", () => {
    const saveMock = jest
      .spyOn(userService, "save")
      .mockImplementation(() => {});

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: { value: "test@mail.com" },
    });

    const passwordInput = screen.getByDisplayValue("");
    fireEvent.change(passwordInput, {
      target: { value: "BonMotDePasse123!" },
    });

    fireEvent.click(screen.getByText("Créer un compte"));

    expect(saveMock).toHaveBeenCalledWith({
      email: "test@mail.com",
      password: "BonMotDePasse123!",
    });

    expect(alertMock).toHaveBeenCalledWith("Compte créé");
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
