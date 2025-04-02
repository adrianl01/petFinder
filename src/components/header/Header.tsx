import React from "react";
import * as css from "./header.css";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { atentionCard } from "../../atoms";
import { EmailButton } from "../../ui/emailButton";
import { AtentionCard } from "./atentionCard";
import { getEmailLS, getTokenLS, getUserLocLS } from "../../hooks";
import Location from "./location";
export function Header() {
  const currentLoc = getUserLocLS();
  const token = getTokenLS();
  console.log(token);
  const atentionCardAtom = useRecoilValue(atentionCard);
  const setAtentionCard = useSetRecoilState(atentionCard);
  const userEmail = getEmailLS();

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
    if (currentLoc && userEmail) {
      headerMenu.style.display = "none";
      navigate("/create-report", { replace: true });
    } else {
      setAtentionCard(true);
      console.error("No coordinates or Email");
    }
  };
  const handleClickMyReps = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    if (token) {
      headerMenu.style.display = "none";
      navigate("/my-reports", { replace: true });
    } else {
      setAtentionCard(true);
    }
  };
  const handleClickMyData = (e) => {
    e.preventDefault();
    const headerMenu = document.getElementById("headerMenu");
    if (token) {
      headerMenu.style.display = "none";
      navigate("/my-data/menu", { replace: true });
    } else {
      setAtentionCard(true);
    }
  };
  const handleClickHome = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
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
            <img className={css.imgLogo} src="/imgs/pet-logo.png" />
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
                src="./imgs/x.png"
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
        <AtentionCard data={atentionCardAtom} />
        <Location />
      </div>
    </div>
  );
}
