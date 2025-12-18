import type { User } from "../types/User";

export const userService = {
  save(user: User): void {
    localStorage.setItem("user", JSON.stringify(user));
  },

  get(): User | null {
    return JSON.parse(localStorage.getItem("user") || "null");
  }
};
