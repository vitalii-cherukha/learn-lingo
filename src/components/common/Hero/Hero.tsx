import { useState } from "react";
import Registration from "../Registration/Registration";
import css from "./Hero.module.css";

const Hero = () => {
  const [isOpenRegistration, setIsOpenRegistration] = useState(false);

  return (
    <div className={css.heroWrapper}>
      <div className={css.titleWrapper}>
        <h1 className={css.title}>
          Unlock your potential with the best &nbsp;
          <span className={css.titleSpan}>language</span> tutors
        </h1>
        <p className={css.titleText}>
          Embark on an Exciting Language Journey with Expert Language Tutors:
          Elevate your language proficiency to new heights by connecting with
          highly qualified and experienced tutors.
        </p>
        <button
          onClick={() => setIsOpenRegistration(true)}
          className={css.titleBtn}
        >
          Get started
        </button>
      </div>
      <div className={css.imgWrapper}>
        <img className={css.img} src="/user/user-yellow@2x.webp" alt="User" />
      </div>
      <Registration
        isOpen={isOpenRegistration}
        onClose={() => setIsOpenRegistration(false)}
      />
    </div>
  );
};

export default Hero;
