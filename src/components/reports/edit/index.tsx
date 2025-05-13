import React, { Suspense } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getEmailLS, getRepByIdFunc, getTokenLS } from "../../../hooks";
import * as css from "./index.css";
import { useRecoilValue } from "recoil";
import {
  deleteRep,
  imgInfo,
  longLatEditReport,
  repIdAtom,
  updateRep,
  uploadImage,
} from "../../../atoms";
import { Previews } from "../../../ui/previews";
import NewMapApp from "../../map/map";
import { useForm } from "react-hook-form";

export function EditReport() {
  const token = getTokenLS();
  const repId = useRecoilValue(repIdAtom);
  const imgInfoAtom = useRecoilValue(imgInfo);
  const petLocEdit = useRecoilValue(longLatEditReport);
  const userEmail = getEmailLS();
  const nav = useNavigate();
  const param = useParams();
  const lastRepData = getRepByIdFunc(param.repId);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const deleteRepHandler = async (e) => {
    e.preventDefault();
    await deleteRep(token, repId);
    setTimeout(() => window.location.assign("/"), 2000);
  };
  const handlerSubmit = async (data) => {
    console.log(lastRepData);
    var repInfo = {} as any;
    repInfo = {
      petName: data.name || lastRepData.petName,
      location: data.location || lastRepData.location,
      email: userEmail,
    };
    if (imgInfoAtom) {
      const res = await uploadImage(imgInfoAtom);
      repInfo.petImg = res;
    } else {
      repInfo.petImg = lastRepData.petImg;
    }
    if (petLocEdit) {
      (repInfo.lat = petLocEdit.lat), (repInfo.long = petLocEdit.long);
    } else {
      (repInfo.lat = JSON.parse(lastRepData.lat)),
        (repInfo.long = JSON.parse(lastRepData.long));
    }
    if (repInfo.petImg !== lastRepData.petImg) {
      repInfo.oldImg = lastRepData.petImg;
    } else {
      repInfo.oldImg = null;
    }
    // antes de irme a buscarle a Marisa 26/3/25 20:12 // el problema es que las coordenadas se envian como strings y no numbers. Solucionar
    const updateRes = await updateRep(token, repId, repInfo);
    console.log(updateRes);
    console.log("hacer cartel que diga que se editó el reporte");
    setTimeout(() => window.location.assign("/"), 2000);
  };
  const watcher = watch("name");
  if (watcher?.length > 15) {
    const atentionText = document.getElementById("atentionText");
    atentionText.style.display = "block";
  } else if (watcher?.length < 16) {
    const atentionText = document.getElementById("atentionText");
    atentionText.style.display = "none";
  }
  const coordsEdit = { lng: lastRepData.long, lat: lastRepData.lat };
  return (
    <div className={css.main}>
      <h2 className={css.title}>Edit Pet Report</h2>
      <form
        className={css.form}
        method="post"
        onSubmit={handleSubmit(handlerSubmit)}
      >
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            PET NAME
            <input
              type="name"
              className={css.name}
              {...register("name")}
              id="name"
              placeholder={lastRepData.petName}
            />
            {errors.exampleRequired && <span>This field is required</span>}
            <p id="atentionText" className={css.atentionText}>
              The name can't be longer than 15 chars
            </p>
          </label>
        </fieldset>
        <fieldset className={css.textfield}>
          <div className={css.imgIngresarContainer}>
            <Previews
              imgIngresar={css.imgIngresar}
              petImgEdit={lastRepData.petImg}
            />
          </div>
        </fieldset>
        <fieldset className={css.textfield}>
          <NewMapApp class={css.mapContainer} coords={coordsEdit} />
          <h4 className={css.title2}>
            Look for a reference spot on the map,e.g., the last spot you saw it.
          </h4>
        </fieldset>
        <fieldset className={css.textfield}>
          <label className={css.formEmailLabel}>
            LOCATION
            <input
              type="search"
              className={css.search}
              {...register("location")}
              id="search"
              placeholder={lastRepData.location}
            />
            {errors.exampleRequired && <span>This field is required</span>}
          </label>
          <h4 className={css.title2}>
            Write the name of the city where he got lost
          </h4>
        </fieldset>
        <button type="submit" className={css.formButtonSave}>
          Edit Report
        </button>
        <h4 className={css.title2}>
          If your pet has already been found, you can delete this report.
        </h4>
        <Suspense fallback={<div className={css.loading}></div>}>
          <button
            type="button"
            className={css.formButtonDelete}
            onClick={deleteRepHandler}
          >
            Delete Report
          </button>
        </Suspense>
        <button
          type="button"
          className={css.formButtonCancel}
          onClick={() => window.location.assign("/")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
