import React from "react";
import { useNavigate } from "react-router-dom";
import * as css from "./index.css";
import { EmailButton } from "../../../ui/emailButton";
export function Menu() {
  const navigate = useNavigate();
  const handleClickData = (e) => {
    e.preventDefault();
    navigate("/my-data/modify-data", { replace: true });
    console.log("modify");
  };
  const handleClickPassword = (e) => {
    e.preventDefault();
    navigate("/my-data/modify-password", { replace: true });
    console.log("modify");
  };
  return (
    <div className={css.main}>
      <h2 className={css.title}>My Personal Data</h2>
      <div className={css.buttons}>
        <button
          type="button"
          className={css.formButtonModData}
          onClick={handleClickData}
        >
          Modify Personal Data
        </button>
        <button
          type="button"
          className={css.formButtonModPass}
          onClick={handleClickPassword}
        >
          Modify Password
        </button>
      </div>
      <EmailButton
        headerMenuBottom={css.headerMenuBottom}
        headerMenuEmail={css.headerMenuEmail}
        headerMenuCancelButton={css.headerMenuCancelButton}
      />
    </div>
  );
}
