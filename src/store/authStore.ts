import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { auth, database } from "../firebase/config";
import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { ref, get, update, DataSnapshot } from "firebase/database";
import { FirebaseError } from "firebase/app";

interface AuthUser {
  uid: string;
  email: string | null;
  name?: string;
  favorites: string[];
}

interface AuthState {
  user: AuthUser | null;
  register: (email: string, password: string, name?: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  initAuth: () => void;
  toggleFavorite: (teacherId: string) => Promise<void>;
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
          const uid = res.user.uid;

          await update(ref(database, `users/${uid}`), { name, favorites: {} });

          set({
            user: {
              uid,
              email: res.user.email,
              name,
              favorites: [],
            },
          });
        },

        login: async (email, password) => {
          try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const uid = res.user.uid;

            const snap = await get(ref(database, `users/${uid}/favorites`));
            const favorites: string[] = snap.exists()
              ? Object.keys(snap.val() || {})
              : [];

            set({
              user: {
                uid,
                email: res.user.email,
                favorites,
              },
            });
          } catch (error: unknown) {
            let message = "Помилка входу";

            if (error instanceof FirebaseError) {
              switch (error.code) {
                case "auth/user-not-found":
                  message = "Користувач з таким email не зареєстрований";
                  break;
                case "auth/wrong-password":
                  message = "Неправильний пароль";
                  break;
                case "auth/invalid-email":
                  message = "Некоректний email";
                  break;
                case "auth/user-disabled":
                  message = "Акаунт заблокований";
                  break;
              }
            }

            throw new Error(message);
          }
        },

        logout: async () => {
          await signOut(auth);
          set({ user: null });
        },

        initAuth: () => {
          onAuthStateChanged(auth, async (firebaseUser: User | null) => {
            if (!firebaseUser) {
              set({ user: null });
              return;
            }

            const snap: DataSnapshot = await get(
              ref(database, `users/${firebaseUser.uid}/favorites`)
            );
            const favorites: string[] = snap.exists()
              ? Object.keys(snap.val() || {})
              : [];

            set({
              user: {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                favorites,
              },
            });
          });
        },

        //   const currentUser = auth.currentUser;
        //   if (!currentUser) return;

        //   const uid = currentUser.uid;

        //   const snap: DataSnapshot = await get(
        //     ref(database, `users/${uid}/favorites`)
        //   );
        //   const currentFavorites: Record<string, boolean> = snap.exists()
        //     ? snap.val()
        //     : {};

        //   const isFav = !!currentFavorites[teacherId];
        //   const updatedFavorites = { ...currentFavorites, [teacherId]: !isFav };

        //   await update(
        //     ref(database, `users/${uid}/favorites`),
        //     updatedFavorites
        //   );

        //   set((state) => ({
        //     user: state.user
        //       ? {
        //           ...state.user,
        //           favorites: Object.keys(updatedFavorites).filter(
        //             (id) => updatedFavorites[id]
        //           ),
        //         }
        //       : null,
        //   }));
        // },
        toggleFavorite: async (teacherId: string) => {
          const user = auth.currentUser;
          if (!user) return;

          const uid = user.uid;
          const favRef = ref(database, `users/${uid}/favorites/${teacherId}`);

          const snap = await get(favRef);

          if (snap.exists()) {
            // якщо є — видаляємо
            await update(ref(database, `users/${uid}/favorites`), {
              [teacherId]: null,
            });
          } else {
            // якщо нема — додаємо
            await update(ref(database, `users/${uid}/favorites`), {
              [teacherId]: true,
            });
          }

          // локальний state
          set((state) => {
            if (!state.user) return state;

            const isFav = state.user.favorites.includes(teacherId);

            return {
              user: {
                ...state.user,
                favorites: isFav
                  ? state.user.favorites.filter((id) => id !== teacherId)
                  : [...state.user.favorites, teacherId],
              },
            };
          });
        },
      }),
      {
        name: "auth-store",
        partialize: (state) => ({ user: state.user }),
      }
    )
  )
);
