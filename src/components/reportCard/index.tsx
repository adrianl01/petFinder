import React, { useEffect, useState } from "react";
import * as css from "./index.css";
import { useForm } from "react-hook-form";
import { getRepsByCoords } from "../../hooks";

export function ReportCard() {
  const [data, setData] = useState([]);
  const repsRes = getRepsByCoords();
  useEffect(() => {
    setData(repsRes);
  }, [repsRes]);

  const clickHandler = (e) => {
    e.preventDefault();
    const name = e.target.parentNode.firstChild.firstChild.textContent;
    const windowRep = document.getElementById("windowRep");
    windowRep.style.display = "flex";
    const petNameEl = document.getElementById("petNameEl");
    petNameEl.textContent = "Reportar info de" + " " + name;
  };
  const closeButtonHandler = (e) => {
    e.preventDefault();
    const windowRep = document.getElementById("windowRep");
    windowRep.style.display = "none";
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const windowRep = document.getElementById("windowRep");
    windowRep.style.display = "none";
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handlerSubmit = (data) => {
    const windowRep = document.getElementById("windowRep");
    windowRep.style.display = "none";
  };
  function Reps(data) {
    return (
      <>
        {" "}
        {data.petData.map((d) => (
          <div className={css.reportContainer} id={d.objectID}>
            <div className={css.reportImg}>
              <img className={css.reportProfileImg} src={d.petImg} />
            </div>
            <div className={css.reportBox}>
              <div className={css.reportInfo}>
                <h2 key={d.objectID} className={css.reportTitle}>
                  {d.petName}
                </h2>
                <h4 className={css.reportLocation}>{d.location}</h4>
              </div>
              <button
                type="button"
                onClick={clickHandler}
                className={css.reportButtonEdit}
              >
                Reportar
                <img src="/imgs/siren.png" />
              </button>
            </div>
          </div>
        ))}
      </>
    );
  }
  return (
    <div className={css.homeEl}>
      <h4 className={css.reportsTitle}>Mascotas Perdidas Cerca</h4>
      <Reps petData={data} />
      <div id="windowRep" className={css.windowAbsolute}>
        <div className={css.windowContainer}>
          <div className={css.windowCloseButtonContainer}>
            <button
              onClick={closeButtonHandler}
              className={css.windowCloseButton}
              type="button"
            >
              <img className="header-menu-close-button-img" src="/imgs/x.png" />
            </button>
          </div>
          <h2 id="petNameEl" className={css.windowTitle}></h2>
          <form
            className={css.windowForm}
            method="post"
            onSubmit={handleSubmit(handlerSubmit)}
          >
            <fieldset className={css.windowTextfield}>
              <label className={css.formEmailLabel}>
                TU NOMBRE
                <input
                  type="text"
                  className={css.windowInputName}
                  {...register("name", { required: true })}
                  id="name"
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </label>
              <label className={css.formEmailLabel}>
                TU TELÉFONO
                <input
                  type="tel"
                  className={css.windowInputPhoneNumber}
                  {...register("phoneNumber", { required: true })}
                  name="phoneNumber"
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </label>
              <label className={css.formEmailLabel}>
                ¿DÓNDE LO VISTE?
                <input
                  type="text"
                  className={css.windowInputLocation}
                  {...register("location", { required: true })}
                  id="location"
                />
                {errors.exampleRequired && <span>This field is required</span>}
              </label>
            </fieldset>
            <button type="submit" className={css.windowFormButton}>
              Enviar Información
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
