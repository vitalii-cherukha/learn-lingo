import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import css from "./FormBookTrial.module.css";

interface FormBookTrialValues {
  purpose: string;
  fullName: string;
  email: string;
  phone: string;
}

interface FormBookTrialProps {
  onSubmit: (data: FormBookTrialValues) => Promise<void>;
  loading: boolean;
}

const FormBookTrialSchema = yup.object({
  purpose: yup.string().required("Please select lesson purpose"),

  fullName: yup
    .string()
    .min(2, "Name is too short")
    .required("Full name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  phone: yup
    .string()
    .matches(/^\+?[0-9]{10,15}$/, "Invalid phone number")
    .required("Phone number is required"),
});

const purposes = [
  "Career and business",
  "Lesson for kids",
  "Living abroad",
  "Exams and coursework",
  "Culture, travel or hobby",
];

const FormBookTrial = ({ onSubmit, loading }: FormBookTrialProps) => {
  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<FormBookTrialValues>({
    resolver: yupResolver(FormBookTrialSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.radioGroup}>
        {purposes.map((item) => (
          <label key={item} className={css.radioLabel}>
            <input
              className={css.radioInput}
              type="radio"
              value={item}
              {...register("purpose")}
            />
            <span className={css.customRadio}>
              {/* inactive */}
              <svg
                className={`${css.icon} ${css.iconInactive}`}
                width="24"
                height="24"
              >
                <use href="/sprite.svg#icon-radioBtn" />
              </svg>

              {/* active */}
              <svg
                className={`${css.icon} ${css.iconActive}`}
                width="24"
                height="24"
              >
                <use href="/sprite.svg#icon-radioBtn-active" />
              </svg>
            </span>
            <span className={css.radioText}>{item}</span>
          </label>
        ))}
        {errors.purpose && (
          <p className={css.error}>{errors.purpose.message}</p>
        )}
      </div>

      <div className={css.inputWrapper}>
        <input
          type="text"
          placeholder="Full Name"
          {...register("fullName")}
          className={errors.fullName ? css.errorInput : ""}
        />
        {errors.fullName && (
          <p className={css.error}>{errors.fullName.message}</p>
        )}
      </div>

      {/* EMAIL */}
      <div className={css.inputWrapper}>
        <input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={errors.email ? css.errorInput : ""}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      {/* PHONE */}
      <div className={css.inputWrapper}>
        <input
          type="tel"
          placeholder="Phone number"
          {...register("phone")}
          className={errors.phone ? css.errorInput : ""}
        />
        {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
      </div>

      {/* BUTTON */}
      <button type="submit" className={css.submitBtn}>
        Book
      </button>
    </form>
  );
};

export default FormBookTrial;
