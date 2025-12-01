import css from "./Stats.module.css";

const Stats = () => {
  return (
    <div className={css.statsWrapper}>
      <ul className={css.list}>
        <li className={css.item}>
          <p className={css.itemTitle}>32,000 +</p>
          <p className={css.itemText}>Experienced tutors</p>
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>300,000 +</p>
          <p className={css.itemText}>5-star tutor reviews</p>
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>120 +</p>
          <p className={css.itemText}>Subjects taught</p>
        </li>
        <li className={css.item}>
          <p className={css.itemTitle}>200 +</p>
          <p className={css.itemText}>Tutor nationalities</p>
        </li>
      </ul>
    </div>
  );
};

export default Stats;
