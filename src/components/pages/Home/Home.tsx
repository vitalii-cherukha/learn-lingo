import Hero from "../../common/Hero/Hero";
import PageTransition from "../../common/PageTransition/PageTransition";
import Stats from "../../common/Stats/Stats";
import Container from "../../layout/Container/Container";

const Home = () => {
  return (
    <section>
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
