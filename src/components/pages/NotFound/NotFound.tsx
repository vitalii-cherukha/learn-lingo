import { Link } from "react-router";
import css from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={css.container}>
      <div className={css.content}>
        <div className={css.textSection}>
          <h1 className={css.errorCode}>404</h1>
          <h2 className={css.title}>
            Oops! Page <span className={css.highlight}>not found</span>
          </h2>
          <p className={css.description}>
            It seems like the page you're looking for has wandered off on its
            own language learning journey. Let's get you back on track with our
            expert language tutors!
          </p>
          <div className={css.buttonGroup}>
            <Link to="/" className={css.primaryButton}>
              Go to Home
            </Link>
            <Link to="/teachers" className={css.secondaryButton}>
              Find Teachers
            </Link>
          </div>
        </div>

        <div className={css.imageSection}>
          <div className={css.imageWrapper}>
            <div className={css.blob}></div>
            <div className={css.notFoundIllustration}>
              <span className={css.emoji}>🤔</span>
            </div>
          </div>
        </div>
      </div>

      <div className={css.statsSection}>
        <div className={css.statCard}>
          <p className={css.statNumber}>32,000 +</p>
          <p className={css.statLabel}>
            Experienced
            <br />
            tutors
          </p>
        </div>

        <div className={css.statCard}>
          <p className={css.statNumber}>300,000 +</p>
          <p className={css.statLabel}>
            5-star tutor
            <br />
            reviews
          </p>
        </div>

        <div className={css.statCard}>
          <p className={css.statNumber}>120 +</p>
          <p className={css.statLabel}>
            Subjects
            <br />
            taught
          </p>
        </div>

        <div className={css.statCard}>
          <p className={css.statNumber}>200 +</p>
          <p className={css.statLabel}>
            Tutor
            <br />
            nationalities
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
