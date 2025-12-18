import { useEffect, useState } from "react";
import { filterTeachers } from "../../../firebase/database";
import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Teachers.module.css";
import { FilterValues, Teacher } from "../../../types";

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
      try {
        setLoading(true);
        const data = await filterTeachers(filters);
        setTeachers(data);
      } catch (error) {
        console.error("Error fetching teachers:", error);
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
