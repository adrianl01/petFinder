import React from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userEmail } from "../../../atoms";
import { useForm } from "react-hook-form";

export function SignUp() {
  const navigate = useNavigate();
  const setEmailState = useSetRecoilState(userEmail);

  const handleClickSignUp = (d) => {
    navigate("/", { replace: true });
    setEmailState(["signedUp", { email: d.email }]);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = (data) => {
    console.log(data);
    handleClickSignUp(data);
  };
  return (
    <div className={css.main}>
      <h2 className={css.title}>Registrarse</h2>
      <h4 className={css.title2}>
        Ingresá los siguientes datos para registrarte
      </h4>
      <form
        className={css.form}
        method="post"
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            EMAIL
            <input
              type="email"
              className={css.email}
              {...register("email")}
              id="email"
            />
          </label>
          <label className={css.formEmailLabel}>
            CONTRASEÑA
            <input
              type="password"
              className={css.password}
              {...register("password")}
              id="password"
            />
          </label>
          <label className={css.formEmailLabel}>
            CONFIRMAR CONTRASEÑA
            <input
              type="password"
              className={css.passwordCheck}
              {...register("passwordCheck")}
              name="passwordCheck"
            />
          </label>
        </fieldset>
        <div className={css.forgotContainer}>
          Ya tenés una cuenta?
          <button className={css.loginContainerButton}>Iniciar Sesión</button>
        </div>
        <button type="submit" className={css.formButton}>
          Acceder
        </button>
      </form>
    </div>
  );
}
