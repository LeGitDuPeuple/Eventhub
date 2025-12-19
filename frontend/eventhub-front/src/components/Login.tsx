import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../modules/store/store";
import { loginSuccess } from "../modules/login/login.slice";
import { userService } from "../service/userService";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submit = (): void => {
    const stored = userService.get();

    if (stored?.email === email && stored?.password === password) {
      dispatch(loginSuccess(stored));
      alert("Connexion réussie");
      navigate("/profile");
    } else {
      alert("Erreur de connexion");
    }
  };

  return (
    <div className="login-container">
      <h1>Event-Hub</h1>
      <h2>Connexion</h2>

      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={submit}>Se connecter</button>
    </div>
  );
};
