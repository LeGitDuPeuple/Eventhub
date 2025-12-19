import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { loginReducer } from "../modules/login/login.slice";
import { Profile } from "../components/Profil";
import { userService } from "../service/userService";

const rootReducer = combineReducers({
  login: loginReducer,
});

const renderWithStore = (preloadedState: any) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <Profile />
    </Provider>
  );
};

describe("Profile", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("affiche un message si l'utilisateur n'est pas connecté", () => {
    renderWithStore({
      login: {
        user: null,
        isLoggedIn: false,
      },
    });

    expect(
      screen.getByText("Utilisateur non connecté")
    ).toBeInTheDocument();
  });

  test("met à jour l'email de l'utilisateur connecté", () => {
    const saveMock = jest
      .spyOn(userService, "save")
      .mockImplementation(() => {});

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => {});

    renderWithStore({
      login: {
        user: { email: "old@mail.com" },
        isLoggedIn: true,
      },
    });

    const input = screen.getByRole("textbox");
    fireEvent.change(input, {
      target: { value: "new@mail.com" },
    });

    fireEvent.click(screen.getByText("Mettre à jour"));

    expect(saveMock).toHaveBeenCalledWith({
      email: "new@mail.com",
    });

    expect(alertMock).toHaveBeenCalledWith("Email modifié !");
  });
});
