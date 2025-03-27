import React, { useEffect } from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { creatUser, getToken, tokenAtom, userPassword } from "../../../atoms";
import { useForm } from "react-hook-form";

export function SignUp() {
  const navigate = useNavigate();
  const password = useRecoilValue(userPassword);
  const setToken = useSetRecoilState(tokenAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = async (data) => {
    await creatUser(data);
    await getToken(data);
    navigate("/", { replace: true });
  };
  return (
    <div className={css.mainContainer}>
      <div className={css.main}>
        <h2 className={css.title}>Registrarse</h2>
        <h4 className={css.title2}>
          Ingresá los siguientes datos personales para poder registrarte
        </h4>
        <form className={css.form} onSubmit={handleSubmit(handlerSubmit)}>
          <fieldset className={css.textfield}>
            <label className={css.formEmailLabel}>
              NOMBRE
              <input
                type="text"
                className={css.email}
                {...register("fullName", { required: true })}
                id="fullName"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
            <label className={css.formEmailLabel}>
              LUGAR
              <input
                type="text"
                className={css.email}
                {...register("location", { required: true })}
                id="location"
              />
              {errors.exampleRequired && <span>This field is required</span>}
            </label>
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
            Crear Cuenta
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
