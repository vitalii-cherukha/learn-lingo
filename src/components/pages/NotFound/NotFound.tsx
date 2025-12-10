import { Link } from "react-router";
import css from "./NotFound.module.css";
import Header from "../../layout/Header/Header";
import Container from "../../layout/Container/Container";
import { GridLoader } from "react-spinners";
import PageTransition from "../../common/PageTransition/PageTransition";

const NotFound = () => {
  return (
    <>
      {" "}
      <Header />
      <PageTransition>
        <Container>
          <div className={css.container}>
            <div className={css.content}>
              <div className={css.textSection}>
                <h1 className={css.errorCode}>404</h1>
                <h2 className={css.title}>
                  Oops! Page <span className={css.highlight}>not found</span>
                </h2>
                <p className={css.description}>
                  It seems like the page you're looking for has wandered off on
                  its own language learning journey. Let's get you back on track
                  with our expert language tutors!
                </p>

                <div className={css.imageSection}>
                  <GridLoader color="#f4c550" size={120} />
                </div>

                <div className={css.buttonGroup}>
                  <Link to="/" className={css.primaryButton}>
                    Go to Home
                  </Link>
                  <Link to="/teachers" className={css.secondaryButton}>
                    Find Teachers
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </PageTransition>
    </>
  );
};

export default NotFound;
