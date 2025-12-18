import Modal from "../Modal/Modal";
import css from "./Registration.module.css";
import FormRegistration from "../FormRegistration/FormRegistration";
import { User } from "../../../types";
import { useState } from "react";
import { useAuthStore } from "../../../store/authStore";
import toast from "react-hot-toast";

interface RegistrationProps {
  isOpen: boolean;
  onClose: () => void;
}

const Registration = ({ isOpen, onClose }: RegistrationProps) => {
  const { register } = useAuthStore();
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const onSubmit = async (data: User) => {
    setLoading(true);
    try {
      await register(data.email, data.password, data.name);
      onClose();
      toast.success("Registration complete!");
    } catch {
      toast.error("Oops! Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.registrationWrapper}>
        <h2 className={css.title}>Registration</h2>
        <p className={css.text}>
          Thank you for your interest in our platform! In order to register, we
          need some information. Please provide us with the following
          information
        </p>
        <FormRegistration loading={loading} onSubmit={onSubmit} />
        <button onClick={onClose}>
          <svg className={css.closeIcon} width="32" height="32">
            <use href="/sprite.svg#icon-close-modal" />
          </svg>
        </button>
      </div>
    </Modal>
  );
};

export default Registration;
