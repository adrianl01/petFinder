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
      <h2 className={css.title}>Reported Pets</h2>

      <div className={css.emptyReportContainer}>
        <h4 className={css.title2}>You haven't created any report yet</h4>
        <img className={css.emptyReportImg} src="/imgs/create-report.png" />
        <button
          type="button"
          className={css.emptyReportButton}
          onClick={handleClickCreateRep}
        >
          Create Report
        </button>
      </div>
    </div>
  );
}
