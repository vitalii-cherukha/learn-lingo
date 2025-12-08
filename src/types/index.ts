import { User } from "firebase/auth";

export interface AuthContextType {
  currentUser: User | null;
  signup: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
  getUser: () => User | null;
}

export interface Review {
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Teacher {
  id?: string;
  name: string;
  surname: string;
  languages: string[];
  levels: string[];
  rating: number;
  reviews: Review[];
  price_per_hour: number;
  lessons_done: number;
  avatar_url: string;
  lesson_info: string;
  conditions: string[];
  experience: string;
  createdAt?: string;
  updatedAt?: string;
}
