import type { User } from "../types/User";
import { userService } from "../service/userService";

export const useUser = () => {
  const showAlert = (message:string): void => {
    alert(message)
  }
  

  const register = (user: User): void => {
    userService.save(user);
   showAlert("Compte créé");
  };

  const login = (email: string, password: string): boolean => {
    const stored = userService.get();
    if (stored?.email === email && stored?.password === password) {
     showAlert("Connexion réussie");
      return true;
    }
    showAlert("Erreur de connexion");
    return false;
  };

  return { register, login };
};
