import Hero from "../../common/Hero/Hero";
import Stats from "../../common/Stats/Stats";
import Container from "../../layout/Container/Container";

const Home = () => {
  return (
    <section>
      <Container>
        <Hero />
        <Stats />
      </Container>
    </section>
  );
};

export default Home;
