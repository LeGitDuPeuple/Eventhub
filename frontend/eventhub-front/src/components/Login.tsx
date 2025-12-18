import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login } = useUser();
  const navigate = useNavigate();

  const submit = (): void => {
    const success = login(email, password);
    if (success) {
      navigate("/profile"); // 👈 redirection
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
