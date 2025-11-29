import css from "./BurgerMenu.module.css";

const BurgerMenu = () => {
  return (
    <div className={css.burgerMenuWrapper}>
      <button type="button">
        <svg className={css.burgerMenuIcon} width="35" height="35">
          <use href="/sprite.svg#icon-burger" />
        </svg>
      </button>
    </div>
  );
};

export default BurgerMenu;
