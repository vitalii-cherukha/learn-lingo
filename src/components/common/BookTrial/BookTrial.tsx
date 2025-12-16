import { useState } from "react";
import { Teacher, User } from "../../../types";
import Modal from "../Modal/Modal";
import css from "./BookTrial.module.css";
import { Form } from "react-router";
import FormBookTrial from "../FormBookTrial/FormBookTrial";

interface BookTrialProps {
  isOpen: boolean;
  onClose: () => void;
  teacher: Teacher | null;
}

const BookTrial = ({ isOpen, onClose, teacher }: BookTrialProps) => {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;
  if (!teacher) {
    console.log("Something went wrong");
    return null;
  }

  const onSubmit = async (user: User) => {
    setLoading(true);
    try {
      console.log(user);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.bookTrialWrapper}>
        <h2 className={css.title}>Book trial lesson</h2>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherWrapper}>
          <div className={css.avatarWrapper}>
            <img
              src="/default-photo.jpg"
              alt={teacher.name}
              width="44"
              height="44"
            />
          </div>
          <div className={css.nameWrapper}>
            <p className={css.label}>Your teacher</p>
            <p className={css.name}>
              {teacher.name} {teacher.surname}
            </p>
          </div>
        </div>
        <FormBookTrial loading={loading} onSubmit={onSubmit} />
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
