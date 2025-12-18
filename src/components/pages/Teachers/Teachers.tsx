import { useEffect, useState } from "react";

import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Teachers.module.css";
import { FilterValues, Teacher } from "../../../types";
import { filterTeachersAll } from "../../../firebase/database";

const Teachers = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    language: "French",
    level: "A1 Beginner",
    price: "30",
  });
  const [loading, setLoading] = useState(true);

  const handleFilterChange = (newFilters: FilterValues) => {
    setFilters(newFilters);
  };

  useEffect(() => {
    const fetchFilteredTeachers = async () => {
      setLoading(true);
      try {
        const data = await filterTeachersAll(filters);
        setTeachers(data);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error("Помилка при завантаженні викладачів:", error.message);
        } else {
          console.error("Невідома помилка при завантаженні викладачів", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredTeachers();
  }, [filters]);

  return (
    <section className={css.bg}>
      <Header colorBg="#f8f8f8" />
      <Container>
        <FilterBar onFilterChange={handleFilterChange} />
        <List teachers={teachers} loading={loading} />
      </Container>
    </section>
  );
};

export default Teachers;
