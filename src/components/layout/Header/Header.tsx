import { Link } from "react-router";
import Container from "../Container/Container";
import css from "./Header.module.css";

const Header = () => {
  return (
    <Container>
      <header className={css.header}>
        <Link to={"/"} className={css.logoWrapper}>
          <svg className={css.logoIcon} width="28" height="28">
            <use href="/icon.svg" />
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
        <div className={css.action}>
          <button className={css.actionBtnLogin} type="button">
            <svg className={css.actionBtnLoginIcon} width="20" height="20">
              <use href="/sprite.svg#icon-login" />
            </svg>
            Log in
          </button>
          <button className={css.actionBtnRegister} type="button">
            Registration
          </button>
        </div>
      </header>
    </Container>
  );
};

export default Header;
