import { useForm } from "react-hook-form";
import * as Yup from "yup";
import css from "./FormRegistration.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { User } from "../../../types";
import { BarLoader } from "react-spinners";

interface FormRegistrationProps {
  onSubmit: (data: User) => Promise<void>;
  loading: boolean;
}

const registrationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),

  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const FormRegistration = ({ onSubmit, loading }: FormRegistrationProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(registrationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={css.inputWrapper}>
        <input
          className={`${css.input} ${errors.name ? css.errorInput : ""}`}
          placeholder="Name"
          {...register("name")}
          onFocus={() => clearErrors("name")}
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}
      </div>

      <div className={css.inputWrapper}>
        <input
          className={`${css.input} ${errors.email ? css.errorInput : ""}`}
          placeholder="Email"
          {...register("email")}
          onFocus={() => clearErrors("email")}
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
      </div>

      <div className={css.inputWrapper}>
        <input
          className={`${css.input} ${errors.password ? css.errorInput : ""}`}
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          {...register("password")}
          onFocus={() => clearErrors("password")}
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        <svg
          className={css.icon}
          onClick={togglePassword}
          width="20"
          height="20"
        >
          <use
            href={`/sprite.svg#${showPassword ? "icon-eye" : "icon-eye-off"}`}
          />
        </svg>
      </div>

      <button className={css.btn} type="submit">
        {!loading ? (
          "Sign Up"
        ) : (
          <BarLoader
            className={css.loader}
            color="#121417"
            speedMultiplier={3}
            width={100}
          />
        )}
      </button>
    </form>
  );
};

export default FormRegistration;
