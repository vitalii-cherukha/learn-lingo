import { Link } from "react-router";
import css from "./BurgerMenu.module.css";
import { useState } from "react";

const BurgerMenu = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);

  return (
    <div className={css.burgerMenuWrapper}>
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
        {isAuthorized ? (
          <button className={css.actionBtnLogin} type="button">
            <svg className={css.actionBtnLoginIcon} width="20" height="20">
              <use href="/sprite.svg#icon-logout" />
            </svg>
            Log out
          </button>
        ) : (
          <button className={css.actionBtnLogin} type="button">
            <svg className={css.actionBtnLoginIcon} width="20" height="20">
              <use href="/sprite.svg#icon-login" />
            </svg>
            Log in
          </button>
        )}
        <button className={css.actionBtnRegister} type="button">
          Registration
        </button>
      </div>
    </div>
  );
};

export default BurgerMenu;
