import { useEffect, useState } from "react";
import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Favorites.module.css";
import { getAllTeachers } from "../../../firebase/database";
import { Teacher } from "../../../types";

const Favorites = () => {
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
        <FilterBar />
        <List teachers={teachers} loading={loading} />
      </Container>
    </section>
  );
};

export default Favorites;
