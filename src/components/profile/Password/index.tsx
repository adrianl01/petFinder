import React from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
export function Password() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = (data) => {
    console.log(data);
    navigate("/my-data/menu", { replace: true });
  };
  return (
    <div className={css.main}>
      <h2 className={css.title}>Contraseña</h2>
      <form
        className={css.form}
        method="post"
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <fieldset className={css.textfield}>
          <label className={css.formNameLabel}>
            CONTRASEÑA
            <input
              type="password"
              className={css.name}
              {...register("password")}
              id="password"
            />
          </label>
          <label className={css.formLocationLabel}>
            CONFIRMAR CONTRASEÑA
            <input
              type="password"
              className={css.location}
              {...register("passwordCheck")}
              id="passwordCheck"
            />
          </label>
        </fieldset>
        <button type="submit" className={css.formButtonSaveData}>
          Guardar
        </button>
      </form>
    </div>
  );
}
