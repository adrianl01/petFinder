import React from "react";
import * as css from "./index.css";

export function LogIn() {
  return (
    <div className={css.main}>
      <div className={css.imgIngresarContainer}>
        <img className="img-ingresar" src="../public/imgs/door.png" />
      </div>
      <h2 className={css.title}>Ingresar</h2>
      <h4 className={css.title2}>Ingresá tu email para continuar</h4>
      <form className={css.form} method="post">
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            EMAIL
            <input type="email" className={css.email} name="email" id="email" />
          </label>
        </fieldset>
        <button type="submit" className={css.formButton}>
          Siguiente
        </button>
      </form>
      <div className={css.registerContainer}>
        Aún no tienes cuenta?{" "}
        <button className={css.registerContainerButton}>Registrate</button>
      </div>
    </div>
  );
}
