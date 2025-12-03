import { useForm } from "react-hook-form";
import * as Yup from "yup";
import css from "./FormRegistration.module.css";
import { yupResolver } from "@hookform/resolvers/yup";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

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

const FormRegistration = () => {
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
          type="password"
          {...register("password")}
          onFocus={() => clearErrors("password")}
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
      </div>

      <button className={css.btn} type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default FormRegistration;
