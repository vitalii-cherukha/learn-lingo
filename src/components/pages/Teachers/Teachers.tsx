import { useEffect, useState } from "react";
import { getAllTeachers } from "../../../firebase/database";
import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import PageTransition from "../../common/PageTransition/PageTransition";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Teachers.module.css";
import { Teacher } from "../../../types";

const Teachers = () => {
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

  return (
    <section className={css.bg}>
      <Header colorBg="#f8f8f8" />
      <Container>
        <PageTransition>
          <FilterBar />
        </PageTransition>
        <List teachers={teachers} loading={loading} />
      </Container>
    </section>
  );
};

export default Teachers;
