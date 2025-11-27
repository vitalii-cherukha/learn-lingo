import { Link } from "react-router";
import Container from "../Container/Container";
import css from "./Header.module.css";

const Header = () => {
  return (
    <Container>
      <header className={css.header}>
        <Link to={"/"}>
          <svg className={css.logoIcon} width="28" height="28">
            <use href="/icon.svg#icon-logo" />
          </svg>
          <span className={css.logo}>LearnLingo</span>
        </Link>
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={css.navItem}>
              <Link to="/teachers">Teachers</Link>
            </li>
          </ul>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
