import { ref, get, DataSnapshot } from "firebase/database";
import { database } from "./config";
import { FilterValues, Teacher } from "../types";

/**
 * Отримати всіх викладачів
 */
export const getAllTeachers = async (): Promise<Teacher[]> => {
  const teachersRef = ref(database, "/teachers");
  const snapshot: DataSnapshot = await get(teachersRef);

  if (!snapshot.exists()) return [];

  const teachers: Teacher[] = [];
  snapshot.forEach((childSnapshot) => {
    teachers.push({
      id: childSnapshot.key!,
      ...childSnapshot.val(),
    } as Teacher);
  });

  return teachers;
};

/**
 * Отримати список ID улюблених викладачів користувача
 */
export const getFavoriteTeacherIds = async (uid: string): Promise<string[]> => {
  const favRef = ref(database, `/users/${uid}/favorites`);
  const snapshot: DataSnapshot = await get(favRef);

  if (!snapshot.exists()) return [];

  const favData = snapshot.val() as Record<string, boolean>;
  return Object.keys(favData).filter((id) => favData[id]);
};

/**
 * Отримати дані викладачів за списком ID
 */
export const getTeachersByIds = async (ids: string[]): Promise<Teacher[]> => {
  const teachers = await Promise.all(
    ids.map(async (id) => {
      const teacherRef = ref(database, `/teachers/${id}`);
      const snapshot = await get(teacherRef);
      if (!snapshot.exists()) return null;
      return { id: snapshot.key!, ...snapshot.val() } as Teacher;
    })
  );

  return teachers.filter((t): t is Teacher => t !== null);
};

/**
 * Отримати улюблених викладачів користувача
 */
export const getFavoriteTeachers = async (uid: string): Promise<Teacher[]> => {
  const ids = await getFavoriteTeacherIds(uid);
  return getTeachersByIds(ids);
};

/**
 * Фільтрування Teacher[] по заданим значенням
 */
export const filterTeachers = (
  teachers: Teacher[],
  filters: FilterValues
): Teacher[] => {
  return teachers.filter((teacher) => {
    if (filters.language && !teacher.languages?.includes(filters.language))
      return false;
    if (filters.level && !teacher.levels?.includes(filters.level)) return false;
    if (filters.price && teacher.price_per_hour !== Number(filters.price))
      return false;
    return true;
  });
};

export const filterTeachersAll = async (
  filters: FilterValues
): Promise<Teacher[]> => {
  const teachers = await getAllTeachers();
  return filterTeachers(teachers, filters);
};

/**
 * Публічна функція для отримання улюблених викладачів з фільтрацією
 */
export const filterFavoriteTeachers = async (
  uid: string,
  filters: FilterValues
): Promise<Teacher[]> => {
  const favTeachers = await getFavoriteTeachers(uid);
  return filterTeachers(favTeachers, filters);
};
