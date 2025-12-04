import {
  ref,
  get,
  onValue,
  DataSnapshot,
  Unsubscribe,
} from "firebase/database";
import { database } from "./config";
import { Teacher } from "../types";

// Отримати всіх викладачів
export const getAllTeachers = async (): Promise<Teacher[]> => {
  const teachersRef = ref(database, "teachers");
  const snapshot: DataSnapshot = await get(teachersRef);

  if (snapshot.exists()) {
    const teachers: Teacher[] = [];
    snapshot.forEach((childSnapshot) => {
      teachers.push({
        id: childSnapshot.key!,
        ...childSnapshot.val(),
      } as Teacher);
    });
    return teachers;
  } else {
    return [];
  }
};

// Отримати викладача по ID
export const getTeacherById = async (teacherId: string): Promise<Teacher> => {
  const teacherRef = ref(database, `teachers/${teacherId}`);
  const snapshot: DataSnapshot = await get(teacherRef);

  if (snapshot.exists()) {
    return {
      id: snapshot.key!,
      ...snapshot.val(),
    } as Teacher;
  } else {
    throw new Error("Teacher not found");
  }
};

// Real-time listener для всіх викладачів
export const subscribeToTeachers = (
  callback: (teachers: Teacher[]) => void
): Unsubscribe => {
  const teachersRef = ref(database, "teachers");

  return onValue(teachersRef, (snapshot: DataSnapshot) => {
    const teachers: Teacher[] = [];
    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot) => {
        teachers.push({
          id: childSnapshot.key!,
          ...childSnapshot.val(),
        } as Teacher);
      });
    }
    callback(teachers);
  });
};

// Фільтрація викладачів по мові
export const getTeachersByLanguage = async (
  language: string
): Promise<Teacher[]> => {
  const teachers = await getAllTeachers();

  return teachers.filter(
    (teacher) => teacher.languages && teacher.languages.includes(language)
  );
};

// Фільтрація викладачів по рівню
export const getTeachersByLevel = async (level: string): Promise<Teacher[]> => {
  const teachers = await getAllTeachers();

  return teachers.filter(
    (teacher) => teacher.levels && teacher.levels.includes(level)
  );
};
