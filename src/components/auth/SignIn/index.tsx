import React, { useEffect } from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getToken, tokenAtom, userEmail, userPassword } from "../../../atoms";
import { useForm } from "react-hook-form";
import { getUserToken } from "../../../hooks";

export function SignIn() {
  const navigate = useNavigate();
  const setEmailState = useSetRecoilState(userEmail);
  const setPasswordState = useSetRecoilState(userPassword);
  const setToken = useSetRecoilState(tokenAtom);
  const token = getUserToken();
  useEffect(() => {
    console.log("useEffect");
    console.log(token);
    if (token) {
      setToken(token);
      navigate("/", { replace: true });
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = async (data) => {
    console.log(data);
    setEmailState({ email: data.email });
    setPasswordState({ password: data.password });
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.main}>
        <h2 className={css.title}>Iniciar Sesión</h2>
        <h4 className={css.title2}>
          Ingresá los siguientes datos personales para iniciar sesión
        </h4>
        <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
          <fieldset className={css.textfield}>
            <label className={css.formEmailLabel}>
              EMAIL
              <input
                type="email"
                className={css.email}
                {...register("email", { required: true })}
                id="email"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
            <label className={css.formEmailLabel}>
              CONTRASEÑA
              <input
                type="password"
                className={css.password}
                {...register("password", { required: true })}
                id="password"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
          </fieldset>
          <button type="submit" className={css.formButton}>
            Acceder
          </button>
        </form>
        <div className={css.forgotContainer}>
          <button
            className={css.forgotContainerButton}
            onClick={() => {
              navigate("/my-data/modify-password", { replace: true });
            }}
          >
            Olvidé mi contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
