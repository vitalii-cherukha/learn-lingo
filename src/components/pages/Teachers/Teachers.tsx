import FilterBar from "../../common/FilterBar/FilterBar";
import List from "../../common/List/List";
import PageTransition from "../../common/PageTransition/PageTransition";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";
import css from "./Teachers.module.css";

const Teachers = () => {
  return (
    <section className={css.bg}>
      <Header colorBg="#f8f8f8" />
      <Container>
        <PageTransition>
          <FilterBar />
        </PageTransition>
        <List />
      </Container>
    </section>
  );
};

export default Teachers;
