import { useEffect, useState } from "react";
import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Favorites.module.css";
import { FilterValues, Teacher } from "../../../types";
import { filterFavoriteTeachers } from "../../../firebase/database";
import { useAuthStore } from "../../../store/authStore";
import toast from "react-hot-toast";

const Favorites = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [filters, setFilters] = useState<FilterValues>({
    language: "French",
    level: "A1 Beginner",
    price: "30",
  });
  const [loading, setLoading] = useState(true);

  const user = useAuthStore((state) => state.user); // отримуємо uid користувача

  const handleFilterChange = (newFilters: FilterValues) =>
    setFilters(newFilters);

  useEffect(() => {
    const fetchFilteredFavorites = async () => {
      if (!user) return; // без авторизованого користувача нічого не робимо
      setLoading(true);
      try {
        // отримуємо favorite teachers з uid + фільтри
        const data = await filterFavoriteTeachers(user.uid, filters);
        setTeachers(data);
      } catch {
        toast.error("Failed to load teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchFilteredFavorites();
  }, [user, filters]);

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

export default Favorites;
