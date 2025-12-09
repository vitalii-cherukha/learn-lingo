import Hero from "../../common/Hero/Hero";
import PageTransition from "../../common/PageTransition/PageTransition";
import Stats from "../../common/Stats/Stats";
import Container from "../../layout/Container/Container";
import Header from "../../layout/Header/Header";

const Home = () => {
  return (
    <section>
      <Header />
      <Container>
        <PageTransition>
          <Hero />
          <Stats />
        </PageTransition>
      </Container>
    </section>
  );
};

export default Home;
