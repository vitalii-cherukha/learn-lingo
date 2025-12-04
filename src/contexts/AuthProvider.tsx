import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  onAuthChange,
} from "../firebase/auth";
import type { AuthContextType } from "../types";
import { AuthContext } from "./AuthContext";

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Реєстрація
  const signup = async (
    email: string,
    password: string,
    displayName?: string
  ): Promise<User> => {
    return await registerUser(email, password, displayName);
  };

  // Логінізація
  const login = async (email: string, password: string): Promise<User> => {
    return await loginUser(email, password);
  };

  // Логаут
  const logout = async (): Promise<void> => {
    return await logoutUser();
  };

  // Отримання даних про поточного користувача
  const getUser = (): User | null => {
    return getCurrentUser();
  };

  useEffect(() => {
    // Listener для відстеження змін авторизації
    const unsubscribe = onAuthChange((user: User | null) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value: AuthContextType = {
    currentUser,
    signup,
    login,
    logout,
    getUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
