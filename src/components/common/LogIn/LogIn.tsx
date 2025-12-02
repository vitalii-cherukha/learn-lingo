import FormLogIn from "../FormLogIn/FormLogIn";
import Modal from "../Modal/Modal";
import css from "./LogIn.module.css";

interface LogInProps {
  isOpen: boolean;
  onClose: () => void;
}

const LogIn = ({ isOpen, onClose }: LogInProps) => {
  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <div className={css.logInWrapper}>
        <h2 className={css.title}>LogIn</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <FormLogIn />
        <button onClick={onClose}>
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close-modal" />
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default LogIn;
