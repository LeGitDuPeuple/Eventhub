import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isPasswordValid } from "../utils/passwordValid";
import type { User } from "../types/User";
import { useUser } from "../hooks/useUser";

export const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { register } = useUser();
  const navigate = useNavigate();

  const isFormValid =
    email !== "" && isPasswordValid(password);

  const submit = (): void => {
    const user: User = { email, password };
    register(user);
    navigate("/login"); // 👈 redirection
  };

  return (
  <div className="register-container">
        <h1>Event-Hub</h1>
      <h2>Inscription</h2>

      <input value={email} onChange={e => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder=""
      />

      <button disabled={!isFormValid} onClick={submit}>
        Créer un compte
      </button>
    </div>
  );
};
