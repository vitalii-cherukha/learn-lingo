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
  favorites: string[];

  register: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;

  addFavorite: (teacherId: string) => void;
  removeFavorite: (teacherId: string) => void;
  toggleFavorite: (teacherId: string) => void;
  isFavorite: (teacherId: string) => boolean;
  clearFavorites: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        favorites: [],

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
          set({
            user: null,
          });
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

        addFavorite: (teacherId: string) => {
          set((state) => {
            if (state.favorites.includes(teacherId)) {
              return state;
            }
            return {
              favorites: [...state.favorites, teacherId],
            };
          });
        },

        removeFavorite: (teacherId: string) => {
          set((state) => ({
            favorites: state.favorites.filter((id) => id !== teacherId),
          }));
        },

        toggleFavorite: (teacherId: string) => {
          set((state) => {
            const isFav = state.favorites.includes(teacherId);
            if (isFav) {
              return {
                favorites: state.favorites.filter((id) => id !== teacherId),
              };
            } else {
              return {
                favorites: [...state.favorites, teacherId],
              };
            }
          });
        },

        isFavorite: (teacherId: string) => {
          return get().favorites.includes(teacherId);
        },

        clearFavorites: () => {
          set({ favorites: [] });
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({
          user: state.user,
          favorites: state.favorites,
        }),
      }
    )
  )
);
