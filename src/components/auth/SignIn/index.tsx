import React from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userEmail } from "../../../atoms";
import { useForm } from "react-hook-form";
import { saveEmail } from "../../../lib";
import { signIn } from "../../../lib/api";

export function SignIn() {
  const setEmailState = useSetRecoilState(userEmail);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = (d) => {
    console.log(d);
    signIn(d);
    // setEmailState(["signedIn", { email: d.email }]);
    // saveEmail(d.email);
    // navigate("/", { replace: true });
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.main}>
        <h2 className={css.title}>Iniciar Sesión</h2>
        <h4 className={css.title2}>
          Ingresá los siguientes datos personales para iniciar sesión
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
            <div className={css.forgotContainer}>
              <button className={css.forgotContainerButton}>
                Olvidé mi contraseña
              </button>
            </div>
          </fieldset>
          <button type="submit" className={css.formButton}>
            Acceder
          </button>
        </form>
      </div>
    </div>
  );
}
