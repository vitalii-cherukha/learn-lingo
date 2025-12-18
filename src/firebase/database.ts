import { ref, get, DataSnapshot } from "firebase/database";
import { database } from "./config";
import { FilterValues, Teacher } from "../types";

export const getAllTeachers = async (): Promise<Teacher[]> => {
  const teachersRef = ref(database, "/teachers");
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

export const getTeacherById = async (teacherId: string): Promise<Teacher> => {
  const teacherRef = ref(database, `/teachers/${teacherId}`);
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

export const filterTeachers = async (
  filters: FilterValues
): Promise<Teacher[]> => {
  const teachers = await getAllTeachers();

  return teachers.filter((teacher) => {
    if (filters.language) {
      if (!teacher.languages?.includes(filters.language)) {
        return false;
      }
    }

    if (filters.level) {
      if (!teacher.levels?.includes(filters.level)) {
        return false;
      }
    }

    if (filters.price) {
      if (teacher.price_per_hour !== Number(filters.price)) {
        return false;
      }
    }

    return true;
  });
};
