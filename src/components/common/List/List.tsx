import { useEffect, useState } from "react";
import { Teacher } from "../../../types";
import { getAllTeachers } from "../../../firebase/database";
import css from "./List.module.css";
import Loader from "../Loader/Loader";
import PageTransition from "../PageTransition/PageTransition";

const List = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const data = await getAllTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <PageTransition>
      {" "}
      <div className={css.listContainer}>
        <ul className={css.list}>
          {teachers.map((teacher) => (
            <li key={teacher.id} className={css.listItem}>
              <div className={css.imgWrapper}>
                <img
                  width="96"
                  height="96"
                  src={teacher.avatar_url}
                  alt={teacher.name}
                  className={css.avatar}
                />
              </div>
              <div className={css.teacherInfo}>
                <h3>{`${teacher.name} ${teacher.surname}`}</h3>
                {/* <p>{teacher.lesson_info}</p> */}
                {/* <p>{teacher.experience}</p> */}
                <p>{teacher.price_per_hour} €/h</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </PageTransition>
  );
};

export default List;
