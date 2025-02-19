import React from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

export function MyData() {
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
      <h2 className={css.title}>Datos Personales</h2>
      <form
        className={css.form}
        method="post"
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <fieldset className={css.textfield}>
          <label className={css.formNameLabel}>
            NOMBRE
            <input
              type="text"
              className={css.name}
              {...register("name")}
              id="name"
            />
          </label>
          <label className={css.formLocationLabel}>
            LOCALIDAD
            <input
              type="text"
              className={css.location}
              {...register("location")}
              id="location"
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
