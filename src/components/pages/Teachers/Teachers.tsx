import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import Container from "../../layout/Container/Container";
import css from "./Teachers.module.css";

const Teachers = () => {
  return (
    <section className={css.bg}>
      <Container>
        <FilterBar />
        <List />
      </Container>
    </section>
  );
};

export default Teachers;
