import { useState } from "react";
import { useSelector } from "react-redux";
import type { AppState } from "../modules/store/store";
import { useAppDispatch } from "../modules/store/store";
import { updateUser } from "../modules/login/login.slice";
import { userService } from "../service/userService";

export const Profile = () => {
  const user = useSelector((state: AppState) => state.login.user);
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    return <p>Utilisateur non connecté</p>;
  }

  const updateProfile = (): void => {
    const updatedUser = { ...user, email };

    dispatch(updateUser(updatedUser));
    userService.save(updatedUser);
    alert("Email modifié !");
  };

  return (
    <div className="profile-container">
      <h1>Event-Hub</h1>
      <h2>Profil</h2>

      <input value={email} onChange={e => setEmail(e.target.value)} />
      <button onClick={updateProfile}>Mettre à jour</button>
    </div>
  );
};
