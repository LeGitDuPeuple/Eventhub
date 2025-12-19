import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../components/Login";
import { store } from "../modules/store/store";
import { userService } from "../service/userService";

// mock navigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("affiche une alerte si les identifiants sont incorrects", () => {
    jest.spyOn(userService, "get").mockReturnValue({
      email: "test@mail.com",
      password: "BonMotDePasse123!"
    });

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: { value: "wrong@mail.com" }
    });

    const passwordInput = screen.getByDisplayValue("");
    fireEvent.change(passwordInput, {
      target: { value: "WrongPassword" }
    });

    fireEvent.click(screen.getByText("Se connecter"));

    expect(alertMock).toHaveBeenCalledWith("Erreur de connexion");
    expect(mockNavigate).not.toHaveBeenCalled();

    alertMock.mockRestore();
  });

  test("connecte l'utilisateur si les identifiants sont corrects", () => {
    jest.spyOn(userService, "get").mockReturnValue({
      email: "test@mail.com",
      password: "BonMotDePasse123!"
    });

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], {
      target: { value: "test@mail.com" }
    });

    const passwordInput = screen.getByDisplayValue("");
    fireEvent.change(passwordInput, {
      target: { value: "BonMotDePasse123!" }
    });

    fireEvent.click(screen.getByText("Se connecter"));

    expect(alertMock).toHaveBeenCalledWith("Connexion réussie");
    expect(mockNavigate).toHaveBeenCalledWith("/profile");

    alertMock.mockRestore();
  });
});
