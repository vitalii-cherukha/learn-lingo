import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/config";

interface AuthUser {
  uid: string;
  email: string | null;
  name?: string;
}

interface AuthState {
  user: AuthUser | null;

  register: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,

        register: async (email, password, name) => {
          const res = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          set({
            user: { uid: res.user.uid, email: res.user.email, name },
          });
        },

        login: async (email, password) => {
          const res = await signInWithEmailAndPassword(auth, email, password);
          set({
            user: { uid: res.user.uid, email: res.user.email },
          });
        },

        logout: async () => {
          await signOut(auth);
        },

        initAuth: () => {
          onAuthStateChanged(auth, (firebaseUser) => {
            set((state) => {
              if (
                (firebaseUser && state.user?.uid === firebaseUser.uid) ||
                (!firebaseUser && state.user === null)
              ) {
                return state;
              }

              return {
                user: firebaseUser
                  ? {
                      uid: firebaseUser.uid,
                      email: firebaseUser.email,
                    }
                  : null,
              };
            });
          });
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          user: state.user,
        }),
      }
    )
  )
);
