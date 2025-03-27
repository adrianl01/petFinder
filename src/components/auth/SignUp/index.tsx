import React from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { getToken, userEmail, userPassword } from "../../../atoms";
import { useForm } from "react-hook-form";

export function SignUp() {
  const navigate = useNavigate();
  // const getUserToken = useRecoilValue(getToken);
  const setEmailState = useSetRecoilState(userEmail);
  const setPasswordState = useSetRecoilState(userPassword);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = async (data) => {
    console.log(data);
    // navigate("/", { replace: true });
    // await setEmailState({ email: data.email });
    // await setPasswordState({ password: data.password });
  };
  return (
    <div className={css.mainContainer}>
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
                {...register("passwordCheck", { required: true })}
                name="passwordCheck"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
          </fieldset>
          <button type="submit" className={css.formButton}>
            Acceder
          </button>
        </form>
        <div className={css.forgotContainer}>
          Ya tenés una cuenta?
          <button
            className={css.loginContainerButton}
            onClick={() => {
              navigate("/sign-in", { replace: true });
            }}
          >
            Iniciar Sesión
          </button>
        </div>
      </div>
    </div>
  );
}
