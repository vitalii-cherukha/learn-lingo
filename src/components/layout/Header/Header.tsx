import { Link } from "react-router";
import Container from "../Container/Container";
import css from "./Header.module.css";

import { useEffect, useState } from "react";
import Registration from "../../common/Registration/Registration";
import LogIn from "../../common/LogIn/LogIn";
import { useAuthStore } from "../../../store/authStore";
import toast from "react-hot-toast";

interface HeaderProps {
  colorBg?: string;
}

const Header = ({ colorBg }: HeaderProps) => {
  const user = useAuthStore((state) => state.user);
  const initAuth = useAuthStore((state) => state.initAuth);
  const logout = useAuthStore((state) => state.logout);

  const [isOpenBurgerMenu, setIsOpenBurgerMenu] = useState(false);
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);
  const [isOpenLogIn, setIsOpenLogIn] = useState(false);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const isAuthorized = Boolean(user);

  const handleCloseClick = () => {
    setIsOpenBurgerMenu(false);
  };

  const handleOpenClick = () => {
    setIsOpenBurgerMenu(true);
  };
  return (
    <Container>
      <header className={css.header}>
        <Link to={"/"} onClick={handleCloseClick} className={css.logoWrapper}>
          <svg className={css.logoIcon} width="28" height="28">
            <use href="/sprite.svg#icon" />
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
          {isAuthorized ? (
            <button
              className={css.actionBtnLogin}
              type="button"
              onClick={() => {
                logout();
                toast.success("See you soon!");
              }}
            >
              <svg className={css.actionBtnLoginIcon} width="20" height="20">
                <use href="/sprite.svg#icon-logout" />
              </svg>
              Log out
            </button>
          ) : (
            <button
              onClick={() => setIsOpenLogIn(true)}
              className={css.actionBtnLogin}
              type="button"
            >
              <svg className={css.actionBtnLoginIcon} width="20" height="20">
                <use href="/sprite.svg#icon-login" />
              </svg>
              Log in
            </button>
          )}
          {!isAuthorized && (
            <button
              onClick={() => setIsOpenRegistration(true)}
              className={css.actionBtnRegister}
              type="button"
            >
              Registration
            </button>
          )}
        </div>
        {!isOpenBurgerMenu ? (
          <button
            type="button"
            onClick={handleOpenClick}
            className={css.burgerMenuBtn}
          >
            <svg className={css.burgerMenuIcon} width="35" height="35">
              <use href="/sprite.svg#icon-burger" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleCloseClick}
            className={css.burgerMenuBtn}
          >
            <svg className={css.burgerMenuIcon} width="32" height="32">
              <use href="/sprite.svg#icon-cancel" />
            </svg>
          </button>
        )}
      </header>

      <div
        className={`${css.burgerMenuWrapper} ${
          isOpenBurgerMenu ? css.open : ""
        }`}
        style={{ backgroundColor: colorBg }}
      >
        <nav className={css.burgerMenuNav}>
          <ul className={css.burgerMenuNavList}>
            <li className={css.burgerMenuNavItem}>
              <Link onClick={() => setIsOpenBurgerMenu(false)} to="/">
                Home
              </Link>
            </li>
            <li className={css.burgerMenuNavItem}>
              <Link onClick={() => setIsOpenBurgerMenu(false)} to="/teachers">
                Teachers
              </Link>
            </li>
            {isAuthorized && (
              <li className={css.burgerMenuNavItem}>
                <Link
                  onClick={() => setIsOpenBurgerMenu(false)}
                  to="/favorites"
                >
                  Favorites
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className={css.burgerMenuAction}>
          {isAuthorized ? (
            <button
              onClick={() => {
                logout();
                setIsOpenBurgerMenu(false);
                toast.success("See you soon!");
              }}
              className={css.burgerMenuActionBtnLogin}
              type="button"
            >
              <svg
                className={css.burgerMenuActionBtnLoginIcon}
                width="20"
                height="20"
              >
                <use href="/sprite.svg#icon-logout" />
              </svg>
              Log out
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setIsOpenLogIn(true);
                  setIsOpenBurgerMenu(false);
                }}
                className={css.burgerMenuActionBtnLogin}
                type="button"
              >
                <svg
                  className={css.burgerMenuActionBtnLoginIcon}
                  width="20"
                  height="20"
                >
                  <use href="/sprite.svg#icon-login" />
                </svg>
                Log in
              </button>
              <button
                onClick={() => {
                  setIsOpenRegistration(true);
                  setIsOpenBurgerMenu(false);
                }}
                className={css.burgerMenuActionBtnRegister}
                type="button"
              >
                Registration
              </button>
            </>
          )}
        </div>
      </div>

      <Registration
        isOpen={isOpenRegistration}
        onClose={() => setIsOpenRegistration(false)}
      />
      <LogIn isOpen={isOpenLogIn} onClose={() => setIsOpenLogIn(false)} />
    </Container>
  );
};

export default Header;
