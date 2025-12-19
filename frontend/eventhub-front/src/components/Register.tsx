import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmailValid } from "../utils/emailValid";
import { isPasswordValid } from "../utils/passwordValid";
import type { User } from "../types/User";
import { userService } from "../service/userService";

export const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showEmailRules, setShowEmailRules] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const isFormValid = isEmailValid(email) && isPasswordValid(password);

  const submit = (): void => {
    const user: User = { email, password };
    userService.save(user);
    alert("Compte créé");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <h1>Event-Hub</h1>
      <h2>Inscription</h2>

      <input
       value={email}
        onChange={e => setEmail(e.target.value)}
          onFocus={() => setShowEmailRules(true)}
           />
      {showEmailRules && !isEmailValid(email) && (
          <p className="email-rules">
          L’email doit être au format valide (ex: test@mail.com)
        </p>
      )}
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onFocus={()=> setShowPasswordRules(true)}
      />
      {showPasswordRules && !isPasswordValid(password) && (
         <ul className="password-rules">
          <li>12 caractères minimum</li>
          <li>1 majuscule</li>
          <li>1 minuscule</li>
          <li>1 chiffre</li>
          <li>1 caractère spécial</li>
        </ul>
      )}

      <button disabled={!isFormValid} onClick={submit}>
        Créer un compte
      </button>
    </div>
  );
};
