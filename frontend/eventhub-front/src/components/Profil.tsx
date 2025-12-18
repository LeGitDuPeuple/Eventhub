import { useState } from "react";
import type{ChangeEvent} from "react";
import type { User } from "../types/User";

export const Profile = () => {
  const storedUser: User | null = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [email, setEmail] = useState<string>(storedUser?.email || "");
  const [message, setMessage] = useState<string>("");

  const updateProfile = (): void => {
    if (!storedUser) return;

    const updatedUser: User = {
      ...storedUser,
      email
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setMessage("Profil mis à jour");
  };

  return (
    <div>
        <h1>Event-hub</h1>
      <h2>Profil</h2>

      <input
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />

      <button onClick={updateProfile}>
        Mettre à jour
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};
