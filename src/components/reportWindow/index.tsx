import React from "react";
import { Link, useParams } from "react-router-dom";
import * as css from "./index.css";
import { useForm } from "react-hook-form";

export function ReportWindow(prop) {
  const params = useParams();
  console.log(params);
  console.log("prop:", prop);
  const closeButtonHandler = (e) => {
    e.preventDefault();
    const windowRep = document.getElementById("windowRep");
    console.log("button");
    windowRep.style.display = "none";
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = (data) => {
    console.log(data);
  };
  return (
    <div id="windowRep" className={css.windowAbsolute}>
      <div className={css.windowContainer}>
        <div className={css.windowCloseButtonContainer}>
          <button
            onClick={closeButtonHandler}
            className={css.windowCloseButton}
            type="button"
          >
            <img
              className="header-menu-close-button-img"
              src="../public/imgs/x.png"
            />
          </button>
        </div>
        <h2 className={css.windowTitle}>Reportar info de {params.petName}</h2>
        <form
          className={css.windowForm}
          method="post"
          onSubmit={handleSubmit(handlerSubmit)}
        >
          <fieldset className={css.windowTextfield}>
            <label className={css.formEmailLabel}>
              NOMBRE
              <input
                type="text"
                className={css.windowInputName}
                {...register("name")}
                id="name"
              />
            </label>
            <label className={css.formEmailLabel}>
              TELÉFONO
              <input
                type="tel"
                className={css.windowInputPhoneNumber}
                {...register("phoneNumber")}
                id="phoneNumber"
              />
            </label>
            <label className={css.formEmailLabel}>
              ¿DÓNDE LO VISTE?
              <input
                type="text"
                className={css.windowInputLocation}
                {...register("email")}
                id="location"
              />
            </label>
          </fieldset>
          <button type="submit" className={css.windowFormButton}>
            Enviar Información
          </button>
        </form>
      </div>
    </div>
  );
}
