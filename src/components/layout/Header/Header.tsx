import { Link } from "react-router";
import Container from "../Container/Container";
import css from "./Header.module.css";
import BurgerMenu from "../../common/BurgerMenu/BurgerMenu";
import { useState } from "react";

const Header = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);

  const handleClick = () => {
    if (!isOpenBurgerMenu) {
      setIsOpenBurgerMenu(true);
    } else {
      setIsOpenBurgerMenu(false);
    }
  };

  return (
    <Container>
      <header className={css.header}>
        <Link to={"/"} className={css.logoWrapper}>
          <svg className={css.logoIcon} width="32" height="32">
            <use href="/icon.svg" />
          </svg>
          <span className={css.logoText}>LearnLingo</span>
        </Link>
        <nav className={css.nav}>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <Link to="/">Home</Link>
            </li>
            <li className={css.navItem}>
              <Link to="/teachers">Teachers</Link>
            </li>
            {isAuthorized && (
              <li className={css.navItem}>
                <Link to="/favorites">Favorites</Link>
              </li>
            )}
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
        {!isOpenBurgerMenu ? (
          <button
            type="button"
            onClick={handleClick}
            className={css.burgerMenuBtn}
          >
            <svg className={css.burgerMenuIcon} width="35" height="35">
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleClick}
            className={css.burgerMenuBtn}
          >
            <svg className={css.burgerMenuIcon} width="35" height="35">
              <use href="/sprite.svg#icon-cancel" />
            </svg>
          </button>
        )}
      </header>
      {isOpenBurgerMenu && <BurgerMenu />}
    </Container>
  );
};

export default Header;
