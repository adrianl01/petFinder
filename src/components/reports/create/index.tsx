import React, { useEffect } from "react";
import * as css from "./index.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Previews } from "../../../ui/previews";
import { useNavigate } from "react-router-dom";
import NewMapApp from "../../map/map";
import {
  createRep,
  imgInfo,
  longLatReport,
  newReportInfo,
  uploadImage,
} from "../../../atoms";
import { getEmailLS } from "../../../hooks";

export function CreateReport() {
  const petLoc = useRecoilValue(longLatReport);
  const setNewRepInfo = useSetRecoilState(newReportInfo);
  const imgInfoAtom = useRecoilValue(imgInfo);
  const newRepAtom = useRecoilValue(newReportInfo);
  const newRep = useRecoilValue(createRep);
  const userEmail = getEmailLS();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("newRep", newRep);
    if (newRep) {
      setTimeout(() => window.location.assign("/"), 2000);
    }
  }, [newRepAtom]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const handlerSubmit = async (data) => {
    const res = await uploadImage(imgInfoAtom);
    const reportInfo = {
      petName: data.name,
      location: data.location,
      lat: petLoc.lat,
      long: petLoc.long,
      petImg: res,
      email: userEmail,
    };
    await setNewRepInfo(reportInfo);
    console.log("hacer cartel que diga que se creó el reporte");
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
              {...register("name", { required: true })}
              id="name"
            />
            {errors.exampleRequired && <span>This field is required</span>}
            <p id="atentionText" className={css.atentionText}>
              El nombre no puede superar los 15 caractéres
            </p>
          </label>
        </fieldset>
        <fieldset className={css.textfield}>
          <div className={css.imgIngresarContainer}>
            <Previews imgIngresar={css.imgIngresar} />
          </div>
        </fieldset>
        <fieldset className={css.textfield}>
          <NewMapApp class={css.mapContainer} />
          <h4 className={css.title2}>
            Buscá un punto de referencia para reportar la mascota. Por ejemplo,
            la ubicación donde lo viste por última vez.
          </h4>
        </fieldset>
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            UBICACIÓN
            <input
              type="search"
              className={css.search}
              {...register("location", { required: true })}
              id="search"
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </label>
          <h4 className={css.title2}>
            Escribí el nombre de la ciudad donde se perdió
          </h4>
        </fieldset>
        <button type="submit" className={css.formButtonSubmit}>
          Reportar Mascota
        </button>
        <button
          type="button"
          className={css.formButtonCancel}
          onClick={() => navigate("/", { replace: true })}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}
