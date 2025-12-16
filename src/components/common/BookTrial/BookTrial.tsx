import { Teacher } from "../../../types";
import Modal from "../Modal/Modal";
import css from "./BookTrial.module.css";

interface BookTrialProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

const BookTrial = ({ isOpen, onClose, teacher }: BookTrialProps) => {
  if (!isOpen) return null;
  if (!teacher) {
    console.log("Something went wrong");
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <div className={css.bookTrialWrapper}>
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <button onClick={onClose}>
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close-modal" />
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default BookTrial;
