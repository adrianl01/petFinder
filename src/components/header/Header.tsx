import React from "react";
import * as css from "./header.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { locationCoords } from "../../atoms";
import { EmailButton } from "../../ui/emailButton";
import { logInCheck } from "../../hooks";
export function Header() {
  const locationCoordsAt = useRecoilValue(locationCoords);

  const navigate = useNavigate();
  const handleClickOpenButton = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "flex";
  };
  const handleClickCloseButton = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "none";
  };
  const handleClickCreateRep = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    if (locationCoordsAt) {
      console.log("locationCoords", locationCoordsAt);
      headerMenu.style.display = "none";
      navigate("/create-report", { replace: true });
      console.log("createReports");
    } else {
      console.error("No coordinates");
    }
  };
  const handleClickMyReps = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "none";
    navigate("/my-reports", { replace: true });
    console.log("myReps");
  };
  const handleClickMyData = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    headerMenu.style.display = "none";
    navigate("/my-data/menu", { replace: true });
    console.log("myData");
  };
  const handleClickHome = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
    console.log("home");
  };

  return (
    <div className={css.absolute}>
      <header className={css.header}>
        <div>
          <button
            type="button"
            className={css.logoButton}
            onClick={handleClickHome}
          >
            <img className={css.imgLogo} src="../public/imgs/pet-logo.png" />
          </button>
        </div>
        <button
          onClick={handleClickOpenButton}
          type="button"
          className={css.buttonMenu}
        >
          <div className={css.vector}></div>
          <div className={css.vector}></div>
          <div className={css.vector}></div>
        </button>
      </header>
      <div id="headerMenu" className={css.headerMenu}>
        <div className={css.headerMenuTop}>
          <div className={css.headerMenuCloseButtonContainer}>
            <button
              className={css.headerMenuCloseButton}
              onClick={handleClickCloseButton}
              type="button"
            >
              <img
                className={css.headerMenuCloseButtonImg}
                src="../public/imgs/x.png"
              />
            </button>
          </div>
          <button
            type="button"
            className={css.headerMenuButtonData}
            onClick={handleClickMyData}
          >
            Mis Datos
          </button>
          {/* -------------------- */}
          <button
            type="button"
            className={css.headerMenuButtonMyReports}
            onClick={handleClickMyReps}
          >
            Mis Mascotas Reportadas
          </button>
          {/* -------------------- */}
          <button
            type="button"
            className={css.headerMenuButtonCreateReport}
            onClick={handleClickCreateRep}
          >
            Reportar Mascota
          </button>
        </div>
        <EmailButton
          headerMenuBottom={css.headerMenuBottom}
          headerMenuEmail={css.headerMenuEmail}
          headerMenuCancelButton={css.headerMenuCancelButton}
        />
      </div>
    </div>
  );
}
