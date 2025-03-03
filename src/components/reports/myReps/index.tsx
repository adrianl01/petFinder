import React from "react";
import * as css from "./index.css";
import { NoReps } from "../NoReps";
export function MyReps() {
  const img = "./img";
  const data = [
    // {
    //   nombre: "Pedro Sanchez",
    //   location: "Arriba España",
    // },
    // {
    //   nombre: "Juan Juanes",
    //   location: "Abajo España",
    // },
    // {
    //   nombre: "3er Nombre",
    //   location: "Sólo España",
    // },
  ];

  if (data.length < 0) {
    return (
      <div className={css.main}>
        <h2 className={css.title}>Mascotas Reportadas</h2>
        {data.map((d) => (
          <div className={css.reportContainer}>
            <div className={css.reportImg}>
              <img className={css.reportProfileImg} src={img} />
            </div>
            <div className={css.reportBox}>
              <div className={css.reportInfo}>
                <h2 className={css.reportTitle}>{d.nombre}</h2>
                <h4 className={css.reportLocation}>{d.location}</h4>
              </div>
              <button type="button" className={css.reportButtonEdit}>
                Editar
                <img src="/imgs/pencil.png" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  } else if (data.length == 0) {
    console.log("length:", data.length);
    return <NoReps />;
  }
}
