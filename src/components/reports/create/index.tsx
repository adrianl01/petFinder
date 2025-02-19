import React, { useState, useEffect } from "react";

import * as css from "./index.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { geoCodeAtom, locationCoords } from "../../../atoms";
import { MapApp } from "../../map";
import { useForm } from "react-hook-form";
import { geoCode } from "../../../hooks";
import { Previews } from "../../../ui/previews";
import { useNavigate } from "react-router-dom";

export function CreateReport() {
  const setGeoCodeAtom = useSetRecoilState(geoCodeAtom);
  const geoCodedata = geoCode();
  const navigate = useNavigate();
  const handleClickCancel = (e) => {
    navigate("/", { replace: true });
  };

  const coords = () => {
    const res = useRecoilValue(locationCoords) as any;
    return res;
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handlerSubmit = (data) => {
    setGeoCodeAtom(data.location);
    console.log(data);
    console.log("hacer cartel que diga que se creó el reporte");
    navigate("/", { replace: true });
  };

  const watcher = watch("name");
  if (watcher?.length > 15) {
    const atentionText = document.getElementById("atentionText");
    atentionText.style.display = "block";
  } else if (watcher?.length < 16) {
    const atentionText = document.getElementById("atentionText");
    atentionText.style.display = "none";
  }

  return (
    <div className={css.main}>
      <h2 className={css.title}>Reportar Mascota</h2>
      <h4 className={css.title2}>
        Ingresá la siguiente info para reportar a una mascota perdida
      </h4>
      <form
        className={css.form}
        method="post"
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            NOMBRE DE LA MASCOTA
            <input
              type="name"
              className={css.name}
              {...register("name")}
              id="name"
            />
            <p id="atentionText" className={css.atentionText}>
              El nombre no puede superar los 15 caractéres
            </p>
          </label>
          <div className={css.imgIngresarContainer}>
            <Previews imgIngresar={css.imgIngresar} />
          </div>
        </fieldset>
        <fieldset className={css.textfield}>
          <MapApp
            class={css.mapContainer}
            coords={coords}
            newLoc={geoCodedata}
          />
          <h4 className={css.title2}>
            Buscá un punto de referencia para reportar la mascota. Por ejemplo,
            la ubicación donde lo viste por última vez.
          </h4>
          <label className={css.formEmailLabel}>
            UBICACIÓN
            <input
              type="search"
              className={css.search}
              {...register("location")}
              id="search"
            />
          </label>
        </fieldset>
        <button type="submit" className={css.formButtonSubmit}>
          Reportar Mascota
        </button>
        <button
          type="button"
          className={css.formButtonCancel}
          onClick={handleClickCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
