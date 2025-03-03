import React from "react";
import * as css from "./index.css";
import { useNavigate } from "react-router-dom";
export function NoReps() {
  const navigate = useNavigate();
  const handleClickCreateRep = (e) => {
    e.preventDefault();
    navigate("/create-report", { replace: true });
  };
  return (
    <div className={css.main}>
      <h2 className={css.title}>Mascotas Reportadas</h2>

      <div className={css.emptyReportContainer}>
        <h4 className={css.title2}>Aún no reportaste mascotas perdidas</h4>
        <img
          className={css.emptyReportImg}
          src="../public/imgs/create-report.png"
        />
        <button
          type="button"
          className={css.emptyReportButton}
          onClick={handleClickCreateRep}
        >
          Publicar Reporte
        </button>
      </div>
    </div>
  );
}
