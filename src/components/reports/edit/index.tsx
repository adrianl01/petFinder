import React from "react";
import * as css from "./index.css";

export function EditReport() {
  return (
    <div className={css.main}>
      <h2 className={css.title}>Editar Reporte de Mascota</h2>

      <form className={css.form} method="post">
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            NOMBRE DE LA MASCOTA
            <input type="name" className={css.name} name="name" id="name" />
          </label>
          <div className={css.imgIngresarContainer}>
            <img className={css.imgIngresar} src="/imgs/insert-photo.png" />
          </div>
        </fieldset>

        <fieldset className={css.textfield}>
          <div className={css.mapContainer} id="map"></div>
          <h4 className={css.title2}>
            Buscá un punto de referencia para reportar la mascota. Por ejemplo,
            la ubicación donde lo viste por última vez.
          </h4>

          <label className={css.formEmailLabel}>
            UBICACIÓN
            <input type="search" className={css.search} name="q" id="search" />
          </label>
        </fieldset>

        <button type="submit" className={css.formButtonSave}>
          Guardar
        </button>
        <button type="button" className={css.formButtonCancel}>
          Reportar como Encontrado
        </button>
        <button type="button" className={css.formButtonDelete}>
          Eliminar Reporte
        </button>
      </form>
    </div>
  );
}
