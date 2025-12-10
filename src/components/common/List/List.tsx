import { useEffect, useState } from "react";
import { Teacher } from "../../../types";
import { getAllTeachers } from "../../../firebase/database";
import css from "./List.module.css";

const List = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const data = await getAllTeachers();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  return (
    <div className={css.listContainer}>
      <ul className={css.list}>
        {teachers.map((teacher) => (
          <li key={teacher.id} className={css.listItem}>
            <img
              src={teacher.avatar_url}
              alt={teacher.name}
              className={css.avatar}
            />
            <div className={css.teacherInfo}>
              <h3>{`${teacher.name} ${teacher.surname}`}</h3>
              <p>{teacher.lesson_info}</p>
              <p>{teacher.experience}</p>
              <p>{teacher.price_per_hour} €/h</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;
