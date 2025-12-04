import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "./config";

// Реєстрація
export const registerUser = async (
  email: string,
  password: string,
  displayName?: string
): Promise<User> => {
  const userCredential: UserCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  // Оновлення профілю з ім'ям
  if (displayName && userCredential.user) {
    await updateProfile(userCredential.user, {
      displayName: displayName,
    });
  }

  return userCredential.user;
};

// Логінізація
export const loginUser = async (
  email: string,
  password: string
): Promise<User> => {
  const userCredential: UserCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential.user;
};

// Логаут
export const logoutUser = async (): Promise<void> => {
  await signOut(auth);
};

// Отримання поточного користувача
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// Listener для зміни стану авторизації
export const onAuthChange = (
  callback: (user: User | null) => void
): (() => void) => {
  return onAuthStateChanged(auth, callback);
};
