import { useForm } from "react-hook-form";
import * as Yup from "yup";
import css from "./FormLogIn.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};

const registrationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const FormLogIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(registrationSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
  });

  const onSubmit = (data: Inputs) => {
    console.log("Form submitted:", data);
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
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
        Log In
      </button>
    </form>
  );
};

export default FormLogIn;
