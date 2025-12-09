import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Teachers.module.css";

const Teachers = () => {
  return (
    <section className={css.bg}>
      <Header colorBg="#f8f8f8" />
      <Container>
        <FilterBar />
        <List />
      </Container>
    </section>
  );
};

export default Teachers;
